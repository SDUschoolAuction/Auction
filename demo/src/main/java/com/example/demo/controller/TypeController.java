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

    @PostMapping("/addType/{key}")
    public Msg addType(@PathVariable String key, @RequestBody JSONObject jsonObject){
        return factoryForTypeService.getTypeService(key).addType(jsonObject);
    }

}
