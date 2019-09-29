package com.ding.cms.repository;

import java.util.List;
import java.util.Map;

import oracle.net.aso.d;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import com.alibaba.druid.util.StringUtils;
import com.ding.cms.entity.BillDeal;
import com.ding.cms.entity.Customer;
import com.ding.cms.entity.CustomerListEntity;
import com.ding.cms.entity.House;
import com.ding.cms.entity.LogOrderNote;
import com.ding.cms.util.DateUtils;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.iweb.exception.ValidException;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.jdbc.framework.processor.ColumnProcessor;
import com.yonyou.iuap.persistence.jdbc.framework.util.FastBeanHelper;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;
import com.yonyou.iuap.system.entity.Org;
import com.yonyou.iuap.system.entity.SysUser;
import com.yonyou.iuap.system.service.OrgService;
import com.yonyou.iuap.system.service.PhoneCheckService;

@Repository
public class CustomerListDao {
	@Autowired
	private MetadataDAO metaDao;
	@Autowired
	private OrgService orgService;
    @Autowired
    private PhoneCheckService phoneCheckService;
	static final String[] lognoteLAttributes={"logid","followdate","follownote"};
	static final String[] lognoteLAttributes2={"logid","createtime","note"};

	public Page<CustomerListEntity> selectAllByPage(
			Map<String, Object> searchParams, PageRequest pageRequest) {

		StringBuilder sql = new StringBuilder();
		sql.append("SELECT d.sourcetype as sourcetype0,d.*,c.*,h.*,c.createdate as createdate,s.createtime as service_createtime FROM bill_deal d LEFT JOIN bd_customer  c on d.customerid=c.customerid  LEFT JOIN  bd_house h on d.houseid = h.houseid left join bill_service s on s.dealid = d.billid where d.dr=0");
		SQLParameter parameter = new SQLParameter();
		if (searchParams != null && !searchParams.isEmpty()) {
			sql.append(" and ");
			for (Map.Entry<String, Object> entry : searchParams.entrySet()) {
				String key = entry.getKey();
				String key_ = "d." + key;
				String keyc = "c." + key;
				String value = (String) entry.getValue();
				if (value.equals("-1")) {
					continue;
				}
				if (StringUtils.isEmpty(value)) {
					continue;
				}
				if ("orgname".equals(key)) {
					if("none".equals(value)){
						sql.append("d.agentid is null and ");
					}else{						
						sql.append(orgService.getTrueDataName(CustomerListEntity.class,value,"d."));
					}
                } else if ("agentname".equals(key)) {
					sql.append("d.agentid" + " =? and ");
					parameter.addParam(value);
				}
				//dongl2019年9月25日17:29:47添加支持三级查询
                else if ("sourcetype0".equals(key)) {
					sql.append("d.sourcetype =? and ");
					parameter.addParam(value);
				}
                else if ("sourcetype".equals(key)) {
					sql.append(keyc + " =? and ");
					parameter.addParam(value);
				} else if ("sourcetype1".equals(key)) {
					sql.append(keyc + " =? and ");
					parameter.addParam(value);
				} else if ("searchParam".equals(key)) {
					sql.append(" ( c.name like ? or c.phone like ? or d.community like ?  ) and ");
					parameter.addParam("%"+value+"%");
					parameter.addParam("%"+value+"%");
					parameter.addParam("%"+value+"%");
				} else if ("state".equals(key)) {
					sql.append(key_ + " =? and ");
					parameter.addParam(Integer.parseInt(value));
				} else if ("starttime1".equals(key)) {
					sql.append("d.createtime >=? and ");
					parameter.addParam(value + " 00:00:00");
				} else if ("endtime1".equals(key)) {
					sql.append("d.createtime <=? and ");
					parameter.addParam(value + " 23:59:59");
				} else if ("starttime2".equals(key)) {
					sql.append("d.ts >=? and ");
					parameter.addParam(value + " 00:00:00");
				} else if ("endtime2".equals(key)) {
					sql.append("d.ts <=? and ");
					parameter.addParam(value + " 23:59:59");
				} else if ("starttime3".equals(key)) {
					sql.append("s.createtime >=? and ");
					parameter.addParam(value + " 00:00:00");
				} else if ("endtime3".equals(key)) {
					sql.append("s.createtime <=? and ");
					parameter.addParam(value + " 23:59:59");
				} else if ("billid".equals(key)) {
					sql.append(key_ + " =? and ");
					parameter.addParam(value);
				}else if("lifestages".equals(key)){
					sql.append("lifestages =? and ");
					parameter.addParam(value);
				}else if("jobid".equals(key)){
					sql.append("jobid is not null and ");
				}else if("phone".equals(key)){
					sql.append("phone = ? and ");
					parameter.addParam(value);
				}
			}
			sql.delete(sql.length() - 4, sql.length());
		}
		 if(searchParams.get("state")==null||"".equals(searchParams.get("state").toString())){
			sql.append("and d.state <> 10");
		}
		String trueDateSql = orgService.getTrueData(CustomerListEntity.class);
		if(!StringUtils.isEmpty(trueDateSql)&&trueDateSql.contains("ORGID")){
			trueDateSql = trueDateSql.replace("ORGID", "d.orgid");
		}else if(!StringUtils.isEmpty(trueDateSql)&&trueDateSql.contains("AGENTID")){
			trueDateSql = trueDateSql.replace("AGENTID", "d.AGENTID");
		}
		sql.append(trueDateSql);
		 //
		Page<CustomerListEntity>tempData= metaDao.queryPage(sql.toString(), parameter, pageRequest,CustomerListEntity.class);

		List<CustomerListEntity> customers= tempData.getContent();
		for (int i = 0; i < customers.size(); i++) {
			String dealid = customers.get(i).getBillid();
			String logsql = "SELECT * FROM log_order_note where dealid = '"+dealid+"' ORDER BY createtime DESC";
			List<LogOrderNote> logs = metaDao.queryByClause(LogOrderNote.class, logsql);
			if (logs!=null&&logs.size()>0) {				
				LogOrderNote log = logs.get(0);
				for (int j = 0; j < lognoteLAttributes.length; j++) {
					customers.get(i).setAttribute(lognoteLAttributes[j], log.getAttribute(lognoteLAttributes2[j]));
				}
			}
			//添加建单时间
//			String serviceSql="select bs.createtime from bill_service bs where bs.dealid = '"+dealid+"'";
//			String serviceCreatetime=metaDao.queryForObject(serviceSql,new ColumnProcessor());
//			customers.get(i).setCreatetime1(serviceCreatetime);
		}
		return tempData;
	}

	public String saveCustomer(Customer cust) {
		String id = "";
		if (StringUtils.isEmpty(cust.getCustomerid())) {//新建客户
			// 判断手机号是否存在，若存在，则不新增客户
    		Map map=phoneCheckService.checkPhone(cust.getPhone(),null,"customer");
            if(map!=null && !map.isEmpty()){
            	throw new ValidException("存在重复手机号");
            }
			String sql = "select * from bd_customer where phone = '"
					+ cust.getPhone() + "'";
			List<Customer> custs = metaDao.queryByClause(Customer.class, sql);
			if (custs != null && custs.size() > 0) {//数据库存在当前客户手机号,更新客户信息
				cust.setStatus(VOStatus.UPDATED);
				id = custs.get(0).getCustomerid();
				cust.setCustomerid(id);
				cust.setCreator(custs.get(0).getCreator());
				cust.setCreatorid(custs.get(0).getCreatorid());
				cust.setCreatedate(custs.get(0).getCreatedate());
				metaDao.update(cust);
			} else {//新建客户
				cust.setStatus(VOStatus.NEW);
				cust.setCreator(InvocationInfoProxy.getUsername());
				cust.setCreatorid(InvocationInfoProxy.getUserid());
				if(cust.getCreatedate()==null)
					cust.setCreatedate(DateUtils.currentTimestampToString());
				id = metaDao.insert(cust);
			}
		} else {//更新客户信息
			cust.setStatus(VOStatus.UPDATED);
    		Map map=phoneCheckService.checkPhone(cust.getPhone(),cust.getCustomerid());
            if(map!=null && !map.isEmpty()){
            	throw new ValidException("存在重复手机号");
            }
			id = cust.getCustomerid();
			metaDao.update(cust);
		}
		return id;
	}

	public String saveHouse(House house) {
		if(!StringUtils.isEmpty(house.getProvince()))house.setProvince(house.getProvince().trim());
		if(!StringUtils.isEmpty(house.getCity()))house.setCity(house.getCity().trim());
		if(!StringUtils.isEmpty(house.getDistrict()))house.setDistrict(house.getDistrict().trim());
		String id = "";
		if (StringUtils.isEmpty(house.getHouseid())) {
			house.setStatus(VOStatus.NEW);
			house.setCreator(InvocationInfoProxy.getUsername());
			house.setCreatorid(InvocationInfoProxy.getUserid());
			//house.setCreatetime(DateUtils.currentTimestampToString());
			id = metaDao.insert(house);
		} else {
			id = house.getHouseid();
			metaDao.update(house);
		}
		return id;
	}
	public Page<CustomerListEntity> selectAllByPageForUdesk(
			Map<String, Object> searchParams, PageRequest pageRequest) {
		StringBuilder sql = new StringBuilder();
		sql.append("SELECT * FROM bill_deal d LEFT JOIN bd_customer  c on d.customerid=c.customerid  LEFT JOIN  bd_house h on d.houseid = h.houseid  where d.dr=0 ");
		SQLParameter parameter = new SQLParameter();
		if (searchParams != null && !searchParams.isEmpty()) {
			sql.append(" and ");
			for (Map.Entry<String, Object> entry : searchParams.entrySet()) {
				String key = entry.getKey();
				String key_ = "d." + key;
				String value = (String) entry.getValue();
				if (value.equals("-1")) {
					continue;
				}
				if (StringUtils.isEmpty(value)) {
					continue;
				}
				if ("starttime1".equals(key)) {
					sql.append("d.createtime >=? and ");
					parameter.addParam(value);
				} else if ("endtime1".equals(key)) {
					sql.append("d.createtime <? and ");
					parameter.addParam(value);
				}else if ("billid".equals(key)) {
					sql.append(key_ + " =? and ");
					parameter.addParam(value);
				}else if("lifestages".equals(key)){
					sql.append("lifestages =? and ");
					parameter.addParam(value);
				}else if("jobid".equals(key)){
					sql.append("jobid is not null and ");
				}
			}
			sql.delete(sql.length() - 4, sql.length());
		}
		 if(searchParams.get("state")==null||"".equals(searchParams.get("state").toString())){
			sql.append("and d.state != 10");
		 }
		Page<CustomerListEntity>tempData= metaDao.queryPage(sql.toString(), parameter, pageRequest,CustomerListEntity.class);
		return tempData;
	}
	public List<CustomerListEntity> getCustomers(String starttime,String endtime){
		String sql="SELECT * FROM bd_customer c LEFT JOIN bill_deal d ON d.`customerid`=c.`customerid` WHERE createtime >=? AND createtime <? AND tid IS NULL";
		SQLParameter param=new SQLParameter();
		param.addParam(starttime);
		param.addParam(endtime);
		List<CustomerListEntity> customers = metaDao.queryByClause(CustomerListEntity.class, sql, param);
		return customers;
	}

	public List<CustomerListEntity> getCustomerListEntities(String phone,boolean hasTid) {
		String isNot=hasTid?" AND tid IS NULL ":"";
		String sql="SELECT * FROM bill_deal d LEFT JOIN bd_customer  c ON d.customerid=c.customerid  LEFT JOIN  bd_house h ON d.houseid = h.houseid  WHERE d.dr=0 AND c.`phone`=?  "+isNot+" ORDER BY d.ts DESC";
		SQLParameter param=new SQLParameter();
		param.addParam(phone);
		return metaDao.queryByClause(CustomerListEntity.class,sql ,param);
	}

	public CustomerListEntity getCustomerListEntity(String id) {
		String sql="SELECT * FROM bill_deal d LEFT JOIN bd_customer  c ON d.customerid=c.customerid  LEFT JOIN  bd_house h ON d.houseid = h.houseid  WHERE d.dr=0 AND d.billid=?";
		SQLParameter param=new SQLParameter();
		param.addParam(id);
		List<CustomerListEntity> customers = metaDao.queryByClause(CustomerListEntity.class, sql, param);
		return customers==null||customers.isEmpty()?null:customers.get(0);
	}
}
