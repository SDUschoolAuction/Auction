package com.example.demo.entity;

import javax.xml.crypto.Data;
import java.util.Date;

public class Item {
    private Integer itemId;
    private Integer sellerId;
    private String itemImg1;
    private String itemImg2;
    private String itemImg3;
    private String itemImg4;
    private String itemInfo;
    private Integer finalPrice;
    private Integer status;
    private String itemLocation;
    private String telephoneNumber;
    private Integer type;

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public Integer getSellerId() {
        return sellerId;
    }

    public void setSellerId(Integer sellerId) {
        this.sellerId = sellerId;
    }

    public String getItemImg1() {
        return itemImg1;
    }

    public void setItemImg1(String itemImg1) {
        this.itemImg1 = itemImg1;
    }

    public String getItemImg2() {
        return itemImg2;
    }

    public void setItemImg2(String itemImg2) {
        this.itemImg2 = itemImg2;
    }

    public String getItemImg3() {
        return itemImg3;
    }

    public void setItemImg3(String itemImg3) {
        this.itemImg3 = itemImg3;
    }

    public String getItemImg4() {
        return itemImg4;
    }

    public void setItemImg4(String itemImg4) {
        this.itemImg4 = itemImg4;
    }

    public String getItemInfo() {
        return itemInfo;
    }

    public void setItemInfo(String itemInfo) {
        this.itemInfo = itemInfo;
    }

    public Integer getFinalPrice() {
        return finalPrice;
    }

    public void setFinalPrice(Integer finalPrice) {
        this.finalPrice = finalPrice;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getItemLocation() {
        return itemLocation;
    }

    public void setItemLocation(String itemLocation) {
        this.itemLocation = itemLocation;
    }

    public String getTelephoneNumber() {
        return telephoneNumber;
    }

    public void setTelephoneNumber(String telephoneNumber) {
        this.telephoneNumber = telephoneNumber;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "Item{" +
                "itemId=" + itemId +
                ", sellerId=" + sellerId +
                ", itemImg1='" + itemImg1 + '\'' +
                ", itemImg2='" + itemImg2 + '\'' +
                ", itemImg3='" + itemImg3 + '\'' +
                ", itemImg4='" + itemImg4 + '\'' +
                ", itemInfo='" + itemInfo + '\'' +
                ", finalPrice=" + finalPrice +
                ", status=" + status +
                ", itemLocation='" + itemLocation + '\'' +
                ", telephoneNumber='" + telephoneNumber + '\'' +
                ", type=" + type +
                '}';
    }
}
