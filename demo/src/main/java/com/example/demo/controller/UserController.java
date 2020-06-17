package com.example.demo.controller;


import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import com.example.demo.util.Msg;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
@RestController
public class UserController{

    @Resource
    private UserService userService;

    @PostMapping("/addUser")
    public Msg addUser(@RequestBody User user){
        System.out.println(user.toString());
        return userService.addUser(user);
    }

    @RequestMapping("/user/{userId}")
    public User getUserById(@PathVariable int userId){
        return userService.getUserById(userId);
    }
}
