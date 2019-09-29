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
@Entity(namespace = "dingCMS",name = "FilterFactor")
@Table(name = "filter_factor")
public class FilterFactor extends BaseEntity{
	
	public static final String FILTERTYPE_FOR_SYSTEM = "system";
	public static final String FILTERTYPE_FOR_USER = "user";
	 
    @FK(name = "fk_id_filterfactor", referenceTableName = "user_filter", referencedColumnName = "id") 
    @Column(name = "fk_id_filterfactor")
    private java.lang.String fk_id_filterfactor;
    
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "id")
    private java.lang.String id;
      
    @Column(name = "filterid")
    private java.lang.String filterid;
      
    @Column(name = "filtertype")
    private java.lang.String filtertype;
      
    @Column(name = "type")
    private java.lang.String type;
      
    @Column(name = "field")
    private java.lang.String field;
      
    @Column(name = "showname")
    private java.lang.String showname;
      
    @Column(name = "formtype")
    private java.lang.String formtype;
      
    @Column(name = "conditionlist")
    private java.lang.String conditionlist;
      
    @Column(name = "setting")
    private java.lang.String setting;
      
    @Column(name = "creatorid")
    private java.lang.String creatorid;
      
    @Column(name = "creatorname")
    private java.lang.String creatorname;
      
    @Column(name = "def1")
    private java.lang.String def1;
      
    @Column(name = "def2")
    private java.lang.String def2;
      
    @Column(name = "def3")
    private java.lang.String def3;
      
    @Column(name = "judgeindex")
    private java.lang.String judgeindex;
      
    @Column(name = "starttime")
    private java.lang.String starttime;
      
    @Column(name = "endtime")
    private java.lang.String endtime;
      
    @Column(name = "createtime")
    private java.lang.String createtime;
      
    @Column(name = "value")
    private java.lang.String value;
      
    @Column(name = "conditions")
    private java.lang.String conditions;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
	

	/**
	 * 属性 fk_id_filterfactor的Getter方法.属性名：parentPK
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getFk_id_filterfactor () {
		return fk_id_filterfactor;
	}
	   
	/**
	 * 属性fk_id_filterfactor的Setter方法.属性名：parentPK
	 * 创建日期:2019-7-23
	 * @param newFk_id_filterfactor java.lang.String
	 */
	public void setFk_id_filterfactor (java.lang.String newFk_id_filterfactor ) {
	 	this.fk_id_filterfactor = newFk_id_filterfactor;
	} 	 
	
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
	 * 属性 filterid的Getter方法.属性名：场景主键
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getFilterid () {
		return filterid;
	}
	   
	/**
	 * 属性filterid的Setter方法.属性名：场景主键
	 * 创建日期:2019-7-23
	 * @param newFilterid java.lang.String
	 */
	public void setFilterid (java.lang.String newFilterid ) {
	 	this.filterid = newFilterid;
	} 	 
	
	/**
	 * 属性 filtertype的Getter方法.属性名：过滤器类型
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getFiltertype () {
		return filtertype;
	}
	   
	/**
	 * 属性filtertype的Setter方法.属性名：过滤器类型
	 * 创建日期:2019-7-23
	 * @param newFiltertype java.lang.String
	 */
	public void setFiltertype (java.lang.String newFiltertype ) {
	 	this.filtertype = newFiltertype;
	} 	 
	
	/**
	 * 属性 type的Getter方法.属性名：页面分组
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getType () {
		return type;
	}
	   
	/**
	 * 属性type的Setter方法.属性名：页面分组
	 * 创建日期:2019-7-23
	 * @param newType java.lang.String
	 */
	public void setType (java.lang.String newType ) {
	 	this.type = newType;
	} 	 
	
	/**
	 * 属性 field的Getter方法.属性名：字段值
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getField () {
		return field;
	}
	   
	/**
	 * 属性field的Setter方法.属性名：字段值
	 * 创建日期:2019-7-23
	 * @param newField java.lang.String
	 */
	public void setField (java.lang.String newField ) {
	 	this.field = newField;
	} 	 
	
	/**
	 * 属性 showname的Getter方法.属性名：字段显示名称
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getShowname () {
		return showname;
	}
	   
	/**
	 * 属性showname的Setter方法.属性名：字段显示名称
	 * 创建日期:2019-7-23
	 * @param newShowname java.lang.String
	 */
	public void setShowname (java.lang.String newShowname ) {
	 	this.showname = newShowname;
	} 	 
	
	/**
	 * 属性 formtype的Getter方法.属性名：字段类型
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getFormtype () {
		return formtype;
	}
	   
	/**
	 * 属性formtype的Setter方法.属性名：字段类型
	 * 创建日期:2019-7-23
	 * @param newFormtype java.lang.String
	 */
	public void setFormtype (java.lang.String newFormtype ) {
	 	this.formtype = newFormtype;
	} 	 
	
	/**
	 * 属性 conditionlist的Getter方法.属性名：判断条件
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getConditionlist () {
		return conditionlist;
	}
	   
	/**
	 * 属性conditionlist的Setter方法.属性名：判断条件
	 * 创建日期:2019-7-23
	 * @param newConditionlist java.lang.String
	 */
	public void setConditionlist (java.lang.String newConditionlist ) {
	 	this.conditionlist = newConditionlist;
	} 	 
	
	/**
	 * 属性 setting的Getter方法.属性名：配置
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getSetting () {
		return setting;
	}
	   
	/**
	 * 属性setting的Setter方法.属性名：配置
	 * 创建日期:2019-7-23
	 * @param newSetting java.lang.String
	 */
	public void setSetting (java.lang.String newSetting ) {
	 	this.setting = newSetting;
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
	 * 属性 judgeindex的Getter方法.属性名：判断顺序
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getJudgeindex () {
		return judgeindex;
	}
	   
	/**
	 * 属性judgeindex的Setter方法.属性名：判断顺序
	 * 创建日期:2019-7-23
	 * @param newJudgeindex java.lang.String
	 */
	public void setJudgeindex (java.lang.String newJudgeindex ) {
	 	this.judgeindex = newJudgeindex;
	} 	 
	
	/**
	 * 属性 starttime的Getter方法.属性名：开始时间条件
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getStarttime () {
		return starttime;
	}
	   
	/**
	 * 属性starttime的Setter方法.属性名：开始时间条件
	 * 创建日期:2019-7-23
	 * @param newStarttime java.lang.String
	 */
	public void setStarttime (java.lang.String newStarttime ) {
	 	this.starttime = newStarttime;
	} 	 
	
	/**
	 * 属性 endtime的Getter方法.属性名：结束时间条件
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getEndtime () {
		return endtime;
	}
	   
	/**
	 * 属性endtime的Setter方法.属性名：结束时间条件
	 * 创建日期:2019-7-23
	 * @param newEndtime java.lang.String
	 */
	public void setEndtime (java.lang.String newEndtime ) {
	 	this.endtime = newEndtime;
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
	 * 属性 value的Getter方法.属性名：筛选条件值
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getValue () {
		return value;
	}
	   
	/**
	 * 属性value的Setter方法.属性名：筛选条件值
	 * 创建日期:2019-7-23
	 * @param newValue java.lang.String
	 */
	public void setValue (java.lang.String newValue ) {
	 	this.value = newValue;
	} 	 
	
	/**
	 * 属性 conditions的Getter方法.属性名：筛选条件
	 *  创建日期:2019-7-23
	 * @return java.lang.String
	 */
	public java.lang.String getConditions () {
		return conditions;
	}
	   
	/**
	 * 属性conditions的Setter方法.属性名：筛选条件
	 * 创建日期:2019-7-23
	 * @param newConditions java.lang.String
	 */
	public void setConditions (java.lang.String newConditions ) {
	 	this.conditions = newConditions;
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
        return "FilterFactor";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}