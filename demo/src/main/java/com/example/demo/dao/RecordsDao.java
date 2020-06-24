package com.example.demo.dao;

import com.example.demo.entity.Record;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
@Mapper
public interface RecordsDao {

    @Select("SELECT * from records\n" +
            "\twhere itemId=#{itemId}\n" +
            "\torder by dealPrice desc;")
    List<Record> getRecordsByItemId(int itemId);
}
