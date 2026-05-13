package com.bilimly.backend.analytics;

import java.time.LocalDate;

public interface DauPoint {
    LocalDate getActivityDate();
    long getActiveUsers();
}
