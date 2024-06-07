package org.banking_app.backend_banking_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.session.Session;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
public class SessionModel implements Session {

  private Session session;

  @Getter @Setter
  private Boolean isCurrent = false;


  @Override
  public String getId() {
    return session.getId();
  }

  @Override
  public String changeSessionId() {
    return session.changeSessionId();
  }

  @Override
  public <T> T getAttribute(String attributeName) {
    return session.getAttribute(attributeName);
  }

  public String getClientBrowser() {
    return session.getAttribute("CLIENT_BROWSER");
  }

  public String getClientOS() {
    return session.getAttribute("CLIENT_OS");
  }

  public String getClientLocation() {
    return session.getAttribute("CLIENT_LOCATION");
  }

  @JsonIgnore
  @Override
  public Set<String> getAttributeNames() {
    return session.getAttributeNames();
  }

  @Override
  public void setAttribute(String attributeName, Object attributeValue) {
    session.setAttribute(attributeName, attributeValue);
  }

  @Override
  public void removeAttribute(String attributeName) {
    session.removeAttribute(attributeName);
  }

  @Override
  public Instant getCreationTime() {
    return session.getCreationTime();
  }

  @Override
  public void setLastAccessedTime(Instant lastAccessedTime) {
    session.setLastAccessedTime(lastAccessedTime);
  }

  @Override
  public Instant getLastAccessedTime() {
    return session.getLastAccessedTime();
  }

  @Override
  public void setMaxInactiveInterval(Duration interval) {
    session.setMaxInactiveInterval(interval);
  }

  @Override
  public Duration getMaxInactiveInterval() {
    return session.getMaxInactiveInterval();
  }

  @Override
  public boolean isExpired() {
    return session.isExpired();
  }
}
