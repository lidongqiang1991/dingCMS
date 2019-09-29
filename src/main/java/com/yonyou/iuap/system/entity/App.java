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
 *  创建日期:2019-5-9
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "App")
@Table(name = "bd_app")
public class App extends BaseEntity{
	
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "id")
    private java.lang.String id;
      
    @Column(name = "appid")
    private java.lang.String appid;
      
    @Column(name = "appkey")
    private java.lang.String appkey;
      
    @Column(name = "appname")
    private java.lang.String appname;
      
    @Column(name = "token")
    private java.lang.String token;
      
    @Column(name = "time")
    private java.lang.Long time;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
	

	/**
	 * 属性 id的Getter方法.属性名：主键
	 *  创建日期:2019-5-9
	 * @return java.lang.String
	 */
	public java.lang.String getId () {
		return id;
	}
	   
	/**
	 * 属性id的Setter方法.属性名：主键
	 * 创建日期:2019-5-9
	 * @param newId java.lang.String
	 */
	public void setId (java.lang.String newId ) {
	 	this.id = newId;
	} 	 
	
	/**
	 * 属性 appid的Getter方法.属性名：客户端id
	 *  创建日期:2019-5-9
	 * @return java.lang.String
	 */
	public java.lang.String getAppid () {
		return appid;
	}
	   
	/**
	 * 属性appid的Setter方法.属性名：客户端id
	 * 创建日期:2019-5-9
	 * @param newAppid java.lang.String
	 */
	public void setAppid (java.lang.String newAppid ) {
	 	this.appid = newAppid;
	} 	 
	
	/**
	 * 属性 appkey的Getter方法.属性名：客户端钥匙
	 *  创建日期:2019-5-9
	 * @return java.lang.String
	 */
	public java.lang.String getAppkey () {
		return appkey;
	}
	   
	/**
	 * 属性appkey的Setter方法.属性名：客户端钥匙
	 * 创建日期:2019-5-9
	 * @param newAppkey java.lang.String
	 */
	public void setAppkey (java.lang.String newAppkey ) {
	 	this.appkey = newAppkey;
	} 	 
	
	/**
	 * 属性 appname的Getter方法.属性名：客户端名称
	 *  创建日期:2019-5-9
	 * @return java.lang.String
	 */
	public java.lang.String getAppname () {
		return appname;
	}
	   
	/**
	 * 属性appname的Setter方法.属性名：客户端名称
	 * 创建日期:2019-5-9
	 * @param newAppname java.lang.String
	 */
	public void setAppname (java.lang.String newAppname ) {
	 	this.appname = newAppname;
	} 	 
	
	/**
	 * 属性 token的Getter方法.属性名：访问令牌
	 *  创建日期:2019-5-9
	 * @return java.lang.String
	 */
	public java.lang.String getToken () {
		return token;
	}
	   
	/**
	 * 属性token的Setter方法.属性名：访问令牌
	 * 创建日期:2019-5-9
	 * @param newToken java.lang.String
	 */
	public void setToken (java.lang.String newToken ) {
	 	this.token = newToken;
	} 	 
	
	/**
	 * 属性 time的Getter方法.属性名：令牌创建时间
	 *  创建日期:2019-5-9
	 * @return java.math.BigInteger
	 */
	public java.lang.Long getTime () {
		return time;
	}
	   
	/**
	 * 属性time的Setter方法.属性名：令牌创建时间
	 * 创建日期:2019-5-9
	 * @param newTime java.math.BigInteger
	 */
	public void setTime (java.lang.Long newTime ) {
	 	this.time = newTime;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2019-5-9
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2019-5-9
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2019-5-9
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2019-5-9
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "App";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}