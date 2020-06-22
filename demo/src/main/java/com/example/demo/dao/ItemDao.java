package com.example.demo.dao;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Item;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface ItemDao {

    @Insert("INSERT INTO item(`itemInfo`,`itemLocation`,`status`,`itemImg1`,`itemImg2`,`itemImg3`,`itemImg4`,`telephone`,`sellerId`,`type`) values(#{itemInfo},#{itemLocation},-1,#{itemImg1},#{itemImg2},#{itemImg3},#{itemImg4},#{telephoneNumber},#{sellerId},#{type});")
    Integer addItem(Item item);

    @Select("select * from (item left join type1 on item.itemId=type1.itemId) left join type2 on item.itemId=type2.itemId where item.itemId=#{itemId}\n" +
            "union\n" +
            "select * from (item right join type1 on item.itemId=type1.itemId) right join type2 on item.itemId=type2.itemId where item.itemId=#{itemId};")
    JSONObject getItemById(int itemId);

    @Update("UPDATE item SET itemInfo=#{itemInfo},itemLocation=#{itemLocation},itemImg1=#{itemImg1},itemImg2=#{itemImg2},itemImg3=#{itemImg3},itemImg4=#{itemImg4},telephone=#{telephoneNumber} where itemId=#{itemId};")
    Integer updateItem(Item item);

    @Update("UPDATE item SET STATUS=2 WHERE itemId=#{itemId};")
    Integer deleteItemById(int itemId);

    @Select("select * from (item left join type1 on item.itemId=type1.itemId) left join type2 on item.itemId=type2.itemId where item.status in (-1,0,1)\n" +
            "union\n" +
            "select * from (item right join type1 on item.itemId=type1.itemId) right join type2 on item.itemId=type2.itemId where item.status in (-1,0,1);")
    List<JSONObject> getItemList();
}
