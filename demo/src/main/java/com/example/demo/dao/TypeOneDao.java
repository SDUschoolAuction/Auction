package com.example.demo.dao;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.util.Msg;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TypeOneDao {

    @Insert("INSERT INTO type1(itemId,startTime,endTime,markupRange,startPrice) values (#{itemId},#{startTime},#{endTime},#{markupRange},#{startPrice})")
    Msg addType(JSONObject jsonObject);

}
