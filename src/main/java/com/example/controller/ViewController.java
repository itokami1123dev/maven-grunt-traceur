package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {
    @RequestMapping("/")
    public String hello(Model model) {
        model.addAttribute("message", "My HomePage ");
        return "index";
    }
}
