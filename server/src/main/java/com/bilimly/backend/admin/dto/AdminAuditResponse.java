package com.bilimly.backend.admin.dto;

import com.bilimly.backend.admin.audit.AdminAuditEvent;

import java.time.LocalDateTime;

public record AdminAuditResponse(
        Long id,
        Long actorUserId,
        String actorEmail,
        String action,
        String entityType,
        String entityId,
        String summary,
        String metadataJson,
        String ipAddress,
        LocalDateTime createdAt
) {
    public static AdminAuditResponse from(AdminAuditEvent event) {
        return new AdminAuditResponse(
                event.getId(),
                event.getActorUserId(),
                event.getActorEmail(),
                event.getAction(),
                event.getEntityType(),
                event.getEntityId(),
                event.getSummary(),
                event.getMetadataJson(),
                event.getIpAddress(),
                event.getCreatedAt()
        );
    }
}
