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
@Entity(namespace = "metadata",name = "sysUser")
@Table(name = "sys_user")
public class SysUser extends BaseEntity{
	
	public static final int STATUS_ID_01=1;//白名单
	public static final int STATUS_ID_02=0;//黑名单
	
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "id")
    private java.lang.String id;
      
    @Column(name = "org_id")
    private java.lang.String orgid;
      
    @Column(name = "org_name")
    private java.lang.String orgname;
      
    @Column(name = "login_name")
    private java.lang.String loginname;
      
    @Column(name = "user_name")
    private java.lang.String username;
      
    @Column(name = "user_code")
    private java.lang.String usercode;
      
    @Column(name = "sex_id")
    private java.lang.String sexid;
      
    @Column(name = "user_password")
    private java.lang.String userpassword;
      
    @Column(name = "user_email")
    private java.lang.String useremail;
      
    @Column(name = "user_mobile")
    private java.lang.String usermobile;
      
    @Column(name = "certificate_id")
    private java.lang.String certificateid;
      
    @Column(name = "certificate_name")
    private java.lang.String certificatename;
      
    @Column(name = "certificate_code")
    private java.lang.String certificatecode;
      
    @Column(name = "birthdate")
    private java.util.Date birthdate;
      
    @Column(name = "register_date")
    private java.util.Date registerdate;
      
    @Column(name = "platform_id")
    private java.lang.String platformid;
      
    @Column(name = "platform_name")
    private java.lang.String platformname;
      
    @Column(name = "level_id")
    private java.lang.String levelid;
      
    @Column(name = "level_name")
    private java.lang.String levelname;
      
    @Column(name = "image_url")
    private java.lang.String imageurl;
      
    @Column(name = "status_id")
    private java.lang.String statusid;
      
    @Column(name = "status_name")
    private java.lang.String statusname;
      
    @Column(name = "remark")
    private java.lang.String remark;
      
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
        
	
    @OneToMany(targetEntity = com.yonyou.iuap.system.entity.SysUserJob.class)
    private java.util.List<com.yonyou.iuap.system.entity.SysUserJob> idsysuserjob;
	

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
	 * 属性 orgid的Getter方法.属性名：所属组织ID
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getOrgid () {
		return orgid;
	}
	   
	/**
	 * 属性orgid的Setter方法.属性名：所属组织ID
	 * 创建日期:2018-11-19
	 * @param newOrgid java.lang.String
	 */
	public void setOrgid (java.lang.String newOrgid ) {
	 	this.orgid = newOrgid;
	} 	 
	
	/**
	 * 属性 orgname的Getter方法.属性名：所属组织名称
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getOrgname () {
		return orgname;
	}
	   
	/**
	 * 属性orgname的Setter方法.属性名：所属组织名称
	 * 创建日期:2018-11-19
	 * @param newOrgname java.lang.String
	 */
	public void setOrgname (java.lang.String newOrgname ) {
	 	this.orgname = newOrgname;
	} 	 
	
	/**
	 * 属性 loginname的Getter方法.属性名：登录名称
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getLoginname () {
		return loginname;
	}
	   
	/**
	 * 属性loginname的Setter方法.属性名：登录名称
	 * 创建日期:2018-11-19
	 * @param newLoginname java.lang.String
	 */
	public void setLoginname (java.lang.String newLoginname ) {
	 	this.loginname = newLoginname;
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
	 * 属性 usercode的Getter方法.属性名：用户编码
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getUsercode () {
		return usercode;
	}
	   
	/**
	 * 属性usercode的Setter方法.属性名：用户编码
	 * 创建日期:2018-11-19
	 * @param newUsercode java.lang.String
	 */
	public void setUsercode (java.lang.String newUsercode ) {
	 	this.usercode = newUsercode;
	} 	 
	
	/**
	 * 属性 sexid的Getter方法.属性名：性别ID
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getSexid () {
		return sexid;
	}
	   
	/**
	 * 属性sexid的Setter方法.属性名：性别ID
	 * 创建日期:2018-11-19
	 * @param newSexid java.lang.String
	 */
	public void setSexid (java.lang.String newSexid ) {
	 	this.sexid = newSexid;
	} 	 
	
	/**
	 * 属性 userpassword的Getter方法.属性名：登录密码
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getUserpassword () {
		return userpassword;
	}
	   
	/**
	 * 属性userpassword的Setter方法.属性名：登录密码
	 * 创建日期:2018-11-19
	 * @param newUserpassword java.lang.String
	 */
	public void setUserpassword (java.lang.String newUserpassword ) {
	 	this.userpassword = newUserpassword;
	} 	 
	
	/**
	 * 属性 useremail的Getter方法.属性名：用户邮件
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getUseremail () {
		return useremail;
	}
	   
	/**
	 * 属性useremail的Setter方法.属性名：用户邮件
	 * 创建日期:2018-11-19
	 * @param newUseremail java.lang.String
	 */
	public void setUseremail (java.lang.String newUseremail ) {
	 	this.useremail = newUseremail;
	} 	 
	
	/**
	 * 属性 usermobile的Getter方法.属性名：用户手机号
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getUsermobile () {
		return usermobile;
	}
	   
	/**
	 * 属性usermobile的Setter方法.属性名：用户手机号
	 * 创建日期:2018-11-19
	 * @param newUsermobile java.lang.String
	 */
	public void setUsermobile (java.lang.String newUsermobile ) {
	 	this.usermobile = newUsermobile;
	} 	 
	
	/**
	 * 属性 certificateid的Getter方法.属性名：证件类型ID
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getCertificateid () {
		return certificateid;
	}
	   
	/**
	 * 属性certificateid的Setter方法.属性名：证件类型ID
	 * 创建日期:2018-11-19
	 * @param newCertificateid java.lang.String
	 */
	public void setCertificateid (java.lang.String newCertificateid ) {
	 	this.certificateid = newCertificateid;
	} 	 
	
	/**
	 * 属性 certificatename的Getter方法.属性名：证件类型名称
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getCertificatename () {
		return certificatename;
	}
	   
	/**
	 * 属性certificatename的Setter方法.属性名：证件类型名称
	 * 创建日期:2018-11-19
	 * @param newCertificatename java.lang.String
	 */
	public void setCertificatename (java.lang.String newCertificatename ) {
	 	this.certificatename = newCertificatename;
	} 	 
	
	/**
	 * 属性 certificatecode的Getter方法.属性名：证件号码
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getCertificatecode () {
		return certificatecode;
	}
	   
	/**
	 * 属性certificatecode的Setter方法.属性名：证件号码
	 * 创建日期:2018-11-19
	 * @param newCertificatecode java.lang.String
	 */
	public void setCertificatecode (java.lang.String newCertificatecode ) {
	 	this.certificatecode = newCertificatecode;
	} 	 
	
	/**
	 * 属性 birthdate的Getter方法.属性名：出生日期
	 *  创建日期:2018-11-19
	 * @return java.util.Date
	 */
	public java.util.Date getBirthdate () {
		return birthdate;
	}
	   
	/**
	 * 属性birthdate的Setter方法.属性名：出生日期
	 * 创建日期:2018-11-19
	 * @param newBirthdate java.util.Date
	 */
	public void setBirthdate (java.util.Date newBirthdate ) {
	 	this.birthdate = newBirthdate;
	} 	 
	
	/**
	 * 属性 registerdate的Getter方法.属性名：系统注册日期
	 *  创建日期:2018-11-19
	 * @return java.util.Date
	 */
	public java.util.Date getRegisterdate () {
		return registerdate;
	}
	   
	/**
	 * 属性registerdate的Setter方法.属性名：系统注册日期
	 * 创建日期:2018-11-19
	 * @param newRegisterdate java.util.Date
	 */
	public void setRegisterdate (java.util.Date newRegisterdate ) {
	 	this.registerdate = newRegisterdate;
	} 	 
	
	/**
	 * 属性 platformid的Getter方法.属性名：所属平台ID
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getPlatformid () {
		return platformid;
	}
	   
	/**
	 * 属性platformid的Setter方法.属性名：所属平台ID
	 * 创建日期:2018-11-19
	 * @param newPlatformid java.lang.String
	 */
	public void setPlatformid (java.lang.String newPlatformid ) {
	 	this.platformid = newPlatformid;
	} 	 
	
	/**
	 * 属性 platformname的Getter方法.属性名：所属平台名称
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getPlatformname () {
		return platformname;
	}
	   
	/**
	 * 属性platformname的Setter方法.属性名：所属平台名称
	 * 创建日期:2018-11-19
	 * @param newPlatformname java.lang.String
	 */
	public void setPlatformname (java.lang.String newPlatformname ) {
	 	this.platformname = newPlatformname;
	} 	 
	
	/**
	 * 属性 levelid的Getter方法.属性名：用户级别ID
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getLevelid () {
		return levelid;
	}
	   
	/**
	 * 属性levelid的Setter方法.属性名：用户级别ID
	 * 创建日期:2018-11-19
	 * @param newLevelid java.lang.String
	 */
	public void setLevelid (java.lang.String newLevelid ) {
	 	this.levelid = newLevelid;
	} 	 
	
	/**
	 * 属性 levelname的Getter方法.属性名：用户级别名称
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getLevelname () {
		return levelname;
	}
	   
	/**
	 * 属性levelname的Setter方法.属性名：用户级别名称
	 * 创建日期:2018-11-19
	 * @param newLevelname java.lang.String
	 */
	public void setLevelname (java.lang.String newLevelname ) {
	 	this.levelname = newLevelname;
	} 	 
	
	/**
	 * 属性 imageurl的Getter方法.属性名：电子印章图片地址或头像
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getImageurl () {
		return imageurl;
	}
	   
	/**
	 * 属性imageurl的Setter方法.属性名：电子印章图片地址或头像
	 * 创建日期:2018-11-19
	 * @param newImageurl java.lang.String
	 */
	public void setImageurl (java.lang.String newImageurl ) {
	 	this.imageurl = newImageurl;
	} 	 
	
	/**
	 * 属性 statusid的Getter方法.属性名：状态ID
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getStatusid () {
		return statusid;
	}
	   
	/**
	 * 属性statusid的Setter方法.属性名：状态ID
	 * 创建日期:2018-11-19
	 * @param newStatusid java.lang.String
	 */
	public void setStatusid (java.lang.String newStatusid ) {
	 	this.statusid = newStatusid;
	} 	 
	
	/**
	 * 属性 statusname的Getter方法.属性名：状态姓名
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getStatusname () {
		return statusname;
	}
	   
	/**
	 * 属性statusname的Setter方法.属性名：状态姓名
	 * 创建日期:2018-11-19
	 * @param newStatusname java.lang.String
	 */
	public void setStatusname (java.lang.String newStatusname ) {
	 	this.statusname = newStatusname;
	} 	 
	
	/**
	 * 属性 remark的Getter方法.属性名：备注
	 *  创建日期:2018-11-19
	 * @return java.lang.String
	 */
	public java.lang.String getRemark () {
		return remark;
	}
	   
	/**
	 * 属性remark的Setter方法.属性名：备注
	 * 创建日期:2018-11-19
	 * @param newRemark java.lang.String
	 */
	public void setRemark (java.lang.String newRemark ) {
	 	this.remark = newRemark;
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
	 * 属性 idsysuserjob的Getter方法.属性名：idSysUserJob
	 *  创建日期:2018-11-19
	 * @return java.util.List<com.yonyou.iuap.system.entity.SysUserJob>
	 */
	public java.util.List<com.yonyou.iuap.system.entity.SysUserJob> getIdsysuserjob () {
		return idsysuserjob;
	}
	   
	/**
	 * 属性idsysuserjob的Setter方法.属性名：idSysUserJob
	 * 创建日期:2018-11-19
	 * @param newIdsysuserjob java.util.List<com.yonyou.iuap.system.entity.SysUserJob>
	 */
	public void setIdsysuserjob (java.util.List<com.yonyou.iuap.system.entity.SysUserJob> newIdsysuserjob ) {
	 	this.idsysuserjob = newIdsysuserjob;
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
        return "sysUser";
    }

    @Override
    public String getNamespace() {
        return "metadata";
    }
}