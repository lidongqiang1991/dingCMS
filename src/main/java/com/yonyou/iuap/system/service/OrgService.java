package com.yonyou.iuap.system.service;

import java.util.*;
import java.util.Map.Entry;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.druid.util.StringUtils;
import com.ding.cms.entity.Agent;
import com.ding.cms.entity.LogOrderNote;
import com.ding.cms.repository.AgentDao;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.mvc.type.SearchParams;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.jdbc.framework.util.FastBeanHelper;
import com.yonyou.iuap.system.entity.Org;
import com.yonyou.iuap.system.entity.SysUser;
import com.yonyou.iuap.system.repository.SysOrgDao;

@Service
public class OrgService {

	@Qualifier("mdBaseDAO")
	@Autowired
	private MetadataDAO metadataDAO;
	
	@Autowired
	private SysOrgDao orgDao;
	
    /**
     * 
     * 得到组织信息
     */
    public Org getOrgByPK(String orgid) {
    	 return metadataDAO.queryByPK(Org.class, orgid);
    }
    public List<Org> findByFid(String pk) {
    	 String sql = "select * from org where parent_id=?";
         SQLParameter sqlparam = new SQLParameter();
         sqlparam.addParam(pk);
         List<Org> list = metadataDAO.queryByClause(Org.class, sql, sqlparam);
         return list;
    }
    public List<Org> findByCode(String code) {
    	String sql = "select * from org  where org_code=?";
        SQLParameter sqlparam = new SQLParameter();
        sqlparam.addParam(code);
        List<Org> list = metadataDAO.queryByClause(Org.class, sql, sqlparam);
        return list;
    }
    /**
     * 查询组织分页数据
     * 
     * @param pageRequest
     * @param searchParams
     * @return
     */
    public Page<Org> selectAllByPage(PageRequest pageRequest, SearchParams searchParams) {
    	StringBuilder sql = new StringBuilder("select * from org");
        SQLParameter sqlparam = new SQLParameter();
        Map<String, Object> searchParamsMap=searchParams.getSearchMap();
        if (null != searchParamsMap && !searchParamsMap.isEmpty()) {
            sql.append(" where ");
            for (Entry<String, Object>  key : searchParamsMap.entrySet()) {
            	sql.append(FastBeanHelper.getColumn(Org.class,key.getKey()));
            	sql.append(" like ? AND ");
                sqlparam.addParam("%" + key.getValue() + "%");
            }
            sql.delete(sql.length() - 4, sql.length());
        }
        return metadataDAO.queryPage(sql.toString(), sqlparam, pageRequest, Org.class);
    }

    /**
     * 查询所有组织
     * 
     * @return
     */
    public List<Org> selectAll() {
    	//return metadataDAO.queryAll(Org.class);
		SysUser user=(SysUser)InvocationInfoProxy.getExtendAttribute("currentUser");
		if(StringUtils.isEmpty(user.getOrgid())){
			return metadataDAO.queryAll(Org.class);
		}else{
			Org org= getOrgByPK(user.getOrgid());
	    	List<Org> allBodys=queryAllBodyByFid(org.getOrgid(), null);
	    	allBodys.add(org);
	    	return allBodys;
		}
		
    }
    
    
    private List<Org> queryAllBodyByFid(String fid,List<Org> body){
    	if(body==null) body=new ArrayList<Org>();
        List<Org> list = findByFid(fid);
        if(list!=null&&list.size()>0){
        	body.addAll(list);
        	for (int i = 0; i < list.size(); i++) {
        		queryAllBodyByFid(list.get(i).getOrgid(), body);
			}
        }
        return body;
    }

    /**
     * 保存组织
     * 
     * @param recordList
     */
    @Transactional
    public void save(List<Org> recordList) {
        List<Org> addList = new ArrayList<>(recordList.size());
        List<Org> updateList = new ArrayList<>(recordList.size());
        for (Org org : recordList) {

            if (org.getOrgid() == null) {
            	org.setOrgid(UUID.randomUUID().toString());
            	org.setDr(0);
                addList.add(org);
            } else {
                updateList.add(org);
            }
        }
        if (CollectionUtils.isNotEmpty(addList)) {
        	metadataDAO.insert(addList);
        }
        if (CollectionUtils.isNotEmpty(updateList)) {
        	metadataDAO.update(updateList);
        }
    }

    /**
     * 删除组织
     * 
     * @param list
     */
    public void batchDeleteByPrimaryKey(List<Org> list) {
    	 metadataDAO.remove(list);
    }


    /**
     *
     * @param clz 包含agentid的类
     * @param id orgId 组织id
     * @return
     */
    public String getTrueDataName(Class<?> clz,String id,String pro){
        StringBuilder sql_=new StringBuilder();
        List<Org> orgs= findByFid(id);
        String  key = FastBeanHelper.getColumn(clz, "agentid");
        if (!orgs.isEmpty()) {
            sql_.append(pro+key+" in (");
            for (Org org : orgs) {
                sql_.append("'" + org.getOrgid() + "' ,");
            }
            sql_.delete(sql_.length() - 1, sql_.length());
            sql_.append(") and ");
        }else {
            sql_.append("1=2 and ");
        }
        return sql_.toString();
    }
    /**
     * 工具
     * 获取当前登录用户的数据sql片段
     * @return
     */
	public String getTrueData(Class<?> clz) {
		StringBuilder sql_ = new StringBuilder();
		Org or= getOrgByPK(((SysUser)InvocationInfoProxy.getExtendAttribute("currentUser")).getOrgid());
		String key;
		if(or!=null){
			if(AgentDao.agentType.equals(or.getOrgtype())){
				key = FastBeanHelper.getColumn(clz, "agentid");
				sql_.append(" and "+key+" = '"+or.getOrgid()+"'");
			} else if(or.getParentid()!=null) {
				List<Org> orgs = selectAll();
				key = FastBeanHelper.getColumn(clz, "orgid");
				if(key==null||"".equals(key))key = FastBeanHelper.getColumn(clz, "agentid");
				if (!orgs.isEmpty()) {
					sql_.append(" and "+key+" in (");
					for (Org org : orgs) {
						sql_.append("'" + org.getOrgid() + "',");
					}
					sql_.delete(sql_.length() - 1, sql_.length());
					sql_.append(")");
				}
			}
		}
		return sql_.toString();
	}
    /**
     * 工具
     * 获取当前登录用户的数据sql片段
     * @return
     */
	public String getTrueData(Class<?> clz,String alias) {
		StringBuilder sql_ = new StringBuilder();
		Org or= getOrgByPK(((SysUser)InvocationInfoProxy.getExtendAttribute("currentUser")).getOrgid());
		String key;
		if(or!=null){
			if(AgentDao.agentType.equals(or.getOrgtype())){
				key = FastBeanHelper.getColumn(clz, "agentid");
				sql_.append(" and "+alias+key+" = '"+or.getOrgid()+"'");
			} else if(or.getParentid()!=null) {
				List<Org> orgs = selectAll();
				key = FastBeanHelper.getColumn(clz, "orgid");
				if(key==null||"".equals(key))key = FastBeanHelper.getColumn(clz, "agentid");
				if (!orgs.isEmpty()) {
					sql_.append(" and "+alias+key+" in (");
					for (Org org : orgs) {
						sql_.append("'" + org.getOrgid() + "',");
					}
					sql_.delete(sql_.length() - 1, sql_.length());
					sql_.append(")");
				}
			}
		}
		return sql_.toString();
	}
	
	/**
     * 获取所有org
     * @return
     */
    public List<Org> getAllOrg(){
        return orgDao.getAll();
    }
    /**
     * 获取所有orgList
     * @return
     */
    public List<Org> getList(){
        List<Org> orgs=null;
        SysUser user=(SysUser)InvocationInfoProxy.getExtendAttribute("currentUser");
        String dzmId="4958dae8-72a9-4136-9db0-b82099707ac7";
        if(StringUtils.isEmpty(user.getOrgid())||dzmId.equals(user.getOrgid())){//管理员或者顶之美
            orgs= findByFid(dzmId);
            for(Org org:orgs){
                org.setOrgs(findByFid(org.getOrgid()));
            }
        }else{
            orgs =new ArrayList();
            Org org= getOrgByPK(user.getOrgid());
            if(org.getParentid().equals(dzmId)){//运营中心或片区
                org.setOrgs(findByFid(org.getOrgid()));
                orgs.add(org);
            }else{
                 orgs.add(queryForg(org));
            }

        }
        return orgs;
    }
    //查询当前子项的前世
    private Org queryForg(Org org){
        Org forg =getOrgByPK(org.getParentid());
        if("4958dae8-72a9-4136-9db0-b82099707ac7".equals(forg.getParentid())){
            //当前为运营中心
            List<Org> orgs=new ArrayList();
            orgs.add(org);
            forg.setOrgs(orgs);
            return forg;
        }
        queryForg(forg);
        return null;
    }
}
