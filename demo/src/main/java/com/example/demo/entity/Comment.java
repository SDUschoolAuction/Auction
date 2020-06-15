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

    private String userName ;
    private String userIcon;

    public String getUserName() {
        return userName;
    }

    public Comment(int commentId, int userId, String content, String time, String userName, String userIcon) {
        this.commentId = commentId;
        this.userId = userId;
        this.content = content;
        this.time = time;
        this.userName = userName;
        this.userIcon = userIcon;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserIcon() {
        return userIcon;
    }

    public void setUserIcon(String userIcon) {
        this.userIcon = userIcon;
    }
}
