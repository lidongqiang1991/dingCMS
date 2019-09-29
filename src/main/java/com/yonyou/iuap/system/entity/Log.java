package com.yonyou.iuap.system.entity;

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
 *  创建日期:2019-7-4
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "log")
@Table(name = "sys_log")
public class Log extends BaseEntity{
	
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "logid")
    private java.lang.String logid;
      
    @Column(name = "orgid")
    private java.lang.String orgid;
      
    @Column(name = "orgname")
    private java.lang.String orgname;
      
    @Column(name = "userid")
    private java.lang.String userid;
      
    @Column(name = "username")
    private java.lang.String username;
      
    @Column(name = "object")
    private java.lang.String object;
      
    @Column(name = "action")
    private java.lang.String action;
      
    @Column(name = "actcontent")
    private java.lang.String actcontent;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
	

	/**
	 * 属性 logid的Getter方法.属性名：主键
	 *  创建日期:2019-7-4
	 * @return java.lang.String
	 */
	public java.lang.String getLogid () {
		return logid;
	}
	   
	/**
	 * 属性logid的Setter方法.属性名：主键
	 * 创建日期:2019-7-4
	 * @param newLogid java.lang.String
	 */
	public void setLogid (java.lang.String newLogid ) {
	 	this.logid = newLogid;
	} 	 
	
	/**
	 * 属性 orgid的Getter方法.属性名：组织id
	 *  创建日期:2019-7-4
	 * @return java.lang.String
	 */
	public java.lang.String getOrgid () {
		return orgid;
	}
	   
	/**
	 * 属性orgid的Setter方法.属性名：组织id
	 * 创建日期:2019-7-4
	 * @param newOrgid java.lang.String
	 */
	public void setOrgid (java.lang.String newOrgid ) {
	 	this.orgid = newOrgid;
	} 	 
	
	/**
	 * 属性 orgname的Getter方法.属性名：组织名称
	 *  创建日期:2019-7-4
	 * @return java.lang.String
	 */
	public java.lang.String getOrgname () {
		return orgname;
	}
	   
	/**
	 * 属性orgname的Setter方法.属性名：组织名称
	 * 创建日期:2019-7-4
	 * @param newOrgname java.lang.String
	 */
	public void setOrgname (java.lang.String newOrgname ) {
	 	this.orgname = newOrgname;
	} 	 
	
	/**
	 * 属性 userid的Getter方法.属性名：用户id
	 *  创建日期:2019-7-4
	 * @return java.lang.String
	 */
	public java.lang.String getUserid () {
		return userid;
	}
	   
	/**
	 * 属性userid的Setter方法.属性名：用户id
	 * 创建日期:2019-7-4
	 * @param newUserid java.lang.String
	 */
	public void setUserid (java.lang.String newUserid ) {
	 	this.userid = newUserid;
	} 	 
	
	/**
	 * 属性 username的Getter方法.属性名：用户名
	 *  创建日期:2019-7-4
	 * @return java.lang.String
	 */
	public java.lang.String getUsername () {
		return username;
	}
	   
	/**
	 * 属性username的Setter方法.属性名：用户名
	 * 创建日期:2019-7-4
	 * @param newUsername java.lang.String
	 */
	public void setUsername (java.lang.String newUsername ) {
	 	this.username = newUsername;
	} 	 
	
	/**
	 * 属性 object的Getter方法.属性名：操作对象
	 *  创建日期:2019-7-4
	 * @return java.lang.String
	 */
	public java.lang.String getObject () {
		return object;
	}
	   
	/**
	 * 属性object的Setter方法.属性名：操作对象
	 * 创建日期:2019-7-4
	 * @param newObject java.lang.String
	 */
	public void setObject (java.lang.String newObject ) {
	 	this.object = newObject;
	} 	 
	
	/**
	 * 属性 action的Getter方法.属性名：操作
	 *  创建日期:2019-7-4
	 * @return java.lang.String
	 */
	public java.lang.String getAction () {
		return action;
	}
	   
	/**
	 * 属性action的Setter方法.属性名：操作
	 * 创建日期:2019-7-4
	 * @param newAction java.lang.String
	 */
	public void setAction (java.lang.String newAction ) {
	 	this.action = newAction;
	} 	 
	
	/**
	 * 属性 actcontent的Getter方法.属性名：操作具体内容
	 *  创建日期:2019-7-4
	 * @return java.lang.String
	 */
	public java.lang.String getActcontent () {
		return actcontent;
	}
	   
	/**
	 * 属性actcontent的Setter方法.属性名：操作具体内容
	 * 创建日期:2019-7-4
	 * @param newActcontent java.lang.String
	 */
	public void setActcontent (java.lang.String newActcontent ) {
	 	this.actcontent = newActcontent;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2019-7-4
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2019-7-4
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2019-7-4
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2019-7-4
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "log";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}