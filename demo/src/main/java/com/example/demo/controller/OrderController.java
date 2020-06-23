package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.service.OrdersService;
import com.example.demo.entity.Order;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Resource
    OrdersService ordersService;

    @RequestMapping("/buyerorders/{buyerId}")
    //@RequestMapping(value="/getbuyerorders",params="buyerId")限制参数？
    public List<Order> getbuyerOrders(@PathVariable Integer buyerId){
        return ordersService.getbuyerOrders(buyerId);
    }

    @RequestMapping("/sellerorders/{sellerId}")
    //@RequestMapping(value="/getbuyerorders",params="buyerId")限制参数？
    public List<Order> getsellerOrders(@PathVariable Integer sellerId){
        return ordersService.getsellerOrders(sellerId);
    }

    @RequestMapping("/getItemListBySellerId/{sellerId}")
    public List<JSONObject> getItemListBySellerId(@PathVariable int sellerId){
        return ordersService.getItemListBySellerId(sellerId);
    }

    @RequestMapping("/getItemListByCustomerId/{customerId}")
    public List<JSONObject> getItemListByCustomerId(@PathVariable int customerId){
        return ordersService.getItemListByCustomerId(customerId);
    }


}
