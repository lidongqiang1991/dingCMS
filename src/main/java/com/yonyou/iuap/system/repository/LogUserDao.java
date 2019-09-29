package com.yonyou.iuap.system.repository;

import java.util.Map;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import com.ding.cms.entity.LogUser;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;
@Repository
public class LogUserDao {
	@Autowired
	private MetadataDAO dao;
	public void save(LogUser log) {
		log.setCreateorid(InvocationInfoProxy.getUserid());
		log.setCreatename(InvocationInfoProxy.getUsername());
		log.setStatus(VOStatus.NEW);
		dao.save(log);
	}
	public Page<LogUser> selectAllByPage(PageRequest pageRequest,
			Map<String, Object> searchParams) {
		String sql="select * from log_user where dr=0 and ";
		StringBuilder sb=new StringBuilder(sql);
		SQLParameter param=new SQLParameter();
		for (Entry<String, Object> item : searchParams.entrySet()) {
			if("userid".equals(item.getKey())){
				sb.append(" userid = ? and ");
				param.addParam(item.getValue());
			}else if("role".equals(item.getKey())){
				sb.append(" role = ? and ");
				param.addParam(item.getValue());
			}
		}
		sb.delete(sb.length()-4, sb.length());
		return dao.queryPage(sb.toString(), param, pageRequest, LogUser.class);
	}

}
