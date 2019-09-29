package com.ding.cms.repository;

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
import com.ding.cms.entity.Settlement;
import com.ding.cms.service.ServiceService;
import com.ding.cms.service.SettlementService;
import com.ding.cms.util.DateUtils;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.persistence.bs.dao.DAOException;   
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.jdbc.framework.processor.MapListProcessor;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;
/**
 * 工程结算
 * @author WangHG
 *
 */
@Repository
public class SettlementDao {
	@Autowired
    private MetadataDAO metadataDAO;
	@Autowired
    private ServiceService serviceService;
	@Autowired
    private SettlementService settlementService;
	
    /**
     * 分页查询方法
     * @param pageRequest
     * @param searchParams
     * @return
     * @throws DAOException
     */
    public Page<Settlement> selectAllByPage(PageRequest pageRequest, Map<String, Object> searchParams) throws DAOException {
    	String sql = " select * from bd_settlement "; // left join org on sys_user.org_id=org.org_id 
    	StringBuilder sb = new StringBuilder();
    	sb.append( sql );
    	SQLParameter sqlparam = new SQLParameter();
    	if (null != searchParams && !searchParams.isEmpty()) { 
    		sb.append(" where ");
   		 
    		for(Map.Entry<String, Object> entry : searchParams.entrySet() ){
    			String key =entry.getKey();
    			String value =(String) entry.getValue();
    			if(key.equals("-1")){
					continue;
				}			
				if(StringUtils.isEmpty(key)){
					continue;
				}
				if(key.equals("billid")){
    				sb.append(" ( "+key+" = ? ) AND ");
    				sqlparam.addParam( value );
    			}
    		}
    		sb.delete(sb.length()-4, sb.length());
    		sql=sb.toString();
    	}
    	return metadataDAO.queryPage(sql, sqlparam, pageRequest, Settlement.class);
    }
	
    /**
     * 保存和编辑,单个的保存和编辑
     * @param entity
     * @return
     */
    @Transactional
    public Settlement save(Settlement entity) {
     	BillService  billService= serviceService.queryByPK(entity.getBillid());
    	//add增加
    	if(entity.getSettlementid() ==null ){
    		 entity.setStatus(VOStatus.NEW);
    		 entity.setSettlementid(UUID.randomUUID().toString());
    		 // type=0;运营中心给运营商结算
    		 // type=1;运营商给工人结算
    		 if(entity.getType().equals("1")){
    			 entity.setConstructionid(billService.getConstructionid());
    			 entity.setConstructionname(billService.getConstructionname());
    		 }
    		 entity.setOrgid(billService.getOrgid());
    		 entity.setOrgname(billService.getOrgname());
    		 entity.setAgentid(billService.getAgentid());
    		 entity.setAgentname(billService.getAgentname());
             entity.setCreatorid(InvocationInfoProxy.getUserid());
             entity.setCreator(InvocationInfoProxy.getUsername());
             entity.setCreatetime(DateUtils.currentTimestampToString());
             entity.setDr(0);// 未删除标识
    		 
    	}
    	//edit编辑
    	else{
    		entity.setStatus(VOStatus.UPDATED);
    		entity.setModifierid(InvocationInfoProxy.getUserid());
    		entity.setModifier(InvocationInfoProxy.getUsername());
    		entity.setModifytime(DateUtils.currentTimestampToString());
    	}
    	metadataDAO.save(entity);
    	if(entity.getType().equals("0")){
    		//给运营商结算全额后更新状态
        	Double didmoney=  (Double) settlementService.findByBillid(entity.getBillid(), entity.getType()).get("money");
        	Double result=billService.getServicecharge()*(1-0.1);
        	
        	if(didmoney!=null&&(Math.abs(didmoney-result)<0.0001||didmoney>=result)){
        		serviceService.changeState(entity.getBillid(), "orgstate", BillService.SERVICE_STATE_02);
        	}
    	}else serviceService.changeState(entity.getBillid(), "agentstate",BillService.SERVICE_STATE_02);//更新给工队结算的状态
    	return entity ;
    }
    
    /**
     * 批量删除
     * @param list
     * @throws DAOException
     */
    public void batchDelete(List<Settlement> list) throws DAOException {
        metadataDAO.remove(list);
    }
    
    /**
     * 通过Id查询单个
     * @param id
     * @return
     * @throws DAOException
     */
    public Settlement findById(String id) throws DAOException {
        SQLParameter sqlparam = new SQLParameter();
        sqlparam.addParam(id);
        return  metadataDAO.queryByPK(Settlement.class, id);
    }
    /**
     * 根据billid查询
     * @param code
     * @return
     * @throws DAOException
     */
    public Map<String,Double>  findByBillid(String billid,String type) throws DAOException {
    	String sql="select sum(money) money from  bd_settlement where billid= ? and type=?";
    	SQLParameter sqlparam = new SQLParameter();
    	sqlparam.addParam(billid);
    	sqlparam.addParam(type);
    	List<Map<String,Double> > maps=metadataDAO.queryForObject(sql,sqlparam,new MapListProcessor());
        return maps==null?null:maps.get(0);
    }

}
