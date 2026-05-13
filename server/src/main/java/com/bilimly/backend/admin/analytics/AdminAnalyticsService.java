package com.bilimly.backend.admin.analytics;

import com.bilimly.backend.analytics.BreakdownPoint;
import com.bilimly.backend.analytics.DailyActiveUserRepository;
import com.bilimly.backend.analytics.DauPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminAnalyticsService {
    private final DailyActiveUserRepository dailyActiveUserRepository;

    public AdminAnalyticsResponse analytics(int requestedDays) {
        int days = Math.min(Math.max(requestedDays, 7), 90);
        LocalDate endDate = LocalDate.now(ZoneOffset.UTC);
        LocalDate startDate = endDate.minusDays(days - 1L);

        Map<LocalDate, Long> dauByDate = dailyActiveUserRepository.dauBetween(startDate, endDate).stream()
                .collect(Collectors.toMap(DauPoint::getActivityDate, DauPoint::getActiveUsers));

        List<AdminAnalyticsResponse.DauMetric> dau = startDate.datesUntil(endDate.plusDays(1))
                .map(date -> new AdminAnalyticsResponse.DauMetric(date, dauByDate.getOrDefault(date, 0L)))
                .toList();

        List<AdminAnalyticsResponse.BreakdownMetric> byNativeLanguage = dailyActiveUserRepository
                .activeUsersByNativeLanguage(startDate, endDate)
                .stream()
                .map(this::breakdown)
                .toList();

        List<AdminAnalyticsResponse.BreakdownMetric> byRole = dailyActiveUserRepository
                .activeUsersByRole(startDate, endDate)
                .stream()
                .map(this::breakdown)
                .toList();

        List<AdminAnalyticsResponse.RetentionMetric> retention = retention(startDate, endDate);

        long activeUsersToday = dauByDate.getOrDefault(endDate, 0L);
        long activeUsersInRange = dau.stream().mapToLong(AdminAnalyticsResponse.DauMetric::activeUsers).sum();
        double averageDau = days == 0 ? 0 : Math.round((activeUsersInRange / (double) days) * 10.0) / 10.0;

        return new AdminAnalyticsResponse(
                dau,
                byNativeLanguage,
                byRole,
                retention,
                new AdminAnalyticsResponse.Summary(activeUsersToday, activeUsersInRange, averageDau, days)
        );
    }

    private AdminAnalyticsResponse.BreakdownMetric breakdown(BreakdownPoint point) {
        String segment = point.getSegment() == null || point.getSegment().isBlank() ? "unknown" : point.getSegment();
        return new AdminAnalyticsResponse.BreakdownMetric(segment, point.getActiveUsers());
    }

    private List<AdminAnalyticsResponse.RetentionMetric> retention(LocalDate startDate, LocalDate endDate) {
        Map<LocalDate, Set<Long>> activeUsersByDate = new HashMap<>();
        startDate.datesUntil(endDate.plusDays(1)).forEach(date -> activeUsersByDate.put(date, new HashSet<>(dailyActiveUserRepository.userIdsActiveOn(date))));

        return startDate.datesUntil(endDate.plusDays(1))
                .map(cohortDate -> {
                    Set<Long> cohort = activeUsersByDate.getOrDefault(cohortDate, Set.of());
                    long cohortSize = cohort.size();
                    return new AdminAnalyticsResponse.RetentionMetric(
                            cohortDate,
                            cohortSize,
                            retentionFor(cohort, activeUsersByDate.get(cohortDate.plusDays(1))),
                            retentionFor(cohort, activeUsersByDate.get(cohortDate.plusDays(7))),
                            retentionFor(cohort, activeUsersByDate.get(cohortDate.plusDays(14)))
                    );
                })
                .toList();
    }

    private double retentionFor(Set<Long> cohort, Set<Long> returnedUsers) {
        if (cohort == null || cohort.isEmpty() || returnedUsers == null) {
            return 0;
        }
        long returned = cohort.stream().filter(returnedUsers::contains).count();
        return Math.round((returned / (double) cohort.size()) * 1000.0) / 10.0;
    }
}
