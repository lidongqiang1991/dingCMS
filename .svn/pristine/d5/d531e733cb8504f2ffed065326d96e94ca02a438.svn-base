package com.yonyou.iuap.system.entity;

import java.util.List;

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
 *  创建日期:2018-11-26
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "FunregisterVO")
@Table(name = "sys_funregister")
public class FunregisterVO extends BaseEntity{
	
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "id")
    private java.lang.String id;
      
    @Column(name = "funname")
    private java.lang.String funname;
      
    @Column(name = "funcode")
    private java.lang.String funcode;
      
    @Column(name = "furl")
    private java.lang.String furl;
      
    @Column(name = "parentid")
    private java.lang.String parentid;
      
    @Column(name = "funtype")
    private java.lang.Integer funtype;
      
    @Column(name = "createdate")
    private java.util.Date createdate;
      
    @Column(name = "funicon")
    private java.lang.String funicon;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
    private List<FunregisterVO> funChild;


    public List<FunregisterVO> getFunChild() {
    	return funChild;
    }

    public void setFunChild(List<FunregisterVO> funChild) {
    	this.funChild = funChild;
    }
	

	/**
	 * 属性 id的Getter方法.属性名：主键
	 *  创建日期:2018-11-26
	 * @return java.lang.String
	 */
	public java.lang.String getId () {
		return id;
	}
	   
	/**
	 * 属性id的Setter方法.属性名：主键
	 * 创建日期:2018-11-26
	 * @param newId java.lang.String
	 */
	public void setId (java.lang.String newId ) {
	 	this.id = newId;
	} 	 
	
	/**
	 * 属性 funname的Getter方法.属性名：功能名称
	 *  创建日期:2018-11-26
	 * @return java.lang.String
	 */
	public java.lang.String getFunname () {
		return funname;
	}
	   
	/**
	 * 属性funname的Setter方法.属性名：功能名称
	 * 创建日期:2018-11-26
	 * @param newFunname java.lang.String
	 */
	public void setFunname (java.lang.String newFunname ) {
	 	this.funname = newFunname;
	} 	 
	
	/**
	 * 属性 funcode的Getter方法.属性名：功能编码
	 *  创建日期:2018-11-26
	 * @return java.lang.String
	 */
	public java.lang.String getFuncode () {
		return funcode;
	}
	   
	/**
	 * 属性funcode的Setter方法.属性名：功能编码
	 * 创建日期:2018-11-26
	 * @param newFuncode java.lang.String
	 */
	public void setFuncode (java.lang.String newFuncode ) {
	 	this.funcode = newFuncode;
	} 	 
	
	/**
	 * 属性 furl的Getter方法.属性名：地址
	 *  创建日期:2018-11-26
	 * @return java.lang.String
	 */
	public java.lang.String getFurl () {
		return furl;
	}
	   
	/**
	 * 属性furl的Setter方法.属性名：地址
	 * 创建日期:2018-11-26
	 * @param newFurl java.lang.String
	 */
	public void setFurl (java.lang.String newFurl ) {
	 	this.furl = newFurl;
	} 	 
	
	/**
	 * 属性 parentid的Getter方法.属性名：上级id
	 *  创建日期:2018-11-26
	 * @return java.lang.String
	 */
	public java.lang.String getParentid () {
		return parentid;
	}
	   
	/**
	 * 属性parentid的Setter方法.属性名：上级id
	 * 创建日期:2018-11-26
	 * @param newParentid java.lang.String
	 */
	public void setParentid (java.lang.String newParentid ) {
	 	this.parentid = newParentid;
	} 	 
	
	/**
	 * 属性 funtype的Getter方法.属性名：功能类型
	 *  创建日期:2018-11-26
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getFuntype () {
		return funtype;
	}
	   
	/**
	 * 属性funtype的Setter方法.属性名：功能类型
	 * 创建日期:2018-11-26
	 * @param newFuntype java.lang.Integer
	 */
	public void setFuntype (java.lang.Integer newFuntype ) {
	 	this.funtype = newFuntype;
	} 	 
	
	/**
	 * 属性 createdate的Getter方法.属性名：创建时间
	 *  创建日期:2018-11-26
	 * @return java.util.Date
	 */
	public java.util.Date getCreatedate () {
		return createdate;
	}
	   
	/**
	 * 属性createdate的Setter方法.属性名：创建时间
	 * 创建日期:2018-11-26
	 * @param newCreatedate java.util.Date
	 */
	public void setCreatedate (java.util.Date newCreatedate ) {
	 	this.createdate = newCreatedate;
	} 	 
	
	/**
	 * 属性 funicon的Getter方法.属性名：图标
	 *  创建日期:2018-11-26
	 * @return java.lang.String
	 */
	public java.lang.String getFunicon () {
		return funicon;
	}
	   
	/**
	 * 属性funicon的Setter方法.属性名：图标
	 * 创建日期:2018-11-26
	 * @param newFunicon java.lang.String
	 */
	public void setFunicon (java.lang.String newFunicon ) {
	 	this.funicon = newFunicon;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2018-11-26
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2018-11-26
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2018-11-26
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2018-11-26
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "FunregisterVO";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}