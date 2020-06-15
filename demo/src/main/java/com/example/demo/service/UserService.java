package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.util.Msg;

public interface UserService {
    Msg addUser(User user);

    User getUserById(int userId);
}
