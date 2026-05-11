package com.bilimly.backend.security;

import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Simple in-memory rate limiting service using sliding window algorithm.
 * For production, consider using Redis or a dedicated rate limiting solution.
 */
@Service
public class RateLimitService {

    // Track requests per user/IP
    private final Map<String, RequestWindow> requestWindows = new ConcurrentHashMap<>();

    // Track AI token usage per user
    private final Map<String, TokenUsageWindow> aiTokenWindows = new ConcurrentHashMap<>();

    /**
     * Check if a request is allowed based on rate limits
     *
     * @param key           Identifier (user email, IP address)
     * @param maxRequests   Maximum number of requests allowed
     * @param windowSeconds Time window in seconds
     * @return true if request is allowed, false if rate limit exceeded
     */
    public boolean isAllowed(String key, int maxRequests, long windowSeconds) {
        cleanupOldEntries();

        RequestWindow window = requestWindows.computeIfAbsent(key, k -> new RequestWindow());

        Instant now = Instant.now();
        Instant windowStart = now.minus(Duration.ofSeconds(windowSeconds));

        // Remove old requests outside the window
        window.requests.removeIf(timestamp -> timestamp.isBefore(windowStart));

        // Check if limit exceeded
        if (window.requests.size() >= maxRequests) {
            return false;
        }

        // Add current request
        window.requests.add(now);
        return true;
    }

    /**
     * Check and record AI token usage
     *
     * @param userEmail        User identifier
     * @param tokensUsed       Number of tokens used in this request
     * @param maxTokensPerHour Maximum tokens allowed per hour
     * @return true if allowed, false if limit exceeded
     */
    public boolean checkAiTokenLimit(String userEmail, int tokensUsed, int maxTokensPerHour) {
        cleanupOldEntries();

        TokenUsageWindow window = aiTokenWindows.computeIfAbsent(
                userEmail,
                k -> new TokenUsageWindow()
        );

        Instant now = Instant.now();
        Instant oneHourAgo = now.minus(Duration.ofHours(1));

        // Remove old usage records
        window.usage.entrySet().removeIf(entry -> entry.getKey().isBefore(oneHourAgo));

        // Calculate current usage
        int currentUsage = window.usage.values().stream().mapToInt(Integer::intValue).sum();

        // Check if adding new tokens would exceed limit
        if (currentUsage + tokensUsed > maxTokensPerHour) {
            return false;
        }

        // Record usage
        window.usage.put(now, tokensUsed);
        return true;
    }

    /**
     * Get remaining AI tokens for a user
     */
    public int getRemainingTokens(String userEmail, int maxTokensPerHour) {
        TokenUsageWindow window = aiTokenWindows.get(userEmail);
        if (window == null) {
            return maxTokensPerHour;
        }

        Instant now = Instant.now();
        Instant oneHourAgo = now.minus(Duration.ofHours(1));

        int currentUsage = window.usage.entrySet().stream()
                .filter(entry -> entry.getKey().isAfter(oneHourAgo))
                .mapToInt(Map.Entry::getValue)
                .sum();

        return Math.max(0, maxTokensPerHour - currentUsage);
    }

    /**
     * Cleanup entries older than 2 hours to prevent memory leak
     */
    private void cleanupOldEntries() {
        Instant twoHoursAgo = Instant.now().minus(Duration.ofHours(2));

        requestWindows.entrySet().removeIf(entry ->
                entry.getValue().requests.stream()
                        .allMatch(timestamp -> timestamp.isBefore(twoHoursAgo))
        );

        aiTokenWindows.entrySet().removeIf(entry ->
                entry.getValue().usage.keySet().stream()
                        .allMatch(timestamp -> timestamp.isBefore(twoHoursAgo))
        );
    }

    private static class RequestWindow {
        private final java.util.List<Instant> requests = new java.util.concurrent.CopyOnWriteArrayList<>();
    }

    private static class TokenUsageWindow {
        private final Map<Instant, Integer> usage = new ConcurrentHashMap<>();
    }
}
