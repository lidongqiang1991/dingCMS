package com.yonyou.iuap.system.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ding.cms.util.DateUtils;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.jdbc.framework.processor.MapListProcessor;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;
import com.yonyou.iuap.system.entity.FormValue;
import com.yonyou.iuap.system.entity.Formb;
import com.yonyou.iuap.system.entity.SysUser;

@Repository
public class FormValueDataDao {

	@Autowired
	private MetadataDAO metaDao;

	/**
	 *  保存字段
	 * @param list
	 */
	public void save(List<FormValue> list) {
		SysUser user = (SysUser) InvocationInfoProxy
				.getExtendAttribute("currentUser");

		for (FormValue formvaluedata : list) {
			if (formvaluedata.getId() == null) {
				formvaluedata.setStatus(VOStatus.NEW);
				formvaluedata.setCreatetime(DateUtils
						.currentTimestampToString());
				formvaluedata.setCreator(user.getUsername());
				formvaluedata.setCreatorid(user.getId());
				formvaluedata.setOrgid(user.getOrgid());
				formvaluedata.setOrgname(user.getOrgname());
				formvaluedata.setDr(0);// 未删除标识
			} else {
				formvaluedata.setStatus(VOStatus.UPDATED);
			}
			metaDao.save(formvaluedata);
		}
	}

	/**
	 * 保存字段
	 * @param formvaluedata
	 */
	public void save(FormValue formvaluedata) {
		SysUser user = (SysUser) InvocationInfoProxy
				.getExtendAttribute("currentUser");

		if (formvaluedata.getId() == null) {
			formvaluedata.setStatus(VOStatus.NEW);
			formvaluedata.setCreatetime(DateUtils.currentTimestampToString());
			if (user!=null) {
				formvaluedata.setCreator(user.getUsername());
				formvaluedata.setCreatorid(user.getId());
				formvaluedata.setOrgid(user.getOrgid());
				formvaluedata.setOrgname(user.getOrgname());
			}
		} else {
			formvaluedata.setStatus(VOStatus.UPDATED);
		}
		metaDao.save(formvaluedata);
	}

	/**
	 * 查询单个字段
	 * @param sid
	 * @param formid
	 * @param formbid
	 * @return
	 */
	public FormValue selectByPK(String sid, String formid, String formbid) {
		FormValue formvaluedata=null;
		SQLParameter sqlparam = new SQLParameter();
		String sql = "select * from sys_form_value where sid= ? and formid= ? and formbid=?";
		sqlparam.addParam(sid);
		sqlparam.addParam(formid);
		sqlparam.addParam(formbid);
//		List<FormValue> list22=metaDao.queryByClause(FormValue.class, sql);
		List<FormValue> list= metaDao.queryByClause(FormValue.class, sql,sqlparam);
		if (list != null && list.size() > 0)formvaluedata=list.get(0);
		return formvaluedata;
	}

	/**
	 * 查询字段
	 * @param sid
	 * @param formid
	 * @return
	 */
	public List<FormValue> select(String sid, String formid) {
		
		SQLParameter sqlparam = new SQLParameter();
		String sql = "select * from sys_form_value where sid= ? and formid= ?";
		sqlparam.addParam(sid);
		sqlparam.addParam(formid);
		return metaDao.queryByClause(FormValue.class, sql,sqlparam);
	}
	/**
	 * 查询字段
	 * @param sid
	 * @param formid
	 * @return
	 */
	public List<Map> select1(String sid, String formid) {
		Map<String, String> rMap=new HashMap<String, String>();
		String sql = "select fb.type,fb.displayname,fb.attribute,v.value from sys_form_value v "
					  +" left join sys_form_b fb on v.formbid=fb.formbid"
					   +" where v.formid='"+formid+"' and sid='"+sid+"'";
		Object or=metaDao.queryForObject(sql, new MapListProcessor());
		List<Map> result = new ArrayList<Map>();
		if(or!=null){
			result =(List<Map>)or;
//			for (int i = 0; i < result.size(); i++) {
//				Map m=result.get(i);
//				String k=(String)m.get("attribute");
//				String v=(String)m.get("value");
//				rMap.put(k, v);
//			}
		}
		
		return result;
	}
	

	/**
	 *  获取formid字段
	 * @param formid
	 * @param attribute
	 * @return
	 */
	public String getFormid(String formid, String attribute) {
		String formbid = null;
		SQLParameter sqlparam = new SQLParameter();
		String sql = "select * from sys_form_b where formid= ? and attribute= ?";
		sqlparam.addParam(formid);
		sqlparam.addParam(attribute);
		List<Formb> list = metaDao.queryByClause(Formb.class, sql,sqlparam);
		if (list != null && list.size() > 0)
			formbid=list.get(0).getFormbid();
		return formbid;
	}
	
	/**
	 *  获取form字段Key
	 * @param formid
	 * @return
	 */
	public List<Formb> getForm(String formid) {
		SQLParameter sqlparam = new SQLParameter();
		String sql = "select * from sys_form_b where formid= ? ";
		sqlparam.addParam(formid);
		return metaDao.queryByClause(Formb.class, sql,sqlparam);
	}

}
