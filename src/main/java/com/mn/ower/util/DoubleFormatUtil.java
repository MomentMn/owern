package com.mn.ower.util;

import java.text.DecimalFormat;

public class DoubleFormatUtil {
	public static final String df_1="#.0";
	public static final String df_2="#.00";
	
	public static String format(Double d ,String format) 
	{  
		if(format == null) {
			format = "#.00";
		}
        DecimalFormat df = new DecimalFormat(format);  
        return df.format(d);
    }  
	/**
	 * 
	 * @description:保留一位小数
	 * @param d
	 * @param format
	 * @return
	 * @author:王涛
	 * @createTime:2018年1月16日 上午10:17:44
	 */
	public static String formatSaveOne(Double d ,String format) 
	{  
		if(format == null) {
			format = "#.0";
		}
        DecimalFormat df = new DecimalFormat(format);  
        return df.format(d);
    }
	
	public static String formatSaveOne(Float d ,String format) 
	{  
		if(format == null) {
			format = "#.000";
		}
        DecimalFormat df = new DecimalFormat(format);  
        return df.format(d);
    }
	/**
	 * 
	 * @description:保留一位小数
	 * @param d
	 * @param format
	 * @return
	 * @author:王涛
	 * @createTime:2018年1月16日 上午10:17:44
	 */
	public static String formatSave3(Double d ,String format) 
	{  
		if(format == null) {
			format = "0.000";
		}
        DecimalFormat df = new DecimalFormat(format);  
        return df.format(d);
    }  
}
