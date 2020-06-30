package com.example.demo.service.Impl;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.ItemDao;
import com.example.demo.entity.Item;
import com.example.demo.service.ItemService;
import com.example.demo.util.Msg;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.TermQueryBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
public class ItemServiceImpl implements ItemService {

    final String itemHead = "itemHead";
    final String itemInfo = "itemInfo";
    final String itemLocation = "itemLocation";
    final String itemTag = "itemTag";
    final String itemState = "itemState";
    @Resource
    private ItemDao itemDao;

    @Autowired
    private RestHighLevelClient restHighLevelClient;

    @Override
    public Msg addItem(Item item) {
        try{
            itemDao.addItem(item);
            return new Msg<>(0,"success",item.getItemId());
        }catch (Exception e){
            System.out.println(e.toString());
            return Msg.err(e.toString());
        }
    }

    @Override
    public JSONObject getItemById(int itemId) {
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
    public List<JSONObject> getItemList() {
        return itemDao.getItemList();
    }


/**
 * @Author xu yingliang
 * @Description 查询的是products索引,可以修改
 * @Date 14:51 2020/6/28
 * @Param [item]
 * @return java.util.List<java.util.Map<java.lang.String,java.lang.Object>>
 **/
    @Override
    public List<Map<String, Object>> search(Item item) throws IOException {
        //此处修改索引名称
        SearchRequest  searchRequest = new SearchRequest("products");

        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        BoolQueryBuilder boolQueryBuilder = this.addFilters(item);



//        TermQueryBuilder termQueryBuilder = QueryBuilders.termQuery("name",keyword);
        searchSourceBuilder.query(boolQueryBuilder);
        searchSourceBuilder.timeout(new TimeValue(60, TimeUnit.SECONDS));

        searchRequest.source(searchSourceBuilder);
        SearchResponse search = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);

        ArrayList<Map<String,Object>> list = new ArrayList<>();

        for (SearchHit hit : search.getHits().getHits()) {
            System.out.println(hit.getSourceAsMap());
            list.add(hit.getSourceAsMap());
        }
        return list;
    }

    @Override
    public List<JSONObject> getItemListCount() {
        return itemDao.getItemListCount();
    }

    private BoolQueryBuilder addFilters(Item item){
        BoolQueryBuilder boolQueryBuilder = new BoolQueryBuilder();

        if(item.getItemHead() != null){
            boolQueryBuilder.filter(QueryBuilders.matchQuery(itemHead,item.getItemHead()));
        }
        if(item.getItemInfo()!= null){
            boolQueryBuilder.filter(QueryBuilders.matchQuery(itemInfo,item.getItemInfo()));
        }
        if(item.getItemLocation()!= null){
            boolQueryBuilder.filter(QueryBuilders.matchQuery(itemLocation,item.getItemLocation()));
        }
        if(item.getItemTag()!= null){
            boolQueryBuilder.filter(QueryBuilders.matchQuery(itemTag,item.getItemTag()));
        }
        return boolQueryBuilder;
    }

}
