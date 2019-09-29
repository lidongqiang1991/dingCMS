package com.ding.cms.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ding.cms.entity.BillOrder;
import com.ding.cms.entity.BillOrderListEntity;
import com.ding.cms.entity.BillOrderMaterialBody;
import com.ding.cms.entity.BillOrderProductBody;
import com.ding.cms.repository.BillOrderDao;

@Service
public class BillOrderService {
	
	@Autowired
	private BillOrderDao billOrderDao;
	
	public BillOrder queryByPk(String orderid){
		return billOrderDao.findById(orderid);
	}
	
	/**
     * 根据传递的参数，进行分页查询
     */
    public Page<BillOrderListEntity> selectAllByPage(Map<String, Object> searchParams, PageRequest pageRequest) {
    	Page<BillOrderListEntity> pageResult = billOrderDao.selectAllByPage(pageRequest, searchParams) ;
        return pageResult;
    }
    
    public void cancelOrder(String serviceid,String orderid,String reason){
    	billOrderDao.cancelOrder(serviceid,orderid,reason);
    }
	
    /**
     * 获取所有   order
     * @param serviceid
     * @return
     */
    public List<BillOrder> listOrder(String serviceid){
    	return billOrderDao.listOrder(serviceid);
    }
    
    @Transactional
    public BillOrder createOrder(BillOrder order){
    	return billOrderDao.createOrder(order);
    }
    
    /**
     * 物料
     * @param
     * @param pageRequest
     * @return
     */
    public Page<BillOrderProductBody> selectMaterialPage(Map<String, Object> searchParams, PageRequest pageRequest){
    	return billOrderDao.selectMaterialPage(pageRequest, searchParams);
    }
    
    /**
     * 套餐细项
     * @param searchParams
     * @param pageRequest
     * @return
     */
    public Page<BillOrderMaterialBody> selectProductPage(Map<String, Object> searchParams, PageRequest pageRequest){
    	return billOrderDao.selectProductPage(pageRequest, searchParams);
    }
    
    /**
     * 更新订单材料已调配数量
     * @param orderid
     * @param materialid
     * @param allocatedNum
     */
    public void updateOrderMaterialAllocatedNum(String orderid,String materialid,Double allocatedNum){
    	billOrderDao.updateMaterialAllocatedNum(orderid, materialid, allocatedNum);
    }
}
