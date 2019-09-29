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
 *  创建日期:2019-4-23
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "Material")
@Table(name = "bd_material")
public class Material extends BaseEntity{
	
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "id")
    private java.lang.String id;
      
    @Column(name = "name")
    private java.lang.String name;
      
    @Column(name = "code")
    private java.lang.String code;
      
    @Column(name = "spec")
    private java.lang.String spec;
      
    @Column(name = "model")
    private java.lang.String model;
      
    @Column(name = "unit")
    private java.lang.String unit;
      
    @Column(name = "price")
    private java.lang.Double price;
      
    @Column(name = "cost")
    private java.lang.Double cost;
      
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
	 * 属性 id的Getter方法.属性名：主键
	 *  创建日期:2019-4-23
	 * @return java.lang.String
	 */
	public java.lang.String getId () {
		return id;
	}
	   
	/**
	 * 属性id的Setter方法.属性名：主键
	 * 创建日期:2019-4-23
	 * @param newId java.lang.String
	 */
	public void setId (java.lang.String newId ) {
	 	this.id = newId;
	} 	 
	
	/**
	 * 属性 name的Getter方法.属性名：名称
	 *  创建日期:2019-4-23
	 * @return java.lang.String
	 */
	public java.lang.String getName () {
		return name;
	}
	   
	/**
	 * 属性name的Setter方法.属性名：名称
	 * 创建日期:2019-4-23
	 * @param newName java.lang.String
	 */
	public void setName (java.lang.String newName ) {
	 	this.name = newName;
	} 	 
	
	/**
	 * 属性 code的Getter方法.属性名：编码
	 *  创建日期:2019-4-23
	 * @return java.lang.String
	 */
	public java.lang.String getCode () {
		return code;
	}
	   
	/**
	 * 属性code的Setter方法.属性名：编码
	 * 创建日期:2019-4-23
	 * @param newCode java.lang.String
	 */
	public void setCode (java.lang.String newCode ) {
	 	this.code = newCode;
	} 	 
	
	/**
	 * 属性 spec的Getter方法.属性名：规格
	 *  创建日期:2019-4-23
	 * @return java.lang.String
	 */
	public java.lang.String getSpec () {
		return spec;
	}
	   
	/**
	 * 属性spec的Setter方法.属性名：规格
	 * 创建日期:2019-4-23
	 * @param newSpec java.lang.String
	 */
	public void setSpec (java.lang.String newSpec ) {
	 	this.spec = newSpec;
	} 	 
	
	/**
	 * 属性 model的Getter方法.属性名：型号
	 *  创建日期:2019-4-23
	 * @return java.lang.String
	 */
	public java.lang.String getModel () {
		return model;
	}
	   
	/**
	 * 属性model的Setter方法.属性名：型号
	 * 创建日期:2019-4-23
	 * @param newModel java.lang.String
	 */
	public void setModel (java.lang.String newModel ) {
	 	this.model = newModel;
	} 	 
	
	/**
	 * 属性 unit的Getter方法.属性名：计量单位
	 *  创建日期:2019-4-23
	 * @return java.lang.String
	 */
	public java.lang.String getUnit () {
		return unit;
	}
	   
	/**
	 * 属性unit的Setter方法.属性名：计量单位
	 * 创建日期:2019-4-23
	 * @param newUnit java.lang.String
	 */
	public void setUnit (java.lang.String newUnit ) {
	 	this.unit = newUnit;
	} 	 
	
	/**
	 * 属性 price的Getter方法.属性名：单价
	 *  创建日期:2019-4-23
	 * @return java.lang.Double
	 */
	public java.lang.Double getPrice () {
		return price;
	}
	   
	/**
	 * 属性price的Setter方法.属性名：单价
	 * 创建日期:2019-4-23
	 * @param newPrice java.lang.Double
	 */
	public void setPrice (java.lang.Double newPrice ) {
	 	this.price = newPrice;
	} 	 
	
	/**
	 * 属性 cost的Getter方法.属性名：成本
	 *  创建日期:2019-4-23
	 * @return java.lang.Double
	 */
	public java.lang.Double getCost () {
		return cost;
	}
	   
	/**
	 * 属性cost的Setter方法.属性名：成本
	 * 创建日期:2019-4-23
	 * @param newCost java.lang.Double
	 */
	public void setCost (java.lang.Double newCost ) {
	 	this.cost = newCost;
	} 	 
	
	/**
	 * 属性 note的Getter方法.属性名：说明
	 *  创建日期:2019-4-23
	 * @return java.lang.String
	 */
	public java.lang.String getNote () {
		return note;
	}
	   
	/**
	 * 属性note的Setter方法.属性名：说明
	 * 创建日期:2019-4-23
	 * @param newNote java.lang.String
	 */
	public void setNote (java.lang.String newNote ) {
	 	this.note = newNote;
	} 	 
	
	/**
	 * 属性 creator的Getter方法.属性名：创建人
	 *  创建日期:2019-4-23
	 * @return java.lang.String
	 */
	public java.lang.String getCreator () {
		return creator;
	}
	   
	/**
	 * 属性creator的Setter方法.属性名：创建人
	 * 创建日期:2019-4-23
	 * @param newCreator java.lang.String
	 */
	public void setCreator (java.lang.String newCreator ) {
	 	this.creator = newCreator;
	} 	 
	
	/**
	 * 属性 creatorid的Getter方法.属性名：创建人id
	 *  创建日期:2019-4-23
	 * @return java.lang.String
	 */
	public java.lang.String getCreatorid () {
		return creatorid;
	}
	   
	/**
	 * 属性creatorid的Setter方法.属性名：创建人id
	 * 创建日期:2019-4-23
	 * @param newCreatorid java.lang.String
	 */
	public void setCreatorid (java.lang.String newCreatorid ) {
	 	this.creatorid = newCreatorid;
	} 	 
	
	/**
	 * 属性 createtime的Getter方法.属性名：创建时间
	 *  创建日期:2019-4-23
	 * @return java.lang.String
	 */
	public java.lang.String getCreatetime () {
		return createtime;
	}
	   
	/**
	 * 属性createtime的Setter方法.属性名：创建时间
	 * 创建日期:2019-4-23
	 * @param newCreatetime java.lang.String
	 */
	public void setCreatetime (java.lang.String newCreatetime ) {
	 	this.createtime = newCreatetime;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2019-4-23
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2019-4-23
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2019-4-23
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2019-4-23
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "Material";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}