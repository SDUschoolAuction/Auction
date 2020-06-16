package com.example.demo.entity;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class Record {

  private long usersUserid;
  private long itemItemId;

 @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
 @JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
  private Date dealTime;
  private long dealPrice;


  public long getUsersUserid() {
    return usersUserid;
  }

  public void setUsersUserid(long usersUserid) {
    this.usersUserid = usersUserid;
  }


  public long getItemItemId() {
    return itemItemId;
  }

  public void setItemItemId(long itemItemId) {
    this.itemItemId = itemItemId;
  }


  public Date getDealTime() {
    return dealTime;
  }

  public void setDealTime(Date dealTime) {
    this.dealTime = dealTime;
  }


  public long getDealPrice() {
    return dealPrice;
  }

  public void setDealPrice(long dealPrice) {
    this.dealPrice = dealPrice;
  }


  @Override
  public String toString() {
    return "Record{" +
            "users_userId=" + usersUserid +
            ", item_itemId=" + itemItemId +
            ", dealTime=" + dealTime +
            ", dealPrice=" + dealPrice +
            '}';
  }
}
