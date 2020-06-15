package com.example.demo.dao;

import com.example.demo.entity.Comment;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
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

}
