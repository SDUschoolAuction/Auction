package com.example.demo.service.Impl;

import com.example.demo.dao.UserDao;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import com.example.demo.util.Msg;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class UserServiceImpl implements UserService {

    @Resource
    private UserDao userDao;

    @Override
    public Msg addUser(User user) {
        try{
            userDao.addUser(user);
            System.out.println("ok");
            return Msg.ok("success");
        }catch (Exception e){
            System.out.println(e.toString());
            return Msg.err(e.toString());
        }
    }

    @Override
    public User getUserById(int userId) {
        return userDao.getUser(userId);
    }
}
