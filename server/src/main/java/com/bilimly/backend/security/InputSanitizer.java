package com.bilimly.backend.security;

import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

/**
 * Utility class for sanitizing user inputs to prevent XSS, SQL injection, and other attacks
 */
@Component
public class InputSanitizer {

    // Pattern for detecting potential XSS attempts
    private static final Pattern XSS_PATTERN = Pattern.compile(
        "<script[^>]*>.*?</script>|javascript:|onerror=|onload=|<iframe|<object|<embed",
        Pattern.CASE_INSENSITIVE | Pattern.DOTALL
    );

    // Pattern for detecting SQL injection attempts
    private static final Pattern SQL_INJECTION_PATTERN = Pattern.compile(
        "(;\\s*(DROP|DELETE|INSERT|UPDATE|EXEC|EXECUTE)\\b)|(/\\*.*?\\*/)|(\\b(OR|AND)\\b\\s+\\d+\\s*=\\s*\\d+)",
        Pattern.CASE_INSENSITIVE
    );

    // Pattern for control characters (except newlines and tabs)
    private static final Pattern CONTROL_CHARS = Pattern.compile("[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]");

    /**
     * Sanitize input by removing dangerous characters and patterns
     * @param input Raw user input
     * @return Sanitized input
     */
    public String sanitize(String input) {
        if (input == null) {
            return null;
        }

        // Remove control characters
        String sanitized = CONTROL_CHARS.matcher(input).replaceAll("");

        // HTML encode dangerous characters
        sanitized = htmlEncode(sanitized);

        // Trim whitespace
        sanitized = sanitized.trim();

        return sanitized;
    }

    /**
     * Check if input contains potentially dangerous patterns
     * @param input User input to check
     * @return true if input appears safe, false if suspicious
     */
    public boolean isSafe(String input) {
        if (input == null || input.isEmpty()) {
            return true;
        }

        // Check for XSS patterns
        if (XSS_PATTERN.matcher(input).find()) {
            return false;
        }

        // Check for SQL injection patterns (basic check)
        if (SQL_INJECTION_PATTERN.matcher(input).find()) {
            return false;
        }

        return true;
    }

    /**
     * HTML encode special characters
     */
    private String htmlEncode(String input) {
        if (input == null) {
            return null;
        }

        return input
            .replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace("\"", "&quot;")
            .replace("'", "&#x27;")
            .replace("/", "&#x2F;");
    }

    /**
     * Sanitize email addresses
     */
    public String sanitizeEmail(String email) {
        if (email == null) {
            return null;
        }

        // Convert to lowercase and trim
        email = email.toLowerCase().trim();

        // Remove any characters that aren't valid in email addresses
        email = email.replaceAll("[^a-z0-9@._+-]", "");

        return email;
    }

    /**
     * Sanitize text content (allows basic formatting but removes dangerous content)
     * Used for user messages to AI where we want to preserve formatting
     */
    public String sanitizeText(String text) {
        if (text == null) {
            return null;
        }

        // Remove control characters but keep newlines and tabs
        String sanitized = CONTROL_CHARS.matcher(text).replaceAll("");

        // Check for dangerous patterns
        if (!isSafe(sanitized)) {
            // If dangerous patterns found, aggressively sanitize
            sanitized = htmlEncode(sanitized);
        }

        // Limit consecutive newlines
        sanitized = sanitized.replaceAll("\\n{4,}", "\n\n\n");

        return sanitized.trim();
    }

    /**
     * Validate and sanitize system prompts (more lenient for AI configuration)
     */
    public String sanitizeSystemPrompt(String prompt) {
        if (prompt == null) {
            return null;
        }

        // Remove control characters
        String sanitized = CONTROL_CHARS.matcher(prompt).replaceAll("");

        // Basic XSS check (but allow more formatting for prompts)
        if (XSS_PATTERN.matcher(sanitized).find()) {
            return null; // Reject suspicious prompts entirely
        }

        return sanitized.trim();
    }
}
