package com.example.demo.dao;
import com.example.demo.entity.Record;
import org.apache.ibatis.annotations.*;

@Mapper
public interface oneMouthDao {

    @Insert("INSERT INTO records(userId,itemId,dealTime,dealPrice,telephoneNumber)" +
            "VALUES (#{record.userId},#{record.itemId},#{record.dealTime},#{record.dealPrice},#{record.telephoneNumber})")
    int insertRecord(@Param("record") Record record);

    @Insert("INSERT INTO orders(dealPrice, peopleCount,telephoneNumber,itemId, buyerId, dealTime) " +
            "VALUES (#{record.dealPrice},1,#{record.telephoneNumber},#{record.itemId},#{record.userId},#{record.dealTime})")
    int insertOrder(@Param("record") Record record);

    @Update("update item set status=1 where itemId=#{record.itemId}")
    int update_item_status(@Param("record") Record record);

}


