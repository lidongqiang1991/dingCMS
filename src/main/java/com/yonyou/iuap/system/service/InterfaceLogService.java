package com.yonyou.iuap.system.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.yonyou.iuap.system.entity.InterfaceLog;
import com.yonyou.iuap.system.repository.InterfaceLogDao;

@Service
public class InterfaceLogService {
	@Autowired
	private InterfaceLogDao logDao;
	/**
	 * 根据参数查询sys_interface_log表中最新的starttime字段
	 * @param type 表示url
	 * @param sender 表示发送人
	 * @param receiver 表示接收人
	 * @return
	 */
	public String getStartDate(String type,String sender,String receiver){
		return logDao.getStartDate(type, sender, receiver);
	}
	public void save(InterfaceLog log){
		logDao.save(log);
	}
}
