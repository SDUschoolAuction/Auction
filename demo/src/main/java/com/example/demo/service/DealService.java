package com.example.demo.service;
import com.example.demo.entity.Record;
import com.example.demo.util.Msg;

public interface DealService {
   Msg addDealRecord(Record record);

   Msg bid(Record record) throws InterruptedException;

}
