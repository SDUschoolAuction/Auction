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
    

    /**
     * @Description: 获取我已购买的商品信息
     * @Param: [buyerId] 
     * @returns: com.example.demo.util.Msg 
     * @Author: 刘梦普、Exgc
     * @Date: 2020/6/24 22:37
     */
    @RequestMapping("/buyerorders/{buyerId}")
    public Msg getbuyerOrders(@PathVariable Integer buyerId){
        return ordersService.getbuyerOrders(buyerId);
    }

    /**
     * @Description: 获取我已卖出的商品信息
     * @Param: [sellerId] 
     * @returns: com.example.demo.util.Msg 
     * @Author: 刘梦普、Exgc
     * @Date: 2020/6/24 22:37
     */
    @RequestMapping("/sellerorders/{sellerId}")
    public Msg getsellerOrders(@PathVariable Integer sellerId){
        return ordersService.getsellerOrders(sellerId);
    }

    /**
     * @Description: 获取我的发布商品信息
     * @Param: [sellerId] 
     * @returns: com.example.demo.util.Msg 
     * @Author: Exgc
     * @Date: 2020/6/24 22:38
     */
    @RequestMapping("/getItemListBySellerId/{sellerId}")
    public Msg getItemListBySellerId(@PathVariable int sellerId){
        return ordersService.getItemListBySellerId(sellerId);
    }

    /**
     * @Description: 获取我的参拍商品信息
     * @Param: [customerId] 
     * @returns: com.example.demo.util.Msg 
     * @Author: Exgc
     * @Date: 2020/6/24 22:38
     */
    @RequestMapping("/getItemListByCustomerId/{customerId}")
    public Msg getItemListByCustomerId(@PathVariable int customerId){
        return ordersService.getItemListByCustomerId(customerId);
    }


}
