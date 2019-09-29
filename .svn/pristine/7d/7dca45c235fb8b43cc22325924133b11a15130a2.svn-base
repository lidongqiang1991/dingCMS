package com.yonyou.iuap.system.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yonyou.iuap.system.entity.SysUser;
import com.yonyou.iuap.system.entity.Template;
import com.yonyou.iuap.system.repository.TemplateDao;

@Service
public class TemplateService {
	
	@Autowired
	private TemplateDao templateDao;
	
	public void save (List<Template> list,SysUser user){
		templateDao.save(list,user);
	}
	
	public List<Template> findByUserandForm(String userid,String templatename){
		return templateDao.findByUserandForm(userid, templatename);
	}
	
}
