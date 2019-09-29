package com.ding.cms.repository;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.druid.util.StringUtils;
import com.ding.cms.entity.BillService;
import com.ding.cms.entity.Payment;
import com.ding.cms.service.BillDealService;
import com.ding.cms.service.ServiceService;
import com.ding.cms.util.DateUtils;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.persistence.bs.dao.DAOException;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;
import com.yonyou.iuap.system.entity.SysUser;
import com.yonyou.iuap.system.service.OrgService;

/**
 * 工程服务支付流水的dao
 * @author WZW
 *
 */
@Repository
public class PaymentDao {
	@Autowired
    private MetadataDAO metadataDAO;
	@Autowired
	private ServiceService serviceService;
	@Autowired
	private  OrgService orgService;
	@Autowired
	private BillDealService dealService;
	
	public static final int AUDIT_STATE_08 = 8;//审核状态，自由态
	public static final int AUDIT_STATE_01 = 0;//审核状态，提交态
    /**
     * 分页查询方法
     * @param pageRequest
     * @param searchParams
     * @return
     * @throws DAOException
     */
    public Page<Payment> selectAllByPage(PageRequest pageRequest, Map<String, Object> searchParams) throws DAOException {
    	String sql = " select bsp.*, bc.name,bc.phone,bs.totalamount,bs.paidamount  from bill_service_payment  bsp  left join bill_service bs on"
    			+ " bsp.billid =bs.billid LEFT JOIN  bd_customer bc  on  bs.customerid=bc.customerid   where bsp.dr =0  "; // left join org on sys_user.org_id=org.org_id 
    	StringBuilder sb = new StringBuilder(sql);
    	SQLParameter sqlparam = new SQLParameter();
    	if (null != searchParams && !searchParams.isEmpty()) { 
    		sb.append(" and ");
   		 
    		for(Map.Entry<String, Object> entry : searchParams.entrySet() ){
    			if(entry.getKey().equals("-1")){
					continue;
				}
				
				if(StringUtils.isEmpty(entry.getKey())){
					continue;
				}
				if(entry.getKey().equalsIgnoreCase("searchParam")){
    				sb.append(" ( bsp.serialnum like ? or bc.name like ? or bc.phone like ? or bs.vbillcode = ?) AND ");
    				sqlparam.addParam("%" + entry.getValue() + "%");
    				sqlparam.addParam("%" + entry.getValue() + "%");
    				sqlparam.addParam("%" + entry.getValue() + "%");
    				sqlparam.addParam(entry.getValue() );
    			}
    			/**
    			 * 时间段筛选
    			 */
    			else if(entry.getKey().equals("time")){
					sb.append(" ( bsp.createtime between ? and ? ) and ");
					String time=(String)entry.getValue();
    				switch(time){
    				//7天之前
    				case "0":
    					sqlparam.addParam(getAfterTime(-7));
    					sqlparam.addParam(DateUtils.currentTimestampToString());
    					break;
    				//30天之前
    				case "1":
    					sqlparam.addParam(getAfterTime(-30));
    					sqlparam.addParam(DateUtils.currentTimestampToString());
    					break;
    				//上个月
    				case "2":
    					sqlparam.addParam(getAfterMonthTime(-1));
    					sqlparam.addParam(getAfterTime(-DateUtils.getDay(new Date())+1));
    					break;
    				case "3":
    					for(Map.Entry<String, Object> entryNew : searchParams.entrySet() ){
    						if(entryNew.getKey().equals("startTime")){
    							sqlparam.addParam(entryNew.getValue()+" 00:00:00");
    						}else if(entryNew.getKey().equals("endTime")){
    							sqlparam.addParam(entryNew.getValue()+" 23:59:59");
    						}
    					}
    					break;
    				}
    				
    			}
    			//筛选，审核状态
    			else if(entry.getKey().equals("auditstate")){
					sb.append("bsp."+entry.getKey()+" =? and ");
					sqlparam.addParam(entry.getValue());
				}
				//筛选，不要自由态
    			else if(entry.getKey().equals("notstate")){
					sb.append("bsp.auditstate <> ? and ");
					sqlparam.addParam(entry.getValue());
				}
    			//帅选，类型
    			else if(entry.getKey().equals("type")){
					sb.append("bsp."+entry.getKey()+" =? and ");
					sqlparam.addParam(entry.getValue());
				}
				//筛选，同一个serviceid的所有支付流水
    			else if(entry.getKey().equals("billid")){
    				sb.append("bsp."+entry.getKey()+" =? and ");
					sqlparam.addParam(entry.getValue());
    			}
    		}
    		sb.delete(sb.length()-4, sb.length());
    	}
		sb.append(orgService.getTrueData(Payment.class,"bsp."));
		sb.append("order by bsp.createtime  desc");
    	return metadataDAO.queryPage(sb.toString(), sqlparam, pageRequest, Payment.class);
    }
	
    /**
     * 保存和编辑,单个的保存和编辑
     * @param entity
     * @return 
     */
    @Transactional
    public Payment save(Payment entity) {
    	SysUser u=(SysUser)InvocationInfoProxy.getExtendAttribute("currentUser");
    	//add增加
    	if(entity.getPaymentid() ==null ){
    		 entity.setStatus(VOStatus.NEW);
    		 entity.setOrgid(u.getOrgid());
    		 entity.setOrgname(u.getOrgname());
    		 entity.setAgentid(u.getOrgid());
    		 entity.setAgentname(u.getOrgname());
    		 entity.setPaymentid(UUID.randomUUID().toString());
    		 entity.setSerialnum(String.valueOf(System.currentTimeMillis()));
             entity.setCreatorid(InvocationInfoProxy.getUserid());
             entity.setCreator(InvocationInfoProxy.getUsername());
             entity.setCreatetime(DateUtils.currentTimestampToString());
             entity.setDr(0);// 未删除标识
    	}
    	//edit编辑
    	else{
    		entity.setStatus(VOStatus.UPDATED);
    		entity.setModifier(u.getUsername());
    		entity.setModifierid(u.getId());
    		entity.setModifytime(DateUtils.currentTimestampToString());
    		/**
    		 * 不同的审核状态，不同操作，对应审核人、审核时间、已支付的金额；当支付完时，对应支付状态的改变；
    		 * 审核状态：0 未审核；1已审核
    		 * 
    		 */
    		int auditState = entity.getAuditstate();
    		switch(auditState){
    		//0表示未审核，所以不进行后序操作
	    	case 0:
	    		break;
	    	//暂定1表示审核通过
	    	case 1:
	    		entity = setAuditFun(entity);
	    		break;
	    	//暂定2表示审核未通过
	    	case 2:
	    		entity = setAuditFun(entity);
	    		break;
    		}

    	}
    	metadataDAO.save(entity);
    	return entity ;
    }
    
    /**
     * 批量删除
     * @param list
     * @throws DAOException
     */
    public void batchDelete(List<Payment> list) throws DAOException {
        metadataDAO.remove(list);
    }
    
    /**
     * 通过Id查询单个
     * @param id
     * @return
     * @throws DAOException
     */
    public Payment findById(String id) throws DAOException {
        SQLParameter sqlparam = new SQLParameter();
        sqlparam.addParam(id);
        return  metadataDAO.queryByPK(Payment.class, id);
    }
    
    /**
     * 通过code流水号查询
     * @param code
     * @return
     * @throws DAOException
     */
    public List<Payment> findByCode(String code) throws DAOException {

        String sql = "select * from bill_service_payment where serialnum=?";
        SQLParameter sqlparam = new SQLParameter();
        sqlparam.addParam(code);
        return  metadataDAO.queryByClause(Payment.class, sql, sqlparam);
    }
    
    /**
     * 传入天数，返回供sql语句拼接的参数
     * @param day
     * @return
     */
    private String getAfterTime(int day){
    	Date afterdate = DateUtils.addDate(new Date(System.currentTimeMillis()), day);
		String aftertime = new Timestamp(afterdate.getTime()).toString().substring(0, 11)+"00:00:00";
		
		return aftertime;
    }
    
    /**
     * 传入月数，返回供sql语句拼接的参数
     * @param day
     * @return
     */
    private String getAfterMonthTime(int month){
    	Date afterdate = DateUtils.addMonth(new Date(System.currentTimeMillis()), month);
		String aftertime = new Timestamp(afterdate.getTime()).toString().substring(0, 8)+"01 00:00:00";
		return aftertime;
    }
    
    /**
     * 只要审核了，就会调用此方法
     * 私有方法，用于处理在审核状态改变时，其他字段的修改；
     * 当审核通过时，会更新审核信息，包括已付款金额的更新
     * @return
     */
    private Payment setAuditFun(Payment entity){
    	entity.setAuditor(InvocationInfoProxy.getUsername());
		entity.setAuditorid(InvocationInfoProxy.getUserid());
		entity.setAudittime(DateUtils.currentTimestampToString());
		//判断审核状态，如果是1，则更新 已支付的金额；同时判断是否付完，如果付完  更新支付状态
		if(entity.getAuditstate()==1){
			//获得工程服务的状况
			BillService billService = serviceService.queryByPK(entity.getBillid());
			//首先获得旧已经支付的金额，审核通过前
			double oldPaidamount = billService.getPaidamount()==null?0:billService.getPaidamount();
			//判断type是支付0、优惠1、退款2、支付转移3
			int type = entity.getType();
			switch(type){
			case 0:
				//首先获得新已经支付的金额，审核通过后
				double newPaidamount = oldPaidamount+entity.getPaymoney();
				//判断是否为首次支付，如果是，设置为首次支付
				serviceService.changeValue(entity.getBillid(),  "paidamount", String.valueOf(newPaidamount));
				//判断是否付完全款，如果是，更新状态
				if(newPaidamount>=(billService.getTotalamount()==null?0:billService.getTotalamount())){
					serviceService.changeState(entity.getBillid(), "paystate", BillService.SERVICE_PAYSTATE_03);
					dealService.changeFollowUp(entity.getBillid());
				}else if(newPaidamount>0){
					serviceService.changeState(entity.getBillid(), "paystate", BillService.SERVICE_PAYSTATE_02);
				}
				break;
			//优惠	 
			case 1:
				//首先获得新总金额，审核通过后
				double newtotalamount = billService.getTotalamount()-entity.getPaymoney();
				//判断是否付完全款，如果是，更新状态
				serviceService.changeValue(entity.getBillid(), "totalamount", String.valueOf(newtotalamount));
				if(newtotalamount<=oldPaidamount){
					serviceService.changeState(entity.getBillid(), "paystate", BillService.SERVICE_PAYSTATE_03);
					dealService.changeFollowUp(entity.getBillid());
				}
				break;
			//退款
			case 2:
				//首先获得新已经支付的金额，审核通过后
				double refund = oldPaidamount-entity.getPaymoney();
				if(refund>=0){
					serviceService.changeValue(entity.getBillid(),  "paidamount", String.valueOf(refund));
					serviceService.changeState(entity.getBillid(), "paystate", 2);
				}
				break;
			//支付转移
			case 3:
				
				break;
			}
			
		}
		return entity;
    }
    
    /**
     * 分页查询方法
     * @param pageRequest
     * @param searchParams
     * @return
     * @throws DAOException
     */
    public Page<Payment> selectAllByPageForContract(PageRequest pageRequest, Map<String, Object> searchParams) throws DAOException {
    	String sql = " select bsp.*, bc.name,bc.phone,bs.totalamount  from bill_service_payment  bsp  left join bill_service bs on"
    			+ " bsp.billid =bs.billid LEFT JOIN  bd_customer bc  on  bs.customerid=bc.customerid   where bsp.dr =0  "; // left join org on sys_user.org_id=org.org_id 
    	StringBuilder sb = new StringBuilder(sql);
    	SQLParameter sqlparam = new SQLParameter();
    	if (null != searchParams && !searchParams.isEmpty()) { 
    		sb.append(" and ");
   		 
    		for(Map.Entry<String, Object> entry : searchParams.entrySet() ){
    			if(entry.getKey().equals("-1")){
					continue;
				}
				
				if(StringUtils.isEmpty(entry.getKey())){
					continue;
				}
				if(entry.getKey().equalsIgnoreCase("searchParam")){
    				sb.append(" ( bsp.serialnum like ? or bc.name like ? or bc.phone like ? or bs.vbillcode = ?) AND ");
    				sqlparam.addParam("%" + entry.getValue() + "%");
    				sqlparam.addParam("%" + entry.getValue() + "%");
    				sqlparam.addParam("%" + entry.getValue() + "%");
    				sqlparam.addParam(entry.getValue() );
    			}
    			/**
    			 * 时间段筛选
    			 */
    			else if(entry.getKey().equals("time")){
					sb.append(" ( bsp.createtime between ? and ? ) and ");
					String time=(String)entry.getValue();
    				switch(time){
    				//7天之前
    				case "0":
    					sqlparam.addParam(getAfterTime(-7));
    					sqlparam.addParam(DateUtils.currentTimestampToString());
    					break;
    				//30天之前
    				case "1":
    					sqlparam.addParam(getAfterTime(-30));
    					sqlparam.addParam(DateUtils.currentTimestampToString());
    					break;
    				//上个月
    				case "2":
    					sqlparam.addParam(getAfterMonthTime(-1));
    					sqlparam.addParam(getAfterTime(-DateUtils.getDay(new Date())+1));
    					break;
    				case "3":
    					for(Map.Entry<String, Object> entryNew : searchParams.entrySet() ){
    						if(entryNew.getKey().equals("startTime")){
    							sqlparam.addParam(entryNew.getValue()+" 00:00:00");
    						}else if(entryNew.getKey().equals("endTime")){
    							sqlparam.addParam(entryNew.getValue()+" 23:59:59");
    						}
    					}
    					break;
    				}
    				
    			}
    			//筛选，审核状态
    			else if(entry.getKey().equals("auditstate")){
					sb.append("bsp."+entry.getKey()+" =? and ");
					sqlparam.addParam(entry.getValue());
				}
    			//帅选，类型
    			else if(entry.getKey().equals("type")){
					sb.append("bsp."+entry.getKey()+" =? and ");
					sqlparam.addParam(entry.getValue());
				}
				//筛选，同一个serviceid的所有支付流水
    			else if(entry.getKey().equals("billid")){
    				sb.append("bsp."+entry.getKey()+" =? and ");
					sqlparam.addParam(entry.getValue());
    			}
    		}
    		sb.delete(sb.length()-4, sb.length());
    	}
		sb.append("order by bsp.createtime  desc");
    	return metadataDAO.queryPage(sb.toString(), sqlparam, pageRequest, Payment.class);
    }
    
    /**
     * 支付记录修改状态，3撤回记录，4取消审核
     */
    public void paymentChangeState(String paymentid,int state,String memo){
    	Payment payment = findById(paymentid);
    	if(payment!=null){
    		payment.setStatus(VOStatus.UPDATED);
    		payment.setAuditor(InvocationInfoProxy.getUsername());
    		payment.setAuditorid(InvocationInfoProxy.getUserid());
    		payment.setAudittime(DateUtils.currentTimestampToString());
    		payment.setMemo(memo);
    		if(state==8){
    			payment.setAuditstate(AUDIT_STATE_08);
    		}else{
    			//若反审则修改支付金额
    			if(payment.getAuditstate().equals(1)){
    				//获得工程服务的状况
    				BillService billService = serviceService.queryByPK(payment.getBillid());
    				//首先获得旧已经支付的金额，反审核通过前
    				double oldPaidamount = billService.getPaidamount()==null?0:billService.getPaidamount();
    				//获得新已经支付的金额，反审核通过后
    				double newPaidamount = oldPaidamount-payment.getPaymoney();
    				//修改工程已支付金额
    				serviceService.changeValue(payment.getBillid(),  "paidamount", String.valueOf(newPaidamount));
    				//判断是否付完全款，如果是，更新状态
    				if(newPaidamount>=(billService.getTotalamount()==null?0:billService.getTotalamount())){
    					serviceService.changeState(payment.getBillid(), "paystate", BillService.SERVICE_PAYSTATE_03);
    					dealService.changeFollowUp(payment.getBillid());
    				}else if(newPaidamount>0){
    					serviceService.changeState(payment.getBillid(), "paystate", BillService.SERVICE_PAYSTATE_02);
    				}
    			}
    			payment.setAuditstate(AUDIT_STATE_01);
    		}
    		metadataDAO.update(payment);
    	}
    }

}
