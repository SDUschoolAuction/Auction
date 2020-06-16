package com.example.demo.dao;
import com.example.demo.entity.Record;
import org.apache.ibatis.annotations.*;

@Mapper
public interface dealDao {

    @Insert("INSERT INTO records(users_userid,item_itemId,dealTime,dealPrice)" +
            "VALUES (#{record.usersUserid},#{record.itemItemId},#{record.dealTime},#{record.dealPrice})")
    int insertRecord(@Param("record") Record record);

    @Update("update item set finalPrice=#{record.dealPrice} where itemId=#{record.itemItemId}")
    int update_item_finalPrice(@Param("record") Record record);

}
