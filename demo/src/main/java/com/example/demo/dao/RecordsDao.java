package com.example.demo.dao;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Record;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
@Mapper
public interface RecordsDao {

    @Select("SELECT users.userId userId,users.name userName,users.userIcon userIcon,records.telephoneNumber telephoneNumber,records.dealPrice dealPrice,records.itemId itemId,DATE_FORMAT(records.dealTime,'%Y-%m-%d %H:%i:%s') dealTime from records,users\n" +
            "\twhere records.itemId=#{itemId} and records.userId=users.userid\n" +
            "\torder by dealPrice;")
    List<JSONObject> getRecordsByItemId(int itemId);

    @Select("select count(userId) from records where itemId=#{itemId} group by itemId;")
    int getRecordsCountByItemId(int itemId);


}
