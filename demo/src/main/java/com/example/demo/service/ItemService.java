package com.example.demo.service;

import com.example.demo.entity.Item;
import com.example.demo.util.Msg;

import java.util.List;

public interface ItemService {
    Msg addItem(Item item);

    Item getItemById(int itemId);

    Msg updateItem(Item item);

    Msg deleteItemById(int itemId);

    List<Item> getItemList();
}
