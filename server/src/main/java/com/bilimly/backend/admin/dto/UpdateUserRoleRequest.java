package com.bilimly.backend.admin.dto;

import com.bilimly.backend.user.Role;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UpdateUserRoleRequest(
        @NotNull Role role,
        @Size(max = 500) String reason
) {
}
