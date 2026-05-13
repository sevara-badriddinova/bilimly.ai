package com.bilimly.backend.chat;

import com.bilimly.backend.ai.AiService;
import com.bilimly.backend.ai.dto.AiChatRequest;
import com.bilimly.backend.security.InputSanitizer;
import com.bilimly.backend.security.RateLimitService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private static final Logger log = LoggerFactory.getLogger(ChatController.class);

    private final AiService aiService;
    private final RateLimitService rateLimitService;
    private final InputSanitizer inputSanitizer;

    @Value("${claude.max-tokens:4096}")
    private int maxTokensPerRequest;

    @Value("${ai.rate-limit.requests-per-minute:10}")
    private int maxRequestsPerMinute;

    @Value("${ai.rate-limit.tokens-per-hour:50000}")
    private int maxTokensPerHour;

    @PostMapping
    public ResponseEntity<?> sendMessage(@Valid @RequestBody AiChatRequest request, BindingResult bindingResult, Authentication authentication) {
        if (bindingResult.hasErrors()) {
            String errors = bindingResult.getAllErrors().stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest().body(Map.of("error", errors));
        }

        String email = authentication.getName(); // Get email from JWT token

        if (!rateLimitService.isAllowed("ai:chat:" + email, maxRequestsPerMinute, 60)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Map.of("error", "Too many AI requests. Please wait a moment."));
        }

        int estimatedTokens = (request.getMessage().length() +
                (request.getSystemPrompt() != null ? request.getSystemPrompt().length() : 0)) / 4;
        estimatedTokens += maxTokensPerRequest;

        if (!rateLimitService.checkAiTokenLimit(email, estimatedTokens, maxTokensPerHour)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Map.of("error", "AI token limit exceeded. Please try again later."));
        }

        try {
            String sanitizedMessage = inputSanitizer.sanitizeText(request.getMessage());
            String sanitizedPrompt = request.getSystemPrompt() != null
                    ? inputSanitizer.sanitizeSystemPrompt(request.getSystemPrompt())
                    : null;

            if (!inputSanitizer.isSafe(sanitizedMessage) || (sanitizedPrompt != null && !inputSanitizer.isSafe(sanitizedPrompt))) {
                return ResponseEntity.badRequest().body(Map.of("error", "Message contains potentially dangerous content"));
            }

            String response = aiService.chat(sanitizedMessage, sanitizedPrompt);
            return ResponseEntity.ok(Map.of("message", response, "user", email));
        } catch (Exception e) {
            log.warn("Legacy chat request failed", e);
            return ResponseEntity.status(500).body(Map.of("error", "AI service temporarily unavailable"));
        }
    }
}
