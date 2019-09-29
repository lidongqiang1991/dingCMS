package com.ding.cms.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ding.cms.entity.Agent;
import com.ding.cms.repository.AgentDao;


@Service
public class AgentService {
	
	@Autowired
	private AgentDao sysAgentDao;
	
	public Page<Agent> selectByPage(PageRequest pageRequest, Map<String, Object> searchParams){
		return sysAgentDao.selectByPage(pageRequest, searchParams);
	}
	
	@Transactional
    public Agent save(Agent entity) {
        return sysAgentDao.save(entity) ;
    }
	
	@Transactional
	public void delete(List<Agent> list) {
		sysAgentDao.delete(list);
	}
	
	public Agent queryByPk(String agentid){
		return sysAgentDao.queryByPk(agentid);
	}
	
}
