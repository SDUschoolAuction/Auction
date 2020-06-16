package com.example.demo.dao;

import com.example.demo.entity.Order;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface getOrdersDao{
//获取userId
    //根据userId->buyerId找到订单中的符合条件的订单
@Select ("SELECT * FROM orders WHERE buyerId = #{buyerId}")
 List<Order> getbuyerOrders(int buyerId);

@Select ("SELECT itemId FROM item WHERE sellerId = #{sellerId}")
 List<Integer> getsellerItems(int sellerId);

@Select("SELECT * FROM orders WHERE itemId= #{itemId}")
Order getsellerOrders (int itemId);


}
