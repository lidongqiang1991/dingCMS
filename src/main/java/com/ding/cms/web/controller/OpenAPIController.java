package com.ding.cms.web.controller;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import oracle.net.aso.a;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.druid.util.StringUtils;
import com.ding.cms.entity.Agent;
import com.ding.cms.entity.CustomerListEntity;
import com.ding.cms.entity.Performance;
import com.ding.cms.entity.PerformanceInfo;
import com.ding.cms.entity.Product;
import com.ding.cms.service.AgentService;
import com.ding.cms.service.CustomerListService;
import com.ding.cms.service.ProductService;
import com.ding.cms.service.ReferredService;
import com.ding.cms.util.BeanUtil;
import com.ding.cms.util.DateUtils;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.mvc.type.SearchParams;
import com.yonyou.iuap.system.service.OAuthService;
import com.yonyou.iuap.system.web.controller.BaseController;

@RestController
@RequestMapping("open")
public class OpenAPIController extends BaseController {
	@Autowired
	private ProductService product;
	@Autowired
	private CustomerListService custService;
	@Autowired
	private OAuthService oauthService;
	@Autowired
	private ReferredService referredService;
	@Autowired
	private AgentService agentService;
	
	@RequestMapping(value = "/agents", method = RequestMethod.GET)
    public @ResponseBody Object page(PageRequest pageRequest, SearchParams searchParams) {
        Page<Agent> result =
        		agentService.selectByPage(pageRequest, searchParams.getSearchMap());
        List<Map<String, Object>> agents=new ArrayList<Map<String,Object>>();
        Map<String, Object> map=new LinkedHashMap<String, Object>();
        String[] attributes={"agentname","agentid","city","orgname","province","district"};
        for (Agent agent : result.getContent()) {
			agents.add(BeanUtil.transBean2Map(agent,attributes));
		}
        map.put("errorcode", 0);
        map.put("totalElements", result.getTotalElements());
        map.put("totalPages", result.getTotalPages());
        map.put("agents",agents);  
        return map;
    }
	@RequestMapping(value = "CreateContact", method = RequestMethod.POST)
	public Object save(@RequestBody CustomerListEntity list) {
		Map<String, Object> map = new HashMap<String, Object>();
		if(StringUtils.isEmpty(list.getPhone())||StringUtils.isEmpty(list.getRootoid())){
			map.put("errorcode", 40004);
			map.put("errmsg", "客户信息字段不全");
			return map;
		}
		if (!StringUtils.isEmpty(list.getSurveydate())
				&& list.getSurveydate().indexOf("m") < 0) {
			Date d = new Date(Long.valueOf(list.getSurveydate()));
			String sDate = DateUtils.format(d, "yyyy-MM-dd HH:00:00");
			list.setSurveydate(sDate);
		}
		//u会员的推荐者创建id为推荐id
		if (InvocationInfoProxy.getSysid().equals("ding_U")) {
			InvocationInfoProxy.setUserid(list.getReferrerid());
			list.setSourcetype1("U会员");
			list.setSourcetype("推广活动");
		}
		
		try {
			list.setLifestages(0);
			custService.saveAll(list);
			map.put("errorcode", 0);
			map.put("errmsg", "ok");
			return map;
		} catch (Exception e) {
			map.put("errorcode", 40004);
			map.put("errmsg", "客户信息有误");
			return map;
		}
	}
	@RequestMapping(value="QueryPerformance",params={"token"})
	public Object QueryPerformance(PageRequest pageRequest,SearchParams params){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("errorcode", 0);
		map.put("errmsg", "ok");
		String refId=(String) params.getSearchMap().get("referredid");
		if(refId==null){
			map.put("errorcode", 40003);
			map.put("errmsg", "没有推荐人id");
			return map;
		}
		PerformanceInfo info=new PerformanceInfo();
		//得到推荐人的线索业绩
		Page<Performance> referreds=referredService.getCustomerByRefId(pageRequest, params.getSearchMap());
		List<Map<String, Object>> reMaps=new ArrayList<Map<String,Object>>();
		Double money=0.0;
		//对外展示的字段
		String[] attributes={"referredid","rederredname","rewardtime","customerName","performancetype","produceType","address","rewardratio","province","performancetime","type","district","city","awardstatus","createNameTime","community"};
		for (Performance referred : referreds) {
			referred.setRewardratio((double) Math.round(referred.getRewardratio() * 100) / 100);
			//计算奖励总金额
			money+=referred.getRewardratio();
			//查找当前线索的工序状态
			referred.setProduceType(referredService.getProduceName(referred.getOrderid()));
			//将bean转为map
			Map<String, Object> beanMap = BeanUtil.transBean2Map(referred,attributes);
			reMaps.add(beanMap);
		}
		info.setPerformance(reMaps);
		//推荐人推荐线索数
		info.setCreateTotal(referredService.getTotalCustomerNum(refId));
		//推荐人推荐线索业绩数
		info.setRewardTotal(referredService.getCustomerNum(refId));
		//推荐人应奖励的钱数
		info.setRewardAmount((double) Math.round(money * 100) / 100);
		map.put("data", info);
		return map;
	}
}
