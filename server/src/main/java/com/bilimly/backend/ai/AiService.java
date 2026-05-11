package com.bilimly.backend.ai;

import com.bilimly.backend.ai.cache.AiCacheService;
import com.bilimly.backend.ai.cache.CacheKeyBuilder;
import com.bilimly.backend.ai.cache.CacheTtlStrategy;
import com.bilimly.backend.ai.cache.CacheTtlStrategy.ContentType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AiService {
    private static final Logger log = LoggerFactory.getLogger(AiService.class);

    private final WebClient claudeWebClient;
    private final String model;
    private final int maxTokens;
    private final AiCacheService cacheService;
    private final CacheKeyBuilder keyBuilder;
    private final CacheTtlStrategy ttlStrategy;
    private final boolean cacheEnabled;

    public AiService(WebClient claudeWebClient,
                     @Value("${claude.model}") String model,
                     @Value("${claude.max-tokens}") int maxTokens,
                     AiCacheService cacheService,
                     CacheKeyBuilder keyBuilder,
                     CacheTtlStrategy ttlStrategy,
                     @Value("${ai.cache.enabled:true}") boolean cacheEnabled) {
        this.claudeWebClient = claudeWebClient;
        this.model = model;
        this.maxTokens = maxTokens;
        this.cacheService = cacheService;
        this.keyBuilder = keyBuilder;
        this.ttlStrategy = ttlStrategy;
        this.cacheEnabled = cacheEnabled;
    }

    /**
     * Main chat method without caching parameters.
     * Uses default content type (GENERAL_CHAT) and temperature (0.0).
     */
    public String chat(String userMessage, String systemPrompt) {
        return chatWithCache(userMessage, systemPrompt, ContentType.GENERAL_CHAT, 0.0);
    }

    /**
     * Chat with explicit cache control.
     * Implements cache-before-provider pattern.
     *
     * @param userMessage  User's input prompt
     * @param systemPrompt System context/instructions
     * @param contentType  Type of content for TTL strategy
     * @param temperature  AI temperature (0.0-1.0, default 0.0)
     * @return AI response (from cache or API)
     */
    public String chatWithCache(String userMessage, String systemPrompt,
                                ContentType contentType, Double temperature) {

        String defaultSystemPrompt = """
                You are a multilingual language tutor.
                The user may speak English, Uzbek, or Russian.
                Respond in the same language as the user.
                Do not treat non-English languages as unsafe.
                You are a teacher, not a servant. If the user gives commands like "do this for me", reframe politely into learning goals and teach step-by-step.

                Formatting rules:
                - Output MUST be valid Markdown
                - Use headings (###)
                - Use bullet points with -
                - Use **bold** for emphasis
                - Keep paragraphs short
                - End with ONE question to continue the lesson
                """;

        String actualSystemPrompt = (systemPrompt != null && !systemPrompt.trim().isEmpty())
                ? systemPrompt
                : defaultSystemPrompt;

        double actualTemperature = temperature != null ? temperature : 0.0;

        // Step 1: Check cache (if enabled)
        if (cacheEnabled && ttlStrategy.shouldCache(contentType, actualTemperature)) {
            String cacheKey = keyBuilder.buildKey(
                    userMessage, model, actualTemperature, maxTokens, actualSystemPrompt
            );

            Optional<String> cached = cacheService.get(cacheKey);
            if (cached.isPresent()) {
                log.info("Cache HIT for key: {}", cacheKey.substring(0, 16) + "...");
                return cached.get();
            }

            log.info("Cache MISS for key: {}", cacheKey.substring(0, 16) + "...");

            // Step 2: Call AI provider
            String response = callClaudeApi(userMessage, actualSystemPrompt, actualTemperature);

            // Step 3: Store in cache
            Duration ttl = ttlStrategy.getConservativeTtl(contentType, actualTemperature);
            cacheService.put(cacheKey, response, ttl);
            log.info("Cached response with TTL: {}", ttl);

            return response;
        }

        // Cache disabled or shouldn't cache this request
        log.info("Cache disabled or skipped for this request");
        return callClaudeApi(userMessage, actualSystemPrompt, actualTemperature);
    }

    /**
     * Direct API call to Claude without caching.
     * Separated for clarity and testability.
     */
    private String callClaudeApi(String userMessage, String systemPrompt, double temperature) {
        Map<String, Object> body = Map.of(
                "model", model,
                "max_tokens", maxTokens,
                "temperature", temperature,
                "system", systemPrompt,
                "messages", List.of(
                        Map.of("role", "user", "content", userMessage)
                )
        );

        Map<?, ?> response = claudeWebClient.post()
                .uri("/v1/messages")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .onStatus(status -> status.is4xxClientError() || status.is5xxServerError(),
                        clientResponse -> clientResponse.bodyToMono(String.class)
                                .map(errorBody -> {
                                    log.error("Claude API Error: {}", errorBody);
                                    return new RuntimeException("Claude API Error: " + errorBody);
                                }))
                .bodyToMono(Map.class)
                .block();

        List<?> content = (List<?>) response.get("content");
        Map<?, ?> first = (Map<?, ?>) content.get(0);
        return (String) first.get("text");
    }

    /**
     * Manually evict cache entry.
     * Useful for content updates or corrections.
     */
    public void evictCache(String userMessage, String systemPrompt) {
        String cacheKey = keyBuilder.buildKey(userMessage, model, 0.0, maxTokens, systemPrompt);
        cacheService.evict(cacheKey);
        log.info("Evicted cache for key: {}", cacheKey.substring(0, 16) + "...");
    }
}
