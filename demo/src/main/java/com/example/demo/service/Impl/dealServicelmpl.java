package com.example.demo.service.Impl;
import org.springframework.stereotype.Service;

import  com.example.demo.util.*;
import com.example.demo.dao.dealDao;
import com.example.demo.entity.Record;
import com.example.demo.service.dealService;

import javax.annotation.Resource;

@Service
public class dealServicelmpl implements dealService{
    @Resource dealDao dealDao;
    @Override
    public Msg addDealRecord(Record record){
        try{
            dealDao.insertRecord(record);
            dealDao.update_item_finalPrice(record);
            System.out.println("ok");
            return Msg.ok("success");
        }catch (Exception e){
            System.out.println(e.toString());
            return Msg.err(e.toString());
        }

    }

    /*@Override
    public Msg updateItemDealPrice(Records record){
        try {
            dealDao.update_item_finalPrice(record);
            return Msg.ok("success");
        }catch (Exception e) {
            return Msg.err(e.toString());
        }
    }*/
}
