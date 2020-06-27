package com.example.demo.service.Impl;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.ItemDao;
import com.example.demo.dao.TypeOneDao;
import com.example.demo.entity.Item;
import com.example.demo.service.TypeService;
import com.example.demo.util.JsonXMLUtils;
import com.example.demo.util.Msg;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;

@Component("1")
public class TypeOneImpl implements TypeService {

    @Resource
    private TypeOneDao typeOneDao;

    @Resource
    private ItemDao itemDao;

    @Override
    public Msg addType(JSONObject jsonObject) {
        try{
            typeOneDao.addType(jsonObject);
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
        itemDao.addItem(item);
        jsonObject.put("itemId",item.getItemId());
        typeOneDao.addType(jsonObject);
        return new Msg<>(0,"success",item.getItemId());
    }

    @Override
    public Msg updateItemType(Map<String, Object> map) throws Exception {
        Item item= JsonXMLUtils.map2obj((Map<String, Object>) map.get("item"),Item.class);
        JSONObject jsonObject= JsonXMLUtils.map2obj((Map<String, Object>) map.get("type"),JSONObject.class);
        itemDao.updateItem(item);
        jsonObject.put("itemId",item.getItemId());
        typeOneDao.updateType(jsonObject);
        return new Msg<>(0,"success",item.getItemId());
    }
}
