package com.ding.cms.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ding.cms.entity.Agent;
import com.ding.cms.service.AgentService;
import com.yonyou.iuap.mvc.type.SearchParams;
import com.yonyou.iuap.system.web.controller.BaseController;

@Controller
@RequestMapping(value= "/agent")
public class AgentController extends BaseController{
	
	@Autowired
	private AgentService agentService;
	
	@RequestMapping(value = "/page", method = RequestMethod.GET)
    public @ResponseBody Object page(PageRequest pageRequest, SearchParams searchParams) {
        Page<Agent> result =
        		agentService.selectByPage(pageRequest, searchParams.getSearchMap());
        return buildSuccess(result);
    }
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
    public @ResponseBody Object save(@RequestBody List<Agent> list) {
		Agent entity=list.get(0);
		agentService.save(entity);
        return buildSuccess(entity);
    }
	
	@RequestMapping(value = "/del", method = RequestMethod.POST)
    public @ResponseBody Object del(@RequestBody List<Agent> list) {
		agentService.delete(list);
    	return buildSuccess();
    }
	
}
