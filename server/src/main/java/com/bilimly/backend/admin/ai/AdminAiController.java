package com.bilimly.backend.admin.ai;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/ai")
public class AdminAiController {
    @GetMapping("/summary")
    public Map<String, Object> summary() {
        return Map.of(
                "provider", "Claude",
                "geminiTtsEnabled", true,
                "examplesAdminProtected", true,
                "notes", "Detailed provider metrics need persistent usage logging."
        );
    }
}
