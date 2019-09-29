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
 *  创建日期:2019-5-23
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "Agent")
@Table(name = "bd_agent")
public class Agent extends BaseEntity{
	
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "agentid")
    private java.lang.String agentid;
      
    @Column(name = "orgname")
    private java.lang.String orgname;
      
    @Column(name = "orgid")
    private java.lang.String orgid;
      
    @Column(name = "agentcode")
    private java.lang.String agentcode;
      
    @Column(name = "agentname")
    private java.lang.String agentname;
      
    @Column(name = "province")
    private java.lang.String province;
      
    @Column(name = "city")
    private java.lang.String city;
      
    @Column(name = "district")
    private java.lang.String district;
      
    @Column(name = "productlist")
    private java.lang.String productlist;
      
    @Column(name = "owner")
    private java.lang.String owner;
      
    @Column(name = "ownerid")
    private java.lang.String ownerid;
      
    @Column(name = "creator")
    private java.lang.String creator;
      
    @Column(name = "creatorid")
    private java.lang.String creatorid;
      
    @Column(name = "agentmemo")
    private java.lang.String agentmemo;
      
    @Column(name = "createdate")
    private java.lang.String createdate;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	@Column(name = "iswarranty")
	private String iswarranty;
	

	public String getIswarranty() {
		return iswarranty;
	}

	public void setIswarranty(String iswarranty) {
		this.iswarranty = iswarranty;
	}

	/**
	 * 属性 agentid的Getter方法.属性名：主键
	 *  创建日期:2019-5-23
	 * @return java.lang.String
	 */
	public java.lang.String getAgentid () {
		return agentid;
	}
	   
	/**
	 * 属性agentid的Setter方法.属性名：主键
	 * 创建日期:2019-5-23
	 * @param newAgentid java.lang.String
	 */
	public void setAgentid (java.lang.String newAgentid ) {
	 	this.agentid = newAgentid;
	} 	 
	
	/**
	 * 属性 orgname的Getter方法.属性名：所属组织
	 *  创建日期:2019-5-23
	 * @return java.lang.String
	 */
	public java.lang.String getOrgname () {
		return orgname;
	}
	   
	/**
	 * 属性orgname的Setter方法.属性名：所属组织
	 * 创建日期:2019-5-23
	 * @param newOrgname java.lang.String
	 */
	public void setOrgname (java.lang.String newOrgname ) {
	 	this.orgname = newOrgname;
	} 	 
	
	/**
	 * 属性 orgid的Getter方法.属性名：所属组织id
	 *  创建日期:2019-5-23
	 * @return java.lang.String
	 */
	public java.lang.String getOrgid () {
		return orgid;
	}
	   
	/**
	 * 属性orgid的Setter方法.属性名：所属组织id
	 * 创建日期:2019-5-23
	 * @param newOrgid java.lang.String
	 */
	public void setOrgid (java.lang.String newOrgid ) {
	 	this.orgid = newOrgid;
	} 	 
	
	/**
	 * 属性 agentcode的Getter方法.属性名：运营商编号
	 *  创建日期:2019-5-23
	 * @return java.lang.String
	 */
	public java.lang.String getAgentcode () {
		return agentcode;
	}
	   
	/**
	 * 属性agentcode的Setter方法.属性名：运营商编号
	 * 创建日期:2019-5-23
	 * @param newAgentcode java.lang.String
	 */
	public void setAgentcode (java.lang.String newAgentcode ) {
	 	this.agentcode = newAgentcode;
	} 	 
	
	/**
	 * 属性 agentname的Getter方法.属性名：运营商名称
	 *  创建日期:2019-5-23
	 * @return java.lang.String
	 */
	public java.lang.String getAgentname () {
		return agentname;
	}
	   
	/**
	 * 属性agentname的Setter方法.属性名：运营商名称
	 * 创建日期:2019-5-23
	 * @param newAgentname java.lang.String
	 */
	public void setAgentname (java.lang.String newAgentname ) {
	 	this.agentname = newAgentname;
	} 	 
	
	/**
	 * 属性 province的Getter方法.属性名：省
	 *  创建日期:2019-5-23
	 * @return java.lang.String
	 */
	public java.lang.String getProvince () {
		return province;
	}
	   
	/**
	 * 属性province的Setter方法.属性名：省
	 * 创建日期:2019-5-23
	 * @param newProvince java.lang.String
	 */
	public void setProvince (java.lang.String newProvince ) {
	 	this.province = newProvince;
	} 	 
	
	/**
	 * 属性 city的Getter方法.属性名：市
	 *  创建日期:2019-5-23
	 * @return java.lang.String
	 */
	public java.lang.String getCity () {
		return city;
	}
	   
	/**
	 * 属性city的Setter方法.属性名：市
	 * 创建日期:2019-5-23
	 * @param newCity java.lang.String
	 */
	public void setCity (java.lang.String newCity ) {
	 	this.city = newCity;
	} 	 
	
	/**
	 * 属性 district的Getter方法.属性名：区
	 *  创建日期:2019-5-23
	 * @return java.lang.String
	 */
	public java.lang.String getDistrict () {
		return district;
	}
	   
	/**
	 * 属性district的Setter方法.属性名：区
	 * 创建日期:2019-5-23
	 * @param newDistrict java.lang.String
	 */
	public void setDistrict (java.lang.String newDistrict ) {
	 	this.district = newDistrict;
	} 	 
	
	/**
	 * 属性 productlist的Getter方法.属性名：产品列表
	 *  创建日期:2019-5-23
	 * @return java.lang.String
	 */
	public java.lang.String getProductlist () {
		return productlist;
	}
	   
	/**
	 * 属性productlist的Setter方法.属性名：产品列表
	 * 创建日期:2019-5-23
	 * @param newProductlist java.lang.String
	 */
	public void setProductlist (java.lang.String newProductlist ) {
	 	this.productlist = newProductlist;
	} 	 
	
	/**
	 * 属性 owner的Getter方法.属性名：负责人
	 *  创建日期:2019-5-23
	 * @return java.lang.String
	 */
	public java.lang.String getOwner () {
		return owner;
	}
	   
	/**
	 * 属性owner的Setter方法.属性名：负责人
	 * 创建日期:2019-5-23
	 * @param newOwner java.lang.String
	 */
	public void setOwner (java.lang.String newOwner ) {
	 	this.owner = newOwner;
	} 	 
	
	/**
	 * 属性 ownerid的Getter方法.属性名：负责人id
	 *  创建日期:2019-5-23
	 * @return java.lang.String
	 */
	public java.lang.String getOwnerid () {
		return ownerid;
	}
	   
	/**
	 * 属性ownerid的Setter方法.属性名：负责人id
	 * 创建日期:2019-5-23
	 * @param newOwnerid java.lang.String
	 */
	public void setOwnerid (java.lang.String newOwnerid ) {
	 	this.ownerid = newOwnerid;
	} 	 
	
	/**
	 * 属性 creator的Getter方法.属性名：创建人
	 *  创建日期:2019-5-23
	 * @return java.lang.String
	 */
	public java.lang.String getCreator () {
		return creator;
	}
	   
	/**
	 * 属性creator的Setter方法.属性名：创建人
	 * 创建日期:2019-5-23
	 * @param newCreator java.lang.String
	 */
	public void setCreator (java.lang.String newCreator ) {
	 	this.creator = newCreator;
	} 	 
	
	/**
	 * 属性 creatorid的Getter方法.属性名：创建人id
	 *  创建日期:2019-5-23
	 * @return java.lang.String
	 */
	public java.lang.String getCreatorid () {
		return creatorid;
	}
	   
	/**
	 * 属性creatorid的Setter方法.属性名：创建人id
	 * 创建日期:2019-5-23
	 * @param newCreatorid java.lang.String
	 */
	public void setCreatorid (java.lang.String newCreatorid ) {
	 	this.creatorid = newCreatorid;
	} 	 
	
	/**
	 * 属性 agentmemo的Getter方法.属性名：备注
	 *  创建日期:2019-5-23
	 * @return java.lang.String
	 */
	public java.lang.String getAgentmemo () {
		return agentmemo;
	}
	   
	/**
	 * 属性agentmemo的Setter方法.属性名：备注
	 * 创建日期:2019-5-23
	 * @param newAgentmemo java.lang.String
	 */
	public void setAgentmemo (java.lang.String newAgentmemo ) {
	 	this.agentmemo = newAgentmemo;
	} 	 
	
	/**
	 * 属性 createdate的Getter方法.属性名：创建时间
	 *  创建日期:2019-5-23
	 * @return java.lang.String
	 */
	public java.lang.String getCreatedate () {
		return createdate;
	}
	   
	/**
	 * 属性createdate的Setter方法.属性名：创建时间
	 * 创建日期:2019-5-23
	 * @param newCreatedate java.lang.String
	 */
	public void setCreatedate (java.lang.String newCreatedate ) {
	 	this.createdate = newCreatedate;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2019-5-23
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2019-5-23
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2019-5-23
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2019-5-23
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
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