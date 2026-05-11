package com.bilimly.backend.tts.dto;

public record TtsResponse(
        String audioUrl,
        boolean cached
) {
}
