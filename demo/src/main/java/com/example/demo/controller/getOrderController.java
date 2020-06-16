package com.example.demo.controller;

import com.example.demo.service.getOrdersService;
import com.example.demo.entity.Order;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/orders")
public class getOrderController {
    @Resource getOrdersService getGetordersservice;

    @RequestMapping("/buyerorders/{buyerId}")
    //@RequestMapping(value="/getbuyerorders",params="buyerId")限制参数？
    public List<Order> getbuyerOrders(@PathVariable Integer buyerId){
        return getGetordersservice.getbuyerOrders(buyerId);
    }

    @RequestMapping("/sellerorders/{sellerId}")
    //@RequestMapping(value="/getbuyerorders",params="buyerId")限制参数？
    public List<Order> getsellerOrders(@PathVariable Integer sellerId){
        return getGetordersservice.getsellerOrders(sellerId);
    }


}
