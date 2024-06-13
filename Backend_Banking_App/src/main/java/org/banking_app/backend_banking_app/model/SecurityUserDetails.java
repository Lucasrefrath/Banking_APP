package org.banking_app.backend_banking_app.model;

import org.banking_app.backend_banking_app.model.DTO.UserEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;

public class SecurityUserDetails implements UserDetails {

  private final UserEntity user;

  public SecurityUserDetails(UserEntity user) {
    this.user = user;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Arrays.stream(user
            .getRoles()
            .split(","))
            .map(SimpleGrantedAuthority::new)
            .toList();
  }

  public boolean hasAuthority(String authority) {
    return user.getRoles().contains(authority);
  }

  @Override
  public String getPassword() {
    return user.getPassword();
  }

  @Override
  public String getUsername() {
    return user.getUsername();
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  public Long getUserId() {
    return user.getId();
  }

  @Override
  public String toString() {
    return "SecurityUserDetails{" +
            "user=" + user +
            '}';
  }
}
