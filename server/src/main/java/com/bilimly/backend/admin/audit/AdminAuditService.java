package com.bilimly.backend.admin.audit;

import com.bilimly.backend.user.User;
import com.bilimly.backend.user.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminAuditService {
    private final AdminAuditRepository auditRepository;
    private final UserRepository userRepository;

    public void record(String actorEmail, String action, String entityType, String entityId, String summary, String metadataJson, HttpServletRequest request) {
        AdminAuditEvent event = new AdminAuditEvent();
        event.setActorEmail(actorEmail == null ? "unknown" : actorEmail);
        event.setActorUserId(userRepository.findByEmail(actorEmail).map(User::getId).orElse(null));
        event.setAction(action);
        event.setEntityType(entityType);
        event.setEntityId(entityId);
        event.setSummary(summary);
        event.setMetadataJson(metadataJson);
        event.setIpAddress(clientIp(request));
        auditRepository.save(event);
    }

    public Page<AdminAuditEvent> latest(Pageable pageable) {
        return auditRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

    private String clientIp(HttpServletRequest request) {
        if (request == null) {
            return "unknown";
        }
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isBlank()) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.isBlank()) {
            ip = request.getRemoteAddr();
        }
        return ip == null ? "unknown" : ip.split(",")[0].trim();
    }
}
