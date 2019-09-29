package com.yonyou.iuap.system.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import com.ding.cms.util.DateUtils;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.persistence.bs.dao.DAOException;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.jdbc.framework.util.SQLHelper;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;
import com.yonyou.iuap.system.entity.Form;
import com.yonyou.iuap.system.entity.Procedure;
import com.yonyou.iuap.system.entity.Procedurebody;
import com.yonyou.iuap.system.entity.SysUser;

@Repository
public class ProcedureDao {
	
	@Autowired
	private MetadataDAO metaDao;
	
	/**
	 * 根据主键查询流程(主表)
	 * @param procedureid
	 * @return
	 */
	public Procedure findById(String procedureid){
		return metaDao.queryByPK(Procedure.class, procedureid);
	}
	
	/**
	 * 根据流程id，查询流程细项(子表)，返回list
	 */
	public List<Procedurebody> findChildById (String procedureid) {
		return metaDao.queryByClause(Procedurebody.class,"select * from sys_procedure_b where dr=0 and  procedureid='"+procedureid+"' order by type,itemorder ");
	}
	
	/**
	 * 保存流程(主表)，版本暂定为手输入；？？？还有点问题？2018-10-22 上午10点
	 * @param procedure
	 * @return
	 */
	public Procedure save(Procedure procedure){
		SysUser u=(SysUser)InvocationInfoProxy.getExtendAttribute("currentUser");
		//add
		if(StringUtils.isEmpty(procedure.getProcedureid())){
			procedure.setStatus(VOStatus.NEW);
			procedure.setProcedureid(UUID.randomUUID().toString());
			procedure.setOrgid(u.getOrgid());
			procedure.setOrgname(u.getOrgname());
			procedure.setCreator(u.getUsername());
			procedure.setCreatorid(u.getId());
			procedure.setCreatetime(DateUtils.currentTimestampToString());
			setProcedureBodyFun(VOStatus.NEW,procedure);
		}
		/**
		 * 留给后序，先将条件 置为false；版本控制
		 */
		else if(false){
			procedure.setStatus(VOStatus.NEW);
			procedure.setProcedureid(UUID.randomUUID().toString());
			procedure.setModifier(u.getUsername());
			procedure.setModifierid(u.getId());
			procedure.setModifytime(DateUtils.currentTimestampToString());
		}
		/**
		 * 条件后面暂时跟个true，用于表示版本未改变，后续  改为判断条件
		 */
		else if(!StringUtils.isEmpty(procedure.getProcedureid())&&true){
			procedure.setStatus(VOStatus.UPDATED);
			procedure.setModifier(u.getUsername());
			procedure.setModifierid(u.getId());
			procedure.setModifytime(DateUtils.currentTimestampToString());
			setProcedureBodyFun(VOStatus.UPDATED,procedure);
		}
		return procedure;
	}
	
	/**
	 * 模糊搜索;获取所有的流程（主表）
	 * @param request
	 * @param searchParams
	 * @return
	 */
	public Page<Procedure> selectAllByPage (PageRequest request,Map<String, Object> searchParams){
		StringBuilder sb=new StringBuilder();
		sb.append(" select * from sys_procedure ");
		SQLParameter params=new SQLParameter();
		if(searchParams!=null&&!searchParams.isEmpty()){
			sb.append(" where ");
			for(Map.Entry<String, Object> entry : searchParams.entrySet()){
				String key=entry.getKey();
				String value=(String)entry.getValue();
				if(key.equals("searchParam")){
					sb.append(" (procedurename like ? or procedurecode like ?) and ");
					params.addParam("%"+value+"%");
					params.addParam("%"+value+"%");
				}
			}
			sb.delete(sb.length()-4, sb.length());
		}
		return metaDao.queryPage(sb.toString(), params, request, Procedure.class);
	}
	
	/**
	 * 获取流程细项，通过 itemname 模糊匹配；或者通过 procedureid 获取；
	 * @param request
	 * @param searchParams
	 * @return
	 */
	public Page<Procedurebody> selectAllBodyByPage(PageRequest request,Map<String, String> searchParams){
		StringBuilder sb=new StringBuilder();
		sb.append(" select * from sys_procedure_b where dr=0 and ");
		SQLParameter params=new SQLParameter();
		if(searchParams!=null&&searchParams.isEmpty()){
			for(Map.Entry<String, String> entry : searchParams.entrySet()){
				String key=entry.getKey();
				String value=(String)entry.getValue();
				if(key.equals("searchParam")){
					sb.append(" itemname like ?  and ");
					params.addParam("%"+value+"%");
				}
				else if (key.equals("procedureid")){
					sb.append(" procedureid = ? and ");
					params.addParam(value);
				}
			}
			sb.append(" order by type,itemorder ");
		}
		return metaDao.queryPage(sb.toString(), params, request, Procedurebody.class);
	}
	
	/**
	 * 批量删除 流程（主表）；
	 * @param list
	 * @throws DAOException
	 */
	public void batchDelete(List<Procedure> list) throws DAOException {
    	metaDao.remove(list);
    }
	
	/**
	 * 批量删除 流程细项（子表）；
	 * @param list
	 * @throws DAOException
	 */
	public void batchDelChild(List<Procedure> list) throws DAOException {
        SQLParameter sqlparam = new SQLParameter();
        String deleteSQL = SQLHelper.createDeleteIn("sys_procedure_b", "fk_id_procedurebody", list.size());
        for (Procedure pro : list) {
            sqlparam.addParam(pro.getProcedureid());
        }
        metaDao.update(deleteSQL, sqlparam);
    }
	
	/**
	 * 私有方法，用于处理流程的细项，
	 * 因为修改和新增都会调用，重复代码，所以单独提出来
	 * @param status
	 * @param procedure
	 */
	private void setProcedureBodyFun(Integer status,Procedure procedure){
		//在新的流程（主表），只能添加 细项 或者删除 细项；
		if(procedure.getId_procedurebody()!=null&&procedure.getId_procedurebody().size()>0){
			List<String> bodyIds = new ArrayList<String>();
			for( Procedurebody body : procedure.getId_procedurebody() ){
				if(status == VOStatus.NEW||(status == VOStatus.UPDATED&&StringUtils.isEmpty(body.getProcedurebid()))){
					body.setStatus(VOStatus.NEW);
					String id = UUID.randomUUID().toString();
					body.setProcedurebid(id);
					bodyIds.add(id);
				}
				else{
					body.setStatus(VOStatus.UPDATED);
					bodyIds.add(body.getProcedurebid());
				}
				body.setFormname(metaDao.queryByPK(Form.class, body.getFormid()).getFormname());
				body.setProcedureid(procedure.getProcedureid());
				body.setFk_id_procedurebody(procedure.getProcedureid());
			}
			String s = SQLHelper.createDeleteIn("sys_procedure_b", "procedurebid", bodyIds.size());
			StringBuilder sqlDel = new StringBuilder(s);
			sqlDel.replace(sqlDel.lastIndexOf("in"),sqlDel.lastIndexOf("in")+2, " not in ");
			sqlDel.append(" and procedureid='"+procedure.getProcedureid()+"' ");
			SQLParameter sqlparam = new SQLParameter();
			for(String id : bodyIds){
				sqlparam.addParam(id);
			}
			metaDao.update(sqlDel.toString(), sqlparam);
			metaDao.save(procedure, procedure.getId_procedurebody().toArray(new Procedurebody[procedure.getId_procedurebody().size()]));
		}
		else{
			metaDao.save(procedure);
		}
	}


    public List<Procedure> getList(){
        String sql = "select * from sys_procedure where dr=0";
        return metaDao.queryByClause(Procedure.class, sql);
    }
}











