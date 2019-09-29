package com.yonyou.iuap.system.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.ding.cms.entity.LogUser;
import com.yonyou.iuap.system.repository.LogUserDao;

@Service
public class LogUserService {
	@Autowired
	private LogUserDao logUserDao;
	public Page<LogUser> selectAllByPage(PageRequest pageRequest,Map<String, Object> searchParams){
		return logUserDao.selectAllByPage(pageRequest,searchParams);
	}
}
