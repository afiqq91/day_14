package com.example.instructor_api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class SecurityConfig {

    @Bean
    public CorsFilter corsFilter() {

        CorsConfiguration config =
                new CorsConfiguration();

        config.addAllowedOrigin(
                "http://localhost:5174"
        );

        config.addAllowedHeader(
                "*"
        );

        config.addAllowedMethod(
                "*"
        );

        config.setAllowCredentials(
                true
        );

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                config
        );

        return new CorsFilter(
                source
        );
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

            .csrf(
                csrf -> csrf.disable()
            )

            .cors(
                cors -> {
                }
            )

            .authorizeHttpRequests(

                auth -> auth

                    .anyRequest()

                    .permitAll()
            );

        return http.build();
    }
}