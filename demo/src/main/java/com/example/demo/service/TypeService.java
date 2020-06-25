package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.util.Msg;

import java.util.Map;

public interface TypeService {
    Msg addType(JSONObject jsonObject);

    Msg addItemType(Map<String, Object> map) throws Exception;
}
