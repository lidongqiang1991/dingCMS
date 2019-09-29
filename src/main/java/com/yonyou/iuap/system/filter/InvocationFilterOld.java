package com.yonyou.iuap.system.filter;

import java.io.IOException;
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
import javax.servlet.http.HttpSession;

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
public class InvocationFilterOld implements Filter {
	
	private Logger logger = LoggerFactory.getLogger(InvocationFilterOld.class);
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
//    	filterChain.doFilter(servletRequest, servletResponse);
    	HttpServletRequest request=(HttpServletRequest)servletRequest;
    	HttpServletResponse response=(HttpServletResponse)servletResponse;
    	HttpSession session= request.getSession();
    	String requestURL=request.getServletPath();
    	String requestURI = request.getRequestURI();
    	logger.info("过滤器 doFilter,url:"+requestURL);
    	logger.info("过滤器 doFilter,uri:"+requestURI);
//    	response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
//        response.setHeader("Access-Control-Allow-Credentials", "true");
//        response.setHeader("P3P", "CP=CAO PSA OUR");
//    	  if (request.getHeader("Access-Control-Request-Method") != null &&
//    		         "OPTIONS".equals(request.getMethod())) {
//    		        // CORS "pre-flight" request
//    		        response.addHeader("Access-Control-Allow-Origin", "*");
//    		        response.addHeader("Access-Control-Allow-Methods",
//    		                "GET, POST, PUT, DELETE");
//    		        response.addHeader("Access-Control-Allow-Headers", "Content-Type");
//    		        response.addHeader("Access-Control-Max-Age", "1800");// 30 min
//    		        }
//    	
    	
    	if(requestURL.indexOf("formLogin")>=0||requestURL.endsWith(".js")||requestURL.endsWith(".css")||requestURL.endsWith(".woff")||requestURL.endsWith(".png")||"/".equals(requestURL)){
    		filterChain.doFilter(servletRequest, servletResponse);
    	}else{
    		String token=CookieUtil.findCookieValue(request.getCookies(), "token");
//    		token="d2ViLDM2MDAsMkV1c29YOVlEQ3IyTHkxTWZDSnJ2b3FMUW4xS0FIelRWSmJJb2R5dzZHcytvZnJPblprN092Vk5vQU52T2VLWER1ZWRlNXpuMisxNHZCR3AyNDZQeHc9PQ";
        	if(!StringUtils.isEmpty(token)){
        		String pk_user = (String)sessionManager.getSessionCacheAttribute(token, "pk_user");
        		SysUser user=userService.findById(pk_user==null?"null":pk_user);
        		if(user!=null){
        			InvocationInfoProxy.setUserid(user.getId());
            		InvocationInfoProxy.setUsername(user.getUsername());
            		InvocationInfoProxy.setSysid("ding");
                    InvocationInfoProxy.setLocale("zh_CN");
                    InvocationInfoProxy.setExtendAttribute("currentUser", user);
                    filterChain.doFilter(servletRequest, servletResponse);
        		}else{
        			if(requestURI.endsWith("html")){
        				session.setAttribute("requestURI", requestURI);
                		response.sendRedirect(request.getContextPath() + "/" +redirectURL);
        			}else{
        				response.sendError(404);
        			}
        			
        		}
        	}else{
        		if(requestURI.endsWith("html")){
        			session.setAttribute("requestURI", requestURI);
            		response.sendRedirect(request.getContextPath() + "/" +redirectURL);	
        		}else{
        			response.sendError(404);
        		}
    			
        		return;
        	}
            
    	}
    	
    }

    @Override
    public void destroy() {

    }
}
