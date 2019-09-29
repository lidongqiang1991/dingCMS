package com.ding.cms.entity;

import com.yonyou.iuap.persistence.jdbc.framework.annotation.Column;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.Entity;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.GeneratedValue;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.Id;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.FK;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.OneToMany;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.Stragegy;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.Table;
import com.yonyou.iuap.persistence.vo.BaseEntity;


/**
 * <b> 此处简要描述此类功能 </b>
 * <p>
 *   此处添加类的描述信息
 * </p>
 *  创建日期:2019-6-20
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "LogUser")
@Table(name = "log_user")
public class LogUser extends BaseEntity{
	
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "logid")
    private java.lang.String logid;
      
    @Column(name = "userid")
    private java.lang.String userid;
      
    @Column(name = "username")
    private java.lang.String username;
      
    @Column(name = "role")
    private java.lang.String role;
      
    @Column(name = "memo")
    private java.lang.String memo;
      
    @Column(name = "memotype")
    private java.lang.String memotype;
      
    @Column(name = "createorid")
    private java.lang.String createorid;
      
    @Column(name = "createname")
    private java.lang.String createname;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
	

	/**
	 * 属性 logid的Getter方法.属性名：主键
	 *  创建日期:2019-6-20
	 * @return java.lang.String
	 */
	public java.lang.String getLogid () {
		return logid;
	}
	   
	/**
	 * 属性logid的Setter方法.属性名：主键
	 * 创建日期:2019-6-20
	 * @param newLogid java.lang.String
	 */
	public void setLogid (java.lang.String newLogid ) {
	 	this.logid = newLogid;
	} 	 
	
	/**
	 * 属性 userid的Getter方法.属性名：被操作用户主键
	 *  创建日期:2019-6-20
	 * @return java.lang.String
	 */
	public java.lang.String getUserid () {
		return userid;
	}
	   
	/**
	 * 属性userid的Setter方法.属性名：被操作用户主键
	 * 创建日期:2019-6-20
	 * @param newUserid java.lang.String
	 */
	public void setUserid (java.lang.String newUserid ) {
	 	this.userid = newUserid;
	} 	 
	
	/**
	 * 属性 username的Getter方法.属性名：被操作人姓名
	 *  创建日期:2019-6-20
	 * @return java.lang.String
	 */
	public java.lang.String getUsername () {
		return username;
	}
	   
	/**
	 * 属性username的Setter方法.属性名：被操作人姓名
	 * 创建日期:2019-6-20
	 * @param newUsername java.lang.String
	 */
	public void setUsername (java.lang.String newUsername ) {
	 	this.username = newUsername;
	} 	 
	
	/**
	 * 属性 role的Getter方法.属性名：被操作人角色
	 *  创建日期:2019-6-20
	 * @return java.lang.String
	 */
	public java.lang.String getRole () {
		return role;
	}
	   
	/**
	 * 属性role的Setter方法.属性名：被操作人角色
	 * 创建日期:2019-6-20
	 * @param newRole java.lang.String
	 */
	public void setRole (java.lang.String newRole ) {
	 	this.role = newRole;
	} 	 
	
	/**
	 * 属性 memo的Getter方法.属性名：操作原因
	 *  创建日期:2019-6-20
	 * @return java.lang.String
	 */
	public java.lang.String getMemo () {
		return memo;
	}
	   
	/**
	 * 属性memo的Setter方法.属性名：操作原因
	 * 创建日期:2019-6-20
	 * @param newMemo java.lang.String
	 */
	public void setMemo (java.lang.String newMemo ) {
	 	this.memo = newMemo;
	} 	 
	
	/**
	 * 属性 memotype的Getter方法.属性名：原因类型
	 *  创建日期:2019-6-20
	 * @return java.lang.String
	 */
	public java.lang.String getMemotype () {
		return memotype;
	}
	   
	/**
	 * 属性memotype的Setter方法.属性名：原因类型
	 * 创建日期:2019-6-20
	 * @param newMemotype java.lang.String
	 */
	public void setMemotype (java.lang.String newMemotype ) {
	 	this.memotype = newMemotype;
	} 	 
	
	/**
	 * 属性 createorid的Getter方法.属性名：操作人
	 *  创建日期:2019-6-20
	 * @return java.lang.String
	 */
	public java.lang.String getCreateorid () {
		return createorid;
	}
	   
	/**
	 * 属性createorid的Setter方法.属性名：操作人
	 * 创建日期:2019-6-20
	 * @param newCreateorid java.lang.String
	 */
	public void setCreateorid (java.lang.String newCreateorid ) {
	 	this.createorid = newCreateorid;
	} 	 
	
	/**
	 * 属性 createname的Getter方法.属性名：操作人姓名
	 *  创建日期:2019-6-20
	 * @return java.lang.String
	 */
	public java.lang.String getCreatename () {
		return createname;
	}
	   
	/**
	 * 属性createname的Setter方法.属性名：操作人姓名
	 * 创建日期:2019-6-20
	 * @param newCreatename java.lang.String
	 */
	public void setCreatename (java.lang.String newCreatename ) {
	 	this.createname = newCreatename;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2019-6-20
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2019-6-20
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2019-6-20
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2019-6-20
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "LogUser";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}