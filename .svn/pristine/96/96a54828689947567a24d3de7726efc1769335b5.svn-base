package com.ding.cms.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ding.cms.entity.Material;
import com.ding.cms.repository.MaterialDao;
import com.yonyou.iuap.system.entity.SysroleVo;

@Service
public class MaterialService {
	
	@Autowired
    private MaterialDao materialDao;
	
    public Material findById(String id){
    	return materialDao.findById(id);
    }
    
    /**
     * 保存 编辑
     * @param entity
     * @return
     */
    @Transactional
    public Material save(Material entity) {
        return	materialDao.save(entity) ;
    }
    
    /**
     * 批量删除数据
     * @param list
     */
    @Transactional
    public void batchDeleteEntity(List<Material> list) {
    	materialDao.batchDelete(list);
    }
    
    /**
     * 根据传递的参数，进行分页查询
     */
    public Page<Material> selectAllByPage(Map<String, Object> searchParams, PageRequest pageRequest) {
    	Page<Material> pageResult = materialDao.selectAllByPage(pageRequest, searchParams) ;
        return pageResult;
    }
    
    /**
     * 根据编码查询
     * @param code
     * @return
     */
    public List<Material> findByUserCode(String code) {
    	 return materialDao.findByCode(code ) ;
    }
    
    /**
     * 获取
     * @return
     */
    public List<Material> getAll(){
		return materialDao.getAll();
	}
}
