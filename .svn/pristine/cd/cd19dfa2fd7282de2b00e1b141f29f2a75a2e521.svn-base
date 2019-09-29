package com.ding.cms.repository;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import com.ding.cms.entity.Performance;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.jdbc.framework.processor.ColumnProcessor;

@Repository
public class ReferredDao {
	@Autowired
	private MetadataDAO dao;
	//获得推荐人含有业绩的信息
	public Page<Performance> getCustomerByRefId(PageRequest pageRequest,
			Map<String, Object> params) {
		String sql = "SELECT DISTINCT p.`awardstatus`,p.`rederredname`,p.`rewardname`,p.`rewardratio`, c.`name` customername,h.address,b.createtime createdate,h.district,h.province,h.city,h.type,p.`performancetime`,p.`orderid` ,p.`referredid`,p.`rewardtime`,pb.itemname performancetype ,b.`community` FROM bd_Performance p"
				+ " INNER JOIN bill_service bs"
				+ " ON bs.billid= p.`dealid`"
				+ " INNER JOIN bill_deal b"
				+ " ON bs.dealid= b.`billid`"
				+ " INNER JOIN bd_customer c"
				+ " ON c.`customerid`=b.`customerid`"
				+ " INNER JOIN sys_procedure_b pb"
				+ " ON pb.procedurebid=p.`performancetype`"
				+ " INNER JOIN bd_house h"
				+ " ON h.`houseid`=b.`houseid`";
		StringBuffer sb = new StringBuffer(sql);
		sb.append(" where p.dr =0 and p.`performancestatus`=1 AND p.`rewardstatus`=1 and ");
		SQLParameter parameter = new SQLParameter();
		for (String key : params.keySet()) {
			if (key.equals("referredid")) {
				sb.append(" p.referredid = ? and ");
				parameter.addParam(params.get(key));
			}
		}
		sb.delete(sb.length() - 4, sb.length());
		sb.append(" order by p.performancetime desc ");
		return dao.queryPage(sb.toString(), parameter, pageRequest,
				Performance.class);
	}
	public Long getCustomerNum(String refId) {
		String sql = "SELECT count(DISTINCT customerid) FROM bd_Performance WHERE referredid = ? ";
		SQLParameter parameter = new SQLParameter();
		parameter.addParam(refId);
		Long count = dao.queryForObject(sql, parameter, new ColumnProcessor());
		return count != null ? count : null;
	}

	public Long getTotalCustomerNum(String refId) {
		String sql = "SELECT count(*) FROM bill_deal WHERE referrerid = ? ";
		SQLParameter parameter = new SQLParameter();
		parameter.addParam(refId);
		Long count = dao.queryForObject(sql, parameter, new ColumnProcessor());
		return count != null ? count : null;
	}
}
