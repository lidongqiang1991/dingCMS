package com.ding.cms.entity;

import com.yonyou.iuap.persistence.jdbc.framework.annotation.Column;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.Entity;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.GeneratedValue;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.Id;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.Stragegy;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.Table;

import java.util.Date;

@Entity(namespace = "dingCMS",name = "BillService")
@Table(name = "bill_service")
public class ServiceListEntity extends BillService{
	
	@Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "serviceid")
    private java.lang.String serviceid;
	
    private java.lang.String servicecode;
    private java.lang.String orgname;
    private java.lang.String orgid;
    private java.lang.String agentname;      
    private java.lang.String agentid;
    private java.lang.String dealid;
    private java.lang.Double totalamount;
    private java.lang.Double paidamount;
    private java.lang.Integer materialstate;
    private java.lang.Integer servicestate;
    private java.lang.Integer constructionstate;
    private java.lang.Integer paystate;
    private java.lang.String username;
    private java.lang.String userid;
    private java.lang.String surveyname;
    private java.lang.String surveyid;
    private java.lang.String constructionname;
    private java.lang.String constructionid;
    private java.lang.String supervisor;
    private java.lang.String supervisorid;
    private java.lang.String note;
    private java.lang.String creator;
    private java.lang.String createtime;
    private java.lang.String modifier;
    private java.lang.String modifytime;
    
    //客户基础信息
 	
    private java.lang.String customerid;
    private java.lang.String name;
    private java.lang.String phone;
    
    //房屋信息
    private java.lang.String houseid;
    private java.lang.String province;
    private java.lang.String city;
    private java.lang.String district;
    private java.lang.String address;
    private java.lang.String part;
    private java.lang.Double area;
   
    
	//交易信息
    private java.lang.String surveydate;
    private java.lang.String community;

    //当前进行工序
    private java.lang.String currentProcedure;
    
    //补加创建时间
    @Column(name = "dealcreatetime")
    private java.lang.String dealcreatetime;
   
    @Column(name = "ordercreatetime")
    private java.lang.String ordercreatetime;
    @Column(name = "evaluatetime")
	private Date evaluatetime;
    //打分
    private String values;
    @Column(name = "sourcetype0")
    private java.lang.String sourcetype0;
    
	public java.lang.String getSourcetype0() {
		return sourcetype0;
	}


	public void setSourcetype0(java.lang.String sourcetype0) {
		this.sourcetype0 = sourcetype0;
	}
	public String getValues() {
		return values;
	}
	public void setValues(String values) {
		this.values = values;
	}
	public Date getEvaluatetime() {
        return evaluatetime;
    }
    public void setEvaluatetime(Date evaluatetime) {
        this.evaluatetime = evaluatetime;
    }
    public java.lang.String getDealcreatetime() {
		return dealcreatetime;
	}
	public void setDealcreatetime(java.lang.String dealcreatetime) {
		this.dealcreatetime = dealcreatetime;
	}
	public java.lang.String getOrdercreatetime() {
		return ordercreatetime;
	}
	public void setOrdercreatetime(java.lang.String ordercreatetime) {
		this.ordercreatetime = ordercreatetime;
	}
	public java.lang.String getCurrentProcedure() {
		return currentProcedure;
	}
	public void setCurrentProcedure(java.lang.String currentProcedure) {
		this.currentProcedure = currentProcedure;
	}
    
    public java.lang.String getSurveydate() {
		return surveydate;
	}
	public void setSurveydate(java.lang.String surveydate) {
		this.surveydate = surveydate;
	}
	public java.lang.String getCommunity() {
		return community;
	}
	public void setCommunity(java.lang.String community) {
		this.community = community;
	}
	public java.lang.String getPart() {
		return part;
	}
	public void setPart(java.lang.String part) {
		this.part = part;
	}
	public java.lang.Double getArea() {
		return area;
	}
	public void setArea(java.lang.Double area) {
		this.area = area;
	}
	public java.lang.String getProvince() {
		return province;
	}
	public void setProvince(java.lang.String province) {
		this.province = province;
	}
	public java.lang.String getCity() {
		return city;
	}
	public void setCity(java.lang.String city) {
		this.city = city;
	}
	public java.lang.String getDistrict() {
		return district;
	}
	public void setDistrict(java.lang.String district) {
		this.district = district;
	}

    
	public java.lang.String getServiceid() {
		return serviceid;
	}
	public void setServiceid(java.lang.String serviceid) {
		this.serviceid = serviceid;
	}
	public java.lang.String getServicecode() {
		return servicecode;
	}
	public void setServicecode(java.lang.String servicecode) {
		this.servicecode = servicecode;
	}
	public java.lang.String getOrgname() {
		return orgname;
	}
	public void setOrgname(java.lang.String orgname) {
		this.orgname = orgname;
	}
	public java.lang.String getOrgid() {
		return orgid;
	}
	public void setOrgid(java.lang.String orgid) {
		this.orgid = orgid;
	}
	public java.lang.String getAgentname() {
		return agentname;
	}
	public void setAgentname(java.lang.String agentname) {
		this.agentname = agentname;
	}
	public java.lang.String getAgentid() {
		return agentid;
	}
	public void setAgentid(java.lang.String agentid) {
		this.agentid = agentid;
	}
	public java.lang.String getDealid() {
		return dealid;
	}
	public void setDealid(java.lang.String dealid) {
		this.dealid = dealid;
	}
	public java.lang.Double getTotalamount() {
		return totalamount;
	}
	public void setTotalamount(java.lang.Double totalamount) {
		this.totalamount = totalamount;
	}
	public java.lang.Double getPaidamount() {
		return paidamount;
	}
	public void setPaidamount(java.lang.Double paidamount) {
		this.paidamount = paidamount;
	}
	public java.lang.Integer getMaterialstate() {
		return materialstate;
	}
	public void setMaterialstate(java.lang.Integer materialstate) {
		this.materialstate = materialstate;
	}
	public java.lang.Integer getServicestate() {
		return servicestate;
	}
	public void setServicestate(java.lang.Integer servicestate) {
		this.servicestate = servicestate;
	}
	public java.lang.Integer getConstructionstate() {
		return constructionstate;
	}
	public void setConstructionstate(java.lang.Integer constructionstate) {
		this.constructionstate = constructionstate;
	}
	public java.lang.Integer getPaystate() {
		return paystate;
	}
	public void setPaystate(java.lang.Integer paystate) {
		this.paystate = paystate;
	}
	public java.lang.String getUsername() {
		return username;
	}
	public void setUsername(java.lang.String username) {
		this.username = username;
	}
	public java.lang.String getUserid() {
		return userid;
	}
	public void setUserid(java.lang.String userid) {
		this.userid = userid;
	}
	public java.lang.String getSurveyname() {
		return surveyname;
	}
	public void setSurveyname(java.lang.String surveyname) {
		this.surveyname = surveyname;
	}
	public java.lang.String getSurveyid() {
		return surveyid;
	}
	public void setSurveyid(java.lang.String surveyid) {
		this.surveyid = surveyid;
	}
	public java.lang.String getConstructionname() {
		return constructionname;
	}
	public void setConstructionname(java.lang.String constructionname) {
		this.constructionname = constructionname;
	}
	public java.lang.String getConstructionid() {
		return constructionid;
	}
	public void setConstructionid(java.lang.String constructionid) {
		this.constructionid = constructionid;
	}
	public java.lang.String getSupervisor() {
		return supervisor;
	}
	public void setSupervisor(java.lang.String supervisor) {
		this.supervisor = supervisor;
	}
	public java.lang.String getSupervisorid() {
		return supervisorid;
	}
	public void setSupervisorid(java.lang.String supervisorid) {
		this.supervisorid = supervisorid;
	}
	public java.lang.String getNote() {
		return note;
	}
	public void setNote(java.lang.String note) {
		this.note = note;
	}
	public java.lang.String getCreator() {
		return creator;
	}
	public void setCreator(java.lang.String creator) {
		this.creator = creator;
	}
	public java.lang.String getCreatetime() {
		return createtime;
	}
	public void setCreatetime(java.lang.String createtime) {
		this.createtime = createtime;
	}
	public java.lang.String getModifier() {
		return modifier;
	}
	public void setModifier(java.lang.String modifier) {
		this.modifier = modifier;
	}
	public java.lang.String getModifytime() {
		return modifytime;
	}
	public void setModifytime(java.lang.String modifytime) {
		this.modifytime = modifytime;
	}
	public java.lang.String getCustomerid() {
		return customerid;
	}
	public void setCustomerid(java.lang.String customerid) {
		this.customerid = customerid;
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
	public java.lang.String getHouseid() {
		return houseid;
	}
	public void setHouseid(java.lang.String houseid) {
		this.houseid = houseid;
	}
	public java.lang.String getAddress() {
		return address;
	}
	public void setAddress(java.lang.String address) {
		this.address = address;
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
