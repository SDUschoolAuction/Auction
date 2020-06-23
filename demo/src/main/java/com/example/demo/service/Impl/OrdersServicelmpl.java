package com.example.demo.service.Impl;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.OrdersDao;
import com.example.demo.entity.Order;
import com.example.demo.service.OrdersService;
import org.springframework.stereotype.Service;


import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrdersServicelmpl implements OrdersService {

    @Resource
    OrdersDao ordersDao;

    @Override
    public List<Order> getbuyerOrders(int buyerId) {
        return ordersDao.getbuyerOrders(buyerId);
    }

    @Override
    public List<Order> getsellerOrders(int sellerId) {
        List<Integer> sellerItems=ordersDao.getsellerItems(sellerId);
        List<Order> sellerOrders=new ArrayList<>();
        for(int id:sellerItems){
            sellerOrders.add(ordersDao.getsellerOrders(id));
        }
        return sellerOrders;
    }

    @Override
    public List<JSONObject> getItemListBySellerId(int sellerId) {
        return ordersDao.getItemListBySellerId(sellerId);
    }

    @Override
    public List<JSONObject> getItemListByCustomerId(int customerId) {
        return ordersDao.getItemListByCustomerId(customerId);
    }

   /* @Override
    public List<Integer> testID(int sellerId) {
        List<Integer> ITEMS=OrdersDao.getsellerItems(sellerId);
        return ITEMS;
    }*/

}
