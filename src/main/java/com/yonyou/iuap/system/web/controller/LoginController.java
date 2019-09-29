package com.yonyou.iuap.system.web.controller;

import java.io.IOException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springside.modules.security.utils.Digests;
import org.springside.modules.utils.Encodes;

import com.alibaba.druid.util.StringUtils;
import com.yonyou.iuap.auth.session.SessionManager;
import com.yonyou.iuap.auth.shiro.AuthConstants;
import com.yonyou.iuap.auth.token.ITokenProcessor;
import com.yonyou.iuap.auth.token.TokenParameter;
import com.yonyou.iuap.system.entity.SysUser;
import com.yonyou.iuap.system.service.AccountService;
import com.yonyou.iuap.system.service.SysUserService;
import com.yonyou.iuap.utils.CookieUtil;

/**
 * 默认登录逻辑示例，项目使用时候根据自己的需求，添加rsa加密、配置token生成参数等
 */
@Controller
@RequestMapping(value = "/login")
public class LoginController {
	
    private final Logger logger = LoggerFactory.getLogger(getClass());
	
	public static final int HASH_INTERATIONS = 1024;
	
    @Autowired
    private SessionManager sessionManager;

	@Autowired
	protected AccountService accountService;
	@Autowired
	protected SysUserService userService;
	//为网页版本的登录Controller指定webTokenProcessor 相应的移动的指定为maTokenProcessor
	@Autowired()
	protected ITokenProcessor webTokenProcessor;
	
	@RequestMapping(method = RequestMethod.GET)
	public String login(Model model) {
		
		//return "login." + InvocationInfoProxy.getLocale()+".html";
		return "login";
	}
	
	@RequestMapping(method = RequestMethod.POST,value="formLogin")
	public String formLogin(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {
        
		/**
		 * 注意，此示例中简单验证了用户的登录过程，正规上线环境，需要考虑
		 * 前端用ras算法加密，此处用iuap-security组件中的RsaUtils解密，前端需要做输入校验
		 */
		String userName = request.getParameter("username");
        String passWord = request.getParameter("password");
//        HttpSession session= request.getSession();
//		MgrUser user = accountService.findUserByLoginName(userName);
		SysUser u=userService.findByLoginCode(userName);
		if(u != null&&((!StringUtils.isEmpty(u.getLevelname())&&"管家".equals(u.getLevelname()))||!"1".equals(u.getStatusid()))){
			model.addAttribute("accounterror", "您没有登录权限!");
            return null;
		}
		if (passWord!=null && u != null) {
			byte[] hashPassword = Digests.sha1(passWord.getBytes(), Encodes.decodeHex(u.getRemark()), HASH_INTERATIONS);
			String checkPwd = Encodes.encodeHex(hashPassword);
			if(checkPwd.equals(u.getUserpassword())){
                
                TokenParameter tp = new TokenParameter();
                tp.setUserid(userName);
                // 设置登录时间
                tp.setLogints(String.valueOf(System.currentTimeMillis()));
                
                // 租户信息,saas应用登录的时候获取用户信息，设置租户id
//                tp.getExt().put(AuthConstants.PARAM_TENANTID , u.getId()+"");
                
                Cookie[] cookies = webTokenProcessor.getCookieFromTokenParameter(tp);
                
                String token=CookieUtil.findCookieValue(cookies, "token");
                
                for(Cookie cookie : cookies){
            	   response.addCookie(cookie);
                }
				sessionManager.putSessionCacheAttribute(token, "pk_user", u.getId()+""); 
				sessionManager.putSessionCacheAttribute(token, u.getId()+"", u.getUsername());
            } else {
            	logger.error("用户名密码错误!");
                model.addAttribute("accounterror", "用户名密码错误!");
                return "login";
            }
            return "redirect";
		} else {
            model.addAttribute("accounterror", "你输入的用户不存在!");
            return "login";
		}
	}
	
	@RequestMapping(method = RequestMethod.POST,value="loginout")
	public void loginOut(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {
		String token=CookieUtil.findCookieValue(request.getCookies(), "token");
		if(!StringUtils.isEmpty(token))
		sessionManager.removeSessionCache(token);
	}
	
	
	@RequestMapping(method = RequestMethod.POST)
	public String fail(@RequestParam(FormAuthenticationFilter.DEFAULT_USERNAME_PARAM) String userName, Model model) {
		model.addAttribute(FormAuthenticationFilter.DEFAULT_USERNAME_PARAM, userName);
		return "login";
	}

}
