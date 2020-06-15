package com.example.demo.dao;

import com.example.demo.entity.Comment;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

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

        @Select("select commentId, userId, name userName, userIcon, content, time from comment, user where comment.userId = user.userId and itemId = #{itemId} order by time")
         List<Comment> getComments(@Param("itemId") int itemId);
//         添加留言
        @Insert("insert into comment (itemId,userId,content,time) values (#{itemId},#{userId},#{content},#{time})")
        Integer addComment(@Param("itemId") int itemId,@Param("userId") int userId,@Param("content") String content,@Param("time") String time);
//         添加回复
        @Insert("insert into review (commentId,content,time,fromUser,toUser) values (#{commentId},,#{content},#{time},#{fromUser},#{toUser})")
        Integer addReview(@Param("commentId") int commentId,@Param("content") String content,@Param("time") String time,@Param("fromUser") int fromUser,@Param("toUser") int toUser);


}
