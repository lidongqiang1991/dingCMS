package com.ding.cms.web.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ding.cms.util.TokenUtil;
import com.yonyou.iuap.system.entity.App;
import com.yonyou.iuap.system.service.AppService;
import com.yonyou.iuap.system.service.OAuthService;
import com.yonyou.iuap.system.web.controller.BaseController;

@RestController
@RequestMapping("oauth")
public class AccessTokenController extends BaseController{
	@Autowired
	private AppService appService;
	@Autowired
	private OAuthService oauthService;
	@RequestMapping(value="authorization",params={"app_id","app_key"})
	public Object token(HttpServletRequest request){
		Map<String, Object> map=new HashMap<String, Object>();
		String appId=request.getParameter("app_id");
		String appKey=request.getParameter("app_key");
		if(oauthService.checkAppId(appId)){
			App app=appService.findByAppId(appId);
			if(!appKey.equals("")&&app.getAppkey().equals(appKey)){
				
				String token=app.getToken();
				if(token==null||oauthService.checkAccessToken(token)<0){
					token=TokenUtil.createToken(request.getParameterMap());
					oauthService.addAccessToken(token, appId);
				}else{
					oauthService.fushAccessToken(token);
				}
				map.put("token", token);
				return map;
			}
			map.put("errorcode", 40002);
			map.put("errmsg", "app_key不正确");
			return map;
		}
		map.put("errorcode", 40001);
		map.put("errmsg", "无效的app_id");
		return map;
	}
}
