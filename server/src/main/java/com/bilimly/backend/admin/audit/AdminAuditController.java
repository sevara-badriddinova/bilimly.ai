package com.bilimly.backend.admin.audit;

import com.bilimly.backend.admin.dto.AdminAuditResponse;
import com.bilimly.backend.admin.dto.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/audit")
public class AdminAuditController {
    private final AdminAuditService auditService;

    @GetMapping
    public PageResponse<AdminAuditResponse> latest(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size
    ) {
        var pageable = PageRequest.of(Math.max(0, page), Math.min(Math.max(1, size), 100), Sort.by("createdAt").descending());
        return PageResponse.from(auditService.latest(pageable).map(AdminAuditResponse::from));
    }
}
