package com.bilimly.backend.tts;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Base64;
import java.util.List;
import java.util.Map;

@Component
public class GeminiTtsClient {
    private final WebClient webClient;
    private final String model;
    private final String voiceName;

    public GeminiTtsClient(
            @Value("${gemini.api.key:}") String apiKey,
            @Value("${gemini.tts.model:gemini-3.1-flash-tts-preview}") String model,
            @Value("${gemini.tts.voice:Kore}") String voiceName
    ) {
        this.model = model;
        this.voiceName = voiceName;
        ExchangeStrategies strategies = ExchangeStrategies.builder()
                .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(10 * 1024 * 1024))
                .build();
        this.webClient = WebClient.builder()
                .baseUrl("https://generativelanguage.googleapis.com")
                .defaultHeader("x-goog-api-key", apiKey)
                .exchangeStrategies(strategies)
                .build();
    }

    public GeminiAudio generate(String text) {
        Map<String, Object> body = Map.of(
                "contents", List.of(Map.of(
                        "parts", List.of(Map.of(
                                "text", "Read this English listening lesson clearly and naturally: " + text
                        ))
                )),
                "generationConfig", Map.of(
                        "responseModalities", List.of("AUDIO"),
                        "speechConfig", Map.of(
                                "voiceConfig", Map.of(
                                        "prebuiltVoiceConfig", Map.of(
                                                "voiceName", voiceName
                                        )
                                )
                        )
                ),
                "model", model
        );

        JsonNode response = webClient.post()
                .uri("/v1beta/models/{model}:generateContent", model)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(JsonNode.class)
                .block();

        JsonNode inlineData = response
                .path("candidates").path(0)
                .path("content").path("parts").path(0)
                .path("inlineData");

        String base64 = inlineData.path("data").asText("");
        if (base64.isBlank()) {
            throw new IllegalStateException("Gemini TTS response did not include audio data");
        }

        String mimeType = inlineData.path("mimeType").asText("audio/L16;codec=pcm;rate=24000");
        return new GeminiAudio(Base64.getDecoder().decode(base64), mimeType);
    }

    public record GeminiAudio(byte[] bytes, String mimeType) {
    }
}
