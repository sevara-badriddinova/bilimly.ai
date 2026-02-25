package com.bilimly.backend.ai;

import com.bilimly.backend.ai.dto.AiChatRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/chat")
    public ResponseEntity<?> chat(@RequestBody AiChatRequest request) {
        try{
            String msg = request.getMessage();
            if (msg == null || msg.trim().isEmpty()){
                return ResponseEntity.badRequest().body(Map.of("error", "Message is empty"));
            }

            String answer = aiService.chat(msg);
            return ResponseEntity.ok(answer);
        } catch (RuntimeException e) {
            String m = e.getMessage() == null ? "" : e.getMessage();
            if (m.contains("rate_limit_error") || m.contains("429")){
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                        .body(Map.of("error", "Rate limited, try again later"));
            }

            if (m.contains("invalid x-api-key") || m.contains("authentication_error") || m.contains("401")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Claude API key/auth failed."));
            }

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "AI service failed", "details", m));
        }
    }
}
