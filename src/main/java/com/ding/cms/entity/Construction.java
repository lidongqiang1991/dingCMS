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
 *  创建日期:2019-6-19
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "construction")
@Table(name = "bd_construction")
public class Construction extends BaseEntity{
	
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "id")
    private java.lang.String id;
      
    @Column(name = "teamname")
    private java.lang.String teamname;
      
    @Column(name = "photo")
    private java.lang.String photo;
      
    @Column(name = "phone")
    private java.lang.String phone;
      
    @Column(name = "rate")
    private java.lang.String rate;
      
    @Column(name = "jobscope")
    private java.lang.String jobscope;
      
    @Column(name = "owner")
    private java.lang.String owner;
      
    @Column(name = "ownerid")
    private java.lang.String ownerid;
      
    @Column(name = "agent")
    private java.lang.String agent;
      
    @Column(name = "agentid")
    private java.lang.String agentid;
      
    @Column(name = "creator")
    private java.lang.String creator;
      
    @Column(name = "creatorid")
    private java.lang.String creatorid;
      
    @Column(name = "teammemo")
    private java.lang.String teammemo;
      
    @Column(name = "createtime")
    private java.lang.String createtime;
      
    @Column(name = "blstatus")
    private java.lang.Integer blstatus;
      
    @Column(name = "blmemo")
    private java.lang.String blmemo;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
	

	/**
	 * 属性 id的Getter方法.属性名：主键
	 *  创建日期:2019-6-19
	 * @return java.lang.String
	 */
	public java.lang.String getId () {
		return id;
	}
	   
	/**
	 * 属性id的Setter方法.属性名：主键
	 * 创建日期:2019-6-19
	 * @param newId java.lang.String
	 */
	public void setId (java.lang.String newId ) {
	 	this.id = newId;
	} 	 
	
	/**
	 * 属性 teamname的Getter方法.属性名：工长名称
	 *  创建日期:2019-6-19
	 * @return java.lang.String
	 */
	public java.lang.String getTeamname () {
		return teamname;
	}
	   
	/**
	 * 属性teamname的Setter方法.属性名：工长名称
	 * 创建日期:2019-6-19
	 * @param newTeamname java.lang.String
	 */
	public void setTeamname (java.lang.String newTeamname ) {
	 	this.teamname = newTeamname;
	} 	 
	
	/**
	 * 属性 photo的Getter方法.属性名：工长头像
	 *  创建日期:2019-6-19
	 * @return java.lang.String
	 */
	public java.lang.String getPhoto () {
		return photo;
	}
	   
	/**
	 * 属性photo的Setter方法.属性名：工长头像
	 * 创建日期:2019-6-19
	 * @param newPhoto java.lang.String
	 */
	public void setPhoto (java.lang.String newPhoto ) {
	 	this.photo = newPhoto;
	} 	 
	
	/**
	 * 属性 phone的Getter方法.属性名：手机号
	 *  创建日期:2019-6-19
	 * @return java.lang.String
	 */
	public java.lang.String getPhone () {
		return phone;
	}
	   
	/**
	 * 属性phone的Setter方法.属性名：手机号
	 * 创建日期:2019-6-19
	 * @param newPhone java.lang.String
	 */
	public void setPhone (java.lang.String newPhone ) {
	 	this.phone = newPhone;
	} 	 
	
	/**
	 * 属性 rate的Getter方法.属性名：评分等级
	 *  创建日期:2019-6-19
	 * @return java.lang.String
	 */
	public java.lang.String getRate () {
		return rate;
	}
	   
	/**
	 * 属性rate的Setter方法.属性名：评分等级
	 * 创建日期:2019-6-19
	 * @param newRate java.lang.String
	 */
	public void setRate (java.lang.String newRate ) {
	 	this.rate = newRate;
	} 	 
	
	/**
	 * 属性 jobscope的Getter方法.属性名：工种
	 *  创建日期:2019-6-19
	 * @return java.lang.String
	 */
	public java.lang.String getJobscope () {
		return jobscope;
	}
	   
	/**
	 * 属性jobscope的Setter方法.属性名：工种
	 * 创建日期:2019-6-19
	 * @param newJobscope java.lang.String
	 */
	public void setJobscope (java.lang.String newJobscope ) {
	 	this.jobscope = newJobscope;
	} 	 
	
	/**
	 * 属性 owner的Getter方法.属性名：负责人
	 *  创建日期:2019-6-19
	 * @return java.lang.String
	 */
	public java.lang.String getOwner () {
		return owner;
	}
	   
	/**
	 * 属性owner的Setter方法.属性名：负责人
	 * 创建日期:2019-6-19
	 * @param newOwner java.lang.String
	 */
	public void setOwner (java.lang.String newOwner ) {
	 	this.owner = newOwner;
	} 	 
	
	/**
	 * 属性 ownerid的Getter方法.属性名：负责人id
	 *  创建日期:2019-6-19
	 * @return java.lang.String
	 */
	public java.lang.String getOwnerid () {
		return ownerid;
	}
	   
	/**
	 * 属性ownerid的Setter方法.属性名：负责人id
	 * 创建日期:2019-6-19
	 * @param newOwnerid java.lang.String
	 */
	public void setOwnerid (java.lang.String newOwnerid ) {
	 	this.ownerid = newOwnerid;
	} 	 
	
	/**
	 * 属性 agent的Getter方法.属性名：运营商
	 *  创建日期:2019-6-19
	 * @return java.lang.String
	 */
	public java.lang.String getAgent () {
		return agent;
	}
	   
	/**
	 * 属性agent的Setter方法.属性名：运营商
	 * 创建日期:2019-6-19
	 * @param newAgent java.lang.String
	 */
	public void setAgent (java.lang.String newAgent ) {
	 	this.agent = newAgent;
	} 	 
	
	/**
	 * 属性 agentid的Getter方法.属性名：运营商ID
	 *  创建日期:2019-6-19
	 * @return java.lang.String
	 */
	public java.lang.String getAgentid () {
		return agentid;
	}
	   
	/**
	 * 属性agentid的Setter方法.属性名：运营商ID
	 * 创建日期:2019-6-19
	 * @param newAgentid java.lang.String
	 */
	public void setAgentid (java.lang.String newAgentid ) {
	 	this.agentid = newAgentid;
	} 	 
	
	/**
	 * 属性 creator的Getter方法.属性名：创建人
	 *  创建日期:2019-6-19
	 * @return java.lang.String
	 */
	public java.lang.String getCreator () {
		return creator;
	}
	   
	/**
	 * 属性creator的Setter方法.属性名：创建人
	 * 创建日期:2019-6-19
	 * @param newCreator java.lang.String
	 */
	public void setCreator (java.lang.String newCreator ) {
	 	this.creator = newCreator;
	} 	 
	
	/**
	 * 属性 creatorid的Getter方法.属性名：创建人id
	 *  创建日期:2019-6-19
	 * @return java.lang.String
	 */
	public java.lang.String getCreatorid () {
		return creatorid;
	}
	   
	/**
	 * 属性creatorid的Setter方法.属性名：创建人id
	 * 创建日期:2019-6-19
	 * @param newCreatorid java.lang.String
	 */
	public void setCreatorid (java.lang.String newCreatorid ) {
	 	this.creatorid = newCreatorid;
	} 	 
	
	/**
	 * 属性 teammemo的Getter方法.属性名：备注
	 *  创建日期:2019-6-19
	 * @return java.lang.String
	 */
	public java.lang.String getTeammemo () {
		return teammemo;
	}
	   
	/**
	 * 属性teammemo的Setter方法.属性名：备注
	 * 创建日期:2019-6-19
	 * @param newTeammemo java.lang.String
	 */
	public void setTeammemo (java.lang.String newTeammemo ) {
	 	this.teammemo = newTeammemo;
	} 	 
	
	/**
	 * 属性 createtime的Getter方法.属性名：创建时间
	 *  创建日期:2019-6-19
	 * @return java.lang.String
	 */
	public java.lang.String getCreatetime () {
		return createtime;
	}
	   
	/**
	 * 属性createtime的Setter方法.属性名：创建时间
	 * 创建日期:2019-6-19
	 * @param newCreatetime java.lang.String
	 */
	public void setCreatetime (java.lang.String newCreatetime ) {
	 	this.createtime = newCreatetime;
	} 	 
	
	/**
	 * 属性 blstatus的Getter方法.属性名：是否加入黑名单
	 *  创建日期:2019-6-19
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getBlstatus () {
		return blstatus;
	}
	   
	/**
	 * 属性blstatus的Setter方法.属性名：是否加入黑名单
	 * 创建日期:2019-6-19
	 * @param newBlstatus java.lang.Integer
	 */
	public void setBlstatus (java.lang.Integer newBlstatus ) {
	 	this.blstatus = newBlstatus;
	} 	 
	
	/**
	 * 属性 blmemo的Getter方法.属性名：原因
	 *  创建日期:2019-6-19
	 * @return java.lang.String
	 */
	public java.lang.String getBlmemo () {
		return blmemo;
	}
	   
	/**
	 * 属性blmemo的Setter方法.属性名：原因
	 * 创建日期:2019-6-19
	 * @param newBlmemo java.lang.String
	 */
	public void setBlmemo (java.lang.String newBlmemo ) {
	 	this.blmemo = newBlmemo;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2019-6-19
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2019-6-19
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2019-6-19
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2019-6-19
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "construction";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}