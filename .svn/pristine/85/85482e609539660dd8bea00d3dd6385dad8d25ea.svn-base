package com.ding.cms.service;

import java.sql.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ding.cms.entity.Payment;
import com.ding.cms.repository.PaymentDao;
import com.ding.cms.util.DateUtils;

@Service
public class PaymentService {
	@Autowired
	private PaymentDao paymentDao;
	
	/**
	 * 通过Id查询
	 * @param id
	 * @return
	 */
	public Payment findById(String id){
    	return paymentDao.findById(id);
    }
    
    /**
     * 保存 编辑
     * @param entity
     * @return
     */
    @Transactional
    public Payment save(Payment entity) {
        return	paymentDao.save(entity) ;
    }
    
    /**
     * 批量删除数据
     * @param list
     */
    @Transactional
    public void batchDeleteEntity(List<Payment> list) {
    	paymentDao.batchDelete(list);
    }
    
    /**
     * 根据传递的参数，进行分页查询
     */
    public Page<Payment> selectAllByPage(Map<String, Object> searchParams, PageRequest pageRequest) {
    	Page<Payment> pageResult = paymentDao.selectAllByPage(pageRequest, searchParams) ;
        return pageResult;
    }
    
    /**
     * 根据编码查询
     * @param code
     * @return
     */
    public List<Payment> findByitemCode(String code) {
    	 return paymentDao.findByCode(code ) ;
    }
    
    /**
     * 审核
     * @param entity
     * @return
     */
    @Transactional
    public Payment audit(String paymentid, String auditstate, String auditnote) {
    	Payment payment = paymentDao.findById(paymentid);
    	payment.setAuditstate(Integer.valueOf(auditstate));
    	payment.setAuditnote(auditnote);
    	payment.setTs(DateUtils.currentTimestamp());
        return	paymentDao.save(payment);
    }
    
    /**
     * 根据传递的参数，进行分页查询
     */
    public Page<Payment> selectAllByPageForContract(Map<String, Object> searchParams, PageRequest pageRequest) {
    	Page<Payment> pageResult = paymentDao.selectAllByPageForContract(pageRequest, searchParams) ;
        return pageResult;
    }
    
    /**
     * 支付记录修改状态，0提交审核，8退回编辑
     */
    public void paymentChangeState(String paymentid,int state,String memo){
    	paymentDao.paymentChangeState(paymentid,state,memo);
    }
    
}
