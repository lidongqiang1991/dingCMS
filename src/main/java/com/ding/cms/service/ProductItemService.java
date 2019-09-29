package com.ding.cms.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ding.cms.entity.ItemMaterial;
import com.ding.cms.entity.Material;
import com.ding.cms.entity.Productitem;
import com.ding.cms.repository.ProductItemDao;

@Service
public class ProductItemService {
	@Autowired
	private ProductItemDao productitemDao;
	
	/**
	 * 通过Id查询
	 * @param id
	 * @return
	 */
	public Productitem findById(String id){
    	return productitemDao.findById(id);
    }
    
    /**
     * 保存 编辑
     * @param entity
     * @return
     */
    @Transactional
    public Productitem save(Productitem entity) {
        return	productitemDao.save(entity) ;
    }
    
    /**
     * 批量删除数据
     * @param list
     */
    @Transactional
    public void batchDeleteEntity(List<Productitem> list) {
    	productitemDao.batchDelete(list);
    }
    
    /**
     * 根据传递的参数，进行分页查询
     */
    public Page<Productitem> selectAllByPage(Map<String, Object> searchParams, PageRequest pageRequest) {
    	Page<Productitem> pageResult = productitemDao.selectAllByPage(pageRequest, searchParams) ;
        return pageResult;
    }
    
    /**
     * 根据编码查询
     * @param code
     * @return
     */
    public List<Productitem> findByitemCode(String code) {
    	 return productitemDao.findByCode(code ) ;
    }
    /**
     * 当材料修改时更改细项信息
     * @param entity
     */
    public void setItemByPrice(Material entity){
    	productitemDao.setItemByPrice(entity);
    } 
    
    public List<ItemMaterial> queryItemMaterial(String itemid){
    	return productitemDao.queryItemMaterial(itemid);
    }
    
    public void setItemMaterial(String itemid ,List<ItemMaterial> itemMaterials){
    	productitemDao.setItemMaterial(itemid,itemMaterials);
    }
    
    public void deleteItemMaterial(List<ItemMaterial> itemMaterials){
    	productitemDao.deleteItemMaterial(itemMaterials);
    }
    
    /**
     * 获取细项未选择的材料
     */
    public Page<Material> queryUnselectedMaterialForItem(PageRequest pageRequest, Map<String, Object> searchParams){
    	return productitemDao.queryUnselectedMaterialForItem(pageRequest,searchParams);
    }
    
    /**
     * 将目前的细项绑定材料生成ItemMaterial
     */
    public void autoCreateItemMaterial(){
    	productitemDao.autoCreateItemMaterial();
    }
    
}
