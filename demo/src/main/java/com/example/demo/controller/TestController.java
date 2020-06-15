package com.example.demo.controller;


import com.example.demo.entity.test;
import com.example.demo.service.testService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class TestController {

    @Resource
    private testService testService;


    @RequestMapping("/test")
    public List<test> getTest(){
        return testService.getTest();
    }
}
