package com.bilimly.backend.ai.cache;

import java.time.Duration;
import java.util.Optional;

/**
 * Interface for AI response caching.
 * Supports multiple implementations (in-memory, Redis, etc.)
 */
public interface AiCacheService {

    /**
     * Store AI response in cache.
     *
     * @param key Unique cache key
     * @param response AI response text
     * @param ttl Time-to-live duration
     */
    void put(String key, String response, Duration ttl);

    /**
     * Retrieve cached AI response.
     *
     * @param key Cache key
     * @return Cached response if exists, empty otherwise
     */
    Optional<String> get(String key);

    /**
     * Remove entry from cache.
     *
     * @param key Cache key
     */
    void evict(String key);

    /**
     * Clear all cached entries.
     */
    void clear();

    /**
     * Check if key exists in cache.
     *
     * @param key Cache key
     * @return true if cached, false otherwise
     */
    boolean exists(String key);
}
