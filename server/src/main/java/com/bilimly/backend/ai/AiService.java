package com.bilimly.backend.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.List;
import java.util.Map;

@Service
public class AiService {
    private final WebClient openAiWebClient;
    private final String model;
    private final String apiKey;

    public AiService(WebClient openAiWebClient, 
                     @Value("${openai.model}") String model,
                     @Value("${openai.api-key}") String apiKey) {
        this.openAiWebClient = openAiWebClient;
        this.model = model;
        this.apiKey = apiKey;
    }

    public String chat(String userMessage){
        // Check if API key is configured
        if (apiKey == null || apiKey.isEmpty() || apiKey.equals("your-api-key-here")) {
            throw new RuntimeException("OpenAI API key is not configured. Please set OPENAI_API_KEY environment variable or update application.properties");
        }

        Map<String, Object> body = Map.of(
                "model", model,
                "messages", List.of(
                        Map.of("role", "system",
                                "content", "You are an English tutor. Explain simply. Use examples"),
                        Map.of("role", "user",
                                "content", userMessage)
                )
        );

        try {
            Map<?, ?> response = openAiWebClient.post()
                    .uri("/chat/completions")
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();
            
            if (response == null) {
                throw new RuntimeException("Empty response from OpenAI API");
            }
            
            List<?> choices = (List<?>) response.get("choices");
            if (choices == null || choices.isEmpty()) {
                throw new RuntimeException("No choices in OpenAI response");
            }
            
            Map<?, ?> first = (Map<?, ?>) choices.get(0);
            Map<?, ?> message = (Map<?, ?>) first.get("message");
            return (String) message.get("content");
        } catch (WebClientResponseException e) {
            if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                throw new RuntimeException("OpenAI API key is invalid or expired. Please check your API key configuration.");
            }
            throw new RuntimeException("OpenAI API error: " + e.getMessage() + " (Status: " + e.getStatusCode() + ")");
        } catch (Exception e) {
            throw new RuntimeException("Failed to communicate with OpenAI API: " + e.getMessage(), e);
        }
    }

}
