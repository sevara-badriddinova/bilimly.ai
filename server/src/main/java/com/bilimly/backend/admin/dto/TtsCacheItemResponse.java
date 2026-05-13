package com.bilimly.backend.admin.dto;

import java.time.Instant;

public record TtsCacheItemResponse(
        String cacheKey,
        String audioUrl,
        long sizeBytes,
        Instant lastModifiedAt
) {
}
