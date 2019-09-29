package com.ding.cms.web.controller;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

import net.sf.ehcache.search.aggregator.Count;
import net.sf.json.JSONObject;

import org.apache.velocity.app.event.ReferenceInsertionEventHandler.referenceInsertExecutor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ding.cms.entity.Performance;
import com.ding.cms.service.PerformanceService;
import com.ding.cms.util.Constants;
import com.yonyou.iuap.mvc.type.SearchParams;
import com.yonyou.iuap.system.web.controller.BaseController;

@RestController
@RequestMapping("performance")
public class PerformanceController extends BaseController {
	@Autowired
	private PerformanceService performanceService;

	@RequestMapping("perlist")
	public Object perList(PageRequest pageRequest, SearchParams params) {
		return buildSuccess(performanceService.selectByPage(pageRequest,
				params.getSearchMap(), Constants.PERFORMANCE));
	}
	@RequestMapping("wardlist")
	public Object wardList(PageRequest pageRequest, SearchParams params) {
		return buildSuccess( performanceService.selectByPage(pageRequest,
				params.getSearchMap(), Constants.REWARD)
		);
	}
	@RequestMapping("perexamine")
	public Object examineper(Performance performance){
		try {
			performanceService.examine(performance, Constants.PERFORMANCE);
			return buildSuccess();
		} catch (Exception e) {
			e.printStackTrace();
			return buildGlobalError("审核失败");
		}
	}
	@RequestMapping("wardexamine")
	public Object examineward(Performance performance){
		try {
			performanceService.examine(performance, Constants.REWARD);
			return buildSuccess();
		} catch (Exception e) {
			e.printStackTrace();
			return buildGlobalError("审核失败");
		}
	}
	@RequestMapping("award")
	public Object award(Performance performance){
		try {
			performance=performanceService.getPerformance(performance);
		} catch (Exception e1) {
			return "{\"flag\": 0,\"errormsg\": \"没有此业绩记录\"}";
		}
		if(performance.getRootoid()==null)
			return "{\"flag\": 0,\"errormsg\": \"该业绩没有openid\"}";
		if(!(performance.getPerformancestatus()==1)&&!(performance.getRewardstatus()==1))
			return "{\"flag\": 0,\"errormsg\": \"未通过审核无法发放奖励\"}";
		Map<String, Object> params=new LinkedHashMap<String, Object>();
		params.put("open_id", performance.getRootoid());
		params.put("cash_red_packet", performance.getRewardratio());
		params.put("wid", performance.getReferredid()+System.currentTimeMillis()/1000);
		params.put("send_time",System.currentTimeMillis()/1000);
		params.put("source", performance.getPerid());
		try {
			String result= performanceService.award(params,performance);
			return result;
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
			return "{\"flag\": 0,\"errormsg\": \"发放失败\"}";
		}
	}
	@RequestMapping("del")
	public Object del(Performance performance){
		try {
			performance=performanceService.getPerformance(performance);
			if(performance.getAwardstatus()!=0||performance.getRewardstatus()!=2)
				return buildGlobalError("该奖励有效或该奖励已发放");
			performanceService.del(performance);
			return buildSuccess();
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
			return buildGlobalError("删除失败");
		}
	}
}
