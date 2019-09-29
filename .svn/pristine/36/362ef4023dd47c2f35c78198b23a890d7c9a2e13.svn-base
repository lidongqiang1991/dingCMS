package com.yonyou.iuap.system.filter;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.context.support.XmlWebApplicationContext;

import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.system.entity.App;
import com.yonyou.iuap.system.entity.SysUser;
import com.yonyou.iuap.system.service.AppService;
import com.yonyou.iuap.system.service.OAuthService;

public class OpenAPIFilter implements Filter {

	private AppService appService;
	private OAuthService oauthService;

	@Override
	public void destroy() {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain filterChain) throws IOException, ServletException {
		String token = request.getParameter("token");
		if (token != null && !token.trim().equals("")) {
			Long time = oauthService.checkAccessToken(token);
			if (time < 0) {
				PrintWriter pw = response.getWriter();
				pw.append("{\"errcode\":40003,\"errmsg\":\"授权验证未通过\"}");
				pw.flush();
				pw.close();
			} else {
				SysUser user = (SysUser) InvocationInfoProxy
		                .getExtendAttribute("currentUser");
				if(user==null){
					App app=appService.findByAppToken(token);
					user=new SysUser();
					user.setOrgid("4958dae8-72a9-4136-9db0-b82099707ac7");
					user.setOrgname("顶之美");
					user.setId(app.getAppid());
					user.setUsername("U会员");
					InvocationInfoProxy.setSysid("ding_U");
			        InvocationInfoProxy.setLocale("zh_CN");
					InvocationInfoProxy.setUserid(user.getId());
		    		InvocationInfoProxy.setUsername(user.getUsername());
		            InvocationInfoProxy.setExtendAttribute("currentUser", user);
				}
				appService.updateToken(token,
						System.currentTimeMillis());
				filterChain.doFilter(request, response);
			}
		}else{
		PrintWriter pw = response.getWriter();
		pw.append("{\"errcode\":40003,\"errmsg\":\"授权验证未通过\"}");
		pw.flush();
		pw.close();
		}
	}

	@Override
	public void init(FilterConfig config) throws ServletException {
		ServletContext sc = config.getServletContext();
		XmlWebApplicationContext cxt = (XmlWebApplicationContext) WebApplicationContextUtils
				.getWebApplicationContext(sc);
		if (cxt != null && cxt.getBean(AppService.class) != null
				&& appService == null)
			appService = (AppService) cxt.getBean(AppService.class);
		if (cxt != null && cxt.getBean(OAuthService.class) != null
				&& oauthService == null)
			oauthService = (OAuthService) cxt.getBean(OAuthService.class);
	}

}
