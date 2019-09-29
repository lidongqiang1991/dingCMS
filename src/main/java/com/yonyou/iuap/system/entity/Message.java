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
 *  创建日期:2018-8-16
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "message")
@Table(name = "sys_message")
public class Message extends BaseEntity{
	
	public static final int  READ_STATE_1=0; //未读
	public static final int  READ_STATE_2=1; //已读
	
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "messageid")
    private java.lang.String messageid;
      
    @Column(name = "title")
    private java.lang.String title;
      
    @Column(name = "senderid")
    private java.lang.String senderid;
      
    @Column(name = "sender")
    private java.lang.String sender;
      
    @Column(name = "sendtime")
    private java.util.Date sendtime;
      
    @Column(name = "state")
    private java.lang.Integer state;
      
    @Column(name = "content")
    private java.lang.String content;
      
    @Column(name = "receiverid")
    private java.lang.String receiverid;
      
    @Column(name = "receiver")
    private java.lang.String receiver;
      
    @Column(name = "detailurl")
    private java.lang.String detailurl;
      
    @Column(name = "messagetype")
    private java.lang.String messagetype;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
	

	/**
	 * 属性 messageid的Getter方法.属性名：主键
	 *  创建日期:2018-8-16
	 * @return java.lang.String
	 */
	public java.lang.String getMessageid () {
		return messageid;
	}
	   
	/**
	 * 属性messageid的Setter方法.属性名：主键
	 * 创建日期:2018-8-16
	 * @param newMessageid java.lang.String
	 */
	public void setMessageid (java.lang.String newMessageid ) {
	 	this.messageid = newMessageid;
	} 	 
	
	/**
	 * 属性 title的Getter方法.属性名：标题
	 *  创建日期:2018-8-16
	 * @return java.lang.String
	 */
	public java.lang.String getTitle () {
		return title;
	}
	   
	/**
	 * 属性title的Setter方法.属性名：标题
	 * 创建日期:2018-8-16
	 * @param newTitle java.lang.String
	 */
	public void setTitle (java.lang.String newTitle ) {
	 	this.title = newTitle;
	} 	 
	
	/**
	 * 属性 senderid的Getter方法.属性名：发送者id
	 *  创建日期:2018-8-16
	 * @return java.lang.String
	 */
	public java.lang.String getSenderid () {
		return senderid;
	}
	   
	/**
	 * 属性senderid的Setter方法.属性名：发送者id
	 * 创建日期:2018-8-16
	 * @param newSenderid java.lang.String
	 */
	public void setSenderid (java.lang.String newSenderid ) {
	 	this.senderid = newSenderid;
	} 	 
	
	/**
	 * 属性 sender的Getter方法.属性名：发送者
	 *  创建日期:2018-8-16
	 * @return java.lang.String
	 */
	public java.lang.String getSender () {
		return sender;
	}
	   
	/**
	 * 属性sender的Setter方法.属性名：发送者
	 * 创建日期:2018-8-16
	 * @param newSender java.lang.String
	 */
	public void setSender (java.lang.String newSender ) {
	 	this.sender = newSender;
	} 	 
	
	/**
	 * 属性 sendtime的Getter方法.属性名：发送时间
	 *  创建日期:2018-8-16
	 * @return java.util.Date
	 */
	public java.util.Date getSendtime () {
		return sendtime;
	}
	   
	/**
	 * 属性sendtime的Setter方法.属性名：发送时间
	 * 创建日期:2018-8-16
	 * @param newSendtime java.util.Date
	 */
	public void setSendtime (java.util.Date newSendtime ) {
	 	this.sendtime = newSendtime;
	} 	 
	
	/**
	 * 属性 state的Getter方法.属性名：状态
	 *  创建日期:2018-8-16
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getState () {
		return state;
	}
	   
	/**
	 * 属性state的Setter方法.属性名：状态
	 * 创建日期:2018-8-16
	 * @param newState java.lang.Integer
	 */
	public void setState (java.lang.Integer newState ) {
	 	this.state = newState;
	} 	 
	
	/**
	 * 属性 content的Getter方法.属性名：内容
	 *  创建日期:2018-8-16
	 * @return java.lang.String
	 */
	public java.lang.String getContent () {
		return content;
	}
	   
	/**
	 * 属性content的Setter方法.属性名：内容
	 * 创建日期:2018-8-16
	 * @param newContent java.lang.String
	 */
	public void setContent (java.lang.String newContent ) {
	 	this.content = newContent;
	} 	 
	
	/**
	 * 属性 receiverid的Getter方法.属性名：接受者id
	 *  创建日期:2018-8-16
	 * @return java.lang.String
	 */
	public java.lang.String getReceiverid () {
		return receiverid;
	}
	   
	/**
	 * 属性receiverid的Setter方法.属性名：接受者id
	 * 创建日期:2018-8-16
	 * @param newReceiverid java.lang.String
	 */
	public void setReceiverid (java.lang.String newReceiverid ) {
	 	this.receiverid = newReceiverid;
	} 	 
	
	/**
	 * 属性 receiver的Getter方法.属性名：接受者
	 *  创建日期:2018-8-16
	 * @return java.lang.String
	 */
	public java.lang.String getReceiver () {
		return receiver;
	}
	   
	/**
	 * 属性receiver的Setter方法.属性名：接受者
	 * 创建日期:2018-8-16
	 * @param newReceiver java.lang.String
	 */
	public void setReceiver (java.lang.String newReceiver ) {
	 	this.receiver = newReceiver;
	} 	 
	
	/**
	 * 属性 detailurl的Getter方法.属性名：详情url
	 *  创建日期:2018-8-16
	 * @return java.lang.String
	 */
	public java.lang.String getDetailurl () {
		return detailurl;
	}
	   
	/**
	 * 属性detailurl的Setter方法.属性名：详情url
	 * 创建日期:2018-8-16
	 * @param newDetailurl java.lang.String
	 */
	public void setDetailurl (java.lang.String newDetailurl ) {
	 	this.detailurl = newDetailurl;
	} 	 
	
	/**
	 * 属性 messagetype的Getter方法.属性名：类型
	 *  创建日期:2018-8-16
	 * @return java.lang.String
	 */
	public java.lang.String getMessagetype () {
		return messagetype;
	}
	   
	/**
	 * 属性messagetype的Setter方法.属性名：类型
	 * 创建日期:2018-8-16
	 * @param newMessagetype java.lang.String
	 */
	public void setMessagetype (java.lang.String newMessagetype ) {
	 	this.messagetype = newMessagetype;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2018-8-16
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2018-8-16
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2018-8-16
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2018-8-16
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "message";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}