package com.ding.cms.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import com.alibaba.druid.util.StringUtils;
import com.ding.cms.entity.FilterFactor;
import com.ding.cms.entity.UserFilter;
import com.ding.cms.util.DateUtils;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.persistence.bs.dao.DAOException;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.jdbc.framework.util.SQLHelper;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;
import com.yonyou.iuap.system.entity.Org;
import com.yonyou.iuap.system.entity.SysUser;
import com.yonyou.iuap.system.service.OrgService;
@Repository
public class AdvancedFilterDao {
	
	@Autowired
    private MetadataDAO metadataDAO;
	
	@Autowired
	private OrgService orgService;
	
	public void saveFilterAttributeForDefferentPage(FilterFactor filter){
		//新增
		if(StringUtils.isEmpty(filter.getId())){
			SysUser user = (SysUser) InvocationInfoProxy.getExtendAttribute("currentUser");
			filter.setId(UUID.randomUUID().toString());
			filter.setCreatorid(user.getId());
			filter.setCreatorname(user.getUsername());
			filter.setCreatetime(DateUtils.currentTimestampToString());
			filter.setFiltertype(FilterFactor.FILTERTYPE_FOR_SYSTEM);
			filter.setStatus(VOStatus.NEW);
			metadataDAO.save(filter);
		}
		//修改
		else{
			filter.setStatus(VOStatus.UPDATED);
			metadataDAO.update(filter);
		}
	}
	
	public void deleteFilterAttributeForDefferentPage(List<FilterFactor> filters){
		metadataDAO.remove(filters);
	}
	
	public Page<FilterFactor> queryFilterAttributeForDefferentPage(PageRequest pageRequest, Map<String, Object> searchParams) throws DAOException{
		StringBuilder sb=new StringBuilder();
		sb.append("select * from filter_factor ");
		SQLParameter sqlparam = new SQLParameter();
		sb.append(" where dr=0 and ");
		sb.append(" filtertype = '"+FilterFactor.FILTERTYPE_FOR_SYSTEM+"' and ");
        if (null != searchParams && !searchParams.isEmpty()) {
            for (String key : searchParams.keySet()){
				String value=(String)searchParams.get(key);
				if(value.equals("-1")){
					continue;
				}
				if(StringUtils.isEmpty(value)){
					continue;
				}
            	if("type".equals(key)){
            		sb.append(" type = ? and ");
            		sqlparam.addParam((String)searchParams.get(key));
            	}
            }
        }
        sb.delete(sb.length()-4, sb.length());
		return metadataDAO.queryPage(sb.toString(), sqlparam, pageRequest, FilterFactor.class);
	}
	
	public void saveFilterForUser(List<FilterFactor> filters){
		if(filters!=null&&filters.size()>0){
			for (int i = 0; i < filters.size(); i++) {				
				FilterFactor filter = filters.get(i);
				//新增
				if(StringUtils.isEmpty(filter.getId())){
					SysUser user = (SysUser) InvocationInfoProxy.getExtendAttribute("currentUser");
					filter.setId(UUID.randomUUID().toString());
					filter.setCreatorid(user.getId());
					filter.setCreatorname(user.getUsername());
					filter.setFiltertype(FilterFactor.FILTERTYPE_FOR_USER);
					filter.setStatus(VOStatus.NEW);
					metadataDAO.save(filter);
				}
				//修改
				else{
					filter.setStatus(VOStatus.UPDATED);
					metadataDAO.update(filter);
				}
			}
		}
	}
	
	public void deleteFilterForUser(List<FilterFactor> filters){
		metadataDAO.remove(filters);
	}
	
	public List<FilterFactor> queryFilterForDefferentPage(String type,String filtername){
		String sql = "select * from filter_factor where dr = 0 and type = '"+type+"' and filtertype = '"+FilterFactor.FILTERTYPE_FOR_USER+"' "
				+ "and filtername = '"+filtername+"'";
		List<FilterFactor> result = metadataDAO.queryByClause(FilterFactor.class, sql);
		return result;
	}
	
	public List<FilterFactor> queryFilterForUser(String type,String filtername){
		String userid = InvocationInfoProxy.getUserid();
		String sql = "select * from filter_factor where dr = 0 and type = '"+type+"' and userid = '"+userid+"' and filtertype = '"+FilterFactor.FILTERTYPE_FOR_USER+"' "
				+ "and filtername = '"+filtername+"'";
		List<FilterFactor> result = metadataDAO.queryByClause(FilterFactor.class, sql);
		return result;
	}
	/**
	 * 保存场景及条件
	 * @param filter
	 */
	public void saveUserFilter(UserFilter filter){
		SysUser user = (SysUser) InvocationInfoProxy.getExtendAttribute("currentUser");
		//新增
		if(StringUtils.isEmpty(filter.getId())){
			filter.setId(UUID.randomUUID().toString());
			filter.setCreatorid(user.getId());
			filter.setCreatorname(user.getUsername());
			filter.setUserid(user.getId());
			filter.setUsername(user.getUsername());
			filter.setOrgid(user.getOrgid());
			filter.setOrgname(user.getOrgname());
			filter.setCreatetime(DateUtils.currentTimestampToString());
			filter.setIshide("N");
			filter.setIsdefault("N");
			filter.setStatus(VOStatus.NEW);
		}
		//修改
		else{
			filter.setStatus(VOStatus.UPDATED);
			//先清空之前保存的筛选条件
			delChildByPId(filter.getId_filterfactor(), filter.getId());
		}
		if(filter.getId_filterfactor()!=null&&filter.getId_filterfactor().size()>0){
			for(FilterFactor factor : filter.getId_filterfactor()){
				if(StringUtils.isEmpty(factor.getId())){
					factor.setId(UUID.randomUUID().toString());
					factor.setFiltertype(FilterFactor.FILTERTYPE_FOR_USER);
					factor.setCreatorid(user.getId());
					factor.setCreatorname(user.getUsername());
					factor.setCreatetime(DateUtils.currentTimestampToString());
					factor.setStatus(VOStatus.NEW);
				}else{
					factor.setStatus(VOStatus.UPDATED);
				}
				factor.setFilterid(filter.getId());
				factor.setFk_id_filterfactor(filter.getId());
			}
			metadataDAO.save(filter,filter.getId_filterfactor().toArray(new FilterFactor[filter.getId_filterfactor().size()]));
		}else{
			metadataDAO.save(filter);			
		}
	}
	/**
	 * 查询场景
	 * @return
	 */
	public List<UserFilter> queryUserFilter(String all,String type){
		if("all".equals(all)){
			String sql1 = "select * from user_filter where dr = 0 and type = '"+type+"'";
			return metadataDAO.queryByClause(UserFilter.class, sql1);
		}else{
			String userid = InvocationInfoProxy.getUserid();
			String sql2 = "select * from user_filter where dr = 0 and userid = '"+userid+"' and type = '"+type+"'";
			return metadataDAO.queryByClause(UserFilter.class, sql2);
		}
	}
	/**
	 * 根据场景id查询场景详情，包含过滤条件
	 * @param filterid
	 * @return
	 */
	public UserFilter queryUserFilterById(String filterid){
		String sql = "select * from filter_factor where dr = 0 and filterid = '"+filterid+"'";
		List<FilterFactor> factors = metadataDAO.queryByClause(FilterFactor.class, sql);
		UserFilter filter = metadataDAO.queryByPK(UserFilter.class, filterid);
		if(filter!=null){
			filter.setId_filterfactor(factors);
			return filter;
		}else{
			return null;
		}
	}
	/**
	 * 删除场景并删除过滤条件
	 */
	public void deleteUserFilterById(String filterid){
		String sql1 = "update user_filter set dr = 1 where id = '"+filterid+"'";
		String sql2 = "update filter_factor set dr = 1 where filterid = '"+filterid+"'";
		metadataDAO.update(sql1);
		metadataDAO.update(sql2);
	}
	/**
	 * 根据filterid 生成过滤SQL片段
	 * @param filterid
	 * @return
	 */
	public Map<String , Object> createSqlByFilterid(String filterid,SQLParameter sqlParameter){
		Map<String , Object> map = new HashMap<String , Object>();
		String sql = "select * from filter_factor where dr = 0 and filterid = '"+filterid+"'";
		List<FilterFactor> factors = metadataDAO.queryByClause(FilterFactor.class, sql);
		return createSqlByFactor(factors, sqlParameter);
	}
	
	/**
	 * 根据filter 生成过滤SQL片段
	 * @param filterid
	 * @return
	 */
	public Map<String , Object> createSqlByFilter(String filter,SQLParameter sqlParameter){
		JSONArray array = JSONArray.fromObject(filter);
//		JSONObject json=JSONObject.fromObject(filter);
//		JSONArray array=JSONArray.
		List<FilterFactor> factors = new ArrayList<FilterFactor>();
		for (int i = 0; i < array.size(); i++) {
			JSONObject obj=(JSONObject)array.get(i);
			obj.remove("ts");
			obj.remove("setting");
			obj.remove("conditionlist");
			String value = obj.getString("value");
			obj.remove("value");
			FilterFactor factor = (FilterFactor)JSONObject.toBean(obj, FilterFactor.class);
			factor.setValue(value);
			factors.add(factor);
		}
		return createSqlByFactor(factors, sqlParameter);
		
	}
	
	/**
	 * 根据factors 生成过滤SQL片段
	 * @param filterid
	 * @return
	 */
	public Map<String , Object> createSqlByFactor(List<FilterFactor> factors,SQLParameter sqlParameter){
		Map<String , Object> map = new HashMap<String , Object>();
		if(factors!=null&&factors.size()>0){
			StringBuilder sb = new StringBuilder();
			for (int i = 0; i < factors.size(); i++) {
				FilterFactor factor = factors.get(i);
				if(!StringUtils.isEmpty(factor.getFormtype())&&"date".equals(factor.getFormtype())){
					sb.append(factor.getField()+" >=  ?  and ");
					sqlParameter.addParam(factor.getStarttime()+" 00:00:00");
					sb.append(factor.getField()+" <=  ?  and ");
					sqlParameter.addParam(factor.getEndtime()+" 23:59:59");
				}else if(!StringUtils.isEmpty(factor.getFormtype())&&"org".equals(factor.getFormtype())){
					StringBuilder sql_=new StringBuilder();
					String factorValue = factor.getValue();
					if(!StringUtils.isEmpty(factorValue)){
						String[] factorValues = factorValue.split(",");
						String field = factor.getField().replace("orgid", "agentid");
						sql_.append(field+" in (");
						for(int b=0 ; b<factorValues.length ; b++){							
							List<Org> orgs= orgService.findByFid(factor.getValue());
							if (!orgs.isEmpty()&&orgs.size()>0) {
								for (Org org : orgs) {
									sql_.append("'" + org.getOrgid() + "' ,");
								}
							}
						}
						sql_.delete(sql_.length() - 1, sql_.length());
						sql_.append(") and ");
						sb.append(sql_);
					}
				}else{
					if("contain".equals(factor.getConditions())){
						String value = factor.getValue();
						if(!StringUtils.isEmpty(value)){
							String[] values = value.split(",");
							sb.append(factor.getField()+" in ( ");
							for(int a=0 ; a<values.length ; a++){								
								sb.append("'"+values[a]+"' ,");
							}
							sb.delete(sb.length() - 1, sb.length());
							sb.append(") and ");
						}
					}else if("no_contain".equals(factor.getConditions())){
						String value = factor.getValue();
						if(!StringUtils.isEmpty(value)){
							String[] values = value.split(",");
							sb.append(factor.getField()+" not in ( ");
							for(int a=0 ; a<values.length ; a++){								
								sb.append("'"+values[a]+"' ,");
							}
							sb.delete(sb.length() - 1, sb.length());
							sb.append(") and ");
						}
					}else if("equal".equals(factor.getConditions())){
						sb.append(factor.getField()+" = ? and ");
						sqlParameter.addParam(factor.getValue());
					}else if("no_equal".equals(factor.getConditions())){
						sb.append(factor.getField()+" <> ? and ");
						sqlParameter.addParam(factor.getValue());
					}else if("is_null".equals(factor.getConditions())){
						sb.append(factor.getField()+" is null and ");
					}else if("not_null".equals(factor.getConditions())){
						sb.append(factor.getField()+" is not null and ");
					}else if("gt".equals(factor.getConditions())){
						sb.append(factor.getField()+" > and ");
						sqlParameter.addParam(factor.getValue());
					}else if("ge".equals(factor.getConditions())){
						sb.append(factor.getField()+" >= and ");
						sqlParameter.addParam(factor.getValue());
					}else if("lt".equals(factor.getConditions())){
						sb.append(factor.getField()+" < and ");
						sqlParameter.addParam(factor.getValue());
					}else if("le".equals(factor.getConditions())){
						sb.append(factor.getField()+" <= and ");
						sqlParameter.addParam(factor.getValue());
					}
				}
				map.put("sql", sb.toString());
				map.put("parameter", sqlParameter);
			}
		}else{
			map.put("sql", "");
			map.put("parameter", sqlParameter);
		}
		return map;
	}
	
	//删除表体中删除的数据
	public void delChildByPId(List<FilterFactor> filterFactors,String filterid) throws DAOException {
		if (filterFactors != null && filterFactors.size() > 0) {
			SQLParameter sqlparam = new SQLParameter();
			for (FilterFactor factor : filterFactors) {
				sqlparam.addParam(factor.getId());
			}
			String delsql = SQLHelper.createDeleteIn("filter_factor", "id",
					filterFactors.size());
			StringBuilder delsql_=new StringBuilder(delsql.replace("in", "NOT IN"));
			delsql_.append(" and filterid= "+"'"+filterid+"'");
			metadataDAO.update(delsql_.toString(), sqlparam);
		}
	}
	
}
