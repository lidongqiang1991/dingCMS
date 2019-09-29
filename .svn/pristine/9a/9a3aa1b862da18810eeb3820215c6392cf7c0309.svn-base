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
 *  创建日期:2019-5-14
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "Performance")
@Table(name = "bd_Performance")
public class Performance extends BaseEntity{
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "perid")
    private java.lang.String perid;
      
    @Column(name = "referredid")
    private java.lang.String referredid;
      
    @Column(name = "rederredname")
    private java.lang.String rederredname;
      
    @Column(name = "customerid")
    private java.lang.String customerid;
      
    @Column(name = "rewardid")
    private java.lang.String rewardid;
      
    @Column(name = "rewardtime")
    private java.util.Date rewardtime;
      
    @Column(name = "performancetime")
    private java.util.Date performancetime;
      
    @Column(name = "rewardstatus")
    private java.lang.Integer rewardstatus;
      
    @Column(name = "performancestatus")
    private java.lang.Integer performancestatus;
      
    @Column(name = "awardstatus")
    private java.lang.Integer awardstatus;
      
    @Column(name = "performanceremark")
    private java.lang.String performanceremark;
      
    @Column(name = "rewardremark")
    private java.lang.String rewardremark;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
    @Column(name = "phone")
    private String phone;
    @Column(name = "customerName")
    private String customerName;
    @Column(name = "referrer")
    private String referrer; 
    @Column(name = "rewardName")
    private String rewardName;
    @Column(name = "rewardtype")
    private Integer rewardtype;
    @Column(name = "rewardratio")
    private Double rewardratio;
    @Column(name = "performancetype")
    private String performancetype;
    @Column(name="orderid")
    private String orderid;
    @Column(name = "createdate")
	private String createNameTime;// 客户创建时间
	@Column(name = "district")
	private String district;// 区
	@Column(name = "address")
	private String address;// 具体位置
	@Column(name = "province")
	private String province;// 省
	@Column(name = "city")
	private String city;// 城市
	@Column(name = "type")
	private String type;// 类型
	@Column(name = "produceType")
	private String produceType;// 工程状态
	@Column(name="community")
	private String community;
	@Column(name="dealid")
	private String dealid;
	@Column(name="rootoid")
	private String rootoid;
	
	public String getRootoid() {
		return rootoid;
	}

	public void setRootoid(String rootoid) {
		this.rootoid = rootoid;
	}

	public String getDealid() {
		return dealid;
	}

	public void setDealid(String dealid) {
		this.dealid = dealid;
	}

	public String getCommunity() {
		return community;
	}

	public void setCommunity(String community) {
		this.community = community;
	}

	public String getProduceType() {
		return produceType;
	}

	public void setProduceType(String produceType) {
		this.produceType = produceType;
	}

	public String getCreateNameTime() {
		return createNameTime;
	}

	public void setCreateNameTime(String createNameTime) {
		this.createNameTime = createNameTime;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getOrderid() {
		return orderid;
	}

	public void setOrderid(String orderid) {
		this.orderid = orderid;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getReferrer() {
		return referrer;
	}

	public void setReferrer(String referrer) {
		this.referrer = referrer;
	}

	public String getRewardName() {
		return rewardName;
	}

	public void setRewardName(String rewardName) {
		this.rewardName = rewardName;
	}

	public Integer getRewardtype() {
		return rewardtype;
	}

	public void setRewardtype(Integer rewardtype) {
		this.rewardtype = rewardtype;
	}

	public Double getRewardratio() {
		return rewardratio;
	}

	public void setRewardratio(Double rewardratio) {
		this.rewardratio = rewardratio;
	}

	public String getPerformancetype() {
		return performancetype;
	}

	public void setPerformancetype(String performancetype) {
		this.performancetype = performancetype;
	}

	/**
	 * 属性 perid的Getter方法.属性名：主键
	 *  创建日期:2019-5-14
	 * @return java.lang.String
	 */
	public java.lang.String getPerid () {
		return perid;
	}
	   
	/**
	 * 属性perid的Setter方法.属性名：主键
	 * 创建日期:2019-5-14
	 * @param newPerid java.lang.String
	 */
	public void setPerid (java.lang.String newPerid ) {
	 	this.perid = newPerid;
	} 	 
	
	/**
	 * 属性 referredid的Getter方法.属性名：推荐人id
	 *  创建日期:2019-5-14
	 * @return java.lang.String
	 */
	public java.lang.String getReferredid () {
		return referredid;
	}
	   
	/**
	 * 属性referredid的Setter方法.属性名：推荐人id
	 * 创建日期:2019-5-14
	 * @param newReferredid java.lang.String
	 */
	public void setReferredid (java.lang.String newReferredid ) {
	 	this.referredid = newReferredid;
	} 	 
	
	/**
	 * 属性 rederredname的Getter方法.属性名：推荐人姓名
	 *  创建日期:2019-5-14
	 * @return java.lang.String
	 */
	public java.lang.String getRederredname () {
		return rederredname;
	}
	   
	/**
	 * 属性rederredname的Setter方法.属性名：推荐人姓名
	 * 创建日期:2019-5-14
	 * @param newRederredname java.lang.String
	 */
	public void setRederredname (java.lang.String newRederredname ) {
	 	this.rederredname = newRederredname;
	} 	 
	
	/**
	 * 属性 customerid的Getter方法.属性名：线索id
	 *  创建日期:2019-5-14
	 * @return java.lang.String
	 */
	public java.lang.String getCustomerid () {
		return customerid;
	}
	   
	/**
	 * 属性customerid的Setter方法.属性名：线索id
	 * 创建日期:2019-5-14
	 * @param newCustomerid java.lang.String
	 */
	public void setCustomerid (java.lang.String newCustomerid ) {
	 	this.customerid = newCustomerid;
	} 	 
	
	/**
	 * 属性 rewardid的Getter方法.属性名：规则id
	 *  创建日期:2019-5-14
	 * @return java.lang.String
	 */
	public java.lang.String getRewardid () {
		return rewardid;
	}
	   
	/**
	 * 属性rewardid的Setter方法.属性名：规则id
	 * 创建日期:2019-5-14
	 * @param newRewardid java.lang.String
	 */
	public void setRewardid (java.lang.String newRewardid ) {
	 	this.rewardid = newRewardid;
	} 	 
	
	/**
	 * 属性 rewardtime的Getter方法.属性名：奖励时间
	 *  创建日期:2019-5-14
	 * @return java.util.Date
	 */
	public java.util.Date getRewardtime () {
		return rewardtime;
	}
	   
	/**
	 * 属性rewardtime的Setter方法.属性名：奖励时间
	 * 创建日期:2019-5-14
	 * @param newRewardtime java.util.Date
	 */
	public void setRewardtime (java.util.Date newRewardtime ) {
	 	this.rewardtime = newRewardtime;
	} 	 
	
	/**
	 * 属性 performancetime的Getter方法.属性名：业绩时间
	 *  创建日期:2019-5-14
	 * @return java.util.Date
	 */
	public java.util.Date getPerformancetime () {
		return performancetime;
	}
	   
	/**
	 * 属性performancetime的Setter方法.属性名：业绩时间
	 * 创建日期:2019-5-14
	 * @param newPerformancetime java.util.Date
	 */
	public void setPerformancetime (java.util.Date newPerformancetime ) {
	 	this.performancetime = newPerformancetime;
	} 	 
	
	/**
	 * 属性 rewardstatus的Getter方法.属性名：奖励时候审核
	 *  创建日期:2019-5-14
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getRewardstatus () {
		return rewardstatus;
	}
	   
	/**
	 * 属性rewardstatus的Setter方法.属性名：奖励时候审核
	 * 创建日期:2019-5-14
	 * @param newRewardstatus java.lang.Integer
	 */
	public void setRewardstatus (java.lang.Integer newRewardstatus ) {
	 	this.rewardstatus = newRewardstatus;
	} 	 
	
	/**
	 * 属性 performancestatus的Getter方法.属性名：业绩审核
	 *  创建日期:2019-5-14
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getPerformancestatus () {
		return performancestatus;
	}
	   
	/**
	 * 属性performancestatus的Setter方法.属性名：业绩审核
	 * 创建日期:2019-5-14
	 * @param newPerformancestatus java.lang.Integer
	 */
	public void setPerformancestatus (java.lang.Integer newPerformancestatus ) {
	 	this.performancestatus = newPerformancestatus;
	} 	 
	
	/**
	 * 属性 awardstatus的Getter方法.属性名：发放奖励
	 *  创建日期:2019-5-14
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getAwardstatus () {
		return awardstatus;
	}
	   
	/**
	 * 属性awardstatus的Setter方法.属性名：发放奖励
	 * 创建日期:2019-5-14
	 * @param newAwardstatus java.lang.Integer
	 */
	public void setAwardstatus (java.lang.Integer newAwardstatus ) {
	 	this.awardstatus = newAwardstatus;
	} 	 
	
	/**
	 * 属性 performanceremark的Getter方法.属性名：业绩审核批语
	 *  创建日期:2019-5-14
	 * @return java.lang.String
	 */
	public java.lang.String getPerformanceremark () {
		return performanceremark;
	}
	   
	/**
	 * 属性performanceremark的Setter方法.属性名：业绩审核批语
	 * 创建日期:2019-5-14
	 * @param newPerformanceremark java.lang.String
	 */
	public void setPerformanceremark (java.lang.String newPerformanceremark ) {
	 	this.performanceremark = newPerformanceremark;
	} 	 
	
	/**
	 * 属性 rewardremark的Getter方法.属性名：奖励审核批语
	 *  创建日期:2019-5-14
	 * @return java.lang.String
	 */
	public java.lang.String getRewardremark () {
		return rewardremark;
	}
	   
	/**
	 * 属性rewardremark的Setter方法.属性名：奖励审核批语
	 * 创建日期:2019-5-14
	 * @param newRewardremark java.lang.String
	 */
	public void setRewardremark (java.lang.String newRewardremark ) {
	 	this.rewardremark = newRewardremark;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2019-5-14
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2019-5-14
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2019-5-14
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2019-5-14
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "Performance";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}