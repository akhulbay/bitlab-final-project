package kz.shyngys.finalproject.configuration;

import kz.shyngys.finalproject.repository.UserRepository;
import kz.shyngys.finalproject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authorization.AuthenticatedAuthorizationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final UserService userService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        AuthenticationManagerBuilder builder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        builder.userDetailsService(userService)
                .passwordEncoder(passwordEncoder());

        http.formLogin()
                .loginPage("/login")
                .loginProcessingUrl("/auth")
                .usernameParameter("username")
                .passwordParameter("password")
                .defaultSuccessUrl("/")
                .failureUrl("/login?error");

        http.logout()
                .logoutUrl("/logout");

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
