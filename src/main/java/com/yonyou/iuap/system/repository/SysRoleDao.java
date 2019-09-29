package com.yonyou.iuap.system.repository;

import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.yonyou.iuap.iweb.exception.ValidException;
import com.yonyou.iuap.persistence.bs.dao.DAOException;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.jdbc.framework.util.FastBeanHelper;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;
import com.yonyou.iuap.system.entity.SysUser;
import com.yonyou.iuap.system.entity.SysroleVo;

@Repository
public class SysRoleDao {
	
	@Autowired
    private MetadataDAO metadataDAO;
	
	public List<SysroleVo> getAll(){
		return metadataDAO.queryAll(SysroleVo.class);
	}
	
//	public Page<SysroleVo> selectAllByPage(PageRequest pageRequest, Map<String, Object> searchParams) throws DAOException {
//		String sql = " select * from sys_role"; 
//		StringBuilder sb = new StringBuilder();
//		sb.append( sql );
//		SQLParameter sqlparam = new SQLParameter();
//		if(searchParams.entrySet()!=null){
//			sb.append(" where ");
//			for (Entry<String, Object> key : searchParams.entrySet()) {
//				String column=FastBeanHelper.getColumn(SysroleVo.class, key.getKey());
//				sb.append(column+" like ?  and" );
//				sqlparam.addParam("%"+searchParams.get(key)+"%");
//			}
//			sb.substring(0, sb.length()-4);
//		}
//		Page<SysroleVo> page=metadataDAO.queryPage(sql, sqlparam, pageRequest, SysroleVo.class);
//		return page;
//   }
	
	public Page<SysroleVo> selectByPage(PageRequest pageRequest,
			Map<String, Object> searchParams) {
		String sql = "select * from sys_role ";
		StringBuilder sb = new StringBuilder();
		sb.append( sql );
		SQLParameter sqlparam = new SQLParameter();
		if(null != searchParams && !searchParams.isEmpty()){
			sb.append(" where ");
			for(Map.Entry<String, Object> entry : searchParams.entrySet()){
				if(entry.getKey().equals("searchParam")){
					sb.append(" ( rolecode like ? or rolename like ? ) and ");
					sqlparam.addParam("%"+entry.getValue()+"%");
					sqlparam.addParam("%"+entry.getValue()+"%");
				}else{
					sb.append( FastBeanHelper.getColumn(SysroleVo.class, entry.getKey()));
					sb.append(" = ? and ");
					String value = (String) entry.getValue();
					String[] ids = value.split(",");
					sqlparam.addParam( ids[0] );
				}
			}
			sb.delete(sb.length()-4, sb.length());
		}
		return metadataDAO.queryPage(sb.toString(), sqlparam, pageRequest, SysroleVo.class);
	   }
	
	@Transactional
    public SysroleVo save(SysroleVo entity) {
    	if(entity.getRoleid() ==null ){
    		entity.setStatus(VOStatus.NEW);
    		 entity.setRoleid(UUID.randomUUID().toString());
             entity.setCreatetime(new Date());
             entity.setDr(0);// 未删除标识
    	}else{
    		entity.setStatus(VOStatus.UPDATED);
    	}
    	metadataDAO.save(entity);
    	return entity ;
    }
	
	public void delete(List<SysroleVo> list) throws DAOException{
		checkIfuseBeforeDelete(list);
		metadataDAO.remove(list);
	}
	
	public void power(String roleid,String funs){
		SysroleVo role=metadataDAO.queryByPK(SysroleVo.class, roleid);
		role.setFuns(funs);
		metadataDAO.update(role);
	}
	
	public void update(List<SysroleVo> roles){
		metadataDAO.update(roles);
	}
	
	public List<SysroleVo> findRoleForAdd(String code , String name){
		String sql = "SELECT * FROM sys_role where rolecode=? or rolename=?";
        SQLParameter sqlparam = new SQLParameter();
        sqlparam.addParam(code);
        sqlparam.addParam(name);
		return metadataDAO.queryByClause(SysroleVo.class, sql,sqlparam);
	}
	
	public List<SysroleVo> findRoleForEdit(String code , String name , String roleid){
		String sql = "SELECT * FROM sys_role where ( rolecode=? or rolename=? ) and roleid !=? ";
        SQLParameter sqlparam = new SQLParameter();
        sqlparam.addParam(code);
        sqlparam.addParam(name);
        sqlparam.addParam(roleid);
		return metadataDAO.queryByClause(SysroleVo.class, sql,sqlparam);
	}
	
	private void checkIfuseBeforeDelete(List<SysroleVo> list){
		for(SysroleVo role : list){
			String sql = "select * from sys_user where level_name = '"+role.getRolename()+"'";
			List<SysUser> userlist = metadataDAO.queryByClause(SysUser.class, sql);
			if(userlist!=null&&userlist.size()>0){
				throw new ValidException("该角色被使用，无法删除");
			}
		}
	}
}
