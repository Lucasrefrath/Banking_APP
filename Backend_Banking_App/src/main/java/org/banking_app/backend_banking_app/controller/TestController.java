package org.banking_app.backend_banking_app.controller;

import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("http://localhost:3000/")
public class TestController {

  @GetMapping("/open")
  public String open() {
    return "Welcome";
  }

  @GetMapping("/user")
  public String user(Principal principal) {
    return "Welcome User: " + principal.getName();
  }

  @GetMapping("/admin")
  public String admin(Principal principal) {
    return "Welcome admin: " + principal.getName();
  }
}
