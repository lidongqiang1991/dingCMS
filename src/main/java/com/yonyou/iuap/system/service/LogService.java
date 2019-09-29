package com.yonyou.iuap.system.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;
import com.yonyou.iuap.system.entity.Log;
import com.yonyou.iuap.system.entity.SysUser;
import com.yonyou.iuap.system.repository.LogDao;

/**
 * 系统日志service
 * @author xyb
 *
 */
@Service
public class LogService {
	
	@Autowired
	private MetadataDAO metadataDAO;
	
	@Autowired
	private LogDao  logDao;
	
	/**
	 * 查询所有的系统日志
	 * @param pageRequest
	 * @param searchParams
	 * @return
	 */
	public Page<Log> selectAllByPage(PageRequest pageRequest,Map<String, Object> searchParams){
		return logDao.selectAllByPage(pageRequest, searchParams);
	}
	
	/**
	 * 插入系统日志
	 * @param object 操作对象
	 * @param action 操作
	 * @param actcontent 具体操作内容
	 */
	public void  insertlog(String object,String action,String actcontent){
		//获取系统当前登录对象
		SysUser user=(SysUser)InvocationInfoProxy.getExtendAttribute("currentUser");
		//日志
		Log log=new Log();
		log.setUserid(user.getId());
		log.setOrgid(user.getOrgid());
		log.setUsername(user.getUsername());
		log.setOrgname(user.getOrgname());
		log.setActcontent(actcontent);//具体操作内容
		log.setObject(object);//操作对象
		log.setAction(action);//操作
		metadataDAO.insert(log);
	}
	
	/**
	 * 根据系统日志id查询一条系统日志
	 * @param logid 系统日志id
	 * @return
	 */
	public Log selectById(String logid){
		return logDao.selectById(logid);
	}
	
	/**
	 * 根据操作人查询操作的系统日志
	 * @param username 操作人
	 * @return
	 */
	public List<Log> selectByUsername(String username){
		return logDao.selectByUsername(username);
	}
	/**
	 * 查询所有的系统日志
	 * @return
	 */
	public List<Log> getAll(){
		return logDao.getAll();
	}
	public void save(Log log){
		log.setStatus(VOStatus.NEW);
		metadataDAO.save(log);
	}
}
