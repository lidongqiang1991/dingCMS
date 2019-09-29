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
 *  创建日期:2018-10-22
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "Procedure")
@Table(name = "sys_procedure")
public class Procedure extends BaseEntity{
	
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "procedureid")
    private java.lang.String procedureid;
      
    @Column(name = "procedurecode")
    private java.lang.String procedurecode;
      
    @Column(name = "procedurename")
    private java.lang.String procedurename;
      
    @Column(name = "version")
    private java.lang.String version;
      
    @Column(name = "memo")
    private java.lang.String memo;
      
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
        
	
    @OneToMany(targetEntity = com.yonyou.iuap.system.entity.Procedurebody.class)
    private java.util.List<com.yonyou.iuap.system.entity.Procedurebody> id_procedurebody;
	

	/**
	 * 属性 procedureid的Getter方法.属性名：流程主键
	 *  创建日期:2018-10-22
	 * @return java.lang.String
	 */
	public java.lang.String getProcedureid () {
		return procedureid;
	}
	   
	/**
	 * 属性procedureid的Setter方法.属性名：流程主键
	 * 创建日期:2018-10-22
	 * @param newProcedureid java.lang.String
	 */
	public void setProcedureid (java.lang.String newProcedureid ) {
	 	this.procedureid = newProcedureid;
	} 	 
	
	/**
	 * 属性 procedurecode的Getter方法.属性名：流程编码
	 *  创建日期:2018-10-22
	 * @return java.lang.String
	 */
	public java.lang.String getProcedurecode () {
		return procedurecode;
	}
	   
	/**
	 * 属性procedurecode的Setter方法.属性名：流程编码
	 * 创建日期:2018-10-22
	 * @param newProcedurecode java.lang.String
	 */
	public void setProcedurecode (java.lang.String newProcedurecode ) {
	 	this.procedurecode = newProcedurecode;
	} 	 
	
	/**
	 * 属性 procedurename的Getter方法.属性名：流程名称
	 *  创建日期:2018-10-22
	 * @return java.lang.String
	 */
	public java.lang.String getProcedurename () {
		return procedurename;
	}
	   
	/**
	 * 属性procedurename的Setter方法.属性名：流程名称
	 * 创建日期:2018-10-22
	 * @param newProcedurename java.lang.String
	 */
	public void setProcedurename (java.lang.String newProcedurename ) {
	 	this.procedurename = newProcedurename;
	} 	 
	
	/**
	 * 属性 version的Getter方法.属性名：版本
	 *  创建日期:2018-10-22
	 * @return java.lang.String
	 */
	public java.lang.String getVersion () {
		return version;
	}
	   
	/**
	 * 属性version的Setter方法.属性名：版本
	 * 创建日期:2018-10-22
	 * @param newVersion java.lang.String
	 */
	public void setVersion (java.lang.String newVersion ) {
	 	this.version = newVersion;
	} 	 
	
	/**
	 * 属性 memo的Getter方法.属性名：备注
	 *  创建日期:2018-10-22
	 * @return java.lang.String
	 */
	public java.lang.String getMemo () {
		return memo;
	}
	   
	/**
	 * 属性memo的Setter方法.属性名：备注
	 * 创建日期:2018-10-22
	 * @param newMemo java.lang.String
	 */
	public void setMemo (java.lang.String newMemo ) {
	 	this.memo = newMemo;
	} 	 
	
	/**
	 * 属性 creator的Getter方法.属性名：创建人
	 *  创建日期:2018-10-22
	 * @return java.lang.String
	 */
	public java.lang.String getCreator () {
		return creator;
	}
	   
	/**
	 * 属性creator的Setter方法.属性名：创建人
	 * 创建日期:2018-10-22
	 * @param newCreator java.lang.String
	 */
	public void setCreator (java.lang.String newCreator ) {
	 	this.creator = newCreator;
	} 	 
	
	/**
	 * 属性 creatorid的Getter方法.属性名：创建人id
	 *  创建日期:2018-10-22
	 * @return java.lang.String
	 */
	public java.lang.String getCreatorid () {
		return creatorid;
	}
	   
	/**
	 * 属性creatorid的Setter方法.属性名：创建人id
	 * 创建日期:2018-10-22
	 * @param newCreatorid java.lang.String
	 */
	public void setCreatorid (java.lang.String newCreatorid ) {
	 	this.creatorid = newCreatorid;
	} 	 
	
	/**
	 * 属性 createtime的Getter方法.属性名：创建时间
	 *  创建日期:2018-10-22
	 * @return java.lang.String
	 */
	public java.lang.String getCreatetime () {
		return createtime;
	}
	   
	/**
	 * 属性createtime的Setter方法.属性名：创建时间
	 * 创建日期:2018-10-22
	 * @param newCreatetime java.lang.String
	 */
	public void setCreatetime (java.lang.String newCreatetime ) {
	 	this.createtime = newCreatetime;
	} 	 
	
	/**
	 * 属性 modifier的Getter方法.属性名：修改人
	 *  创建日期:2018-10-22
	 * @return java.lang.String
	 */
	public java.lang.String getModifier () {
		return modifier;
	}
	   
	/**
	 * 属性modifier的Setter方法.属性名：修改人
	 * 创建日期:2018-10-22
	 * @param newModifier java.lang.String
	 */
	public void setModifier (java.lang.String newModifier ) {
	 	this.modifier = newModifier;
	} 	 
	
	/**
	 * 属性 modifierid的Getter方法.属性名：修改人id
	 *  创建日期:2018-10-22
	 * @return java.lang.String
	 */
	public java.lang.String getModifierid () {
		return modifierid;
	}
	   
	/**
	 * 属性modifierid的Setter方法.属性名：修改人id
	 * 创建日期:2018-10-22
	 * @param newModifierid java.lang.String
	 */
	public void setModifierid (java.lang.String newModifierid ) {
	 	this.modifierid = newModifierid;
	} 	 
	
	/**
	 * 属性 modifytime的Getter方法.属性名：修改时间
	 *  创建日期:2018-10-22
	 * @return java.lang.String
	 */
	public java.lang.String getModifytime () {
		return modifytime;
	}
	   
	/**
	 * 属性modifytime的Setter方法.属性名：修改时间
	 * 创建日期:2018-10-22
	 * @param newModifytime java.lang.String
	 */
	public void setModifytime (java.lang.String newModifytime ) {
	 	this.modifytime = newModifytime;
	} 	 
	
	/**
	 * 属性 orgname的Getter方法.属性名：组织
	 *  创建日期:2018-10-22
	 * @return java.lang.String
	 */
	public java.lang.String getOrgname () {
		return orgname;
	}
	   
	/**
	 * 属性orgname的Setter方法.属性名：组织
	 * 创建日期:2018-10-22
	 * @param newOrgname java.lang.String
	 */
	public void setOrgname (java.lang.String newOrgname ) {
	 	this.orgname = newOrgname;
	} 	 
	
	/**
	 * 属性 orgid的Getter方法.属性名：组织id
	 *  创建日期:2018-10-22
	 * @return java.lang.String
	 */
	public java.lang.String getOrgid () {
		return orgid;
	}
	   
	/**
	 * 属性orgid的Setter方法.属性名：组织id
	 * 创建日期:2018-10-22
	 * @param newOrgid java.lang.String
	 */
	public void setOrgid (java.lang.String newOrgid ) {
	 	this.orgid = newOrgid;
	} 	 
	
	/**
	 * 属性 id_procedurebody的Getter方法.属性名：id_Procedurebody
	 *  创建日期:2018-10-22
	 * @return java.util.List<com.yonyou.iuap.system.entity.Procedurebody>
	 */
	public java.util.List<com.yonyou.iuap.system.entity.Procedurebody> getId_procedurebody () {
		return id_procedurebody;
	}
	   
	/**
	 * 属性id_procedurebody的Setter方法.属性名：id_Procedurebody
	 * 创建日期:2018-10-22
	 * @param newId_procedurebody java.util.List<com.yonyou.iuap.system.entity.Procedurebody>
	 */
	public void setId_procedurebody (java.util.List<com.yonyou.iuap.system.entity.Procedurebody> newId_procedurebody ) {
	 	this.id_procedurebody = newId_procedurebody;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2018-10-22
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2018-10-22
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2018-10-22
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2018-10-22
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "Procedure";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}