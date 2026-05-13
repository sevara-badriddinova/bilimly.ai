package com.bilimly.backend.admin.analytics;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/analytics")
public class AdminAnalyticsController {
    private final AdminAnalyticsService adminAnalyticsService;

    @GetMapping
    public AdminAnalyticsResponse analytics(@RequestParam(defaultValue = "30") int days) {
        return adminAnalyticsService.analytics(days);
    }
}
