package com.bilimly.backend.chat;

import com.bilimly.backend.ai.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private final AiService aiService;

    @PostMapping
    public ResponseEntity<?> sendMessage(@RequestBody Map<String, String> request, Authentication authentication) {
        String message = request.get("message");
        String email = authentication.getName(); // Get email from JWT token

        if (message == null || message.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Message cannot be empty"));
        }

        try {
            String response = aiService.chat(message);
            return ResponseEntity.ok(Map.of("message", response, "user", email));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to process message: " + e.getMessage()));
        }
    }
}

