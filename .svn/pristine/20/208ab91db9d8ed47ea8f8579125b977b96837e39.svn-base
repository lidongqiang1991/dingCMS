package com.yonyou.iuap.system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

import com.yonyou.iuap.system.entity.App;


@Service
public class OAuthService {
	private Cache cache;
	@Autowired
	private AppService appService;
	private final Long time=600000L;//十分钟
	@Autowired
	public OAuthService(CacheManager cacheManager) {
		this.cache = cacheManager.getCache("code-cache");
	}

	public void addAuthCode(String authCode, String username) {
		cache.put(authCode, username);
	}
	
	public void addAccessToken(String accessToken, String username) {
		appService.updateToken(username, accessToken, System.currentTimeMillis());
		cache.put(accessToken, username);
	}
	public void fushAccessToken(String accessToken){
		appService.updateToken(accessToken, System.currentTimeMillis());
	}
	public String getUsernameByAuthCode(String authCode) {
		return (String) cache.get(authCode).get();
	}

	public String getUsernameByAccessToken(String accessToken) {
		return (String) cache.get(accessToken).get();
	}

	public boolean checkAuthCode(String authCode) {
		return cache.get(authCode) != null;
	}

	public Long checkAccessToken(String accessToken) {
		App app=appService.findByAppToken(accessToken);
		if(app!=null){
			return time-(System.currentTimeMillis()-app.getTime());
		}
		return -1L;
	}
	
	public boolean checkAppId(String AppId) {
		return appService.findByAppId(AppId) != null;
	}

	
	public boolean checkAppSecret(String AppSecret) {
		return appService.findByAppSecret(AppSecret) != null;
	}

	public long getExpireIn() {
		return 3600L;
	}
}
