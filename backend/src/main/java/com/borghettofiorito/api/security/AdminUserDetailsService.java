package com.borghettofiorito.api.security;

import com.borghettofiorito.api.domain.entity.AdminUser;
import com.borghettofiorito.api.repository.AdminUserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Bridge between our AdminUser JPA entity and Spring Security.
 *
 * Spring Security needs a UserDetailsService to look up users
 * during login. We adapt our entity into Spring's UserDetails contract.
 */
@Service
public class AdminUserDetailsService implements UserDetailsService {

    private final AdminUserRepository userRepository;

    public AdminUserDetailsService(AdminUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AdminUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Admin user not found: " + username));

        return User.builder()
                .username(user.getUsername())
                .password(user.getPasswordHash())
                .authorities(List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name())))
                .disabled(!user.isEnabled())
                .build();
    }
}
