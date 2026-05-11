package com.bilimly.backend.auth;

import com.bilimly.backend.user.User;
import com.bilimly.backend.user.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // grab authorization header
        String header = request.getHeader("Authorization");

        // other pages (login/sign up) don't need tokens
        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // cut off the Bearer and keep token
        String token = header.substring(7);

        // check if token is valid and not expired
        boolean isValid = jwtTokenProvider.validateToken(token);

        if (!isValid) {
            filterChain.doFilter(request, response);
            return;
        }

        // open token & read email inside
        String email = jwtTokenProvider.getToken(token);

        // check if exists in db
        Optional<User> optUser = userService.findByEmail(email);

        if (optUser.isEmpty()) {
            filterChain.doFilter(request, response);
            return;
        }

        // request authenticated, email X & role
        User user = optUser.get();
        var auth = new UsernamePasswordAuthenticationToken(
                email,
                null,
                List.of(new SimpleGrantedAuthority("ROLE_" + (user.getRole() == null ? "USER" : user.getRole().name())))
        );
        // tell the Spring the user is logged in
        SecurityContextHolder.getContext().setAuthentication(auth);

        // Set email as request attribute for controllers to access
        request.setAttribute("email", email);

        filterChain.doFilter(request, response);
    }
}
