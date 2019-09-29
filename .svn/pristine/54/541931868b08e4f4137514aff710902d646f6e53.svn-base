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
 *  创建日期:2018-11-13
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "contract")
@Table(name = "bd_contract")
public class Contract extends BaseEntity{
	
	public static final String POST_STATE_01 = "未寄出";
	public static final String POST_STATE_02 = "已寄出";
	public static final String POST_STATE_03 = "未寄出";
	
	public static final String PAY_STATE_01 = "定金未支付";
	public static final String PAY_STATE_02 = "定金已支付";
	public static final String PAY_STATE_03 = "全额已支付";
	
	public static final String INVOICE_STATE_01 = "未开具";
	public static final String INVOICE_STATE_02 = "已开具";

	
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "contractid")
    private java.lang.String contractid;
      
    @Column(name = "contractcode")
    private java.lang.String contractcode;
      
    @Column(name = "dealid")
    private java.lang.String dealid;
      
    @Column(name = "dealcode")
    private java.lang.String dealcode;
      
    @Column(name = "serviceid")
    private java.lang.String serviceid;
      
    @Column(name = "servicecode")
    private java.lang.String servicecode;
      
    @Column(name = "invoicestate")
    private java.lang.String invoicestate;
      
    @Column(name = "picc")
    private java.lang.String picc;

    @Column(name = "customerid")
    private java.lang.String customerid;
    
    /**
     * 委托方
     */
    @Column(name = "clientname")
    private java.lang.String clientname;
    
	/**
     * 通讯地址
     */
    @Column(name = "postaladdress")
    private java.lang.String postaladdress;

    public java.lang.String getClientname() {
		return clientname;
	}
	public void setClientname(java.lang.String clientname) {
		this.clientname = clientname;
	}
	public java.lang.String getPostaladdress() {
		return postaladdress;
	}
	public void setPostaladdress(java.lang.String postaladdress) {
		this.postaladdress = postaladdress;
	}
	
    //补上客户信息
	@Column(name = "name")
	private java.lang.String name;
	@Column(name = "phone")
	private java.lang.String phone;
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

	

	//补工程信息
	@Column(name = "totalamount")
	private java.lang.Double totalamount;
	@Column(name = "paidamount")
	private java.lang.Double paidamount;
	@Column(name = "constructionname")
	private java.lang.String constructionname;
	public Double getTotalamount() {
		return totalamount;
	}
	public void setTotalamount(Double totalamount) {
		this.totalamount = totalamount;
	}
	public Double getPaidamount() {
		return paidamount;
	}
	public void setPaidamount(Double paidamount) {
		this.paidamount = paidamount;
	}
	public String getConstructionname() {
		return constructionname;
	}
	public void setConstructionname(String constructionname) {
		this.constructionname = constructionname;
	}

	
	//补优惠信息
	@Column(name = "discount")
	private java.lang.Double discount;
	@Column(name = "refund")
	private java.lang.Double refund;
	@Column(name = "transfer")
	private java.lang.Double transfer;
	@Column(name = "afterdiscount")
	private java.lang.Double afterdiscount;
	public java.lang.Double getDiscount() {
		return discount;
	}
	public void setDiscount(java.lang.Double discount) {
		this.discount = discount;
	}
	public java.lang.Double getRefund() {
		return refund;
	}
	public void setRefund(java.lang.Double refund) {
		this.refund = refund;
	}
	public java.lang.Double getTransfer() {
		return transfer;
	}
	public void setTransfer(java.lang.Double transfer) {
		this.transfer = transfer;
	}
	public java.lang.Double getAfterdiscount() {
		return afterdiscount;
	}
	public void setAfterdiscount(java.lang.Double afterdiscount) {
		this.afterdiscount = afterdiscount;
	}
	

	@Column(name = "customername")
    private java.lang.String customername;
      
    @Column(name = "idnumber")
    private java.lang.String idnumber;
      
    @Column(name = "telphone")
    private java.lang.String telphone;
      
    @Column(name = "address")
    private java.lang.String address;
      
    @Column(name = "creator")
    private java.lang.String creator;
      
    @Column(name = "createtime")
    private java.util.Date createtime;
      
    @Column(name = "orgid")
    private java.lang.String orgid;
      
    @Column(name = "orgname")
    private java.lang.String orgname;
      
    @Column(name = "agentid")
    private java.lang.String agentid;
      
    @Column(name = "agentname")
    private java.lang.String agentname;
      
    @Column(name = "postalnum")
    private java.lang.String postalnum;
      
    @Column(name = "contractelecvers")
    private java.lang.String contractelecvers;
      
    @Column(name = "contractmailstate")
    private java.lang.String contractmailstate;
      
    @Column(name = "invoiceelecvers")
    private java.lang.String invoiceelecvers;
      
    @Column(name = "invoicemailstate")
    private java.lang.String invoicemailstate;
      
    @Column(name = "policyelecvers")
    private java.lang.String policyelecvers;
      
    @Column(name = "policymailstate")
    private java.lang.String policymailstate;
      
    @Column(name = "dealpaystate")
    private java.lang.String dealpaystate;
      
    @Column(name = "paymoney")
    private java.lang.String paymoney;
      
    @Column(name = "contractdocunum")
    private java.lang.String contractdocunum;
      
    @Column(name = "invoicedocunum")
    private java.lang.String invoicedocunum;
      
    @Column(name = "policydocunum")
    private java.lang.String policydocunum;
      
    @Column(name = "contractphoto")
    private java.lang.String contractphoto;
      
    @Column(name = "invoicephoto")
    private java.lang.String invoicephoto;
      
    @Column(name = "policyphoto")
    private java.lang.String policyphoto;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
    
    private String customerPhone;
        
	
	public String getCustomerPhone() {
		return customerPhone;
	}

	public void setCustomerPhone(String customerPhone) {
		this.customerPhone = customerPhone;
	}

	/**
	 * 属性 contractid的Getter方法.属性名：主键
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getContractid () {
		return contractid;
	}
	   
	/**
	 * 属性contractid的Setter方法.属性名：主键
	 * 创建日期:2018-11-13
	 * @param newContractid java.lang.String
	 */
	public void setContractid (java.lang.String newContractid ) {
	 	this.contractid = newContractid;
	} 	 
	
	/**
	 * 属性 contractcode的Getter方法.属性名：合同编码
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getContractcode () {
		return contractcode;
	}
	   
	/**
	 * 属性contractcode的Setter方法.属性名：合同编码
	 * 创建日期:2018-11-13
	 * @param newContractcode java.lang.String
	 */
	public void setContractcode (java.lang.String newContractcode ) {
	 	this.contractcode = newContractcode;
	} 	 
	
	/**
	 * 属性 dealid的Getter方法.属性名：交易id
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getDealid () {
		return dealid;
	}
	   
	/**
	 * 属性dealid的Setter方法.属性名：交易id
	 * 创建日期:2018-11-13
	 * @param newDealid java.lang.String
	 */
	public void setDealid (java.lang.String newDealid ) {
	 	this.dealid = newDealid;
	} 	 
	
	/**
	 * 属性 dealcode的Getter方法.属性名：交易编码
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getDealcode () {
		return dealcode;
	}
	   
	/**
	 * 属性dealcode的Setter方法.属性名：交易编码
	 * 创建日期:2018-11-13
	 * @param newDealcode java.lang.String
	 */
	public void setDealcode (java.lang.String newDealcode ) {
	 	this.dealcode = newDealcode;
	} 	 
	
	/**
	 * 属性 serviceid的Getter方法.属性名：服务id
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getServiceid () {
		return serviceid;
	}
	   
	/**
	 * 属性serviceid的Setter方法.属性名：服务id
	 * 创建日期:2018-11-13
	 * @param newServiceid java.lang.String
	 */
	public void setServiceid (java.lang.String newServiceid ) {
	 	this.serviceid = newServiceid;
	} 	 
	
	/**
	 * 属性 servicecode的Getter方法.属性名：服务编码
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getServicecode () {
		return servicecode;
	}
	   
	/**
	 * 属性servicecode的Setter方法.属性名：服务编码
	 * 创建日期:2018-11-13
	 * @param newServicecode java.lang.String
	 */
	public void setServicecode (java.lang.String newServicecode ) {
	 	this.servicecode = newServicecode;
	} 	 
	
	/**
	 * 属性 invoicestate的Getter方法.属性名：发票
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getInvoicestate () {
		return invoicestate;
	}
	   
	/**
	 * 属性invoicestate的Setter方法.属性名：发票
	 * 创建日期:2018-11-13
	 * @param newInvoicestate java.lang.String
	 */
	public void setInvoicestate (java.lang.String newInvoicestate ) {
	 	this.invoicestate = newInvoicestate;
	} 	 
	
	/**
	 * 属性 picc的Getter方法.属性名：保单号
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getPicc () {
		return picc;
	}
	   
	/**
	 * 属性picc的Setter方法.属性名：保单号
	 * 创建日期:2018-11-13
	 * @param newPicc java.lang.String
	 */
	public void setPicc (java.lang.String newPicc ) {
	 	this.picc = newPicc;
	} 	 
	
	/**
	 * 属性 customerid的Getter方法.属性名：客户id
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getCustomerid () {
		return customerid;
	}
	   
	/**
	 * 属性customerid的Setter方法.属性名：客户id
	 * 创建日期:2018-11-13
	 * @param newCustomerid java.lang.String
	 */
	public void setCustomerid (java.lang.String newCustomerid ) {
	 	this.customerid = newCustomerid;
	} 	 
	
	/**
	 * 属性 customername的Getter方法.属性名：客户姓名
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getCustomername () {
		return customername;
	}
	   
	/**
	 * 属性customername的Setter方法.属性名：客户姓名
	 * 创建日期:2018-11-13
	 * @param newCustomername java.lang.String
	 */
	public void setCustomername (java.lang.String newCustomername ) {
	 	this.customername = newCustomername;
	} 	 
	
	/**
	 * 属性 idnumber的Getter方法.属性名：身份证号
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getIdnumber () {
		return idnumber;
	}
	   
	/**
	 * 属性idnumber的Setter方法.属性名：身份证号
	 * 创建日期:2018-11-13
	 * @param newIdnumber java.lang.String
	 */
	public void setIdnumber (java.lang.String newIdnumber ) {
	 	this.idnumber = newIdnumber;
	} 	 
	
	/**
	 * 属性 telphone的Getter方法.属性名：手机号
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getTelphone () {
		return telphone;
	}
	   
	/**
	 * 属性telphone的Setter方法.属性名：手机号
	 * 创建日期:2018-11-13
	 * @param newTelphone java.lang.String
	 */
	public void setTelphone (java.lang.String newTelphone ) {
	 	this.telphone = newTelphone;
	} 	 
	
	/**
	 * 属性 address的Getter方法.属性名：地址
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getAddress () {
		return address;
	}
	   
	/**
	 * 属性address的Setter方法.属性名：地址
	 * 创建日期:2018-11-13
	 * @param newAddress java.lang.String
	 */
	public void setAddress (java.lang.String newAddress ) {
	 	this.address = newAddress;
	} 	 
	
	/**
	 * 属性 creator的Getter方法.属性名：创建人
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getCreator () {
		return creator;
	}
	   
	/**
	 * 属性creator的Setter方法.属性名：创建人
	 * 创建日期:2018-11-13
	 * @param newCreator java.lang.String
	 */
	public void setCreator (java.lang.String newCreator ) {
	 	this.creator = newCreator;
	} 	 
	
	/**
	 * 属性 createtime的Getter方法.属性名：创建时间
	 *  创建日期:2018-11-13
	 * @return java.util.Date
	 */
	public java.util.Date getCreatetime () {
		return createtime;
	}
	   
	/**
	 * 属性createtime的Setter方法.属性名：创建时间
	 * 创建日期:2018-11-13
	 * @param newCreatetime java.util.Date
	 */
	public void setCreatetime (java.util.Date newCreatetime ) {
	 	this.createtime = newCreatetime;
	} 	 
	
	/**
	 * 属性 orgid的Getter方法.属性名：组织id
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getOrgid () {
		return orgid;
	}
	   
	/**
	 * 属性orgid的Setter方法.属性名：组织id
	 * 创建日期:2018-11-13
	 * @param newOrgid java.lang.String
	 */
	public void setOrgid (java.lang.String newOrgid ) {
	 	this.orgid = newOrgid;
	} 	 
	
	/**
	 * 属性 orgname的Getter方法.属性名：组织名称
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getOrgname () {
		return orgname;
	}
	   
	/**
	 * 属性orgname的Setter方法.属性名：组织名称
	 * 创建日期:2018-11-13
	 * @param newOrgname java.lang.String
	 */
	public void setOrgname (java.lang.String newOrgname ) {
	 	this.orgname = newOrgname;
	} 	 
	
	/**
	 * 属性 agentid的Getter方法.属性名：运营商id
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getAgentid () {
		return agentid;
	}
	   
	/**
	 * 属性agentid的Setter方法.属性名：运营商id
	 * 创建日期:2018-11-13
	 * @param newAgentid java.lang.String
	 */
	public void setAgentid (java.lang.String newAgentid ) {
	 	this.agentid = newAgentid;
	} 	 
	
	/**
	 * 属性 agentname的Getter方法.属性名：运营商名称
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getAgentname () {
		return agentname;
	}
	   
	/**
	 * 属性agentname的Setter方法.属性名：运营商名称
	 * 创建日期:2018-11-13
	 * @param newAgentname java.lang.String
	 */
	public void setAgentname (java.lang.String newAgentname ) {
	 	this.agentname = newAgentname;
	} 	 
	
	/**
	 * 属性 postalnum的Getter方法.属性名：邮寄单据号
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getPostalnum () {
		return postalnum;
	}
	   
	/**
	 * 属性postalnum的Setter方法.属性名：邮寄单据号
	 * 创建日期:2018-11-13
	 * @param newPostalnum java.lang.String
	 */
	public void setPostalnum (java.lang.String newPostalnum ) {
	 	this.postalnum = newPostalnum;
	} 	 
	
	/**
	 * 属性 contractelecvers的Getter方法.属性名：合同电子版
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getContractelecvers () {
		return contractelecvers;
	}
	   
	/**
	 * 属性contractelecvers的Setter方法.属性名：合同电子版
	 * 创建日期:2018-11-13
	 * @param newContractelecvers java.lang.String
	 */
	public void setContractelecvers (java.lang.String newContractelecvers ) {
	 	this.contractelecvers = newContractelecvers;
	} 	 
	
	/**
	 * 属性 contractmailstate的Getter方法.属性名：合同邮寄
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getContractmailstate () {
		return contractmailstate;
	}
	   
	/**
	 * 属性contractmailstate的Setter方法.属性名：合同邮寄
	 * 创建日期:2018-11-13
	 * @param newContractmailstate java.lang.String
	 */
	public void setContractmailstate (java.lang.String newContractmailstate ) {
	 	this.contractmailstate = newContractmailstate;
	} 	 
	
	/**
	 * 属性 invoiceelecvers的Getter方法.属性名：发票电子版
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getInvoiceelecvers () {
		return invoiceelecvers;
	}
	   
	/**
	 * 属性invoiceelecvers的Setter方法.属性名：发票电子版
	 * 创建日期:2018-11-13
	 * @param newInvoiceelecvers java.lang.String
	 */
	public void setInvoiceelecvers (java.lang.String newInvoiceelecvers ) {
	 	this.invoiceelecvers = newInvoiceelecvers;
	} 	 
	
	/**
	 * 属性 invoicemailstate的Getter方法.属性名：发票邮寄
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getInvoicemailstate () {
		return invoicemailstate;
	}
	   
	/**
	 * 属性invoicemailstate的Setter方法.属性名：发票邮寄
	 * 创建日期:2018-11-13
	 * @param newInvoicemailstate java.lang.String
	 */
	public void setInvoicemailstate (java.lang.String newInvoicemailstate ) {
	 	this.invoicemailstate = newInvoicemailstate;
	} 	 
	
	/**
	 * 属性 policyelecvers的Getter方法.属性名：保单电子版
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getPolicyelecvers () {
		return policyelecvers;
	}
	   
	/**
	 * 属性policyelecvers的Setter方法.属性名：保单电子版
	 * 创建日期:2018-11-13
	 * @param newPolicyelecvers java.lang.String
	 */
	public void setPolicyelecvers (java.lang.String newPolicyelecvers ) {
	 	this.policyelecvers = newPolicyelecvers;
	} 	 
	
	/**
	 * 属性 policymailstate的Getter方法.属性名：保单邮寄
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getPolicymailstate () {
		return policymailstate;
	}
	   
	/**
	 * 属性policymailstate的Setter方法.属性名：保单邮寄
	 * 创建日期:2018-11-13
	 * @param newPolicymailstate java.lang.String
	 */
	public void setPolicymailstate (java.lang.String newPolicymailstate ) {
	 	this.policymailstate = newPolicymailstate;
	} 	 
	
	/**
	 * 属性 dealpaystate的Getter方法.属性名：交易付款状态
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getDealpaystate () {
		return dealpaystate;
	}
	   
	/**
	 * 属性dealpaystate的Setter方法.属性名：交易付款状态
	 * 创建日期:2018-11-13
	 * @param newDealpaystate java.lang.String
	 */
	public void setDealpaystate (java.lang.String newDealpaystate ) {
	 	this.dealpaystate = newDealpaystate;
	} 	 
	
	/**
	 * 属性 paymoney的Getter方法.属性名：付款金额
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getPaymoney () {
		return paymoney;
	}
	   
	/**
	 * 属性paymoney的Setter方法.属性名：付款金额
	 * 创建日期:2018-11-13
	 * @param newPaymoney java.lang.String
	 */
	public void setPaymoney (java.lang.String newPaymoney ) {
	 	this.paymoney = newPaymoney;
	} 	 
	
	/**
	 * 属性 contractdocunum的Getter方法.属性名：合同单据号
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getContractdocunum () {
		return contractdocunum;
	}
	   
	/**
	 * 属性contractdocunum的Setter方法.属性名：合同单据号
	 * 创建日期:2018-11-13
	 * @param newContractdocunum java.lang.String
	 */
	public void setContractdocunum (java.lang.String newContractdocunum ) {
	 	this.contractdocunum = newContractdocunum;
	} 	 
	
	/**
	 * 属性 invoicedocunum的Getter方法.属性名：发票单据号
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getInvoicedocunum () {
		return invoicedocunum;
	}
	   
	/**
	 * 属性invoicedocunum的Setter方法.属性名：发票单据号
	 * 创建日期:2018-11-13
	 * @param newInvoicedocunum java.lang.String
	 */
	public void setInvoicedocunum (java.lang.String newInvoicedocunum ) {
	 	this.invoicedocunum = newInvoicedocunum;
	} 	 
	
	/**
	 * 属性 policydocunum的Getter方法.属性名：保单单据号
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getPolicydocunum () {
		return policydocunum;
	}
	   
	/**
	 * 属性policydocunum的Setter方法.属性名：保单单据号
	 * 创建日期:2018-11-13
	 * @param newPolicydocunum java.lang.String
	 */
	public void setPolicydocunum (java.lang.String newPolicydocunum ) {
	 	this.policydocunum = newPolicydocunum;
	} 	 
	
	/**
	 * 属性 contractphoto的Getter方法.属性名：合同图片
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getContractphoto () {
		return contractphoto;
	}
	   
	/**
	 * 属性contractphoto的Setter方法.属性名：合同图片
	 * 创建日期:2018-11-13
	 * @param newContractphoto java.lang.String
	 */
	public void setContractphoto (java.lang.String newContractphoto ) {
	 	this.contractphoto = newContractphoto;
	} 	 
	
	/**
	 * 属性 invoicephoto的Getter方法.属性名：发票图片
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getInvoicephoto () {
		return invoicephoto;
	}
	   
	/**
	 * 属性invoicephoto的Setter方法.属性名：发票图片
	 * 创建日期:2018-11-13
	 * @param newInvoicephoto java.lang.String
	 */
	public void setInvoicephoto (java.lang.String newInvoicephoto ) {
	 	this.invoicephoto = newInvoicephoto;
	} 	 
	
	/**
	 * 属性 policyphoto的Getter方法.属性名：保单图片
	 *  创建日期:2018-11-13
	 * @return java.lang.String
	 */
	public java.lang.String getPolicyphoto () {
		return policyphoto;
	}
	   
	/**
	 * 属性policyphoto的Setter方法.属性名：保单图片
	 * 创建日期:2018-11-13
	 * @param newPolicyphoto java.lang.String
	 */
	public void setPolicyphoto (java.lang.String newPolicyphoto ) {
	 	this.policyphoto = newPolicyphoto;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2018-11-13
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2018-11-13
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2018-11-13
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2018-11-13
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "contract";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}