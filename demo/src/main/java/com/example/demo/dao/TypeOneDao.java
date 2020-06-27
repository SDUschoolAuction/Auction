package com.example.demo.dao;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.util.Msg;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface TypeOneDao {

    @Insert("INSERT INTO type1(itemId,startTime,endTime,markupRange,startPrice) values (#{itemId},#{startTime},#{endTime},#{markupRange},#{startPrice})")
    void addType(JSONObject jsonObject);

    @Update("UPDATE ")
    void updateType(JSONObject jsonObject);


}
