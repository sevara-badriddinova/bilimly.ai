package com.bilimly.backend.auth;

import com.bilimly.backend.auth.dto.LoginRequest;
import com.bilimly.backend.auth.dto.RegisterRequest;
import com.bilimly.backend.security.InputSanitizer;
import com.bilimly.backend.security.RateLimitService;
import com.bilimly.backend.user.Role;
import com.bilimly.backend.user.User;
import com.bilimly.backend.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final RateLimitService rateLimitService;
    private final InputSanitizer inputSanitizer;

    // Rate limits
    private static final int MAX_REGISTER_ATTEMPTS = 5; // per hour
    private static final int MAX_LOGIN_ATTEMPTS = 10; // per 15 minutes

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody RegisterRequest request,
            BindingResult bindingResult,
            HttpServletRequest httpRequest) {

        // Check validation errors
        if (bindingResult.hasErrors()) {
            String errors = bindingResult.getAllErrors().stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest().body(Map.of("error", errors));
        }

        // Rate limiting by IP
        String clientIp = getClientIp(httpRequest);
        if (!rateLimitService.isAllowed("register:" + clientIp, MAX_REGISTER_ATTEMPTS, 3600)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Map.of("error", "Too many registration attempts. Please try again later."));
        }

        // Sanitize inputs
        String email = inputSanitizer.sanitizeEmail(request.getEmail());
        String name = request.getName() != null ? inputSanitizer.sanitize(request.getName()) : null;
        String nativeLanguage = normalizeNativeLanguage(request.getNativeLanguage());

        // Validate email format after sanitization
        if (email == null || email.isEmpty() || !email.matches("^[a-z0-9@._+-]+$")) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid email format"));
        }

        // Check if email already exists
        if (userService.existsByEmail(email)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already in use"));
        }

        // Create user
        User user = User.builder()
                .email(email)
                .password(passwordEncoder.encode(request.getPassword()))
                .name(name)
                .nativeLanguage(nativeLanguage)
                .role(Role.USER)
                .build();

        userService.saveUser(user);

        String token = jwtTokenProvider.generateToken(user.getEmail());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "message", "User registered successfully"
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody LoginRequest request,
            BindingResult bindingResult,
            HttpServletRequest httpRequest) {

        // Check validation errors
        if (bindingResult.hasErrors()) {
            String errors = bindingResult.getAllErrors().stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest().body(Map.of("error", errors));
        }

        // Rate limiting by IP
        String clientIp = getClientIp(httpRequest);
        if (!rateLimitService.isAllowed("login:" + clientIp, MAX_LOGIN_ATTEMPTS, 900)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Map.of("error", "Too many login attempts. Please try again later."));
        }

        // Sanitize email
        String email = inputSanitizer.sanitizeEmail(request.getEmail());

        var optionalUser = userService.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }

        var user = optionalUser.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }

        String token = jwtTokenProvider.generateToken(user.getEmail());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "message", "Login successful"
        ));
    }

    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty()) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.isEmpty()) {
            ip = request.getRemoteAddr();
        }
        return ip != null ? ip.split(",")[0].trim() : "unknown";
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestAttribute(value = "email", required = false) String email) {
        if (email == null) {
            return ResponseEntity.status(403).body(Map.of("error", "Invalid or missing token"));
        }

        var user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "email", user.getEmail(),
                "name", user.getName() != null ? user.getName() : "",
                "nativeLanguage", user.getNativeLanguage() != null ? user.getNativeLanguage() : "uz",
                "role", user.getRole() != null ? user.getRole().name() : "USER"
        ));
    }

    private String normalizeNativeLanguage(String nativeLanguage) {
        if (nativeLanguage == null || nativeLanguage.isBlank()) {
            return "uz";
        }

        String normalized = nativeLanguage.trim().toLowerCase();
        if (!normalized.matches("uz|ru|en")) {
            return "uz";
        }
        return normalized;
    }
}
