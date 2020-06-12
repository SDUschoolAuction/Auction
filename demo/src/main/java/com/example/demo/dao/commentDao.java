package com.example.demo.dao;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface commentDao {
//        通过commentId删除留言
        @Delete("delete from  review where  review.commentId = #{commentId} ")
        void deleteComment1( @Param("commentId") int commentId);

         @Delete(" delete from comment where comment.commentId = #{commentId}")
         void deleteComment( @Param("commentId") int commentId);

//         删除回复
        @Delete("delete from review where reviewId = #{reviewId}")
         void deleteReview(@Param("reviewId") int reviewId);
}
