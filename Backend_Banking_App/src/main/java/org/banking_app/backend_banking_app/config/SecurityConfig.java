package org.banking_app.backend_banking_app.config;

import org.banking_app.backend_banking_app.service.auth.JpaUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;

@Configuration
@EnableWebSecurity
@EnableRedisHttpSession
public class SecurityConfig {

  @Autowired
  JpaUserDetailsService jpaUserDetailsService;

  @Bean
  public static PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public SecurityFilterChain configure(HttpSecurity http) throws Exception {
    return http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> {
              auth.requestMatchers("/auth/v1/login", "/auth/v1/checkAuth").permitAll(); //AUTH

              auth.requestMatchers("/api/v1/users/**").hasAuthority("ROLE_ADMIN");

              auth.anyRequest().authenticated();
            })
            .sessionManagement(session -> session
                    .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                    .maximumSessions(1)
                    .maxSessionsPreventsLogin(false)
            )
            .logout(logout -> logout
                    .deleteCookies("SESSION")
                    .invalidateHttpSession(true)
            )
            .userDetailsService(jpaUserDetailsService)
            .httpBasic(Customizer.withDefaults())
            .build();
  }

  @Bean
  public CookieSerializer cookieSerializer() {
    DefaultCookieSerializer cookieSerializer = new DefaultCookieSerializer();
    cookieSerializer.setSameSite(null);
    return cookieSerializer;
  }
}
