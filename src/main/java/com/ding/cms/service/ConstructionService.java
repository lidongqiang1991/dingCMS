package com.ding.cms.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.ding.cms.entity.Construction;
import com.ding.cms.entity.CustomerListEntity;
import com.ding.cms.entity.LogOrderNote;
import com.ding.cms.entity.LogUser;
import com.ding.cms.repository.ConstructionDao;
import com.ding.cms.util.Constants;
import com.ding.cms.util.QRCodeUtil;
import com.ding.cms.util.QiniuFileUtil;
import com.yonyou.iuap.system.repository.LogUserDao;


@Service
public class ConstructionService {
	
	@Autowired
	private ConstructionDao sysTeamDao;
	@Autowired
	private ServiceService serviceService;
	@Autowired
	private LogUserDao logUserDao;
	public Page<Construction> selectAllByPage(PageRequest pageRequest, Map<String, Object> searchParams){
		return sysTeamDao.selectAllByPage(pageRequest, searchParams);
	}
	@Transactional
	public Construction save(Construction entity){
		Construction construction = sysTeamDao.save(entity);
		if(!StringUtils.isEmpty(entity.getBlmemo())){
			LogUser log=new LogUser();
			log.setMemo(entity.getBlmemo());
			log.setRole("construction");
			log.setMemotype(entity.getBlstatus()==0?"移出黑名单":"加入黑名单");
			log.setUserid(construction.getId());
			log.setUsername(construction.getTeamname());
			logUserDao.save(log);
		}
		return construction;
	}
	
	public void delete(List<Construction> list){
		sysTeamDao.delete(list);
	}
	public Map show(String id){
	 	return sysTeamDao.show(id);
	}
	
	public Page<Construction> selectAllbyCon(PageRequest pageRequest, Map<String, Object> searchParams){
		//Map map =serviceService.sum();
		Page<Construction> tempData=sysTeamDao.selectAllByPage(pageRequest, searchParams);
		
		List<Construction> list =tempData.getContent();
		for (int i = 0; i < list.size(); i++) {
			String constructionid = list.get(i).getId();
			String sum =String.valueOf(serviceService.sum(constructionid).get("sum"));
			list.get(i).setJobscope(sum);
		}
		return  tempData;
	}
}
