package com.example.demo.service.Impl;
import org.springframework.stereotype.Service;

import  com.example.demo.util.*;
import com.example.demo.dao.oneMouthDao;
import com.example.demo.entity.Record;
import com.example.demo.service.oneMouthDealService;

import javax.annotation.Resource;

@Service
public class OneMouthDeallmp implements oneMouthDealService{
    @Resource oneMouthDao oneMouthDao;
    @Override
    public Msg addOneMouthDeal(Record record){
        try{
            oneMouthDao.insertRecord(record);
            oneMouthDao.insertOrder(record);
            oneMouthDao.update_item_status(record);
            System.out.println("ok");
            return Msg.ok("success");
        }catch (Exception e){
            System.out.println(e.toString());
            return Msg.err(e.toString());
        }

    }


}
