# AI Caching Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  (Frontend - React, Mobile App, etc.)                        │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP Request
                         │ POST /api/ai/chat
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                     Controller Layer                         │
│  ┌────────────────────────────────────────────────────┐    │
│  │  AiController / CachedAiController                  │    │
│  │  - Validates requests                               │    │
│  │  - Calls AiService                                  │    │
│  │  - Returns responses                                │    │
│  └───────────────────────┬────────────────────────────┘    │
└────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      Service Layer                           │
│  ┌────────────────────────────────────────────────────┐    │
│  │              AiService                              │    │
│  │                                                      │    │
│  │  chatWithCache(prompt, system, contentType, temp)   │    │
│  │                                                      │    │
│  │  Step 1: Build cache key ─────────────────┐        │    │
│  │  Step 2: Check cache          ─────────┐  │        │    │
│  │  Step 3: Call API if miss     ──────┐  │  │        │    │
│  │  Step 4: Store in cache       ────┐ │  │  │        │    │
│  │  Step 5: Return response          │ │  │  │        │    │
│  └───────────────────────────────────┼─┼──┼──┼────────┘    │
└────────────────────────────────────────────────────────────┘
                           │ │  │  │
           ┌───────────────┘ │  │  └──────────────┐
           │                 │  │                  │
           ▼                 ▼  ▼                  ▼
   ┌──────────────┐  ┌────────────────┐  ┌──────────────┐
   │CacheKeyBuilder│  │ AiCacheService │  │Claude WebClient│
   │               │  │   (Interface)   │  │               │
   │ - Normalize   │  │                │  │ - HTTP client │
   │ - Hash SHA256 │  │  get(key)      │  │ - Auth header │
   │ - Build key   │  │  put(key,val)  │  │ - API calls   │
   └──────────────┘  │  evict(key)    │  └──────────────┘
                     │  clear()       │          │
                     └────────┬───────┘          │
                              │                  │
                     ┌────────┴────────┐         │
                     │                 │         │
                     ▼                 ▼         ▼
            ┌────────────────┐  ┌────────────────┐
            │InMemoryCache   │  │  RedisCache    │
            │                │  │                │
            │ConcurrentHashMap│ │StringRedisTemplate│
            │ - Fast         │  │ - Persistent   │
            │ - Local        │  │ - Shared       │
            │ - Dev/Single   │  │ - Production   │
            └────────────────┘  └────────────────┘
                     │                   │
                     └───────┬───────────┘
                             │
                             ▼
                   ┌──────────────────┐
                   │ CacheTtlStrategy │
                   │                  │
                   │ - ContentType    │
                   │ - Temperature    │
                   │ - TTL logic      │
                   └──────────────────┘
```

## Request Flow Diagram

### Cache Hit Scenario (Fast Path)

```
User Request
     │
     ▼
┌─────────────┐
│ Controller  │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ AiService.chatWithCache()               │
│                                         │
│ 1. Build cache key                      │
│    "what is past tense?" + model + ...  │
│    → SHA256 hash                        │
│    → "7f3a8b2c1d4e..."                  │
│                                         │
│ 2. Check cache                          │
│    cacheService.get("7f3a8b2c...")      │
│    → Found! ✅                          │
│                                         │
│ 3. Return cached response               │
│    (Skip API call)                      │
└──────────────┬──────────────────────────┘
               │
               ▼
         Response (5ms)

Total: ~5-10ms
Cost: $0
API calls: 0
```

### Cache Miss Scenario (Slow Path)

```
User Request
     │
     ▼
┌─────────────┐
│ Controller  │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ AiService.chatWithCache()               │
│                                         │
│ 1. Build cache key                      │
│    → "7f3a8b2c1d4e..."                  │
│                                         │
│ 2. Check cache                          │
│    cacheService.get("7f3a8b2c...")      │
│    → Not found ❌                       │
│                                         │
│ 3. Call Claude API                      │
│    callClaudeApi(...)                   │
│    → Wait for response (2000ms)         │
│                                         │
│ 4. Store in cache                       │
│    cacheService.put(                    │
│      key,                               │
│      response,                          │
│      TTL: 30 days                       │
│    )                                    │
│                                         │
│ 5. Return response                      │
└──────────────┬──────────────────────────┘
               │
               ▼
        Response (2000ms)

Total: ~2000-3000ms
Cost: $0.01
API calls: 1

Next request: Cache hit! ✅
```

## Component Interactions

### Cache Key Generation Flow

```
User Input: "What is PAST   TENSE?"
     │
     ▼
┌──────────────────────────────────┐
│ CacheKeyBuilder.buildKey()       │
│                                  │
│ Input normalization:             │
│  1. Trim: "What is PAST   TENSE?"│
│  2. Lowercase: "what is past..." │
│  3. Collapse spaces: "what is..." │
│                                  │
│ Composite key:                   │
│  "prompt:what is past tense|     │
│   model:claude-sonnet-4-5|       │
│   temp:0.00|                     │
│   tokens:4096|                   │
│   system:You are a tutor..."     │
│                                  │
│ Hash (SHA-256):                  │
│  "7f3a8b2c1d4e5f6a7b8c9d0e..."   │
└──────────────┬───────────────────┘
               │
               ▼
      Unique Cache Key ✅

Different inputs:
"What is past tense?"     → Same hash ✅
"what is past tense?"     → Same hash ✅
"WHAT  IS  PAST  TENSE?"  → Same hash ✅

"What is present tense?"  → Different hash ✅
```

### TTL Determination Flow

```
Request with:
- ContentType: VOCABULARY
- Temperature: 0.0
     │
     ▼
┌─────────────────────────────────┐
│ CacheTtlStrategy                │
│                                 │
│ getTtl(VOCABULARY) → 30 days    │
│ getTtlByTemperature(0.0) → 30d  │
│                                 │
│ getConservativeTtl()            │
│   min(30 days, 30 days) = 30d   │
└─────────────┬───────────────────┘
              │
              ▼
       TTL: 30 days ✅

---

Request with:
- ContentType: GRAMMAR
- Temperature: 0.8
     │
     ▼
┌─────────────────────────────────┐
│ CacheTtlStrategy                │
│                                 │
│ getTtl(GRAMMAR) → 30 days       │
│ getTtlByTemperature(0.8) → 15min│
│                                 │
│ getConservativeTtl()            │
│   min(30 days, 15 min) = 15 min │
└─────────────┬───────────────────┘
              │
              ▼
       TTL: 15 minutes ⚠️
```

## Deployment Architectures

### Development: In-Memory Cache

```
┌─────────────────────────────┐
│     Localhost:8080          │
│                             │
│  ┌─────────────────────┐   │
│  │   Spring Boot App    │   │
│  │                      │   │
│  │  ┌────────────────┐  │   │
│  │  │ AiService      │  │   │
│  │  └───────┬────────┘  │   │
│  │          │           │   │
│  │  ┌───────▼────────┐  │   │
│  │  │ InMemoryCache  │  │   │
│  │  │ ConcurrentMap  │  │   │
│  │  └────────────────┘  │   │
│  │                      │   │
│  │  Lost on restart ⚠️  │   │
│  └─────────────────────┘   │
└─────────────────────────────┘

Pros: Fast, zero setup
Cons: Not persistent, not shared
```

### Production: Redis Cache

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   Server 1      │  │   Server 2      │  │   Server 3      │
│   :8080         │  │   :8080         │  │   :8080         │
│                 │  │                 │  │                 │
│ ┌─────────────┐ │  │ ┌─────────────┐ │  │ ┌─────────────┐ │
│ │Spring Boot  │ │  │ │Spring Boot  │ │  │ │Spring Boot  │ │
│ │             │ │  │ │             │ │  │ │             │ │
│ │ AiService   │ │  │ │ AiService   │ │  │ │ AiService   │ │
│ └──────┬──────┘ │  │ └──────┬──────┘ │  │ └──────┬──────┘ │
│        │        │  │        │        │  │        │        │
└────────┼────────┘  └────────┼────────┘  └────────┼────────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              │
                    All share same cache ✅
                              │
                              ▼
                   ┌─────────────────┐
                   │  Redis Server   │
                   │  :6379          │
                   │                 │
                   │  Persistent ✅  │
                   │  Shared ✅      │
                   │  Fast ✅        │
                   └─────────────────┘

Pros: Persistent, shared, scalable
Cons: External dependency
```

## Content Type Decision Tree

```
Is content user-specific?
│
├─ YES → Use ContentType.PERSONALIZED
│         Cache: NO
│         TTL: N/A
│         Example: Essay reviews, personal feedback
│
└─ NO → Is it educational content?
        │
        ├─ Word definition/translation?
        │  → Use ContentType.VOCABULARY
        │    Cache: YES
        │    TTL: 30 days
        │
        ├─ Grammar rule/explanation?
        │  → Use ContentType.GRAMMAR
        │    Cache: YES
        │    TTL: 30 days
        │
        ├─ Exercise/practice question?
        │  → Use ContentType.EXERCISE
        │    Cache: YES
        │    TTL: 7 days
        │
        └─ General Q&A/Chat?
           → Use ContentType.GENERAL_CHAT
             Cache: YES
             TTL: 1 hour
```

## Temperature Impact

```
Temperature: 0.0
├─ Very deterministic
├─ Same input → Same output
├─ Perfect for caching ✅
└─ TTL: 30 days

Temperature: 0.5
├─ Some variation
├─ Moderate caching ⚠️
└─ TTL: 1 hour

Temperature: 0.8
├─ High creativity
├─ Different outputs
├─ Short cache ⚠️
└─ TTL: 15 minutes

Temperature: 1.0
├─ Maximum randomness
├─ Don't cache ❌
└─ TTL: N/A
```

## Error Handling Flow

```
Request
  │
  ▼
Check Cache
  │
  ├─ HIT → Return ✅
  │
  └─ MISS → Call API
             │
             ├─ SUCCESS
             │   │
             │   ├─ Store in cache ✅
             │   └─ Return response
             │
             └─ ERROR
                 │
                 ├─ DON'T cache error ✅
                 ├─ Log error
                 └─ Throw exception
```

## Cache Eviction Strategies

### Time-Based (Automatic)

```
Cache Entry:
┌──────────────────────────────┐
│ Key: "7f3a8b2c..."           │
│ Value: "Past tense is..."    │
│ Created: 2024-01-01 10:00    │
│ TTL: 30 days                 │
│ Expires: 2024-01-31 10:00    │
└──────────────────────────────┘
              │
              │ Time passes...
              │
              ▼
        2024-01-31 10:00
              │
              ▼
      Automatically removed ✅
```

### Manual (Admin-Triggered)

```
Admin updates content
  │
  ▼
Controller calls:
aiService.evictCache(prompt, system)
  │
  ▼
CacheService removes entry
  │
  ▼
Next request will fetch fresh content ✅
```

## Monitoring & Observability

```
Application Logs:
┌─────────────────────────────────────────┐
│ 10:00:01 Cache MISS key:7f3a...         │
│ 10:00:03 Cached response TTL:PT720H     │
│ 10:00:05 Cache HIT key:7f3a... ✅       │
│ 10:00:06 Cache HIT key:7f3a... ✅       │
│ 10:00:08 Cache HIT key:7f3a... ✅       │
└─────────────────────────────────────────┘
              │
              ▼
        Metrics Dashboard:
┌─────────────────────────────────────────┐
│ Cache Hit Rate: 75%                     │
│ API Calls Saved: 300                    │
│ Cost Savings: $3.00                     │
│ Avg Response Time: 250ms                │
│   - Cached: 5ms                         │
│   - Uncached: 2000ms                    │
└─────────────────────────────────────────┘
```

## Security Layers

```
┌─────────────────────────────────────────┐
│          Request Layer                   │
│  - JWT authentication                    │
│  - Rate limiting                         │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│          Cache Layer                     │
│  - Hashed keys (no data exposure)       │
│  - Namespace isolation                   │
│  - No PII in cache keys                  │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│          Storage Layer                   │
│  Redis:                                  │
│    - Password protected                  │
│    - Network isolation                   │
│    - TLS encryption                      │
└─────────────────────────────────────────┘
```

## Scaling Considerations

```
Stage 1: Development
┌─────────────────────┐
│ 1 Server            │
│ In-Memory Cache     │
│ < 1000 requests/day │
└─────────────────────┘

Stage 2: Small Production
┌─────────────────────┐
│ 1-2 Servers         │
│ Redis Cache         │
│ < 10k requests/day  │
└─────────────────────┘

Stage 3: Growth
┌─────────────────────┐
│ 3-10 Servers        │
│ Redis Cache         │
│ 10k-100k req/day    │
└─────────────────────┘

Stage 4: Scale
┌─────────────────────┐
│ 10+ Servers         │
│ Redis Cluster       │
│ 100k+ requests/day  │
│ Multi-region        │
└─────────────────────┘
```

## Performance Comparison

```
Scenario: 1000 vocabulary lookups for "resilient"

WITHOUT CACHE:
═══════════════════════════════════════
Request 1-1000: Each calls API
Time: 1000 × 2000ms = 2,000,000ms (33 minutes)
Cost: 1000 × $0.01 = $10.00
API Load: 1000 calls

WITH CACHE:
═══════════════════════════════════════
Request 1: Calls API (2000ms)
Request 2-1000: Cache hit (5ms each)
Time: 2000ms + (999 × 5ms) = 6,995ms (~7 seconds)
Cost: 1 × $0.01 = $0.01
API Load: 1 call

IMPROVEMENT:
═══════════════════════════════════════
Speed: 285× faster
Cost: 99.9% reduction
API Load: 99.9% reduction
```

## Summary

This architecture provides:

✅ **Performance:** 200-400x faster cached responses
✅ **Cost:** 70-90% API cost reduction
✅ **Scalability:** From dev to multi-server production
✅ **Flexibility:** In-memory or Redis backends
✅ **Safety:** Smart defaults prevent mistakes
✅ **Observability:** Built-in logging and monitoring
✅ **Maintainability:** Clean, modular design

The system is production-ready and scales with your needs!
