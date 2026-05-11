# AI Response Caching - Quick Start Guide

## What is AI Response Caching?

AI response caching stores LLM outputs so identical requests return instantly without calling the AI API again. This:

- **Reduces costs** by avoiding repeated API calls
- **Improves speed** from ~2 seconds to ~5 milliseconds
- **Enhances UX** with instant responses
- **Prevents rate limiting** issues

## 5-Minute Setup

### Step 1: Configuration (Already Done!)

Your `application.properties` is already configured:

```properties
ai.cache.enabled=true
ai.cache.type=memory
```

This uses in-memory caching, which works immediately with no setup needed.

### Step 2: Use the Service

Your existing code already works with caching:

```java
@Autowired
private AiService aiService;

// This automatically uses caching now!
String response = aiService.chat("What is past tense?", null);
```

**That's it!** Caching is now active.

## How It Works

```
Request 1: "What is past tense?"
  → Cache check → MISS
  → Call Claude API → 2000ms
  → Store in cache
  → Return response

Request 2: "What is past tense?"
  → Cache check → HIT! ✅
  → Return cached response → 5ms
  → Save API call & money
```

## Advanced Usage

### Use Content Types for Better Caching

```java
import com.bilimly.backend.ai.cache.CacheTtlStrategy.ContentType;

// Vocabulary - cached 30 days
String vocab = aiService.chatWithCache(
    "Define 'resilient'",
    null,
    ContentType.VOCABULARY,
    0.0
);

// Grammar - cached 30 days
String grammar = aiService.chatWithCache(
    "Explain present perfect",
    null,
    ContentType.GRAMMAR,
    0.0
);

// Exercise - cached 7 days
String exercise = aiService.chatWithCache(
    "Correct: 'He go to school'",
    null,
    ContentType.EXERCISE,
    0.0
);

// Personalized - NOT cached
String feedback = aiService.chatWithCache(
    "Review my essay: " + userEssay,
    null,
    ContentType.PERSONALIZED,
    0.0
);
```

## Content Type Reference

| Type           | TTL      | Use For                         |
|----------------|----------|---------------------------------|
| `VOCABULARY`   | 30 days  | Word definitions, translations  |
| `GRAMMAR`      | 30 days  | Grammar rules, explanations     |
| `EXERCISE`     | 7 days   | Exercise solutions, corrections |
| `GENERAL_CHAT` | 1 hour   | General Q&A, conversations      |
| `PERSONALIZED` | No cache | User-specific feedback, essays  |

## Upgrade to Redis (Production)

For production with multiple servers:

### Step 1: Add Redis Dependency

Add to `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

### Step 2: Start Redis

```bash
# Using Docker (easiest)
docker run -d -p 6379:6379 --name redis redis:7-alpine

# Or install locally
brew install redis  # macOS
sudo apt install redis  # Ubuntu
redis-server
```

### Step 3: Update Configuration

Edit `application.properties`:

```properties
ai.cache.type=redis
spring.data.redis.host=localhost
spring.data.redis.port=6379
```

### Step 4: Restart Application

That's it! Your app now uses Redis cache that:

- Persists across restarts
- Shares cache between multiple servers
- Handles high load better

## Monitoring

Check your logs for cache activity:

```
INFO  Cache HIT for key: 7f3a8b2c1d4e...   ✅ Saved API call!
INFO  Cache MISS for key: 9e2f7c5a8b1d...  ⚠️ Will call API
INFO  Cached response with TTL: PT720H     ℹ️ Stored for 30 days
```

### Calculate Savings

```
Cache Hit Rate = Hits / (Hits + Misses)

Example:
- 100 requests
- 80 cache hits
- 20 cache misses
- Hit rate: 80%
- Cost savings: 80%
- Speed improvement: ~400x on cached requests
```

## Common Use Cases

### 1. Vocabulary Learning

```java
@PostMapping("/api/vocabulary/define")
public String defineWord(@RequestBody String word) {
    return aiService.chatWithCache(
        "Define: " + word,
        "You are a vocabulary tutor.",
        ContentType.VOCABULARY,
        0.0
    );
}
```

**Result:** First student waits 2 seconds. Next 1000 students get instant responses. 99.9% cost savings!

### 2. Grammar Lessons

```java
@PostMapping("/api/grammar/explain")
public String explainGrammar(@RequestBody String topic) {
    return aiService.chatWithCache(
        "Explain " + topic,
        "You are a grammar expert.",
        ContentType.GRAMMAR,
        0.0
    );
}
```

**Result:** Grammar rules cached 30 days. Same explanation for all students.

### 3. Exercise Feedback

```java
@PostMapping("/api/exercise/correct")
public String correctSentence(@RequestBody String sentence) {
    return aiService.chatWithCache(
        "Correct: " + sentence,
        null,
        ContentType.EXERCISE,
        0.0
    );
}
```

**Result:** Common mistakes cached. Instant feedback for popular exercises.

## Best Practices

### ✅ DO Cache:

- Word definitions
- Grammar explanations
- Common questions
- Exercise solutions
- Static educational content

### ❌ DON'T Cache:

- Personalized feedback
- User-specific essays
- Content with user IDs
- Creative writing (high temperature)
- Time-sensitive data

## Troubleshooting

### "Not seeing cache hits?"

1. Check logs for "Cache HIT/MISS" messages
2. Ensure prompts are identical (case matters before normalization)
3. Verify `ai.cache.enabled=true`
4. Check content type isn't `PERSONALIZED`

### "Using too much memory?"

1. Switch to Redis: `ai.cache.type=redis`
2. Reduce TTLs in `CacheTtlStrategy`
3. Use content types appropriately

### "Redis connection failed?"

1. Check Redis is running: `redis-cli ping` → `PONG`
2. Verify host/port in config
3. Check firewall rules

## Testing Cache Performance

```java
@Test
void testCachePerformance() {
    String prompt = "What is past tense?";

    // First call - cache miss
    long start1 = System.currentTimeMillis();
    String response1 = aiService.chat(prompt, null);
    long time1 = System.currentTimeMillis() - start1;
    System.out.println("First call: " + time1 + "ms");

    // Second call - cache hit
    long start2 = System.currentTimeMillis();
    String response2 = aiService.chat(prompt, null);
    long time2 = System.currentTimeMillis() - start2;
    System.out.println("Second call: " + time2 + "ms");

    System.out.println("Speedup: " + (time1 / time2) + "x");
    // Expected: 200-400x faster
}
```

## Security Notes

- ✅ Cache is server-side only
- ✅ Users can't access other users' cached data
- ✅ Cache keys are hashed (SHA-256)
- ⚠️ Don't cache sensitive data (PII, passwords)
- ⚠️ Use Redis password in production

## Next Steps

1. **Monitor cache hit rate** in production logs
2. **Adjust TTLs** based on your content update frequency
3. **Switch to Redis** when scaling to multiple servers
4. **Add metrics** to track cost savings
5. **Review cached content** periodically for accuracy

## Example Application

See `CachedAiController.java` for complete working examples of all content types.

## Questions?

- 📖 Full documentation: `server/src/main/java/com/bilimly/backend/ai/cache/README.md`
- 💻 Code examples: `CachedAiController.java`
- 🏗️ Architecture: Cache → Service → API pattern

## Summary

✅ Caching is **already enabled** with in-memory storage
✅ Your **existing code works** without changes
✅ Use **content types** for better cache control
✅ **Upgrade to Redis** for production/multi-server
✅ **Monitor logs** to see cache performance
✅ **Avoid caching** personalized content

**Impact:** 70-90% cost reduction, 200-400x faster responses for cached content!
