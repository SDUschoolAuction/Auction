package com.example.demo.dao;
import com.example.demo.entity.Record;
import org.apache.ibatis.annotations.*;

@Mapper
public interface oneMouthDao {

    @Insert("INSERT INTO records(userId,itemId,dealTime,dealPrice)" +
            "VALUES (#{record.usersUserid},#{record.itemItemId},#{record.dealTime},#{record.dealPrice})")
    int insertRecord(@Param("record") Record record);


    @Update("update item set status=1 where itemId=#{record.itemItemId}")
    int update_item_status(@Param("record") Record record);

}

