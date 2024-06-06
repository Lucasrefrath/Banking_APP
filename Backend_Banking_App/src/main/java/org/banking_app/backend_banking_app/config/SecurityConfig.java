package org.banking_app.backend_banking_app.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpSessionListener;
import org.antlr.v4.runtime.misc.Interval;
import org.banking_app.backend_banking_app.service.auth.JpaUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.session.SessionInformationExpiredEvent;
import org.springframework.security.web.session.SessionInformationExpiredStrategy;
import org.springframework.session.data.redis.RedisIndexedSessionRepository;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisIndexedHttpSession;
import org.springframework.session.data.redis.config.annotation.web.http.RedisHttpSessionConfiguration;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;

import java.io.IOException;
import java.time.Duration;

@Configuration
@EnableWebSecurity
@EnableRedisIndexedHttpSession
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

              auth.requestMatchers("/api/v1/sessions/allSessions", "/api/v1/sessions/sessions/").hasAnyAuthority("ROLE_USER");
              auth.requestMatchers("/api/v1/users/**").hasAuthority("ROLE_ADMIN");

              auth.anyRequest().authenticated();
            })
            .sessionManagement(session -> session
                    .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                    .maximumSessions(2)
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
