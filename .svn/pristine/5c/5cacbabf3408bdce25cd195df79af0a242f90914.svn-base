package com.ding.cms.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ding.cms.entity.JobLog;
import com.ding.cms.repository.JobLogDao;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.jdbc.framework.processor.ColumnProcessor;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;

@Service
public class JobLogService {
	@Autowired
	private JobLogDao jobLogDao;
	public Date getStartDate(String jobId){
		return jobLogDao.getStartDate(jobId);
	}
	public void save(JobLog log){
		jobLogDao.save(log);
	}
}
