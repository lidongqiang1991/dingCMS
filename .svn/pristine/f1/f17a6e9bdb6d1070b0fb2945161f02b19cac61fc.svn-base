package com.ding.cms.repository;

import java.util.List;
import java.util.Map;
import java.util.UUID;



import com.ding.cms.entity.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.druid.util.StringUtils;
import com.ding.cms.service.ServiceService;
import com.ding.cms.util.DateUtils;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;
import com.yonyou.iuap.system.entity.SysUser;
import com.yonyou.iuap.system.service.OrgService;

@Repository
public class BillOrderDao {
	
	@Autowired
	private MetadataDAO metaDao;
	
	@Autowired
	private  OrgService orgService;
	
	@Autowired
	private  ServiceService serviceService;
	
	@Autowired
	private PerformanceDao performanceDao;
	static final String[] custLAttributes={"customerid","name","sex","phone"};
	
	public BillOrder findById(String orderid){
		BillOrder order =  metaDao.queryByPK(BillOrder.class, orderid);
		//补全body信息
		String type = order.getType().toString();
		//类型为1则为细项订单
		if(type.equals("1")){
			String sql = "select * from bill_order_b1 where orderid = '"+orderid+"'";
			List<BillOrderProductBody> list = metaDao.queryByClause(BillOrderProductBody.class, sql);
			if(list!=null && list.size()>0){				
				order.setId_billorderproductbody(list);
			}
		}
		//类型为2则为材料订单
		else if(type.equals("2")){
			String sql = "select * from bill_order_b2 where orderid = '"+orderid+"'";
			List<BillOrderMaterialBody> list = metaDao.queryByClause(BillOrderMaterialBody.class, sql);
			if(list!=null && list.size()>0){				
				order.setId_billordermaterialbody(list);
			}
		}
		return null;
	}
	/**
	 * 查询套餐细项
	 * @param request
	 * @param searchParams
	 * @return
	 */
	public Page<BillOrderProductBody> selectMaterialPage(PageRequest request,Map<String,Object> searchParams){
		StringBuilder sb=new StringBuilder();
		String sql="select * from bill_order_b1  where dr=0";
		sb.append(sql);
		SQLParameter sqlParameter=new SQLParameter();
		if(searchParams!=null&&!searchParams.isEmpty()){
			for(Map.Entry<String, Object> entry : searchParams.entrySet()){
				if(entry.getKey().equals("orderid")){
					sb.append(" and orderid =? ");
					sqlParameter.addParam(entry.getValue());
				}
			}
		}
		Page<BillOrderProductBody> tempData = metaDao.queryPage(sb.toString(), sqlParameter, request, BillOrderProductBody.class);
		return tempData; 
		
	}
	
	/**
	 * 查询套餐物料
	 * @param request
	 * @param searchParams
	 * @return
	 */
	public Page<BillOrderMaterialBody> selectProductPage(PageRequest request,Map<String,Object> searchParams){
		StringBuilder sb=new StringBuilder();
		String sql="select ord.*,ma.unit from bill_order_b2 ord left join bd_material ma on ord.materialid=ma.id where ord.dr=0";
		sb.append(sql);
		SQLParameter sqlParameter=new SQLParameter();
		if(searchParams!=null&&!searchParams.isEmpty()){
			for(Map.Entry<String, Object> entry : searchParams.entrySet()){
				if(entry.getKey().equals("orderid")){
					sb.append(" and billid =? ");
					String ordderid=(String) entry.getValue();
					sqlParameter.addParam(ordderid);
				}
			}
		}
		Page<BillOrderMaterialBody> tempData = metaDao.queryPage(sb.toString(), sqlParameter, request, BillOrderMaterialBody.class);
		return tempData; 
		
	}
	
	/**
	 * 查询订单
	 * @param request
	 * @param searchParams
	 * @return
	 */
	public Page<BillOrderListEntity> selectAllByPage(PageRequest request,Map<String, Object> searchParams){
		StringBuilder sb=new StringBuilder();
		sb.append(" select bo.*,  bc.`NAME`,bc.phone from  bill_order  bo LEFT JOIN bill_service bs ON bo.serviceid =bs.billid LEFT JOIN  bd_customer bc ON bs.customerid=bc.customerid  where 1=1 ");
		SQLParameter params=new SQLParameter();
		if(searchParams!=null&&!searchParams.isEmpty()){
			sb.append(" and ");
			for (Map.Entry<String, Object> entry : searchParams.entrySet()) {
				String key=entry.getKey();
				String value=(String)entry.getValue();
				if(value.equals("-1")){
					continue;
				}
				
				if(StringUtils.isEmpty(value)){
					continue;
				}
				if(key.equals("searchParam")){
					sb.append("  ( bo.vbillcode like ? or bc.name like ? or bc.phone like ? ) and ");
					params.addParam("%"+value+"%");
					params.addParam("%"+value+"%");
					params.addParam("%"+value+"%");
				}else if("orgname".equals(key)){
                    sb.append(orgService.getTrueDataName(CustomerListEntity.class,value,"bo."));
				}else if("agentname".equals(key)){
					sb.append("bo.agentid"+" =? and ");
					params.addParam(value);
				}else if("dr".equals(key)){
					if(value.equals("2")){
						sb.append("bo.state =1 and ");
					}else if(value.equals("1")){						
						sb.append("bo."+key+" =? and ");
						params.addParam(value);
					}else if(value.equals("0")){						
						sb.append("bo."+key+" =? and state is null and ");
						params.addParam(value);
					}
				}
				//根据订单类型获取订单信息，1为细项类，2为产品类
				else if(key.equals("type")){
					sb.append(" bo.type = ? and ");
					params.addParam(value);
				}
				else if(key.equals("startTime")){
					sb.append("bo.createtime  >=  ?  and ");
						params.addParam(value+" 00:00:00");
					}
				else if(key.equals("endTime")){
					sb.append("bo.createtime  <=  ?  and ");
						params.addParam(value+" 23:59:59");
					}
			}
			sb.delete(sb.length()-4, sb.length());
			//登录后查看自己部门的所属 信息
		}
		sb.append(orgService.getTrueData(BillOrderListEntity.class,"bo."));
		Page<BillOrderListEntity> tempData = metaDao.queryPage(sb.toString(), params, request, BillOrderListEntity.class);
		List<BillOrderListEntity> list = tempData.getContent();
		//补全客户信息
		for (int i = 0; i < list.size(); i++) {
			String serviceid=list.get(i).getServiceid();
			BillService billService=null;
			if(serviceid!=null)billService=metaDao.queryByPK(BillService.class, serviceid);
			String customerid=null;
			if(billService!=null)customerid=billService.getCustomerid();
			if(!StringUtils.isEmpty(customerid)){
				Customer cust=metaDao.queryByPK(Customer.class, customerid);
				if(cust!=null){					
					for (int j = 0; j < custLAttributes.length; j++) {
						list.get(i).setAttribute(custLAttributes[j], cust.getAttribute(custLAttributes[j]));
					}
				}
			}
		}
		//补全工程信息
		for(int i=0;i<list.size();i++){
			String serviceid=list.get(i).getServiceid();
			if(!StringUtils.isEmpty(serviceid)){
				BillService service=metaDao.queryByPK(BillService.class, serviceid);
				if(service!=null){					
					//for (int j = 0; j < custLAttributes.length; j++) {
						//list.get(i).setAttribute(custLAttributes[j], service.getAttribute(custLAttributes[j]));
					list.get(i).setServicecode(service.getVbillcode());
					//}
					
				}
			}
		}
		return tempData;
	}
	
	 //假删除，修改删除标识dr从0到1
	@Transactional
	public void cancelOrder(String serviceid,String orderid,String reason){
//		String[] ids = orderids.split(",");
//		for (int i = 0; i < ids.length; i++) {
//			BillOrder order = metaDao.queryByPK(BillOrder.class, ids[i]);
//			order.setDr(1);
//			metaDao.update(order);
//		}
//		
		//判断是否已经取消过
		String sql1 = "select * from bill_order where ( dr = 1 or state = 1 ) and billid = '"+orderid+"'";
		List<BillOrder> orders = metaDao.queryByClause(BillOrder.class, sql1);
		if(orders!=null&&orders.size()>0){
			
		}else{			
			BillOrder order = metaDao.queryByPK(BillOrder.class, orderid);
			String sql = "update bill_order set dr = 1 , memo='"+reason+"' where dr=0  and  billid = '"+orderid+"'";
			metaDao.update(sql);
			//删除细项订单与材料订单
			deleteOrderBody(orderid);
			//删除工程工序
			deleteServiceProcedures(serviceid,orderid);
			BillService billservice= serviceService.queryByPK(serviceid);
			serviceService.changeValue(serviceid,"totalamount", String.valueOf(billservice.getTotalamount()-order.getTotalmny()));
			serviceService.changeValue(serviceid,"servicecharge",String.valueOf(billservice.getServicecharge()-order.getServicecharge()));
			serviceService.changeValue(serviceid,"materialcosts", String.valueOf(billservice.getMaterialcosts()-order.getMaterialcosts()));
			Performance performance=performanceDao.getPerformance(orderid, serviceid);
			if(performance!=null){
				performance.setRewardstatus(2);
				performanceDao.update(performance);
			}
		}
	}
	
	/**
	 * 获得order，通过serviceid
	 * @param serviceid
	 * @return
	 */
	public List<BillOrder> listOrder(String serviceid){
		String sql = "select * from bill_order where dr=0  and serviceid = '"+serviceid+"'";
		return metaDao.queryByClause(BillOrder.class, sql);
	}
	
	/**
	 * 创建订单
	 */
	public BillOrder createOrder(BillOrder order){
		SysUser u=(SysUser)InvocationInfoProxy.getExtendAttribute("currentUser");
		//add
		if(StringUtils.isEmpty(order.getBillid())){
			order.setStatus(VOStatus.NEW);
			order.setProductid(UUID.randomUUID().toString());
			order.setOrgid(u.getOrgid());
			order.setOrgname(u.getOrgname());
			order.setCreator(u.getUsername());
			order.setCreatorid(u.getId());
			order.setCreatetime(DateUtils.currentTimestampToString());
		}
		//edit
		else{			
			order.setStatus(VOStatus.UPDATED);
			order.setModifierid(u.getId());
			order.setModifier(u.getUsername());
			order.setModifytime(DateUtils.currentTimestampToString());
			return null;
		}
		if(order.getId_billorderproductbody()!=null&&order.getId_billorderproductbody().size()>0){
			for(BillOrderProductBody product : order.getId_billorderproductbody()){
				if(StringUtils.isEmpty(product.getOrderid())){
					product.setStatus(VOStatus.NEW);
					product.setOrderid(order.getBillid());
					product.setFk_id_billorderproductbody(order.getBillid());
				}else{
					product.setStatus(VOStatus.UPDATED);
				}
			}
			metaDao.save(order, order.getId_billorderproductbody().toArray(new BillOrderProductBody[order.getId_billorderproductbody().size()]));
		}else{
			metaDao.save(order);
		}
		return order;
	}
    /**
     * 更新订单材料已调配数量
     * @param orderid
     * @param materialid
     * @param allocatedNum
     */
    public void updateMaterialAllocatedNum (String orderid,String materialid,Double allocatedNum){
        if(allocatedNum==null)allocatedNum=new Double(0);
    	String sql = "UPDATE bill_order_b2  set allocatednum = IFNULL(allocatednum,0) + ("+allocatedNum+") where billbid = '"+materialid+"' and billid='"+orderid+"'";
    	metaDao.update(sql);
    }
    
    private void deleteServiceProcedures(String serviceid,String orderid){
		String sql = "update bill_service_procedure set dr = 1 where orderid = '"+orderid+"' and billid = '"+serviceid+"'";
		metaDao.update(sql);
	}
    
    /**
	 * 删除订单子表
	 */
	public void deleteOrderBody(String orderid){
		String sql1 = "update bill_order_b1 set dr = 1 where orderid = '"+orderid+"'";
		metaDao.update(sql1);
		String sql2 = "update bill_order_b2 set dr = 1 where billid = '"+orderid+"'";
		metaDao.update(sql2);
	}
    
}
