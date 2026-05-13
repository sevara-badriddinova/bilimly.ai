package com.bilimly.backend.ai.cache;

import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

/**
 * Builds deterministic cache keys for AI requests.
 * Normalizes inputs to maximize cache hits.
 */
@Component
public class CacheKeyBuilder {

    /**
     * Generate a cache key from AI request parameters.
     *
     * @param prompt        The user prompt
     * @param model         The AI model name
     * @param temperature   Response randomness (0.0-1.0)
     * @param maxTokens     Max response length
     * @param systemContext System prompt/context
     * @return Unique cache key (SHA-256 hash)
     */
    public String buildKey(String prompt, String model, Double temperature,
                           Integer maxTokens, String systemContext) {

        // Normalize inputs
        String normalizedPrompt = normalizePrompt(prompt);
        String normalizedSystem = normalizePrompt(systemContext);

        // Build composite key
        String composite = String.format(
                "prompt:%s|model:%s|temp:%.2f|tokens:%d|system:%s",
                normalizedPrompt,
                model != null ? model : "default",
                temperature != null ? temperature : 0.0,
                maxTokens != null ? maxTokens : 1024,
                normalizedSystem
        );

        // Hash to fixed-length key
        return hashString(composite);
    }

    /**
     * Simplified version for basic caching.
     */
    public String buildSimpleKey(String prompt) {
        return hashString(normalizePrompt(prompt));
    }

    /**
     * Normalize prompt to maximize cache hits.
     * Removes irrelevant differences between similar prompts.
     */
    private String normalizePrompt(String input) {
        if (input == null) {
            return "";
        }

        return input
                .trim()                          // Remove leading/trailing whitespace
                .replaceAll("\\s+", " ")         // Collapse multiple spaces
                .replaceAll("[\r\n]+", "\n")     // Normalize line breaks
                .toLowerCase();                   // Case-insensitive (adjust based on needs)
    }

    /**
     * Create SHA-256 hash of string.
     * Returns hex-encoded hash for use as cache key.
     */
    private String hashString(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(input.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not available", e);
        }
    }
}
