# Admin Panel Implementation Notes

Date: 2026-05-13

## What Was Implemented

A first complete admin dashboard has been added for users with `role = ADMIN`.

Backend additions:

- `/api/admin/overview`
- `/api/admin/users`
- `/api/admin/users/{id}`
- `/api/admin/users/{id}/role`
- `/api/admin/tts/summary`
- `/api/admin/tts/cache`
- `/api/admin/tts/cache/{cacheKey}`
- `/api/admin/ai/summary`
- `/api/admin/audit`

Frontend additions:

- `/admin`
- `/admin/users`
- `/admin/tts`
- `/admin/ai`
- `/admin/audit`
- `/admin/settings`

The normal learner app remains unchanged for regular users. Admin navigation appears in the app sidebar only for users whose `/api/auth/me` response includes `role: "ADMIN"`.

## Backend Design

### Security

`SecurityConfig` now protects all admin APIs with:

```java
.requestMatchers("/api/admin/**").hasRole("ADMIN")
```

This is backend-enforced. The frontend route guard is only a UX layer.

The existing JWT filter already creates authorities from the user's role:

```java
ROLE_USER
ROLE_ADMIN
```

So `hasRole("ADMIN")` works with the existing auth model.

### Overview API

`GET /api/admin/overview` returns a compact operational snapshot:

- total users
- admin count
- learner count
- TTS cache file count
- TTS cache size
- storage writable status
- AI provider summary
- public audio path

Main files:

- `AdminOverviewController.java`
- `AdminOverviewService.java`
- `AdminOverviewResponse.java`

### Users API

`GET /api/admin/users` supports basic pagination and search by email/name.

`PATCH /api/admin/users/{id}/role` updates a user's role and writes an audit event.

Guardrails:

- Admins cannot demote their own account.
- The system prevents removing the last admin.
- Password hashes are never returned.
- Role changes are audit logged.

Main files:

- `AdminUserController.java`
- `AdminUserService.java`
- `AdminUserResponse.java`
- `UpdateUserRoleRequest.java`
- `UserRepository.java`

### TTS Admin API

`GET /api/admin/tts/summary` returns cache count, cache size, storage path, public path, and storage writability.

`GET /api/admin/tts/cache` returns generated `.mp3` cache files.

`DELETE /api/admin/tts/cache/{cacheKey}` deletes one generated MP3 and writes an audit event.

Guardrails:

- Cache keys must match `[a-zA-Z0-9_-]+`.
- Deletion path is normalized and must stay inside the TTS storage directory.

Main files:

- `AdminTtsController.java`
- `AdminTtsService.java`
- `TtsSummaryResponse.java`
- `TtsCacheItemResponse.java`

### AI Admin API

`GET /api/admin/ai/summary` returns a basic provider/admin-protection status object.

This is intentionally lightweight until persistent AI usage logging exists.

Main file:

- `AdminAiController.java`

### Audit API

`GET /api/admin/audit` returns recent admin audit events.

Audit events are written for:

- user role changes
- TTS cache deletion

Main files:

- `AdminAuditEvent.java`
- `AdminAuditRepository.java`
- `AdminAuditService.java`
- `AdminAuditController.java`
- `AdminAuditResponse.java`

## Database Requirement

The project currently uses production-safe JPA validation in example config. Before deploying with `spring.jpa.hibernate.ddl-auto=validate`, create the audit table.

Schema file added:

```text
server/src/main/resources/admin-schema.sql
```

Run that SQL against production/staging before deploying the admin audit entity.

## Frontend Design

### Route Guard

`RequireAdmin` checks:

- auth loading state
- signed-in state
- `user.role === "ADMIN"`

Non-authenticated users go to `/signin`. Non-admin authenticated users go to `/app`.

Main file:

- `frontend/src/layouts/RequireAdmin.tsx`

### Layout

`AdminLayout` provides a dedicated admin sidebar and page outlet.

Main file:

- `frontend/src/layouts/AdminLayout.tsx`

### API Client

`adminApi.ts` wraps all `/api/admin/**` calls and attaches the current Bearer token.

It maps:

- `401` to `ADMIN_AUTH_REQUIRED`
- `403` to `ADMIN_FORBIDDEN`

Main file:

- `frontend/src/services/adminApi.ts`

### Pages

- `AdminOverviewPage.tsx`: metrics snapshot.
- `AdminUsersPage.tsx`: search users and toggle role.
- `AdminTtsPage.tsx`: inspect/delete generated MP3 cache files.
- `AdminAiPage.tsx`: AI provider status placeholder.
- `AdminAuditPage.tsx`: audit event table.
- `AdminSettingsPage.tsx`: settings backlog placeholder.

## How To Verify

Backend build:

```bash
cd server
JAVA_HOME=$(/usr/libexec/java_home -v 17) mvn -q -DskipTests package
```

Frontend build:

```bash
cd frontend
npm run build
```

Manual API checks after signing in as admin:

```bash
curl -H "Authorization: Bearer <ADMIN_TOKEN>" https://bilimly-ai.onrender.com/api/admin/overview
curl -H "Authorization: Bearer <ADMIN_TOKEN>" https://bilimly-ai.onrender.com/api/admin/users
curl -H "Authorization: Bearer <ADMIN_TOKEN>" https://bilimly-ai.onrender.com/api/admin/tts/summary
```

Expected security behavior:

- No token: `401`
- USER token: `403`
- ADMIN token: `200`

## Remaining Work

- Add real persistent AI usage metrics.
- Add listening content CRUD backed by database tables.
- Add admin provisioning workflow so nobody edits DB roles manually.
- Add tests for `/api/admin/**` authorization.
- Add confirmation dialogs instead of `window.prompt`/`window.confirm`.
- Add pagination controls to admin tables.
- Add typed error pages for forbidden/admin-only states.

## DAU Analytics Implementation

### Activity Tracking

Authenticated activity is recorded from `JwtAuthFilter` after a Bearer token is validated and the user exists. The filter calls `UserActivityService.recordAuthenticatedActivity(user.getId())`.

The table is `daily_active_users`, with one unique row per `(user_id, activity_date)`. Repeated activity on the same UTC day updates `last_seen_at` and increments `activity_count`.

Main files:

- `server/src/main/java/com/bilimly/backend/analytics/DailyActiveUser.java`
- `server/src/main/java/com/bilimly/backend/analytics/DailyActiveUserRepository.java`
- `server/src/main/java/com/bilimly/backend/analytics/UserActivityService.java`
- `server/src/main/java/com/bilimly/backend/auth/JwtAuthFilter.java`

### Admin Analytics Endpoint

`GET /api/admin/analytics?days=30` returns:

- DAU time series.
- Active user breakdown by native language.
- Active user breakdown by role.
- Retention cohorts for day 1, day 7, and day 14.
- Summary metrics for today, average DAU, and selected range.

Main files:

- `server/src/main/java/com/bilimly/backend/admin/analytics/AdminAnalyticsController.java`
- `server/src/main/java/com/bilimly/backend/admin/analytics/AdminAnalyticsService.java`
- `server/src/main/java/com/bilimly/backend/admin/analytics/AdminAnalyticsResponse.java`

### Admin Analytics UI

`/admin/analytics` shows:

- DAU area chart.
- Native-language breakdown bar chart.
- Role breakdown bar chart.
- Retention cohort table.
- 7/30/60/90 day range selector.

Main file:

- `frontend/src/pages/Admin/AdminAnalyticsPage.tsx`

### Schema

The `daily_active_users` table was added to:

- `server/src/main/resources/admin-schema.sql`

Run this schema before production deploy when JPA validation is enabled.
