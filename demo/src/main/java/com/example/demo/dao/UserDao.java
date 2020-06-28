package com.example.demo.dao;

import com.example.demo.entity.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface UserDao {

    @Select("select * from users where `userId` = #{userId}")
    User getUser(int userId);

    @Select("select * from users where `weChatId`=#{openid}")
    User getUserByWechatId(String openid);

    @Insert("INSERT INTO users (weChatId,credit,schoolId,telephoneNumber,name,userIcon,location) VALUES(#{weChatId},80,#{schoolId},#{telephoneNumber},#{name},#{userIcon},#{location})")
    void addUser(User user);

    @Update("UPDATE users SET location=#{location},telephoneNumber=#{telephoneNumber} WHERE userid=#{userId};")
    void updateUser(User user);
}
