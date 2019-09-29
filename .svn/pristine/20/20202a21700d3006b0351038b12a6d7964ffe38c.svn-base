package com.yonyou.iuap.system.repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.persistence.IdClass;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;
import com.yonyou.iuap.system.entity.Dictionary;
import com.yonyou.iuap.system.entity.Dictionarys;

@Repository
public class DictionaryDao {
	@Autowired
	private MetadataDAO dao;
	public Dictionary save(Dictionarys dictionarys){
		Dictionary dictionary=dictionarys.getParentDictionary();
		List<Dictionary> dictionaries=dictionarys.getChildDictionaries();
		String parentid=null;
		if(StringUtils.isEmpty(dictionary.getId())){
			dictionary.setCreateorid(InvocationInfoProxy.getUserid());
			dictionary.setCreateorname(InvocationInfoProxy.getUsername());
			dictionary.setCreatetime(new Date());
			dictionary.setStatus(VOStatus.NEW);
			parentid=dao.insert(dictionary);
		}else{
			parentid=dictionary.getId();
			dictionary.setModifyid(InvocationInfoProxy.getUserid());
			dictionary.setModifyname(InvocationInfoProxy.getUsername());
			dictionary.setStatus(VOStatus.UPDATED);
			dao.update(dictionary);
		}
		if(dictionaries!=null&&dictionaries.size()>0){
			deleteChild(parentid);
			for (Dictionary item : dictionaries) {
				item.setCreateorid(InvocationInfoProxy.getUserid());
				item.setCreateorname(InvocationInfoProxy.getUsername());
				item.setCreatetime(new Date());
				item.setStatus(VOStatus.NEW);
				item.setParentid(parentid);
			}
			dao.insert(dictionaries);
		}
		return dictionary;
	}
	public Page<Dictionary> selectAllByPage(PageRequest pageRequest,Map<String, Object> searchParams){
		String sql="select * from sys_dictionary where dr = 0 and ";
		StringBuilder sb=new StringBuilder(sql);
		SQLParameter sqlParameter=new SQLParameter();
		if(searchParams.isEmpty()){
			sb.append("parentid is null and ");
		}
		for (Entry<String, Object> item : searchParams.entrySet()) {
			if("id".equals(item.getKey())){
				sb.append("id = ? and ");
				sqlParameter.addParam(item.getValue());
			}else if("parentid".equals(item.getKey())){
				sb.append("parentid = ? and ");
				sqlParameter.addParam(item.getValue());
			}
		}
		sb.delete(sb.length()-4,sb.length());
		return dao.queryPage(sb.toString(), sqlParameter, pageRequest, Dictionary.class);
	}
	public void delete(Dictionary dictionary){
		dao.remove(dictionary);
		if(dictionary.getParentid()==null){
			deleteChild(dictionary.getId());
		}
	}
	public void deleteChild(String parentid){
		if(parentid!=null){
			String sql="select * from sys_dictionary where dr = 0 and parentid = '"+parentid+"'";
			List<Dictionary> dictionaries=dao.queryByClause(Dictionary.class, sql);
			if(dictionaries!=null&&!dictionaries.isEmpty())
				dao.remove(dictionaries);
		}
	}
}
