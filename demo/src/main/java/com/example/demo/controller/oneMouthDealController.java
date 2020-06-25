package com.example.demo.controller;
import com.example.demo.service.Impl.OneMouthDeallmp;
import org.springframework.web.bind.annotation.*;
import com.example.demo.entity.*;
import com.example.demo.service.*;
import com.example.demo.util.Msg;

import javax.annotation.Resource;

@RestController
public class oneMouthDealController {
    @Resource private oneMouthDealService omd;
    @PostMapping("/oneMouthDeal")
    public Msg addOneMouthRecord(@RequestBody Record record){
        System.out.println(record.toString());
        return omd.addOneMouthDeal(record);
    }

}
