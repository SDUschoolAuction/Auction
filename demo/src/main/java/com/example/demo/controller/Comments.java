package com.example.demo.controller;

import com.example.demo.service.commentService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class Comments {
    @Resource
    private  commentService commentService ;
// 删除留言和留言下所有回复
    @GetMapping("/deleteComment")
    public boolean deleteComments( int commentId){
       commentService.deleteComment(commentId);

       return  true;
    }
//删除回复
    @GetMapping("/deleteReviewsForComments")
    public boolean deleteReviews(int reviewId){
        commentService.deleteReview(reviewId);
        return true;
    }
}
