package com.bilimly.backend.admin.dto;

import com.bilimly.backend.user.Role;
import com.bilimly.backend.user.User;

public record AdminUserResponse(
        long id,
        String email,
        String name,
        String nativeLanguage,
        Role role
) {
    public static AdminUserResponse from(User user) {
        return new AdminUserResponse(
                user.getId(),
                user.getEmail(),
                user.getName() == null ? "" : user.getName(),
                user.getNativeLanguage() == null ? "uz" : user.getNativeLanguage(),
                user.getRole() == null ? Role.USER : user.getRole()
        );
    }
}
