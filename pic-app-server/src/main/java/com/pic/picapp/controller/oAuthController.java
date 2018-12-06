package com.pic.picapp.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:8888", "http://localhost:8080"})
@Controller
public class oAuthController {
}
