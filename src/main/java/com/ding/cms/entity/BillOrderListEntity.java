package com.ding.cms.entity;

import com.yonyou.iuap.persistence.jdbc.framework.annotation.Column;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.Entity;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.GeneratedValue;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.Id;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.Stragegy;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.Table;
@Entity(namespace = "dingCMS",name = "BillOrder")
@Table(name = "bill_order")
public class BillOrderListEntity extends BillOrder{
	
	//客户基础信息
    private java.lang.String customerid;
    private java.lang.String name;
    private java.lang.Integer sex;
    private java.lang.String phone;
    
    //订单信息
    private java.lang.String dealid;
    private java.lang.String vbillcode;
    private java.lang.String dbilldate;
    private java.lang.Integer type;
    private java.lang.Integer state;
    private java.lang.Integer prostate;
    private java.lang.Integer paystate;
    private java.lang.String orgid;
    private java.lang.String orgname;
    private java.lang.String agentid;
    private java.lang.String agentname;
    private java.lang.Double totalmny;
    private java.lang.String productid;
    private java.lang.String product;
    private java.lang.Double price;
    private java.lang.Double num;
    
    //工程信息
    private java.lang.String serviceid;
    private java.lang.String servicecode;

    
	
	public java.lang.String getServicecode() {
		return servicecode;
	}
	public void setServicecode(java.lang.String servicecode) {
		this.servicecode = servicecode;
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
	public java.lang.String getDealid() {
		return dealid;
	}
	public void setDealid(java.lang.String dealid) {
		this.dealid = dealid;
	}
	public java.lang.String getServiceid() {
		return serviceid;
	}
	public void setServiceid(java.lang.String serviceid) {
		this.serviceid = serviceid;
	}
	public java.lang.String getVbillcode() {
		return vbillcode;
	}
	public void setVbillcode(java.lang.String vbillcode) {
		this.vbillcode = vbillcode;
	}
	public java.lang.String getDbilldate() {
		return dbilldate;
	}
	public void setDbilldate(java.lang.String dbilldate) {
		this.dbilldate = dbilldate;
	}
	public java.lang.Integer getType() {
		return type;
	}
	public void setType(java.lang.Integer type) {
		this.type = type;
	}
	public java.lang.Integer getState() {
		return state;
	}
	public void setState(java.lang.Integer state) {
		this.state = state;
	}
	public java.lang.Integer getProstate() {
		return prostate;
	}
	public void setProstate(java.lang.Integer prostate) {
		this.prostate = prostate;
	}
	public java.lang.Integer getPaystate() {
		return paystate;
	}
	public void setPaystate(java.lang.Integer paystate) {
		this.paystate = paystate;
	}
	public java.lang.String getOrgid() {
		return orgid;
	}
	public void setOrgid(java.lang.String orgid) {
		this.orgid = orgid;
	}
	public java.lang.String getOrgname() {
		return orgname;
	}
	public void setOrgname(java.lang.String orgname) {
		this.orgname = orgname;
	}
	public java.lang.String getAgentid() {
		return agentid;
	}
	public void setAgentid(java.lang.String agentid) {
		this.agentid = agentid;
	}
	public java.lang.String getAgentname() {
		return agentname;
	}
	public void setAgentname(java.lang.String agentname) {
		this.agentname = agentname;
	}
	public java.lang.Double getTotalmny() {
		return totalmny;
	}
	public void setTotalmny(java.lang.Double totalmny) {
		this.totalmny = totalmny;
	}
	public java.lang.String getProductid() {
		return productid;
	}
	public void setProductid(java.lang.String productid) {
		this.productid = productid;
	}
	public java.lang.String getProduct() {
		return product;
	}
	public void setProduct(java.lang.String product) {
		this.product = product;
	}
	public java.lang.Double getPrice() {
		return price;
	}
	public void setPrice(java.lang.Double price) {
		this.price = price;
	}
	public java.lang.Double getNum() {
		return num;
	}
	public void setNum(java.lang.Double num) {
		this.num = num;
	}
    
}
