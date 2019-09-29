package com.ding.cms.repository;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ding.cms.entity.JobLog;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.jdbc.framework.processor.ColumnProcessor;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;

@Repository
public class JobLogDao {
	@Autowired
	private MetadataDAO dao;
	public Date getStartDate(String jobId){
		String sql="select max(starttime) from bd_joblog where jobid=? and success=1";
		SQLParameter parameter=new SQLParameter();
		parameter.addParam(jobId);
		return (Date)dao.queryForObject(sql,parameter ,new ColumnProcessor());
	}
	public void save(JobLog log){
		log.setStatus(VOStatus.NEW);
		dao.save(log);
	}
}
