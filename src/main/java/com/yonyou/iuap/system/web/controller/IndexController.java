package com.yonyou.iuap.system.web.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.alibaba.druid.util.StringUtils;
import com.yonyou.iuap.auth.session.SessionManager;
import com.yonyou.iuap.utils.CookieUtil;

/**
 * 工程首页跳转示例，对应shiro配置文件中的映射，项目中根据需求修改
 */
@Controller
@RequestMapping(value = "/")
public class IndexController {
	
	private Logger logger = LoggerFactory.getLogger(IndexController.class);

	 @Autowired
	 private SessionManager sessionManager;
	
	@RequestMapping(method = RequestMethod.GET)
	public String index(ModelMap model,HttpServletRequest request) {
		String cuser = null;
		if (SecurityUtils.getSubject().getPrincipal() != null)
			cuser = (String) SecurityUtils.getSubject().getPrincipal();
		model.addAttribute("cusername", cuser==null?"":cuser);
		logger.debug("current user is {}",cuser);
		String token=CookieUtil.findCookieValue(request.getCookies(), "token");
    	String pk_user=null;
    	if(!StringUtils.isEmpty(token)){
        	pk_user = (String)sessionManager.getSessionCacheAttribute(token, "pk_user");
    	}
		if(pk_user==null){
			return "forward:/login.html";
		}else{
			String username = (String)sessionManager.getSessionCacheAttribute(token, pk_user);
			model.addAttribute("cusername", username);
			return "forward:/index.html";
		}
//    	return "forward:/index.html";
		//如果有多语环境，跳转到指定语种的静态资源
		//return "forward:/index." + InvocationInfoProxy.getLocale()+".html";
	}
}
