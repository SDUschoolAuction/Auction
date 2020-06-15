package com.example.demo.dao;

import com.example.demo.entity.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface UserDao {

    @Select("select * from users where `userId` = #{userId}")
    User getUser(int userId);

    @Insert("INSERT INTO users (weChatId,credit,schoolId,telephoneNumber,name,userIcon,location) VALUES(#{weChatId},80,#{schoolId},#{telephoneNumber},#{name},#{userIcon},#{location})")
    void addUser(User user);
}
