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
 *  创建日期:2018-9-21
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "LogOrderNote")
@Table(name = "log_order_note")
public class LogOrderNote extends BaseEntity{
	
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "logid")
    private java.lang.String logid;
      
    @Column(name = "dealid")
    private java.lang.String dealid;
      
    @Column(name = "orderid")
    private java.lang.String orderid;
      
    @Column(name = "action")
    private java.lang.String action;
      
    @Column(name = "note")
    private java.lang.String note;
      
    @Column(name = "creator")
    private java.lang.String creator;
      
    @Column(name = "creatorid")
    private java.lang.String creatorid;
      
    @Column(name = "createtime")
    private java.lang.String createtime;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
	

	/**
	 * 属性 logid的Getter方法.属性名：日志主键
	 *  创建日期:2018-9-21
	 * @return java.lang.String
	 */
	public java.lang.String getLogid () {
		return logid;
	}
	   
	/**
	 * 属性logid的Setter方法.属性名：日志主键
	 * 创建日期:2018-9-21
	 * @param newLogid java.lang.String
	 */
	public void setLogid (java.lang.String newLogid ) {
	 	this.logid = newLogid;
	} 	 
	
	/**
	 * 属性 dealid的Getter方法.属性名：交易id
	 *  创建日期:2018-9-21
	 * @return java.lang.String
	 */
	public java.lang.String getDealid () {
		return dealid;
	}
	   
	/**
	 * 属性dealid的Setter方法.属性名：交易id
	 * 创建日期:2018-9-21
	 * @param newDealid java.lang.String
	 */
	public void setDealid (java.lang.String newDealid ) {
	 	this.dealid = newDealid;
	} 	 
	
	/**
	 * 属性 orderid的Getter方法.属性名：订单id
	 *  创建日期:2018-9-21
	 * @return java.lang.String
	 */
	public java.lang.String getOrderid () {
		return orderid;
	}
	   
	/**
	 * 属性orderid的Setter方法.属性名：订单id
	 * 创建日期:2018-9-21
	 * @param newOrderid java.lang.String
	 */
	public void setOrderid (java.lang.String newOrderid ) {
	 	this.orderid = newOrderid;
	} 	 
	
	/**
	 * 属性 action的Getter方法.属性名：操作
	 *  创建日期:2018-9-21
	 * @return java.lang.String
	 */
	public java.lang.String getAction () {
		return action;
	}
	   
	/**
	 * 属性action的Setter方法.属性名：操作
	 * 创建日期:2018-9-21
	 * @param newAction java.lang.String
	 */
	public void setAction (java.lang.String newAction ) {
	 	this.action = newAction;
	} 	 
	
	/**
	 * 属性 note的Getter方法.属性名：备注
	 *  创建日期:2018-9-21
	 * @return java.lang.String
	 */
	public java.lang.String getNote () {
		return note;
	}
	   
	/**
	 * 属性note的Setter方法.属性名：备注
	 * 创建日期:2018-9-21
	 * @param newNote java.lang.String
	 */
	public void setNote (java.lang.String newNote ) {
	 	this.note = newNote;
	} 	 
	
	/**
	 * 属性 creator的Getter方法.属性名：创建人
	 *  创建日期:2018-9-21
	 * @return java.lang.String
	 */
	public java.lang.String getCreator () {
		return creator;
	}
	   
	/**
	 * 属性creator的Setter方法.属性名：创建人
	 * 创建日期:2018-9-21
	 * @param newCreator java.lang.String
	 */
	public void setCreator (java.lang.String newCreator ) {
	 	this.creator = newCreator;
	} 	 
	
	/**
	 * 属性 creatorid的Getter方法.属性名：创建人id
	 *  创建日期:2018-9-21
	 * @return java.lang.String
	 */
	public java.lang.String getCreatorid () {
		return creatorid;
	}
	   
	/**
	 * 属性creatorid的Setter方法.属性名：创建人id
	 * 创建日期:2018-9-21
	 * @param newCreatorid java.lang.String
	 */
	public void setCreatorid (java.lang.String newCreatorid ) {
	 	this.creatorid = newCreatorid;
	} 	 
	
	/**
	 * 属性 createtime的Getter方法.属性名：创建时间
	 *  创建日期:2018-9-21
	 * @return java.lang.String
	 */
	public java.lang.String getCreatetime () {
		return createtime;
	}
	   
	/**
	 * 属性createtime的Setter方法.属性名：创建时间
	 * 创建日期:2018-9-21
	 * @param newCreatetime java.lang.String
	 */
	public void setCreatetime (java.lang.String newCreatetime ) {
	 	this.createtime = newCreatetime;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2018-9-21
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2018-9-21
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2018-9-21
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2018-9-21
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "LogOrderNote";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}