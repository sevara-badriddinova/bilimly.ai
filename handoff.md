# Bilimly.ai Handoff

Date: 2026-05-12

## What Was Done

### Gemini TTS backend

- Added a backend TTS flow at `POST /api/tts`.
- Added Gemini TTS integration through the backend only.
- Added MP3 caching so repeated lesson audio does not call Gemini again.
- Added deterministic cache keys based on namespace + text hash.
- Added public access only for predefined listening tracks.
- Public predefined TTS ignores client-provided text and uses server-owned transcripts.
- Custom/arbitrary TTS requires a real Bearer JWT.
- Added per-user and per-IP custom TTS rate limits.
- Added TTS cache cleanup settings:
  - max file count
  - max age in days
- Increased Gemini WebClient buffer size because audio responses can exceed Spring WebClient’s default 256 KB limit.
- Added `ffmpeg` to the backend Docker image because Gemini can return PCM audio that must be converted to MP3.

Main files:

- `server/src/main/java/com/bilimly/backend/tts/TtsController.java`
- `server/src/main/java/com/bilimly/backend/tts/TtsService.java`
- `server/src/main/java/com/bilimly/backend/tts/GeminiTtsClient.java`
- `server/src/main/java/com/bilimly/backend/tts/ListeningTtsCatalog.java`
- `server/src/main/java/com/bilimly/backend/tts/TtsStaticResourceConfig.java`
- `server/src/main/java/com/bilimly/backend/tts/dto/TtsRequest.java`
- `server/src/main/java/com/bilimly/backend/tts/dto/TtsResponse.java`
- `server/Dockerfile`

### Audio file serving

- Made generated audio files public:
  - `/audio`
  - `/audio/**`
- Added a static resource handler for `/audio/**`.
- Restricted static audio serving to the configured TTS storage folder so it cannot serve arbitrary server files.
- Added `/audio` proxy in Vite dev config so local browser playback works.

Main files:

- `server/src/main/java/com/bilimly/backend/config/SecurityConfig.java`
- `server/src/main/java/com/bilimly/backend/tts/TtsStaticResourceConfig.java`
- `frontend/vite.config.ts`

### Frontend listening audio

- Replaced browser `speechSynthesis` in the listening page with backend TTS audio URLs.
- Uses `HTMLAudioElement`.
- Added loading/error state.
- Added pause/resume behavior.
- Added audio cleanup on unmount.
- Uses `resolveApiUrl()` so returned `/audio/...mp3` paths resolve against the configured backend.

Main files:

- `frontend/src/pages/Listening/ListeningPage.tsx`
- `frontend/src/services/api.ts`

### Security hardening

- Tightened CORS to explicit origins only:
  - `http://localhost:5173`
  - `http://127.0.0.1:5173`
  - `https://bilimly-ai.vercel.app`
- Removed wildcard Vercel CORS origin.
- Kept Bearer JWT auth.
- Restored content type `nosniff` protection.
- Admin-protected `/api/ai/examples/**`.
- Kept `CachedAiController`, but restricted it to `ADMIN`.
- Added DTO validation and rate limiting to AI example endpoints.
- Hardened duplicate `/api/chat` route so it now uses validation, sanitization, and rate limits instead of bypassing the main AI protection path.
- Removed raw exception message leakage from `/api/chat`.
- Strengthened env-file ignore patterns.
- Updated example config toward production-safe defaults:
  - `spring.jpa.hibernate.ddl-auto=validate`
  - `spring.jpa.show-sql=false`

Main files:

- `server/src/main/java/com/bilimly/backend/config/SecurityConfig.java`
- `server/src/main/java/com/bilimly/backend/ai/examples/CachedAiController.java`
- `server/src/main/java/com/bilimly/backend/chat/ChatController.java`
- `server/src/main/resources/application.properties.example`
- `.gitignore`

## Current Production Symptoms

The latest browser console showed:

```text
POST https://bilimly-ai.onrender.com/api/tts 502 (Bad Gateway)
```

This is no longer the original auth problem. It means Render reaches the backend, but backend audio generation fails.

Most likely cause found:

- Render image did not have `ffmpeg`.
- `TtsService` needs `ffmpeg` when Gemini returns PCM audio.
- `server/Dockerfile` now installs `ffmpeg`.

Another production symptom was:

```text
GET /audio/listening-...mp3 401
```

Local code now explicitly permits `/audio` and `/audio/**`, so if production still returns 401, Render is running an older backend build.

## Verification Already Done

Local/backend checks performed during work:

- Backend Maven build passed:

```bash
JAVA_HOME=$(/usr/libexec/java_home -v 17) mvn -q -DskipTests package
```

- Frontend build passed:

```bash
npm run build
```

- Public predefined TTS returned `200` locally.
- Custom TTS without auth returned `401` locally.
- Signed-in `/api/auth/me` returned `200` locally.
- Normal USER access to `/api/ai/examples/**` was denied.
- Invalid signed-in `/api/ai/chat` payload returned validation error instead of reaching AI.
- Generated audio was reachable locally through `/audio/...mp3` with `content-type: audio/mpeg`.

Note: ADMIN access to `/api/ai/examples/**` was not live-tested because no safe admin credential was available without touching secrets or directly mutating DB data.

## What Needs To Happen Next

### 1. Redeploy Render backend

Redeploy the backend so production gets:

- `/audio`, `/audio/**` public matcher.
- safer `/audio/**` static resource resolver.
- `ffmpeg` installed in the Docker image.
- Gemini WebClient buffer increase.
- hardened AI/TTS security rules.

Important: confirm Render is actually using `server/Dockerfile`. If Render is not using Docker deploy, then `ffmpeg` must be installed through Render’s build environment or the service should be switched to Docker deploy.

### 2. Test production TTS after redeploy

Run:

```bash
curl -i -X POST https://bilimly-ai.onrender.com/api/tts \
  -H "Content-Type: application/json" \
  -d '{"trackId":"listening-1","text":"ignored client text"}'
```

Expected:

```json
{
  "audioUrl": "/audio/listening-1-....mp3",
  "cached": false
}
```

Then test the returned audio URL:

```bash
curl -I https://bilimly-ai.onrender.com/audio/<returned-file>.mp3
```

Expected:

- `200`
- `content-type: audio/mpeg`
- no `401`

### 3. Test frontend production playback

On `https://bilimly-ai.vercel.app`:

- Open Listening page.
- Press play on a predefined listening track.
- Confirm no `401` for `/audio/**`.
- Confirm no `502` from `/api/tts`.
- Confirm audio plays.

### 4. Confirm Render logs if 502 remains

If `/api/tts` still returns `502`, check Render logs for:

- `ffmpeg failed`
- `Gemini TTS response did not include audio data`
- Gemini model errors
- missing `GEMINI_API_KEY`
- filesystem permission errors for `TTS_STORAGE_DIR`

Do not print API key values.

### 5. Optional next hardening

These are not required for the immediate fix, but recommended:

- Move audio cache to Cloudflare R2, S3, or Supabase Storage so Render restarts do not lose cached MP3 files.
- Add a real admin-provisioning workflow instead of manually changing roles in DB.
- Add integration tests for:
  - public predefined TTS
  - custom TTS without auth
  - custom TTS with auth
  - `/audio/**` public file serving
  - normal USER blocked from `/api/ai/examples/**`
  - ADMIN allowed on `/api/ai/examples/**`
- Consider Redis-backed rate limits if Render scales beyond one instance.

## Important Security Notes

- Frontend should never call Gemini directly.
- Gemini API keys must stay backend-only.
- `/api/tts` is intentionally public only for server-owned predefined listening tracks.
- Custom TTS requires Bearer JWT and is rate-limited.
- `/audio/**` is public because browser audio requests do not automatically include Bearer tokens.
- `/audio/**` is restricted to generated audio files in the configured TTS storage folder.

