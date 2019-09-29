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
 *  创建日期:2019-2-18
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "BillMaterialAllot")
@Table(name = "bill_material_allot")
public class BillMaterialAllot extends BaseEntity{
	
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "materialallotid")
    private java.lang.String materialallotid;
      
    @Column(name = "serviceid")
    private java.lang.String serviceid;
      
    @Column(name = "servicecode")
    private java.lang.String servicecode;
      
    @Column(name = "memo")
    private java.lang.String memo;
      
    @Column(name = "creator")
    private java.lang.String creator;
      
    @Column(name = "creatorid")
    private java.lang.String creatorid;
      
    @Column(name = "createtime")
    private java.lang.String createtime;
      
    @Column(name = "orgname")
    private java.lang.String orgname;
      
    @Column(name = "orgid")
    private java.lang.String orgid;
      
    @Column(name = "modifier")
    private java.lang.String modifier;
      
    @Column(name = "modifierid")
    private java.lang.String modifierid;
      
    @Column(name = "modifytime")
    private java.lang.String modifytime;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
    @OneToMany(targetEntity = com.ding.cms.entity.BillMaterialAllotB.class)
    private java.util.List<com.ding.cms.entity.BillMaterialAllotB> id_billmaterialallotb;
	

	/**
	 * 属性 materialallotid的Getter方法.属性名：主键
	 *  创建日期:2019-2-18
	 * @return java.lang.String
	 */
	public java.lang.String getMaterialallotid () {
		return materialallotid;
	}
	   
	/**
	 * 属性materialallotid的Setter方法.属性名：主键
	 * 创建日期:2019-2-18
	 * @param newMaterialallotid java.lang.String
	 */
	public void setMaterialallotid (java.lang.String newMaterialallotid ) {
	 	this.materialallotid = newMaterialallotid;
	} 	 
	
	/**
	 * 属性 serviceid的Getter方法.属性名：工程服务id
	 *  创建日期:2019-2-18
	 * @return java.lang.String
	 */
	public java.lang.String getServiceid () {
		return serviceid;
	}
	   
	/**
	 * 属性serviceid的Setter方法.属性名：工程服务id
	 * 创建日期:2019-2-18
	 * @param newServiceid java.lang.String
	 */
	public void setServiceid (java.lang.String newServiceid ) {
	 	this.serviceid = newServiceid;
	} 	 
	
	/**
	 * 属性 servicecode的Getter方法.属性名：工程服务编码
	 *  创建日期:2019-2-18
	 * @return java.lang.String
	 */
	public java.lang.String getServicecode () {
		return servicecode;
	}
	   
	/**
	 * 属性servicecode的Setter方法.属性名：工程服务编码
	 * 创建日期:2019-2-18
	 * @param newServicecode java.lang.String
	 */
	public void setServicecode (java.lang.String newServicecode ) {
	 	this.servicecode = newServicecode;
	} 	 
	
	/**
	 * 属性 memo的Getter方法.属性名：备注
	 *  创建日期:2019-2-18
	 * @return java.lang.String
	 */
	public java.lang.String getMemo () {
		return memo;
	}
	   
	/**
	 * 属性memo的Setter方法.属性名：备注
	 * 创建日期:2019-2-18
	 * @param newMemo java.lang.String
	 */
	public void setMemo (java.lang.String newMemo ) {
	 	this.memo = newMemo;
	} 	 
	
	/**
	 * 属性 creator的Getter方法.属性名：创建人
	 *  创建日期:2019-2-18
	 * @return java.lang.String
	 */
	public java.lang.String getCreator () {
		return creator;
	}
	   
	/**
	 * 属性creator的Setter方法.属性名：创建人
	 * 创建日期:2019-2-18
	 * @param newCreator java.lang.String
	 */
	public void setCreator (java.lang.String newCreator ) {
	 	this.creator = newCreator;
	} 	 
	
	/**
	 * 属性 creatorid的Getter方法.属性名：创建人id
	 *  创建日期:2019-2-18
	 * @return java.lang.String
	 */
	public java.lang.String getCreatorid () {
		return creatorid;
	}
	   
	/**
	 * 属性creatorid的Setter方法.属性名：创建人id
	 * 创建日期:2019-2-18
	 * @param newCreatorid java.lang.String
	 */
	public void setCreatorid (java.lang.String newCreatorid ) {
	 	this.creatorid = newCreatorid;
	} 	 
	
	/**
	 * 属性 createtime的Getter方法.属性名：创建时间
	 *  创建日期:2019-2-18
	 * @return java.lang.String
	 */
	public java.lang.String getCreatetime () {
		return createtime;
	}
	   
	/**
	 * 属性createtime的Setter方法.属性名：创建时间
	 * 创建日期:2019-2-18
	 * @param newCreatetime java.lang.String
	 */
	public void setCreatetime (java.lang.String newCreatetime ) {
	 	this.createtime = newCreatetime;
	} 	 
	
	/**
	 * 属性 orgname的Getter方法.属性名：组织
	 *  创建日期:2019-2-18
	 * @return java.lang.String
	 */
	public java.lang.String getOrgname () {
		return orgname;
	}
	   
	/**
	 * 属性orgname的Setter方法.属性名：组织
	 * 创建日期:2019-2-18
	 * @param newOrgname java.lang.String
	 */
	public void setOrgname (java.lang.String newOrgname ) {
	 	this.orgname = newOrgname;
	} 	 
	
	/**
	 * 属性 orgid的Getter方法.属性名：组织id
	 *  创建日期:2019-2-18
	 * @return java.lang.String
	 */
	public java.lang.String getOrgid () {
		return orgid;
	}
	   
	/**
	 * 属性orgid的Setter方法.属性名：组织id
	 * 创建日期:2019-2-18
	 * @param newOrgid java.lang.String
	 */
	public void setOrgid (java.lang.String newOrgid ) {
	 	this.orgid = newOrgid;
	} 	 
	
	/**
	 * 属性 id_billmaterialallotb的Getter方法.属性名：id_BillMaterialAllotB
	 *  创建日期:2019-2-18
	 * @return java.util.List<com.ding.cms.entity.BillMaterialAllotB>
	 */
	public java.util.List<com.ding.cms.entity.BillMaterialAllotB> getId_billmaterialallotb () {
		return id_billmaterialallotb;
	}
	   
	/**
	 * 属性id_billmaterialallotb的Setter方法.属性名：id_BillMaterialAllotB
	 * 创建日期:2019-2-18
	 * @param newId_billmaterialallotb java.util.List<com.ding.cms.entity.BillMaterialAllotB>
	 */
	public void setId_billmaterialallotb (java.util.List<com.ding.cms.entity.BillMaterialAllotB> newId_billmaterialallotb ) {
	 	this.id_billmaterialallotb = newId_billmaterialallotb;
	} 	 
	
	/**
	 * 属性 modifier的Getter方法.属性名：修改人
	 *  创建日期:2019-2-18
	 * @return java.lang.String
	 */
	public java.lang.String getModifier () {
		return modifier;
	}
	   
	/**
	 * 属性modifier的Setter方法.属性名：修改人
	 * 创建日期:2019-2-18
	 * @param newModifier java.lang.String
	 */
	public void setModifier (java.lang.String newModifier ) {
	 	this.modifier = newModifier;
	} 	 
	
	/**
	 * 属性 modifierid的Getter方法.属性名：修改人id
	 *  创建日期:2019-2-18
	 * @return java.lang.String
	 */
	public java.lang.String getModifierid () {
		return modifierid;
	}
	   
	/**
	 * 属性modifierid的Setter方法.属性名：修改人id
	 * 创建日期:2019-2-18
	 * @param newModifierid java.lang.String
	 */
	public void setModifierid (java.lang.String newModifierid ) {
	 	this.modifierid = newModifierid;
	} 	 
	
	/**
	 * 属性 modifytime的Getter方法.属性名：修改时间
	 *  创建日期:2019-2-18
	 * @return java.lang.String
	 */
	public java.lang.String getModifytime () {
		return modifytime;
	}
	   
	/**
	 * 属性modifytime的Setter方法.属性名：修改时间
	 * 创建日期:2019-2-18
	 * @param newModifytime java.lang.String
	 */
	public void setModifytime (java.lang.String newModifytime ) {
	 	this.modifytime = newModifytime;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2019-2-18
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2019-2-18
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2019-2-18
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2019-2-18
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "BillMaterialAllot";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}