/**
 用户操作dao层
 */
package com.yonyou.iuap.system.repository;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.druid.util.StringUtils;
import com.ding.cms.entity.Agent;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.iweb.exception.ValidException;
import com.yonyou.iuap.persistence.bs.dao.DAOException;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.jdbc.framework.util.FastBeanHelper;
import com.yonyou.iuap.persistence.jdbc.framework.util.SQLHelper;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;
import com.yonyou.iuap.persistence.vo.pub.util.StringUtil;
import com.yonyou.iuap.system.entity.Org;
import com.yonyou.iuap.system.entity.SysUser;
import com.yonyou.iuap.system.entity.SysUserJob;
import com.yonyou.iuap.system.entity.SysroleVo;
import com.yonyou.iuap.system.service.PhoneCheckService;

@Repository
public class SysUserDao {

    @Autowired
    private MetadataDAO metadataDAO;
    
    @Autowired
    private PhoneCheckService phoneCheckService;
    
    
    @Transactional
    public SysUser save(SysUser entity) {
    	if(!StringUtils.isEmpty(entity.getLevelid())){
    		SysroleVo role=metadataDAO.queryByPK(SysroleVo.class, entity.getLevelid());
    		entity.setLevelname(role.getRolename());
    	}
    	if(entity.getId() ==null ){
    		Map map=phoneCheckService.checkPhone(entity.getUsermobile());
            if(map!=null && !map.isEmpty()){
            	throw new ValidException("存在重复手机号");
            }
    		entity.setStatus(VOStatus.NEW);
    		 entity.setId(UUID.randomUUID().toString());
             entity.setCreatorid(InvocationInfoProxy.getUserid());
             entity.setCreator(InvocationInfoProxy.getUsername());
             entity.setStatusid("1");
             entity.setCreatetime(new Date());
             entity.setDr(0);// 未删除标识
    	}else{
    		Map map=phoneCheckService.checkPhone(entity.getUsermobile(),entity.getId());
            if(map!=null && !map.isEmpty()){
            	throw new ValidException("存在重复手机号");
            }
    		entity.setStatus(VOStatus.UPDATED);
    	}
    	metadataDAO.save(entity);
//    	if(entity.getIdSysUserJob()!=null && entity.getIdSysUserJob().size()>0){
//    		for(SysUserJob job : entity.getIdSysUserJob() ){
//    			if(job.getId() == null ){
//    				job.setStatus(VOStatus.NEW);
//    				job.setUserid(entity.getId());
//    				job.setUsername(entity.getUsername() );
//    				job.setCreatorid(entity.getCreatorid() );
//    				job.setCreator(entity.getCreator());
//    				job.setCreatetime( new Date() );
//    				job.setDr(entity.getDr());
//    			}else{
//    				job.setStatus(VOStatus.UPDATED);
//    				job.setModifier(entity.getUsername());
//    				job.setModifytime(new Date());
//    				job.setModifierid(entity.getId());
//    			}
//    		}
//    		metadataDAO.save(entity, entity.getIdSysUserJob().toArray(new SysUserJob[entity.getIdSysUserJob().size()]));
//    	}else{
//    		metadataDAO.save(entity);
//    	}
    	return entity ;
    }
    

    public Page<SysUser> selectAllByPage(PageRequest pageRequest, Map<String, Object> searchParams) throws DAOException {
    	 String sql = " select sys_user.* from sys_user "; // left join org on sys_user.org_id=org.org_id 
    	 StringBuilder sb = new StringBuilder();
    	 sb.append( sql );
    	 SQLParameter sqlparam = new SQLParameter();
    	 if (null != searchParams && !searchParams.isEmpty()) {  
    		 sb.append(" where ") ;
//    		 if( !StringUtil.isEmpty(String.valueOf(searchParams.get("orgname")) )   ){
//    			 sb.append(" left join org on sys_user.org_id=org.org_id where ") ;
//    		 }else{
//    			 sb.append(" where ") ; 
//    		 }
    		 for(Map.Entry<String, Object> entry : searchParams.entrySet() ){
    			 if( entry.getKey().equals("orgname") ){ //orgname为参照表里面的字段
    				 sb.append( FastBeanHelper.getTableName(Org.class) );
    				 sb.append(".");
    				 sb.append( FastBeanHelper.getColumn(Org.class, entry.getKey() ) );
    				 sb.append(" like ? AND " );
    				 sqlparam.addParam("%" + entry.getValue() + "%");
    			 }
    			 else if (entry.getKey().equalsIgnoreCase("orgid")) {
    		          sb.append(FastBeanHelper.getColumn(SysUser.class, entry.getKey()));
    		          sb.append(" in (");
    		          String value = (String) entry.getValue();
    		          String[] ids = value.split(",");
    		          for (String s : ids) {
    		        	  sb.append("? ,");
    		            sqlparam.addParam(s);
    		          }
    		          sb.deleteCharAt(sb.toString().length() - 1);
    		          sb.append(") AND ");
    		        }
    			 
    			 else if(entry.getKey().equalsIgnoreCase("searchParam")){
    				 sb.append(" (user_name like ? OR user_code like ? OR user_mobile like ? OR org_name like ? ) AND ");
    		        	for (int i = 0; i < 4; i++) {
    		            sqlparam.addParam("%" + entry.getValue() + "%");
    		          }
    			 }
    			 else if (entry.getKey().equalsIgnoreCase("org")) {
    				 sb.append(FastBeanHelper.getColumn(SysUser.class, "orgid"));
    				 sb.append(" =? and ");
    				 sqlparam.addParam(entry.getValue());
    			 }
    			 
    			 else if (entry.getKey().equalsIgnoreCase("type")) {
    				 
    			 }else if(entry.getKey().equals("statusid")){
    				 sb.append(" status_id = ? and ");
    				 sqlparam.addParam(entry.getValue());
    			 }
    		 }
    		 sb.delete(sb.length()-4, sb.length());
    		 sql=sb.toString();
//    		 sql = sb.toString().substring( 0, sb.toString().length() - 4).replaceAll(",)", ")") ;
    	 }
    	 return metadataDAO.queryPage(sql, sqlparam, pageRequest, SysUser.class);
    }


    public void batchDelete(List<SysUser> list) throws DAOException {
        metadataDAO.remove(list);
    }
    
    public void batchDelChild(List<SysUser> list) throws DAOException {
        SQLParameter sqlparam = new SQLParameter();
        String deleteSQL = SQLHelper.createDeleteIn("sys_user_job", "fk_id_sys_user_job", list.size());
        for (SysUser user : list) {
            sqlparam.addParam(user.getId());
        }
        metadataDAO.update(deleteSQL, sqlparam);
    }
    
    public SysUser findByUserId(String id) throws DAOException {

        String sql = "SELECT * FROM sys_user where id=?";
        SQLParameter sqlparam = new SQLParameter();
        sqlparam.addParam(id);
        return  metadataDAO.queryByPK(SysUser.class, id);
    }
    public List<SysUser> findByUserCode(String code) throws DAOException {

        String sql = "SELECT * FROM sys_user where user_code=?";
        SQLParameter sqlparam = new SQLParameter();
        sqlparam.addParam(code);
        return  metadataDAO.queryByClause(SysUser.class, sql, sqlparam);
//        return sys == null || sys.isEmpty() ? null : sys.get(0);
    }
    
    public List<SysUser> findUserForAdd(String code,String mobile,String email) throws DAOException {
        String sql = "SELECT * FROM sys_user where user_code=? or user_mobile=? or user_email=?";
        SQLParameter sqlparam = new SQLParameter();
        sqlparam.addParam(code);
        sqlparam.addParam(mobile);
        sqlparam.addParam(email);
        return  metadataDAO.queryByClause(SysUser.class, sql, sqlparam);
    }
    
    public List<SysUser> findByUserCode(String code, String id) {
        String sql = " SELECT * FROM sys_user where user_code=? AND id !=?";
        SQLParameter sqlparam = new SQLParameter();
        sqlparam.addParam(code);
        sqlparam.addParam(id);
        return  metadataDAO.queryByClause(SysUser.class, sql, sqlparam);
    }
    
    public List<SysUser> findUserForEdit(String code,String mobile,String email, String id) {
        String sql = " SELECT * FROM sys_user where ( user_code=? or user_mobile=? or user_email=? ) AND id !=?";
        SQLParameter sqlparam = new SQLParameter();
        sqlparam.addParam(code);
        sqlparam.addParam(mobile);
        sqlparam.addParam(email);
        sqlparam.addParam(id);
        return  metadataDAO.queryByClause(SysUser.class, sql, sqlparam);
    }
    
    public List<Org> findAllOrg() {
        return metadataDAO.queryAll(Org.class);
    }
    public SysUser findByLoginCode(String loginCode) throws DAOException {
        String sql = "SELECT * FROM sys_user where user_code=? or login_name=? or user_mobile=?";
        SQLParameter sqlparam = new SQLParameter();
        sqlparam.addParam(loginCode);
        sqlparam.addParam(loginCode);
        sqlparam.addParam(loginCode);
        List<SysUser> users=metadataDAO.queryByClause(SysUser.class, sql, sqlparam);
        SysUser u=null;
        if(users!=null&&users.size()>0)u=users.get(0);
        return  u;
    }
    
    public List<SysUser> findUserByAgent(String agentid){
    	String sql = "select * from sys_user where org_id = '"+agentid+"'";
    	List<SysUser> users = metadataDAO.queryByClause(SysUser.class, sql);
    	return users;
    }
    
    public SysUser getUserInfo(){
    	SysUser user= (SysUser)InvocationInfoProxy.getExtendAttribute("currentUser");
    	//补充agentID
        if(!StringUtils.isEmpty(user.getOrgid())){
        	Agent agent = metadataDAO.queryByPK(Agent.class,user.getOrgid() );
            if(agent!=null){
            	
            }else{
            	user.setOrgid("");
            }
        }else{
        	user.setOrgid("");
        }
        return user;
    }
    
}
