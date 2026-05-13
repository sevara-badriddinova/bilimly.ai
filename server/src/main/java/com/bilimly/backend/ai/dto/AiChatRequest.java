package com.bilimly.backend.ai.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AiChatRequest {

    @NotBlank(message = "Message is required")
    @Size(min = 1, max = 4000, message = "Message must be between 1 and 4000 characters")
    private String message;

    @Size(max = 10000, message = "System prompt must be less than 10000 characters")
    private String systemPrompt;
}
