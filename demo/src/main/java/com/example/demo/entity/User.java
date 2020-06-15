package com.example.demo.entity;

/**
 * @program: demo
 * @description: 关于User的实体
 * @author: Yao Yunzhi
 * @create: 2020-06-15 14:46
 **/
public class User {
    private Integer userId;
    private String name;
    private String weChatId;
    private String telephoneNumber;
    private Integer credit;
    private Integer schoolId;
    private String userIcon;
    private String location;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
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

    public Integer getCredit() {
        return credit;
    }

    public void setCredit(Integer credit) {
        this.credit = credit;
    }

    public Integer getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(Integer schoolId) {
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

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", name='" + name + '\'' +
                ", weChatId='" + weChatId + '\'' +
                ", telephoneNumber='" + telephoneNumber + '\'' +
                ", credit=" + credit +
                ", schoolId=" + schoolId +
                ", userIcon='" + userIcon + '\'' +
                ", location='" + location + '\'' +
                '}';
    }
}
