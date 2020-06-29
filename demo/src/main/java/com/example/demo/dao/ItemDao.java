package com.example.demo.dao;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Item;
import com.example.demo.entity.Record;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ItemDao {

    @Insert("INSERT INTO item(`itemInfo`,`itemLocation`,`status`,`itemImg1`,`itemImg2`,`itemImg3`,`itemImg4`,`telephoneNumber`,`sellerId`,`type`,`itemHead`,`finalPrice`,`itemTag`) values(#{itemInfo},#{itemLocation},-1,#{itemImg1},#{itemImg2},#{itemImg3},#{itemImg4},#{telephoneNumber},#{sellerId},#{type},#{itemHead},#{finalPrice},#{itemTag});")
    @Options(useGeneratedKeys = true,keyProperty = "itemId",keyColumn = "itemId")
    Integer addItem(Item item);

    @Select("select * from (item left join type1 on item.itemId=type1.itemId) left join type2 on item.itemId=type2.itemId where item.itemId=#{itemId}\n" +
            "union\n" +
            "select * from (item right join type1 on item.itemId=type1.itemId) right join type2 on item.itemId=type2.itemId where item.itemId=#{itemId};")
    JSONObject getItemById(int itemId);

    @Update("UPDATE item SET itemInfo=#{itemInfo},itemLocation=#{itemLocation},itemImg1=#{itemImg1},itemImg2=#{itemImg2},itemImg3=#{itemImg3},itemImg4=#{itemImg4},telephoneNumber=#{telephoneNumber},itemHead=#{itemHead},itemTag=#{itemTag} where itemId=#{itemId};")
    Integer updateItem(Item item);

    @Update("UPDATE item SET STATUS=2 WHERE itemId=#{itemId};")
    Integer deleteItemById(int itemId);

    @Select("select * from (item left join type1 on item.itemId=type1.itemId) left join type2 on item.itemId=type2.itemId where item.status in (-1,0)\n" +
            "union\n" +
            "select * from (item right join type1 on item.itemId=type1.itemId) right join type2 on item.itemId=type2.itemId where item.status in (-1,0);")
    List<JSONObject> getItemList();
}
