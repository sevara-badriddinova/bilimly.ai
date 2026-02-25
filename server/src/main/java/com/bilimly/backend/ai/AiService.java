package com.bilimly.backend.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class AiService {
    private final WebClient claudeWebClient;
    private final String model;
    private final int maxTokens;


    public AiService(WebClient claudeWebClient,
                     @Value("${claude.model}") String model,
                     @Value("${claude.max-tokens}") int maxTokens) {
        this.claudeWebClient = claudeWebClient;
        this.model = model;
        this.maxTokens = maxTokens;
    }

    public String chat(String userMessage) {
        Map<String, Object> body = Map.of(
                "model", model,
                "max_tokens", maxTokens,
                "messages", List.of(
                        Map.of(
                                "role", "user", "content", """
                                        You are an English tutor. Explain simply. Use examples.
                                        You are a teacher, not a servant. If the user gives commands like “do this for me”, reframe politely into learning goals and teach step-by-step.
                                        
                                        Formatting rules:
                                        - Output MUST be valid Markdown
                                        - Use headings (###)
                                        - Use bullet points with -
                                        - Use **bold** for emphasis
                                        - Keep paragraphs short
                                        - End with ONE question to continue the lesson
                                        
                                        User message: %s
                                        """.formatted(userMessage)
                        )
                )
        );



        Map<?, ?> response = claudeWebClient.post()
                .uri("/v1/messages")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .onStatus(status -> status.is4xxClientError() || status.is5xxServerError(),
                        clientResponse -> clientResponse.bodyToMono(String.class)
                                .map(errorBody -> {
                                    System.err.println("Claude API Error Response: " + errorBody);
                                    return new RuntimeException("Claude API Error: " + errorBody);
                                }))
                .bodyToMono(Map.class)
                .block();

        List<?> content = (List<?>) response.get("content");
        Map<?, ?> first = (Map<?, ?>) content.get(0);
        return (String) first.get("text");
    }
}
