package com.ding.cms.service;

import java.sql.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ding.cms.entity.Settlement;
import com.ding.cms.repository.SettlementDao;
import com.ding.cms.util.DateUtils;

@Service
public class SettlementService {
	@Autowired
	private SettlementDao settlementDao;
	
	/**
	 * 通过Id查询
	 * @param id
	 * @return
	 */
	public Settlement findById(String id){
    	return settlementDao.findById(id);
    }
    
    /**
     * 保存 编辑
     * @param entity
     * @return
     */
    @Transactional
    public Settlement save(Settlement entity) {
        return	settlementDao.save(entity) ;
    }
    
    /**
     * 批量删除数据
     * @param list
     */
    @Transactional
    public void batchDeleteEntity(List<Settlement> list) {
    	settlementDao.batchDelete(list);
    }
    
    /**
     * 根据传递的参数，进行分页查询
     */
    public Page<Settlement> selectAllByPage(Map<String, Object> searchParams, PageRequest pageRequest) {
    	Page<Settlement> pageResult = settlementDao.selectAllByPage(pageRequest, searchParams) ;
        return pageResult;
    }
    
    /**
     * 根据id查询金额
     * @param billid
     * @return
     */
    public Map  findByBillid(String billid ,String type){
    	return settlementDao.findByBillid(billid,type);
    }
}
