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
 *  创建日期:2018-12-18
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "Productitem")
@Table(name = "bd_productitem")
public class Productitem extends BaseEntity{
	
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "itemid")
    private java.lang.String itemid;
      
    @Column(name = "itemcode")
    private java.lang.String itemcode;
      
    @Column(name = "itemname")
    private java.lang.String itemname;
      
    @Column(name = "type")
    private java.lang.Integer type;
      
    @Column(name = "price")
    private java.lang.Double price;
      
    @Column(name = "materialid")
    private java.lang.String materialid;
      
    @Column(name = "materialname")
    private java.lang.String materialname;
      
    @Column(name = "materialcost")
    private java.lang.Double materialcost;
      
    @Column(name = "servicecost")
    private java.lang.Double servicecost;
      
    @Column(name = "materialamount")
    private java.lang.Double materialamount;
      
    @Column(name = "memo")
    private java.lang.String memo;
      
    @Column(name = "orgid")
    private java.lang.String orgid;
      
    @Column(name = "orgname")
    private java.lang.String orgname;
      
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
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
	

	/**
	 * 属性 itemid的Getter方法.属性名：主键
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getItemid () {
		return itemid;
	}
	   
	/**
	 * 属性itemid的Setter方法.属性名：主键
	 * 创建日期:2018-12-18
	 * @param newItemid java.lang.String
	 */
	public void setItemid (java.lang.String newItemid ) {
	 	this.itemid = newItemid;
	} 	 
	
	/**
	 * 属性 itemcode的Getter方法.属性名：细项编码
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getItemcode () {
		return itemcode;
	}
	   
	/**
	 * 属性itemcode的Setter方法.属性名：细项编码
	 * 创建日期:2018-12-18
	 * @param newItemcode java.lang.String
	 */
	public void setItemcode (java.lang.String newItemcode ) {
	 	this.itemcode = newItemcode;
	} 	 
	
	/**
	 * 属性 itemname的Getter方法.属性名：细项名称
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getItemname () {
		return itemname;
	}
	   
	/**
	 * 属性itemname的Setter方法.属性名：细项名称
	 * 创建日期:2018-12-18
	 * @param newItemname java.lang.String
	 */
	public void setItemname (java.lang.String newItemname ) {
	 	this.itemname = newItemname;
	} 	 
	
	/**
	 * 属性 type的Getter方法.属性名：类型
	 *  创建日期:2018-12-18
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getType () {
		return type;
	}
	   
	/**
	 * 属性type的Setter方法.属性名：类型
	 * 创建日期:2018-12-18
	 * @param newType java.lang.Integer
	 */
	public void setType (java.lang.Integer newType ) {
	 	this.type = newType;
	} 	 
	
	/**
	 * 属性 price的Getter方法.属性名：单价
	 *  创建日期:2018-12-18
	 * @return java.lang.Double
	 */
	public java.lang.Double getPrice () {
		return price;
	}
	   
	/**
	 * 属性price的Setter方法.属性名：单价
	 * 创建日期:2018-12-18
	 * @param newPrice java.lang.Double
	 */
	public void setPrice (java.lang.Double newPrice ) {
	 	this.price = newPrice;
	} 	 
	
	/**
	 * 属性 materialid的Getter方法.属性名：材料id
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getMaterialid () {
		return materialid;
	}
	   
	/**
	 * 属性materialid的Setter方法.属性名：材料id
	 * 创建日期:2018-12-18
	 * @param newMaterialid java.lang.String
	 */
	public void setMaterialid (java.lang.String newMaterialid ) {
	 	this.materialid = newMaterialid;
	} 	 
	
	/**
	 * 属性 materialname的Getter方法.属性名：材料名称
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getMaterialname () {
		return materialname;
	}
	   
	/**
	 * 属性materialname的Setter方法.属性名：材料名称
	 * 创建日期:2018-12-18
	 * @param newMaterialname java.lang.String
	 */
	public void setMaterialname (java.lang.String newMaterialname ) {
	 	this.materialname = newMaterialname;
	} 	 
	
	/**
	 * 属性 materialcost的Getter方法.属性名：材料成本
	 *  创建日期:2018-12-18
	 * @return java.lang.Double
	 */
	public java.lang.Double getMaterialcost () {
		return materialcost;
	}
	   
	/**
	 * 属性materialcost的Setter方法.属性名：材料成本
	 * 创建日期:2018-12-18
	 * @param newMaterialcost java.lang.Double
	 */
	public void setMaterialcost (java.lang.Double newMaterialcost ) {
	 	this.materialcost = newMaterialcost;
	} 	 
	
	/**
	 * 属性 servicecost的Getter方法.属性名：服务费
	 *  创建日期:2018-12-18
	 * @return java.lang.Double
	 */
	public java.lang.Double getServicecost () {
		return servicecost;
	}
	   
	/**
	 * 属性servicecost的Setter方法.属性名：服务费
	 * 创建日期:2018-12-18
	 * @param newServicecost java.lang.Double
	 */
	public void setServicecost (java.lang.Double newServicecost ) {
	 	this.servicecost = newServicecost;
	} 	 
	
	/**
	 * 属性 materialamount的Getter方法.属性名：材料消耗量
	 *  创建日期:2018-12-18
	 * @return java.lang.Double
	 */
	public java.lang.Double getMaterialamount () {
		return materialamount;
	}
	   
	/**
	 * 属性materialamount的Setter方法.属性名：材料消耗量
	 * 创建日期:2018-12-18
	 * @param newMaterialamount java.lang.Double
	 */
	public void setMaterialamount (java.lang.Double newMaterialamount ) {
	 	this.materialamount = newMaterialamount;
	} 	 
	
	/**
	 * 属性 memo的Getter方法.属性名：备注
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getMemo () {
		return memo;
	}
	   
	/**
	 * 属性memo的Setter方法.属性名：备注
	 * 创建日期:2018-12-18
	 * @param newMemo java.lang.String
	 */
	public void setMemo (java.lang.String newMemo ) {
	 	this.memo = newMemo;
	} 	 
	
	/**
	 * 属性 orgid的Getter方法.属性名：运营中心id
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getOrgid () {
		return orgid;
	}
	   
	/**
	 * 属性orgid的Setter方法.属性名：运营中心id
	 * 创建日期:2018-12-18
	 * @param newOrgid java.lang.String
	 */
	public void setOrgid (java.lang.String newOrgid ) {
	 	this.orgid = newOrgid;
	} 	 
	
	/**
	 * 属性 orgname的Getter方法.属性名：运营中心
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getOrgname () {
		return orgname;
	}
	   
	/**
	 * 属性orgname的Setter方法.属性名：运营中心
	 * 创建日期:2018-12-18
	 * @param newOrgname java.lang.String
	 */
	public void setOrgname (java.lang.String newOrgname ) {
	 	this.orgname = newOrgname;
	} 	 
	
	/**
	 * 属性 creator的Getter方法.属性名：创建人
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getCreator () {
		return creator;
	}
	   
	/**
	 * 属性creator的Setter方法.属性名：创建人
	 * 创建日期:2018-12-18
	 * @param newCreator java.lang.String
	 */
	public void setCreator (java.lang.String newCreator ) {
	 	this.creator = newCreator;
	} 	 
	
	/**
	 * 属性 creatorid的Getter方法.属性名：创建人id
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getCreatorid () {
		return creatorid;
	}
	   
	/**
	 * 属性creatorid的Setter方法.属性名：创建人id
	 * 创建日期:2018-12-18
	 * @param newCreatorid java.lang.String
	 */
	public void setCreatorid (java.lang.String newCreatorid ) {
	 	this.creatorid = newCreatorid;
	} 	 
	
	/**
	 * 属性 createtime的Getter方法.属性名：创建时间
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getCreatetime () {
		return createtime;
	}
	   
	/**
	 * 属性createtime的Setter方法.属性名：创建时间
	 * 创建日期:2018-12-18
	 * @param newCreatetime java.lang.String
	 */
	public void setCreatetime (java.lang.String newCreatetime ) {
	 	this.createtime = newCreatetime;
	} 	 
	
	/**
	 * 属性 modifier的Getter方法.属性名：修改人
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getModifier () {
		return modifier;
	}
	   
	/**
	 * 属性modifier的Setter方法.属性名：修改人
	 * 创建日期:2018-12-18
	 * @param newModifier java.lang.String
	 */
	public void setModifier (java.lang.String newModifier ) {
	 	this.modifier = newModifier;
	} 	 
	
	/**
	 * 属性 modifierid的Getter方法.属性名：修改人id
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getModifierid () {
		return modifierid;
	}
	   
	/**
	 * 属性modifierid的Setter方法.属性名：修改人id
	 * 创建日期:2018-12-18
	 * @param newModifierid java.lang.String
	 */
	public void setModifierid (java.lang.String newModifierid ) {
	 	this.modifierid = newModifierid;
	} 	 
	
	/**
	 * 属性 modifytime的Getter方法.属性名：修改时间
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getModifytime () {
		return modifytime;
	}
	   
	/**
	 * 属性modifytime的Setter方法.属性名：修改时间
	 * 创建日期:2018-12-18
	 * @param newModifytime java.lang.String
	 */
	public void setModifytime (java.lang.String newModifytime ) {
	 	this.modifytime = newModifytime;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2018-12-18
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2018-12-18
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2018-12-18
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2018-12-18
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "Productitem";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}