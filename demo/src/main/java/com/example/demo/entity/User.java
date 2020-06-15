package com.example.demo.entity;

/**
 * @program: demo
 * @description: 关于User的实体
 * @author: Yao Yunzhi
 * @create: 2020-06-15 14:46
 **/
public class User {
    private int userId;
    private String name;
    private String weChatId;
    private String telephoneNumber;
    private int credit;
    private int schoolId;
    private String userIcon;
    private String location;

    public User(int userId, String name, String weChatId, String telephoneNumber, int credit, int schoolId, String userIcon, String location) {
        this.userId = userId;
        this.name = name;
        this.weChatId = weChatId;
        this.telephoneNumber = telephoneNumber;
        this.credit = credit;
        this.schoolId = schoolId;
        this.userIcon = userIcon;
        this.location = location;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getWeChatId() {
        return weChatId;
    }

    public void setWeChatId(String weChatId) {
        this.weChatId = weChatId;
    }

    public String getTelephoneNumber() {
        return telephoneNumber;
    }

    public void setTelephoneNumber(String telephoneNumber) {
        this.telephoneNumber = telephoneNumber;
    }

    public int getCredit() {
        return credit;
    }

    public void setCredit(int credit) {
        this.credit = credit;
    }

    public int getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(int schoolId) {
        this.schoolId = schoolId;
    }

    public String getUserIcon() {
        return userIcon;
    }

    public void setUserIcon(String userIcon) {
        this.userIcon = userIcon;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public User(String name, String weChatId, String telephoneNumber, int credit, int schoolId, String userIcon, String location) {
        this.name = name;
        this.weChatId = weChatId;
        this.telephoneNumber = telephoneNumber;
        this.credit = credit;
        this.schoolId = schoolId;
        this.userIcon = userIcon;
        this.location = location;
    }

}
