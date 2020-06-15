package com.example.demo.util;

public class StringTool {
    public static String changeToBack(String s){
        s = s.replace("%3F", "?").replace("%26", "&").replace("%3D", "=");
        return s;
    }
}
