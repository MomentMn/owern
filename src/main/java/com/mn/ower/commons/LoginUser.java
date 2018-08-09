package com.mn.ower.commons;

import java.io.Serializable;

public class LoginUser implements Serializable{

	private static final long serialVersionUID = 1L;
	/**
	 *  用户id
	 */
	private Integer id;
	/**
	 *  老师id
	 */
	private Integer teacherId;
	private String name;
	private Integer centerId ;
	// roleType 角色是老师还是老师
	private String  roleType ;
	// 语言
	private String language;

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public Integer getCenterId() {
		return centerId;
	}

	public void setCenterId(Integer centerId) {
		this.centerId = centerId;
	}


	public String getRoleType() {
		return roleType;
	}

	public void setRoleType(String roleType) {
		this.roleType = roleType;
	}

	public Integer getTeacherId() {
		return teacherId;
	}

	public void setTeacherId(Integer teacherId) {
		this.teacherId = teacherId;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}


}
