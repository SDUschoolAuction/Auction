package com.example.demo.factory;


import com.example.demo.service.TypeService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class FactoryForTypeService {

    @Resource
    Map<String, TypeService> typeServiceMap=new ConcurrentHashMap<>();

    public TypeService getTypeService(String component){
        TypeService typeService=typeServiceMap.get(component);
        if (typeService==null){
            throw new RuntimeException("no type defined");
        }
        return typeService;
    }
}
