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
 *  创建日期:2019-7-23
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "UserFilter")
@Table(name = "user_filter")
public class UserFilter extends BaseEntity{
	
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "id")
    private java.lang.String id;
      
    @Column(name = "filtername")
    private java.lang.String filtername;
      
    @Column(name = "creatorid")
    private java.lang.String creatorid;
      
    @Column(name = "creatorname")
    private java.lang.String creatorname;
      
    @Column(name = "userid")
    private java.lang.String userid;
      
    @Column(name = "username")
    private java.lang.String username;
      
    @Column(name = "createtime")
    private java.lang.String createtime;
      
    @Column(name = "ishide")
    private java.lang.String ishide;
      
    @Column(name = "isdefault")
    private java.lang.String isdefault;
      
    @Column(name = "orgid")
    private java.lang.String orgid;
      
    @Column(name = "orgname")
    private java.lang.String orgname;
      
    @Column(name = "type")
    private java.lang.String type;
      
    @Column(name = "def1")
    private java.lang.String def1;
      
    @Column(name = "def2")
    private java.lang.String def2;
      
    @Column(name = "def3")
    private java.lang.String def3;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
    @OneToMany(targetEntity = com.ding.cms.entity.FilterFactor.class)
    private java.util.List<com.ding.cms.entity.FilterFactor> id_filterfactor;
	

	/**
	 * 属性 id的Getter方法.属性名：主键
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getId () {
		return id;
	}
	   
	/**
	 * 属性id的Setter方法.属性名：主键
	 * 创建日期:2019-7-23
	 * @param newId java.lang.String
	 */
	public void setId (java.lang.String newId ) {
	 	this.id = newId;
	} 	 
	
	/**
	 * 属性 filtername的Getter方法.属性名：场景名称
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getFiltername () {
		return filtername;
	}
	   
	/**
	 * 属性filtername的Setter方法.属性名：场景名称
	 * 创建日期:2019-7-23
	 * @param newFiltername java.lang.String
	 */
	public void setFiltername (java.lang.String newFiltername ) {
	 	this.filtername = newFiltername;
	} 	 
	
	/**
	 * 属性 creatorid的Getter方法.属性名：创建人id
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getCreatorid () {
		return creatorid;
	}
	   
	/**
	 * 属性creatorid的Setter方法.属性名：创建人id
	 * 创建日期:2019-7-23
	 * @param newCreatorid java.lang.String
	 */
	public void setCreatorid (java.lang.String newCreatorid ) {
	 	this.creatorid = newCreatorid;
	} 	 
	
	/**
	 * 属性 creatorname的Getter方法.属性名：创建人姓名
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getCreatorname () {
		return creatorname;
	}
	   
	/**
	 * 属性creatorname的Setter方法.属性名：创建人姓名
	 * 创建日期:2019-7-23
	 * @param newCreatorname java.lang.String
	 */
	public void setCreatorname (java.lang.String newCreatorname ) {
	 	this.creatorname = newCreatorname;
	} 	 
	
	/**
	 * 属性 userid的Getter方法.属性名：使用者id
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getUserid () {
		return userid;
	}
	   
	/**
	 * 属性userid的Setter方法.属性名：使用者id
	 * 创建日期:2019-7-23
	 * @param newUserid java.lang.String
	 */
	public void setUserid (java.lang.String newUserid ) {
	 	this.userid = newUserid;
	} 	 
	
	/**
	 * 属性 username的Getter方法.属性名：使用者姓名
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getUsername () {
		return username;
	}
	   
	/**
	 * 属性username的Setter方法.属性名：使用者姓名
	 * 创建日期:2019-7-23
	 * @param newUsername java.lang.String
	 */
	public void setUsername (java.lang.String newUsername ) {
	 	this.username = newUsername;
	} 	 
	
	/**
	 * 属性 createtime的Getter方法.属性名：创建时间
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getCreatetime () {
		return createtime;
	}
	   
	/**
	 * 属性createtime的Setter方法.属性名：创建时间
	 * 创建日期:2019-7-23
	 * @param newCreatetime java.lang.String
	 */
	public void setCreatetime (java.lang.String newCreatetime ) {
	 	this.createtime = newCreatetime;
	} 	 
	
	/**
	 * 属性 ishide的Getter方法.属性名：是否显示
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getIshide () {
		return ishide;
	}
	   
	/**
	 * 属性ishide的Setter方法.属性名：是否显示
	 * 创建日期:2019-7-23
	 * @param newIshide java.lang.String
	 */
	public void setIshide (java.lang.String newIshide ) {
	 	this.ishide = newIshide;
	} 	 
	
	/**
	 * 属性 isdefault的Getter方法.属性名：是否默认筛选
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getIsdefault () {
		return isdefault;
	}
	   
	/**
	 * 属性isdefault的Setter方法.属性名：是否默认筛选
	 * 创建日期:2019-7-23
	 * @param newIsdefault java.lang.String
	 */
	public void setIsdefault (java.lang.String newIsdefault ) {
	 	this.isdefault = newIsdefault;
	} 	 
	
	/**
	 * 属性 orgid的Getter方法.属性名：组织id
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getOrgid () {
		return orgid;
	}
	   
	/**
	 * 属性orgid的Setter方法.属性名：组织id
	 * 创建日期:2019-7-23
	 * @param newOrgid java.lang.String
	 */
	public void setOrgid (java.lang.String newOrgid ) {
	 	this.orgid = newOrgid;
	} 	 
	
	/**
	 * 属性 orgname的Getter方法.属性名：组织名称
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getOrgname () {
		return orgname;
	}
	   
	/**
	 * 属性orgname的Setter方法.属性名：组织名称
	 * 创建日期:2019-7-23
	 * @param newOrgname java.lang.String
	 */
	public void setOrgname (java.lang.String newOrgname ) {
	 	this.orgname = newOrgname;
	} 	 
	
	/**
	 * 属性 type的Getter方法.属性名：页面类型
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getType () {
		return type;
	}
	   
	/**
	 * 属性type的Setter方法.属性名：页面类型
	 * 创建日期:2019-7-23
	 * @param newType java.lang.String
	 */
	public void setType (java.lang.String newType ) {
	 	this.type = newType;
	} 	 
	
	/**
	 * 属性 def1的Getter方法.属性名：自定义项1
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getDef1 () {
		return def1;
	}
	   
	/**
	 * 属性def1的Setter方法.属性名：自定义项1
	 * 创建日期:2019-7-23
	 * @param newDef1 java.lang.String
	 */
	public void setDef1 (java.lang.String newDef1 ) {
	 	this.def1 = newDef1;
	} 	 
	
	/**
	 * 属性 def2的Getter方法.属性名：自定义项2
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getDef2 () {
		return def2;
	}
	   
	/**
	 * 属性def2的Setter方法.属性名：自定义项2
	 * 创建日期:2019-7-23
	 * @param newDef2 java.lang.String
	 */
	public void setDef2 (java.lang.String newDef2 ) {
	 	this.def2 = newDef2;
	} 	 
	
	/**
	 * 属性 def3的Getter方法.属性名：自定义项3
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getDef3 () {
		return def3;
	}
	   
	/**
	 * 属性def3的Setter方法.属性名：自定义项3
	 * 创建日期:2019-7-23
	 * @param newDef3 java.lang.String
	 */
	public void setDef3 (java.lang.String newDef3 ) {
	 	this.def3 = newDef3;
	} 	 
	
	/**
	 * 属性 id_filterfactor的Getter方法.属性名：id_FilterFactor
	 *  创建日期:2019-7-23
	 * @return java.util.List<com.ding.cms.entity.FilterFactor>
	 */
	public java.util.List<com.ding.cms.entity.FilterFactor> getId_filterfactor () {
		return id_filterfactor;
	}
	   
	/**
	 * 属性id_filterfactor的Setter方法.属性名：id_FilterFactor
	 * 创建日期:2019-7-23
	 * @param newId_filterfactor java.util.List<com.ding.cms.entity.FilterFactor>
	 */
	public void setId_filterfactor (java.util.List<com.ding.cms.entity.FilterFactor> newId_filterfactor ) {
	 	this.id_filterfactor = newId_filterfactor;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2019-7-23
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2019-7-23
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2019-7-23
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2019-7-23
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "UserFilter";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}