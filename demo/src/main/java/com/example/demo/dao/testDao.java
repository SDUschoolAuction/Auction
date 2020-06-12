package com.example.demo.dao;

import com.example.demo.entity.test;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface testDao {

    @Select("Select * from TEST;")
    List<test> getTest();
}
