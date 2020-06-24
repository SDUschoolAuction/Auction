package com.example.demo.service.Impl;

import com.example.demo.dao.RecordsDao;
import com.example.demo.service.RecordsService;
import com.example.demo.util.Msg;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class RecordsServoceImpl implements RecordsService {

    @Resource
    RecordsDao recordsDao;


    @Override
    public Msg getRecordsByItemId(int itemId) {
        try{
            return new Msg<>(0,"success",recordsDao.getRecordsByItemId(itemId));
        }catch (Exception e){
            return Msg.err(e.toString());
        }
    }
}
