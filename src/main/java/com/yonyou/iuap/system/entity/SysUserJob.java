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
 *  创建日期:2018-11-19
 * @author 
 * @version 
 */
@Entity(namespace = "metadata",name = "sysUserJob")
@Table(name = "sys_user_job")
public class SysUserJob extends BaseEntity{
	 
    @FK(name = "fk_id_sys_user_job", referenceTableName = "sys_user", referencedColumnName = "id") 
    @Column(name = "fk_id_sys_user_job")
    private java.lang.String fk_id_sys_user_job;
    
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "id")
    private java.lang.String id;
      
    @Column(name = "org_id")
    private java.lang.String orgid;
      
    @Column(name = "dept_id")
    private java.lang.String deptid;
      
    @Column(name = "user_id")
    private java.lang.String userid;
      
    @Column(name = "user_name")
    private java.lang.String username;
      
    @Column(name = "is_active")
    private java.lang.String isactive;
      
    @Column(name = "is_default")
    private java.lang.String isdefault;
      
    @Column(name = "user_job_note")
    private java.lang.String userjobnote;
      
    @Column(name = "creator_id")
    private java.lang.String creatorid;
      
    @Column(name = "creator")
    private java.lang.String creator;
      
    @Column(name = "create_time")
    private java.util.Date createtime;
      
    @Column(name = "modifier_id")
    private java.lang.String modifierid;
      
    @Column(name = "modifier")
    private java.lang.String modifier;
      
    @Column(name = "modify_time")
    private java.util.Date modifytime;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
	

	/**
	 * 属性 fk_id_sys_user_job的Getter方法.属性名：parentPK
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getFk_id_sys_user_job () {
		return fk_id_sys_user_job;
	}
	   
	/**
	 * 属性fk_id_sys_user_job的Setter方法.属性名：parentPK
	 * 创建日期:2018-11-19
	 * @param newFk_id_sys_user_job java.lang.String
	 */
	public void setFk_id_sys_user_job (java.lang.String newFk_id_sys_user_job ) {
	 	this.fk_id_sys_user_job = newFk_id_sys_user_job;
	} 	 
	
	/**
	 * 属性 id的Getter方法.属性名：主键
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getId () {
		return id;
	}
	   
	/**
	 * 属性id的Setter方法.属性名：主键
	 * 创建日期:2018-11-19
	 * @param newId java.lang.String
	 */
	public void setId (java.lang.String newId ) {
	 	this.id = newId;
	} 	 
	
	/**
	 * 属性 orgid的Getter方法.属性名：组织ID
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getOrgid () {
		return orgid;
	}
	   
	/**
	 * 属性orgid的Setter方法.属性名：组织ID
	 * 创建日期:2018-11-19
	 * @param newOrgid java.lang.String
	 */
	public void setOrgid (java.lang.String newOrgid ) {
	 	this.orgid = newOrgid;
	} 	 
	
	/**
	 * 属性 deptid的Getter方法.属性名：部门ID
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getDeptid () {
		return deptid;
	}
	   
	/**
	 * 属性deptid的Setter方法.属性名：部门ID
	 * 创建日期:2018-11-19
	 * @param newDeptid java.lang.String
	 */
	public void setDeptid (java.lang.String newDeptid ) {
	 	this.deptid = newDeptid;
	} 	 
	
	/**
	 * 属性 userid的Getter方法.属性名：用户ID
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getUserid () {
		return userid;
	}
	   
	/**
	 * 属性userid的Setter方法.属性名：用户ID
	 * 创建日期:2018-11-19
	 * @param newUserid java.lang.String
	 */
	public void setUserid (java.lang.String newUserid ) {
	 	this.userid = newUserid;
	} 	 
	
	/**
	 * 属性 username的Getter方法.属性名：用户名称
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getUsername () {
		return username;
	}
	   
	/**
	 * 属性username的Setter方法.属性名：用户名称
	 * 创建日期:2018-11-19
	 * @param newUsername java.lang.String
	 */
	public void setUsername (java.lang.String newUsername ) {
	 	this.username = newUsername;
	} 	 
	
	/**
	 * 属性 isactive的Getter方法.属性名：启用状态
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getIsactive () {
		return isactive;
	}
	   
	/**
	 * 属性isactive的Setter方法.属性名：启用状态
	 * 创建日期:2018-11-19
	 * @param newIsactive java.lang.String
	 */
	public void setIsactive (java.lang.String newIsactive ) {
	 	this.isactive = newIsactive;
	} 	 
	
	/**
	 * 属性 isdefault的Getter方法.属性名：是否默认职责
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getIsdefault () {
		return isdefault;
	}
	   
	/**
	 * 属性isdefault的Setter方法.属性名：是否默认职责
	 * 创建日期:2018-11-19
	 * @param newIsdefault java.lang.String
	 */
	public void setIsdefault (java.lang.String newIsdefault ) {
	 	this.isdefault = newIsdefault;
	} 	 
	
	/**
	 * 属性 userjobnote的Getter方法.属性名：说明
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getUserjobnote () {
		return userjobnote;
	}
	   
	/**
	 * 属性userjobnote的Setter方法.属性名：说明
	 * 创建日期:2018-11-19
	 * @param newUserjobnote java.lang.String
	 */
	public void setUserjobnote (java.lang.String newUserjobnote ) {
	 	this.userjobnote = newUserjobnote;
	} 	 
	
	/**
	 * 属性 creatorid的Getter方法.属性名：创建人ID
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getCreatorid () {
		return creatorid;
	}
	   
	/**
	 * 属性creatorid的Setter方法.属性名：创建人ID
	 * 创建日期:2018-11-19
	 * @param newCreatorid java.lang.String
	 */
	public void setCreatorid (java.lang.String newCreatorid ) {
	 	this.creatorid = newCreatorid;
	} 	 
	
	/**
	 * 属性 creator的Getter方法.属性名：创建人
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getCreator () {
		return creator;
	}
	   
	/**
	 * 属性creator的Setter方法.属性名：创建人
	 * 创建日期:2018-11-19
	 * @param newCreator java.lang.String
	 */
	public void setCreator (java.lang.String newCreator ) {
	 	this.creator = newCreator;
	} 	 
	
	/**
	 * 属性 createtime的Getter方法.属性名：创建时间
	 *  创建日期:2018-11-19
	 * @return java.util.Date
	 */
	public java.util.Date getCreatetime () {
		return createtime;
	}
	   
	/**
	 * 属性createtime的Setter方法.属性名：创建时间
	 * 创建日期:2018-11-19
	 * @param newCreatetime java.util.Date
	 */
	public void setCreatetime (java.util.Date newCreatetime ) {
	 	this.createtime = newCreatetime;
	} 	 
	
	/**
	 * 属性 modifierid的Getter方法.属性名：修改人ID
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getModifierid () {
		return modifierid;
	}
	   
	/**
	 * 属性modifierid的Setter方法.属性名：修改人ID
	 * 创建日期:2018-11-19
	 * @param newModifierid java.lang.String
	 */
	public void setModifierid (java.lang.String newModifierid ) {
	 	this.modifierid = newModifierid;
	} 	 
	
	/**
	 * 属性 modifier的Getter方法.属性名：修改人
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getModifier () {
		return modifier;
	}
	   
	/**
	 * 属性modifier的Setter方法.属性名：修改人
	 * 创建日期:2018-11-19
	 * @param newModifier java.lang.String
	 */
	public void setModifier (java.lang.String newModifier ) {
	 	this.modifier = newModifier;
	} 	 
	
	/**
	 * 属性 modifytime的Getter方法.属性名：修改时间
	 *  创建日期:2018-11-19
	 * @return java.util.Date
	 */
	public java.util.Date getModifytime () {
		return modifytime;
	}
	   
	/**
	 * 属性modifytime的Setter方法.属性名：修改时间
	 * 创建日期:2018-11-19
	 * @param newModifytime java.util.Date
	 */
	public void setModifytime (java.util.Date newModifytime ) {
	 	this.modifytime = newModifytime;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2018-11-19
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2018-11-19
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2018-11-19
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2018-11-19
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "sysUserJob";
    }

    @Override
    public String getNamespace() {
        return "metadata";
    }
}