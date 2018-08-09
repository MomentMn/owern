package com.mn.ower.commons;

import java.util.HashMap;

import com.mn.ower.error.ICommonError;

public class BizException extends RuntimeException {
	private static final long serialVersionUID = -3971154969483923295L;

	private int code = 0;
	private String msg = "ok";
	private Object data = new HashMap<String, Object>();

	public BizException() {
	}

	public BizException(int code, String msg) {
		this.code = code;
		this.msg = msg;
	}

	public BizException(int code, String msg, Object data) {
		this.code = code;
		this.msg = msg;
		this.data = data;
	}
	
	public BizException(ICommonError commonError) {
		this.code = commonError.getId();
		this.msg = commonError.getMsg();
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}
}
