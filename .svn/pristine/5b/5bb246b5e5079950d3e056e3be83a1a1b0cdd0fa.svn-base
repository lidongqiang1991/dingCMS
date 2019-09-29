package com.ding.cms.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.alibaba.druid.util.StringUtils;
import com.ding.cms.entity.BillDeal;
import com.ding.cms.entity.BillOrderMaterialBody;
import com.ding.cms.entity.BillService;
import com.ding.cms.entity.BillServiceProcedure;
import com.ding.cms.entity.CustomerListEntity;
import com.ding.cms.entity.LogOrderNote;
import com.ding.cms.entity.LogService;
import com.ding.cms.entity.ServiceListEntity;
import com.ding.cms.repository.ServiceDao;
import com.ding.cms.util.DateUtils;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;
import com.yonyou.iuap.system.entity.Log;

@Service
public class ServiceService {
	
	@Autowired
	private ServiceDao serviceDao;
	@Autowired
	private MetadataDAO metaDao;
	
	/**
     * 根据传递的参数，进行分页查询
     */
    public Page<ServiceListEntity> selectAllByPage(Map<String, Object> searchParams, PageRequest pageRequest) {
    	Page<ServiceListEntity> pageResult = serviceDao.selectAllByPage(searchParams, pageRequest) ;
        return pageResult;
    }
    
    /**
     * 为工程服务分配客服，勘察，工人和管家
     */
	public com.ding.cms.entity.BillService setAllot(String userid , String type , String id, String reason){
		//if("construction".equals(type))check(id);
		return serviceDao.setAllot(userid, type, id, reason);
	}
	
	/**
	 * 计划拟定，开工日期，计划工期
	 */
	public com.ding.cms.entity.BillService setPlannedDate(String serviceid , String startDate , String plannedDate){
		return serviceDao.setPlannedDate(serviceid, startDate, plannedDate);
	}
	
	/**
	 * 工程服务日志列表
	 */
	public Page<LogService> selectLogByPage(PageRequest pageRequest, Map<String, Object> searchParams){
		return serviceDao.selectLogByPage(pageRequest, searchParams);
	}
	
	/**
	 * 物料明细
	 * @param pageRequest
	 * @param searchParams
	 * @return
	 */
	public Page<BillOrderMaterialBody> selectServiceMaterial(PageRequest pageRequest, Map<String, Object> searchParams){
		return serviceDao.selectServiceMaterial(pageRequest, searchParams);
	}
	public BillService queryByPK(String Billid){
		return serviceDao.queryByPK(Billid);
	}
	/**
	 * 改变值
	 * @param Billid
	 * @param key
	 * @param value
	 */
	public void changeValue(String Billid , String key , String value){
		serviceDao.changeValue(Billid, key, value);
	}
	/**
	 * 改变状态
	 * @param Billid
	 * @param key
	 * @param value
	 */
	public void changeState(String Billid , String key , int value){
		serviceDao.changeState(Billid, key, value);
	}
    
	/**
	 * 根据工程id查询
	 * @param billid
	 * @return
	 */
	public  CustomerListEntity  selectByBillId(String billid){
		return serviceDao.selectByBillId(billid);
	}
	/**
	 * 根据工程id查询
	 * 统计数量
	 * 工队被分配未完工数量(单个)
	 */
	public  Map  sum(String constructionid){
		return serviceDao.sum(constructionid);
	}
	/**
	 * 统计数量
	 * 工队被分配未完工数量(全部)
	 */
	public  Map  sum(){
		return serviceDao.sum();
	}
	
/*    @Scheduled(fixedDelay = 10000)
    public void check(String id){
    	System.out.println("_______&&&&&_____________");
        BillService service = serviceDao.queryByPK(id);
		if(!service.getConstructionstate().equals(2))changeState(id ,"constructionstate",BillService.ALLOTUSER_State_04);
    }*/
	public  Map  selectStates(String billid){
		return serviceDao.selectStates(billid);
	}
	
	public List<BillServiceProcedure> queryBodyByFK(String billid){
		return serviceDao.queryBodyByFK(billid);
	}
	
	public BillService queryByDealid(String dealid){
		return serviceDao.queryByDealid(dealid);
	}
	
	/**
     * 判断工程是否修改为完工状态
     * 计划拟定，物料调配，施工完成
     * @param service
     */
    public void serviceChangeToFinish(BillService service){
    	serviceDao.serviceChangeToFinish(service);
    }
    public void notConcluded(String dealid , String value,String memo,String type){
    	BillDeal deal = metaDao.queryByPK(BillDeal.class, dealid);
    	List<BillService> services= metaDao.queryByClause(BillService.class, "SELECT * FROM bill_service where dealid = '"+deal.getBillid()+"'");
    	if(services==null||services.isEmpty())return;
    	BillService service = services.get(0);
		if(service!=null){
			if(!StringUtils.isEmpty(value)){
				if(value.equals(String.valueOf(BillService.SERVICE_STATE_04))){
					//增加日志
					createLogService(service.getBillid(), "客户沟通","不需要上门："+memo,type);
					//系统日志
					insertSysLog("工程", "客户沟通", "不需要上门："+memo);
					//客户跟进日志
					saveNote(dealid, "不需要上门："+memo);
				}else if(value.equals(String.valueOf(BillService.SERVICE_STATE_05))){
					//增加日志
					createLogService(service.getBillid(), "客户沟通","上门未成交："+memo,type);
					//系统日志
					insertSysLog("工程", "客户沟通", "上门未成交："+memo);
					//客户跟进日志
					saveNote(dealid, "上门未成交："+memo);
				}
			}
		}
    }
    private void saveNote(String dealid,String note) {
		LogOrderNote entity = new LogOrderNote();
		entity.setDealid(dealid);
		entity.setLogid(UUID.randomUUID().toString());
		entity.setStatus(VOStatus.NEW);
		entity.setCreatorid(InvocationInfoProxy.getUserid());
		entity.setCreator(InvocationInfoProxy.getUsername());
		entity.setCreatetime(DateUtils.currentTimestampToString());
		entity.setAction("客户跟进");
		entity.setNote(note);
		entity.setDr(0);// 未删除标识
		metaDao.save(entity);
	}
    public void createLogService(String serviceid , String action , String result , String memo){
		LogService log = new LogService();
		log.setServiceid(serviceid);
		log.setAction(action);
		log.setResult(result);
		log.setMemo(memo);
		String userId = InvocationInfoProxy.getUserid();
		String userName = (String)InvocationInfoProxy.getUsername();
		log.setCreatorid(userId);
		log.setCreator(userName);
		log.setCreatetime(DateUtils.currentTimestampToString());
		metaDao.insert(log);
	}
    public  void  insertSysLog(String object,String action,String actcontent){
		//登录id
		String userid=InvocationInfoProxy.getUserid();
		//获取系统当前登录对象
//		SysUser user=metaDao.queryByPK(SysUser.class, userid);
		//日志
		Log log=new Log();
		log.setUserid(InvocationInfoProxy.getUserid());
//		log.setOrgid(user.getOrgid());
		log.setUsername(InvocationInfoProxy.getUsername());
//		log.setOrgname(user.getOrgname());
		log.setActcontent(actcontent);//具体操作内容
		log.setObject(object);//操作对象
		log.setAction(action);//操作
		metaDao.insert(log);
	}
    public void changeServiceNote(String serviceid , String note){
		BillService service = metaDao.queryByPK(BillService.class, serviceid);
		if(service!=null){
			service.setNote(note);
			metaDao.update(service);
		}
	}
}
