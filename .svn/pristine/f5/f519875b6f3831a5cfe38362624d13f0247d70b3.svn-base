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
@Entity(namespace = "dingCMS",name = "BillOrder")
@Table(name = "bill_order")
public class BillOrder extends BaseEntity{
	
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "billid")
    private java.lang.String billid;
      
    @Column(name = "dealid")
    private java.lang.String dealid;
      
    @Column(name = "serviceid")
    private java.lang.String serviceid;
      
    @Column(name = "vbillcode")
    private java.lang.String vbillcode;
      
    @Column(name = "dbilldate")
    private java.lang.String dbilldate;
      
    @Column(name = "type")
    private java.lang.Integer type;
      
    @Column(name = "state")
    private java.lang.Integer state;
      
    @Column(name = "prostate")
    private java.lang.Integer prostate;
      
    @Column(name = "paystate")
    private java.lang.Integer paystate;
      
    @Column(name = "customerid")
    private java.lang.String customerid;
      
    @Column(name = "customer")
    private java.lang.String customer;
      
    @Column(name = "orgid")
    private java.lang.String orgid;
      
    @Column(name = "orgname")
    private java.lang.String orgname;
      
    @Column(name = "agentid")
    private java.lang.String agentid;
      
    @Column(name = "agentname")
    private java.lang.String agentname;
      
    @Column(name = "totalmny")
    private java.lang.Double totalmny;
      
    @Column(name = "productid")
    private java.lang.String productid;
      
    @Column(name = "product")
    private java.lang.String product;
      
    @Column(name = "price")
    private java.lang.Double price;
      
    @Column(name = "num")
    private java.lang.Double num;
      
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
      
    @Column(name = "memo")
    private java.lang.String memo;
      
    @Column(name = "servicecharge")
    private java.lang.Double servicecharge;
      
    @Column(name = "materialcosts")
    private java.lang.Double materialcosts;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
    @OneToMany(targetEntity = com.ding.cms.entity.BillOrderProductBody.class)
    private java.util.List<com.ding.cms.entity.BillOrderProductBody> id_billorderproductbody;
    @OneToMany(targetEntity = com.ding.cms.entity.BillOrderMaterialBody.class)
    private java.util.List<com.ding.cms.entity.BillOrderMaterialBody> id_billordermaterialbody;
	

	/**
	 * 属性 billid的Getter方法.属性名：单据主键
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getBillid () {
		return billid;
	}
	   
	/**
	 * 属性billid的Setter方法.属性名：单据主键
	 * 创建日期:2018-12-10
	 * @param newBillid java.lang.String
	 */
	public void setBillid (java.lang.String newBillid ) {
	 	this.billid = newBillid;
	} 	 
	
	/**
	 * 属性 dealid的Getter方法.属性名：交易id
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getDealid () {
		return dealid;
	}
	   
	/**
	 * 属性dealid的Setter方法.属性名：交易id
	 * 创建日期:2018-12-10
	 * @param newDealid java.lang.String
	 */
	public void setDealid (java.lang.String newDealid ) {
	 	this.dealid = newDealid;
	} 	 
	
	/**
	 * 属性 serviceid的Getter方法.属性名：工程服务id
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getServiceid () {
		return serviceid;
	}
	   
	/**
	 * 属性serviceid的Setter方法.属性名：工程服务id
	 * 创建日期:2018-12-10
	 * @param newServiceid java.lang.String
	 */
	public void setServiceid (java.lang.String newServiceid ) {
	 	this.serviceid = newServiceid;
	} 	 
	
	/**
	 * 属性 vbillcode的Getter方法.属性名：订单编号
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getVbillcode () {
		return vbillcode;
	}
	   
	/**
	 * 属性vbillcode的Setter方法.属性名：订单编号
	 * 创建日期:2018-12-10
	 * @param newVbillcode java.lang.String
	 */
	public void setVbillcode (java.lang.String newVbillcode ) {
	 	this.vbillcode = newVbillcode;
	} 	 
	
	/**
	 * 属性 dbilldate的Getter方法.属性名：订单日期
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getDbilldate () {
		return dbilldate;
	}
	   
	/**
	 * 属性dbilldate的Setter方法.属性名：订单日期
	 * 创建日期:2018-12-10
	 * @param newDbilldate java.lang.String
	 */
	public void setDbilldate (java.lang.String newDbilldate ) {
	 	this.dbilldate = newDbilldate;
	} 	 
	
	/**
	 * 属性 type的Getter方法.属性名：订单类型
	 *  创建日期:2018-12-10
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getType () {
		return type;
	}
	   
	/**
	 * 属性type的Setter方法.属性名：订单类型
	 * 创建日期:2018-12-10
	 * @param newType java.lang.Integer
	 */
	public void setType (java.lang.Integer newType ) {
	 	this.type = newType;
	} 	 
	
	/**
	 * 属性 state的Getter方法.属性名：订单状态
	 *  创建日期:2018-12-10
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getState () {
		return state;
	}
	   
	/**
	 * 属性state的Setter方法.属性名：订单状态
	 * 创建日期:2018-12-10
	 * @param newState java.lang.Integer
	 */
	public void setState (java.lang.Integer newState ) {
	 	this.state = newState;
	} 	 
	
	/**
	 * 属性 prostate的Getter方法.属性名：工程状态
	 *  创建日期:2018-12-10
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getProstate () {
		return prostate;
	}
	   
	/**
	 * 属性prostate的Setter方法.属性名：工程状态
	 * 创建日期:2018-12-10
	 * @param newProstate java.lang.Integer
	 */
	public void setProstate (java.lang.Integer newProstate ) {
	 	this.prostate = newProstate;
	} 	 
	
	/**
	 * 属性 paystate的Getter方法.属性名：支付状态
	 *  创建日期:2018-12-10
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getPaystate () {
		return paystate;
	}
	   
	/**
	 * 属性paystate的Setter方法.属性名：支付状态
	 * 创建日期:2018-12-10
	 * @param newPaystate java.lang.Integer
	 */
	public void setPaystate (java.lang.Integer newPaystate ) {
	 	this.paystate = newPaystate;
	} 	 
	
	/**
	 * 属性 customerid的Getter方法.属性名：客户id
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getCustomerid () {
		return customerid;
	}
	   
	/**
	 * 属性customerid的Setter方法.属性名：客户id
	 * 创建日期:2018-12-10
	 * @param newCustomerid java.lang.String
	 */
	public void setCustomerid (java.lang.String newCustomerid ) {
	 	this.customerid = newCustomerid;
	} 	 
	
	/**
	 * 属性 customer的Getter方法.属性名：客户
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getCustomer () {
		return customer;
	}
	   
	/**
	 * 属性customer的Setter方法.属性名：客户
	 * 创建日期:2018-12-10
	 * @param newCustomer java.lang.String
	 */
	public void setCustomer (java.lang.String newCustomer ) {
	 	this.customer = newCustomer;
	} 	 
	
	/**
	 * 属性 orgid的Getter方法.属性名：运营中心id
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getOrgid () {
		return orgid;
	}
	   
	/**
	 * 属性orgid的Setter方法.属性名：运营中心id
	 * 创建日期:2018-12-10
	 * @param newOrgid java.lang.String
	 */
	public void setOrgid (java.lang.String newOrgid ) {
	 	this.orgid = newOrgid;
	} 	 
	
	/**
	 * 属性 orgname的Getter方法.属性名：运营中心
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getOrgname () {
		return orgname;
	}
	   
	/**
	 * 属性orgname的Setter方法.属性名：运营中心
	 * 创建日期:2018-12-10
	 * @param newOrgname java.lang.String
	 */
	public void setOrgname (java.lang.String newOrgname ) {
	 	this.orgname = newOrgname;
	} 	 
	
	/**
	 * 属性 agentid的Getter方法.属性名：区域运营商id
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getAgentid () {
		return agentid;
	}
	   
	/**
	 * 属性agentid的Setter方法.属性名：区域运营商id
	 * 创建日期:2018-12-10
	 * @param newAgentid java.lang.String
	 */
	public void setAgentid (java.lang.String newAgentid ) {
	 	this.agentid = newAgentid;
	} 	 
	
	/**
	 * 属性 agentname的Getter方法.属性名：区域运营商
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getAgentname () {
		return agentname;
	}
	   
	/**
	 * 属性agentname的Setter方法.属性名：区域运营商
	 * 创建日期:2018-12-10
	 * @param newAgentname java.lang.String
	 */
	public void setAgentname (java.lang.String newAgentname ) {
	 	this.agentname = newAgentname;
	} 	 
	
	/**
	 * 属性 totalmny的Getter方法.属性名：交易金额
	 *  创建日期:2018-12-10
	 * @return java.lang.Double
	 */
	public java.lang.Double getTotalmny () {
		return totalmny;
	}
	   
	/**
	 * 属性totalmny的Setter方法.属性名：交易金额
	 * 创建日期:2018-12-10
	 * @param newTotalmny java.lang.Double
	 */
	public void setTotalmny (java.lang.Double newTotalmny ) {
	 	this.totalmny = newTotalmny;
	} 	 
	
	/**
	 * 属性 productid的Getter方法.属性名：产品id
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getProductid () {
		return productid;
	}
	   
	/**
	 * 属性productid的Setter方法.属性名：产品id
	 * 创建日期:2018-12-10
	 * @param newProductid java.lang.String
	 */
	public void setProductid (java.lang.String newProductid ) {
	 	this.productid = newProductid;
	} 	 
	
	/**
	 * 属性 product的Getter方法.属性名：产品
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getProduct () {
		return product;
	}
	   
	/**
	 * 属性product的Setter方法.属性名：产品
	 * 创建日期:2018-12-10
	 * @param newProduct java.lang.String
	 */
	public void setProduct (java.lang.String newProduct ) {
	 	this.product = newProduct;
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
	 * 属性 creator的Getter方法.属性名：创建人
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getCreator () {
		return creator;
	}
	   
	/**
	 * 属性creator的Setter方法.属性名：创建人
	 * 创建日期:2018-12-10
	 * @param newCreator java.lang.String
	 */
	public void setCreator (java.lang.String newCreator ) {
	 	this.creator = newCreator;
	} 	 
	
	/**
	 * 属性 creatorid的Getter方法.属性名：创建人id
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getCreatorid () {
		return creatorid;
	}
	   
	/**
	 * 属性creatorid的Setter方法.属性名：创建人id
	 * 创建日期:2018-12-10
	 * @param newCreatorid java.lang.String
	 */
	public void setCreatorid (java.lang.String newCreatorid ) {
	 	this.creatorid = newCreatorid;
	} 	 
	
	/**
	 * 属性 createtime的Getter方法.属性名：创建时间
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getCreatetime () {
		return createtime;
	}
	   
	/**
	 * 属性createtime的Setter方法.属性名：创建时间
	 * 创建日期:2018-12-10
	 * @param newCreatetime java.lang.String
	 */
	public void setCreatetime (java.lang.String newCreatetime ) {
	 	this.createtime = newCreatetime;
	} 	 
	
	/**
	 * 属性 modifier的Getter方法.属性名：修改人
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getModifier () {
		return modifier;
	}
	   
	/**
	 * 属性modifier的Setter方法.属性名：修改人
	 * 创建日期:2018-12-10
	 * @param newModifier java.lang.String
	 */
	public void setModifier (java.lang.String newModifier ) {
	 	this.modifier = newModifier;
	} 	 
	
	/**
	 * 属性 modifierid的Getter方法.属性名：修改人id
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getModifierid () {
		return modifierid;
	}
	   
	/**
	 * 属性modifierid的Setter方法.属性名：修改人id
	 * 创建日期:2018-12-10
	 * @param newModifierid java.lang.String
	 */
	public void setModifierid (java.lang.String newModifierid ) {
	 	this.modifierid = newModifierid;
	} 	 
	
	/**
	 * 属性 modifytime的Getter方法.属性名：修改时间
	 *  创建日期:2018-12-10
	 * @return java.lang.String
	 */
	public java.lang.String getModifytime () {
		return modifytime;
	}
	   
	/**
	 * 属性modifytime的Setter方法.属性名：修改时间
	 * 创建日期:2018-12-10
	 * @param newModifytime java.lang.String
	 */
	public void setModifytime (java.lang.String newModifytime ) {
	 	this.modifytime = newModifytime;
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
	 * 属性 id_billorderproductbody的Getter方法.属性名：id_BillOrderProductBody
	 *  创建日期:2018-12-10
	 * @return java.util.List<com.ding.cms.entity.BillOrderProductBody>
	 */
	public java.util.List<com.ding.cms.entity.BillOrderProductBody> getId_billorderproductbody () {
		return id_billorderproductbody;
	}
	   
	/**
	 * 属性id_billorderproductbody的Setter方法.属性名：id_BillOrderProductBody
	 * 创建日期:2018-12-10
	 * @param newId_billorderproductbody java.util.List<com.ding.cms.entity.BillOrderProductBody>
	 */
	public void setId_billorderproductbody (java.util.List<com.ding.cms.entity.BillOrderProductBody> newId_billorderproductbody ) {
	 	this.id_billorderproductbody = newId_billorderproductbody;
	} 	 
	
	/**
	 * 属性 id_billordermaterialbody的Getter方法.属性名：id_BillOrderMaterialBody
	 *  创建日期:2018-12-10
	 * @return java.util.List<com.ding.cms.entity.BillOrderMaterialBody>
	 */
	public java.util.List<com.ding.cms.entity.BillOrderMaterialBody> getId_billordermaterialbody () {
		return id_billordermaterialbody;
	}
	   
	/**
	 * 属性id_billordermaterialbody的Setter方法.属性名：id_BillOrderMaterialBody
	 * 创建日期:2018-12-10
	 * @param newId_billordermaterialbody java.util.List<com.ding.cms.entity.BillOrderMaterialBody>
	 */
	public void setId_billordermaterialbody (java.util.List<com.ding.cms.entity.BillOrderMaterialBody> newId_billordermaterialbody ) {
	 	this.id_billordermaterialbody = newId_billordermaterialbody;
	} 	 
	
	/**
	 * 属性 servicecharge的Getter方法.属性名：服务费
	 *  创建日期:2018-12-10
	 * @return java.lang.Double
	 */
	public java.lang.Double getServicecharge () {
		return servicecharge;
	}
	   
	/**
	 * 属性servicecharge的Setter方法.属性名：服务费
	 * 创建日期:2018-12-10
	 * @param newServicecharge java.lang.Double
	 */
	public void setServicecharge (java.lang.Double newServicecharge ) {
	 	this.servicecharge = newServicecharge;
	} 	 
	
	/**
	 * 属性 materialcosts的Getter方法.属性名：材料费
	 *  创建日期:2018-12-10
	 * @return java.lang.Double
	 */
	public java.lang.Double getMaterialcosts () {
		return materialcosts;
	}
	   
	/**
	 * 属性materialcosts的Setter方法.属性名：材料费
	 * 创建日期:2018-12-10
	 * @param newMaterialcosts java.lang.Double
	 */
	public void setMaterialcosts (java.lang.Double newMaterialcosts ) {
	 	this.materialcosts = newMaterialcosts;
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
        return "BillOrder";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}