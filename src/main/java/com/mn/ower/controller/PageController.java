package com.mn.ower.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by wentao on 2018/6/15.
 */
@Controller
public class PageController {

//    @GetMapping("/index")
//    public String index(HttpServletRequest request,HttpServletResponse response){
//    	if(LanguageUtil.isCHN(request)) {
//    		return "index_chn";
//    	}
//        return "index";
//    }
//
//    @GetMapping("/teacher")
//    public String teacher(HttpServletRequest request,HttpServletResponse response){
//    	if(LanguageUtil.isCHN(request)) {
//    		return "teacher_chn";
//    	}
//      return "teacher";
//    }
    
    @GetMapping("/baidu")
    public String index_chn(HttpServletRequest request,HttpServletResponse response){
    	System.out.println("你好啊==========================》");
        return "baidu";
    }
//
//    @GetMapping("/chn_teacher")
//    public String teacher_chn(){
//      return "teacher_chn";
//    }


}
