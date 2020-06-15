package com.example.demo.service.Impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.commentDao;
import com.example.demo.entity.Comment;
import com.example.demo.service.commentService;
import com.example.demo.util.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class commentServiceImpl implements commentService {
    @Autowired
     commentDao commentDao;


    @Override
    /**
    * @Description:
    * @Param: [commentId] 删除的留言id
    * @return: com.example.demo.util.Msg
    * @Author: Yao Yunzhi, Xu Yingliang
    * @Date: 2020/6/15
    */
    public Msg deleteComment(int commentId){
        try{
            commentDao.deleteComment1(commentId);
            commentDao.deleteComment(commentId);
            return Msg.ok("success");
        }catch(Exception e){
            return Msg.err("fail");
        }

    }

    @Override

    public Msg deleteReview(int reviewId) {
        try{
            commentDao.deleteReview(reviewId);
            return Msg.ok("success");
        }catch(Exception e){
            return Msg.err("fail");
        }

    }

    @Override
    /**
    * @Description: 获取对商品的留言
    * @Param: [itemId] 商品的id
    * @return: com.example.demo.util.Msg
    * @Author: Yao Yunzhi
    * @Date: 2020/6/15
    */
    public Msg getComments(int itemId) {
        try{
            List<Comment> comments = commentDao.getComments(itemId);
            JSONObject jsonObject;
            JSONArray jsonArray = new JSONArray();
            for (Comment x: comments){
                jsonObject = new JSONObject();
                jsonObject.put("commentId",x.getCommentId());
                jsonObject.put("userId",x.getUserId());
                jsonObject.put("userName",x.getUserName());
                jsonObject.put("userIcon",x.getUserIcon());
                jsonObject.put("content", x.getContent());
                jsonObject.put("time",x.getTime());
                jsonArray.add(jsonObject);
            }
            jsonObject = new JSONObject();
            jsonObject.put("data", jsonArray);
            return new Msg<>(0,"success",jsonObject);
        }catch(Exception e){
            return Msg.err("fail");
        }
    }


}
