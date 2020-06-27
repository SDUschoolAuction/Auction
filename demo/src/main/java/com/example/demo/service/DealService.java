package com.example.demo.service;
import com.example.demo.entity.Record;
import com.example.demo.util.Msg;

public interface DealService {

   Msg bid(Record record) throws InterruptedException;

   Msg purchase(Record record) throws InterruptedException;
}
