package com.ding.cms.entity;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.Column;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.Entity;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.GeneratedValue;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.Id;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.Stragegy;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.Table;
@Entity(namespace = "dingCMS",name = "BillDeal")
@Table(name = "bill_deal")
public class CustomerListEntity extends BillDeal{
	
 	@Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "billid")
    private java.lang.String billid;
	
	//客户基础信息
    @Column(name = "customerid")
    private java.lang.String customerid;
    @Column(name = "name")
    private java.lang.String name;
    @Column(name = "sex")
    private java.lang.Integer sex;
    @Column(name = "phone")
    private java.lang.String phone;
    @Column(name = "sourcetype")
    private java.lang.String sourcetype;
    @Column(name = "sourcetype1")
    private java.lang.String sourcetype1;
//    @Column(name = "address")
//    private java.lang.String address;
    @Column(name = "linkman")
    private java.lang.String linkman;
    @Column(name = "linkphone")
    private java.lang.String linkphone;
    
    //房屋信息
    @Column(name = "houseid")
    private java.lang.String houseid;
    @Column(name = "province")
    private java.lang.String province;
    @Column(name = "city")
    private java.lang.String city;
    @Column(name = "district")
    private java.lang.String district;
    @Column(name = "address")
    private java.lang.String address;
    @Column(name = "type")
    private java.lang.String type;
    @Column(name = "part")
    private java.lang.String part;
    @Column(name = "reason")
    private java.lang.String reason;
    @Column(name = "area")
    private java.lang.Double area;
    
    
    //交易信息
    @Column(name = "vbillcode")
    private java.lang.String vbillcode;
    //订单 施工信息
    @Column(name = "surveydate")
    private java.lang.String surveydate;
    @Column(name = "issurvey")
    private java.lang.String issurvey;
    @Column(name = "community")
    private java.lang.String community;
    @Column(name = "service_createtime")
    private String createtime1;
    @Column(name = "createdate")
    private String createdate;
    @Column(name = "sourcetype0")
    private java.lang.String sourcetype0;
    
	public java.lang.String getSourcetype0() {
		return sourcetype0;
	}


	public void setSourcetype0(java.lang.String sourcetype0) {
		this.sourcetype0 = sourcetype0;
	}


	public String getCreatedate() {
		return createdate;
	}


	public void setCreatedate(String createdate) {
		this.createdate = createdate;
	}


	public String getCreatetime1() {
		return createtime1;
	}


	public void setCreatetime1(String createtime1) {
		this.createtime1 = createtime1;
	}


	public java.lang.String getCommunity() {
		return community;
	}


	public void setCommunity(java.lang.String community) {
		this.community = community;
	}

	//交易 跟进信息
    private String followdate;
    private String follownote;

    
    
	public java.lang.String getVbillcode() {
		return vbillcode;
	}


	public void setVbillcode(java.lang.String vbillcode) {
		this.vbillcode = vbillcode;
	}


	public String getFollowdate() {
		return followdate;
	}


	public void setFollowdate(String followdate) {
		this.followdate = followdate;
	}


	public String getFollownote() {
		return follownote;
	}


	public void setFollownote(String follownote) {
		this.follownote = follownote;
	}


	public String getIssurvey() {
		return issurvey;
	}


	public void setIssurvey(String issurvey) {
		this.issurvey = issurvey;
	}


	public java.lang.String getBillid() {
		return billid;
	}


	public void setBillid(java.lang.String billid) {
		this.billid = billid;
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


	public java.lang.Integer getSex() {
		return sex;
	}


	public void setSex(java.lang.Integer sex) {
		this.sex = sex;
	}


	public java.lang.String getPhone() {
		return phone;
	}


	public void setPhone(java.lang.String phone) {
		this.phone = phone;
	}


	public java.lang.String getSourcetype() {
		return sourcetype;
	}


	public void setSourcetype(java.lang.String sourcetype) {
		this.sourcetype = sourcetype;
	}


	public java.lang.String getSourcetype1() {
		return sourcetype1;
	}


	public void setSourcetype1(java.lang.String sourcetype1) {
		this.sourcetype1 = sourcetype1;
	}


	public java.lang.String getHouseid() {
		return houseid;
	}


	public void setHouseid(java.lang.String houseid) {
		this.houseid = houseid;
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


	public java.lang.String getAddress() {
		return address;
	}


	public void setAddress(java.lang.String address) {
		this.address = address;
	}


	public java.lang.String getType() {
		return type;
	}


	public void setType(java.lang.String type) {
		this.type = type;
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


	public java.lang.String getReason() {
		return reason;
	}


	public void setReason(java.lang.String reason) {
		this.reason = reason;
	}


	public String getSurveydate() {
		return surveydate;
	}


	public void setSurveydate(String surveyDate) {
		this.surveydate = surveyDate;
	}


	public java.lang.String getLinkman() {
		return linkman;
	}


	public void setLinkman(java.lang.String linkman) {
		this.linkman = linkman;
	}


	public java.lang.String getLinkphone() {
		return linkphone;
	}


	public void setLinkphone(java.lang.String linkphone) {
		this.linkphone = linkphone;
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
