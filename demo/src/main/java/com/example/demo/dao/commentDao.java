package com.example.demo.dao;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Comment;
import com.example.demo.entity.Review;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Mapper
@Repository
public interface commentDao {

//        通过commentId删除留言

    @Delete("delete from  review where  review.commentId = #{commentId} ")
    Integer deleteComment1( @Param("commentId") int commentId);

    @Delete(" delete from comment where comment.commentId = #{commentId}")
    Integer deleteComment( @Param("commentId") int commentId);

//         删除回复
    @Delete("delete from review where reviewId = #{reviewId}")
    Integer deleteReview(@Param("reviewId") int reviewId);

    @Select("select * from comment where `itemId` = #{itemId} order by time")
    List<Comment> getComments(@Param("itemId") int itemId);

    @Select("select * from review where `commentId` = #{commentId} order by time")
    List<Review> getReviews(@Param("commentId") int commentId);

//         添加留言
    @Insert("insert into comment (itemId,userId,content,time) values (#{itemId},#{userId},#{content},#{time})")
    Integer addComment(@Param("itemId") int itemId,@Param("userId") int userId,@Param("content") String content,@Param("time") Timestamp time);
//         添加回复
    @Insert("insert into review (commentId,content,time,fromUser,toUser) values (#{commentId},#{content},#{time},#{fromUser},#{toUser})")
    Integer addReview(@Param("commentId") int commentId,@Param("content") String content,@Param("time") Timestamp time,@Param("fromUser") int fromUser,@Param("toUser") int toUser);

    @Select("Select reviewId,commentId,content,`time`,fromUser,toUser,user1.name fromUserName,user2.name toUserName,user1.userIcon fromUserIcon,user2.userIcon toUserIcon\n" +
            "\tfrom review,users user1,users user2 \n" +
            "\twhere user1.userid=review.fromUser and user2.userid=review.toUser;")
    List<JSONObject> getAllReviews();


    @Select("select users.userid user_id,itemId item_Id,commentId id,name,content text,userIcon url,time\n" +
            "\tfrom users,comment\n" +
            "\twhere users.userid=comment.userId and itemId=#{itemId};")
    List<JSONObject> getCommentsByItemId(int itemId);

    @Select("select user1.name name,user1.userid fromUserId,user2.name target,user2.userid toUserId,content text,commentId father,time,reviewId id\n" +
            "\tfrom users user1,users user2,review\n" +
            "\twhere user1.userid=review.fromUser and user2.userid=review.toUser and commentId=#{commentId};")
    List<JSONObject> getReviewsByCommentId(Integer commentId);
}
