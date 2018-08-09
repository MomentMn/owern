package com.mn.ower.commons;

import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.BoundHashOperations;
import org.springframework.data.redis.core.StringRedisTemplate;

import com.alibaba.fastjson.JSON;

/**
 * Created by garychen on 17/11/2.
 */
public class RedisTemplateHelper {

	private final int HALF_HOUR = 60 * 30;		//半小时
	
    public RedisTemplateHelper(StringRedisTemplate template){
        redisTemplate = template;
    }

    public RedisTemplateHelper(){}

    @Autowired
    private StringRedisTemplate redisTemplate;

    public void setRedisTemplate(StringRedisTemplate template){
        redisTemplate = template;
    }

    @SuppressWarnings("unused")
	private StringRedisTemplate getRedisTemplate(){
        return redisTemplate;
    }

    public void setValue(String key,String value,Integer time){
        //redisTemplate.opsForValue().set(key,value);
    	if(time == null) {
    		time = HALF_HOUR;
    	}
        redisTemplate.opsForValue().set(key,value,time, TimeUnit.SECONDS);
    }

    public String getValue(String key){
        return redisTemplate.opsForValue().get(key);
    }
    
    public void setValue(String key,Object value) {
    	String json = JSON.toJSONString(value);
    	setValue(key,json,null);
    }
    
    public void setValueTime(String key,Object value,int time) {
    	String json = JSON.toJSONString(value);
    	setValue(key,json,time);
    }

    public void clearValue(String key){
        redisTemplate.delete(key);
    }
    
	@SuppressWarnings("unchecked")
	public Object getValue(String key,@SuppressWarnings("rawtypes") Class cls) {
    	String json = getValue(key);
    	if(json != null && !"".equals(json)) {
    		if(cls.equals(String.class)) {
    			return json;
    		}
    		return JSON.parseObject(json, cls);
    	}else {
    		return null;
    	}
    }
	
	public void delete(String key) {
		redisTemplate.delete(key);
	}

    /**
     * redis hash operation
     */
    public Long hdel(String key, Object... fields){
        BoundHashOperations<String, String, String> ops = redisTemplate.boundHashOps(key);
        return ops.delete(fields);
    }
    public void hsetnx(String key, String field, String value){
        BoundHashOperations<String, String, String> ops = redisTemplate.boundHashOps(key);
        ops.putIfAbsent(field, value);
    }
    public Map<String, String> hgetAll(String key){
        BoundHashOperations<String, String, String> ops = redisTemplate.boundHashOps(key);
        return ops.entries();
    }
}
