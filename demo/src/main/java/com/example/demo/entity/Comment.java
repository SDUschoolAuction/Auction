package com.example.demo.entity;

public class Comment {
    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }

    private  int commentId;
    private  int userId;

    public String getTime() {
        return time;
    }

    public Comment(int commentId, int userId, String content, String time) {
        this.commentId = commentId;
        this.userId = userId;
        this.content = content;
        this.time = time;
    }

    public Comment(int commentId, int userId, String content, String time, int itemId) {
        this.commentId = commentId;
        this.userId = userId;
        this.content = content;
        this.time = time;
        this.itemId = itemId;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    private String content ;
    private String time;
    private int itemId;



}
