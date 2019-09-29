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
 *  创建日期:2018-10-23
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "Formb")
@Table(name = "sys_form_b")
public class Formb extends BaseEntity{
	 
    @FK(name = "fk_id_formb", referenceTableName = "sys_form", referencedColumnName = "formid") 
    @Column(name = "fk_id_formb")
    private java.lang.String fk_id_formb;
    
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "formbid")
    private java.lang.String formbid;
      
    @Column(name = "formid")
    private java.lang.String formid;
      
    @Column(name = "displayname")
    private java.lang.String displayname;
      
    @Column(name = "attribute")
    private java.lang.String attribute;
      
    @Column(name = "type")
    private java.lang.String type;
      
    @Column(name = "memo")
    private java.lang.String memo;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
	

	/**
	 * 属性 fk_id_formb的Getter方法.属性名：parentPK
	 *  创建日期:2018-10-23
	 * @return java.lang.String
	 */
	public java.lang.String getFk_id_formb () {
		return fk_id_formb;
	}
	   
	/**
	 * 属性fk_id_formb的Setter方法.属性名：parentPK
	 * 创建日期:2018-10-23
	 * @param newFk_id_formb java.lang.String
	 */
	public void setFk_id_formb (java.lang.String newFk_id_formb ) {
	 	this.fk_id_formb = newFk_id_formb;
	} 	 
	
	/**
	 * 属性 formbid的Getter方法.属性名：子表主键
	 *  创建日期:2018-10-23
	 * @return java.lang.String
	 */
	public java.lang.String getFormbid () {
		return formbid;
	}
	   
	/**
	 * 属性formbid的Setter方法.属性名：子表主键
	 * 创建日期:2018-10-23
	 * @param newFormbid java.lang.String
	 */
	public void setFormbid (java.lang.String newFormbid ) {
	 	this.formbid = newFormbid;
	} 	 
	
	/**
	 * 属性 formid的Getter方法.属性名：主表主键
	 *  创建日期:2018-10-23
	 * @return java.lang.String
	 */
	public java.lang.String getFormid () {
		return formid;
	}
	   
	/**
	 * 属性formid的Setter方法.属性名：主表主键
	 * 创建日期:2018-10-23
	 * @param newFormid java.lang.String
	 */
	public void setFormid (java.lang.String newFormid ) {
	 	this.formid = newFormid;
	} 	 
	
	/**
	 * 属性 displayname的Getter方法.属性名：显示名称
	 *  创建日期:2018-10-23
	 * @return java.lang.String
	 */
	public java.lang.String getDisplayname () {
		return displayname;
	}
	   
	/**
	 * 属性displayname的Setter方法.属性名：显示名称
	 * 创建日期:2018-10-23
	 * @param newDisplayname java.lang.String
	 */
	public void setDisplayname (java.lang.String newDisplayname ) {
	 	this.displayname = newDisplayname;
	} 	 
	
	/**
	 * 属性 attribute的Getter方法.属性名：属性编码
	 *  创建日期:2018-10-23
	 * @return java.lang.String
	 */
	public java.lang.String getAttribute () {
		return attribute;
	}
	   
	/**
	 * 属性attribute的Setter方法.属性名：属性编码
	 * 创建日期:2018-10-23
	 * @param newAttribute java.lang.String
	 */
	public void setAttribute (java.lang.String newAttribute ) {
	 	this.attribute = newAttribute;
	} 	 
	
	/**
	 * 属性 type的Getter方法.属性名：类型
	 *  创建日期:2018-10-23
	 * @return java.lang.String
	 */
	public java.lang.String getType () {
		return type;
	}
	   
	/**
	 * 属性type的Setter方法.属性名：类型
	 * 创建日期:2018-10-23
	 * @param newType java.lang.String
	 */
	public void setType (java.lang.String newType ) {
	 	this.type = newType;
	} 	 
	
	/**
	 * 属性 memo的Getter方法.属性名：备注
	 *  创建日期:2018-10-23
	 * @return java.lang.String
	 */
	public java.lang.String getMemo () {
		return memo;
	}
	   
	/**
	 * 属性memo的Setter方法.属性名：备注
	 * 创建日期:2018-10-23
	 * @param newMemo java.lang.String
	 */
	public void setMemo (java.lang.String newMemo ) {
	 	this.memo = newMemo;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2018-10-23
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2018-10-23
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2018-10-23
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2018-10-23
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "Formb";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}