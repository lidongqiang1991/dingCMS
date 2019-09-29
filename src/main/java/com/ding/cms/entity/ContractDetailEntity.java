package com.ding.cms.entity;

import com.yonyou.iuap.persistence.vo.BaseEntity;

public class ContractDetailEntity extends BaseEntity{
	
	
    private String itemname;
    private double num;
    private double price;
    private double amount;
    private String part;
    private int type;
	public String getItemname() {
		return itemname;
	}
	public void setItemname(String itemname) {
		this.itemname = itemname;
	}
	public double getNum() {
		return num;
	}
	public void setNum(double num) {
		this.num = num;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public String getPart() {
		return part;
	}
	public void setPart(String part) {
		this.part = part;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
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
