package com.example.demo.dao;

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

    @Select("SELECT * FROM item WHERE itemId=#{itemId};")
    Item getItemById(int itemId);

    @Update("UPDATE item SET itemInfo=#{itemInfo},itemLocation=#{itemLocation},itemImg1=#{itemImg1},itemImg2=#{itemImg2},itemImg3=#{itemImg3},itemImg4=#{itemImg4},telephone=#{telephoneNumber} where itemId=#{itemId};")
    Integer updateItem(Item item);

    @Update("UPDATE item SET STATUS=2 WHERE itemId=#{itemId};")
    Integer deleteItemById(int itemId);

    @Select("SELECT * FROM item where status !=2")
    List<Item> getItemList();
}
