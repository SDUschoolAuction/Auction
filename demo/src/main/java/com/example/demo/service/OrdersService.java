package com.example.demo.service;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Order;

import java.util.List;


public interface OrdersService {
    List<Order> getbuyerOrders(int buyerId);

    List<Order> getsellerOrders(int sellerId);

    List<JSONObject> getItemListBySellerId(int sellerId);

    List<JSONObject> getItemListByCustomerId(int customerId);
}
