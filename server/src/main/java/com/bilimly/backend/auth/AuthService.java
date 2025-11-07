package com.bilimly.backend.auth;

import com.bilimly.backend.user.User;
import com.bilimly.backend.user.UserRepository;
import com.bilimly.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public String register(User user){
        if (userRepository.existsByEmail(user.getEmail())){
            throw new RuntimeException("User already exists, please login");
        }

        // encode password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        // return token
        return jwtTokenProvider.generateToken(user.getEmail());
    }

    public String login(String email, String password){
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(password, user.getPassword())){
            throw new RuntimeException("Invalid password");
        }
        return jwtTokenProvider.generateToken(user.getEmail());
    }
}
