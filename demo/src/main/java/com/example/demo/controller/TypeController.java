package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.factory.FactoryForTypeService;
import com.example.demo.util.Msg;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class TypeController {

    @Resource
    private FactoryForTypeService factoryForTypeService;

    /**
     * @Description: 添加type的接口 1代表添加的是拍卖方式、2代表添加的是一口价方式，传入对象分别对应type1、type2
     * @Param: [key, jsonObject]
     * @returns: com.example.demo.util.Msg
     * @Author: Exgc
     * @Date: 2020/6/24 22:26
     */
    @PostMapping("/addType/{key}")
    public Msg addType(@PathVariable String key, @RequestBody JSONObject jsonObject){
        return factoryForTypeService.getTypeService(key).addType(jsonObject);
    }

}
