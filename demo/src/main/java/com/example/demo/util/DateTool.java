package com.example.demo.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateTool {
    public static String getCurrentTime(){
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return df.format(new Date());
    }

    public static String getLsh(int pid){
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String s = df.format(new Date());
        s = s.replace("-", "").replace(" ", "").replace(":", "");
        s = s + pid;
        return s;
    }

    public static String getMPRLsh(int mrId){
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String s = df.format(new Date());
        s = s.replace("-", "").replace(" ", "").replace(":", "");
        s = s + mrId;
        return s;
    }
}
