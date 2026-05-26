package com.borghettofiorito.api.service;

import com.borghettofiorito.api.domain.entity.AdminUser;
import com.borghettofiorito.api.dto.request.LoginRequest;
import com.borghettofiorito.api.dto.response.LoginResponse;
import com.borghettofiorito.api.dto.response.LoginResponse.AdminUserInfo;
import com.borghettofiorito.api.repository.AdminUserRepository;
import com.borghettofiorito.api.security.jwt.JwtService;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class AuthService {

    private final AdminUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(AdminUserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {
        AdminUser user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            // Same message as user-not-found, to avoid leaking which one failed
            throw new BadCredentialsException("Invalid credentials");
        }

        if (!user.isEnabled()) {
            throw new DisabledException("User is disabled");
        }

        String token = jwtService.generateAccessToken(user);

        return new LoginResponse(
                token,
                "Bearer",
                jwtService.getExpirationMs(),
                new AdminUserInfo(
                        user.getId(),
                        user.getUsername(),
                        user.getDisplayName(),
                        user.getRole().name()
                )
        );
    }
}
