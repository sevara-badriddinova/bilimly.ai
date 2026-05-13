# AI Response Caching

## Overview

AI response caching stores LLM outputs to reduce costs and improve performance. When the same question is asked again,
the cached response is returned instantly without calling the expensive AI API.

## Configuration

### In-Memory Cache (Default)

Good for development and single-server deployments.

```properties
# application.properties
ai.cache.enabled=true
ai.cache.type=memory
```

### Redis Cache (Production)

Good for multi-server deployments and high-scale apps.

**Step 1:** Add dependency to `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

**Step 2:** Configure Redis in `application.properties`:

```properties
# Enable caching
ai.cache.enabled=true
ai.cache.type=redis

# Redis connection
spring.data.redis.host=localhost
spring.data.redis.port=6379
# Optional:
# spring.data.redis.password=yourpassword
# spring.data.redis.database=0
```

**Step 3:** Start Redis:

```bash
# Using Docker
docker run -d -p 6379:6379 redis:7-alpine

# Or install locally
brew install redis  # macOS
redis-server
```

### Disable Cache

```properties
ai.cache.enabled=false
```

## Usage Examples

### Basic Usage (existing code works as-is)

```java
@Autowired
private AiService aiService;

// Automatically uses caching
String response = aiService.chat("What is past tense?", null);
```

### Advanced Usage with Content Types

```java
import com.bilimly.backend.ai.cache.CacheTtlStrategy.ContentType;

// Vocabulary - cached for 30 days
String vocab = aiService.chatWithCache(
    "Define 'resilient'",
    null,
    ContentType.VOCABULARY,
    0.0
);

// Grammar - cached for 30 days
String grammar = aiService.chatWithCache(
    "Explain present perfect",
    null,
    ContentType.GRAMMAR,
    0.0
);

// Exercise - cached for 7 days
String exercise = aiService.chatWithCache(
    "Correct: 'He go to school yesterday'",
    null,
    ContentType.EXERCISE,
    0.0
);

// Creative writing - short cache (temperature > 0.5)
String creative = aiService.chatWithCache(
    "Write a short story",
    null,
    ContentType.GENERAL_CHAT,
    0.8  // High temperature = more randomness
);

// Personalized feedback - NOT cached
String personal = aiService.chatWithCache(
    "Review my essay...",
    null,
    ContentType.PERSONALIZED,
    0.0
);
```

### Controller Example

```java
@RestController
@RequestMapping("/api/ai")
public class AiController {

    @Autowired
    private AiService aiService;

    @PostMapping("/vocabulary")
    public ResponseEntity<String> explainWord(@RequestBody VocabRequest request) {
        String response = aiService.chatWithCache(
            "Define: " + request.word(),
            "You are a vocabulary tutor.",
            ContentType.VOCABULARY,
            0.0
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/grammar")
    public ResponseEntity<String> explainGrammar(@RequestBody GrammarRequest request) {
        String response = aiService.chatWithCache(
            request.question(),
            "You are a grammar expert.",
            ContentType.GRAMMAR,
            0.0
        );
        return ResponseEntity.ok(response);
    }

    // Evict cache manually (e.g., after content update)
    @DeleteMapping("/cache")
    public ResponseEntity<Void> clearCache(@RequestBody CacheEvictRequest request) {
        aiService.evictCache(request.message(), request.system());
        return ResponseEntity.noContent().build();
    }
}
```

## Cache Strategy

### TTL (Time-To-Live) by Content Type

| Content Type   | TTL      | Reason              |
|----------------|----------|---------------------|
| `VOCABULARY`   | 30 days  | Static definitions  |
| `GRAMMAR`      | 30 days  | Rules rarely change |
| `EXERCISE`     | 7 days   | May need updates    |
| `GENERAL_CHAT` | 1 hour   | Contextual          |
| `PERSONALIZED` | No cache | User-specific       |

### TTL by Temperature

| Temperature | TTL        | Reason            |
|-------------|------------|-------------------|
| < 0.5       | 30 days    | Deterministic     |
| 0.5 - 0.8   | 1 hour     | Medium randomness |
| > 0.8       | 15 minutes | High creativity   |
| > 0.9       | No cache   | Too random        |

## Cache Key Design

Cache keys are built from:

- Normalized prompt (trimmed, lowercased, whitespace collapsed)
- Model name
- Temperature
- Max tokens
- System prompt

The key is hashed with SHA-256 for uniqueness and collision-free storage.

## Performance

### Before Caching

```
Request 1: "What is past tense?" → API call → 2000ms
Request 2: "What is past tense?" → API call → 2000ms
Request 3: "What is past tense?" → API call → 2000ms
Total: 6000ms, 3 API calls
```

### After Caching

```
Request 1: "What is past tense?" → API call → 2000ms (cached)
Request 2: "What is past tense?" → Cache hit → 5ms
Request 3: "What is past tense?" → Cache hit → 5ms
Total: 2010ms, 1 API call
```

**Savings: 70% faster, 67% cost reduction**

## Monitoring Cache Performance

Check logs for cache hits/misses:

```
INFO  Cache HIT for key: 7f3a8b2c1d4e...
INFO  Cache MISS for key: 9e2f7c5a8b1d...
INFO  Cached response with TTL: PT720H (30 days)
```

### Metrics to Track

- Cache hit rate: `hits / (hits + misses)`
- Average response time: cache vs API
- Cost savings: API calls avoided

## Common Mistakes to Avoid

### ❌ Mistake 1: Caching Personalized Content

```java
// WRONG - user-specific content shouldn't be cached
aiService.chatWithCache(
    "Review my essay: " + userEssay,
    null,
    ContentType.GENERAL_CHAT,  // ❌
    0.0
);

// RIGHT
aiService.chatWithCache(
    "Review my essay: " + userEssay,
    null,
    ContentType.PERSONALIZED,  // ✅
    0.0
);
```

### ❌ Mistake 2: High Temperature with Long TTL

```java
// WRONG - random responses shouldn't be cached long
aiService.chatWithCache(
    "Write a creative story",
    null,
    ContentType.VOCABULARY,  // ❌ 30 days TTL!
    0.9
);

// RIGHT
aiService.chatWithCache(
    "Write a creative story",
    null,
    ContentType.GENERAL_CHAT,  // ✅ 1 hour or less
    0.9
);
```

### ❌ Mistake 3: Including Timestamps in Prompts

```java
// WRONG - timestamp prevents cache hits
String prompt = "Explain grammar. Asked at: " + LocalDateTime.now();
aiService.chat(prompt, null);  // ❌ Never hits cache

// RIGHT
String prompt = "Explain grammar";
aiService.chat(prompt, null);  // ✅ Cache works
```

### ❌ Mistake 4: Not Normalizing User Input

```java
// These are the same question but won't hit cache:
"What is past tense?"
"what is past tense?"
"What  is  past  tense?"  // Extra spaces

// Solution: CacheKeyBuilder normalizes automatically ✅
```

### ❌ Mistake 5: Forgetting to Evict After Content Updates

```java
// WRONG - old content stays in cache
updateGrammarLesson(lessonId);
// Cache still returns old version ❌

// RIGHT - evict cache after update
updateGrammarLesson(lessonId);
aiService.evictCache(lessonPrompt, systemPrompt);  // ✅
```

## Testing

### Test Cache Hit

```java
@SpringBootTest
class AiServiceTest {

    @Autowired
    private AiService aiService;

    @Test
    void testCacheHit() {
        String prompt = "What is past tense?";

        // First call - cache miss
        long start1 = System.currentTimeMillis();
        String response1 = aiService.chat(prompt, null);
        long time1 = System.currentTimeMillis() - start1;

        // Second call - cache hit
        long start2 = System.currentTimeMillis();
        String response2 = aiService.chat(prompt, null);
        long time2 = System.currentTimeMillis() - start2;

        assertEquals(response1, response2);
        assertTrue(time2 < time1 / 10);  // Cache should be 10x faster
    }
}
```

## Troubleshooting

### Cache not working?

1. Check `ai.cache.enabled=true` in config
2. Check logs for "Cache HIT/MISS" messages
3. Verify prompts are identical (case, whitespace)
4. Check content type isn't `PERSONALIZED`
5. Check temperature isn't > 0.9

### Redis connection errors?

1. Verify Redis is running: `redis-cli ping` → `PONG`
2. Check host/port in application.properties
3. Check firewall rules
4. Try: `docker logs <redis-container>`

### Memory issues with in-memory cache?

1. Switch to Redis for large-scale apps
2. Reduce TTLs
3. Add JVM memory: `-Xmx2g`

## Advanced: Custom Cache Implementation

Implement `AiCacheService` interface for custom backends:

```java
@Service
@ConditionalOnProperty(name = "ai.cache.type", havingValue = "database")
public class DatabaseAiCacheService implements AiCacheService {

    @Autowired
    private CacheRepository cacheRepository;

    @Override
    public void put(String key, String response, Duration ttl) {
        CacheEntry entry = new CacheEntry();
        entry.setKey(key);
        entry.setResponse(response);
        entry.setExpiresAt(LocalDateTime.now().plus(ttl));
        cacheRepository.save(entry);
    }

    @Override
    public Optional<String> get(String key) {
        return cacheRepository.findByKeyAndExpiresAtAfter(key, LocalDateTime.now())
            .map(CacheEntry::getResponse);
    }

    // ... implement other methods
}
```

## Security Considerations

1. **Don't cache sensitive data**: PII, passwords, tokens
2. **Use Redis password**: `spring.data.redis.password=...`
3. **Network isolation**: Redis in private network only
4. **Monitor cache size**: Prevent DoS via cache flooding
5. **Sanitize keys**: Avoid injection in cache keys

## Best Practices

✅ **DO:**

- Cache static educational content
- Use content types appropriately
- Monitor cache hit rates
- Set reasonable TTLs
- Normalize prompts before caching
- Use Redis in production

❌ **DON'T:**

- Cache user-specific content
- Use very long TTLs for creative content
- Include timestamps in cache keys
- Cache without monitoring
- Forget to evict after updates
- Use in-memory cache in multi-server setups
