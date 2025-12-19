package com.bilimly.backend.ai;

import com.bilimly.backend.ai.dto.AiChatRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/chat")
    public String chat(@RequestBody AiChatRequest request) {
        return aiService.chat(request.getMessage());
    }
}
