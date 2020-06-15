package com.example.demo.service.Impl;

import com.example.demo.dao.ItemDao;
import com.example.demo.entity.Item;
import com.example.demo.service.ItemService;
import com.example.demo.util.Msg;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {

    @Resource
    private ItemDao itemDao;

    @Override
    public Msg addItem(Item item) {
        try{
            itemDao.addItem(item);
            System.out.println("ok");
            return Msg.ok("success");
        }catch (Exception e){
            System.out.println(e.toString());
            return Msg.err(e.toString());
        }
    }

    @Override
    public Item getItemById(int itemId) {
        return itemDao.getItemById(itemId);
    }

    @Override
    public Msg updateItem(Item item) {
        try {
            itemDao.updateItem(item);
            return Msg.ok("success");
        }catch (Exception e){
            return Msg.err(e.toString());
        }
    }

    @Override
    public Msg deleteItemById(int itemId) {
        try{
            itemDao.deleteItemById(itemId);
            return Msg.ok("success");
        }catch (Exception e){
            return Msg.err(e.toString());
        }
    }

    @Override
    public List<Item> getItemList() {
        return itemDao.getItemList();
    }
}
