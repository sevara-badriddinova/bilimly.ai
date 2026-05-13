package com.bilimly.backend.tts;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Optional;

@Component
public class ListeningTtsCatalog {
    private static final Map<String, String> TRACK_TEXT = Map.of(
            "listening-1",
            "Coffee Shop Conversation. Hi, can I get a large cappuccino, please? Of course. Would you like it for here or to go? To go, please. And one croissant. That'll be six pounds fifty.",
            "listening-2",
            "Tech Interview Tips. In a technical interview, explain your projects clearly. Describe the problem, your role, the tools you used, and the result. Use short examples instead of memorized answers.",
            "listening-3",
            "Travel in London. Excuse me, how do I get to the underground station? Walk straight for two minutes, turn left at the museum, and you will see the entrance near the traffic lights.",
            "listening-4",
            "AI and the Future. Artificial intelligence may change how people work, but clear communication, creativity, and problem solving will still matter in many jobs.",
            "listening-5",
            "Daily Routines Podcast. I usually wake up at seven, make breakfast, check my schedule, and leave for work at eight. In the evening, I study English for twenty minutes.",
            "listening-6",
            "Business English Pro. In professional meetings, start with the goal, explain the main numbers, invite questions, and finish by confirming the next steps."
    );

    public Optional<String> findText(String trackId) {
        if (trackId == null) {
            return Optional.empty();
        }
        return Optional.ofNullable(TRACK_TEXT.get(trackId.trim().toLowerCase()));
    }
}
