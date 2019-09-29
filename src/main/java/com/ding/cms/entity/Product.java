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
@Entity(namespace = "dingCMS",name = "Product")
@Table(name = "bd_product")
public class Product extends BaseEntity{
	
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "productid")
    private java.lang.String productid;
      
    @Column(name = "orgid")
    private java.lang.String orgid;
      
    @Column(name = "orgname")
    private java.lang.String orgname;
      
    @Column(name = "procedureid")
    private java.lang.String procedureid;
      
    @Column(name = "procedurename")
    private java.lang.String procedurename;
      
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
      
    @Column(name = "type")
    private java.lang.String type;
      
    @Column(name = "warranty")
    private java.lang.String warranty;
      
    @Column(name = "memo")
    private java.lang.String memo;
      
    @Column(name = "productcode")
    private java.lang.String productcode;
      
    @Column(name = "productname")
    private java.lang.String productname;
      
    @Column(name = "price")
    private java.lang.Double price;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
    @OneToMany(targetEntity = com.ding.cms.entity.Productbody.class)
    private java.util.List<com.ding.cms.entity.Productbody> id_productbody;
	

	/**
	 * 属性 productid的Getter方法.属性名：主键
	 *  创建日期:2019-5-27
	 * @return java.lang.String
	 */
	public java.lang.String getProductid () {
		return productid;
	}
	   
	/**
	 * 属性productid的Setter方法.属性名：主键
	 * 创建日期:2019-5-27
	 * @param newProductid java.lang.String
	 */
	public void setProductid (java.lang.String newProductid ) {
	 	this.productid = newProductid;
	} 	 
	
	/**
	 * 属性 orgid的Getter方法.属性名：运营中心id
	 *  创建日期:2019-5-27
	 * @return java.lang.String
	 */
	public java.lang.String getOrgid () {
		return orgid;
	}
	   
	/**
	 * 属性orgid的Setter方法.属性名：运营中心id
	 * 创建日期:2019-5-27
	 * @param newOrgid java.lang.String
	 */
	public void setOrgid (java.lang.String newOrgid ) {
	 	this.orgid = newOrgid;
	} 	 
	
	/**
	 * 属性 orgname的Getter方法.属性名：运营中心
	 *  创建日期:2019-5-27
	 * @return java.lang.String
	 */
	public java.lang.String getOrgname () {
		return orgname;
	}
	   
	/**
	 * 属性orgname的Setter方法.属性名：运营中心
	 * 创建日期:2019-5-27
	 * @param newOrgname java.lang.String
	 */
	public void setOrgname (java.lang.String newOrgname ) {
	 	this.orgname = newOrgname;
	} 	 
	
	/**
	 * 属性 procedureid的Getter方法.属性名：流程主键
	 *  创建日期:2019-5-27
	 * @return java.lang.String
	 */
	public java.lang.String getProcedureid () {
		return procedureid;
	}
	   
	/**
	 * 属性procedureid的Setter方法.属性名：流程主键
	 * 创建日期:2019-5-27
	 * @param newProcedureid java.lang.String
	 */
	public void setProcedureid (java.lang.String newProcedureid ) {
	 	this.procedureid = newProcedureid;
	} 	 
	
	/**
	 * 属性 procedurename的Getter方法.属性名：流程名称
	 *  创建日期:2019-5-27
	 * @return java.lang.String
	 */
	public java.lang.String getProcedurename () {
		return procedurename;
	}
	   
	/**
	 * 属性procedurename的Setter方法.属性名：流程名称
	 * 创建日期:2019-5-27
	 * @param newProcedurename java.lang.String
	 */
	public void setProcedurename (java.lang.String newProcedurename ) {
	 	this.procedurename = newProcedurename;
	} 	 
	
	/**
	 * 属性 creator的Getter方法.属性名：创建人
	 *  创建日期:2019-5-27
	 * @return java.lang.String
	 */
	public java.lang.String getCreator () {
		return creator;
	}
	   
	/**
	 * 属性creator的Setter方法.属性名：创建人
	 * 创建日期:2019-5-27
	 * @param newCreator java.lang.String
	 */
	public void setCreator (java.lang.String newCreator ) {
	 	this.creator = newCreator;
	} 	 
	
	/**
	 * 属性 creatorid的Getter方法.属性名：创建人id
	 *  创建日期:2019-5-27
	 * @return java.lang.String
	 */
	public java.lang.String getCreatorid () {
		return creatorid;
	}
	   
	/**
	 * 属性creatorid的Setter方法.属性名：创建人id
	 * 创建日期:2019-5-27
	 * @param newCreatorid java.lang.String
	 */
	public void setCreatorid (java.lang.String newCreatorid ) {
	 	this.creatorid = newCreatorid;
	} 	 
	
	/**
	 * 属性 createtime的Getter方法.属性名：创建时间
	 *  创建日期:2019-5-27
	 * @return java.lang.String
	 */
	public java.lang.String getCreatetime () {
		return createtime;
	}
	   
	/**
	 * 属性createtime的Setter方法.属性名：创建时间
	 * 创建日期:2019-5-27
	 * @param newCreatetime java.lang.String
	 */
	public void setCreatetime (java.lang.String newCreatetime ) {
	 	this.createtime = newCreatetime;
	} 	 
	
	/**
	 * 属性 modifier的Getter方法.属性名：修改人
	 *  创建日期:2019-5-27
	 * @return java.lang.String
	 */
	public java.lang.String getModifier () {
		return modifier;
	}
	   
	/**
	 * 属性modifier的Setter方法.属性名：修改人
	 * 创建日期:2019-5-27
	 * @param newModifier java.lang.String
	 */
	public void setModifier (java.lang.String newModifier ) {
	 	this.modifier = newModifier;
	} 	 
	
	/**
	 * 属性 modifierid的Getter方法.属性名：修改人id
	 *  创建日期:2019-5-27
	 * @return java.lang.String
	 */
	public java.lang.String getModifierid () {
		return modifierid;
	}
	   
	/**
	 * 属性modifierid的Setter方法.属性名：修改人id
	 * 创建日期:2019-5-27
	 * @param newModifierid java.lang.String
	 */
	public void setModifierid (java.lang.String newModifierid ) {
	 	this.modifierid = newModifierid;
	} 	 
	
	/**
	 * 属性 modifytime的Getter方法.属性名：修改时间
	 *  创建日期:2019-5-27
	 * @return java.lang.String
	 */
	public java.lang.String getModifytime () {
		return modifytime;
	}
	   
	/**
	 * 属性modifytime的Setter方法.属性名：修改时间
	 * 创建日期:2019-5-27
	 * @param newModifytime java.lang.String
	 */
	public void setModifytime (java.lang.String newModifytime ) {
	 	this.modifytime = newModifytime;
	} 	 
	
	/**
	 * 属性 type的Getter方法.属性名：产品类型
	 *  创建日期:2019-5-27
	 * @return java.lang.String
	 */
	public java.lang.String getType () {
		return type;
	}
	   
	/**
	 * 属性type的Setter方法.属性名：产品类型
	 * 创建日期:2019-5-27
	 * @param newType java.lang.String
	 */
	public void setType (java.lang.String newType ) {
	 	this.type = newType;
	} 	 
	
	/**
	 * 属性 warranty的Getter方法.属性名：保修期
	 *  创建日期:2019-5-27
	 * @return java.lang.String
	 */
	public java.lang.String getWarranty () {
		return warranty;
	}
	   
	/**
	 * 属性warranty的Setter方法.属性名：保修期
	 * 创建日期:2019-5-27
	 * @param newWarranty java.lang.String
	 */
	public void setWarranty (java.lang.String newWarranty ) {
	 	this.warranty = newWarranty;
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
	 * 属性 productcode的Getter方法.属性名：产品编码
	 *  创建日期:2019-5-27
	 * @return java.lang.String
	 */
	public java.lang.String getProductcode () {
		return productcode;
	}
	   
	/**
	 * 属性productcode的Setter方法.属性名：产品编码
	 * 创建日期:2019-5-27
	 * @param newProductcode java.lang.String
	 */
	public void setProductcode (java.lang.String newProductcode ) {
	 	this.productcode = newProductcode;
	} 	 
	
	/**
	 * 属性 productname的Getter方法.属性名：产品名称
	 *  创建日期:2019-5-27
	 * @return java.lang.String
	 */
	public java.lang.String getProductname () {
		return productname;
	}
	   
	/**
	 * 属性productname的Setter方法.属性名：产品名称
	 * 创建日期:2019-5-27
	 * @param newProductname java.lang.String
	 */
	public void setProductname (java.lang.String newProductname ) {
	 	this.productname = newProductname;
	} 	 
	
	/**
	 * 属性 price的Getter方法.属性名：单价
	 *  创建日期:2019-5-27
	 * @return java.lang.Double
	 */
	public java.lang.Double getPrice () {
		return price;
	}
	   
	/**
	 * 属性price的Setter方法.属性名：单价
	 * 创建日期:2019-5-27
	 * @param newPrice java.lang.Double
	 */
	public void setPrice (java.lang.Double newPrice ) {
	 	this.price = newPrice;
	} 	 
	
	/**
	 * 属性 id_productbody的Getter方法.属性名：id_Productbody
	 *  创建日期:2019-5-27
	 * @return java.util.List<com.ding.cms.entity.Productbody>
	 */
	public java.util.List<com.ding.cms.entity.Productbody> getId_productbody () {
		return id_productbody;
	}
	   
	/**
	 * 属性id_productbody的Setter方法.属性名：id_Productbody
	 * 创建日期:2019-5-27
	 * @param newId_productbody java.util.List<com.ding.cms.entity.Productbody>
	 */
	public void setId_productbody (java.util.List<com.ding.cms.entity.Productbody> newId_productbody ) {
	 	this.id_productbody = newId_productbody;
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
        return "Product";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}