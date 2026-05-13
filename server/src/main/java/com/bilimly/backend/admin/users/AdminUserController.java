package com.bilimly.backend.admin.users;

import com.bilimly.backend.admin.dto.AdminUserResponse;
import com.bilimly.backend.admin.dto.PageResponse;
import com.bilimly.backend.admin.dto.UpdateUserRoleRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/users")
public class AdminUserController {
    private final AdminUserService adminUserService;

    @GetMapping
    public PageResponse<AdminUserResponse> list(
            @RequestParam(defaultValue = "") String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "25") int size
    ) {
        var pageable = PageRequest.of(Math.max(0, page), Math.min(Math.max(1, size), 100), Sort.by("id").descending());
        return PageResponse.from(adminUserService.list(query, pageable));
    }

    @GetMapping("/{id}")
    public AdminUserResponse get(@PathVariable long id) {
        return adminUserService.get(id);
    }

    @PatchMapping("/{id}/role")
    public AdminUserResponse updateRole(
            @PathVariable long id,
            @Valid @RequestBody UpdateUserRoleRequest request,
            Authentication authentication,
            HttpServletRequest httpRequest
    ) {
        return adminUserService.updateRole(id, request, authentication.getName(), httpRequest);
    }
}
