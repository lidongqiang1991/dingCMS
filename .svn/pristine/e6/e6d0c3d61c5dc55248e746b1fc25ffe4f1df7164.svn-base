package com.yonyou.iuap.system.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.system.entity.App;

@Repository
public class AppDao {
	@Autowired
	private MetadataDAO metadataDAO;
		// 根据客户端id查找客户端  
	  public App findByAppId(String appId){
		  String sql="select * from bd_app where appId= '"+appId+"'";
		  List<App> apps=metadataDAO.queryByClause(App.class, sql);
		  return (apps!=null&&!apps.isEmpty())?apps.get(0):null;
	  }
	  //根据客户端安全KEY查找客户端  
	  public App findByAppSecret(String appkey){
		  String sql="select * from bd_app where appkey='"+appkey+"'";
		  List<App> apps=metadataDAO.queryByClause(App.class, sql);
		  return (apps!=null&&!apps.isEmpty())?apps.get(0):null;
	  }
	  //根据客户端token查找客户端  
	  public App findByAppToken(String token){
		  String sql="select * from bd_app where token='"+token+"'";
		  List<App> apps=metadataDAO.queryByClause(App.class, sql);
		  return (apps!=null&&!apps.isEmpty())?apps.get(0):null;
	  }
	  //设置token时长
	  public void updateToken(String token,Long time){
		  String sql="update bd_app set time="+time+" where token='"+token+"'";
		  metadataDAO.update(sql);
	  }
	  //增加token
	  public void updateToken(String appId,String token,Long time){
		  String sql="update bd_app set time="+time+", token='"+token+"' where appId='"+appId+"'" ;
		  metadataDAO.update(sql);
	  }
}
