package com.example.demo.entity;


public class Order {

  private long dealPrice;
  private long peopleCount;
  private String telephoneNumber;
  private long itemId;
  private long buyerId;


  public long getDealPrice() {
    return dealPrice;
  }

  public void setDealPrice(long dealPrice) {
    this.dealPrice = dealPrice;
  }


  public long getPeopleCount() {
    return peopleCount;
  }

  public void setPeopleCount(long peopleCount) {
    this.peopleCount = peopleCount;
  }


  public String getTelephoneNumber() {
    return telephoneNumber;
  }

  public void setTelephoneNumber(String telephoneNumber) {
    this.telephoneNumber = telephoneNumber;
  }


  public long getItemId() {
    return itemId;
  }

  public void setItemId(long itemId) {
    this.itemId = itemId;
  }


  public long getBuyerId() {
    return buyerId;
  }

  public void setBuyerId(long buyerId) {
    this.buyerId = buyerId;
  }

}
