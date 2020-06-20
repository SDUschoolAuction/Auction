package com.example.demo.controller;


import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import com.example.demo.util.Msg;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;

@RestController
public class UserController{


    @Resource
    private UserService userService;

    @RequestMapping("/openid")
    private String login(String code) throws Exception {
        String AppID = "自己的AppID";
        String AppSecret="6c56fb6f23a5cd567db096ab4050e337";//这两个都可以从微信公众平台中查找
        String url = "https://api.weixin.qq.com/sns/jscode2session?appid="
                + AppID + "&secret=" + AppSecret + "&js_code="
                + code + "&grant_type=authorization_code";
        URL reqURL = new URL(url);
        HttpsURLConnection openConnection = (HttpsURLConnection) reqURL
                .openConnection();
        openConnection.setConnectTimeout(10000);
        //这里我感觉获取openid的时间比较长，不过也可能是我网络的问题，
        //所以设置的响应时间比较长
        openConnection.connect();
        InputStream in = openConnection.getInputStream();

        StringBuilder builder = new StringBuilder();
        BufferedReader bufreader = new BufferedReader(new InputStreamReader(in));
        for (String temp = bufreader.readLine(); temp != null; temp = bufreader.readLine()) {
            builder.append(temp);
        }

        String result = builder.toString();
        in.close();
        openConnection.disconnect();
        return result;
    }


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
