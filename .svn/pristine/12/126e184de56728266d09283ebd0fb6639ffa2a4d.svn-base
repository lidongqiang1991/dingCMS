package com.yonyou.iuap.system.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.hibernate.annotations.Parent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.yonyou.iuap.mvc.type.SearchParams;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.system.entity.Dictionary;
import com.yonyou.iuap.system.entity.Dictionarys;
import com.yonyou.iuap.system.repository.DictionaryDao;

@Service
public class DictionaryService {
	@Autowired
	private DictionaryDao dictionaryDao;
	@Autowired
	private MetadataDAO dao;
	public Dictionary save(Dictionarys dictionary){
		return dictionaryDao.save(dictionary);
	}
	public Page<Dictionary> selectAllByPage(PageRequest pageRequest,Map<String, Object> searchParams){
		return dictionaryDao.selectAllByPage(pageRequest, searchParams);
	}
	public void delete(Dictionary dictionary){
		dictionaryDao.delete(dictionary);
	}
	public Dictionarys selectById(PageRequest pageRequest,Map<String, Object> searchParams){
		Dictionarys dictionarys=new Dictionarys();
		for (Entry<String, Object> item : searchParams.entrySet()) {
			if("id".equals(item.getKey())){
				Dictionary parent = dao.queryByPK(Dictionary.class, item.getValue().toString());
				if(parent!=null){
					Map<String, Object> map=new HashMap<String, Object>();
					map.put("parentid", parent.getId());
					Page<Dictionary> children = dictionaryDao.selectAllByPage(pageRequest, map);
					dictionarys.setChildDictionaries(children!=null?children.getContent():null);
					dictionarys.setParentDictionary(parent);
					return dictionarys;
				}
				
			}
		}
		return null;
	}
}
