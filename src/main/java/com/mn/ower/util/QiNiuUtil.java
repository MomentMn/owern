package com.mn.ower.util;

import com.google.gson.Gson;
import com.qiniu.common.QiniuException;
import com.qiniu.common.Zone;
import com.qiniu.http.Response;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.UploadManager;
import com.qiniu.storage.model.DefaultPutRet;
import com.qiniu.util.Auth;

public class QiNiuUtil {
	/**
	 * 
	 * @description:远程创建文件
	 * @param sSaveFileName2
	 * @param string
	 * @param string2
	 * @author:王涛
	 * @param item 
	 * @createTime:2017年11月30日 下午3:13:12
	 */
	public static String saveRemoteFile1(String filePath) {
		String qiNiuKey="";
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
        String localFilePath = filePath;
        //默认不指定key的情况下，以文件内容的hash值作为文件名
        String key = null;
        Auth auth = Auth.create(accessKey, secretKey);
        String upToken = auth.uploadToken(bucket);
        try {
            Response response = uploadManager.put(localFilePath, key, upToken);
            //解析上传成功的结果
            DefaultPutRet putRet = new Gson().fromJson(response.bodyString(), DefaultPutRet.class);
          //  System.out.println(putRet.key);
           // System.out.println(putRet.hash);
           qiNiuKey=putRet.key;
           // return putRet;
        } catch (QiniuException ex) {
            Response r = ex.response;
            System.err.println(r.toString());
            try {
                System.err.println(r.bodyString());
            } catch (QiniuException ex2) {
                //ignore
            }
        }
        return qiNiuKey;
    }
}
