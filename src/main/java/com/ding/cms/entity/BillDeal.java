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
 *  创建日期:2018-11-30
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "BillDeal")
@Table(name = "bill_deal")
public class BillDeal extends BaseEntity{
	
	public static final int DEAL_STATE_01=0;//待确认
	public static final int DEAL_STATE_02=1;//待分配
	public static final int DEAL_STATE_03=2;//已分配
	public static final int DEAL_STATE_04=3;//已结束
	public static final int DEAL_STATE_05=4;//待回访
	public static final int DEAL_STATE_06=5;//已回访
	public static final int DEAL_STATE_07=6;//已关闭
	public static final int DEAL_STATE_08=10;//已删除
	
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "billid")
    private java.lang.String billid;
      
    @Column(name = "vbillcode")
    private java.lang.String vbillcode;
      
    @Column(name = "dbilldate")
    private java.lang.String dbilldate;
      
    @Column(name = "state")
    private java.lang.Integer state;
      
    @Column(name = "paystate")
    private java.lang.Integer paystate;
      
    @Column(name = "sourcetype")
    private java.lang.String sourcetype;
      
    @Column(name = "customerid")
    private java.lang.String customerid;
      
    @Column(name = "customer")
    private java.lang.String customer;
      
    @Column(name = "houseid")
    private java.lang.String houseid;
      
    @Column(name = "community")
    private java.lang.String community;
      
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
      
    @Column(name = "payment")
    private java.lang.Double payment;
      
    @Column(name = "contract")
    private java.lang.String contract;
      
    @Column(name = "picc")
    private java.lang.String picc;
      
    @Column(name = "ownerid")
    private java.lang.String ownerid;
      
    @Column(name = "owner")
    private java.lang.String owner;
      
    @Column(name = "surveydate")
    private java.lang.String surveydate;
      
    @Column(name = "issurvey")
    private java.lang.String issurvey;
      
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
    
    @Column(name = "nps")
    private java.lang.Double nps;
    @Column(name = "referrerid")
    private java.lang.String referrerid;
    @Column(name = "referrer")
    private java.lang.String referrer;
    @Column(name = "referrerphone")
    private java.lang.String referrerphone;
    @Column(name="lifestages")
    private Integer lifestages;
    @Column(name="jobid")
    private String jobid;
    @Column(name="rootoid")
    private String rootoid;
    @Column(name="tid")
    private String tid;
	public String getTid() {
		return tid;
	}

	public void setTid(String tid) {
		this.tid = tid;
	}

	public String getRootoid() {
		return rootoid;
	}

	public void setRootoid(String rootoid) {
		this.rootoid = rootoid;
	}

	public String getJobid() {
		return jobid;
	}

	public void setJobid(String jobid) {
		this.jobid = jobid;
	}

	public Integer getLifestages() {
		return lifestages;
	}

	public void setLifestages(Integer lifestages) {
		this.lifestages = lifestages;
	}

	public java.lang.String getReferrerid() {
		return referrerid;
	}

	public void setReferrerid(java.lang.String referrerid) {
		this.referrerid = referrerid;
	}

	public java.lang.String getReferrer() {
		return referrer;
	}

	public void setReferrer(java.lang.String referrer) {
		this.referrer = referrer;
	}

	public java.lang.String getReferrerphone() {
		return referrerphone;
	}

	public void setReferrerphone(java.lang.String referrerphone) {
		this.referrerphone = referrerphone;
	}

	public java.lang.Double getNps() {
		return nps;
	}

	public void setNps(java.lang.Double nps) {
		this.nps = nps;
	}

	@Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
	

	/**
	 * 属性 billid的Getter方法.属性名：单据主键
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getBillid () {
		return billid;
	}
	   
	/**
	 * 属性billid的Setter方法.属性名：单据主键
	 * 创建日期:2018-11-30
	 * @param newBillid java.lang.String
	 */
	public void setBillid (java.lang.String newBillid ) {
	 	this.billid = newBillid;
	} 	 
	
	/**
	 * 属性 vbillcode的Getter方法.属性名：交易编号
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getVbillcode () {
		return vbillcode;
	}
	   
	/**
	 * 属性vbillcode的Setter方法.属性名：交易编号
	 * 创建日期:2018-11-30
	 * @param newVbillcode java.lang.String
	 */
	public void setVbillcode (java.lang.String newVbillcode ) {
	 	this.vbillcode = newVbillcode;
	} 	 
	
	/**
	 * 属性 dbilldate的Getter方法.属性名：日期
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getDbilldate () {
		return dbilldate;
	}
	   
	/**
	 * 属性dbilldate的Setter方法.属性名：日期
	 * 创建日期:2018-11-30
	 * @param newDbilldate java.lang.String
	 */
	public void setDbilldate (java.lang.String newDbilldate ) {
	 	this.dbilldate = newDbilldate;
	} 	 
	
	/**
	 * 属性 state的Getter方法.属性名：交易状态
	 *  创建日期:2018-11-30
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getState () {
		return state;
	}
	   
	/**
	 * 属性state的Setter方法.属性名：交易状态
	 * 创建日期:2018-11-30
	 * @param newState java.lang.Integer
	 */
	public void setState (java.lang.Integer newState ) {
	 	this.state = newState;
	} 	 
	
	/**
	 * 属性 paystate的Getter方法.属性名：支付状态
	 *  创建日期:2018-11-30
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getPaystate () {
		return paystate;
	}
	   
	/**
	 * 属性paystate的Setter方法.属性名：支付状态
	 * 创建日期:2018-11-30
	 * @param newPaystate java.lang.Integer
	 */
	public void setPaystate (java.lang.Integer newPaystate ) {
	 	this.paystate = newPaystate;
	} 	 
	
	/**
	 * 属性 sourcetype的Getter方法.属性名：来源
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getSourcetype () {
		return sourcetype;
	}
	   
	/**
	 * 属性sourcetype的Setter方法.属性名：来源
	 * 创建日期:2018-11-30
	 * @param newSourcetype java.lang.String
	 */
	public void setSourcetype (java.lang.String newSourcetype ) {
	 	this.sourcetype = newSourcetype;
	} 	 
	
	/**
	 * 属性 customerid的Getter方法.属性名：客户id
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getCustomerid () {
		return customerid;
	}
	   
	/**
	 * 属性customerid的Setter方法.属性名：客户id
	 * 创建日期:2018-11-30
	 * @param newCustomerid java.lang.String
	 */
	public void setCustomerid (java.lang.String newCustomerid ) {
	 	this.customerid = newCustomerid;
	} 	 
	
	/**
	 * 属性 customer的Getter方法.属性名：客户
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getCustomer () {
		return customer;
	}
	   
	/**
	 * 属性customer的Setter方法.属性名：客户
	 * 创建日期:2018-11-30
	 * @param newCustomer java.lang.String
	 */
	public void setCustomer (java.lang.String newCustomer ) {
	 	this.customer = newCustomer;
	} 	 
	
	/**
	 * 属性 houseid的Getter方法.属性名：房屋id
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getHouseid () {
		return houseid;
	}
	   
	/**
	 * 属性houseid的Setter方法.属性名：房屋id
	 * 创建日期:2018-11-30
	 * @param newHouseid java.lang.String
	 */
	public void setHouseid (java.lang.String newHouseid ) {
	 	this.houseid = newHouseid;
	} 	 
	
	/**
	 * 属性 community的Getter方法.属性名：小区
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getCommunity () {
		return community;
	}
	   
	/**
	 * 属性community的Setter方法.属性名：小区
	 * 创建日期:2018-11-30
	 * @param newCommunity java.lang.String
	 */
	public void setCommunity (java.lang.String newCommunity ) {
	 	this.community = newCommunity;
	} 	 
	
	/**
	 * 属性 orgid的Getter方法.属性名：运营中心id
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getOrgid () {
		return orgid;
	}
	   
	/**
	 * 属性orgid的Setter方法.属性名：运营中心id
	 * 创建日期:2018-11-30
	 * @param newOrgid java.lang.String
	 */
	public void setOrgid (java.lang.String newOrgid ) {
	 	this.orgid = newOrgid;
	} 	 
	
	/**
	 * 属性 orgname的Getter方法.属性名：运营中心
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getOrgname () {
		return orgname;
	}
	   
	/**
	 * 属性orgname的Setter方法.属性名：运营中心
	 * 创建日期:2018-11-30
	 * @param newOrgname java.lang.String
	 */
	public void setOrgname (java.lang.String newOrgname ) {
	 	this.orgname = newOrgname;
	} 	 
	
	/**
	 * 属性 agentid的Getter方法.属性名：区域运营商id
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getAgentid () {
		return agentid;
	}
	   
	/**
	 * 属性agentid的Setter方法.属性名：区域运营商id
	 * 创建日期:2018-11-30
	 * @param newAgentid java.lang.String
	 */
	public void setAgentid (java.lang.String newAgentid ) {
	 	this.agentid = newAgentid;
	} 	 
	
	/**
	 * 属性 agentname的Getter方法.属性名：区域运营商
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getAgentname () {
		return agentname;
	}
	   
	/**
	 * 属性agentname的Setter方法.属性名：区域运营商
	 * 创建日期:2018-11-30
	 * @param newAgentname java.lang.String
	 */
	public void setAgentname (java.lang.String newAgentname ) {
	 	this.agentname = newAgentname;
	} 	 
	
	/**
	 * 属性 totalmny的Getter方法.属性名：交易金额
	 *  创建日期:2018-11-30
	 * @return java.lang.Double
	 */
	public java.lang.Double getTotalmny () {
		return totalmny;
	}
	   
	/**
	 * 属性totalmny的Setter方法.属性名：交易金额
	 * 创建日期:2018-11-30
	 * @param newTotalmny java.lang.Double
	 */
	public void setTotalmny (java.lang.Double newTotalmny ) {
	 	this.totalmny = newTotalmny;
	} 	 
	
	/**
	 * 属性 payment的Getter方法.属性名：已支付金额
	 *  创建日期:2018-11-30
	 * @return java.lang.Double
	 */
	public java.lang.Double getPayment () {
		return payment;
	}
	   
	/**
	 * 属性payment的Setter方法.属性名：已支付金额
	 * 创建日期:2018-11-30
	 * @param newPayment java.lang.Double
	 */
	public void setPayment (java.lang.Double newPayment ) {
	 	this.payment = newPayment;
	} 	 
	
	/**
	 * 属性 contract的Getter方法.属性名：合同编号
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getContract () {
		return contract;
	}
	   
	/**
	 * 属性contract的Setter方法.属性名：合同编号
	 * 创建日期:2018-11-30
	 * @param newContract java.lang.String
	 */
	public void setContract (java.lang.String newContract ) {
	 	this.contract = newContract;
	} 	 
	
	/**
	 * 属性 picc的Getter方法.属性名：保单编号
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getPicc () {
		return picc;
	}
	   
	/**
	 * 属性picc的Setter方法.属性名：保单编号
	 * 创建日期:2018-11-30
	 * @param newPicc java.lang.String
	 */
	public void setPicc (java.lang.String newPicc ) {
	 	this.picc = newPicc;
	} 	 
	
	/**
	 * 属性 ownerid的Getter方法.属性名：负责人id
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getOwnerid () {
		return ownerid;
	}
	   
	/**
	 * 属性ownerid的Setter方法.属性名：负责人id
	 * 创建日期:2018-11-30
	 * @param newOwnerid java.lang.String
	 */
	public void setOwnerid (java.lang.String newOwnerid ) {
	 	this.ownerid = newOwnerid;
	} 	 
	
	/**
	 * 属性 owner的Getter方法.属性名：负责人
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getOwner () {
		return owner;
	}
	   
	/**
	 * 属性owner的Setter方法.属性名：负责人
	 * 创建日期:2018-11-30
	 * @param newOwner java.lang.String
	 */
	public void setOwner (java.lang.String newOwner ) {
	 	this.owner = newOwner;
	} 	 
	
	/**
	 * 属性 surveydate的Getter方法.属性名：勘察时间
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getSurveydate () {
		return surveydate;
	}
	   
	/**
	 * 属性surveydate的Setter方法.属性名：勘察时间
	 * 创建日期:2018-11-30
	 * @param newSurveydate java.lang.String
	 */
	public void setSurveydate (java.lang.String newSurveydate ) {
	 	this.surveydate = newSurveydate;
	} 	 
	
	/**
	 * 属性 issurvey的Getter方法.属性名：是否勘察
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getIssurvey () {
		return issurvey;
	}
	   
	/**
	 * 属性issurvey的Setter方法.属性名：是否勘察
	 * 创建日期:2018-11-30
	 * @param newIssurvey java.lang.String
	 */
	public void setIssurvey (java.lang.String newIssurvey ) {
	 	this.issurvey = newIssurvey;
	} 	 
	
	/**
	 * 属性 creator的Getter方法.属性名：创建人
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getCreator () {
		return creator;
	}
	   
	/**
	 * 属性creator的Setter方法.属性名：创建人
	 * 创建日期:2018-11-30
	 * @param newCreator java.lang.String
	 */
	public void setCreator (java.lang.String newCreator ) {
	 	this.creator = newCreator;
	} 	 
	
	/**
	 * 属性 creatorid的Getter方法.属性名：创建人id
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getCreatorid () {
		return creatorid;
	}
	   
	/**
	 * 属性creatorid的Setter方法.属性名：创建人id
	 * 创建日期:2018-11-30
	 * @param newCreatorid java.lang.String
	 */
	public void setCreatorid (java.lang.String newCreatorid ) {
	 	this.creatorid = newCreatorid;
	} 	 
	
	/**
	 * 属性 createtime的Getter方法.属性名：创建时间
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getCreatetime () {
		return createtime;
	}
	   
	/**
	 * 属性createtime的Setter方法.属性名：创建时间
	 * 创建日期:2018-11-30
	 * @param newCreatetime java.lang.String
	 */
	public void setCreatetime (java.lang.String newCreatetime ) {
	 	this.createtime = newCreatetime;
	} 	 
	
	/**
	 * 属性 modifier的Getter方法.属性名：修改人
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getModifier () {
		return modifier;
	}
	   
	/**
	 * 属性modifier的Setter方法.属性名：修改人
	 * 创建日期:2018-11-30
	 * @param newModifier java.lang.String
	 */
	public void setModifier (java.lang.String newModifier ) {
	 	this.modifier = newModifier;
	} 	 
	
	/**
	 * 属性 modifierid的Getter方法.属性名：修改人id
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getModifierid () {
		return modifierid;
	}
	   
	/**
	 * 属性modifierid的Setter方法.属性名：修改人id
	 * 创建日期:2018-11-30
	 * @param newModifierid java.lang.String
	 */
	public void setModifierid (java.lang.String newModifierid ) {
	 	this.modifierid = newModifierid;
	} 	 
	
	/**
	 * 属性 modifytime的Getter方法.属性名：修改时间
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getModifytime () {
		return modifytime;
	}
	   
	/**
	 * 属性modifytime的Setter方法.属性名：修改时间
	 * 创建日期:2018-11-30
	 * @param newModifytime java.lang.String
	 */
	public void setModifytime (java.lang.String newModifytime ) {
	 	this.modifytime = newModifytime;
	} 	 
	
	/**
	 * 属性 memo的Getter方法.属性名：备注
	 *  创建日期:2018-11-30
	 * @return java.lang.String
	 */
	public java.lang.String getMemo () {
		return memo;
	}
	   
	/**
	 * 属性memo的Setter方法.属性名：备注
	 * 创建日期:2018-11-30
	 * @param newMemo java.lang.String
	 */
	public void setMemo (java.lang.String newMemo ) {
	 	this.memo = newMemo;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2018-11-30
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2018-11-30
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2018-11-30
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2018-11-30
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "BillDeal";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}