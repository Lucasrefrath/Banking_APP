package org.banking_app.backend_banking_app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/test")
public class TestController {

  @GetMapping
  public String test(Principal principal) {
    return "Hello " + principal.getName();
  }
}
