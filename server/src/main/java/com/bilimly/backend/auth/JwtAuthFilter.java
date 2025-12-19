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
        System.out.println(">>> JwtAuthFilter HIT: " + request.getRequestURI());
        System.out.println(">>> Authorization header: " + request.getHeader("Authorization"));
        // grab authorization header
        String header = request.getHeader("Authorization");
        // other pages (login/sign up) don't need tokens
        if (header == null || !header.startsWith("Bearer ")){
            System.out.println(">>> No Bearer token found, continuing filter chain");
            filterChain.doFilter(request, response);
            return;
        }


        // cut off the Bearer and keep token
        String token = header.substring(7);
        System.out.println(">>> Token extracted: " + token.substring(0, Math.min(20, token.length())) + "...");

        // check if token is valid and not expired
        if(!jwtTokenProvider.validateToken(token)){
            System.out.println(">>> Token validation FAILED");
            filterChain.doFilter(request, response);
            return;
        }
        System.out.println(">>> Token validation PASSED");

        // open token & read email inside
        String email = jwtTokenProvider.getToken(token);
        System.out.println(">>> Email from token: " + email);
        // check if exists in db
        Optional<User> optUser = userService.findByEmail(email);
        if (optUser.isEmpty()){
            System.out.println(">>> User not found in DB: " + email);
            filterChain.doFilter(request, response);
            return;
        }

        // request authenticated, email X & role
        User user = optUser.get();
        System.out.println(">>> User found, setting authentication for: " + email);
        var auth = new UsernamePasswordAuthenticationToken(
                email,
                null,
                List.of(new SimpleGrantedAuthority("ROLE_" + (user.getRole() == null ? "USER" : user.getRole().name())))
        );
        // tell the Spring the user is logged in
        SecurityContextHolder.getContext().setAuthentication(auth);
        System.out.println(">>> Authentication set successfully");
        filterChain.doFilter(request, response);
    }
}
