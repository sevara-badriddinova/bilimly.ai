package com.bilimly.backend.analytics;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class UserActivityService {
    private static final Logger log = LoggerFactory.getLogger(UserActivityService.class);
    private final DailyActiveUserRepository dailyActiveUserRepository;

    public UserActivityService(DailyActiveUserRepository dailyActiveUserRepository) {
        this.dailyActiveUserRepository = dailyActiveUserRepository;
    }

    public void recordAuthenticatedActivity(long userId) {
        try {
            LocalDateTime now = LocalDateTime.now(ZoneOffset.UTC);
            dailyActiveUserRepository.recordActivity(userId, now.toLocalDate(), now);
        } catch (RuntimeException e) {
            log.warn("Failed to record daily active user activity for user {}", userId, e);
        }
    }
}
