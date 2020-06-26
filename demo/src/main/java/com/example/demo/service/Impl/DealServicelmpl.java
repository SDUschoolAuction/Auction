package com.example.demo.service.Impl;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.ItemDao;
import com.example.demo.entity.Item;
import org.springframework.stereotype.Service;

import  com.example.demo.util.*;
import com.example.demo.dao.dealDao;
import com.example.demo.entity.Record;
import com.example.demo.service.DealService;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class DealServicelmpl implements DealService {

    public static final Object lockHelper = new Object();

    @Resource
    private dealDao dealDao;

    @Resource
    private ItemDao itemDao;

    @Override
    public Msg addDealRecord(Record record){
        try{
            dealDao.insertRecord(record);
            dealDao.updateItemFinalPrice(record);
            System.out.println("ok");
            return Msg.ok("success");
        }catch (Exception e){
            System.out.println(e.toString());
            return Msg.err(e.toString());
        }

    }

    @Override
    @Transactional(isolation = Isolation.SERIALIZABLE,rollbackFor=Exception.class)
    public Msg bid(Record record) throws InterruptedException {

        Item item=dealDao.getItemByIdLocked(record.getItemId());
        int finalPrice= item.getFinalPrice();
        if(record.getDealPrice()>finalPrice){
            System.out.println(+finalPrice+" "+record.toString()+" start sleeping");
            Date date = new Date();
            record.setDealTime(date);
            dealDao.updateItemFinalPrice(record);
            dealDao.insertRecord(record);
            return Msg.ok("success");
        }else{
            return new Msg<>(0,"reload",finalPrice);
        }
    }
}
