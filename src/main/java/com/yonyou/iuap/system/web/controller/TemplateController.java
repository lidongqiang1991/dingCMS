package com.yonyou.iuap.system.web.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ding.cms.entity.Contract;
import com.ding.cms.service.ContractService;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.system.entity.SysUser;
import com.yonyou.iuap.system.entity.Template;
import com.yonyou.iuap.system.service.TemplateService;

@Controller
@RequestMapping(value = "/templet")
public class TemplateController extends BaseController {
		
	@Autowired
	private TemplateService templetService;
	
	/**
	 * 保存接口
	 * @param list
	 * @return
	 */
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public @ResponseBody Object save(@RequestBody List<Template> list){
		SysUser user= (SysUser)InvocationInfoProxy.getExtendAttribute("currentUser");
		templetService.save(list,user);
        return buildSuccess(list);
	}
	/**
	 * 通过用户ID和表名查询对应的;;自定义列模板
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/find", method = RequestMethod.GET)
	public @ResponseBody Object find(HttpServletRequest request, HttpServletResponse response){
		SysUser user= (SysUser)InvocationInfoProxy.getExtendAttribute("currentUser");
		String userid = user.getId();
		String templatename = request.getParameter("templatename");
		List list = templetService.findByUserandForm(userid, templatename);
		return buildSuccess(list);
	}
}
