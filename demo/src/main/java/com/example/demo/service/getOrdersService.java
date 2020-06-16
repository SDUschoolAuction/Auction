package com.example.demo.service;
import com.example.demo.entity.Order;

import java.util.List;


public interface getOrdersService {
    List<Order> getbuyerOrders(int buyerId);
    List<Order> getsellerOrders(int sellerId);
   // List<Integer> testID(int id);
}
