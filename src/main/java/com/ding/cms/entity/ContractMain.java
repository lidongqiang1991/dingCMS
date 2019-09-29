package com.ding.cms.entity;

import java.util.List;

import com.yonyou.iuap.persistence.jdbc.framework.annotation.Column;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.Entity;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.GeneratedValue;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.Id;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.Stragegy;
import com.yonyou.iuap.persistence.jdbc.framework.annotation.Table;
import com.yonyou.iuap.persistence.vo.BaseEntity;

public class ContractMain extends BaseEntity{
	
	
    private String name;
    private String phone;
    private String  address;
    private double totalamount;
    private String startdate;
	private String user_name;
	private String user_mobile;
	private String clientname;
	public String getClientname() {
		return clientname;
	}
	public void setClientname(String clientname) {
		this.clientname = clientname;
	}
	public String getPostaladdress() {
		return postaladdress;
	}
	public void setPostaladdress(String postaladdress) {
		this.postaladdress = postaladdress;
	}
	public String getIdnumber() {
		return idnumber;
	}
	public void setIdnumber(String idnumber) {
		this.idnumber = idnumber;
	}

	private String postaladdress;
	private String idnumber;
	public String part;
	public List<ContractDetailEntity> baseDetail;
	public List<ContractDetailEntity> addDetail;
	private String planneddate;
	public String getPlanneddate() {
		return planneddate;
	}
	public void setPlanneddate(String planneddate) {
		this.planneddate = planneddate;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public double getTotalamount() {
		return totalamount;
	}
	public void setTotalamount(double totalamount) {
		this.totalamount = totalamount;
	}
	public String getStartdate() {
		return startdate;
	}
	public void setStartdate(String startdate) {
		this.startdate = startdate;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getUser_mobile() {
		return user_mobile;
	}
	public void setUser_mobile(String user_mobile) {
		this.user_mobile = user_mobile;
	}
	public String getPart() {
		return part;
	}
	public void setPart(String part) {
		this.part = part;
	}
	public List<ContractDetailEntity> getBaseDetail() {
		return baseDetail;
	}
	public void setBaseDetail(List<ContractDetailEntity> baseDetail) {
		this.baseDetail = baseDetail;
	}
	public List<ContractDetailEntity> getAddDetail() {
		return addDetail;
	}
	public void setAddDetail(List<ContractDetailEntity> addDetail) {
		this.addDetail = addDetail;
	}
	
    @Override
    public String getMetaDefinedName() {
        return "Agent";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}
