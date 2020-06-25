package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class Record {
    private Integer userId;
    private Integer itemId;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    private Date dealTime;
    private Integer dealPrice;
    private String telephoneNumber;


    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public Date getDealTime() {
        return dealTime;
    }

    public void setDealTime(Date dealTime) {
        this.dealTime = dealTime;
    }

    public Integer getDealPrice() {
        return dealPrice;
    }

    public void setDealPrice(Integer dealPrice) {
        this.dealPrice = dealPrice;
    }

    public String getTelephoneNumber() {
        return telephoneNumber;
    }

    public void setTelephoneNumber(String telephoneNumber) {
        this.telephoneNumber = telephoneNumber;
    }

    @Override
    public String toString() {
        return "Record{" +
                "userId=" + userId +
                ", itemId=" + itemId +
                ", dealTime=" + dealTime +
                ", dealPrice=" + dealPrice +
                ", telephoneNumber='" + telephoneNumber + '\'' +
                '}';
    }
}
