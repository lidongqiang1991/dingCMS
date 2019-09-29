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
 *  创建日期:2019-2-15
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "BillMaterialAllotB")
@Table(name = "bill_material_allot_b")
public class BillMaterialAllotB extends BaseEntity{
	 
    @FK(name = "fk_id_billmaterialallotb", referenceTableName = "bill_material_allot", referencedColumnName = "materialallotid") 
    @Column(name = "fk_id_billmaterialallotb")
    private java.lang.String fk_id_billmaterialallotb;
    
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "materialallotbid")
    private java.lang.String materialallotbid;
      
    @Column(name = "materialid")
    private java.lang.String materialid;
      
    @Column(name = "materialcode")
    private java.lang.String materialcode;
      
    @Column(name = "materialname")
    private java.lang.String materialname;
      
    @Column(name = "allotnum")
    private java.lang.Double allotnum = 0.00;
      
    @Column(name = "orderid")
    private java.lang.String orderid;
      
    @Column(name = "ordercode")
    private java.lang.String ordercode;
      
    @Column(name = "memo")
    private java.lang.String memo;
      
    @Column(name = "materialallotid")
    private java.lang.String materialallotid;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
	

	/**
	 * 属性 fk_id_billmaterialallotb的Getter方法.属性名：parentPK
	 *  创建日期:2019-2-15
	 * @return java.lang.String
	 */
	public java.lang.String getFk_id_billmaterialallotb () {
		return fk_id_billmaterialallotb;
	}
	   
	/**
	 * 属性fk_id_billmaterialallotb的Setter方法.属性名：parentPK
	 * 创建日期:2019-2-15
	 * @param newFk_id_billmaterialallotb java.lang.String
	 */
	public void setFk_id_billmaterialallotb (java.lang.String newFk_id_billmaterialallotb ) {
	 	this.fk_id_billmaterialallotb = newFk_id_billmaterialallotb;
	} 	 
	
	/**
	 * 属性 materialallotbid的Getter方法.属性名：调配子表主键
	 *  创建日期:2019-2-15
	 * @return java.lang.String
	 */
	public java.lang.String getMaterialallotbid () {
		return materialallotbid;
	}
	   
	/**
	 * 属性materialallotbid的Setter方法.属性名：调配子表主键
	 * 创建日期:2019-2-15
	 * @param newMaterialallotbid java.lang.String
	 */
	public void setMaterialallotbid (java.lang.String newMaterialallotbid ) {
	 	this.materialallotbid = newMaterialallotbid;
	} 	 
	
	/**
	 * 属性 materialid的Getter方法.属性名：物料id
	 *  创建日期:2019-2-15
	 * @return java.lang.String
	 */
	public java.lang.String getMaterialid () {
		return materialid;
	}
	   
	/**
	 * 属性materialid的Setter方法.属性名：物料id
	 * 创建日期:2019-2-15
	 * @param newMaterialid java.lang.String
	 */
	public void setMaterialid (java.lang.String newMaterialid ) {
	 	this.materialid = newMaterialid;
	} 	 
	
	/**
	 * 属性 materialcode的Getter方法.属性名：物料编码
	 *  创建日期:2019-2-15
	 * @return java.lang.String
	 */
	public java.lang.String getMaterialcode () {
		return materialcode;
	}
	   
	/**
	 * 属性materialcode的Setter方法.属性名：物料编码
	 * 创建日期:2019-2-15
	 * @param newMaterialcode java.lang.String
	 */
	public void setMaterialcode (java.lang.String newMaterialcode ) {
	 	this.materialcode = newMaterialcode;
	} 	 
	
	/**
	 * 属性 materialname的Getter方法.属性名：物料名称
	 *  创建日期:2019-2-15
	 * @return java.lang.String
	 */
	public java.lang.String getMaterialname () {
		return materialname;
	}
	   
	/**
	 * 属性materialname的Setter方法.属性名：物料名称
	 * 创建日期:2019-2-15
	 * @param newMaterialname java.lang.String
	 */
	public void setMaterialname (java.lang.String newMaterialname ) {
	 	this.materialname = newMaterialname;
	} 	 
	
	/**
	 * 属性 allotnum的Getter方法.属性名：调配数量
	 *  创建日期:2019-2-15
	 * @return java.lang.Integer
	 */
	public java.lang.Double getAllotnum () {
		return allotnum;
	}
	   
	/**
	 * 属性allotnum的Setter方法.属性名：调配数量
	 * 创建日期:2019-2-15
	 * @param newAllotnum java.lang.Integer
	 */
	public void setAllotnum (java.lang.Double newAllotnum ) {
	 	this.allotnum = newAllotnum;
	} 	 
	
	/**
	 * 属性 orderid的Getter方法.属性名：订单id
	 *  创建日期:2019-2-15
	 * @return java.lang.String
	 */
	public java.lang.String getOrderid () {
		return orderid;
	}
	   
	/**
	 * 属性orderid的Setter方法.属性名：订单id
	 * 创建日期:2019-2-15
	 * @param newOrderid java.lang.String
	 */
	public void setOrderid (java.lang.String newOrderid ) {
	 	this.orderid = newOrderid;
	} 	 
	
	/**
	 * 属性 ordercode的Getter方法.属性名：订单编码
	 *  创建日期:2019-2-15
	 * @return java.lang.String
	 */
	public java.lang.String getOrdercode () {
		return ordercode;
	}
	   
	/**
	 * 属性ordercode的Setter方法.属性名：订单编码
	 * 创建日期:2019-2-15
	 * @param newOrdercode java.lang.String
	 */
	public void setOrdercode (java.lang.String newOrdercode ) {
	 	this.ordercode = newOrdercode;
	} 	 
	
	/**
	 * 属性 memo的Getter方法.属性名：备注
	 *  创建日期:2019-2-15
	 * @return java.lang.String
	 */
	public java.lang.String getMemo () {
		return memo;
	}
	   
	/**
	 * 属性memo的Setter方法.属性名：备注
	 * 创建日期:2019-2-15
	 * @param newMemo java.lang.String
	 */
	public void setMemo (java.lang.String newMemo ) {
	 	this.memo = newMemo;
	} 	 
	
	/**
	 * 属性 materialallotid的Getter方法.属性名：物料调配主表主键
	 *  创建日期:2019-2-15
	 * @return java.lang.String
	 */
	public java.lang.String getMaterialallotid () {
		return materialallotid;
	}
	   
	/**
	 * 属性materialallotid的Setter方法.属性名：物料调配主表主键
	 * 创建日期:2019-2-15
	 * @param newMaterialallotid java.lang.String
	 */
	public void setMaterialallotid (java.lang.String newMaterialallotid ) {
	 	this.materialallotid = newMaterialallotid;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2019-2-15
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2019-2-15
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2019-2-15
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2019-2-15
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "BillMaterialAllotB";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}