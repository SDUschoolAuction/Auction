package com.example.demo.service.Impl;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.TypeOneDao;
import com.example.demo.service.TypeService;
import com.example.demo.util.Msg;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component("1")
public class TypeOneImpl implements TypeService {

    @Resource
    private TypeOneDao typeOneDao;

    @Override
    public Msg addType(JSONObject jsonObject) {
        return typeOneDao.addType(jsonObject);
    }
}
