package com.example.demo.dao;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Order;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface OrdersDao {

    @Select ("SELECT dealPrice,peopleCount,item.telephoneNumber sellerTelephoneNumber,item.itemId itemId,buyerId,DATE_FORMAT(dealTime,'%Y-%m-%d %H:%i:%s') dealTime,itemTag,itemInfo,finalPrice,itemLocation,`status`,itemImg1,orders.telephoneNumber buyerTelephoneNumber,sellerId,type,itemHead FROM orders,item WHERE buyerId = 1 and orders.itemId=item.itemId")
    List<JSONObject> getbuyerOrders(int buyerId);

    @Select("SELECT dealPrice,peopleCount,item.telephoneNumber sellerTelephoneNumber,item.itemId itemId,buyerId,DATE_FORMAT(dealTime,'%Y-%m-%d %H:%i:%s') dealTime,itemTag,itemInfo,finalPrice,itemLocation,`status`,itemImg1,orders.telephoneNumber buyerTelephoneNumber,sellerId,type,itemHead FROM orders,item WHERE orders.itemId=item.itemId and item.sellerId=#{sellerId};")
    List<JSONObject> getsellerOrders (int sellerId);

    @Select("select startPrice,markupRange,itemTag,telephoneNumber,finalPrice,itemInfo,itemImg1,itemLocation,type,item.itemId itemId,sellerId,itemHead,DATE_FORMAT(startTime,'%Y-%m-%d %H:%i:%s') startTime,DATE_FORMAT(endTime,'%Y-%m-%d %H:%i:%s') endTime,status from (item left join type1 on item.itemId=type1.itemId) left join type2 on item.itemId=type2.itemId where item.sellerId=#{sellerId};")
    List<JSONObject> getItemListBySellerId(int sellerId);

    @Select("select itemTag,item.itemId itemId,itemInfo,finalPrice,itemLocation,status,itemImg1,itemImg2,itemImg3,itemImg4,item.telephoneNumber sellerTelephoneNumber,sellerId,`type`,itemHead,DATE_FORMAT(startTime,'%Y-%m-%d %H:%i:%s') startTime,DATE_FORMAT(endTime,'%Y-%m-%d %H:%i:%s') endTime,dealPrice,red.telephoneNumber comstumerTelephoneNumber\n" +
            "\tfrom (item left join type1 on item.itemId=type1.itemId),records as red\n" +
            "\twhere item.itemId=red.itemId AND red.userId=#{customerId} AND (red.itemId,red.userId,red.dealPrice) IN \n" +
            "\t(SELECT records.itemId,records.userId,MAX(dealPrice)\n" +
            "\t\tFROM records\n" +
            "\t\tGROUP BY records.itemId,records.userId\n" +
            "\t) ;")
    List<JSONObject> getItemListByCustomerId(int customerId);
}
