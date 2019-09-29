package com.ding.cms.web.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import com.ding.cms.entity.Reward;
import com.ding.cms.service.RewardService;
import com.ding.cms.util.DateUtils;
import com.yonyou.iuap.mvc.type.SearchParams;
import com.yonyou.iuap.system.web.controller.BaseController;

@RestController
@RequestMapping("rules")
public class RewardController extends BaseController {
	@Autowired
	private RewardService rewardService;

	@RequestMapping("page")
	public Object selectByPage(PageRequest pageRequest, SearchParams params) {
		return buildSuccess(rewardService.selectByPage(pageRequest,
				params.getSearchMap()));
	}

	@RequestMapping(value = "save", method = RequestMethod.POST)
	public Object save(@RequestBody List<Reward> rewards) {
		Reward reward = rewards.get(0);
		try {
			Long effectTime =reward.getEffecttime()!=null?DateUtils.parse(reward.getEffecttime(), "yyyy-MM-dd").getTime():null;
			Long invalidTime =reward.getInvalidtime()!=null?DateUtils.parse(reward.getInvalidtime(), "yyyy-MM-dd").getTime():null;
			if (effectTime!=null&&invalidTime!=null&&invalidTime < effectTime)
				return buildGlobalError("生效日期小于了失效日期");
			return buildSuccess(rewardService.save(reward));
		} catch (Exception e) {
			return buildGlobalError("日期格式不正确");
		}
	}

	@RequestMapping(value = "del", method = RequestMethod.POST)
	public Object del(@RequestBody List<Reward> reward) {
		rewardService.delete(reward.get(0));
		return buildSuccess();
	}

}
