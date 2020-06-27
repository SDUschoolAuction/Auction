package com.example.demo.dao;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Order;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface OrdersDao {

    @Select ("SELECT * FROM orders,item WHERE buyerId = #{buyerId} and orders.itemId=item.itemId")
    List<JSONObject> getbuyerOrders(int buyerId);

    @Select("SELECT * FROM orders,item WHERE orders.itemId=item.itemId and item.sellerId=#{sellerId}")
    List<JSONObject> getsellerOrders (int sellerId);

    @Select("select * from (item left join type1 on item.itemId=type1.itemId) left join type2 on item.itemId=type2.itemId where item.sellerId=#{sellerId}\n" +
            "union\n" +
            "select * from (item right join type1 on item.itemId=type1.itemId) right join type2 on item.itemId=type2.itemId where item.sellerId=#{sellerId};")
    List<JSONObject> getItemListBySellerId(int sellerId);

    @Select("select itemTag,item.itemId itemId,itemInfo,finalPrice,itemLocation,status,itemImg1,itemImg2,itemImg3,itemImg4,item.telephoneNumber sellerTelephoneNumber,sellerId,`type`,itemHead,startTime,endTime,dealPrice,red.telephoneNumber comstumerTelephoneNumber\n" +
            "\tfrom (item left join type1 on item.itemId=type1.itemId),records as red\n" +
            "\twhere item.itemId=red.itemId AND red.userId=#{customerId} AND (red.itemId,red.dealPrice) IN \n" +
            "\t(SELECT records.itemId,MAX(dealPrice)\n" +
            "\t\tFROM records\n" +
            "\t\tGROUP BY records.itemId\n" +
            "\t) ;")
    List<JSONObject> getItemListByCustomerId(int customerId);
}
