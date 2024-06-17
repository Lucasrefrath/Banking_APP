package org.banking_app.backend_banking_app.config;

import org.banking_app.backend_banking_app.service.auth.JpaUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.authentication.configuration.EnableGlobalAuthentication;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandlerImpl;
import org.springframework.security.web.authentication.AuthenticationFilter;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisIndexedHttpSession;
import org.springframework.session.web.http.CookieHttpSessionIdResolver;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;
import org.springframework.session.web.http.HttpSessionIdResolver;

@Configuration
@EnableWebSecurity
@EnableRedisIndexedHttpSession
@EnableGlobalAuthentication
public class SecurityConfig {

  private final String[] WHITELIST = {
          "/auth/v1/login",
          "/auth/v1/checkAuth",
          "/api/v1/userSignUp/**",
          "/api-test/v1/**"
  };

  private final String[] REQUIRE_ADMIN = {
          "/api/v1/userSignUp/open",
          "/api/v1/sessions/allSessions",
          "/api/v1/sessions/sessions/**",
          "/api/v1/users/**"
  };

  @Autowired
  JpaUserDetailsService jpaUserDetailsService;

  @Bean
  public SecurityFilterChain configure(HttpSecurity http) throws Exception {
    return http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> {

              auth.requestMatchers(REQUIRE_ADMIN).hasAuthority("ROLE_ADMIN");
              auth.requestMatchers(WHITELIST).permitAll();
              auth.anyRequest().authenticated();
            })
            .sessionManagement(session -> session
                    .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                    .maximumSessions(2)
            )
            .userDetailsService(jpaUserDetailsService)
            .httpBasic(httpSecurityHttpBasicConfigurer -> httpSecurityHttpBasicConfigurer
                    .authenticationEntryPoint(new CustomAuthenticationEntryPoint())
            )
            .build();
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }

  @Bean
  public HttpSessionIdResolver httpSessionIdResolver() {
    return new CookieHttpSessionIdResolver();
  }

  @Bean
  public static PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public CookieSerializer cookieSerializer() {
    DefaultCookieSerializer cookieSerializer = new DefaultCookieSerializer();
    cookieSerializer.setSameSite(null);
    return cookieSerializer;
  }
}
