package com.ding.cms.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.ding.cms.entity.FilterFactor;
import com.ding.cms.entity.UserFilter;
import com.ding.cms.repository.AdvancedFilterDao;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
@Service
public class AdvancedFilterService {
	
	@Autowired
	private AdvancedFilterDao advancedFilterDao;
	
	public Page<FilterFactor> queryFilterAttributeForDefferentPage(PageRequest pageRequest, Map<String, Object> searchParams){
		return advancedFilterDao.queryFilterAttributeForDefferentPage(pageRequest, searchParams);
	}
	
	public void deleteFilterAttributeForDefferentPage(List<FilterFactor> filters){
		advancedFilterDao.deleteFilterAttributeForDefferentPage(filters);
	}
	
	public void saveFilterAttributeForDefferentPage(FilterFactor filter){
		advancedFilterDao.saveFilterAttributeForDefferentPage(filter);
	}
	
	public List<FilterFactor> queryFilterForDefferentPage(String type,String filtername){
		return advancedFilterDao.queryFilterForDefferentPage(type,filtername);
	}
	
	public List<FilterFactor> queryFilterForUser(String type,String filtername){
		return advancedFilterDao.queryFilterForUser(type,filtername);
	}
	
	public void deleteFilterForUser(List<FilterFactor> filters){
		advancedFilterDao.deleteFilterForUser(filters);
	}
	
	public void saveFilterForUser(List<FilterFactor> filters){
		advancedFilterDao.saveFilterForUser(filters);
	}
	
	/**
	 * 保存场景及条件
	 * @param filter
	 */
	public void saveUserFilter(UserFilter filter){
		advancedFilterDao.saveUserFilter(filter);
	}
	
	/**
	 * 查询场景
	 * @return
	 */
	public List<UserFilter> queryUserFilter(String all,String type){
		return advancedFilterDao.queryUserFilter(all,type);
	}
	
	/**
	 * 根据场景id查询场景详情，包含过滤条件
	 * @param filterid
	 * @return
	 */
	public UserFilter queryUserFilterById(String filterid){
		return advancedFilterDao.queryUserFilterById(filterid);
	}
	
	/**
	 * 删除场景并删除过滤条件
	 */
	public void deleteUserFilterById(String filterid){
		advancedFilterDao.deleteUserFilterById(filterid);
	}
	
	/**
	 * 根据filterid 生成过滤SQL片段
	 * @param filterid
	 * @return
	 */
	public Map<String , Object> createSqlByFilterid(String filterid,SQLParameter sqlParameter){
		return advancedFilterDao.createSqlByFilterid(filterid, sqlParameter);
	}
	
	/**
	 * 根据filter 生成过滤SQL片段
	 * @param filterid
	 * @return
	 */
	public Map<String , Object> createSqlByFilter(String filter,SQLParameter sqlParameter){
		return advancedFilterDao.createSqlByFilter(filter, sqlParameter);
	}
	
}
