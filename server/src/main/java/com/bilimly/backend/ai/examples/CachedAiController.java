package com.bilimly.backend.ai.examples;

import com.bilimly.backend.ai.AiService;
import com.bilimly.backend.ai.cache.CacheTtlStrategy.ContentType;
import com.bilimly.backend.security.RateLimitService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Example controller demonstrating AI response caching.
 * Shows how to use different content types for optimal caching.
 */
@RestController
@RequestMapping("/api/ai/examples")
public class CachedAiController {
    private static final Logger log = LoggerFactory.getLogger(CachedAiController.class);
    private static final int MAX_ADMIN_EXAMPLE_REQUESTS_PER_MINUTE = 20;
    private static final int MAX_ADMIN_CACHE_EVICTIONS_PER_HOUR = 20;

    private final AiService aiService;
    private final RateLimitService rateLimitService;

    public CachedAiController(AiService aiService, RateLimitService rateLimitService) {
        this.aiService = aiService;
        this.rateLimitService = rateLimitService;
    }

    /**
     * Vocabulary endpoint - cached for 30 days.
     * Perfect for static content like word definitions.
     * <p>
     * Example: POST /api/ai/examples/vocabulary
     * {
     * "word": "resilient"
     * }
     */
    @PostMapping("/vocabulary")
    public ResponseEntity<?> explainWord(@Valid @RequestBody VocabularyRequest request, Authentication authentication, HttpServletRequest httpRequest) {
        return runAdminExample(authentication, httpRequest, () -> {
            String prompt = String.format(
                    "Define the word '%s' and provide 2 example sentences.",
                    request.word()
            );

            String systemPrompt = "You are a vocabulary tutor. Provide clear, concise definitions.";

            String response = aiService.chatWithCache(
                    prompt,
                    systemPrompt,
                    ContentType.VOCABULARY,
                    0.0
            );

            return new AiResponse(response, true);
        });
    }

    /**
     * Grammar endpoint - cached for 30 days.
     * Grammar rules are static and perfect for caching.
     * <p>
     * Example: POST /api/ai/examples/grammar
     * {
     * "topic": "present perfect tense"
     * }
     */
    @PostMapping("/grammar")
    public ResponseEntity<?> explainGrammar(@Valid @RequestBody GrammarRequest request, Authentication authentication, HttpServletRequest httpRequest) {
        return runAdminExample(authentication, httpRequest, () -> {
            String prompt = String.format(
                    "Explain %s with examples and common mistakes.",
                    request.topic()
            );

            String systemPrompt = "You are a grammar expert. Use simple language and examples.";

            String response = aiService.chatWithCache(
                    prompt,
                    systemPrompt,
                    ContentType.GRAMMAR,
                    0.0
            );

            return new AiResponse(response, true);
        });
    }

    /**
     * Exercise correction - cached for 7 days.
     * Exercises may be updated, so shorter cache.
     * <p>
     * Example: POST /api/ai/examples/exercise
     * {
     * "sentence": "He go to school yesterday"
     * }
     */
    @PostMapping("/exercise")
    public ResponseEntity<?> correctSentence(@Valid @RequestBody ExerciseRequest request, Authentication authentication, HttpServletRequest httpRequest) {
        return runAdminExample(authentication, httpRequest, () -> {
            String prompt = String.format(
                    "Correct this sentence and explain why: '%s'",
                    request.sentence()
            );

            String systemPrompt = "You are a helpful English tutor.";

            String response = aiService.chatWithCache(
                    prompt,
                    systemPrompt,
                    ContentType.EXERCISE,
                    0.0
            );

            return new AiResponse(response, true);
        });
    }

    /**
     * General chat - cached for 1 hour.
     * Contextual responses, shorter cache.
     * <p>
     * Example: POST /api/ai/examples/chat
     * {
     * "message": "How do I improve my speaking?"
     * }
     */
    @PostMapping("/chat")
    public ResponseEntity<?> generalChat(@Valid @RequestBody ChatRequest request, Authentication authentication, HttpServletRequest httpRequest) {
        return runAdminExample(authentication, httpRequest, () -> {
            String response = aiService.chatWithCache(
                    request.message(),
                    null,
                    ContentType.GENERAL_CHAT,
                    0.0
            );

            return new AiResponse(response, true);
        });
    }

    /**
     * Creative writing - short cache (15 minutes).
     * High temperature = more randomness = shorter cache.
     * <p>
     * Example: POST /api/ai/examples/creative
     * {
     * "prompt": "Write a short story about learning English"
     * }
     */
    @PostMapping("/creative")
    public ResponseEntity<?> creativeWriting(@Valid @RequestBody CreativeRequest request, Authentication authentication, HttpServletRequest httpRequest) {
        return runAdminExample(authentication, httpRequest, () -> {
            String systemPrompt = "You are a creative writing assistant.";

            String response = aiService.chatWithCache(
                    request.prompt(),
                    systemPrompt,
                    ContentType.GENERAL_CHAT,
                    0.8
            );

            return new AiResponse(response, true);
        });
    }

    /**
     * Personalized feedback - NOT cached.
     * User-specific content should never be cached.
     * <p>
     * Example: POST /api/ai/examples/feedback
     * {
     * "userId": 123,
     * "essay": "My essay text..."
     * }
     */
    @PostMapping("/feedback")
    public ResponseEntity<?> personalizedFeedback(@Valid @RequestBody FeedbackRequest request, Authentication authentication, HttpServletRequest httpRequest) {
        return runAdminExample(authentication, httpRequest, () -> {
            String prompt = String.format(
                    "Review this essay and provide personalized feedback:\n\n%s",
                    request.essay()
            );

            String systemPrompt = String.format(
                    "You are reviewing an essay for user %d. Provide specific, personalized feedback.",
                    request.userId()
            );

            String response = aiService.chatWithCache(
                    prompt,
                    systemPrompt,
                    ContentType.PERSONALIZED,
                    0.0
            );

            return new AiResponse(response, false);
        });
    }

    /**
     * Cache eviction endpoint.
     * Use this after updating content that may be cached.
     * <p>
     * Example: DELETE /api/ai/examples/cache
     * {
     * "message": "Define 'resilient'",
     * "systemPrompt": "You are a vocabulary tutor."
     * }
     */
    @DeleteMapping("/cache")
    public ResponseEntity<?> evictCache(@Valid @RequestBody CacheEvictRequest request, Authentication authentication, HttpServletRequest httpRequest) {
        String admin = authentication == null ? "unknown" : authentication.getName();
        if (!rateLimitService.isAllowed("ai:examples:cache:" + admin + ":" + getClientIp(httpRequest), MAX_ADMIN_CACHE_EVICTIONS_PER_HOUR, 3600)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Map.of("error", "Too many cache eviction requests."));
        }
        aiService.evictCache(request.message(), request.systemPrompt());
        return ResponseEntity.ok(Map.of("message", "Cache evicted successfully"));
    }

    // Request DTOs
    record VocabularyRequest(
            @NotBlank
            @Size(max = 80)
            String word
    ) {
    }

    record GrammarRequest(
            @NotBlank
            @Size(max = 120)
            String topic
    ) {
    }

    record ExerciseRequest(
            @NotBlank
            @Size(max = 500)
            String sentence
    ) {
    }

    record ChatRequest(
            @NotBlank
            @Size(max = 1000)
            String message
    ) {
    }

    record CreativeRequest(
            @NotBlank
            @Size(max = 1000)
            String prompt
    ) {
    }

    record FeedbackRequest(
            @NotNull
            Long userId,

            @NotBlank
            @Size(max = 4000)
            String essay
    ) {
    }

    record CacheEvictRequest(
            @NotBlank
            @Size(max = 4000)
            String message,

            @Size(max = 10000)
            String systemPrompt
    ) {
    }

    // Response DTO
    record AiResponse(String content, boolean cacheable) {
    }

    private ResponseEntity<?> runAdminExample(Authentication authentication, HttpServletRequest request, AiWork work) {
        String admin = authentication == null ? "unknown" : authentication.getName();
        if (!rateLimitService.isAllowed("ai:examples:" + admin + ":" + getClientIp(request), MAX_ADMIN_EXAMPLE_REQUESTS_PER_MINUTE, 60)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Map.of("error", "Too many admin AI example requests."));
        }

        try {
            return ResponseEntity.ok(work.run());
        } catch (RuntimeException e) {
            log.warn("Admin AI example request failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "AI example service temporarily unavailable"));
        }
    }

    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isBlank()) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.isBlank()) {
            ip = request.getRemoteAddr();
        }
        return ip == null ? "unknown" : ip.split(",")[0].trim();
    }

    @FunctionalInterface
    private interface AiWork {
        AiResponse run();
    }
}
