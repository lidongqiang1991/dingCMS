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
 *  创建日期:2018-9-21
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "SysroleVo")
@Table(name = "sys_role")
public class SysroleVo extends BaseEntity{
	
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "roleid")
    private java.lang.String roleid;
      
    @Column(name = "rolename")
    private java.lang.String rolename;
      
    @Column(name = "rolecode")
    private java.lang.String rolecode;
      
    @Column(name = "roletype")
    private java.lang.String roletype;
      
    @Column(name = "funs")
    private java.lang.String funs;
      
    @Column(name = "creator")
    private java.lang.String creator;
      
    @Column(name = "createtime")
    private java.util.Date createtime;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
	

	/**
	 * 属性 roleid的Getter方法.属性名：主键
	 *  创建日期:2018-9-21
	 * @return java.lang.String
	 */
	public java.lang.String getRoleid () {
		return roleid;
	}
	   
	/**
	 * 属性roleid的Setter方法.属性名：主键
	 * 创建日期:2018-9-21
	 * @param newRoleid java.lang.String
	 */
	public void setRoleid (java.lang.String newRoleid ) {
	 	this.roleid = newRoleid;
	} 	 
	
	/**
	 * 属性 rolename的Getter方法.属性名：角色名
	 *  创建日期:2018-9-21
	 * @return java.lang.String
	 */
	public java.lang.String getRolename () {
		return rolename;
	}
	   
	/**
	 * 属性rolename的Setter方法.属性名：角色名
	 * 创建日期:2018-9-21
	 * @param newRolename java.lang.String
	 */
	public void setRolename (java.lang.String newRolename ) {
	 	this.rolename = newRolename;
	} 	 
	
	/**
	 * 属性 rolecode的Getter方法.属性名：角色编码
	 *  创建日期:2018-9-21
	 * @return java.lang.String
	 */
	public java.lang.String getRolecode () {
		return rolecode;
	}
	   
	/**
	 * 属性rolecode的Setter方法.属性名：角色编码
	 * 创建日期:2018-9-21
	 * @param newRolecode java.lang.String
	 */
	public void setRolecode (java.lang.String newRolecode ) {
	 	this.rolecode = newRolecode;
	} 	 
	
	/**
	 * 属性 roletype的Getter方法.属性名：角色类型
	 *  创建日期:2018-9-21
	 * @return java.lang.String
	 */
	public java.lang.String getRoletype () {
		return roletype;
	}
	   
	/**
	 * 属性roletype的Setter方法.属性名：角色类型
	 * 创建日期:2018-9-21
	 * @param newRoletype java.lang.String
	 */
	public void setRoletype (java.lang.String newRoletype ) {
	 	this.roletype = newRoletype;
	} 	 
	
	/**
	 * 属性 funs的Getter方法.属性名：拥有权限
	 *  创建日期:2018-9-21
	 * @return java.lang.String
	 */
	public java.lang.String getFuns () {
		return funs;
	}
	   
	/**
	 * 属性funs的Setter方法.属性名：拥有权限
	 * 创建日期:2018-9-21
	 * @param newFuns java.lang.String
	 */
	public void setFuns (java.lang.String newFuns ) {
	 	this.funs = newFuns;
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
	 * 属性 createtime的Getter方法.属性名：创建时间
	 *  创建日期:2018-9-21
	 * @return java.util.Date
	 */
	public java.util.Date getCreatetime () {
		return createtime;
	}
	   
	/**
	 * 属性createtime的Setter方法.属性名：创建时间
	 * 创建日期:2018-9-21
	 * @param newCreatetime java.util.Date
	 */
	public void setCreatetime (java.util.Date newCreatetime ) {
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
        return "SysroleVo";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}