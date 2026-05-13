package com.bilimly.backend.tts.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TtsRequest(
        @NotBlank
        @Size(max = 120)
        String trackId,

        @Size(max = 1000)
        String text
) {
}
