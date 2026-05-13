package com.bilimly.backend.admin.analytics;

import java.time.LocalDate;
import java.util.List;

public record AdminAnalyticsResponse(
        List<DauMetric> dau,
        List<BreakdownMetric> byNativeLanguage,
        List<BreakdownMetric> byRole,
        List<RetentionMetric> retention,
        Summary summary
) {
    public record DauMetric(LocalDate date, long activeUsers) {}
    public record BreakdownMetric(String segment, long activeUsers) {}
    public record RetentionMetric(LocalDate cohortDate, long cohortSize, double day1Retention, double day7Retention, double day14Retention) {}
    public record Summary(long activeUsersToday, long activeUsersInRange, double averageDau, int days) {}
}
