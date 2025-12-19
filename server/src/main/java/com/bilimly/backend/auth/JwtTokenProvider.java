    package com.bilimly.backend.auth;

    import io.jsonwebtoken.*;
    import io.jsonwebtoken.security.Keys;
    import org.springframework.stereotype.Component;

    import java.security.Key;
    import java.util.Date;

    @Component
    public class JwtTokenProvider {
        private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        // 1 hour
        private final long expirationTime = 1000 * 60 * 60;

        // generate jwt token
        public String generateToken(String email) {
            return Jwts.builder()
                    .setSubject(email)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                    // sign it with secret key
                    .signWith(secretKey)
                    .compact();
        }

        public String getToken(String token){
            return Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        }

        public boolean validateToken(String token){
            try {
                Jwts.parserBuilder()
                        .setSigningKey(secretKey)
                        .build()
                        .parseClaimsJws(token);
                return true;
            } catch (JwtException | IllegalArgumentException e){
                return false;
            }

        }
    }
