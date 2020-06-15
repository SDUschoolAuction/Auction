package com.example.demo.service;

import com.example.demo.util.Msg;

public interface commentService {
    Msg deleteComment(int commentId);
    Msg deleteReview(int reviewId);
    Msg getComments(int itemId);
    Msg getReviews(int commentId);
    Msg addComments(int itemId,int userId,String content,String time);
    Msg addReview(int commentId,String content,String time,int fromUser,int toUser);
}
