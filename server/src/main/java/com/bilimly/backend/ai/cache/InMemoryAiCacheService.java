package com.bilimly.backend.ai.cache;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

/**
 * In-memory implementation of AI cache.
 * Good for: development, single-server deployments, small-scale apps.
 * Limitations: data lost on restart, no sharing between servers.
 */
@Service
@ConditionalOnProperty(name = "ai.cache.type", havingValue = "memory", matchIfMissing = true)
public class InMemoryAiCacheService implements AiCacheService {

    private final Map<String, CacheEntry> cache = new ConcurrentHashMap<>();

    @Override
    public void put(String key, String response, Duration ttl) {
        Instant expiresAt = Instant.now().plus(ttl);
        cache.put(key, new CacheEntry(response, expiresAt));
    }

    @Override
    public Optional<String> get(String key) {
        CacheEntry entry = cache.get(key);

        if (entry == null) {
            return Optional.empty();
        }

        // Check if expired
        if (entry.isExpired()) {
            cache.remove(key);
            return Optional.empty();
        }

        return Optional.of(entry.response());
    }

    @Override
    public void evict(String key) {
        cache.remove(key);
    }

    @Override
    public void clear() {
        cache.clear();
    }

    @Override
    public boolean exists(String key) {
        return get(key).isPresent();
    }

    /**
     * Cache entry with TTL.
     */
    private record CacheEntry(String response, Instant expiresAt) {
        boolean isExpired() {
            return Instant.now().isAfter(expiresAt);
        }
    }
}
