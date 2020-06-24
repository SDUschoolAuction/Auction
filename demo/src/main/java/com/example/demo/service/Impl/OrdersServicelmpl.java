package com.example.demo.service.Impl;

import com.example.demo.dao.OrdersDao;
import com.example.demo.service.OrdersService;
import com.example.demo.util.Msg;
import org.springframework.stereotype.Service;


import javax.annotation.Resource;

@Service
public class OrdersServicelmpl implements OrdersService {

    @Resource
    OrdersDao ordersDao;

    @Override
    public Msg getbuyerOrders(int buyerId) {
        try{
            return new Msg<>(0,"success",ordersDao.getbuyerOrders(buyerId));
        }catch (Exception e){
            return Msg.err(e.toString());
        }
    }

    @Override
    public Msg getsellerOrders(int sellerId) {
        try{
            return new Msg<>(0,"success",ordersDao.getsellerOrders(sellerId));
        }catch (Exception e){
            return Msg.err(e.toString());
        }
    }

    @Override
    public Msg getItemListBySellerId(int sellerId) {
        try{
            return new Msg<>(0,"success",ordersDao.getItemListBySellerId(sellerId));
        }catch (Exception e){
            return Msg.err(e.toString());
        }
    }

    @Override
    public Msg getItemListByCustomerId(int customerId) {
        try{
            return new Msg<>(0,"success",ordersDao.getItemListByCustomerId(customerId));
        }catch (Exception e){
            return Msg.err(e.toString());
        }
    }
}
