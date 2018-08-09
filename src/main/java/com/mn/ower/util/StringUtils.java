package com.mn.ower.util;


public class StringUtils {
	/**
	 * 
	 * @description:title 数组的第二个字段，组成字符串
	 * @param title
	 * @return
	 * @author:王涛
	 * @createTime:2018年7月16日 上午10:53:24
	 */
	public static String setBuildTitle(String title) {
		String[] titles=title.split(" ");
		StringBuilder sb=new StringBuilder();
		for(int i=0;i<titles.length;i++){
			if(i!=1){
				sb.append(titles[i]+" ");
			}
		}
		return sb.toString();
	}
	
	/**
	 * 
	 * @description:获取句号或者问号后面的 字段
	 * @param title
	 * @return
	 * @author:王涛
	 * @createTime:2018年7月16日 下午3:03:14
	 */
	public static String getTeahcerName(String title){
		String str="";
		if(title!=null || !"".equals(title)){
			if(title.lastIndexOf("？")!=-1){
				str=title.substring(title.lastIndexOf("？")+1);
				if(!"".equals(str) || null!=str){
					return str;
				}
			}
			if(title.lastIndexOf("。")!=-1){
				str=title.substring(title.lastIndexOf("。")+1);
				if(!"".equals(str) || null!=str){
					return str;
				}
			}
			if(title.lastIndexOf("?")!=-1){
				str=title.substring(title.lastIndexOf("?")+1);
				if(!"".equals(str) || null!=str){
					return str;
				}
			}
			if(title.lastIndexOf(".")!=-1){
				str=title.substring(title.lastIndexOf(".")+1);
				if(!"".equals(str) || null!=str){
					return str;
				}
			}
		}
		return str;
	}
	/**
	 * 
	 * @description:title进行处理，如果有班级的话，删除掉
	 * @param title
	 * @return
	 * @author:王涛
	 * @createTime:2018年7月17日 下午4:01:52
	 */
	public static String setTitle(String title) {
		String str="";
		StringBuilder sb=new StringBuilder();
		
		String[] arr=title.split(" ");
		if(arr.length>1){
			if(arr[1].contains("班")){
				for(int i=0;i<arr.length;i++){
					if(i==1){
						continue;
					}
					sb.append(arr[i]+" ");
				}
				str=sb.toString().trim();
			}
		}
		if(arr.length==1){
			str=title;
		}
		return str;
	}
	public static void main(String[] args) {
		String str="具有良好的职业道德，有无向家长谋私利。马老师";
		//System.out.println("="+str.lastIndexOf("？"));
		String name=StringUtils.getTeahcerName(str);
		System.out.println(name);
		
		String str1="家长问卷调查表  (2018.2—2018.6)";
		//String str="家长满意度调查表";
		System.out.println(StringUtils.setTitle(str1));
			
	}
}
