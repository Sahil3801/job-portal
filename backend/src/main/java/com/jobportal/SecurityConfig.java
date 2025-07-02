package com.jobportal;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.jobportal.jwt.JwtAuthenticationEntryPoint;
import com.jobportal.jwt.JwtAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationEntryPoint point;
    private final JwtAuthenticationFilter filter;

    public SecurityConfig(JwtAuthenticationEntryPoint point, JwtAuthenticationFilter filter) {
        this.point = point;
        this.filter = filter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for stateless API
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/login", "/users/register", "/users/verifyOtp/**", "/users/sendOtp/**",
                                "/users/changePass")
                        .permitAll()
                        .anyRequest().authenticated())
                .exceptionHandling(ex -> ex.authenticationEntryPoint(point))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}

// package com.jobportal;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import
// org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import
// org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.web.SecurityFilterChain;
// import
// org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// import com.jobportal.jwt.JwtAuthenticationEntryPoint;
// import com.jobportal.jwt.JwtAuthenticationFilter;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

// @Autowired
// private JwtAuthenticationEntryPoint point;
// @Autowired
// private JwtAuthenticationFilter filter;

// @Bean
// public SecurityFilterChain securityFilterChain(HttpSecurity http) throws
// Exception {

// http.csrf(csrf -> csrf.disable())
// .authorizeRequests()
// .requestMatchers("/auth/login", "/users/register", "/users/verifyOtp/**",
// "/users/sendOtp/**",
// "/users/changePass")
// .permitAll()
// .anyRequest()
// .authenticated()
// .and().exceptionHandling(ex -> ex.authenticationEntryPoint(point))
// .sessionManagement(session ->
// session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
// http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
// return http.build();
// }

// }
