package com.example.demo.controller;
import org.springframework.web.bind.annotation.*;
import com.example.demo.entity.*;
import com.example.demo.service.*;
import com.example.demo.util.Msg;

import javax.annotation.Resource;

@RestController
public class dealServiceController {
@Resource private DealService dealService;

    /**
     * @Description: 高并发异步出价请求，防止脏数据，拍卖
     * @Param: [record]
     * @returns: com.example.demo.util.Msg
     * @Author: Exgc
     * @Date: 2020/6/26 6:45
     */
    @PostMapping("/bid")
    public Msg bid(@RequestBody Record record){
        try{
            return dealService.bid(record);
        }catch (Exception e){
            return Msg.err(e.toString());
        }
    }

    /**
     * @Description: 高并发异步出价请求，防止脏数据\，一口价
     * @Param: [record]
     * @returns: com.example.demo.util.Msg
     * @Author: Exgc
     * @Date: 2020/6/26 6:45
     */
    @PostMapping("/purchase")
    public Msg purchase(@RequestBody Record record){
        try{
            return dealService.purchase(record);
        }catch (Exception e){
            return Msg.err(e.toString());
        }
    }


}
