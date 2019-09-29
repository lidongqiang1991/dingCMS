package com.ding.cms.repository;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.processor.MapProcessor;

@Repository
public class BoardDao {
	
	@Autowired
	private MetadataDAO metadataDAO;
	
	public Map getBoardData(String month){
		String sql = "select "
				+ "sum(addcustomer) as addcustomer,"
				+ "sum(allotedcustomer) as allotedcustomer,"
				+ "sum(servicing) as servicing,"
				+ "sum(serviced) as serviced,"
				+ "SUM(totalamount) as totalamount,"
				+ "SUM(paidamount) as paidamount "
				+ "from v_bill_monthtotal "
				+ "where month='"+month+"' group by month";
		Object obj = metadataDAO.queryForObject(sql, new MapProcessor());
		if(obj!=null){
			return (Map)obj;
		}else{
			return null;
		}
	}
	
}
