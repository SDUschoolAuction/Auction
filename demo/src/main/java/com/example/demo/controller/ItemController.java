package com.example.demo.controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Item;
import com.example.demo.factory.FactoryForTypeService;
import com.example.demo.service.ItemService;
import com.example.demo.util.JsonXMLUtils;
import com.example.demo.util.Msg;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class ItemController {

    @Resource
    private ItemService itemService;

    @Resource
    private FactoryForTypeService factoryForTypeService;


    /**
     * @Description: 添加新的商品
     * @Param: [item]
     * @returns: com.example.demo.entity.Item
     * @Author: Exgc
     * @Date: 2020/6/15 5:31
     * TODO:此处应该处理为商品和拍卖两个表同时进行处理
     */
    @PostMapping("/addItem")
    public Msg addItem(@RequestBody Item item){
        System.out.println(item.toString());
        return itemService.addItem(item);
    }

    /**
     * @Description: 根据商品编号查询商品信息
     * @Param: [itemId]
     * @returns: com.example.demo.entity.Item
     * @Author: Exgc
     * @Date: 2020/6/15 5:29
     */
    @RequestMapping("/getItemById/{itemId}")
    public JSONObject getItemById(@PathVariable int itemId){
        return itemService.getItemById(itemId);
    }

    /**
     * @Description: 更新商品信息
     * @Param: [item]
     * @returns: com.example.demo.entity.Item
     * @Author: Exgc
     * @Date: 2020/6/15 12:35
     */
    @RequestMapping("/updateItem")
    public Msg updateItem(@RequestBody Item item){
        return itemService.updateItem(item);
    }


    /**
     * @Description: 删除对应商品信息
     * @Param: [itemId]
     * @returns: boolean
     * @Author: Exgc
     * @Date: 2020/6/15 20:57
     * 删除后，商品状态切换为2，数据不删除
     */
    @RequestMapping("/deleteItem/{itemId}")
    public Msg deleteItemById(@PathVariable int itemId){
        return itemService.deleteItemById(itemId);
    }


    /**
     * @Description:
     * @Param: []
     * @returns: java.util.List<com.example.demo.entity.Item>
     * @Author: Exgc
     * @Date: 2020/6/16 1:31
     */
    @RequestMapping("/itemList")
    public List<JSONObject> getItemList(){
        return itemService.getItemList();
    }


    /**
     * @Description: 同时传入Item和Type，key代表Type的种类，1代表Type1拍卖，不传itemId
     * @Param: [key, map]
     * {
     * 	"item":{
     * 		"itemInfo":"测试的数据，这里是信息的详细信息",
     * 		"finalPrice":13,
     * 		"itemLocation":"山东省济南市",
     * 		"itemImg1":"https://img.alicdn.com/imgextra/i1/27907426/O1CN01n3DQLu24j9jYKjK7n_!!0-saturn_solar.jpg_260x260.jpg",
     * 		"telephoneNumber":"15665825816",
     * 		"sellerId":1,
     * 		"type":1
     * 	},
     * 	"type":{
     * 		"startPrice":13,
     * 		"markupRange":1,
     * 		"startTime":"2020-07-01 16:50:00",
     * 		"endTime":"2020-09-09 00:00:00"
     * 	}
     * }
     * @returns: com.example.demo.util.Msg
     * @Author: Exgc
     * @Date: 2020/6/24 22:32
     */
    @RequestMapping("/addItemType/{key}")
    public Msg addItemType(@PathVariable String key,@RequestBody Map<String,Object> map){
        try{
            return factoryForTypeService.getTypeService(key).addItemType(map);
        }catch (Exception e){
            return Msg.err(e.toString());
        }
    }

    /**
     * @Author xu yingliang
     * @Description
     * @Date 16:58 2020/6/28
     * @Param [item] 传入item,用于筛选的条件有item.itemhead,item.info(查询的关键字),item.location,item.tag
     * @return java.util.List<java.util.Map<java.lang.String,java.lang.Object>>
     **/
    @RequestMapping(value = "/search")
    public List<Map<String,Object>> selectItem(
                                               @RequestBody Item item) throws IOException {
        System.out.println(item.getItemInfo());
        return  itemService.search(item);

    }

    @RequestMapping("/getItemListCount")
    public List<JSONObject> getItemListCount(){
        return itemService.getItemListCount();
    }



}
