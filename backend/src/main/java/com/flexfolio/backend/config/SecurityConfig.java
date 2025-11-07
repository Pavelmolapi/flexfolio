package com.flexfolio.backend.config;

import com.flexfolio.backend.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

/**
 * Spring Security Configuration
 * Configures JWT authentication and authorization
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(authorize -> authorize
                    // Public endpoints - no authentication required
                    .requestMatchers(HttpMethod.POST, "/api/auth/**").permitAll()
                    .requestMatchers(HttpMethod.POST, "/api/auth/validate").permitAll()

                    // Protected endpoints - require authentication
                    .requestMatchers(HttpMethod.GET, "/api/users/**").authenticated()
                    .requestMatchers(HttpMethod.PUT, "/api/users/**").authenticated()
                    .requestMatchers(HttpMethod.DELETE, "/api/users/**").authenticated()

                    .requestMatchers(HttpMethod.POST, "/api/portfolios/**").authenticated()
                    .requestMatchers(HttpMethod.GET, "/api/portfolios/**").authenticated()
                    .requestMatchers(HttpMethod.PUT, "/api/portfolios/**").authenticated()
                    .requestMatchers(HttpMethod.DELETE, "/api/portfolios/**").authenticated()

                    .requestMatchers(HttpMethod.POST, "/api/experiences/**").authenticated()
                    .requestMatchers(HttpMethod.GET, "/api/experiences/**").authenticated()
                    .requestMatchers(HttpMethod.PUT, "/api/experiences/**").authenticated()
                    .requestMatchers(HttpMethod.DELETE, "/api/experiences/**").authenticated()

                    .requestMatchers(HttpMethod.POST, "/api/educations/**").authenticated()
                    .requestMatchers(HttpMethod.GET, "/api/educations/**").authenticated()
                    .requestMatchers(HttpMethod.PUT, "/api/educations/**").authenticated()
                    .requestMatchers(HttpMethod.DELETE, "/api/educations/**").authenticated()

                    // All other requests require authentication
                    .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("Authorization"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

