package com.yonyou.iuap.system.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.alibaba.druid.util.StringUtils;
import com.yonyou.iuap.auth.session.SessionManager;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.system.entity.SysUser;
import com.yonyou.iuap.system.service.SysUserService;
import com.yonyou.iuap.utils.CookieUtil;

/**
 * Created by zengxs on 2016/12/1.
 */
public class InvocationFilter implements Filter {
	private Logger logger = LoggerFactory.getLogger(InvocationFilter.class);
	private String redirectURL = "";
	private List<String> notCheckURLList = null;
	
	 private SessionManager sessionManager;
	 
	 private SysUserService userService;
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    	logger.info("初始化过滤器");
    	ServletContext servletContext = filterConfig.getServletContext();
        ApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(servletContext);
        sessionManager =ctx.getBean(SessionManager.class);
        userService=ctx.getBean(SysUserService.class);
      //初始化配置的参数
      		redirectURL = filterConfig.getInitParameter("redirectURL");
      		String notCheckURLStr = filterConfig.getInitParameter("notCheckURLList");
      		if(notCheckURLStr != null) {
      			notCheckURLList = new ArrayList<String>();
      			notCheckURLList.clear();
      			String[] urls = notCheckURLStr.split(",");
      			for (String url : urls) {
      				logger.info("初始化配置的参数 <notCheckURLList>："+url);
      				notCheckURLList.add(url);
      			}
      		}
      		logger.info("过滤器初始化完成");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
    	
    	
    	HttpServletRequest request=(HttpServletRequest)servletRequest;
    	HttpServletResponse response=(HttpServletResponse)servletResponse;
    	 //*表示允许所有域名跨域
 		String fromOrigin=request.getHeader("Origin");
 		response.addHeader("Access-Control-Allow-Origin", fromOrigin);
 		response.addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 		response.addHeader("Access-Control-Allow-Credentials", "true");
       //允许跨域的Http方法
 		response.addHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
 		String requestURL = request.getRequestURI();
 		//拦截器--如果是登录则不拦截
 		boolean isPass=false;
 		if(requestURL.indexOf("login")>=0||requestURL.indexOf("formLogin")>=0||requestURL.indexOf("oauth")>=0||requestURL.indexOf("open")>=0){
 			isPass=true;
    	}else{
    		String token=CookieUtil.findCookieValue(request.getCookies(), "token");
    		if(!StringUtils.isEmpty(token)){
    			//校验令牌是否已经超时()
//    			String logints=CookieUtil.findCookieValue(request.getCookies(), "u_logints");
    	   		String pk_user = (String)sessionManager.getSessionCacheAttribute(token, "pk_user");
        		SysUser user=userService.findById(pk_user==null?"null":pk_user);
        		if(user!=null){
        			InvocationInfoProxy.setSysid("ding");
        	        InvocationInfoProxy.setLocale("zh_CN");
        			InvocationInfoProxy.setUserid(user.getId());
            		InvocationInfoProxy.setUsername(user.getUsername());
                    InvocationInfoProxy.setExtendAttribute("currentUser", user);
                    isPass=true;
        		}
    		}
    	}
 		
	 	if(isPass){
	 		filterChain.doFilter(servletRequest, servletResponse);
	 	}else{
	 		PrintWriter pw= response.getWriter();
			pw.append("reset");
			pw.flush();
			pw.close();
	 	}
    }

    @Override
    public void destroy() {

    }
}
