package com.example.demo.controller;
import org.springframework.web.bind.annotation.*;
import com.example.demo.entity.*;
import com.example.demo.service.*;
import com.example.demo.util.Msg;

import javax.annotation.Resource;

@RestController
public class dealServiceController {
@Resource private dealService dls;

    @PostMapping("/newbid")
    public Msg addDealRecord(@RequestBody Record record){
        System.out.println(record.toString());
        return dls.addDealRecord(record);
    }

}
