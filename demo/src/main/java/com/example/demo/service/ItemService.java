package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Item;
import com.example.demo.util.Msg;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface ItemService {
    Msg addItem(Item item);

    JSONObject getItemById(int itemId);

    Msg updateItem(Item item);

    Msg deleteItemById(int itemId);

    List<JSONObject> getItemList();

    List<Map<String,Object>> search(Item item) throws IOException;
}
