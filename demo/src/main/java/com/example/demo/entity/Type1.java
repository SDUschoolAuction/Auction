package com.example.demo.entity;

import org.springframework.stereotype.Component;

import java.util.Date;

public class Type1 implements Type {
    private Integer itemId;
    private Date startTime;
    private Date endTime;
    private Integer markUpRange;
    private Integer startPrice;

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Integer getMarkUpRange() {
        return markUpRange;
    }

    public void setMarkUpRange(Integer markUpRange) {
        this.markUpRange = markUpRange;
    }

    public Integer getStartPrice() {
        return startPrice;
    }

    public void setStartPrice(Integer startPrice) {
        this.startPrice = startPrice;
    }

    @Override
    public String toString() {
        return "Type1{" +
                "itemId=" + itemId +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", markUpRange=" + markUpRange +
                ", startPrice=" + startPrice +
                '}';
    }
}
