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
@Entity(namespace = "dingCMS",name = "BillOrderMaterialBody")
@Table(name = "bill_order_b2")
public class BillOrderMaterialBody extends BaseEntity{
	 
    @FK(name = "fk_id_billordermaterialbody", referenceTableName = "bill_order", referencedColumnName = "billid") 
    @Column(name = "fk_id_billordermaterialbody")
    private java.lang.String fk_id_billordermaterialbody;
    
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "billbid")
    private java.lang.String billbid;
      
    @Column(name = "billid")
    private java.lang.String billid;
      
    @Column(name = "materialid")
    private java.lang.String materialid;
      
    @Column(name = "material")
    private java.lang.String material;
      
    @Column(name = "num")
    private java.lang.Double num;
      
    @Column(name = "price")
    private java.lang.Double price;
      
    @Column(name = "amount")
    private java.lang.Double amount;
      
    @Column(name = "allocatednum")
    private java.lang.Double allocatednum;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;


    //补充字段
    @Column(name = "product")
    private java.lang.String product;
    @Column(name = "vbillcode")
    private java.lang.String vbillcode;
    @Column(name = "unit")
	private String unit;

    public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public String getVbillcode() {
        return vbillcode;
    }

    public void setVbillcode(String vbillcode) {
        this.vbillcode = vbillcode;
    }

    /**
	 * 属性 fk_id_billordermaterialbody的Getter方法.属性名：parentPK
	 *  创建日期:2019-2-15
	 * @return java.lang.String
	 */
	public java.lang.String getFk_id_billordermaterialbody () {
		return fk_id_billordermaterialbody;
	}
	   
	/**
	 * 属性fk_id_billordermaterialbody的Setter方法.属性名：parentPK
	 * 创建日期:2019-2-15
	 * @param newFk_id_billordermaterialbody java.lang.String
	 */
	public void setFk_id_billordermaterialbody (java.lang.String newFk_id_billordermaterialbody ) {
	 	this.fk_id_billordermaterialbody = newFk_id_billordermaterialbody;
	} 	 
	
	/**
	 * 属性 billbid的Getter方法.属性名：主键
	 *  创建日期:2019-2-15
	 * @return java.lang.String
	 */
	public java.lang.String getBillbid () {
		return billbid;
	}
	   
	/**
	 * 属性billbid的Setter方法.属性名：主键
	 * 创建日期:2019-2-15
	 * @param newBillbid java.lang.String
	 */
	public void setBillbid (java.lang.String newBillbid ) {
	 	this.billbid = newBillbid;
	} 	 
	
	/**
	 * 属性 billid的Getter方法.属性名：订单id
	 *  创建日期:2019-2-15
	 * @return java.lang.String
	 */
	public java.lang.String getBillid () {
		return billid;
	}
	   
	/**
	 * 属性billid的Setter方法.属性名：订单id
	 * 创建日期:2019-2-15
	 * @param newBillid java.lang.String
	 */
	public void setBillid (java.lang.String newBillid ) {
	 	this.billid = newBillid;
	} 	 
	
	/**
	 * 属性 materialid的Getter方法.属性名：材料id
	 *  创建日期:2019-2-15
	 * @return java.lang.String
	 */
	public java.lang.String getMaterialid () {
		return materialid;
	}
	   
	/**
	 * 属性materialid的Setter方法.属性名：材料id
	 * 创建日期:2019-2-15
	 * @param newMaterialid java.lang.String
	 */
	public void setMaterialid (java.lang.String newMaterialid ) {
	 	this.materialid = newMaterialid;
	} 	 
	
	/**
	 * 属性 material的Getter方法.属性名：材料名称
	 *  创建日期:2019-2-15
	 * @return java.lang.String
	 */
	public java.lang.String getMaterial () {
		return material;
	}
	   
	/**
	 * 属性material的Setter方法.属性名：材料名称
	 * 创建日期:2019-2-15
	 * @param newMaterial java.lang.String
	 */
	public void setMaterial (java.lang.String newMaterial ) {
	 	this.material = newMaterial;
	} 	 
	
	/**
	 * 属性 num的Getter方法.属性名：数量
	 *  创建日期:2019-2-15
	 * @return java.lang.Double
	 */
	public java.lang.Double getNum () {
		return num;
	}
	   
	/**
	 * 属性num的Setter方法.属性名：数量
	 * 创建日期:2019-2-15
	 * @param newNum java.lang.Double
	 */
	public void setNum (java.lang.Double newNum ) {
	 	this.num = newNum;
	} 	 
	
	/**
	 * 属性 price的Getter方法.属性名：价格
	 *  创建日期:2019-2-15
	 * @return java.lang.Double
	 */
	public java.lang.Double getPrice () {
		return price;
	}
	   
	/**
	 * 属性price的Setter方法.属性名：价格
	 * 创建日期:2019-2-15
	 * @param newPrice java.lang.Double
	 */
	public void setPrice (java.lang.Double newPrice ) {
	 	this.price = newPrice;
	} 	 
	
	/**
	 * 属性 amount的Getter方法.属性名：金额
	 *  创建日期:2019-2-15
	 * @return java.lang.Double
	 */
	public java.lang.Double getAmount () {
		return amount;
	}
	   
	/**
	 * 属性amount的Setter方法.属性名：金额
	 * 创建日期:2019-2-15
	 * @param newAmount java.lang.Double
	 */
	public void setAmount (java.lang.Double newAmount ) {
	 	this.amount = newAmount;
	} 	 
	
	/**
	 * 属性 allocatednum的Getter方法.属性名：已分配数量
	 *  创建日期:2019-2-15
	 * @return java.lang.String
	 */
	public java.lang.Double getAllocatednum () {
		return allocatednum;
	}
	   
	/**
	 * 属性allocatednum的Setter方法.属性名：已分配数量
	 * 创建日期:2019-2-15
	 * @param newAllocatednum java.lang.String
	 */
	public void setAllocatednum (java.lang.Double newAllocatednum ) {
	 	this.allocatednum = newAllocatednum;
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
        return "BillOrderMaterialBody";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}