package com.example.demo.controller;

import com.example.demo.util.Msg;
import com.qcloud.cos.COSClient;
import com.qcloud.cos.ClientConfig;
import com.qcloud.cos.auth.BasicCOSCredentials;
import com.qcloud.cos.auth.COSCredentials;
import com.qcloud.cos.auth.COSSigner;
import com.qcloud.cos.http.HttpMethodName;
import com.qcloud.cos.model.GeneratePresignedUrlRequest;
import com.qcloud.cos.region.Region;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URL;
import java.util.Date;

/**
 * @program: demo
 * @description: 关于COS的签名获取服务
 * @author: Yao Yunzhi
 * @create: 2020-06-17 11:18
 **/
@RestController
public class COSController {
    // 初始化永久密钥信息
    String secretId = "";
    String secretKey = "";
    COSCredentials cred = new BasicCOSCredentials(secretId, secretKey);
    COSSigner signer = new COSSigner();
    //设置过期时间为1个小时
    Date expiredTime = new Date(System.currentTimeMillis() + 3600L * 1000L);

    @RequestMapping("/uploadFile")
    public Msg upload(){
        // 要签名的 key, 生成的签名只能用于对应此 key 的上传
        String key = "/exampleobject";
        String sign = signer.buildAuthorizationStr(HttpMethodName.PUT, key, cred, expiredTime);
        return Msg.ok("");
    }

}
