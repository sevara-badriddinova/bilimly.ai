package com.bilimly.backend.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class AiService {
    private final WebClient openAiWebClient;
    private final String model;

    public AiService(WebClient openAiWebClient, @Value("${openai.model}")String model) {
        this.openAiWebClient = openAiWebClient;
        this.model = model;
    }

    public String chat(String userMessage){
        Map<String, Object> body = Map.of(
                "model", model,
                "messages", List.of(
                        Map.of("role", "system",
                                "content", "You are an English tutor. Explain simply. Use examples"),
                        Map.of("role", "user",
                                "content", userMessage)
                )
        );

        Map<?, ?> response = openAiWebClient.post()
                .uri("/chat/completions")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(Map.class)
                .block();
        List<?> choices = (List<?>) response.get("choices");
        Map<?, ?> first = (Map<?, ?>) choices.get(0);
        Map<?, ?> message = (Map<?, ?>) first.get("message");
        return (String) message.get("content");
    }

}
