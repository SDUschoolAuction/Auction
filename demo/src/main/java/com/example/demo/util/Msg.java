package com.example.demo.util;

import java.io.Serializable;


public class Msg<T> implements Serializable{

    private int code = -1;


    private String status = null;

    private T obj = null;
    public Msg(){}

    public Msg(int code, String status, T obj) {
        this.code = code;
        this.status = status;
        this.obj = obj;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public T getObj() {
        return obj;
    }

    public void setObj(T obj) {
        this.obj = obj;
    }

    public static Msg ok(String msg){
        return new Msg<>(0, msg, null);
    }

    public static Msg ok(String msg, Object obj){
        return new Msg<>(0, msg, obj);
    }

    public static Msg err(String msg){
        return new Msg<>(-1, msg, null);
    }

    public static Msg err(String msg, Object obj){
        return new Msg<>(-1, msg, obj);
    }

    public static Msg err(int code, String msg, Object obj) {
        return new Msg<>(code, msg, obj);
    }
}
