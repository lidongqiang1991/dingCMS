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
 *  创建日期:2018-12-10
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "BillOrderProductBody")
@Table(name = "bill_order_b1")
public class BillOrderProductBody extends BaseEntity{
	 
    @FK(name = "fk_id_billorderproductbody", referenceTableName = "bill_order", referencedColumnName = "billid") 
    @Column(name = "fk_id_billorderproductbody")
    private java.lang.String fk_id_billorderproductbody;
    
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "billbid")
    private java.lang.String billbid;
      
    @Column(name = "orderid")
    private java.lang.String orderid;
      
    @Column(name = "itemname")
    private java.lang.String itemname;
      
    @Column(name = "itemid")
    private java.lang.String itemid;
      
    @Column(name = "isselected")
    private java.lang.String isselected;
      
    @Column(name = "num")
    private java.lang.Double num;
      
    @Column(name = "price")
    private java.lang.Double price;
      
    @Column(name = "amount")
    private java.lang.Double amount;
      
    @Column(name = "memo")
    private java.lang.String memo;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
	

	/**
	 * 属性 fk_id_billorderproductbody的Getter方法.属性名：parentPK
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getFk_id_billorderproductbody () {
		return fk_id_billorderproductbody;
	}
	   
	/**
	 * 属性fk_id_billorderproductbody的Setter方法.属性名：parentPK
	 * 创建日期:2018-12-10
	 * @param newFk_id_billorderproductbody java.lang.String
	 */
	public void setFk_id_billorderproductbody (java.lang.String newFk_id_billorderproductbody ) {
	 	this.fk_id_billorderproductbody = newFk_id_billorderproductbody;
	} 	 
	
	/**
	 * 属性 billbid的Getter方法.属性名：主键
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getBillbid () {
		return billbid;
	}
	   
	/**
	 * 属性billbid的Setter方法.属性名：主键
	 * 创建日期:2018-12-10
	 * @param newBillbid java.lang.String
	 */
	public void setBillbid (java.lang.String newBillbid ) {
	 	this.billbid = newBillbid;
	} 	 
	
	/**
	 * 属性 orderid的Getter方法.属性名：订单id
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getOrderid () {
		return orderid;
	}
	   
	/**
	 * 属性orderid的Setter方法.属性名：订单id
	 * 创建日期:2018-12-10
	 * @param newOrderid java.lang.String
	 */
	public void setOrderid (java.lang.String newOrderid ) {
	 	this.orderid = newOrderid;
	} 	 
	
	/**
	 * 属性 itemname的Getter方法.属性名：细项名称
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getItemname () {
		return itemname;
	}
	   
	/**
	 * 属性itemname的Setter方法.属性名：细项名称
	 * 创建日期:2018-12-10
	 * @param newItemname java.lang.String
	 */
	public void setItemname (java.lang.String newItemname ) {
	 	this.itemname = newItemname;
	} 	 
	
	/**
	 * 属性 itemid的Getter方法.属性名：细项id
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getItemid () {
		return itemid;
	}
	   
	/**
	 * 属性itemid的Setter方法.属性名：细项id
	 * 创建日期:2018-12-10
	 * @param newItemid java.lang.String
	 */
	public void setItemid (java.lang.String newItemid ) {
	 	this.itemid = newItemid;
	} 	 
	
	/**
	 * 属性 isselected的Getter方法.属性名：是否选择
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getIsselected () {
		return isselected;
	}
	   
	/**
	 * 属性isselected的Setter方法.属性名：是否选择
	 * 创建日期:2018-12-10
	 * @param newIsselected java.lang.String
	 */
	public void setIsselected (java.lang.String newIsselected ) {
	 	this.isselected = newIsselected;
	} 	 
	
	/**
	 * 属性 num的Getter方法.属性名：数量
	 *  创建日期:2018-12-10
	 * @return java.lang.Double
	 */
	public java.lang.Double getNum () {
		return num;
	}
	   
	/**
	 * 属性num的Setter方法.属性名：数量
	 * 创建日期:2018-12-10
	 * @param newNum java.lang.Double
	 */
	public void setNum (java.lang.Double newNum ) {
	 	this.num = newNum;
	} 	 
	
	/**
	 * 属性 price的Getter方法.属性名：价格
	 *  创建日期:2018-12-10
	 * @return java.lang.Double
	 */
	public java.lang.Double getPrice () {
		return price;
	}
	   
	/**
	 * 属性price的Setter方法.属性名：价格
	 * 创建日期:2018-12-10
	 * @param newPrice java.lang.Double
	 */
	public void setPrice (java.lang.Double newPrice ) {
	 	this.price = newPrice;
	} 	 
	
	/**
	 * 属性 amount的Getter方法.属性名：金额
	 *  创建日期:2018-12-10
	 * @return java.lang.Double
	 */
	public java.lang.Double getAmount () {
		return amount;
	}
	   
	/**
	 * 属性amount的Setter方法.属性名：金额
	 * 创建日期:2018-12-10
	 * @param newAmount java.lang.Double
	 */
	public void setAmount (java.lang.Double newAmount ) {
	 	this.amount = newAmount;
	} 	 
	
	/**
	 * 属性 memo的Getter方法.属性名：备注
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getMemo () {
		return memo;
	}
	   
	/**
	 * 属性memo的Setter方法.属性名：备注
	 * 创建日期:2018-12-10
	 * @param newMemo java.lang.String
	 */
	public void setMemo (java.lang.String newMemo ) {
	 	this.memo = newMemo;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2018-12-10
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2018-12-10
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2018-12-10
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2018-12-10
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "BillOrderProductBody";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}