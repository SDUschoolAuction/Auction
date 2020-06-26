package com.example.demo.controller;

import com.example.demo.COS.CosStsClient;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.TreeMap;

/**
 * @program: demo
 * @description: 关于COS的签名获取服务
 * @author: Yao Yunzhi
 * @create: 2020-06-17 11:18
 **/
@RestController
public class COSController{
    // 初始化永久密钥信息
    String secretId = "AKIDNK6bsgu5ZkjS9bKAPQHsDI7j7QUMw1aM";
    String secretKey = "77qshKj5A4h38xa8PgjT0UiV3LQDoBTS";
    int duration = 1800;
    String region = "ap-nanjing";
    String bucket = "auction-1300038466";
    TreeMap<String, Object> config = new TreeMap<>();

    /**
     * @Author xu yingliang,Yao Yunzhi
     * @Description 返回上传文件的签名
     * @Date 14:45 2020/6/18
     * @Param [key]  文件名称
     * @return com.example.demo.util.Msg
     **/
    @GetMapping("/uploadFile")
    public String upload(String key){
        config.put("secretId",secretId);
        config.put("secretKey",secretKey);
        config.put("durationSeconds", 1800);
        config.put("bucket", bucket);
        // 换成 bucket 所在地区
        config.put("region", region);
        config.put("allowPrefix", key);
        String[] allowActions = new String[] {
                // 简单上传
                "name/cos:PutObject",
                "name/cos:PostObject",
                // 分片上传
                "name/cos:InitiateMultipartUpload",
                "name/cos:ListMultipartUploads",
                "name/cos:ListParts",
                "name/cos:UploadPart",
                "name/cos:CompleteMultipartUpload"
        };
        config.put("allowActions", allowActions);

        JSONObject credential = null;
        try {
            credential = CosStsClient.getCredential(config);
            System.out.println(credential.toString(4));
        } catch (IOException e) {
            e.printStackTrace();
        }
        // 要签名的 key, 生成的签名只能用于对应此 key 的上传
        return credential.toString(4);
    }

    /**
     * @Author xu yingliang
     * @Description 返回下载需要的签名
     * @Date 14:54 2020/6/18
     * @Param [key]  文件名称
     * @return com.example.demo.util.Msg
     **/
    @GetMapping("downloadFile")
    public String download(String key){
        //String sign = signer.buildAuthorizationStr(HttpMethodName.GET, key, cred, expiredTime);
        return "";
    }

    /**
     * @Author xu yingliang
     * @Description 删除需要的签名
     * @Date 14:55 2020/6/18
     * @Param [key]
     * @return com.example.demo.util.Msg
     **/
    @GetMapping("deleteFile")
    public String deleteFile(String key){
        //String sign = signer.buildAuthorizationStr(HttpMethodName.DELETE, key, cred, expiredTime);
        return "";
    }
}
