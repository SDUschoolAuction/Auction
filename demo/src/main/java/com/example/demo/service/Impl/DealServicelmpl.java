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

    @Resource
    private dealDao dealDao;

    @Override
    @Transactional(isolation = Isolation.SERIALIZABLE,rollbackFor=Exception.class)
    public Msg bid(Record record){
        Item item=dealDao.getItemByIdLocked(record.getItemId());
        int finalPrice= item.getFinalPrice();
        if(record.getDealPrice()>finalPrice){
            Date date = new Date();
            record.setDealTime(date);
            dealDao.updateItemFinalPrice(record);
            dealDao.insertRecord(record);
            return Msg.ok("success");
        }else{
            return new Msg<>(0,"reload",finalPrice);
        }
    }

    @Override
    @Transactional(isolation = Isolation.SERIALIZABLE,rollbackFor = Exception.class)
    public Msg purchase(Record record){
        Item item=dealDao.getItemByIdLocked(record.getItemId());
        int status=item.getStatus();
        if(status==0){
            Date date = new Date();
            record.setDealTime(date);
            dealDao.insertRecord(record);
            dealDao.insertOrder(record);
            dealDao.update_item_status(record);
            return Msg.ok("success");
        }else{
            return new Msg<>(0,"Exception while purchasing",status);
        }
    }
}
