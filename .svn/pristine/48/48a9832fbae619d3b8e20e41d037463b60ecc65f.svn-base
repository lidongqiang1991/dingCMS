package com.yonyou.iuap.system.repository;

import java.util.ArrayList;
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

import com.alibaba.druid.util.StringUtils;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.jdbc.framework.util.FastBeanHelper;
import com.yonyou.iuap.persistence.jdbc.framework.util.SQLHelper;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;
import com.yonyou.iuap.system.entity.FunregisterVO;
import com.yonyou.iuap.system.entity.SysUser;
import com.yonyou.iuap.system.entity.SysroleVo;

@Repository
public class FunRegisterDao {
	
	@Autowired
	private MetadataDAO metadataDAO;
	
	public List<FunregisterVO> getSuper(){
		String sql = "select * from sys_funregister where parentid is null or parentid = '' order by funcode asc";
		return metadataDAO.queryByClause(FunregisterVO.class, sql);
	}
	public List<FunregisterVO> getAll(){
		String sql = "select * from sys_funregister order by funcode asc";
		return metadataDAO.queryAll(FunregisterVO.class);
	}
	@Transactional
    public FunregisterVO save(FunregisterVO entity) {
    	if(entity.getId() ==null ){
    		entity.setStatus(VOStatus.NEW);
    		 entity.setId(UUID.randomUUID().toString());
             entity.setCreatedate(new Date());
             entity.setDr(0);// 未删除标识
    	}else{
    		entity.setStatus(VOStatus.UPDATED);
    	}
    	metadataDAO.save(entity);
    	return entity ;
    }
	
	public void delete(List<FunregisterVO> list){
		metadataDAO.remove(list);
	}

	public Page<FunregisterVO> selectAllByPage(PageRequest pageRequest,
			Map<String, Object> searchParams) {
		String sql = "select * from sys_funregister ";
		StringBuilder sb = new StringBuilder();
		sb.append( sql );
		SQLParameter sqlparam = new SQLParameter();
		if(null != searchParams && !searchParams.isEmpty()){
			sb.append(" where ");
			for(Map.Entry<String, Object> entry : searchParams.entrySet()){
				if(entry.getKey().equals("searchParam")){
					sb.append(" ( funcode like ? or funname like ? ) and ");
					sqlparam.addParam("%"+entry.getValue()+"%");
					sqlparam.addParam("%"+entry.getValue()+"%");
				}else{
					sb.append( FastBeanHelper.getColumn(FunregisterVO.class, entry.getKey()));
					sb.append(" = ? and ");
					String value = (String) entry.getValue();
					String[] ids = value.split(",");
					sqlparam.addParam( ids[0] );
				}
			}
			sb.delete(sb.length()-4, sb.length());
			sb.append("order by funcode asc");
		}
		return metadataDAO.queryPage(sb.toString(), sqlparam, pageRequest, FunregisterVO.class);
	   }
	

    public Object getUserFuns(){
    	SysUser user= (SysUser)InvocationInfoProxy.getExtendAttribute("currentUser");
       	//增加权限数据
       	SysroleVo role = metadataDAO.queryByPK(SysroleVo.class, user.getLevelid());
       	List<FunregisterVO> funParentList = new ArrayList<FunregisterVO>();
		List<FunregisterVO> funChildList = new ArrayList<FunregisterVO>();
       	StringBuilder sb = new StringBuilder();
       	sb.append("SELECT * FROM sys_funregister ");
       	if(role!=null){
       		String fun = role.getFuns();
       		String[] funs = fun.split(",");
       		SQLParameter sqlparam = new SQLParameter();
       		sb.append(" where parentid is null and ");
       		sb.append(SQLHelper.createInPart(funs.length, "id"));
       		sb.append(" order by funcode ");
       		for(int i=0;i<funs.length;i++){       			
       			sqlparam.addParam(funs[i]);
       		}
       		funParentList = metadataDAO.queryByClause(FunregisterVO.class, sb.toString(), sqlparam);
       		for(int a=0;a<funParentList.size();a++){
       			StringBuilder childSql = new StringBuilder();
       			childSql.append("SELECT * FROM sys_funregister where parentid = '"+funParentList.get(a).getId()+"' and ");
       			childSql.append(SQLHelper.createInPart(funs.length, "id"));
       			childSql.append(" order by funcode ");
       			funChildList = metadataDAO.queryByClause(FunregisterVO.class, childSql.toString(), sqlparam);
       			funParentList.get(a).setFunChild(funChildList);
       		}
       		return funParentList;
       	}else if(user.getLoginname()!=null&&user.getLoginname().equals("admin")){
       		sb.append(" where parentid is null ");
       		sb.append(" order by funcode ");
       		funParentList = metadataDAO.queryByClause(FunregisterVO.class, sb.toString());
       		for(int i=0;i<funParentList.size();i++){
       			funChildList = metadataDAO.queryByClause(FunregisterVO.class, "SELECT * FROM sys_funregister where parentid = '"+funParentList.get(i).getId()+"' order by funcode");
       			funParentList.get(i).setFunChild(funChildList);
       		}
       		return funParentList;
       	}else{
       		return funParentList;
       	}
//       	if(role!=null){       		
//       		String fun = role.getFuns();
//       		String[] funs = fun.split(",");
//       		List<FunregisterVO> funParentList = new ArrayList<FunregisterVO>();
//       		List<FunregisterVO> funChildList = new ArrayList<FunregisterVO>();
//       		SQLParameter sqlparam = new SQLParameter();
//       		StringBuilder sb = new StringBuilder();
//       		sb.append("SELECT * FROM sys_funregister where parentid is null and ");
//       		sb.append(SQLHelper.createInPart(funs.length, "id"));
//       		for (int i = 0; i < funs.length; i++) {
//       			FunregisterVO funvo = metadataDAO.queryByPK(FunregisterVO.class, funs[i]);
//       			if(!StringUtils.isEmpty(funvo.getParentid())){       				
//       				funChildList.add(funvo);
//       			}else{
//       				funParentList.add(funvo);
//       			}
//       		}
//       		//将子集放入父集
//       		for(int i=0;i<funParentList.size();i++){
//       			FunregisterVO funParent = funParentList.get(i);
//       			List<FunregisterVO> funChild = new ArrayList<FunregisterVO>();
//       			for(int a=0;a<funChildList.size();a++){
//       				if((funChildList.get(a).getParentid()).equals(funParent.getId())){
//       					funChild.add(funChildList.get(a));
//       				}else{
//       					continue;
//       				}
//       			}
//       			funParent.setFunChild(funChild);
//       			funList.add(funParent);
//       		}
//       		return funList;
//       	}
    }
	
}
