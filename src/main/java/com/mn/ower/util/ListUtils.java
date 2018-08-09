package com.mn.ower.util;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;

public class ListUtils {
	/**
	 * 
	 * @description:集合是否为空
	 * @return
	 * @author:王涛
	 * @createTime:2018年6月19日 下午7:31:16
	 */
	public static boolean isNotEmpty(@SuppressWarnings("rawtypes") List obs){
		if(null!=obs && obs.size()>0){
			return true;
		}
		return false;
	}
	/**
	 * 
	 * @description:给String类型去重，返回的是去重后的个数
	 * @param list
	 * @return
	 * @author:王涛
	 * @createTime:2018年6月28日 下午3:24:06
	 */
	public static Integer distinckList(List<String> list){
		if(list.size()>=2){
			LinkedHashSet<String> set = new LinkedHashSet<String>(list.size());
		    set.addAll(list);
		    list.clear();
		    list.addAll(set);
		}
		return list.size();
	}
	
	public static void main(String[] args) {
		List<String> list=new ArrayList<String>();
		list.add("wangtao");
		list.add("wangtao");
		Integer i=ListUtils.distinckList(list);
		System.out.println(i);
	}
}
