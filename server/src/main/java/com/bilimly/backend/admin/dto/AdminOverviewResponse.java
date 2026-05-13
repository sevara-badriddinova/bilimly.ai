package com.bilimly.backend.admin.dto;

public record AdminOverviewResponse(
        UserMetrics users,
        TtsMetrics tts,
        AiMetrics ai,
        SystemMetrics system
) {
    public record UserMetrics(long total, long admins, long learners) {}
    public record TtsMetrics(long cacheFiles, long cacheSizeBytes, boolean storageWritable, boolean ffmpegConfigured) {}
    public record AiMetrics(String provider, boolean examplesAdminProtected) {}
    public record SystemMetrics(String backend, String audioPublicPath) {}
}
