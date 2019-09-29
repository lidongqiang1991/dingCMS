package com.yonyou.iuap.system.repository;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.jdbc.framework.processor.ColumnProcessor;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;
import com.yonyou.iuap.system.entity.InterfaceLog;
@Repository
public class InterfaceLogDao {
	@Autowired
	private MetadataDAO dao;
	public String getStartDate(String type,String sender,String receiver){
		String sql="select max(starttime) from  sys_interface_log where type = ? and sender = ? and  receiver = ? and issuccess=1";
		SQLParameter parameter=new SQLParameter();
		parameter.addParam(type);
		parameter.addParam(sender);
		parameter.addParam(receiver);
		return dao.queryForObject(sql,parameter ,new ColumnProcessor());
	}
	public void save(InterfaceLog log){
		if(log.getId()!=null)log.setStatus(VOStatus.UPDATED);
		else log.setStatus(VOStatus.NEW);
		dao.save(log);
	}
}
