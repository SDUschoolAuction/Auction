package com.example.demo.dao;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Item;
import com.example.demo.entity.Record;
import org.apache.ibatis.annotations.*;

@Mapper
public interface dealDao {

    @Insert("INSERT INTO records(userId,itemId,dealTime,dealPrice,telephoneNumber)" +
            "VALUES (#{record.userId},#{record.itemId},#{record.dealTime},#{record.dealPrice},#{record.telephoneNumber})")
    int insertRecord(@Param("record") Record record);

    @Update("update item set finalPrice=#{record.dealPrice} where itemId=#{record.itemId}")
    int updateItemFinalPrice(@Param("record") Record record);

    @Select("SELECT * from item where itemId=#{itemId} for update")
    Item getItemByIdLocked(Integer itemId);

    @Insert("INSERT INTO orders(dealPrice, peopleCount,telephoneNumber,itemId, buyerId, dealTime) " +
            "VALUES (#{record.dealPrice},1,#{record.telephoneNumber},#{record.itemId},#{record.userId},#{record.dealTime})")
    int insertOrder(@Param("record") Record record);

    @Update("update item set status=1 where itemId=#{record.itemId}")
    int update_item_status(@Param("record") Record record);
}
