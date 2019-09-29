package com.ding.cms.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ding.cms.entity.Product;
import com.ding.cms.repository.ProductDao;
import com.yonyou.iuap.persistence.bs.dao.DAOException;

@Service
public class ProductService {

	@Autowired
	private ProductDao dao;
	
	public Product queryByPk(String productid){
		Product p=dao.findById(productid);
		p.setId_productbody(dao.findChildById(productid));
		return p;
	}
	 @Transactional
	public Product save(Product p){
		return dao.save(p);
	}
	
	
	 public void delById(String productid){
		 Product p=dao.findById(productid);
		 List<Product> list=new ArrayList<Product>();
		 list.add(p);
		 batchDeleteEntity(list);
	 }
	 
    /**
     * 批量删除数据
     * @param list
     */
    @Transactional
    public void batchDeleteEntity(List<Product> list) {
        this.batchDelChild(list);
        dao.batchDelete(list);
    }

    /**
     * 删除主表下面的子表数据
     * 
     * @param list
     * @throws DAOException
     */
    private void batchDelChild(List<Product> list) throws DAOException {
        dao.batchDelChild(list);
    }	 
	
    /**
     * 根据传递的参数，进行分页查询
     */
    public Page<Product> selectAllByPage(Map<String, Object> searchParams, PageRequest pageRequest) {
    	Page<Product> pageResult = dao.selectAllByPage(pageRequest, searchParams) ;
        return pageResult;
    }
    
    /**
     * 根据传递的参数，进行分页查询
     */
    public Object unselectedProduct(Map<String, Object> searchParams, PageRequest pageRequest) {
        return dao.unselectedProduct(pageRequest, searchParams);
    }
    
    /**
	 * 返回选中产品
	 */
	public List<Product> selectedProduct(String productids){
		return dao.selectedProduct(productids);
	}
    
}
