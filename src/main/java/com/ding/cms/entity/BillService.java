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
 *  创建日期:2018-11-8
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "BillService")
@Table(name = "bill_service")
public class BillService extends BaseEntity{
	
	public static final double DEFAULTTOTALAMOUNT = 0.00;
	public static final double DEFAULTPAIDAMOUNT = 0.00;
	public static final int SERVICE_STATE_01=0;//未开工
	public static final int SERVICE_STATE_02=1;//施工中
	public static final int SERVICE_STATE_03=2;//已完工
	public static final int SERVICE_STATE_04=-2;//不需要上门
	public static final int SERVICE_STATE_05=-3;//上门未成交
	
	/**
	 * "1"待分配;"2"已拒绝;"3"已接单;"4"未上门;"5"已上门;"6"已报价;"7"已下单;"8"施工中;'9'在施工
	 */
	public static final String SERVICE_STATUS_01="1";//待分配
	public static final String SERVICE_STATUS_02="2";//已拒绝
	public static final String SERVICE_STATUS_03="3";//已接单
	public static final String SERVICE_STATUS_04="4";//未上门
	public static final String SERVICE_STATUS_05="5";//已上门
	public static final String SERVICE_STATUS_06="6";//已报价
	public static final String SERVICE_STATUS_07="7";//已下单
	public static final String SERVICE_STATUS_08="8";//施工中
	public static final String SERVICE_STATUS_09="9";//在施工
	
	
	/**
	 * 物料调配状态
	 */
	public static final int MATERIAL_STATE_01=1;
	/**
	 * 分配状态，未分配
	 */
	public static final int ALLOTUSER_State_01 = 0;//分配状态，未分配
	/**
	 * 分配状态，已分配，未接受
	 */
	public static final int ALLOTUSER_State_02 = 1;//分配状态，已分配，未接受
	/**
	 * 分配状态，已分配，已接受
	 */
	public static final int ALLOTUSER_State_03 = 2;//分配状态，已分配，已接受
	/**
	 * 分配状态，已分配，拒绝接受
	 */
	public static final int ALLOTUSER_State_04 = 3;//分配状态，已分配，拒绝接受
	/**
	 * 支付状态，
	 * SERVICE_PAYSTATE_01: 未支付
	 * SERVICE_PAYSTATE_02: 定金已支付
	 * SERVICE_PAYSTATE_03: 全额已支付
	 */
	public static final int SERVICE_PAYSTATE_01 = 0;//支付状态，未支付
	public static final int SERVICE_PAYSTATE_02 = 1;//支付状态，定金已支付
	public static final int SERVICE_PAYSTATE_03 = 2;//支付状态，全额已支付
	
	
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "billid")
    private java.lang.String billid;
      
    @Column(name = "vbillcode")
    private java.lang.String vbillcode;
      
    @Column(name = "dbilldate")
    private java.lang.String dbilldate;
      
    @Column(name = "orgname")
    private java.lang.String orgname;
      
    @Column(name = "orgid")
    private java.lang.String orgid;
      
    @Column(name = "agentname")
    private java.lang.String agentname;
      
    @Column(name = "agentid")
    private java.lang.String agentid;
      
    @Column(name = "dealid")
    private java.lang.String dealid;
      
    @Column(name = "customerid")
    private java.lang.String customerid;
      
    @Column(name = "houseid")
    private java.lang.String houseid;
      
    @Column(name = "totalamount")
    private java.lang.Double totalamount;
      
    @Column(name = "paidamount")
    private java.lang.Double paidamount;
      
    @Column(name = "materialstate")
    private java.lang.Integer materialstate;
      
    @Column(name = "servicestate")
    private java.lang.Integer servicestate;
      
    @Column(name = "paystate")
    private java.lang.Integer paystate;
      
    @Column(name = "contractstate")
    private java.lang.Integer contractstate;
      
    @Column(name = "startdate")
    private java.lang.String startdate;
      
    @Column(name = "planneddate")
    private java.lang.String planneddate;
      
    @Column(name = "enddate")
    private java.lang.String enddate;
      
    @Column(name = "procedureid")
    private java.lang.String procedureid;
      
    @Column(name = "procedurename")
    private java.lang.String procedurename;
      
    @Column(name = "servername")
    private java.lang.String servername;
      
    @Column(name = "serverid")
    private java.lang.String serverid;
      
    @Column(name = "serverstate")
    private java.lang.Integer serverstate;
      
    @Column(name = "surveyname")
    private java.lang.String surveyname;
      
    @Column(name = "surveyid")
    private java.lang.String surveyid;
      
    @Column(name = "surveystate")
    private java.lang.Integer surveystate;
      
    @Column(name = "constructionname")
    private java.lang.String constructionname;
      
    @Column(name = "constructionid")
    private java.lang.String constructionid;
      
    @Column(name = "constructionstate")
    private java.lang.Integer constructionstate;
      
    @Column(name = "supervisor")
    private java.lang.String supervisor;
      
    @Column(name = "supervisorid")
    private java.lang.String supervisorid;
      
    @Column(name = "supervisorstate")
    private java.lang.Integer supervisorstate;
      
    @Column(name = "note")
    private java.lang.String note;
      
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
      
    @Column(name = "servicecharge")
    private java.lang.Double servicecharge;
      
    @Column(name = "materialcosts")
    private java.lang.Double materialcosts;
      
    @Column(name = "orgstate")
    private java.lang.Integer orgstate;
      
    @Column(name = "agentstate")
    private java.lang.Integer agentstate;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
    @OneToMany(targetEntity = com.ding.cms.entity.BillServiceProcedure.class)
    private java.util.List<com.ding.cms.entity.BillServiceProcedure> id_serviceprocedure;
	

	/**
	 * 属性 billid的Getter方法.属性名：主键
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getBillid () {
		return billid;
	}
	   
	/**
	 * 属性billid的Setter方法.属性名：主键
	 * 创建日期:2018-11-8
	 * @param newBillid java.lang.String
	 */
	public void setBillid (java.lang.String newBillid ) {
	 	this.billid = newBillid;
	} 	 
	
	/**
	 * 属性 vbillcode的Getter方法.属性名：工程编号
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getVbillcode () {
		return vbillcode;
	}
	   
	/**
	 * 属性vbillcode的Setter方法.属性名：工程编号
	 * 创建日期:2018-11-8
	 * @param newVbillcode java.lang.String
	 */
	public void setVbillcode (java.lang.String newVbillcode ) {
	 	this.vbillcode = newVbillcode;
	} 	 
	
	/**
	 * 属性 dbilldate的Getter方法.属性名：单据日期
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getDbilldate () {
		return dbilldate;
	}
	   
	/**
	 * 属性dbilldate的Setter方法.属性名：单据日期
	 * 创建日期:2018-11-8
	 * @param newDbilldate java.lang.String
	 */
	public void setDbilldate (java.lang.String newDbilldate ) {
	 	this.dbilldate = newDbilldate;
	} 	 
	
	/**
	 * 属性 orgname的Getter方法.属性名：组织
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getOrgname () {
		return orgname;
	}
	   
	/**
	 * 属性orgname的Setter方法.属性名：组织
	 * 创建日期:2018-11-8
	 * @param newOrgname java.lang.String
	 */
	public void setOrgname (java.lang.String newOrgname ) {
	 	this.orgname = newOrgname;
	} 	 
	
	/**
	 * 属性 orgid的Getter方法.属性名：组织id
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getOrgid () {
		return orgid;
	}
	   
	/**
	 * 属性orgid的Setter方法.属性名：组织id
	 * 创建日期:2018-11-8
	 * @param newOrgid java.lang.String
	 */
	public void setOrgid (java.lang.String newOrgid ) {
	 	this.orgid = newOrgid;
	} 	 
	
	/**
	 * 属性 agentname的Getter方法.属性名：运营商
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getAgentname () {
		return agentname;
	}
	   
	/**
	 * 属性agentname的Setter方法.属性名：运营商
	 * 创建日期:2018-11-8
	 * @param newAgentname java.lang.String
	 */
	public void setAgentname (java.lang.String newAgentname ) {
	 	this.agentname = newAgentname;
	} 	 
	
	/**
	 * 属性 agentid的Getter方法.属性名：运营商id
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getAgentid () {
		return agentid;
	}
	   
	/**
	 * 属性agentid的Setter方法.属性名：运营商id
	 * 创建日期:2018-11-8
	 * @param newAgentid java.lang.String
	 */
	public void setAgentid (java.lang.String newAgentid ) {
	 	this.agentid = newAgentid;
	} 	 
	
	/**
	 * 属性 dealid的Getter方法.属性名：交易id
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getDealid () {
		return dealid;
	}
	   
	/**
	 * 属性dealid的Setter方法.属性名：交易id
	 * 创建日期:2018-11-8
	 * @param newDealid java.lang.String
	 */
	public void setDealid (java.lang.String newDealid ) {
	 	this.dealid = newDealid;
	} 	 
	
	/**
	 * 属性 customerid的Getter方法.属性名：客户id
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getCustomerid () {
		return customerid;
	}
	   
	/**
	 * 属性customerid的Setter方法.属性名：客户id
	 * 创建日期:2018-11-8
	 * @param newCustomerid java.lang.String
	 */
	public void setCustomerid (java.lang.String newCustomerid ) {
	 	this.customerid = newCustomerid;
	} 	 
	
	/**
	 * 属性 houseid的Getter方法.属性名：房屋id
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getHouseid () {
		return houseid;
	}
	   
	/**
	 * 属性houseid的Setter方法.属性名：房屋id
	 * 创建日期:2018-11-8
	 * @param newHouseid java.lang.String
	 */
	public void setHouseid (java.lang.String newHouseid ) {
	 	this.houseid = newHouseid;
	} 	 
	
	/**
	 * 属性 totalamount的Getter方法.属性名：工程总金额
	 *  创建日期:2018-11-8
	 * @return java.lang.Double
	 */
	public java.lang.Double getTotalamount () {
		return totalamount;
	}
	   
	/**
	 * 属性totalamount的Setter方法.属性名：工程总金额
	 * 创建日期:2018-11-8
	 * @param newTotalamount java.lang.Double
	 */
	public void setTotalamount (java.lang.Double newTotalamount ) {
	 	this.totalamount = newTotalamount;
	} 	 
	
	/**
	 * 属性 paidamount的Getter方法.属性名：已支付金额
	 *  创建日期:2018-11-8
	 * @return java.lang.Double
	 */
	public java.lang.Double getPaidamount () {
		return paidamount;
	}
	   
	/**
	 * 属性paidamount的Setter方法.属性名：已支付金额
	 * 创建日期:2018-11-8
	 * @param newPaidamount java.lang.Double
	 */
	public void setPaidamount (java.lang.Double newPaidamount ) {
	 	this.paidamount = newPaidamount;
	} 	 
	
	/**
	 * 属性 materialstate的Getter方法.属性名：物料调配状态
	 *  创建日期:2018-11-8
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getMaterialstate () {
		return materialstate;
	}
	   
	/**
	 * 属性materialstate的Setter方法.属性名：物料调配状态
	 * 创建日期:2018-11-8
	 * @param newMaterialstate java.lang.Integer
	 */
	public void setMaterialstate (java.lang.Integer newMaterialstate ) {
	 	this.materialstate = newMaterialstate;
	} 	 
	
	/**
	 * 属性 servicestate的Getter方法.属性名：工程服务状态
	 *  创建日期:2018-11-8
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getServicestate () {
		return servicestate;
	}
	   
	/**
	 * 属性servicestate的Setter方法.属性名：工程服务状态
	 * 创建日期:2018-11-8
	 * @param newServicestate java.lang.Integer
	 */
	public void setServicestate (java.lang.Integer newServicestate ) {
	 	this.servicestate = newServicestate;
	} 	 
	
	/**
	 * 属性 paystate的Getter方法.属性名：支付状态
	 *  创建日期:2018-11-8
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getPaystate () {
		return paystate;
	}
	   
	/**
	 * 属性paystate的Setter方法.属性名：支付状态
	 * 创建日期:2018-11-8
	 * @param newPaystate java.lang.Integer
	 */
	public void setPaystate (java.lang.Integer newPaystate ) {
	 	this.paystate = newPaystate;
	} 	 
	
	/**
	 * 属性 contractstate的Getter方法.属性名：合同状态
	 *  创建日期:2018-11-8
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getContractstate () {
		return contractstate;
	}
	   
	/**
	 * 属性contractstate的Setter方法.属性名：合同状态
	 * 创建日期:2018-11-8
	 * @param newContractstate java.lang.Integer
	 */
	public void setContractstate (java.lang.Integer newContractstate ) {
	 	this.contractstate = newContractstate;
	} 	 
	
	/**
	 * 属性 startdate的Getter方法.属性名：开工日期
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getStartdate () {
		return startdate;
	}
	   
	/**
	 * 属性startdate的Setter方法.属性名：开工日期
	 * 创建日期:2018-11-8
	 * @param newStartdate java.lang.String
	 */
	public void setStartdate (java.lang.String newStartdate ) {
	 	this.startdate = newStartdate;
	} 	 
	
	/**
	 * 属性 planneddate的Getter方法.属性名：计划工期
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getPlanneddate () {
		return planneddate;
	}
	   
	/**
	 * 属性planneddate的Setter方法.属性名：计划工期
	 * 创建日期:2018-11-8
	 * @param newPlanneddate java.lang.String
	 */
	public void setPlanneddate (java.lang.String newPlanneddate ) {
	 	this.planneddate = newPlanneddate;
	} 	 
	
	/**
	 * 属性 enddate的Getter方法.属性名：结束日期
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getEnddate () {
		return enddate;
	}
	   
	/**
	 * 属性enddate的Setter方法.属性名：结束日期
	 * 创建日期:2018-11-8
	 * @param newEnddate java.lang.String
	 */
	public void setEnddate (java.lang.String newEnddate ) {
	 	this.enddate = newEnddate;
	} 	 
	
	/**
	 * 属性 procedureid的Getter方法.属性名：工序id
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getProcedureid () {
		return procedureid;
	}
	   
	/**
	 * 属性procedureid的Setter方法.属性名：工序id
	 * 创建日期:2018-11-8
	 * @param newProcedureid java.lang.String
	 */
	public void setProcedureid (java.lang.String newProcedureid ) {
	 	this.procedureid = newProcedureid;
	} 	 
	
	/**
	 * 属性 procedurename的Getter方法.属性名：工序名称
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getProcedurename () {
		return procedurename;
	}
	   
	/**
	 * 属性procedurename的Setter方法.属性名：工序名称
	 * 创建日期:2018-11-8
	 * @param newProcedurename java.lang.String
	 */
	public void setProcedurename (java.lang.String newProcedurename ) {
	 	this.procedurename = newProcedurename;
	} 	 
	
	/**
	 * 属性 servername的Getter方法.属性名：客服
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getServername () {
		return servername;
	}
	   
	/**
	 * 属性servername的Setter方法.属性名：客服
	 * 创建日期:2018-11-8
	 * @param newServername java.lang.String
	 */
	public void setServername (java.lang.String newServername ) {
	 	this.servername = newServername;
	} 	 
	
	/**
	 * 属性 serverid的Getter方法.属性名：客服id
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getServerid () {
		return serverid;
	}
	   
	/**
	 * 属性serverid的Setter方法.属性名：客服id
	 * 创建日期:2018-11-8
	 * @param newServerid java.lang.String
	 */
	public void setServerid (java.lang.String newServerid ) {
	 	this.serverid = newServerid;
	} 	 
	
	/**
	 * 属性 serverstate的Getter方法.属性名：客服状态
	 *  创建日期:2018-11-8
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getServerstate () {
		return serverstate;
	}
	   
	/**
	 * 属性serverstate的Setter方法.属性名：客服状态
	 * 创建日期:2018-11-8
	 * @param newServerstate java.lang.Integer
	 */
	public void setServerstate (java.lang.Integer newServerstate ) {
	 	this.serverstate = newServerstate;
	} 	 
	
	/**
	 * 属性 surveyname的Getter方法.属性名：勘察
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getSurveyname () {
		return surveyname;
	}
	   
	/**
	 * 属性surveyname的Setter方法.属性名：勘察
	 * 创建日期:2018-11-8
	 * @param newSurveyname java.lang.String
	 */
	public void setSurveyname (java.lang.String newSurveyname ) {
	 	this.surveyname = newSurveyname;
	} 	 
	
	/**
	 * 属性 surveyid的Getter方法.属性名：勘察id
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getSurveyid () {
		return surveyid;
	}
	   
	/**
	 * 属性surveyid的Setter方法.属性名：勘察id
	 * 创建日期:2018-11-8
	 * @param newSurveyid java.lang.String
	 */
	public void setSurveyid (java.lang.String newSurveyid ) {
	 	this.surveyid = newSurveyid;
	} 	 
	
	/**
	 * 属性 surveystate的Getter方法.属性名：勘察状态
	 *  创建日期:2018-11-8
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getSurveystate () {
		return surveystate;
	}
	   
	/**
	 * 属性surveystate的Setter方法.属性名：勘察状态
	 * 创建日期:2018-11-8
	 * @param newSurveystate java.lang.Integer
	 */
	public void setSurveystate (java.lang.Integer newSurveystate ) {
	 	this.surveystate = newSurveystate;
	} 	 
	
	/**
	 * 属性 constructionname的Getter方法.属性名：工队
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getConstructionname () {
		return constructionname;
	}
	   
	/**
	 * 属性constructionname的Setter方法.属性名：工队
	 * 创建日期:2018-11-8
	 * @param newConstructionname java.lang.String
	 */
	public void setConstructionname (java.lang.String newConstructionname ) {
	 	this.constructionname = newConstructionname;
	} 	 
	
	/**
	 * 属性 constructionid的Getter方法.属性名：工队id
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getConstructionid () {
		return constructionid;
	}
	   
	/**
	 * 属性constructionid的Setter方法.属性名：工队id
	 * 创建日期:2018-11-8
	 * @param newConstructionid java.lang.String
	 */
	public void setConstructionid (java.lang.String newConstructionid ) {
	 	this.constructionid = newConstructionid;
	} 	 
	
	/**
	 * 属性 constructionstate的Getter方法.属性名：工人状态
	 *  创建日期:2018-11-8
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getConstructionstate () {
		return constructionstate;
	}
	   
	/**
	 * 属性constructionstate的Setter方法.属性名：工人状态
	 * 创建日期:2018-11-8
	 * @param newConstructionstate java.lang.Integer
	 */
	public void setConstructionstate (java.lang.Integer newConstructionstate ) {
	 	this.constructionstate = newConstructionstate;
	} 	 
	
	/**
	 * 属性 supervisor的Getter方法.属性名：管家
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getSupervisor () {
		return supervisor;
	}
	   
	/**
	 * 属性supervisor的Setter方法.属性名：管家
	 * 创建日期:2018-11-8
	 * @param newSupervisor java.lang.String
	 */
	public void setSupervisor (java.lang.String newSupervisor ) {
	 	this.supervisor = newSupervisor;
	} 	 
	
	/**
	 * 属性 supervisorid的Getter方法.属性名：管家id
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getSupervisorid () {
		return supervisorid;
	}
	   
	/**
	 * 属性supervisorid的Setter方法.属性名：管家id
	 * 创建日期:2018-11-8
	 * @param newSupervisorid java.lang.String
	 */
	public void setSupervisorid (java.lang.String newSupervisorid ) {
	 	this.supervisorid = newSupervisorid;
	} 	 
	
	/**
	 * 属性 supervisorstate的Getter方法.属性名：管家状态
	 *  创建日期:2018-11-8
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getSupervisorstate () {
		return supervisorstate;
	}
	   
	/**
	 * 属性supervisorstate的Setter方法.属性名：管家状态
	 * 创建日期:2018-11-8
	 * @param newSupervisorstate java.lang.Integer
	 */
	public void setSupervisorstate (java.lang.Integer newSupervisorstate ) {
	 	this.supervisorstate = newSupervisorstate;
	} 	 
	
	/**
	 * 属性 note的Getter方法.属性名：备注
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getNote () {
		return note;
	}
	   
	/**
	 * 属性note的Setter方法.属性名：备注
	 * 创建日期:2018-11-8
	 * @param newNote java.lang.String
	 */
	public void setNote (java.lang.String newNote ) {
	 	this.note = newNote;
	} 	 
	
	/**
	 * 属性 creator的Getter方法.属性名：创建人
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getCreator () {
		return creator;
	}
	   
	/**
	 * 属性creator的Setter方法.属性名：创建人
	 * 创建日期:2018-11-8
	 * @param newCreator java.lang.String
	 */
	public void setCreator (java.lang.String newCreator ) {
	 	this.creator = newCreator;
	} 	 
	
	/**
	 * 属性 creatorid的Getter方法.属性名：创建人id
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getCreatorid () {
		return creatorid;
	}
	   
	/**
	 * 属性creatorid的Setter方法.属性名：创建人id
	 * 创建日期:2018-11-8
	 * @param newCreatorid java.lang.String
	 */
	public void setCreatorid (java.lang.String newCreatorid ) {
	 	this.creatorid = newCreatorid;
	} 	 
	
	/**
	 * 属性 createtime的Getter方法.属性名：创建时间
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getCreatetime () {
		return createtime;
	}
	   
	/**
	 * 属性createtime的Setter方法.属性名：创建时间
	 * 创建日期:2018-11-8
	 * @param newCreatetime java.lang.String
	 */
	public void setCreatetime (java.lang.String newCreatetime ) {
	 	this.createtime = newCreatetime;
	} 	 
	
	/**
	 * 属性 modifier的Getter方法.属性名：修改人
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getModifier () {
		return modifier;
	}
	   
	/**
	 * 属性modifier的Setter方法.属性名：修改人
	 * 创建日期:2018-11-8
	 * @param newModifier java.lang.String
	 */
	public void setModifier (java.lang.String newModifier ) {
	 	this.modifier = newModifier;
	} 	 
	
	/**
	 * 属性 modifierid的Getter方法.属性名：修改人id
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getModifierid () {
		return modifierid;
	}
	   
	/**
	 * 属性modifierid的Setter方法.属性名：修改人id
	 * 创建日期:2018-11-8
	 * @param newModifierid java.lang.String
	 */
	public void setModifierid (java.lang.String newModifierid ) {
	 	this.modifierid = newModifierid;
	} 	 
	
	/**
	 * 属性 modifytime的Getter方法.属性名：修改时间
	 *  创建日期:2018-11-8
	 * @return java.lang.String
	 */
	public java.lang.String getModifytime () {
		return modifytime;
	}
	   
	/**
	 * 属性modifytime的Setter方法.属性名：修改时间
	 * 创建日期:2018-11-8
	 * @param newModifytime java.lang.String
	 */
	public void setModifytime (java.lang.String newModifytime ) {
	 	this.modifytime = newModifytime;
	} 	 
	
	/**
	 * 属性 id_serviceprocedure的Getter方法.属性名：id_ServiceProcedure
	 *  创建日期:2018-11-8
	 * @return java.util.List<com.ding.cms.entity.BillServiceProcedure>
	 */
	public java.util.List<com.ding.cms.entity.BillServiceProcedure> getId_serviceprocedure () {
		return id_serviceprocedure;
	}
	   
	/**
	 * 属性id_serviceprocedure的Setter方法.属性名：id_ServiceProcedure
	 * 创建日期:2018-11-8
	 * @param newId_serviceprocedure java.util.List<com.ding.cms.entity.BillServiceProcedure>
	 */
	public void setId_serviceprocedure (java.util.List<com.ding.cms.entity.BillServiceProcedure> newId_serviceprocedure ) {
	 	this.id_serviceprocedure = newId_serviceprocedure;
	} 	 
	
	/**
	 * 属性 servicecharge的Getter方法.属性名：服务费
	 *  创建日期:2018-11-8
	 * @return java.lang.Double
	 */
	public java.lang.Double getServicecharge () {
		return servicecharge;
	}
	   
	/**
	 * 属性servicecharge的Setter方法.属性名：服务费
	 * 创建日期:2018-11-8
	 * @param newServicecharge java.lang.Double
	 */
	public void setServicecharge (java.lang.Double newServicecharge ) {
	 	this.servicecharge = newServicecharge;
	} 	 
	
	/**
	 * 属性 materialcosts的Getter方法.属性名：材料费
	 *  创建日期:2018-11-8
	 * @return java.lang.Double
	 */
	public java.lang.Double getMaterialcosts () {
		return materialcosts;
	}
	   
	/**
	 * 属性materialcosts的Setter方法.属性名：材料费
	 * 创建日期:2018-11-8
	 * @param newMaterialcosts java.lang.Double
	 */
	public void setMaterialcosts (java.lang.Double newMaterialcosts ) {
	 	this.materialcosts = newMaterialcosts;
	} 	 
	
	/**
	 * 属性 orgstate的Getter方法.属性名：运营中心结算状态
	 *  创建日期:2018-11-8
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getOrgstate () {
		return orgstate;
	}
	   
	/**
	 * 属性orgstate的Setter方法.属性名：运营中心结算状态
	 * 创建日期:2018-11-8
	 * @param newOrgstate java.lang.Integer
	 */
	public void setOrgstate (java.lang.Integer newOrgstate ) {
	 	this.orgstate = newOrgstate;
	} 	 
	
	/**
	 * 属性 agentstate的Getter方法.属性名：区域运营商结算状态
	 *  创建日期:2018-11-8
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getAgentstate () {
		return agentstate;
	}
	   
	/**
	 * 属性agentstate的Setter方法.属性名：区域运营商结算状态
	 * 创建日期:2018-11-8
	 * @param newAgentstate java.lang.Integer
	 */
	public void setAgentstate (java.lang.Integer newAgentstate ) {
	 	this.agentstate = newAgentstate;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2018-11-8
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2018-11-8
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2018-11-8
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2018-11-8
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "BillService";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}