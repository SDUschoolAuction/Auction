package com.example.demo.service.Impl;

import com.example.demo.dao.commentDao;
import com.example.demo.service.commentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class commentServiceImpl implements commentService {
    @Resource
     private  commentDao commentDao;


    @Override
    public void deleteComment(int commentId){
        commentDao.deleteComment1(commentId);
        commentDao.deleteComment(commentId);
    }

    @Override
    public void deleteReview(int reviewId) {
        commentDao.deleteReview(reviewId);
    }


}
