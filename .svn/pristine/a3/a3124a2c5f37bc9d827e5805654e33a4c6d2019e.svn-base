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
 *  创建日期:2019-2-14
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "BillServiceProcedure")
@Table(name = "bill_service_procedure")
public class BillServiceProcedure extends BaseEntity{
	/**
	 * 未开始
	 */
	public static final int PRO_STATE_01=0;
	/**
	 * 进行中
	 */
	public static final int PRO_STATE_02=1;
	/**
	 * 已完成
	 */
	public static final int PRO_STATE_03=2;
	/**
	 * 验收不通过
	 */
	public static final int PRO_STATE_04=3;
    @FK(name = "fk_id_serviceprocedure", referenceTableName = "bill_service", referencedColumnName = "billid") 
    @Column(name = "fk_id_serviceprocedure")
    private java.lang.String fk_id_serviceprocedure;
    
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "billbid")
    private java.lang.String billbid;
      
    @Column(name = "billid")
    private java.lang.String billid;
      
    @Column(name = "type")
    private java.lang.String type;
      
    @Column(name = "itemid")
    private java.lang.String itemid;
      
    @Column(name = "itemname")
    private java.lang.String itemname;
      
    @Column(name = "itemorder")
    private java.lang.String itemorder;
      
    @Column(name = "formid")
    private java.lang.String formid;
      
    @Column(name = "state")
    private java.lang.Integer state;
      
    @Column(name = "modifier")
    private java.lang.String modifier;
      
    @Column(name = "modifierid")
    private java.lang.String modifierid;
      
    @Column(name = "modifytime")
    private java.lang.String modifytime;
      
    @Column(name = "orderid")
    private java.lang.String orderid;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
	

	/**
	 * 属性 fk_id_serviceprocedure的Getter方法.属性名：parentPK
	 *  创建日期:2019-2-14
	 * @return java.lang.String
	 */
	public java.lang.String getFk_id_serviceprocedure () {
		return fk_id_serviceprocedure;
	}
	   
	/**
	 * 属性fk_id_serviceprocedure的Setter方法.属性名：parentPK
	 * 创建日期:2019-2-14
	 * @param newFk_id_serviceprocedure java.lang.String
	 */
	public void setFk_id_serviceprocedure (java.lang.String newFk_id_serviceprocedure ) {
	 	this.fk_id_serviceprocedure = newFk_id_serviceprocedure;
	} 	 
	
	/**
	 * 属性 billbid的Getter方法.属性名：主键
	 *  创建日期:2019-2-14
	 * @return java.lang.String
	 */
	public java.lang.String getBillbid () {
		return billbid;
	}
	   
	/**
	 * 属性billbid的Setter方法.属性名：主键
	 * 创建日期:2019-2-14
	 * @param newBillbid java.lang.String
	 */
	public void setBillbid (java.lang.String newBillbid ) {
	 	this.billbid = newBillbid;
	} 	 
	
	/**
	 * 属性 billid的Getter方法.属性名：主表主键
	 *  创建日期:2019-2-14
	 * @return java.lang.String
	 */
	public java.lang.String getBillid () {
		return billid;
	}
	   
	/**
	 * 属性billid的Setter方法.属性名：主表主键
	 * 创建日期:2019-2-14
	 * @param newBillid java.lang.String
	 */
	public void setBillid (java.lang.String newBillid ) {
	 	this.billid = newBillid;
	} 	 
	
	/**
	 * 属性 type的Getter方法.属性名：工序类型
	 *  创建日期:2019-2-14
	 * @return java.lang.String
	 */
	public java.lang.String getType () {
		return type;
	}
	   
	/**
	 * 属性type的Setter方法.属性名：工序类型
	 * 创建日期:2019-2-14
	 * @param newType java.lang.String
	 */
	public void setType (java.lang.String newType ) {
	 	this.type = newType;
	} 	 
	
	/**
	 * 属性 itemid的Getter方法.属性名：工序id
	 *  创建日期:2019-2-14
	 * @return java.lang.String
	 */
	public java.lang.String getItemid () {
		return itemid;
	}
	   
	/**
	 * 属性itemid的Setter方法.属性名：工序id
	 * 创建日期:2019-2-14
	 * @param newItemid java.lang.String
	 */
	public void setItemid (java.lang.String newItemid ) {
	 	this.itemid = newItemid;
	} 	 
	
	/**
	 * 属性 itemname的Getter方法.属性名：工序名称
	 *  创建日期:2019-2-14
	 * @return java.lang.String
	 */
	public java.lang.String getItemname () {
		return itemname;
	}
	   
	/**
	 * 属性itemname的Setter方法.属性名：工序名称
	 * 创建日期:2019-2-14
	 * @param newItemname java.lang.String
	 */
	public void setItemname (java.lang.String newItemname ) {
	 	this.itemname = newItemname;
	} 	 
	
	/**
	 * 属性 itemorder的Getter方法.属性名：序号
	 *  创建日期:2019-2-14
	 * @return java.lang.String
	 */
	public java.lang.String getItemorder () {
		return itemorder;
	}
	   
	/**
	 * 属性itemorder的Setter方法.属性名：序号
	 * 创建日期:2019-2-14
	 * @param newItemorder java.lang.String
	 */
	public void setItemorder (java.lang.String newItemorder ) {
	 	this.itemorder = newItemorder;
	} 	 
	
	/**
	 * 属性 formid的Getter方法.属性名：表单id
	 *  创建日期:2019-2-14
	 * @return java.lang.String
	 */
	public java.lang.String getFormid () {
		return formid;
	}
	   
	/**
	 * 属性formid的Setter方法.属性名：表单id
	 * 创建日期:2019-2-14
	 * @param newFormid java.lang.String
	 */
	public void setFormid (java.lang.String newFormid ) {
	 	this.formid = newFormid;
	} 	 
	
	/**
	 * 属性 state的Getter方法.属性名：工序状态
	 *  创建日期:2019-2-14
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getState () {
		return state;
	}
	   
	/**
	 * 属性state的Setter方法.属性名：工序状态
	 * 创建日期:2019-2-14
	 * @param newState java.lang.Integer
	 */
	public void setState (java.lang.Integer newState ) {
	 	this.state = newState;
	} 	 
	
	/**
	 * 属性 modifier的Getter方法.属性名：修改人
	 *  创建日期:2019-2-14
	 * @return java.lang.String
	 */
	public java.lang.String getModifier () {
		return modifier;
	}
	   
	/**
	 * 属性modifier的Setter方法.属性名：修改人
	 * 创建日期:2019-2-14
	 * @param newModifier java.lang.String
	 */
	public void setModifier (java.lang.String newModifier ) {
	 	this.modifier = newModifier;
	} 	 
	
	/**
	 * 属性 modifierid的Getter方法.属性名：修改人id
	 *  创建日期:2019-2-14
	 * @return java.lang.String
	 */
	public java.lang.String getModifierid () {
		return modifierid;
	}
	   
	/**
	 * 属性modifierid的Setter方法.属性名：修改人id
	 * 创建日期:2019-2-14
	 * @param newModifierid java.lang.String
	 */
	public void setModifierid (java.lang.String newModifierid ) {
	 	this.modifierid = newModifierid;
	} 	 
	
	/**
	 * 属性 modifytime的Getter方法.属性名：修改时间
	 *  创建日期:2019-2-14
	 * @return java.lang.String
	 */
	public java.lang.String getModifytime () {
		return modifytime;
	}
	   
	/**
	 * 属性modifytime的Setter方法.属性名：修改时间
	 * 创建日期:2019-2-14
	 * @param newModifytime java.lang.String
	 */
	public void setModifytime (java.lang.String newModifytime ) {
	 	this.modifytime = newModifytime;
	} 	 
	
	/**
	 * 属性 orderid的Getter方法.属性名：订单id
	 *  创建日期:2019-2-14
	 * @return java.lang.String
	 */
	public java.lang.String getOrderid () {
		return orderid;
	}
	   
	/**
	 * 属性orderid的Setter方法.属性名：订单id
	 * 创建日期:2019-2-14
	 * @param newOrderid java.lang.String
	 */
	public void setOrderid (java.lang.String newOrderid ) {
	 	this.orderid = newOrderid;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2019-2-14
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2019-2-14
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2019-2-14
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2019-2-14
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "BillServiceProcedure";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}