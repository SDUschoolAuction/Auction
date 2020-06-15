package com.example.demo.service.Impl;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.TypeTwoDao;
import com.example.demo.service.TypeService;
import com.example.demo.util.Msg;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component("2")
public class TypeTwoImpl implements TypeService {

    @Resource
    private TypeTwoDao typeTwoDao;
    @Override
    public Msg addType(JSONObject jsonObject) {
        try {
            typeTwoDao.addType(jsonObject);
            System.out.println("success");
            return Msg.ok("success");
        }catch (Exception e){
            return Msg.err(e.toString());
        }
    }
}
