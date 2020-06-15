package com.example.demo.entity;


public class Type2 implements Type{
    private Integer itemId;
    private Integer itemPrice;

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public Integer getItemPrice() {
        return itemPrice;
    }

    public void setItemPrice(Integer itemPrice) {
        this.itemPrice = itemPrice;
    }

    @Override
    public String toString() {
        return "Type2{" +
                "itemId=" + itemId +
                ", itemPrice=" + itemPrice +
                '}';
    }
}
