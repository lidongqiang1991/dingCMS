package com.ding.cms.service;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import net.sf.json.JSONNull;
import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.alibaba.druid.util.StringUtils;
import com.ding.cms.entity.BillOrder;
import com.ding.cms.entity.Performance;
import com.ding.cms.repository.PerformanceDao;
import com.ding.cms.util.Constants;
import com.ding.cms.util.HMACSHA256Util;
import com.ding.cms.util.HttpUtils;
import com.ding.cms.util.TokenUtil;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;

@Service
public class PerformanceService {
	private static Logger logger=LoggerFactory.getLogger(PerformanceService.class);
	@Autowired
	private PerformanceDao performanceDao;
	
	@Autowired
	private MetadataDAO dao;

	public Page<Performance> selectByPage(PageRequest pageRequest,
			Map<String, Object> params, String type) {
		Page<Performance> performances = performanceDao.selectByPage(
				pageRequest, params, type);
		return performances;
	}

	public void examine(Performance performance, String type) throws Exception {
		Performance oldPerformance = performance;
		performance=getPerformance(performance);
		if (type.equals(Constants.PERFORMANCE)) {
			performance.setPerformancestatus(oldPerformance
					.getPerformancestatus());
			performance.setPerformanceremark(oldPerformance
					.getPerformanceremark());
		}
		if (type.equals(Constants.REWARD)) {
			performance.setRewardstatus(oldPerformance.getRewardstatus());
			performance.setRewardremark(oldPerformance.getRewardremark());
		}
		performanceDao.update(performance);
	}
	public Performance countReward(Performance performance){
		if (performance.getRewardtype() == 1) {
			BillOrder billOrder = dao.queryByPK(BillOrder.class,
					performance.getOrderid());
			if (billOrder != null) {
				Double magnification = performance
						.getRewardratio() / 100.0;
				Double rewardMoney = billOrder.getTotalmny()
						* magnification;
				performance.setRewardratio(rewardMoney);
			}
		}
		return performance;
	}
	public Performance getPerformance(Performance performance) throws Exception{
		if (performance.getPerid() == null
				|| performance.getPerid().trim().equals(""))
			throw new Exception("不存在的业绩记录");
		performance = performanceDao.getPerformance(performance.getPerid());
		if (performance == null)
			throw new Exception("不存在的业绩记录");
		return performance;
	}
	public String award(Map<String, Object> params,Performance performance){
		String text="["+JSONObject.fromObject(params).toString()+"]";
		System.out.println(text);
		String sign=HMACSHA256Util.sha256_HMAC(text, null);
		Map<String, String> header=new HashMap<String, String>();
		header.put("X-Authorization",sign);
		String str="";
		for (int i = 0; i < 3; i++) {
			try {
				str=HttpUtils.requestPost("http://vip.yuhong.com.cn/open/mm/potential/redpacketupload/v1?access_token=BDRbG6YPF2eQAMmhr13gkcUSVCvxKjdJItiysNzwTuEWqf57",text,header );
				break;
			} catch (Exception e) {
				if(i==2){
					throw new RuntimeException("http请求失败");
				}
			}
		}
		 Object data = JSONObject.fromObject(str).get("data");
		 Integer flag= (Integer) JSONObject.fromObject(str).get("flag");
		 System.out.println(str);
		if(!str.equals("")&&!(data instanceof JSONNull)&&data!=null&&flag==1){
			performance.setAwardstatus(1);
			performance.setRewardtime(new Date());
			performanceDao.update(performance);
		}
		return str;
	}
	public void update(Performance performance){
		performanceDao.update(performance);
	}
	public void del(Performance performance){
		performanceDao.del(performance);
	}
}
