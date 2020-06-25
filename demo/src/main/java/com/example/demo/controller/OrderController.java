package com.example.demo.controller;

import com.example.demo.service.OrdersService;
import com.example.demo.util.Msg;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Resource
    OrdersService ordersService;


    @RequestMapping("/buyerorders/{buyerId}")
    public Msg getbuyerOrders(@PathVariable Integer buyerId){
        return ordersService.getbuyerOrders(buyerId);
    }

    @RequestMapping("/sellerorders/{sellerId}")
    public Msg getsellerOrders(@PathVariable Integer sellerId){
        return ordersService.getsellerOrders(sellerId);
    }

    @RequestMapping("/getItemListBySellerId/{sellerId}")
    public Msg getItemListBySellerId(@PathVariable int sellerId){
        return ordersService.getItemListBySellerId(sellerId);
    }

    @RequestMapping("/getItemListByCustomerId/{customerId}")
    public Msg getItemListByCustomerId(@PathVariable int customerId){
        return ordersService.getItemListByCustomerId(customerId);
    }


}
