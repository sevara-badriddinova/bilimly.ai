package com.bilimly.backend.admin;

import com.bilimly.backend.admin.dto.AdminOverviewResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminOverviewController {
    private final AdminOverviewService overviewService;

    @GetMapping("/overview")
    public AdminOverviewResponse overview() {
        return overviewService.overview();
    }
}
