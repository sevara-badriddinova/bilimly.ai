package com.bilimly.backend.analytics;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Repository
public interface DailyActiveUserRepository extends JpaRepository<DailyActiveUser, Long> {
    @Modifying
    @Transactional
    @Query(value = """
            INSERT INTO daily_active_users (user_id, activity_date, first_seen_at, last_seen_at, activity_count)
            VALUES (:userId, :activityDate, :seenAt, :seenAt, 1)
            ON CONFLICT (user_id, activity_date)
            DO UPDATE SET last_seen_at = EXCLUDED.last_seen_at,
                          activity_count = daily_active_users.activity_count + 1
            """, nativeQuery = true)
    void recordActivity(@Param("userId") long userId, @Param("activityDate") LocalDate activityDate, @Param("seenAt") LocalDateTime seenAt);

    @Query(value = """
            SELECT activity_date AS activityDate, COUNT(DISTINCT user_id) AS activeUsers
            FROM daily_active_users
            WHERE activity_date BETWEEN :startDate AND :endDate
            GROUP BY activity_date
            ORDER BY activity_date
            """, nativeQuery = true)
    List<DauPoint> dauBetween(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query(value = """
            SELECT COALESCE(NULLIF(u.native_language, ''), 'unknown') AS segment,
                   COUNT(DISTINCT dau.user_id) AS activeUsers
            FROM daily_active_users dau
            JOIN users u ON u.id = dau.user_id
            WHERE dau.activity_date BETWEEN :startDate AND :endDate
            GROUP BY COALESCE(NULLIF(u.native_language, ''), 'unknown')
            ORDER BY activeUsers DESC
            """, nativeQuery = true)
    List<BreakdownPoint> activeUsersByNativeLanguage(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query(value = """
            SELECT COALESCE(CAST(u.role AS TEXT), 'USER') AS segment,
                   COUNT(DISTINCT dau.user_id) AS activeUsers
            FROM daily_active_users dau
            JOIN users u ON u.id = dau.user_id
            WHERE dau.activity_date BETWEEN :startDate AND :endDate
            GROUP BY COALESCE(CAST(u.role AS TEXT), 'USER')
            ORDER BY activeUsers DESC
            """, nativeQuery = true)
    List<BreakdownPoint> activeUsersByRole(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("""
            select d.userId
            from DailyActiveUser d
            where d.activityDate = :activityDate
            """)
    List<Long> userIdsActiveOn(@Param("activityDate") LocalDate activityDate);

    @Query("""
            select count(distinct d.userId)
            from DailyActiveUser d
            where d.activityDate = :activityDate and d.userId in :userIds
            """)
    long countActiveUsersInCohortOn(@Param("activityDate") LocalDate activityDate, @Param("userIds") Collection<Long> userIds);
}
