package com.example.demo.dao;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.util.Msg;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TypeTwoDao {

    @Insert("INSERT INTO type2(itemId,itemPrice) values (#{itemId},#{itemPrice})")
    Msg addType(JSONObject jsonObject);
}
