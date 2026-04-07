package com.bilimly.backend.ai.examples;

import com.bilimly.backend.ai.AiService;
import com.bilimly.backend.ai.cache.CacheTtlStrategy.ContentType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Example controller demonstrating AI response caching.
 * Shows how to use different content types for optimal caching.
 */
@RestController
@RequestMapping("/api/ai/examples")
public class CachedAiController {

    private final AiService aiService;

    public CachedAiController(AiService aiService) {
        this.aiService = aiService;
    }

    /**
     * Vocabulary endpoint - cached for 30 days.
     * Perfect for static content like word definitions.
     *
     * Example: POST /api/ai/examples/vocabulary
     * {
     *   "word": "resilient"
     * }
     */
    @PostMapping("/vocabulary")
    public ResponseEntity<AiResponse> explainWord(@RequestBody VocabularyRequest request) {
        String prompt = String.format(
            "Define the word '%s' and provide 2 example sentences.",
            request.word()
        );

        String systemPrompt = "You are a vocabulary tutor. Provide clear, concise definitions.";

        // Cached for 30 days - vocabulary definitions don't change
        String response = aiService.chatWithCache(
            prompt,
            systemPrompt,
            ContentType.VOCABULARY,
            0.0  // Deterministic response
        );

        return ResponseEntity.ok(new AiResponse(response, true));
    }

    /**
     * Grammar endpoint - cached for 30 days.
     * Grammar rules are static and perfect for caching.
     *
     * Example: POST /api/ai/examples/grammar
     * {
     *   "topic": "present perfect tense"
     * }
     */
    @PostMapping("/grammar")
    public ResponseEntity<AiResponse> explainGrammar(@RequestBody GrammarRequest request) {
        String prompt = String.format(
            "Explain %s with examples and common mistakes.",
            request.topic()
        );

        String systemPrompt = "You are a grammar expert. Use simple language and examples.";

        // Cached for 30 days
        String response = aiService.chatWithCache(
            prompt,
            systemPrompt,
            ContentType.GRAMMAR,
            0.0
        );

        return ResponseEntity.ok(new AiResponse(response, true));
    }

    /**
     * Exercise correction - cached for 7 days.
     * Exercises may be updated, so shorter cache.
     *
     * Example: POST /api/ai/examples/exercise
     * {
     *   "sentence": "He go to school yesterday"
     * }
     */
    @PostMapping("/exercise")
    public ResponseEntity<AiResponse> correctSentence(@RequestBody ExerciseRequest request) {
        String prompt = String.format(
            "Correct this sentence and explain why: '%s'",
            request.sentence()
        );

        String systemPrompt = "You are a helpful English tutor.";

        // Cached for 7 days - exercises may need updates
        String response = aiService.chatWithCache(
            prompt,
            systemPrompt,
            ContentType.EXERCISE,
            0.0
        );

        return ResponseEntity.ok(new AiResponse(response, true));
    }

    /**
     * General chat - cached for 1 hour.
     * Contextual responses, shorter cache.
     *
     * Example: POST /api/ai/examples/chat
     * {
     *   "message": "How do I improve my speaking?"
     * }
     */
    @PostMapping("/chat")
    public ResponseEntity<AiResponse> generalChat(@RequestBody ChatRequest request) {
        // Cached for 1 hour
        String response = aiService.chatWithCache(
            request.message(),
            null,  // Uses default system prompt
            ContentType.GENERAL_CHAT,
            0.0
        );

        return ResponseEntity.ok(new AiResponse(response, true));
    }

    /**
     * Creative writing - short cache (15 minutes).
     * High temperature = more randomness = shorter cache.
     *
     * Example: POST /api/ai/examples/creative
     * {
     *   "prompt": "Write a short story about learning English"
     * }
     */
    @PostMapping("/creative")
    public ResponseEntity<AiResponse> creativeWriting(@RequestBody CreativeRequest request) {
        String systemPrompt = "You are a creative writing assistant.";

        // High temperature = creative/random responses
        // Cached for 15 minutes only
        String response = aiService.chatWithCache(
            request.prompt(),
            systemPrompt,
            ContentType.GENERAL_CHAT,
            0.8  // Higher temperature for creativity
        );

        return ResponseEntity.ok(new AiResponse(response, true));
    }

    /**
     * Personalized feedback - NOT cached.
     * User-specific content should never be cached.
     *
     * Example: POST /api/ai/examples/feedback
     * {
     *   "userId": 123,
     *   "essay": "My essay text..."
     * }
     */
    @PostMapping("/feedback")
    public ResponseEntity<AiResponse> personalizedFeedback(@RequestBody FeedbackRequest request) {
        String prompt = String.format(
            "Review this essay and provide personalized feedback:\n\n%s",
            request.essay()
        );

        String systemPrompt = String.format(
            "You are reviewing an essay for user %d. Provide specific, personalized feedback.",
            request.userId()
        );

        // NOT cached - user-specific content
        String response = aiService.chatWithCache(
            prompt,
            systemPrompt,
            ContentType.PERSONALIZED,
            0.0
        );

        return ResponseEntity.ok(new AiResponse(response, false));
    }

    /**
     * Cache eviction endpoint.
     * Use this after updating content that may be cached.
     *
     * Example: DELETE /api/ai/examples/cache
     * {
     *   "message": "Define 'resilient'",
     *   "systemPrompt": "You are a vocabulary tutor."
     * }
     */
    @DeleteMapping("/cache")
    public ResponseEntity<String> evictCache(@RequestBody CacheEvictRequest request) {
        aiService.evictCache(request.message(), request.systemPrompt());
        return ResponseEntity.ok("Cache evicted successfully");
    }

    // Request DTOs
    record VocabularyRequest(String word) {}
    record GrammarRequest(String topic) {}
    record ExerciseRequest(String sentence) {}
    record ChatRequest(String message) {}
    record CreativeRequest(String prompt) {}
    record FeedbackRequest(Long userId, String essay) {}
    record CacheEvictRequest(String message, String systemPrompt) {}

    // Response DTO
    record AiResponse(String content, boolean cacheable) {}
}
