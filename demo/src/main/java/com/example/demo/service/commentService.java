package com.example.demo.service;

import com.example.demo.util.Msg;

public interface commentService {
    Msg deleteComment(int commentId);
    Msg deleteReview(int reviewId);
    Msg getComments(int itemId);
}
