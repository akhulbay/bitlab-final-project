package kz.shyngys.finalproject.configuration;

import kz.shyngys.finalproject.dto.UserCreateEditDto;
import kz.shyngys.finalproject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.SecurityFilterChain;

import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Set;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private static final String TEMP_PASSWORD = "temp";

    private final UserService userService;

    private final PasswordEncoder passwordEncoder;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        AuthenticationManagerBuilder builder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        builder.userDetailsService(userService)
                .passwordEncoder(passwordEncoder);

        http.formLogin()
                .loginPage("/auth/signin/user")
                .loginProcessingUrl("/authorize")
                .usernameParameter("username")
                .passwordParameter("password")
                .defaultSuccessUrl("/")
                .failureUrl("/auth/signin/user?error");

        http.oauth2Login()
                .loginPage("/auth/signin/user")
                .defaultSuccessUrl("/")
                .userInfoEndpoint().oidcUserService(oidcUserService());

        http.logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/auth/signout")
                .deleteCookies("JSESSIONID");

        http.csrf()
                .disable();

        return http.build();
    }

    private OAuth2UserService<OidcUserRequest, OidcUser> oidcUserService() {
        return userRequest -> {
            String email = userRequest.getIdToken().getClaim("email");
            UserDetails userDetails;
            try {
                userDetails = userService.loadUserByUsername(email);
            } catch (UsernameNotFoundException e) {
                String firstName = userRequest.getIdToken().getClaim("given_name");
                String lastName = userRequest.getIdToken().getClaim("family_name");

                UserCreateEditDto user = new UserCreateEditDto();
                user.setUsername(email);
                user.setFirstName(firstName);
                user.setLastName(lastName);
                user.setPassword(TEMP_PASSWORD);

                userService.saveUser(user);

                userDetails = userService.loadUserByUsername(email);
            }

            DefaultOidcUser oidcUser = new DefaultOidcUser(userDetails.getAuthorities(), userRequest.getIdToken());

            Set<Method> userDetailsMethods = Set.of(UserDetails.class.getMethods());

            UserDetails finalUserDetails = userService.loadUserByUsername(email);
            return (OidcUser) Proxy.newProxyInstance(SecurityConfiguration.class.getClassLoader(),
                    new Class[]{UserDetails.class, OidcUser.class},
                    (proxy, method, args) -> userDetailsMethods.contains(method)
                            ? method.invoke(finalUserDetails, args)
                            : method.invoke(oidcUser, args));
        };
    }

}
