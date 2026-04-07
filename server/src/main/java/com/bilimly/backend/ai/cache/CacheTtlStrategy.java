package com.bilimly.backend.ai.cache;

import org.springframework.stereotype.Component;

import java.time.Duration;

/**
 * Determines TTL (Time-To-Live) for cached AI responses.
 * Different content types have different lifespans.
 */
@Component
public class CacheTtlStrategy {

    // Default TTLs
    private static final Duration DEFAULT_TTL = Duration.ofHours(1);
    private static final Duration EDUCATIONAL_CONTENT_TTL = Duration.ofDays(30);
    private static final Duration EXERCISE_TTL = Duration.ofDays(7);
    private static final Duration CHAT_TTL = Duration.ofHours(1);
    private static final Duration SHORT_TTL = Duration.ofMinutes(15);

    /**
     * Content types for TTL calculation.
     */
    public enum ContentType {
        VOCABULARY,        // Word definitions, translations
        GRAMMAR,           // Grammar rules, explanations
        EXERCISE,          // Exercise answers, solutions
        GENERAL_CHAT,      // General conversations
        PERSONALIZED,      // User-specific (don't cache)
        UNKNOWN            // Default fallback
    }

    /**
     * Determine TTL based on content type.
     *
     * @param contentType Type of AI content
     * @return Duration for cache TTL
     */
    public Duration getTtl(ContentType contentType) {
        return switch (contentType) {
            case VOCABULARY, GRAMMAR -> EDUCATIONAL_CONTENT_TTL;
            case EXERCISE -> EXERCISE_TTL;
            case GENERAL_CHAT -> CHAT_TTL;
            case PERSONALIZED -> Duration.ZERO; // Don't cache
            case UNKNOWN -> DEFAULT_TTL;
        };
    }

    /**
     * Determine TTL based on temperature parameter.
     * Higher temperature = more randomness = shorter cache.
     *
     * @param temperature AI temperature (0.0-1.0)
     * @return Duration for cache TTL
     */
    public Duration getTtlByTemperature(double temperature) {
        if (temperature >= 0.8) {
            return SHORT_TTL;  // High creativity, short cache
        } else if (temperature >= 0.5) {
            return CHAT_TTL;   // Medium creativity
        } else {
            return EDUCATIONAL_CONTENT_TTL;  // Low/deterministic
        }
    }

    /**
     * Decide if response should be cached at all.
     *
     * @param contentType Type of content
     * @param temperature AI temperature
     * @return true if should cache, false otherwise
     */
    public boolean shouldCache(ContentType contentType, double temperature) {
        // Don't cache personalized content
        if (contentType == ContentType.PERSONALIZED) {
            return false;
        }

        // Don't cache very high temperature (too random)
        if (temperature > 0.9) {
            return false;
        }

        return true;
    }

    /**
     * Get minimum TTL between content-based and temperature-based.
     * More conservative approach.
     */
    public Duration getConservativeTtl(ContentType contentType, double temperature) {
        Duration contentTtl = getTtl(contentType);
        Duration tempTtl = getTtlByTemperature(temperature);

        return contentTtl.compareTo(tempTtl) < 0 ? contentTtl : tempTtl;
    }
}
