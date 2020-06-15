package com.example.demo.service.Impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.UserDao;
import com.example.demo.dao.commentDao;
import com.example.demo.entity.Comment;
import com.example.demo.entity.Review;
import com.example.demo.entity.User;
import com.example.demo.service.commentService;
import com.example.demo.util.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class commentServiceImpl implements commentService {
    @Autowired
    commentDao commentDao;

    @Autowired
    UserDao userDao;

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
                User user = userDao.getUser(x.getUserId());
                jsonObject = new JSONObject();
                jsonObject.put("commentId",x.getCommentId());
                jsonObject.put("userId",x.getUserId());
                jsonObject.put("content", x.getContent());
                jsonObject.put("time",x.getTime());
                jsonObject.put("userName",user.getName());
                jsonObject.put("userIcon",user.getUserIcon());
                jsonArray.add(jsonObject);
            }
            jsonObject = new JSONObject();
            jsonObject.put("data", jsonArray);
            return new Msg<>(0,"success",jsonObject);
        }catch(Exception e){
            return Msg.err("fail");
        }
    }

    /**
    * @Description: 获取对应留言的回复
    * @Param: [commentId]
    * @return: com.example.demo.util.Msg
    * @Author: Yao Yunzhi
    * @Date: 2020/6/15
    */
    @Override
    public Msg getReviews(int commentId){
        try{
            List<Review> reviews = commentDao.getReviews(commentId);
            JSONObject jsonObject;
            JSONArray jsonArray = new JSONArray();
            for(Review x: reviews){
                User userfrom = userDao.getUser(x.getFromUser());
                User userto = userDao.getUser(x.getToUser());
                jsonObject = new JSONObject();
                jsonObject.put("reviewId",x.getReviewId());
                jsonObject.put("commentId",x.getCommentId());
                jsonObject.put("fromUser",x.getFromUser());
                jsonObject.put("fromUserName",userfrom.getName());
                jsonObject.put("fromUserIcon",userfrom.getUserIcon());
                jsonObject.put("toUser",x.getToUser());
                jsonObject.put("toUserName",userto.getName());
                jsonObject.put("toUserIcon",userto.getUserIcon());
                jsonObject.put("content",x.getContent());
                jsonObject.put("time",x.getTime());
            }
            jsonObject = new JSONObject();
            jsonObject.put("data", jsonArray);
            return new Msg<>(0,"success",jsonObject);
        }catch(Exception e){
            return Msg.err("fail");
        }
    }

    @Override
    /**
     * @Description:添加留言
     * @Param: [itemId],[userId],[content],[time]
     * @return: com.example.demo.util.Msg
     * @Author: Li Ao
     * @Date: 2020/6/15
     */
    public Msg addComments(int itemId,int userId,String content,String time){
        try {
            commentDao.addComment(itemId,userId,content,time);
            return Msg.ok("success");
        }catch (Exception E){
            return Msg.err("fail");
        }
    }
    @Override
    /**
     * @Description:添加留言回复
     * @Param: [commentId],[content],[time],[fromUser],[toUser]
     * @return: com.example.demo.util.Msg
     * @Author: Li Ao
     * @Date: 2020/6/15
     */
    public Msg addReview(int commentId,String content,String time,int fromUser,int toUser){
        try{
            commentDao.addReview(commentId,content,time,fromUser,toUser);
            return Msg.ok("success");
        }catch (Exception e){
            return Msg.err("fail");
        }

    }


}
