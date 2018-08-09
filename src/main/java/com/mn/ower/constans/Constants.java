package com.mn.ower.constans;

/**
 * @version 1.0
 * @description:redis中的缓存key，的字符串拼接
 * @projectName:common-redis
 * @className:Constants.java
 * @author:衷文涛
 * @createTime:2018年3月9日 下午2:03:01
 */
public class Constants {
    public final static String USER_LOGIN_ = "user_login_";

    public final static int TEN_MINUTES = 60 * 10;        //10分钟

    public final static int HALF_HOUR = 60 * 30;        // 半小时

    public final static int TWO_HOUR = 60 * 60 * 2;    //两小时

    public final static int ONE_DAY = 60 * 60 * 24;    //一天

    public final static int ONE_MONTH = 60 * 60 * 24 * 30;    //一月
    /**
     * 删除的pdf 临时存放地址
     */
    public final static String UPLOAD_PDF = "uploadfile/pdf";


    public static String PRE_TITLE = " Appraisal";
    public static String PRE_NAME = "Name：";
    public static String PRE_LEVEL = "Job Level: ";
    // 最后评估时间
    public static String PRE_LASTAPPRAISAL = "Period of Appraial: ";
    // 升职
    public static String PROMOTION = "promoted to %s on %s";

    public static String getPreTitle() {
        return PRE_TITLE;
    }

    public static void setPreTitle(String preTitle) {
        PRE_TITLE = preTitle;
    }

    public static String getPreName() {
        return PRE_NAME;
    }

    public static void setPreName(String preName) {
        PRE_NAME = preName;
    }

    public static String getPreLevel() {
        return PRE_LEVEL;
    }

    public static void setPreLevel(String preLevel) {
        PRE_LEVEL = preLevel;
    }

    public static String getPreLastappraisal() {
        return PRE_LASTAPPRAISAL;
    }

    public static void setPreLastappraisal(String preLastappraisal) {
        PRE_LASTAPPRAISAL = preLastappraisal;
    }

    public static String getPROMOTION() {
        return PROMOTION;
    }

    public static void setPROMOTION(String PROMOTION) {
        Constants.PROMOTION = PROMOTION;
    }
}
