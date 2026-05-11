package com.bilimly.backend.tts;

import com.bilimly.backend.tts.dto.TtsRequest;
import com.bilimly.backend.tts.dto.TtsResponse;
import com.bilimly.backend.security.RateLimitService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tts")
public class TtsController {
    private static final Logger log = LoggerFactory.getLogger(TtsController.class);
    private static final int CUSTOM_TTS_PER_USER_PER_HOUR = 30;
    private static final int CUSTOM_TTS_PER_IP_PER_HOUR = 60;

    private final TtsService ttsService;
    private final ListeningTtsCatalog listeningTtsCatalog;
    private final RateLimitService rateLimitService;

    @PostMapping
    public ResponseEntity<?> generate(@Valid @RequestBody TtsRequest request, Authentication authentication, HttpServletRequest httpRequest) {
        Optional<String> predefinedTrackText = listeningTtsCatalog.findText(request.trackId());
        String cacheNamespace;
        String text;

        if (predefinedTrackText.isPresent()) {
            cacheNamespace = request.trackId().trim().toLowerCase();
            text = predefinedTrackText.get();
        } else {
            if (!isRealUser(authentication)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Sign in to generate custom audio"));
            }

            String email = authentication.getName();
            String clientIp = getClientIp(httpRequest);
            if (!rateLimitService.isAllowed("tts:user:" + email, CUSTOM_TTS_PER_USER_PER_HOUR, 3600)
                    || !rateLimitService.isAllowed("tts:ip:" + clientIp, CUSTOM_TTS_PER_IP_PER_HOUR, 3600)) {
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                        .body(Map.of("error", "Too many TTS requests. Please try again later."));
            }

            cacheNamespace = "custom";
            text = request.text();
        }

        try {
            TtsResponse response = ttsService.getOrCreateAudio(cacheNamespace, text);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            log.warn("TTS request failed", e);
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                    .body(Map.of("error", "Audio generation is temporarily unavailable"));
        }
    }

    private boolean isRealUser(Authentication authentication) {
        return authentication != null
                && authentication.isAuthenticated()
                && !(authentication instanceof AnonymousAuthenticationToken);
    }

    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isBlank()) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.isBlank()) {
            ip = request.getRemoteAddr();
        }
        return ip == null ? "unknown" : ip.split(",")[0].trim();
    }
}
