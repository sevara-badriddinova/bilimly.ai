package com.bilimly.backend.ai;

import com.bilimly.backend.ai.dto.AiChatRequest;
import com.bilimly.backend.security.InputSanitizer;
import com.bilimly.backend.security.RateLimitService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;
    private final RateLimitService rateLimitService;
    private final InputSanitizer inputSanitizer;

    @Value("${claude.max-tokens:4096}")
    private int maxTokensPerRequest;

    @Value("${ai.rate-limit.requests-per-minute:10}")
    private int maxRequestsPerMinute;

    @Value("${ai.rate-limit.tokens-per-hour:50000}")
    private int maxTokensPerHour;

    @PostMapping("/chat")
    public ResponseEntity<?> chat(
            @Valid @RequestBody AiChatRequest request,
            BindingResult bindingResult,
            @RequestAttribute(value = "email", required = false) String userEmail) {

        // Check validation errors
        if (bindingResult.hasErrors()) {
            String errors = bindingResult.getAllErrors().stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest().body(Map.of("error", errors));
        }

        // Ensure user is authenticated
        if (userEmail == null || userEmail.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required"));
        }

        // Rate limiting - requests per minute
        if (!rateLimitService.isAllowed("ai:chat:" + userEmail, maxRequestsPerMinute, 60)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Map.of(
                            "error", "Too many AI requests. Please wait a moment.",
                            "limit", maxRequestsPerMinute + " requests per minute"
                    ));
        }

        // Estimate tokens (rough estimate: 4 chars = 1 token)
        int estimatedTokens = (request.getMessage().length() +
                (request.getSystemPrompt() != null ? request.getSystemPrompt().length() : 0)) / 4;
        estimatedTokens += maxTokensPerRequest; // Add response tokens

        // Rate limiting - tokens per hour
        if (!rateLimitService.checkAiTokenLimit(userEmail, estimatedTokens, maxTokensPerHour)) {
            int remaining = rateLimitService.getRemainingTokens(userEmail, maxTokensPerHour);
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Map.of(
                            "error", "AI token limit exceeded. Please try again later.",
                            "remainingTokens", remaining,
                            "limit", maxTokensPerHour + " tokens per hour"
                    ));
        }

        try {
            // Sanitize inputs
            String sanitizedMessage = inputSanitizer.sanitizeText(request.getMessage());
            String sanitizedPrompt = request.getSystemPrompt() != null ?
                    inputSanitizer.sanitizeSystemPrompt(request.getSystemPrompt()) : null;

            // Check if inputs are safe
            if (!inputSanitizer.isSafe(sanitizedMessage)) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Message contains potentially dangerous content"));
            }

            if (sanitizedPrompt != null && !inputSanitizer.isSafe(sanitizedPrompt)) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "System prompt contains potentially dangerous content"));
            }

            // Call AI service
            String answer = aiService.chat(sanitizedMessage, sanitizedPrompt);
            return ResponseEntity.ok(answer);

        } catch (RuntimeException e) {
            String m = e.getMessage() == null ? "" : e.getMessage();

            if (m.contains("rate_limit_error") || m.contains("429")) {
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                        .body(Map.of("error", "Claude API rate limit reached. Please try again later."));
            }

            if (m.contains("invalid x-api-key") || m.contains("authentication_error") || m.contains("401")) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("error", "AI service configuration error"));
            }

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "AI service temporarily unavailable"));
        }
    }
}
