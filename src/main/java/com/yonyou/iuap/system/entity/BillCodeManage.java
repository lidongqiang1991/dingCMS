package com.yonyou.iuap.system.entity;

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
 *  创建日期:2018-11-10
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "BillCodeManage")
@Table(name = "sys_billcodemanage")
public class BillCodeManage extends BaseEntity{
	
	public final static String BILLTYPE_CUSTOMER="CU";
	public final static String BILLTYPE_DEAL="JY";
	public final static String BILLTYPE_SERVICE="GC";
	public final static String BILLTYPE_ORDER="DD";
	public final static String BILLTYPE_PAYMENT="ZF";
	public final static String BILLTYPE_CONTRACT="HT";
	
	
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "manageid")
    private java.lang.String manageid;
      
    @Column(name = "orgid")
    private java.lang.String orgid;
      
    @Column(name = "orgname")
    private java.lang.String orgcode;
      
    @Column(name = "billtype")
    private java.lang.String billtype;
      
    @Column(name = "dbilldate")
    private java.lang.String dbilldate;
      
    @Column(name = "serial")
    private java.lang.Integer serial;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
	

	/**
	 * 属性 manageid的Getter方法.属性名：主键
	 *  创建日期:2018-11-10
	 * @return java.lang.String
	 */
	public java.lang.String getManageid () {
		return manageid;
	}
	   
	/**
	 * 属性manageid的Setter方法.属性名：主键
	 * 创建日期:2018-11-10
	 * @param newManageid java.lang.String
	 */
	public void setManageid (java.lang.String newManageid ) {
	 	this.manageid = newManageid;
	} 	 
	
	/**
	 * 属性 orgid的Getter方法.属性名：组织id
	 *  创建日期:2018-11-10
	 * @return java.lang.String
	 */
	public java.lang.String getOrgid () {
		return orgid;
	}
	   
	/**
	 * 属性orgid的Setter方法.属性名：组织id
	 * 创建日期:2018-11-10
	 * @param newOrgid java.lang.String
	 */
	public void setOrgid (java.lang.String newOrgid ) {
	 	this.orgid = newOrgid;
	} 	 
	
	/**
	 * 属性 orgcode的Getter方法.属性名：组织编码
	 *  创建日期:2018-11-10
	 * @return java.lang.String
	 */
	public java.lang.String getOrgcode () {
		return orgcode;
	}
	   
	/**
	 * 属性orgcode的Setter方法.属性名：组织编码
	 * 创建日期:2018-11-10
	 * @param newOrgcode java.lang.String
	 */
	public void setOrgcode (java.lang.String newOrgcode ) {
	 	this.orgcode = newOrgcode;
	} 	 
	
	/**
	 * 属性 billtype的Getter方法.属性名：对象类型
	 *  创建日期:2018-11-10
	 * @return java.lang.String
	 */
	public java.lang.String getBilltype () {
		return billtype;
	}
	   
	/**
	 * 属性billtype的Setter方法.属性名：对象类型
	 * 创建日期:2018-11-10
	 * @param newBilltype java.lang.String
	 */
	public void setBilltype (java.lang.String newBilltype ) {
	 	this.billtype = newBilltype;
	} 	 
	
	/**
	 * 属性 dbilldate的Getter方法.属性名：日期
	 *  创建日期:2018-11-10
	 * @return java.lang.String
	 */
	public java.lang.String getDbilldate () {
		return dbilldate;
	}
	   
	/**
	 * 属性dbilldate的Setter方法.属性名：日期
	 * 创建日期:2018-11-10
	 * @param newDbilldate java.lang.String
	 */
	public void setDbilldate (java.lang.String newDbilldate ) {
	 	this.dbilldate = newDbilldate;
	} 	 
	
	/**
	 * 属性 serial的Getter方法.属性名：最大流水号
	 *  创建日期:2018-11-10
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getSerial () {
		return serial;
	}
	   
	/**
	 * 属性serial的Setter方法.属性名：最大流水号
	 * 创建日期:2018-11-10
	 * @param newSerial java.lang.Integer
	 */
	public void setSerial (java.lang.Integer newSerial ) {
	 	this.serial = newSerial;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2018-11-10
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2018-11-10
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2018-11-10
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2018-11-10
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "BillCodeManage";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}