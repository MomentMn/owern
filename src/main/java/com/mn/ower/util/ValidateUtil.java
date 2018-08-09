package com.mn.ower.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import com.mn.ower.commons.BizException;

public abstract class ValidateUtil {
    public static Map<String, String> toMap(BindingResult bindingResult){

        Map<String,String> map = new HashMap<>();
        List<FieldError> errors = bindingResult.getFieldErrors();
        for( FieldError error : errors ){
            map.put(error.getField(),error.getDefaultMessage());
        }
        return map;
    }

    public static void throwBeanValidationException(BindingResult bindingResult, int code){
        //BizException re = new BizException(CommonError.REQUEST_PARAMETER_ERROR);
//        re.setData(ValidateUtil.toMap(bindingResult));
//        throw re;
    }
}
