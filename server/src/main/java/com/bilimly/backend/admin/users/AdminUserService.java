package com.bilimly.backend.admin.users;

import com.bilimly.backend.admin.audit.AdminAuditService;
import com.bilimly.backend.admin.dto.AdminUserResponse;
import com.bilimly.backend.admin.dto.UpdateUserRoleRequest;
import com.bilimly.backend.user.Role;
import com.bilimly.backend.user.User;
import com.bilimly.backend.user.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AdminUserService {
    private final UserRepository userRepository;
    private final AdminAuditService auditService;

    public Page<AdminUserResponse> list(String query, Pageable pageable) {
        Page<User> users;
        if (query == null || query.isBlank()) {
            users = userRepository.findAll(pageable);
        } else {
            String normalized = query.trim();
            users = userRepository.findByEmailContainingIgnoreCaseOrNameContainingIgnoreCase(normalized, normalized, pageable);
        }
        return users.map(AdminUserResponse::from);
    }

    public AdminUserResponse get(long id) {
        return AdminUserResponse.from(findUser(id));
    }

    public AdminUserResponse updateRole(long id, UpdateUserRoleRequest request, String actorEmail, HttpServletRequest httpRequest) {
        User target = findUser(id);
        User actor = userRepository.findByEmail(actorEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Admin user not found"));

        Role oldRole = target.getRole() == null ? Role.USER : target.getRole();
        Role newRole = request.role();

        if (target.getId() == actor.getId() && oldRole == Role.ADMIN && newRole != Role.ADMIN) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Admins cannot demote their own account");
        }
        if (oldRole == Role.ADMIN && newRole != Role.ADMIN && userRepository.countByRole(Role.ADMIN) <= 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot remove the last admin");
        }

        target.setRole(newRole);
        User saved = userRepository.save(target);

        String reason = request.reason() == null || request.reason().isBlank() ? "No reason provided" : request.reason().trim();
        auditService.record(
                actorEmail,
                "USER_ROLE_UPDATED",
                "USER",
                String.valueOf(target.getId()),
                "Changed user role from " + oldRole + " to " + newRole + ". Reason: " + reason,
                "{\"oldRole\":\"" + oldRole + "\",\"newRole\":\"" + newRole + "\"}",
                httpRequest
        );

        return AdminUserResponse.from(saved);
    }

    private User findUser(long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }
}
