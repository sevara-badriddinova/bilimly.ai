
package com.bilimly.backend.ai;

import com.bilimly.backend.AiService;
import com.bilimly.backend.ai.dto.AiChatRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {
    private final AiService aiService;

    @PostMapping("/chat")
    public String chat(@RequestBody AiChatRequest request){
        return aiService.chat(request.getMessage());
    }

}
