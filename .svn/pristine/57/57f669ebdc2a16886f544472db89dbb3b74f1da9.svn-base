package com.ding.cms.service;

import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ding.cms.entity.Reward;
import com.ding.cms.repository.RewardDao;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.system.entity.SysUser;

@Service
public class RewardService {
	@Autowired
	private RewardDao rewardDao;
	@Transactional
	public Reward save(Reward reward){
		if(reward.getRewardid()==null){
		 SysUser user=(SysUser)InvocationInfoProxy.getExtendAttribute("currentUser");
		 reward.setCreator(user.getUsername());
		 reward.setCreatorid(user.getId());
		 reward.setCreationtime(new Date());
		}
		reward.setEffecttime(reward.getEffecttime().substring(0,10));
		reward.setInvalidtime(reward.getInvalidtime().substring(0,10));
		return rewardDao.saveOrUpdate(reward);
	}
	@Transactional
	public void delete(Reward reward){
		rewardDao.delete(reward);
	}
	public Page<Reward> selectByPage(PageRequest pageRequest,Map<String, Object> searchParams){
		return rewardDao.selectByPage(pageRequest, searchParams);
	}
}
