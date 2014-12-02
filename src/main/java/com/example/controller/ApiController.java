package com.example.controller;


import com.example.dto.HogehogeDto;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class ApiController {

    @RequestMapping("hogehoge")
    public HogehogeDto hogehoge() {
        return new HogehogeDto();
    }
}
