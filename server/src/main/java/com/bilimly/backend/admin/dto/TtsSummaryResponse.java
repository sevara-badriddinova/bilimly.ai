package com.bilimly.backend.admin.dto;

public record TtsSummaryResponse(
        long cacheFiles,
        long cacheSizeBytes,
        boolean storageWritable,
        String storageDir,
        String publicPath
) {
}
