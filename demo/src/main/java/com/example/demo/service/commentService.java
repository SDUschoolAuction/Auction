package com.example.demo.service;

import com.example.demo.util.Msg;

import java.sql.Timestamp;

public interface commentService {

    Msg deleteComment(int commentId);
    Msg deleteReview(int reviewId);
    Msg getComments(int itemId);
    Msg getReviews(int commentId);
    Msg addComments(int itemId, int userId, String content, Timestamp time);
    Msg addReview(int commentId,String content,Timestamp time,int fromUser,int toUser);
    Msg getAllReviews();
}
