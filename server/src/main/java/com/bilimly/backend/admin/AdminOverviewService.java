package com.bilimly.backend.admin;

import com.bilimly.backend.admin.dto.AdminOverviewResponse;
import com.bilimly.backend.admin.tts.AdminTtsService;
import com.bilimly.backend.user.Role;
import com.bilimly.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminOverviewService {
    private final UserRepository userRepository;
    private final AdminTtsService adminTtsService;

    @Value("${tts.public-path:/audio}")
    private String audioPublicPath;

    public AdminOverviewResponse overview() {
        long totalUsers = userRepository.count();
        long admins = userRepository.countByRole(Role.ADMIN);
        long learners = Math.max(0, totalUsers - admins);
        var tts = adminTtsService.summary();

        return new AdminOverviewResponse(
                new AdminOverviewResponse.UserMetrics(totalUsers, admins, learners),
                new AdminOverviewResponse.TtsMetrics(
                        tts.cacheFiles(),
                        tts.cacheSizeBytes(),
                        tts.storageWritable(),
                        true
                ),
                new AdminOverviewResponse.AiMetrics("Claude/Gemini", true),
                new AdminOverviewResponse.SystemMetrics("bilimly.backend", audioPublicPath)
        );
    }
}
