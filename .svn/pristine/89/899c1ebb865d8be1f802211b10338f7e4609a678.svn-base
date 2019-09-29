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
 *  创建日期:2019-5-27
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "Productbody")
@Table(name = "bd_product_b")
public class Productbody extends BaseEntity{
	 
    @FK(name = "fk_id_productbody", referenceTableName = "bd_product", referencedColumnName = "productid") 
    @Column(name = "fk_id_productbody")
    private java.lang.String fk_id_productbody;
    
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "productbid")
    private java.lang.String productbid;
      
    @Column(name = "productid")
    private java.lang.String productid;
      
    @Column(name = "itemid")
    private java.lang.String itemid;
      
    @Column(name = "itemname")
    private java.lang.String itemname;
      
    @Column(name = "price")
    private java.lang.Double price = new java.lang.Double("0");
      
    @Column(name = "servicecost")
    private java.lang.Double servicecost = new java.lang.Double("0");
      
    @Column(name = "materialcost")
    private java.lang.Double materialcost = new java.lang.Double("0");
      
    @Column(name = "type")
    private java.lang.Integer type;
      
    @Column(name = "editable")
    private java.lang.Integer editable = 1;
      
    @Column(name = "memo")
    private java.lang.String memo;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
	

	/**
	 * 属性 fk_id_productbody的Getter方法.属性名：parentPK
	 *  创建日期:2019-5-27
	 * @return java.lang.String
	 */
	public java.lang.String getFk_id_productbody () {
		return fk_id_productbody;
	}
	   
	/**
	 * 属性fk_id_productbody的Setter方法.属性名：parentPK
	 * 创建日期:2019-5-27
	 * @param newFk_id_productbody java.lang.String
	 */
	public void setFk_id_productbody (java.lang.String newFk_id_productbody ) {
	 	this.fk_id_productbody = newFk_id_productbody;
	} 	 
	
	/**
	 * 属性 productbid的Getter方法.属性名：主键
	 *  创建日期:2019-5-27
	 * @return java.lang.String
	 */
	public java.lang.String getProductbid () {
		return productbid;
	}
	   
	/**
	 * 属性productbid的Setter方法.属性名：主键
	 * 创建日期:2019-5-27
	 * @param newProductbid java.lang.String
	 */
	public void setProductbid (java.lang.String newProductbid ) {
	 	this.productbid = newProductbid;
	} 	 
	
	/**
	 * 属性 productid的Getter方法.属性名：主表主键
	 *  创建日期:2019-5-27
	 * @return java.lang.String
	 */
	public java.lang.String getProductid () {
		return productid;
	}
	   
	/**
	 * 属性productid的Setter方法.属性名：主表主键
	 * 创建日期:2019-5-27
	 * @param newProductid java.lang.String
	 */
	public void setProductid (java.lang.String newProductid ) {
	 	this.productid = newProductid;
	} 	 
	
	/**
	 * 属性 itemid的Getter方法.属性名：产品细项id
	 *  创建日期:2019-5-27
	 * @return java.lang.String
	 */
	public java.lang.String getItemid () {
		return itemid;
	}
	   
	/**
	 * 属性itemid的Setter方法.属性名：产品细项id
	 * 创建日期:2019-5-27
	 * @param newItemid java.lang.String
	 */
	public void setItemid (java.lang.String newItemid ) {
	 	this.itemid = newItemid;
	} 	 
	
	/**
	 * 属性 itemname的Getter方法.属性名：产品细项名称
	 *  创建日期:2019-5-27
	 * @return java.lang.String
	 */
	public java.lang.String getItemname () {
		return itemname;
	}
	   
	/**
	 * 属性itemname的Setter方法.属性名：产品细项名称
	 * 创建日期:2019-5-27
	 * @param newItemname java.lang.String
	 */
	public void setItemname (java.lang.String newItemname ) {
	 	this.itemname = newItemname;
	} 	 
	
	/**
	 * 属性 price的Getter方法.属性名：细项单价
	 *  创建日期:2019-5-27
	 * @return java.lang.Double
	 */
	public java.lang.Double getPrice () {
		return price;
	}
	   
	/**
	 * 属性price的Setter方法.属性名：细项单价
	 * 创建日期:2019-5-27
	 * @param newPrice java.lang.Double
	 */
	public void setPrice (java.lang.Double newPrice ) {
	 	this.price = newPrice;
	} 	 
	
	/**
	 * 属性 servicecost的Getter方法.属性名：服务费
	 *  创建日期:2019-5-27
	 * @return java.lang.Double
	 */
	public java.lang.Double getServicecost () {
		return servicecost;
	}
	   
	/**
	 * 属性servicecost的Setter方法.属性名：服务费
	 * 创建日期:2019-5-27
	 * @param newServicecost java.lang.Double
	 */
	public void setServicecost (java.lang.Double newServicecost ) {
	 	this.servicecost = newServicecost;
	} 	 
	
	/**
	 * 属性 materialcost的Getter方法.属性名：施工材料成本
	 *  创建日期:2019-5-27
	 * @return java.lang.Double
	 */
	public java.lang.Double getMaterialcost () {
		return materialcost;
	}
	   
	/**
	 * 属性materialcost的Setter方法.属性名：施工材料成本
	 * 创建日期:2019-5-27
	 * @param newMaterialcost java.lang.Double
	 */
	public void setMaterialcost (java.lang.Double newMaterialcost ) {
	 	this.materialcost = newMaterialcost;
	} 	 
	
	/**
	 * 属性 type的Getter方法.属性名：类型
	 *  创建日期:2019-5-27
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getType () {
		return type;
	}
	   
	/**
	 * 属性type的Setter方法.属性名：类型
	 * 创建日期:2019-5-27
	 * @param newType java.lang.Integer
	 */
	public void setType (java.lang.Integer newType ) {
	 	this.type = newType;
	} 	 
	
	/**
	 * 属性 editable的Getter方法.属性名：是否可修改
	 *  创建日期:2019-5-27
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getEditable () {
		return editable;
	}
	   
	/**
	 * 属性editable的Setter方法.属性名：是否可修改
	 * 创建日期:2019-5-27
	 * @param newEditable java.lang.Integer
	 */
	public void setEditable (java.lang.Integer newEditable ) {
	 	this.editable = newEditable;
	} 	 
	
	/**
	 * 属性 memo的Getter方法.属性名：备注
	 *  创建日期:2019-5-27
	 * @return java.lang.String
	 */
	public java.lang.String getMemo () {
		return memo;
	}
	   
	/**
	 * 属性memo的Setter方法.属性名：备注
	 * 创建日期:2019-5-27
	 * @param newMemo java.lang.String
	 */
	public void setMemo (java.lang.String newMemo ) {
	 	this.memo = newMemo;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2019-5-27
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2019-5-27
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2019-5-27
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2019-5-27
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "Productbody";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}