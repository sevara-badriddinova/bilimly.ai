# 🔐 Security Implementation - Bilimly.ai

## Overview
This document outlines all security measures implemented in the Bilimly.ai platform to protect user data, prevent abuse, and secure API endpoints.

---

## 🛡️ Security Features Implemented

### 1. **Authentication & Authorization**
✅ **JWT-based Authentication**
- Stateless token-based authentication
- Tokens expire after configured time
- Secure BCrypt password hashing (12 rounds)
- Role-based access control (USER, ADMIN)

✅ **Protected Endpoints**
- All `/api/ai/**` routes require authentication
- `/api/auth/me` requires valid JWT token
- Public routes: `/api/auth/login`, `/api/auth/register`

---

### 2. **Input Validation**

#### **DTO Validation (Jakarta Validation)**
All request DTOs include validation constraints:

**RegisterRequest:**
```java
- email: @NotBlank, @Email, max 255 chars
- password: @NotBlank, min 8, max 100 chars
- name: max 100 chars (optional)
```

**LoginRequest:**
```java
- email: @NotBlank, @Email
- password: @NotBlank, min 6 chars
```

**AiChatRequest:**
```java
- message: @NotBlank, min 1, max 4000 chars
- systemPrompt: max 10000 chars (optional)
```

---

### 3. **Input Sanitization**

#### **InputSanitizer Service**
Location: `com.bilimly.backend.security.InputSanitizer`

**Functions:**
- `sanitize(String)` - General text sanitization
- `sanitizeEmail(String)` - Email-specific cleaning
- `sanitizeText(String)` - Text with formatting preservation
- `sanitizeSystemPrompt(String)` - AI prompt sanitization
- `isSafe(String)` - Checks for dangerous patterns

**Protection Against:**
- ✅ XSS (Cross-Site Scripting)
- ✅ SQL Injection attempts
- ✅ Control character injection
- ✅ HTML/JavaScript injection
- ✅ Script tag injection (`<script>`, `javascript:`, `onerror=`)

**Sanitization Strategy:**
1. Remove control characters (except newlines/tabs)
2. HTML encode special characters (`< > & " ' /`)
3. Detect and reject dangerous patterns
4. Validate format after sanitization

---

### 4. **Rate Limiting**

#### **RateLimitService**
Location: `com.bilimly.backend.security.RateLimitService`

**Implementation:**
- In-memory sliding window algorithm
- Automatic cleanup of old entries (prevents memory leak)
- Thread-safe with `ConcurrentHashMap`

#### **Rate Limits by Endpoint:**

| Endpoint | Limit | Window | Identifier |
|----------|-------|--------|------------|
| `/api/auth/register` | 5 requests | 1 hour | IP Address |
| `/api/auth/login` | 10 requests | 15 minutes | IP Address |
| `/api/ai/chat` | 10 requests | 1 minute | User Email |
| **AI Tokens** | 50,000 tokens | 1 hour | User Email |

**IP Detection:**
- Checks `X-Forwarded-For` header (proxy/load balancer)
- Falls back to `X-Real-IP`
- Finally uses `getRemoteAddr()`

**AI Token Usage:**
- Estimates tokens based on input/output length
- Tracks token consumption per user
- Returns `429 Too Many Requests` with remaining token count
- Prevents AI API abuse and cost overrun

---

### 5. **Security Headers**

**Implemented Headers:**
```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; frame-ancestors 'none';
```

**Protection:**
- ✅ Clickjacking prevention (`X-Frame-Options: DENY`)
- ✅ MIME type sniffing prevention
- ✅ Force HTTPS in production (HSTS)
- ✅ Content Security Policy (CSP)

---

### 6. **CORS Configuration**

**Allowed Origins:**
```
- http://localhost:5173 (development)
- http://localhost:5174 (development)
```

**Allowed Methods:**
```
GET, POST, PUT, DELETE, OPTIONS
```

**Allowed Headers:**
```
Authorization, Content-Type, Accept
```

**Configuration:**
- Credentials: Allowed (for cookies/auth)
- Max Age: 3600 seconds (1 hour)

---

### 7. **Request Size Limits**

**Configuration (application.properties):**
```properties
spring.servlet.multipart.max-file-size=5MB
spring.servlet.multipart.max-request-size=10MB
server.max-http-header-size=16KB
```

**Protection Against:**
- ✅ Large payload attacks
- ✅ Memory exhaustion
- ✅ Header overflow attacks

---

## 🚨 Threat Protection

### **XSS (Cross-Site Scripting)**
**Mitigation:**
- HTML encoding of all user inputs
- Pattern detection for `<script>`, `javascript:`, `onerror=`
- CSP headers prevent inline script execution
- React's default XSS protection in frontend

### **SQL Injection**
**Mitigation:**
- JPA/Hibernate parameterized queries
- Input sanitization detects SQL patterns
- No raw SQL queries in codebase
- PostgreSQL with prepared statements

### **Brute Force Attacks**
**Mitigation:**
- Rate limiting on login (10 attempts / 15 min)
- Rate limiting on registration (5 attempts / hour)
- Generic error messages ("Invalid credentials")
- IP-based tracking

### **API Abuse**
**Mitigation:**
- Request rate limiting (10 req/min for AI)
- Token usage limits (50k tokens/hour)
- Authentication required for AI endpoints
- Input length restrictions

### **Clickjacking**
**Mitigation:**
- `X-Frame-Options: DENY`
- CSP `frame-ancestors 'none'`

### **CSRF (Cross-Site Request Forgery)**
**Mitigation:**
- Disabled for API (stateless JWT)
- SameSite cookie policy (if cookies used)
- Token-based auth instead of sessions

---

## 🔍 Security Audit Results

### **Exposed APIs:**
✅ **Public Endpoints** (No Auth Required):
- `POST /api/auth/login`
- `POST /api/auth/register`

✅ **Protected Endpoints** (Auth Required):
- `GET /api/auth/me`
- `POST /api/ai/chat`

### **Validation Status:**
✅ All endpoints have input validation
✅ All user inputs are sanitized
✅ Rate limiting implemented
✅ Authentication enforced

---

## 🎯 AI-Specific Security

### **Claude API Protection**

**Token Management:**
- Maximum 4096 tokens per request
- 50,000 tokens per user per hour
- Automatic token estimation before API call
- Graceful degradation on limit exceeded

**Input Sanitization:**
- System prompts validated for dangerous content
- User messages HTML-encoded
- Length restrictions enforced
- Pattern detection for injection attempts

**Error Handling:**
- API keys never exposed in error messages
- Generic error responses to users
- Detailed logging server-side only
- Rate limit errors return 429 status

---

## 📊 Monitoring & Logging

**Security Events Logged:**
- ✅ Failed login attempts (with IP)
- ✅ Rate limit violations
- ✅ Input validation failures
- ✅ AI API errors
- ✅ Authentication failures

**Recommendation for Production:**
- Integrate with SIEM (Security Information and Event Management)
- Set up alerts for suspicious activity
- Monitor rate limit violations
- Track AI token usage patterns

---

## 🔧 Configuration

### **Environment Variables (Production):**
```bash
# Required
JWT_SECRET=<strong-secret-key>
CLAUDE_API_KEY=<your-anthropic-api-key>

# Database
SPRING_DATASOURCE_URL=jdbc:postgresql://host:5432/bilimly
SPRING_DATASOURCE_USERNAME=<db-user>
SPRING_DATASOURCE_PASSWORD=<db-password>

# Optional (with defaults)
AI_RATE_LIMIT_REQUESTS_PER_MINUTE=10
AI_RATE_LIMIT_TOKENS_PER_HOUR=50000
```

### **Security Checklist for Deployment:**

- [ ] Change JWT_SECRET to strong random value
- [ ] Use environment variables (not application.properties)
- [ ] Enable HTTPS/TLS
- [ ] Configure firewall rules
- [ ] Set up database backups
- [ ] Enable audit logging
- [ ] Configure CORS for production domain
- [ ] Review and adjust rate limits
- [ ] Set up monitoring/alerting
- [ ] Implement IP whitelisting (if needed)
- [ ] Enable database encryption at rest
- [ ] Use secrets management (AWS Secrets Manager, HashiCorp Vault)

---

## 🚀 Production Recommendations

### **Immediate Enhancements:**
1. **Redis for Rate Limiting** - Replace in-memory with distributed cache
2. **Database Connection Pooling** - Configure HikariCP properly
3. **API Gateway** - Add AWS API Gateway or Kong for additional layer
4. **WAF (Web Application Firewall)** - Cloudflare or AWS WAF
5. **DDoS Protection** - Cloudflare, AWS Shield

### **Advanced Security:**
1. **Penetration Testing** - Regular security audits
2. **Dependency Scanning** - Snyk, Dependabot
3. **SAST/DAST** - Static and dynamic analysis tools
4. **Bug Bounty Program** - HackerOne, Bugcrowd
5. **Security Headers Validation** - securityheaders.com

---

## 📝 Compliance

### **Data Protection:**
- ✅ Passwords hashed with BCrypt
- ✅ JWT tokens stored securely
- ✅ No sensitive data in logs
- ✅ HTTPS enforcement (production)

### **GDPR Considerations:**
- User data minimization (only essential fields)
- Right to deletion (implement user account deletion)
- Data encryption in transit
- Audit trail for data access

---

## 🐛 Reporting Security Issues

If you discover a security vulnerability:

1. **Do NOT** open a public GitHub issue
2. Email: security@bilimly.ai (if available)
3. Provide detailed description with steps to reproduce
4. Allow reasonable time for fix before disclosure

---

## ✅ Security Summary

**Strong Points:**
- ✅ JWT authentication with BCrypt hashing
- ✅ Comprehensive input validation and sanitization
- ✅ Multi-layered rate limiting (requests + AI tokens)
- ✅ Security headers configured
- ✅ CORS properly restricted
- ✅ Request size limits enforced
- ✅ No SQL injection vectors
- ✅ XSS protection implemented

**Areas for Production:**
- ⚠️ Move rate limiting to Redis (distributed)
- ⚠️ Implement refresh token rotation
- ⚠️ Add account lockout mechanism
- ⚠️ Set up comprehensive monitoring
- ⚠️ Implement audit logging to database
- ⚠️ Add 2FA (Two-Factor Authentication)
- ⚠️ Set up automated security scanning

---

**Last Updated:** 2026-03-09
**Security Level:** Medium-High (suitable for MVP/staging)
