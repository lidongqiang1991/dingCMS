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
 *  创建日期:2018-10-24
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "formValue")
@Table(name = "sys_form_value")
public class FormValue extends BaseEntity{
	
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "id")
    private java.lang.String id;
      
    @Column(name = "formid")
    private java.lang.String formid;
      
    @Column(name = "formbid")
    private java.lang.String formbid;
      
    @Column(name = "sid")
    private java.lang.String sid;
      
    @Column(name = "value")
    private java.lang.String value;
      
    @Column(name = "creator")
    private java.lang.String creator;
      
    @Column(name = "creatorid")
    private java.lang.String creatorid;
      
    @Column(name = "createtime")
    private java.lang.String createtime;
      
    @Column(name = "modifier")
    private java.lang.String modifier;
      
    @Column(name = "modifierid")
    private java.lang.String modifierid;
      
    @Column(name = "modifytime")
    private java.lang.String modifytime;
      
    @Column(name = "orgname")
    private java.lang.String orgname;
      
    @Column(name = "orgid")
    private java.lang.String orgid;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
	

	/**
	 * 属性 id的Getter方法.属性名：主键
	 *  创建日期:2018-10-24
	 * @return java.lang.String
	 */
	public java.lang.String getId () {
		return id;
	}
	   
	/**
	 * 属性id的Setter方法.属性名：主键
	 * 创建日期:2018-10-24
	 * @param newId java.lang.String
	 */
	public void setId (java.lang.String newId ) {
	 	this.id = newId;
	} 	 
	
	/**
	 * 属性 formid的Getter方法.属性名：表单主表主键
	 *  创建日期:2018-10-24
	 * @return java.lang.String
	 */
	public java.lang.String getFormid () {
		return formid;
	}
	   
	/**
	 * 属性formid的Setter方法.属性名：表单主表主键
	 * 创建日期:2018-10-24
	 * @param newFormid java.lang.String
	 */
	public void setFormid (java.lang.String newFormid ) {
	 	this.formid = newFormid;
	} 	 
	
	/**
	 * 属性 formbid的Getter方法.属性名：表单子表主键
	 *  创建日期:2018-10-24
	 * @return java.lang.String
	 */
	public java.lang.String getFormbid () {
		return formbid;
	}
	   
	/**
	 * 属性formbid的Setter方法.属性名：表单子表主键
	 * 创建日期:2018-10-24
	 * @param newFormbid java.lang.String
	 */
	public void setFormbid (java.lang.String newFormbid ) {
	 	this.formbid = newFormbid;
	} 	 
	
	/**
	 * 属性 sid的Getter方法.属性名：来源主键
	 *  创建日期:2018-10-24
	 * @return java.lang.String
	 */
	public java.lang.String getSid () {
		return sid;
	}
	   
	/**
	 * 属性sid的Setter方法.属性名：来源主键
	 * 创建日期:2018-10-24
	 * @param newSid java.lang.String
	 */
	public void setSid (java.lang.String newSid ) {
	 	this.sid = newSid;
	} 	 
	
	/**
	 * 属性 value的Getter方法.属性名：字段值
	 *  创建日期:2018-10-24
	 * @return java.lang.String
	 */
	public java.lang.String getValue () {
		return value;
	}
	   
	/**
	 * 属性value的Setter方法.属性名：字段值
	 * 创建日期:2018-10-24
	 * @param newValue java.lang.String
	 */
	public void setValue (java.lang.String newValue ) {
	 	this.value = newValue;
	} 	 
	
	/**
	 * 属性 creator的Getter方法.属性名：创建人
	 *  创建日期:2018-10-24
	 * @return java.lang.String
	 */
	public java.lang.String getCreator () {
		return creator;
	}
	   
	/**
	 * 属性creator的Setter方法.属性名：创建人
	 * 创建日期:2018-10-24
	 * @param newCreator java.lang.String
	 */
	public void setCreator (java.lang.String newCreator ) {
	 	this.creator = newCreator;
	} 	 
	
	/**
	 * 属性 creatorid的Getter方法.属性名：创建人id
	 *  创建日期:2018-10-24
	 * @return java.lang.String
	 */
	public java.lang.String getCreatorid () {
		return creatorid;
	}
	   
	/**
	 * 属性creatorid的Setter方法.属性名：创建人id
	 * 创建日期:2018-10-24
	 * @param newCreatorid java.lang.String
	 */
	public void setCreatorid (java.lang.String newCreatorid ) {
	 	this.creatorid = newCreatorid;
	} 	 
	
	/**
	 * 属性 createtime的Getter方法.属性名：创建时间
	 *  创建日期:2018-10-24
	 * @return java.lang.String
	 */
	public java.lang.String getCreatetime () {
		return createtime;
	}
	   
	/**
	 * 属性createtime的Setter方法.属性名：创建时间
	 * 创建日期:2018-10-24
	 * @param newCreatetime java.lang.String
	 */
	public void setCreatetime (java.lang.String newCreatetime ) {
	 	this.createtime = newCreatetime;
	} 	 
	
	/**
	 * 属性 modifier的Getter方法.属性名：修改人
	 *  创建日期:2018-10-24
	 * @return java.lang.String
	 */
	public java.lang.String getModifier () {
		return modifier;
	}
	   
	/**
	 * 属性modifier的Setter方法.属性名：修改人
	 * 创建日期:2018-10-24
	 * @param newModifier java.lang.String
	 */
	public void setModifier (java.lang.String newModifier ) {
	 	this.modifier = newModifier;
	} 	 
	
	/**
	 * 属性 modifierid的Getter方法.属性名：修改人id
	 *  创建日期:2018-10-24
	 * @return java.lang.String
	 */
	public java.lang.String getModifierid () {
		return modifierid;
	}
	   
	/**
	 * 属性modifierid的Setter方法.属性名：修改人id
	 * 创建日期:2018-10-24
	 * @param newModifierid java.lang.String
	 */
	public void setModifierid (java.lang.String newModifierid ) {
	 	this.modifierid = newModifierid;
	} 	 
	
	/**
	 * 属性 modifytime的Getter方法.属性名：修改时间
	 *  创建日期:2018-10-24
	 * @return java.lang.String
	 */
	public java.lang.String getModifytime () {
		return modifytime;
	}
	   
	/**
	 * 属性modifytime的Setter方法.属性名：修改时间
	 * 创建日期:2018-10-24
	 * @param newModifytime java.lang.String
	 */
	public void setModifytime (java.lang.String newModifytime ) {
	 	this.modifytime = newModifytime;
	} 	 
	
	/**
	 * 属性 orgname的Getter方法.属性名：组织
	 *  创建日期:2018-10-24
	 * @return java.lang.String
	 */
	public java.lang.String getOrgname () {
		return orgname;
	}
	   
	/**
	 * 属性orgname的Setter方法.属性名：组织
	 * 创建日期:2018-10-24
	 * @param newOrgname java.lang.String
	 */
	public void setOrgname (java.lang.String newOrgname ) {
	 	this.orgname = newOrgname;
	} 	 
	
	/**
	 * 属性 orgid的Getter方法.属性名：组织id
	 *  创建日期:2018-10-24
	 * @return java.lang.String
	 */
	public java.lang.String getOrgid () {
		return orgid;
	}
	   
	/**
	 * 属性orgid的Setter方法.属性名：组织id
	 * 创建日期:2018-10-24
	 * @param newOrgid java.lang.String
	 */
	public void setOrgid (java.lang.String newOrgid ) {
	 	this.orgid = newOrgid;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2018-10-24
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2018-10-24
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2018-10-24
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2018-10-24
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "formValue";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}