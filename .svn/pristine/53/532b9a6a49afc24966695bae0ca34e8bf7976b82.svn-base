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
 *  创建日期:2018-10-30
 * @author 
 * @version 
 */
@Entity(namespace = "dingCMS",name = "Procedurebody")
@Table(name = "sys_procedure_b")
public class Procedurebody extends BaseEntity{
	 
    @FK(name = "fk_id_procedurebody", referenceTableName = "sys_procedure", referencedColumnName = "procedureid") 
    @Column(name = "fk_id_procedurebody")
    private java.lang.String fk_id_procedurebody;
    
    @Id
    @GeneratedValue(strategy = Stragegy.UUID, moudle = "")  
    @Column(name = "procedurebid")
    private java.lang.String procedurebid;
      
    @Column(name = "procedureid")
    private java.lang.String procedureid;
      
    @Column(name = "itemorder")
    private java.lang.String itemorder;
      
    @Column(name = "type")
    private java.lang.String type;
      
    @Column(name = "itemname")
    private java.lang.String itemname;
      
    @Column(name = "memo")
    private java.lang.String memo;
      
    @Column(name = "formid")
    private java.lang.String formid;
      
    @Column(name = "formname")
    private java.lang.String formname;
      
    @Column(name = "vdef1")
    private java.lang.String vdef1;
      
    @Column(name = "vdef2")
    private java.lang.String vdef2;
      
    @Column(name = "vdef3")
    private java.lang.String vdef3;
      
    @Column(name = "vdef4")
    private java.lang.String vdef4;
      
    @Column(name = "vdef5")
    private java.lang.String vdef5;
      
    @Column(name = "dr")
    private java.lang.Integer dr = 0;
      
    @Column(name = "ts")
    private java.util.Date ts;
        
	
	

	/**
	 * 属性 fk_id_procedurebody的Getter方法.属性名：parentPK
	 *  创建日期:2018-10-30
	 * @return java.lang.String
	 */
	public java.lang.String getFk_id_procedurebody () {
		return fk_id_procedurebody;
	}
	   
	/**
	 * 属性fk_id_procedurebody的Setter方法.属性名：parentPK
	 * 创建日期:2018-10-30
	 * @param newFk_id_procedurebody java.lang.String
	 */
	public void setFk_id_procedurebody (java.lang.String newFk_id_procedurebody ) {
	 	this.fk_id_procedurebody = newFk_id_procedurebody;
	} 	 
	
	/**
	 * 属性 procedurebid的Getter方法.属性名：流程细项主键
	 *  创建日期:2018-10-30
	 * @return java.lang.String
	 */
	public java.lang.String getProcedurebid () {
		return procedurebid;
	}
	   
	/**
	 * 属性procedurebid的Setter方法.属性名：流程细项主键
	 * 创建日期:2018-10-30
	 * @param newProcedurebid java.lang.String
	 */
	public void setProcedurebid (java.lang.String newProcedurebid ) {
	 	this.procedurebid = newProcedurebid;
	} 	 
	
	/**
	 * 属性 procedureid的Getter方法.属性名：流程主表主键
	 *  创建日期:2018-10-30
	 * @return java.lang.String
	 */
	public java.lang.String getProcedureid () {
		return procedureid;
	}
	   
	/**
	 * 属性procedureid的Setter方法.属性名：流程主表主键
	 * 创建日期:2018-10-30
	 * @param newProcedureid java.lang.String
	 */
	public void setProcedureid (java.lang.String newProcedureid ) {
	 	this.procedureid = newProcedureid;
	} 	 
	
	/**
	 * 属性 itemorder的Getter方法.属性名：序号
	 *  创建日期:2018-10-30
	 * @return java.lang.String
	 */
	public java.lang.String getItemorder () {
		return itemorder;
	}
	   
	/**
	 * 属性itemorder的Setter方法.属性名：序号
	 * 创建日期:2018-10-30
	 * @param newItemorder java.lang.String
	 */
	public void setItemorder (java.lang.String newItemorder ) {
	 	this.itemorder = newItemorder;
	} 	 
	
	/**
	 * 属性 type的Getter方法.属性名：细项类型
	 *  创建日期:2018-10-30
	 * @return java.lang.String
	 */
	public java.lang.String getType () {
		return type;
	}
	   
	/**
	 * 属性type的Setter方法.属性名：细项类型
	 * 创建日期:2018-10-30
	 * @param newType java.lang.String
	 */
	public void setType (java.lang.String newType ) {
	 	this.type = newType;
	} 	 
	
	/**
	 * 属性 itemname的Getter方法.属性名：细项名称
	 *  创建日期:2018-10-30
	 * @return java.lang.String
	 */
	public java.lang.String getItemname () {
		return itemname;
	}
	   
	/**
	 * 属性itemname的Setter方法.属性名：细项名称
	 * 创建日期:2018-10-30
	 * @param newItemname java.lang.String
	 */
	public void setItemname (java.lang.String newItemname ) {
	 	this.itemname = newItemname;
	} 	 
	
	/**
	 * 属性 memo的Getter方法.属性名：备注
	 *  创建日期:2018-10-30
	 * @return java.lang.String
	 */
	public java.lang.String getMemo () {
		return memo;
	}
	   
	/**
	 * 属性memo的Setter方法.属性名：备注
	 * 创建日期:2018-10-30
	 * @param newMemo java.lang.String
	 */
	public void setMemo (java.lang.String newMemo ) {
	 	this.memo = newMemo;
	} 	 
	
	/**
	 * 属性 formid的Getter方法.属性名：表单id
	 *  创建日期:2018-10-30
	 * @return java.lang.String
	 */
	public java.lang.String getFormid () {
		return formid;
	}
	   
	/**
	 * 属性formid的Setter方法.属性名：表单id
	 * 创建日期:2018-10-30
	 * @param newFormid java.lang.String
	 */
	public void setFormid (java.lang.String newFormid ) {
	 	this.formid = newFormid;
	} 	 
	
	/**
	 * 属性 formname的Getter方法.属性名：表单名称
	 *  创建日期:2018-10-30
	 * @return java.lang.String
	 */
	public java.lang.String getFormname () {
		return formname;
	}
	   
	/**
	 * 属性formname的Setter方法.属性名：表单名称
	 * 创建日期:2018-10-30
	 * @param newFormname java.lang.String
	 */
	public void setFormname (java.lang.String newFormname ) {
	 	this.formname = newFormname;
	} 	 
	
	/**
	 * 属性 vdef1的Getter方法.属性名：自定义项1
	 *  创建日期:2018-10-30
	 * @return java.lang.String
	 */
	public java.lang.String getVdef1 () {
		return vdef1;
	}
	   
	/**
	 * 属性vdef1的Setter方法.属性名：自定义项1
	 * 创建日期:2018-10-30
	 * @param newVdef1 java.lang.String
	 */
	public void setVdef1 (java.lang.String newVdef1 ) {
	 	this.vdef1 = newVdef1;
	} 	 
	
	/**
	 * 属性 vdef2的Getter方法.属性名：自定义项2
	 *  创建日期:2018-10-30
	 * @return java.lang.String
	 */
	public java.lang.String getVdef2 () {
		return vdef2;
	}
	   
	/**
	 * 属性vdef2的Setter方法.属性名：自定义项2
	 * 创建日期:2018-10-30
	 * @param newVdef2 java.lang.String
	 */
	public void setVdef2 (java.lang.String newVdef2 ) {
	 	this.vdef2 = newVdef2;
	} 	 
	
	/**
	 * 属性 vdef3的Getter方法.属性名：自定义项3
	 *  创建日期:2018-10-30
	 * @return java.lang.String
	 */
	public java.lang.String getVdef3 () {
		return vdef3;
	}
	   
	/**
	 * 属性vdef3的Setter方法.属性名：自定义项3
	 * 创建日期:2018-10-30
	 * @param newVdef3 java.lang.String
	 */
	public void setVdef3 (java.lang.String newVdef3 ) {
	 	this.vdef3 = newVdef3;
	} 	 
	
	/**
	 * 属性 vdef4的Getter方法.属性名：自定义项4
	 *  创建日期:2018-10-30
	 * @return java.lang.String
	 */
	public java.lang.String getVdef4 () {
		return vdef4;
	}
	   
	/**
	 * 属性vdef4的Setter方法.属性名：自定义项4
	 * 创建日期:2018-10-30
	 * @param newVdef4 java.lang.String
	 */
	public void setVdef4 (java.lang.String newVdef4 ) {
	 	this.vdef4 = newVdef4;
	} 	 
	
	/**
	 * 属性 vdef5的Getter方法.属性名：自定义项5
	 *  创建日期:2018-10-30
	 * @return java.lang.String
	 */
	public java.lang.String getVdef5 () {
		return vdef5;
	}
	   
	/**
	 * 属性vdef5的Setter方法.属性名：自定义项5
	 * 创建日期:2018-10-30
	 * @param newVdef5 java.lang.String
	 */
	public void setVdef5 (java.lang.String newVdef5 ) {
	 	this.vdef5 = newVdef5;
	} 	 
	
	/**
	 * 属性 dr的Getter方法.属性名：dr
	 *  创建日期:2018-10-30
	 * @return java.lang.Integer
	 */
	public java.lang.Integer getDr () {
		return dr;
	}
	   
	/**
	 * 属性dr的Setter方法.属性名：dr
	 * 创建日期:2018-10-30
	 * @param newDr java.lang.Integer
	 */
	public void setDr (java.lang.Integer newDr ) {
	 	this.dr = newDr;
	} 	 
	
	/**
	 * 属性 ts的Getter方法.属性名：ts
	 *  创建日期:2018-10-30
	 * @return java.util.Date
	 */
	public java.util.Date getTs () {
		return ts;
	}
	   
	/**
	 * 属性ts的Setter方法.属性名：ts
	 * 创建日期:2018-10-30
	 * @param newTs java.util.Date
	 */
	public void setTs (java.util.Date newTs ) {
	 	this.ts = newTs;
	} 	 
	
    @Override
    public String getMetaDefinedName() {
        return "Procedurebody";
    }

    @Override
    public String getNamespace() {
        return "dingCMS";
    }
}