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
@Entity(namespace = "dingCMS",name = "Payment")
@Table(name = "bill_service_payment")
public class Payment extends BaseEntity{
	
	public static final int PAYMENT_STATE_01 = 0;//新增支付
	public static final int PAYMENT_STATE_02 = 1;//新增优惠
	public static final int PAYMENT_STATE_03 = 2;//新增退款
	public static final int PAYMENT_STATE_04 = 3;//支付转移
	
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "paymentid")
    private java.lang.String paymentid;
      
    @Column(name = "serialnum")
    private java.lang.String serialnum;
      
    @Column(name = "billid")
    private java.lang.String billid;
      
    @Column(name = "vbillcode")
    private java.lang.String vbillcode;
      
    @Column(name = "auditstate")
    private java.lang.Integer auditstate = 0;
      
    @Column(name = "type")
    private java.lang.Integer type = 0;
      
    @Column(name = "paymoney")
    private java.lang.Double paymoney = new java.lang.Double("0");
      
    @Column(name = "billnote")
    private java.lang.String billnote;
      
    @Column(name = "oldorderid")
    private java.lang.String oldorderid;
      
    @Column(name = "neworderid")
    private java.lang.String neworderid;
      
    @Column(name = "paymenter")
    private java.lang.String paymenter;
      
    @Column(name = "paymentmethod")
    private java.lang.String paymentmethod;
      
    @Column(name = "paymenttype")
    private java.lang.String paymenttype;
      
    @Column(name = "paymenttime")
    private java.lang.String paymenttime;
      
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
      
    @Column(name = "auditor")
    private java.lang.String auditor;
      
    @Column(name = "auditorid")
    private java.lang.String auditorid;
      
    @Column(name = "audittime")
    private java.lang.String audittime;
      
    @Column(name = "auditnote")
    private java.lang.String auditnote;
      
    @Column(name = "orgname")
    private java.lang.String orgname;
      
    @Column(name = "orgid")
    private java.lang.String orgid;
      
    @Column(name = "agentname")
    private java.lang.String agentname;
      
    @Column(name = "agentid")
    private java.lang.String agentid;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
    @Column(name = "name")
    private java.lang.String name;
    @Column(name = "phone")
    private java.lang.String phone;
    @Column(name = "totalamount")
    private java.lang.Double totalamount;
    @Column(name = "paidamount")
    private java.lang.Double paidamount;
  
    public java.lang.Double getPaidamount() {
		return paidamount;
	}

	public void setPaidamount(java.lang.Double paidamount) {
		this.paidamount = paidamount;
	}

	public java.lang.Double getTotalamount() {
		return totalamount;
	}

	public void setTotalamount(java.lang.Double totalamount) {
		this.totalamount = totalamount;
	}

	public java.lang.String getName() {
    	return name;
    }

    public void setName(java.lang.String name) {
    	this.name = name;
    }

    public java.lang.String getPhone() {
    	return phone;
    }

    public void setPhone(java.lang.String phone) {
    	this.phone = phone;
    }
	

	/**
	 * 属性 paymentid的Getter方法.属性名：主键
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getPaymentid () {
		return paymentid;
	}
	   
	/**
	 * 属性paymentid的Setter方法.属性名：主键
	 * 创建日期:2018-12-18
	 * @param newPaymentid java.lang.String
	 */
	public void setPaymentid (java.lang.String newPaymentid ) {
	 	this.paymentid = newPaymentid;
	} 	 
	
	/**
	 * 属性 serialnum的Getter方法.属性名：流水号
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getSerialnum () {
		return serialnum;
	}
	   
	/**
	 * 属性serialnum的Setter方法.属性名：流水号
	 * 创建日期:2018-12-18
	 * @param newSerialnum java.lang.String
	 */
	public void setSerialnum (java.lang.String newSerialnum ) {
	 	this.serialnum = newSerialnum;
	} 	 
	
	/**
	 * 属性 billid的Getter方法.属性名：工程服务id
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getBillid () {
		return billid;
	}
	   
	/**
	 * 属性billid的Setter方法.属性名：工程服务id
	 * 创建日期:2018-12-18
	 * @param newBillid java.lang.String
	 */
	public void setBillid (java.lang.String newBillid ) {
	 	this.billid = newBillid;
	} 	 
	
	/**
	 * 属性 vbillcode的Getter方法.属性名：工程服务编号
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getVbillcode () {
		return vbillcode;
	}
	   
	/**
	 * 属性vbillcode的Setter方法.属性名：工程服务编号
	 * 创建日期:2018-12-18
	 * @param newVbillcode java.lang.String
	 */
	public void setVbillcode (java.lang.String newVbillcode ) {
	 	this.vbillcode = newVbillcode;
	} 	 
	
	/**
	 * 属性 auditstate的Getter方法.属性名：审核状态
	 *  创建日期:2018-12-18
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getAuditstate () {
		return auditstate;
	}
	   
	/**
	 * 属性auditstate的Setter方法.属性名：审核状态
	 * 创建日期:2018-12-18
	 * @param newAuditstate java.lang.Integer
	 */
	public void setAuditstate (java.lang.Integer newAuditstate ) {
	 	this.auditstate = newAuditstate;
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
	 * 属性 paymoney的Getter方法.属性名：支付金额
	 *  创建日期:2018-12-18
	 * @return java.lang.Double
	 */
	public java.lang.Double getPaymoney () {
		return paymoney;
	}
	   
	/**
	 * 属性paymoney的Setter方法.属性名：支付金额
	 * 创建日期:2018-12-18
	 * @param newPaymoney java.lang.Double
	 */
	public void setPaymoney (java.lang.Double newPaymoney ) {
	 	this.paymoney = newPaymoney;
	} 	 
	
	/**
	 * 属性 billnote的Getter方法.属性名：业务摘要
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getBillnote () {
		return billnote;
	}
	   
	/**
	 * 属性billnote的Setter方法.属性名：业务摘要
	 * 创建日期:2018-12-18
	 * @param newBillnote java.lang.String
	 */
	public void setBillnote (java.lang.String newBillnote ) {
	 	this.billnote = newBillnote;
	} 	 
	
	/**
	 * 属性 oldorderid的Getter方法.属性名：转移原订单id
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getOldorderid () {
		return oldorderid;
	}
	   
	/**
	 * 属性oldorderid的Setter方法.属性名：转移原订单id
	 * 创建日期:2018-12-18
	 * @param newOldorderid java.lang.String
	 */
	public void setOldorderid (java.lang.String newOldorderid ) {
	 	this.oldorderid = newOldorderid;
	} 	 
	
	/**
	 * 属性 neworderid的Getter方法.属性名：转移目标订单id
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getNeworderid () {
		return neworderid;
	}
	   
	/**
	 * 属性neworderid的Setter方法.属性名：转移目标订单id
	 * 创建日期:2018-12-18
	 * @param newNeworderid java.lang.String
	 */
	public void setNeworderid (java.lang.String newNeworderid ) {
	 	this.neworderid = newNeworderid;
	} 	 
	
	/**
	 * 属性 paymenter的Getter方法.属性名：付款人
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getPaymenter () {
		return paymenter;
	}
	   
	/**
	 * 属性paymenter的Setter方法.属性名：付款人
	 * 创建日期:2018-12-18
	 * @param newPaymenter java.lang.String
	 */
	public void setPaymenter (java.lang.String newPaymenter ) {
	 	this.paymenter = newPaymenter;
	} 	 
	
	/**
	 * 属性 paymentmethod的Getter方法.属性名：付款方式
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getPaymentmethod () {
		return paymentmethod;
	}
	   
	/**
	 * 属性paymentmethod的Setter方法.属性名：付款方式
	 * 创建日期:2018-12-18
	 * @param newPaymentmethod java.lang.String
	 */
	public void setPaymentmethod (java.lang.String newPaymentmethod ) {
	 	this.paymentmethod = newPaymentmethod;
	} 	 
	
	/**
	 * 属性 paymenttype的Getter方法.属性名：款项类型
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getPaymenttype () {
		return paymenttype;
	}
	   
	/**
	 * 属性paymenttype的Setter方法.属性名：款项类型
	 * 创建日期:2018-12-18
	 * @param newPaymenttype java.lang.String
	 */
	public void setPaymenttype (java.lang.String newPaymenttype ) {
	 	this.paymenttype = newPaymenttype;
	} 	 
	
	/**
	 * 属性 paymenttime的Getter方法.属性名：付款时间
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getPaymenttime () {
		return paymenttime;
	}
	   
	/**
	 * 属性paymenttime的Setter方法.属性名：付款时间
	 * 创建日期:2018-12-18
	 * @param newPaymenttime java.lang.String
	 */
	public void setPaymenttime (java.lang.String newPaymenttime ) {
	 	this.paymenttime = newPaymenttime;
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
	 * 属性 auditor的Getter方法.属性名：审核人
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getAuditor () {
		return auditor;
	}
	   
	/**
	 * 属性auditor的Setter方法.属性名：审核人
	 * 创建日期:2018-12-18
	 * @param newAuditor java.lang.String
	 */
	public void setAuditor (java.lang.String newAuditor ) {
	 	this.auditor = newAuditor;
	} 	 
	
	/**
	 * 属性 auditorid的Getter方法.属性名：审核人id
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getAuditorid () {
		return auditorid;
	}
	   
	/**
	 * 属性auditorid的Setter方法.属性名：审核人id
	 * 创建日期:2018-12-18
	 * @param newAuditorid java.lang.String
	 */
	public void setAuditorid (java.lang.String newAuditorid ) {
	 	this.auditorid = newAuditorid;
	} 	 
	
	/**
	 * 属性 audittime的Getter方法.属性名：审核时间
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getAudittime () {
		return audittime;
	}
	   
	/**
	 * 属性audittime的Setter方法.属性名：审核时间
	 * 创建日期:2018-12-18
	 * @param newAudittime java.lang.String
	 */
	public void setAudittime (java.lang.String newAudittime ) {
	 	this.audittime = newAudittime;
	} 	 
	
	/**
	 * 属性 auditnote的Getter方法.属性名：审核批语
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getAuditnote () {
		return auditnote;
	}
	   
	/**
	 * 属性auditnote的Setter方法.属性名：审核批语
	 * 创建日期:2018-12-18
	 * @param newAuditnote java.lang.String
	 */
	public void setAuditnote (java.lang.String newAuditnote ) {
	 	this.auditnote = newAuditnote;
	} 	 
	
	/**
	 * 属性 orgname的Getter方法.属性名：组织
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getOrgname () {
		return orgname;
	}
	   
	/**
	 * 属性orgname的Setter方法.属性名：组织
	 * 创建日期:2018-12-18
	 * @param newOrgname java.lang.String
	 */
	public void setOrgname (java.lang.String newOrgname ) {
	 	this.orgname = newOrgname;
	} 	 
	
	/**
	 * 属性 orgid的Getter方法.属性名：组织id
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getOrgid () {
		return orgid;
	}
	   
	/**
	 * 属性orgid的Setter方法.属性名：组织id
	 * 创建日期:2018-12-18
	 * @param newOrgid java.lang.String
	 */
	public void setOrgid (java.lang.String newOrgid ) {
	 	this.orgid = newOrgid;
	} 	 
	
	/**
	 * 属性 agentname的Getter方法.属性名：运营商
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getAgentname () {
		return agentname;
	}
	   
	/**
	 * 属性agentname的Setter方法.属性名：运营商
	 * 创建日期:2018-12-18
	 * @param newAgentname java.lang.String
	 */
	public void setAgentname (java.lang.String newAgentname ) {
	 	this.agentname = newAgentname;
	} 	 
	
	/**
	 * 属性 agentid的Getter方法.属性名：运营商id
	 *  创建日期:2018-12-18
	 * @return java.lang.String
	 */
	public java.lang.String getAgentid () {
		return agentid;
	}
	   
	/**
	 * 属性agentid的Setter方法.属性名：运营商id
	 * 创建日期:2018-12-18
	 * @param newAgentid java.lang.String
	 */
	public void setAgentid (java.lang.String newAgentid ) {
	 	this.agentid = newAgentid;
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
        return "Payment";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}