package com.example.demo.service.Impl;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.ItemDao;
import com.example.demo.dao.TypeTwoDao;
import com.example.demo.entity.Item;
import com.example.demo.service.TypeService;
import com.example.demo.util.JsonXMLUtils;
import com.example.demo.util.Msg;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;

@Component("2")
public class TypeTwoImpl implements TypeService {

    @Resource
    private TypeTwoDao typeTwoDao;

    @Resource
    private ItemDao itemDao;
    @Override
    public Msg addType(JSONObject jsonObject) {
        try {
            typeTwoDao.addType(jsonObject);
            return Msg.ok("success");
        }catch (Exception e){
            return Msg.err(e.toString());
        }
    }

    @Override
    @Transactional(rollbackFor=Exception.class)
    public Msg addItemType(Map<String, Object> map) throws Exception {
        Item item= JsonXMLUtils.map2obj((Map<String, Object>) map.get("item"),Item.class);
        JSONObject jsonObject= JsonXMLUtils.map2obj((Map<String, Object>) map.get("type"),JSONObject.class);
        item.setStatus(0);
        itemDao.addItem(item);
        jsonObject.put("itemId",item.getItemId());
        typeTwoDao.addType(jsonObject);
        return new Msg<>(0,"success",item);
    }
}
