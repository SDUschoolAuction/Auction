package com.example.demo.service;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.util.Msg;

import java.util.List;


public interface OrdersService {
    Msg getbuyerOrders(int buyerId);

    Msg getsellerOrders(int sellerId);

    Msg getItemListBySellerId(int sellerId);

    Msg getItemListByCustomerId(int customerId);
}
