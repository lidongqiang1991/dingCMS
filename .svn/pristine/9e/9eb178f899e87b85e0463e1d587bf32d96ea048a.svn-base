package com.yonyou.iuap.system.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yonyou.iuap.system.entity.App;
import com.yonyou.iuap.system.repository.AppDao;

@Service("AppService")
public class AppService {
	@Autowired
	private AppDao appDao;
	// 根据客户端id查找客户端  
	  public App findByAppId(String AppId){
		  return appDao.findByAppId(AppId);
	  }
	  //根据客户端安全KEY查找客户端  
	  public App findByAppSecret(String AppSecret){
		 return appDao.findByAppSecret(AppSecret);
	  }
	  //根据客户端token查找客户端  
	  public App findByAppToken(String token){
		  return appDao.findByAppToken(token);
	  }
	  //设置token时长
	  @Transactional
	  public void updateToken(String token,Long time){
		  appDao.updateToken(token, time);
	  }
	  //增加token
	  @Transactional
	  public void updateToken(String AppId,String token,Long time){
		  appDao.updateToken(AppId, token, time);
	  }
}
