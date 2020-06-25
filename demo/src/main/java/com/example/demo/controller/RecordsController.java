package com.example.demo.controller;


import com.example.demo.service.RecordsService;
import com.example.demo.util.Msg;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/records")
public class RecordsController {

    @Resource
    RecordsService recordsService;

    /**
     * @Description: 获取出价记录
     * @Param: [itemId] 
     * @returns: com.example.demo.util.Msg
     * @Author: Exgc
     * @Date: 2020/6/24 9:18
     */
    @RequestMapping("/getRecordsByItemId/{itemId}")
    public Msg getRecordsByItemId(@PathVariable int itemId){
        return recordsService.getRecordsByItemId(itemId);
    }
}
