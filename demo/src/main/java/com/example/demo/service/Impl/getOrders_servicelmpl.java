package com.example.demo.service.Impl;

import com.example.demo.dao.getOrdersDao;
import com.example.demo.entity.Order;
import com.example.demo.service.getOrdersService;
import org.springframework.stereotype.Service;


import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class getOrders_servicelmpl implements getOrdersService {

    @Resource getOrdersDao getOrdersDao;

    @Override
    public List<Order> getbuyerOrders(int buyerId) {
        return getOrdersDao.getbuyerOrders(buyerId);
    }

    @Override
    public List<Order> getsellerOrders(int sellerId) {
        List<Integer> sellerItems=getOrdersDao.getsellerItems(sellerId);
        List<Order> sellerOrders=new ArrayList<>();
        for(int id:sellerItems){
            sellerOrders.add(getOrdersDao.getsellerOrders(id));
        }
        return sellerOrders;
    }

   /* @Override
    public List<Integer> testID(int sellerId) {
        List<Integer> ITEMS=getOrdersDao.getsellerItems(sellerId);
        return ITEMS;
    }*/

}
