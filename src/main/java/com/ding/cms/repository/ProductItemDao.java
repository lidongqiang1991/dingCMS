package com.ding.cms.repository;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.druid.util.StringUtils;
import com.ding.cms.entity.BillOrderMaterialBody;
import com.ding.cms.entity.ItemMaterial;
import com.ding.cms.entity.Material;
import com.ding.cms.entity.Productbody;
import com.ding.cms.entity.Productitem;
import com.ding.cms.service.MaterialService;
import com.ding.cms.util.DateUtils;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.iweb.exception.ValidException;
import com.yonyou.iuap.persistence.bs.dao.DAOException;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;
import com.yonyou.iuap.system.entity.SysUser;

/**
 * 
 * @author WZW
 *
 */
@Repository
public class ProductItemDao {
	@Autowired
    private MetadataDAO metadataDAO;
	@Autowired
	private MaterialService materialService;
	
    /**
     * 分页查询方法
     * @param pageRequest
     * @param searchParams
     * @return
     * @throws DAOException
     */
	public Page<Productitem> selectAllByPage(PageRequest pageRequest, Map<String, Object> searchParams) throws DAOException {
		String sql = " select * from bd_productitem ";
		StringBuilder sb = new StringBuilder();
		sb.append(sql);
		SQLParameter sqlparam = new SQLParameter();
		if(null != searchParams && !searchParams.isEmpty()){
			sb.append(" where ");
			for(Map.Entry<String, Object> entry : searchParams.entrySet() ){
				String key=entry.getKey();
				String value=(String)entry.getValue();
				if(value.equals("-1")){
					continue;
				}
				
				if(StringUtils.isEmpty(value)){
					continue;
				}
	   			if(key.equalsIgnoreCase("searchParam")){
	   				sb.append(" ( itemname like ? OR itemcode like ? ) AND ");
	   				sqlparam.addParam("%" + value + "%");
	   				sqlparam.addParam("%" + value + "%");
	   			}
	   			else if(key.equalsIgnoreCase("type")){
	   				sb.append(" type = ? and ");
	   				sqlparam.addParam(value);
	   			}
	   			else if(key.equalsIgnoreCase("id")){
					sb.append(" itemid = ? and ");
					sqlparam.addParam(value);
				}
	   			
	   			else if(key.equalsIgnoreCase("itemids")){
	   				String itemidsStr=value;
	   				String[] itemids=itemidsStr.split(",");
					sb.append(" itemid not in(");
					for (int i = 0; i < itemids.length; i++) {
						sb.append(" ?,");
						sqlparam.addParam(itemids[i]);
					}
					sb.delete(sb.length()-1, sb.length());
					sb.append(")  and ");
					
				}
	   		 }
			sb.delete(sb.length()-4, sb.length());
	   		sql=sb.toString();
	   	}
		Page<Productitem> sd=metadataDAO.queryPage(sql, sqlparam, pageRequest, Productitem.class);
	   	return sd;
	}
	
    /**
     * 保存和编辑,单个的保存和编辑
     * @param entity
     * @return
     */
    @Transactional
    public Productitem save(Productitem entity) {
    	SysUser u=(SysUser)InvocationInfoProxy.getExtendAttribute("currentUser");
    	//add增加
    	if(entity.getItemid() ==null ){
    		 entity.setStatus(VOStatus.NEW);
//    		 entity = disposeFun(entity);
    		 entity.setOrgid(u.getOrgid());
    		 entity.setOrgname(u.getOrgname());
    		 entity.setItemid(UUID.randomUUID().toString());
             entity.setCreatorid(InvocationInfoProxy.getUserid());
             entity.setCreator(InvocationInfoProxy.getUsername());
             entity.setCreatetime(DateUtils.currentTimestampToString());
             entity.setDr(0);// 未删除标识
    	}
    	//edit编辑
    	else{
    		entity.setStatus(VOStatus.UPDATED);
//    		entity = disposeFun(entity);
    		entity.setModifier(u.getUsername());
    		entity.setModifierid(u.getId());
    		entity.setModifytime(DateUtils.currentTimestampToString());
    	}
    	disposeFun(entity);
    	metadataDAO.save(entity);
    	return entity ;
    }
    
    /**
     * 批量删除
     * @param list
     * @throws DAOException
     */
    public void batchDelete(List<Productitem> list) throws DAOException {
    	//判断细项是否被引用
    	String  sql1="select * from  bd_product_b  where  itemid ='"+list.get(0).getItemid()+"'";
    	String  sql2="select * from  bill_order_b1  where itemid ='"+list.get(0).getItemid()+"'";
    	
    	List<Productbody> li1=metadataDAO.queryByClause(Productbody.class, sql1);
    	List<BillOrderMaterialBody> li2=metadataDAO.queryByClause(BillOrderMaterialBody.class, sql2);
    	if(li1.isEmpty()&&li2.isEmpty()){
    		metadataDAO.remove(list);
    	}else{ 
    		//引用的订单细项/产品套餐
    		StringBuffer ss=new StringBuffer();
    		if(!li1.isEmpty()) ss.append(JSONArray.fromObject(li1).toString());
    		if(!li2.isEmpty()) ss.append(JSONArray.fromObject(li2).toString());
    		throw new ValidException("细项已被引用，无法删除！【"+ss+"】");
    	}
    }
    
    /**
     * 通过Id查询单个
     * @param id
     * @return
     * @throws DAOException
     */
    public Productitem findById(String id) throws DAOException {

        String sql = "select * from bd_productitem where itemid=?";
        SQLParameter sqlparam = new SQLParameter();
        sqlparam.addParam(id);
        return  metadataDAO.queryByPK(Productitem.class, id);
    }
    
    /**
     * 通过code查询
     * @param code
     * @return
     * @throws DAOException
     */
    public List<Productitem> findByCode(String code) throws DAOException {

        String sql = "select * from bd_productitem where itemcode=?";
        SQLParameter sqlparam = new SQLParameter();
        sqlparam.addParam(code);
        return  metadataDAO.queryByClause(Productitem.class, sql, sqlparam);
    }
    
    /**
     * 私有方法，专门用来处理保存和编辑时，材料 name cost servicecost 三个字段；
     * 因为保存和编辑都要调用处理，所以单独提出来
     * @return
     */
    private void disposeFun(Productitem entity){
    	if(entity.getMaterialid() != null&&!entity.getMaterialid().equals("")){
    		 double pri = Double.valueOf(materialService.findById(entity.getMaterialid()).getPrice());
    		 double num = entity.getMaterialamount()==null?0.00:entity.getMaterialamount();
    		 //材料成本
    		 entity.setMaterialcost(pri*num);
    		 //entity.setMaterialcost(materialService.findById(entity.getMaterialid()).getPrice());
    		 //材料名称
    		 entity.setMaterialname(materialService.findById(entity.getMaterialid()).getName());
    		 entity.setServicecost(entity.getPrice()-entity.getMaterialcost());
		 }else{
			 entity.setServicecost(entity.getPrice());
			 entity.setMaterialcost(0D);
		 }
    }
    /**
     * 当材料修改时更改细项信息
     * @param entity
     */
    public void setItemByPrice(Material entity){
    	 String sql = "updata set materialcost=? ,set materialname =? from bd_productitem where materialid=?";
         SQLParameter sqlparam = new SQLParameter();
         sqlparam.addParam(entity.getPrice());
         sqlparam.addParam(entity.getName());
         sqlparam.addParam(entity.getId());
         metadataDAO.queryByClause(Productitem.class, sql, sqlparam);
    }
    
    /**
     * 给产品细项保存多条材料信息
     */
    public void setItemMaterial(String itemid , List<ItemMaterial> itemMaterials){
    	//保存前先删除材料
    	metadataDAO.update("delete from product_item_material where itemid = '"+itemid+"'");
    	if(itemMaterials!=null&&itemMaterials.size()>=0){
    		for(ItemMaterial entity : itemMaterials){
    	    	//add增加
    	    	if(entity.getBillid() ==null ){
    	    		 entity.setStatus(VOStatus.NEW);
    	    		 entity.setBillid(UUID.randomUUID().toString());
    	    		 entity.setItemid(itemid);
    	             entity.setCreatorid(InvocationInfoProxy.getUserid());
    	             entity.setCreator(InvocationInfoProxy.getUsername());
    	             entity.setCreatetime(DateUtils.currentTimestampToString());
    	             entity.setDr(0);// 未删除标识
    	    	}
    	    	//edit编辑
    	    	else{
    	    		entity.setStatus(VOStatus.UPDATED);
    	    	}
    	    	metadataDAO.save(entity);
    		}
    		caculateMaterialCost(itemMaterials.get(0).getItemid());
    	}
    }
    
    public void deleteItemMaterial(List<ItemMaterial> itemMaterials){
    	if(itemMaterials!=null&&itemMaterials.size()>0){
    		metadataDAO.remove(itemMaterials);
    		caculateMaterialCost(itemMaterials.get(0).getItemid());
    	}
    }
    
    public List<ItemMaterial> queryItemMaterial(String itemid){
    	String sql = "select * from product_item_material where dr = 0 and itemid = '"+itemid+"'";
    	List<ItemMaterial> itemMaterials = metadataDAO.queryByClause(ItemMaterial.class, sql);
    	return itemMaterials;
    }
    
    private void caculateMaterialCost(String itemid){
    	List<ItemMaterial> itemMaterials = queryItemMaterial(itemid);
    	if(itemMaterials!=null&&itemMaterials.size()>0){
    		Productitem item = findById(itemid);
    		double price = item.getPrice();
    		double materialCost = 0.0;
    		for(ItemMaterial itemMaterial : itemMaterials){
    			if(!StringUtils.isEmpty(itemMaterial.getMaterialid())){
    				Material material = metadataDAO.queryByPK(Material.class, itemMaterial.getMaterialid());
    				if(material!=null&&!StringUtils.isEmpty(material.getPrice().toString())){
    					if(!StringUtils.isEmpty(itemMaterial.getMaterialamount().toString())){
    						materialCost += (material.getPrice())*(itemMaterial.getMaterialamount());
    					}else{
    						materialCost += material.getPrice();
    					}
    					
    				}
    			}
    		}
    		double serviceCost = price - materialCost;
    		item.setMaterialcost(materialCost);
    		item.setServicecost(serviceCost);
    		metadataDAO.update(item);
    	}
    }
    
    /**
     * 获取细项未选择的材料
     */
    public Page<Material> queryUnselectedMaterialForItem(PageRequest pageRequest, Map<String, Object> searchParams) throws DAOException {
    	String sql = "select * from bd_material where dr = 0 ";
    	StringBuilder sb = new StringBuilder();
		sb.append(sql);
    	SQLParameter sqlparam = new SQLParameter();
    	if(null != searchParams && !searchParams.isEmpty()){
			for(Map.Entry<String, Object> entry : searchParams.entrySet() ){
				String key=entry.getKey();
				String value=(String)entry.getValue();
				if(value.equals("-1")){
					continue;
				}
				if(StringUtils.isEmpty(value)){
					continue;
				}
	   			else if(key.equalsIgnoreCase("ids")){
	   				String itemidsStr=value;
	   				String[] itemids=itemidsStr.split(",");
					sb.append(" and id not in(");
					for (int i = 0; i < itemids.length; i++) {
						sb.append(" ?,");
						sqlparam.addParam(itemids[i]);
					}
					sb.delete(sb.length()-1, sb.length());
					sb.append(") ");
				}
	   		 }
	   	}
    	Page<Material> list = metadataDAO.queryPage(sb.toString(), sqlparam, pageRequest, Material.class);
    	return list;
    }
    
    /**
     * 将目前的细项绑定材料生成ItemMaterial
     */
    public void autoCreateItemMaterial(){
    	List<Productitem> items = metadataDAO.queryAll(Productitem.class);
    	for(Productitem item : items){
    		if(!StringUtils.isEmpty(item.getMaterialid())){
    			ItemMaterial itemMaterial = new ItemMaterial();
    			itemMaterial.setStatus(VOStatus.NEW);
    			itemMaterial.setBillid(UUID.randomUUID().toString());
    			itemMaterial.setCreatorid(InvocationInfoProxy.getUserid());
    			itemMaterial.setCreator(InvocationInfoProxy.getUsername());
    			itemMaterial.setCreatetime(DateUtils.currentTimestampToString());
    			itemMaterial.setMaterialid(item.getMaterialid());
    			itemMaterial.setMaterialname(item.getMaterialname());
    			itemMaterial.setMaterialamount(item.getMaterialamount());
    			itemMaterial.setItemid(item.getItemid());
    			metadataDAO.save(itemMaterial);
    		}
    	}
    	
    }
    
	
}
	
	
	
	
	
	
	
	
	
	


