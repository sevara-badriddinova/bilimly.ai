# AI Caching - Common Mistakes & How to Avoid Them

## ❌ Mistake #1: Caching Personalized Content

### The Problem
```java
// WRONG - User-specific content gets cached
@PostMapping("/api/feedback")
public String reviewEssay(@RequestBody EssayRequest request) {
    String prompt = String.format(
        "Review this essay for user %d:\n%s",
        request.userId(),
        request.essay()
    );

    // ❌ User 1's feedback gets cached
    // ❌ User 2 gets User 1's feedback!
    return aiService.chatWithCache(
        prompt,
        null,
        ContentType.GENERAL_CHAT,  // ❌ Wrong type!
        0.0
    );
}
```

### The Impact
- User A uploads essay, gets feedback
- Cache stores: "Great work on paragraphs 1-3..."
- User B uploads **different** essay
- User B receives **User A's feedback**! 🚨

### The Solution
```java
// RIGHT - Use PERSONALIZED content type
@PostMapping("/api/feedback")
public String reviewEssay(@RequestBody EssayRequest request) {
    String prompt = String.format(
        "Review this essay:\n%s",
        request.essay()
    );

    return aiService.chatWithCache(
        prompt,
        null,
        ContentType.PERSONALIZED,  // ✅ Won't cache
        0.0
    );
}
```

### How to Identify
Personalized content includes:
- User IDs, names, or personal info
- User-submitted text (essays, stories)
- User history or progress
- User-specific recommendations
- Anything unique to one user

---

## ❌ Mistake #2: Including Timestamps in Cache Keys

### The Problem
```java
// WRONG - Timestamp prevents cache hits
@PostMapping("/api/vocab")
public String defineWord(@RequestBody String word) {
    String prompt = String.format(
        "Define '%s'. Requested at: %s",
        word,
        LocalDateTime.now()  // ❌ Always different!
    );

    return aiService.chat(prompt, null);
    // Every request is unique, cache never hits!
}
```

### The Impact
```
Request 1: "Define 'cat'. Requested at: 2024-01-15 10:00:00"
  → Cache key: abc123...
  → API call

Request 2: "Define 'cat'. Requested at: 2024-01-15 10:00:01"
  → Cache key: def456...  (different!)
  → API call again ❌
  → 0% cache hit rate
```

### The Solution
```java
// RIGHT - Remove non-essential time-dependent data
@PostMapping("/api/vocab")
public String defineWord(@RequestBody String word) {
    String prompt = String.format("Define '%s'", word);
    return aiService.chat(prompt, null);  // ✅ Cacheable
}
```

### Other Time-Dependent Anti-Patterns
```java
// ❌ Don't include:
- LocalDateTime.now()
- System.currentTimeMillis()
- UUID.randomUUID()
- request.getSessionId()
- "Question #" + counter
```

---

## ❌ Mistake #3: Wrong Content Type = Wrong TTL

### The Problem
```java
// WRONG - Creative content with long TTL
@PostMapping("/api/creative/story")
public String writeStory(@RequestBody String prompt) {
    return aiService.chatWithCache(
        "Write a creative story about: " + prompt,
        null,
        ContentType.VOCABULARY,  // ❌ 30 days TTL!
        0.9  // High temperature = random
    );
}
```

### The Impact
- Temperature 0.9 = very creative/random responses
- VOCABULARY = 30 day cache
- Same creative story returned for 30 days
- Users expect variety, get same story every time

### The Solution
```java
// RIGHT - Match content type to use case
@PostMapping("/api/creative/story")
public String writeStory(@RequestBody String prompt) {
    return aiService.chatWithCache(
        "Write a creative story about: " + prompt,
        null,
        ContentType.GENERAL_CHAT,  // ✅ 1 hour TTL
        0.9  // High temp → short cache
    );
}

// OR better yet, don't cache creative content at all:
@PostMapping("/api/creative/story")
public String writeStory(@RequestBody String prompt) {
    return aiService.chatWithCache(
        "Write a creative story about: " + prompt,
        null,
        ContentType.PERSONALIZED,  // ✅ No cache
        0.9
    );
}
```

### Content Type Cheat Sheet
| Content | Type | TTL | Temperature |
|---------|------|-----|-------------|
| Definitions | `VOCABULARY` | 30 days | 0.0 |
| Grammar rules | `GRAMMAR` | 30 days | 0.0 |
| Exercises | `EXERCISE` | 7 days | 0.0 |
| Q&A | `GENERAL_CHAT` | 1 hour | 0.0-0.5 |
| Creative | `PERSONALIZED` | No cache | 0.7+ |
| User-specific | `PERSONALIZED` | No cache | Any |

---

## ❌ Mistake #4: Forgetting to Evict After Updates

### The Problem
```java
// Admin updates lesson content
@PutMapping("/api/admin/lessons/{id}")
public Lesson updateLesson(@PathVariable Long id, @RequestBody Lesson lesson) {
    lessonRepository.save(lesson);
    // ❌ Forgot to clear cache!
    return lesson;
}

// Students still get old cached content
@GetMapping("/api/lessons/{id}/explanation")
public String getExplanation(@PathVariable Long id) {
    Lesson lesson = lessonRepository.findById(id);
    // Returns OLD cached response ❌
    return aiService.chat(lesson.getPrompt(), null);
}
```

### The Impact
- Admin updates "Past Tense" lesson
- Cache still has old explanation
- Students see outdated content for 30 days
- Admin thinks update didn't work

### The Solution
```java
@PutMapping("/api/admin/lessons/{id}")
public Lesson updateLesson(@PathVariable Long id, @RequestBody Lesson lesson) {
    lessonRepository.save(lesson);

    // ✅ Evict old cached content
    aiService.evictCache(lesson.getPrompt(), null);

    return lesson;
}
```

### When to Evict Cache
- ✅ After content updates
- ✅ After corrections
- ✅ After admin edits
- ✅ When switching AI models
- ✅ When changing prompts

---

## ❌ Mistake #5: High Temperature + Long Cache

### The Problem
```java
// WRONG - Random responses cached for 30 days
@PostMapping("/api/practice/conversation")
public String practice(@RequestBody String topic) {
    return aiService.chatWithCache(
        "Start a conversation about: " + topic,
        null,
        ContentType.VOCABULARY,  // ❌ 30 days
        0.9  // ❌ Very random
    );
}
```

### The Impact
- High temperature = creative, random responses
- Long cache = same "random" response every time
- Defeats the purpose of using high temperature

### The Solution
```java
// RIGHT - Don't cache high-temperature responses
@PostMapping("/api/practice/conversation")
public String practice(@RequestBody String topic) {
    return aiService.chatWithCache(
        "Start a conversation about: " + topic,
        null,
        ContentType.PERSONALIZED,  // ✅ No cache
        0.9
    );
}
```

### Temperature Guidelines
| Temperature | Should Cache? | TTL |
|-------------|---------------|-----|
| 0.0 - 0.3 | ✅ Yes | 30 days |
| 0.4 - 0.7 | ⚠️ Maybe | 1 hour |
| 0.8 - 0.9 | ❌ No | Don't cache |
| 1.0 | ❌ Never | Don't cache |

---

## ❌ Mistake #6: Caching Errors

### The Problem
```java
// WRONG - Errors get cached
try {
    String response = callClaudeApi(...);
    cacheService.put(key, response, ttl);  // ❌ Even on error
    return response;
} catch (Exception e) {
    String error = "Error: " + e.getMessage();
    cacheService.put(key, error, ttl);  // ❌ Cached error!
    return error;
}
```

### The Impact
- API temporarily down
- Error message gets cached
- API comes back up
- Users still see cached error for TTL duration

### The Solution
```java
// RIGHT - Only cache successful responses
try {
    String response = callClaudeApi(...);
    // ✅ Only cache on success
    cacheService.put(key, response, ttl);
    return response;
} catch (Exception e) {
    // ✅ Don't cache errors
    log.error("API error: {}", e.getMessage());
    throw e;  // Let caller handle
}
```

**Our implementation already does this correctly!** ✅

---

## ❌ Mistake #7: Ignoring Cache Size

### The Problem
```java
// WRONG - Unbounded cache growth
for (String word : dictionary) {  // 100,000 words
    aiService.chat("Define: " + word, null);
}
// ❌ Cache grows to 100,000 entries
// ❌ Memory issues
```

### The Impact
- In-memory cache grows too large
- Application runs out of memory
- Crashes or slow performance

### The Solution

**Option 1:** Use Redis (recommended for production)
```properties
ai.cache.type=redis
```
Redis handles large datasets efficiently.

**Option 2:** Monitor and set limits
```java
// Add to InMemoryAiCacheService
private static final int MAX_CACHE_SIZE = 10000;

@Override
public void put(String key, String response, Duration ttl) {
    if (cache.size() >= MAX_CACHE_SIZE) {
        // Evict oldest entries (LRU strategy)
        evictOldest();
    }
    cache.put(key, new CacheEntry(response, Instant.now().plus(ttl)));
}
```

---

## ❌ Mistake #8: Not Normalizing User Input

### The Problem
```java
// These should hit same cache but don't:
"What is past tense?"
"what is past tense?"
"What  is  past   tense?"
"WHAT IS PAST TENSE?"
```

### The Impact
- Same question, different formatting
- Cache misses unnecessarily
- Lower hit rate, higher costs

### The Solution
**Our implementation already handles this!** ✅

`CacheKeyBuilder` normalizes:
- ✅ Trims whitespace
- ✅ Lowercases text
- ✅ Collapses multiple spaces
- ✅ Normalizes line breaks

```java
// All these hit the same cache:
aiService.chat("What is past tense?", null);
aiService.chat("what is past tense?", null);
aiService.chat("WHAT  IS  PAST  TENSE?", null);
// → All normalized to: "what is past tense?"
```

---

## ❌ Mistake #9: Wrong Cache for Deployment Type

### The Problem
```java
// WRONG - In-memory cache in multi-server setup
// Server 1 caches response
// Server 2 doesn't have it
// Load balancer sends to Server 2
// Cache miss!
```

### The Impact
- Multi-server deployment
- Each server has own cache
- Effective cache hit rate divided by server count
- If 3 servers: 66% waste

### The Solution
| Deployment | Cache Type | Reason |
|------------|------------|--------|
| Development | `memory` | Simple, fast |
| Single server | `memory` | Works fine |
| Multiple servers | `redis` | ✅ Shared cache |
| Kubernetes | `redis` | ✅ Pods share |
| Serverless | `redis` | ✅ Stateless |

```properties
# Production: Always use Redis for multi-server
ai.cache.type=redis
spring.data.redis.host=redis.internal
```

---

## ❌ Mistake #10: Testing in Production First

### The Problem
```java
// Deploy to production
// Turn on caching
// Find bugs
// Users affected
```

### The Solution
**Test caching behavior before production:**

```java
@SpringBootTest
class CacheTest {

    @Test
    void testCacheHitForVocabulary() {
        String word = "resilient";

        // First call
        long start1 = System.currentTimeMillis();
        String resp1 = aiService.chatWithCache(
            "Define: " + word,
            null,
            ContentType.VOCABULARY,
            0.0
        );
        long time1 = System.currentTimeMillis() - start1;

        // Second call (should hit cache)
        long start2 = System.currentTimeMillis();
        String resp2 = aiService.chatWithCache(
            "Define: " + word,
            null,
            ContentType.VOCABULARY,
            0.0
        );
        long time2 = System.currentTimeMillis() - start2;

        // Assertions
        assertEquals(resp1, resp2);
        assertTrue(time2 < time1 / 10, "Cache should be 10x faster");
    }

    @Test
    void testNoCache ForPersonalized() {
        String essay1 = "My essay...";
        String essay2 = "Different essay...";

        String resp1 = aiService.chatWithCache(
            essay1,
            null,
            ContentType.PERSONALIZED,
            0.0
        );

        String resp2 = aiService.chatWithCache(
            essay2,
            null,
            ContentType.PERSONALIZED,
            0.0
        );

        // Should be different (not cached)
        assertNotEquals(resp1, resp2);
    }
}
```

---

## Quick Checklist Before Going Live

- ✅ Test cache hit rates in staging
- ✅ Verify personalized content not cached
- ✅ Check logs for cache HIT/MISS
- ✅ Monitor memory usage
- ✅ Use Redis for multi-server
- ✅ Set appropriate TTLs
- ✅ Test cache eviction
- ✅ Verify no timestamps in cache keys
- ✅ Match content types to use cases
- ✅ Have rollback plan (disable cache)

## Emergency: Disable Cache

If something goes wrong:

```properties
# application.properties
ai.cache.enabled=false
```

Restart application. Caching disabled immediately.

---

## Summary: The Golden Rules

1. **Never cache personalized content**
2. **Remove timestamps from cache keys**
3. **Match content type to TTL needs**
4. **Evict cache after content updates**
5. **Don't cache high-temperature responses**
6. **Don't cache errors**
7. **Use Redis for multi-server**
8. **Test before production**
9. **Monitor cache hit rates**
10. **Have a disable switch**

Follow these rules → Save costs, improve speed, keep users happy! ✅
