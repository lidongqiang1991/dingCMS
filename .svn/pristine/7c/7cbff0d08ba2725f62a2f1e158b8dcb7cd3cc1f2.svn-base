package com.yonyou.iuap.system.repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.druid.util.StringUtils;
import com.yonyou.iuap.persistence.bs.dao.BaseDAO;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;
import com.yonyou.iuap.system.entity.SysUser;
import com.yonyou.iuap.system.entity.Template;

@Repository
public class TemplateDao {
	
	@Autowired
	private MetadataDAO metaDao;
	
	@Transactional
	public void save(List<Template> list,SysUser user){
		if(list!=null&&list.size()>0){
			for(Template tem : list){
				if(StringUtils.isEmpty(tem.getId())){
					tem.setUserid(user.getId());
					tem.setUsername(user.getUsername());
					tem.setStatus(VOStatus.NEW);
					tem.setId(UUID.randomUUID().toString());
					tem.setCreatetime(new Date());
					tem.setDr(0);
				}
				else {
					tem.setStatus(VOStatus.UPDATED);
					tem.setUserid(user.getId());
					tem.setUsername(user.getUsername());
				}
				metaDao.save(tem);
			}
		}
	}
	
	public List<Template> findByUserandForm(String userid,String templatename){
		if(!StringUtils.isEmpty(userid)&&!StringUtils.isEmpty(templatename)){
			String sql = "select * from sys_template where userid = '"+userid+"' and templatename = '"+templatename+"'";
			List<Template> list = metaDao.queryByClause(Template.class, sql);
			return list;
		}
		return null;
	}
}
