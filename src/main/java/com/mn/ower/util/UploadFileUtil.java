package com.mn.ower.util;

import com.google.gson.Gson;
import com.qiniu.common.QiniuException;
import com.qiniu.common.Zone;
import com.qiniu.http.Response;
import com.qiniu.storage.BucketManager;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.UploadManager;
import com.qiniu.storage.model.DefaultPutRet;
import com.qiniu.storage.model.FileInfo;
import com.qiniu.util.Auth;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;

/**
 * 使用平台：https://www.qiniu.com （七牛云存储）
 */
public class UploadFileUtil {

    private static final Logger logger = LoggerFactory.getLogger(PropertyUtil.class);

    /**
     * 数据流上传
     * @param file
     */
    public static DefaultPutRet uploadForInputStream(MultipartFile file){

        //构造一个带指定Zone对象的配置类
        Configuration cfg = new Configuration(Zone.zone0());
        //...其他参数参考类注释
        UploadManager uploadManager = new UploadManager(cfg);
        //...生成上传凭证，然后准备上传
        String accessKey = PropertyUtil.getProperty("qiniu.accessKey");
        String secretKey = PropertyUtil.getProperty("qiniu.secretKey");
        String bucket = PropertyUtil.getProperty("qiniu.bucket");
        String maxsize = PropertyUtil.getProperty("qiniu.maxsize");
        //默认不指定key的情况下，以文件内容的hash值作为文件名
        String key = null;
        try {
            InputStream input = file.getInputStream();
            Integer fileSize = input.available();
            logger.info("---------------------upload fileSize:" + fileSize + ",maxsize:" + maxsize);
            //判断值不能超过最大值
            if (Long.parseLong(maxsize) <= Long.parseLong(fileSize.toString())){
                logger.info("---------------------surpass fileSize");
                return null;
            }
            logger.info("--------------------- create auth ---------------------");
            Auth auth = Auth.create(accessKey, secretKey);
            logger.info("--------------------- upload token ---------------------");
            String upToken = auth.uploadToken(bucket);
            logger.info("--------------------- upToken：" + upToken);
            try {
                logger.info("--------------------- upload start ---------------------");
                Response response = uploadManager.put(input,key,upToken,null, null);
                //解析上传成功的结果
                DefaultPutRet putRet = new Gson().fromJson(response.bodyString(), DefaultPutRet.class);
                System.out.println(putRet.key);
                System.out.println(putRet.hash);
                logger.info("---------------------upload putRet.key:" + putRet.key);
                logger.info("--------------------- upload end ---------------------");
                return putRet;
            } catch (QiniuException ex) {
                Response r = ex.response;
                logger.error("---------------------upload error:" + r.toString());
                try {
                    System.err.println(r.bodyString());
                } catch (QiniuException ex2) {
                    //ignore
                }
            }
        } catch (UnsupportedEncodingException ex) {
            logger.error("---------------------upload error:" + ex.toString());
            //ignore
        } catch (IOException e) {
            logger.error("---------------------upload error:" + e.toString());
            e.printStackTrace();
        }
        logger.info("--------------------- upload end ---------------------");
        return null;
    }
    
    /**
     * 数据流上传
     */
    public static DefaultPutRet uploadInputStream(InputStream input){

        //构造一个带指定Zone对象的配置类
        Configuration cfg = new Configuration(Zone.zone0());
        //...其他参数参考类注释
        UploadManager uploadManager = new UploadManager(cfg);
        //...生成上传凭证，然后准备上传
        String accessKey = PropertyUtil.getProperty("qiniu.accessKey");
        String secretKey = PropertyUtil.getProperty("qiniu.secretKey");
        String bucket = PropertyUtil.getProperty("qiniu.bucket");
        String maxsize = PropertyUtil.getProperty("qiniu.maxsize");
        //默认不指定key的情况下，以文件内容的hash值作为文件名
        String key = null;
        try {
            Integer fileSize = input.available();
            logger.info("---------------------upload fileSize:" + fileSize + ",maxsize:" + maxsize);
            //判断值不能超过最大值
            if (Long.parseLong(maxsize) <= Long.parseLong(fileSize.toString())){
                logger.info("---------------------surpass fileSize");
                return null;
            }
            logger.info("--------------------- create auth ---------------------");
            Auth auth = Auth.create(accessKey, secretKey);
            logger.info("--------------------- upload token ---------------------");
            String upToken = auth.uploadToken(bucket);
            logger.info("--------------------- upToken：" + upToken);
            try {
                logger.info("--------------------- upload start ---------------------");
                Response response = uploadManager.put(input,key,upToken,null, null);
                //解析上传成功的结果
                DefaultPutRet putRet = new Gson().fromJson(response.bodyString(), DefaultPutRet.class);
                System.out.println(putRet.key);
                System.out.println(putRet.hash);
                logger.info("---------------------upload putRet.key:" + putRet.key);
                logger.info("--------------------- upload end ---------------------");
                return putRet;
            } catch (QiniuException ex) {
                Response r = ex.response;
                logger.error("---------------------upload error:" + r.toString());
                try {
                    System.err.println(r.bodyString());
                } catch (QiniuException ex2) {
                    //ignore
                }
            }
        } catch (UnsupportedEncodingException ex) {
            logger.error("---------------------upload error:" + ex.toString());
            //ignore
        } catch (IOException e) {
            logger.error("---------------------upload error:" + e.toString());
            e.printStackTrace();
        }
        logger.info("--------------------- upload end ---------------------");
        return null;
    }

    /**
     * 本地文件上传
     */
    public static DefaultPutRet uploadForLocalFile(){
        //构造一个带指定Zone对象的配置类
        Configuration cfg = new Configuration(Zone.zone0());
        //...其他参数参考类注释
        UploadManager uploadManager = new UploadManager(cfg);
        //...生成上传凭证，然后准备上传
        String accessKey = PropertyUtil.getProperty("qiniu.accessKey");
        String secretKey = PropertyUtil.getProperty("qiniu.secretKey");
        String bucket = PropertyUtil.getProperty("qiniu.bucket");
        //如果是Windows情况下，格式是 D:\\qiniu\\test.png
        //如果是Linux情况下，String localFilePath = "/home/qiniu/test.png";
        String localFilePath = "D:\\test.png";
        //默认不指定key的情况下，以文件内容的hash值作为文件名
        String key = null;
        Auth auth = Auth.create(accessKey, secretKey);
        String upToken = auth.uploadToken(bucket);
        try {
            Response response = uploadManager.put(localFilePath, key, upToken);
            //解析上传成功的结果
            DefaultPutRet putRet = new Gson().fromJson(response.bodyString(), DefaultPutRet.class);
            System.out.println(putRet.key);
            System.out.println(putRet.hash);
            return putRet;
        } catch (QiniuException ex) {
            Response r = ex.response;
            System.err.println(r.toString());
            try {
                System.err.println(r.bodyString());
            } catch (QiniuException ex2) {
                //ignore
            }
        }
        return null;
    }

    /**
     * 获取文件信息，可以作为文件效验
     * hash:文件key
     * fsize:文件大小
     * mimeType:文件类型
     * putTime:上传时间
     */
    public static FileInfo getUploadInfoAndValid(String fileKey){
        //构造一个带指定Zone对象的配置类
        Configuration cfg = new Configuration(Zone.zone0());
        //...生成上传凭证，然后准备上传
        String accessKey = PropertyUtil.getProperty("qiniu.accessKey");
        String secretKey = PropertyUtil.getProperty("qiniu.secretKey");
        String bucket = PropertyUtil.getProperty("qiniu.bucket");
        Auth auth = Auth.create(accessKey, secretKey);
        BucketManager bucketManager = new BucketManager(auth, cfg);
        try {
            FileInfo fileInfo = bucketManager.stat(bucket, fileKey);
            System.out.println(fileInfo.hash);
            System.out.println(fileInfo.fsize);
            System.out.println(fileInfo.mimeType);
            System.out.println(fileInfo.putTime);
            return fileInfo;
        } catch (QiniuException ex) {
            System.err.println(ex.response.toString());
        }
        return null;
    }

}
