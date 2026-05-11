package com.bilimly.backend.ai.cache;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Optional;

/**
 * Redis-backed implementation of AI cache.
 * Good for: production, multiserver deployments, high-scale apps.
 * Benefits: persistent, shared across servers, automatic TTL management.
 * <p>
 * Required dependencies in pom.xml:
 * <dependency>
 * <groupId>org.springframework.boot</groupId>
 * <artifactId>spring-boot-starter-data-redis</artifactId>
 * </dependency>
 * <p>
 * Required configuration in application.properties:
 * spring.data.redis.host=localhost
 * spring.data.redis.port=6379
 * ai.cache.type=redis
 */
@Service
@ConditionalOnProperty(name = "ai.cache.type", havingValue = "redis")
public class RedisAiCacheService implements AiCacheService {

    private static final String KEY_PREFIX = "ai:cache:";

    private final StringRedisTemplate redisTemplate;

    public RedisAiCacheService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void put(String key, String response, Duration ttl) {
        String redisKey = buildRedisKey(key);
        redisTemplate.opsForValue().set(redisKey, response, ttl);
    }

    @Override
    public Optional<String> get(String key) {
        String redisKey = buildRedisKey(key);
        String value = redisTemplate.opsForValue().get(redisKey);
        return Optional.ofNullable(value);
    }

    @Override
    public void evict(String key) {
        String redisKey = buildRedisKey(key);
        redisTemplate.delete(redisKey);
    }

    @Override
    public void clear() {
        // Clear all AI cache keys
        var keys = redisTemplate.keys(KEY_PREFIX + "*");
        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
    }

    @Override
    public boolean exists(String key) {
        String redisKey = buildRedisKey(key);
        Boolean exists = redisTemplate.hasKey(redisKey);
        return exists != null && exists;
    }

    /**
     * Add namespace prefix to avoid key collisions.
     */
    private String buildRedisKey(String key) {
        return KEY_PREFIX + key;
    }
}
