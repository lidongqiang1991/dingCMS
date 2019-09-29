package com.ding.cms.repository;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import com.ding.cms.entity.Performance;
import com.ding.cms.util.Constants;
import com.ding.cms.util.DateUtils;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;

@Repository
public class PerformanceDao {
	@Autowired
	private MetadataDAO dao;

	// 查看业绩
	public Page<Performance> selectByPage(PageRequest pageRequest,
			Map<String, Object> searchParams,String type) {
		String sql = "SELECT DISTINCT p.*,c.`phone`,c.`name` customerName,d.`referrer`,d.`rootoid` FROM bd_Performance p INNER JOIN bill_service bs ON p.dealid=bs.billid INNER JOIN bill_deal d ON d.billid=bs.dealid  INNER JOIN bd_customer c ON p.`customerid`=c.`customerid` ";
		StringBuffer sb = new StringBuffer(sql);
		sb.append("where p.dr=0 and ");
		if(type.equals(Constants.REWARD)){
			sb.append(" performancestatus = 1 and ");
		}
		SQLParameter sqlparam = new SQLParameter();
		if (null != searchParams && !searchParams.isEmpty()) {
			for (String key : searchParams.keySet()) {
				if (key.equals("searchParam")) {
					sb.append("d.referrer like ? or c.phone = ? and ");
					sqlparam.addParam("%"+searchParams.get(key)+"%");
					sqlparam.addParam(searchParams.get(key));
				} else if (key.equals("performancetype")) {
					sb.append("p.`performancetype` = ? and ");
					sqlparam.addParam(searchParams.get(key));
				}else if(key.equals("examine")){
					sb.append(type+"status = ? and ");
					sqlparam.addParam(searchParams.get(key));
				}
				// 传入时间段
				if (key.equalsIgnoreCase("time")) {
					String time="performancetime";
					// 所有时间段(-1)
					if (searchParams.get(key).equals("-1")) {
						continue;
					}
					sb.append("  ( "+time+" between ? and ? ) and ");
					// 三天之内(0)
					if (searchParams.get(key).equals("0")) {
						// 调用方法，在当前日期增加/减去传入天数
						sqlparam.addParam(getAfterTime(-3));
						// 对应时间字符串
						sqlparam.addParam(DateUtils.currentTimestampToString());
					}
					// 一个周之内(1)
					if (searchParams.get(key).equals("1")) {
						// 调用方法，在当前日期增加/减去传入天数
						sqlparam.addParam(getAfterTime(-7));
						// 对应时间字符串
						sqlparam.addParam(DateUtils.currentTimestampToString());
					}
					// 一个月之内(2)
					if (searchParams.get(key).equals("2")) {
						// 调用方法，在当前日期增加/减去传入天数
						sqlparam.addParam(getAfterTime(-30));
						// 对应时间字符串
						sqlparam.addParam(DateUtils.currentTimestampToString());
					}	
					// 自定义时间段(3)
					if (searchParams.get(key).equals("3")) {
						for (Map.Entry<String, Object> entryNew : searchParams
								.entrySet()) {
							if (entryNew.getKey().equals("startTime")) {
								sqlparam.addParam(entryNew.getValue()
										+ " 00:00:00");
							} else if (entryNew.getKey().equals("endTime")) {
								sqlparam.addParam(entryNew.getValue()
										+ " 23:59:59");
							}
						}
					}
				}
			}
		}
		 sb.delete(sb.length()-4, sb.length());
		 sb.append(" order by ts desc ");
		return dao.queryPage(sb.toString(), sqlparam,pageRequest, Performance.class);
	}
	//修改业绩（审批使用）
	public void update(Performance performance){
		performance.setStatus(VOStatus.UPDATED);
		dao.update(performance);
	}
	public void del(Performance performance){
		String sql = "update bd_Performance set dr = 1 where perid = '"+performance.getPerid()+"'";
		dao.update(sql);
//		performance.setStatus(VOStatus.DELETED);
//		performance.setDr(1);
//		performance.setRewardremark("123");
//		dao.update(performance);
	}
	public Performance getPerformance(String id){
		String sql = "SELECT DISTINCT p.*,c.`phone`,c.`name` customerName,d.`referrer`,d.`rootoid` FROM bd_Performance p INNER JOIN bill_service bs ON p.dealid=bs.billid INNER JOIN bill_deal d ON d.billid=bs.dealid  INNER JOIN bd_customer c ON p.`customerid`=c.`customerid`   where perid = ? and p.dr=0 ";
		SQLParameter sqlparam = new SQLParameter();
		sqlparam.addParam(id);
		List<Performance> performances=dao.queryByClause(Performance.class,sql,sqlparam);
		return performances!=null&&!performances.isEmpty()?performances.get(0):null;
	}
	public Performance getPerformance(String orderid,String serviceid){
		String sql = "SELECT DISTINCT p.*,c.`phone`,c.`name` customerName,d.`referrer`,d.`rootoid` FROM bd_Performance p INNER JOIN bill_service bs ON p.dealid=bs.billid INNER JOIN bill_deal d ON d.billid=bs.dealid  INNER JOIN bd_customer c ON p.`customerid`=c.`customerid`   where orderid=? and p.dealid=? and p.dr=0 ";
		SQLParameter sqlparam = new SQLParameter();
		sqlparam.addParam(orderid);
		sqlparam.addParam(serviceid);
		List<Performance> performances=dao.queryByClause(Performance.class,sql,sqlparam);
		return performances!=null&&!performances.isEmpty()?performances.get(0):null;
	}
	private String getAfterTime(int day) {
		// 将某个日期增加指定天数，并返回结果。如果传入负数，则为减
		// 系统当前日期，天数
		Date afterdate = DateUtils.addDate(
				new Date(System.currentTimeMillis()), day);
		String aftertime = new Timestamp(afterdate.getTime()).toString()
				.substring(0, 11) + "00:00:00";
		return aftertime;
	}
}
