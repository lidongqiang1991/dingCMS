package com.yonyou.iuap.system.repository;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import com.alibaba.druid.util.StringUtils;
import com.ding.cms.util.DateUtils;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.persistence.bs.dao.DAOException;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.jdbc.framework.util.SQLHelper;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;
import com.yonyou.iuap.system.entity.Form;
import com.yonyou.iuap.system.entity.Formb;
import com.yonyou.iuap.system.entity.SysUser;

@Repository
public class FormDao {

	@Autowired
	private MetadataDAO metaDao;

	public Form findById(String formid) {
		return metaDao.queryByPK(Form.class, formid);
	}

	public List<Formb> findChildById(String formid) {
		return metaDao.queryByClause(Formb.class,
				" select * from sys_form_b where formid='" + formid + "'");
	}

	public Form save(Form form) {
		SysUser u = (SysUser) InvocationInfoProxy
				.getExtendAttribute("currentUser");
		// add
		if (StringUtils.isEmpty(form.getFormid())) {
			form.setStatus(VOStatus.NEW);
			form.setFormid(UUID.randomUUID().toString());
			form.setOrgid(u.getOrgid());
			form.setOrgname(u.getOrgname());
			form.setCreator(u.getUsername());
			form.setCreatorid(u.getId());
			form.setCreatetime(DateUtils.currentTimestampToString());
		} else if (false) {
			// 版本控制
		} else {// edit
			form.setStatus(VOStatus.UPDATED);
			form.setModifierid(u.getId());
			form.setModifier(u.getUsername());
			form.setModifytime(DateUtils.currentTimestampToString());
			delChildByPId(form.getId_formb());
		}

		if (form.getId_formb() != null && form.getId_formb().size() > 0) {

			for (Formb body : form.getId_formb()) {
				if (body.getFormbid() != null) {
					body.setStatus(VOStatus.UPDATED);
				} else {
					body.setStatus(VOStatus.NEW);
					body.setFormbid(UUID.randomUUID().toString());
					body.setFormid(form.getFormid());
					body.setFk_id_formb(form.getFormid());
				}
			}
			metaDao.save(form,form.getId_formb().toArray(new Formb[form.getId_formb().size()]));
		} else {
			metaDao.save(form);
		}
		return form;
	}

	public Page<Form> selectAllByPage(PageRequest request,
			Map<String, Object> searchParams) {
		StringBuilder sb = new StringBuilder();
		sb.append(" select * from sys_form ");
		SQLParameter params = new SQLParameter();
		if (searchParams != null && !searchParams.isEmpty()) {
			sb.append(" where ");
			for (Map.Entry<String, Object> entry : searchParams.entrySet()) {
				String key = entry.getKey();
				String value = (String) entry.getValue();
				if (key.equals("searchParam")) {
					sb.append(" (formcode like ? or formname like ?) and ");
					params.addParam("%" + value + "%");
					params.addParam("%" + value + "%");
				}
			}

			sb.delete(sb.length() - 4, sb.length());
		}
		return metaDao.queryPage(sb.toString(), params, request, Form.class);
	}

	public Page<Formb> selectAllBodyByPage(PageRequest request,
			Map<String, String> searchParams) {
		StringBuilder sb = new StringBuilder();
		sb.append(" select * from sys_form_b ");
		SQLParameter params = new SQLParameter();
		if (searchParams != null && !searchParams.isEmpty()) {
			sb.append(" where ");
			for (Map.Entry<String, String> entry : searchParams.entrySet()) {
				String key = entry.getKey();
				String value = entry.getValue();
				if (key.equals("searchParam")) {
					sb.append(" displayname like ?  and ");
					params.addParam("%" + value + "%");
				} else if (key.equals("formid")) {
					sb.append(" formid = ? and ");
					params.addParam(value);
				}
			}
			sb.delete(sb.length() - 4, sb.length());
		}
		return metaDao.queryPage(sb.toString(), params, request, Formb.class);
	}

	public void batchDelete(List<Form> list) throws DAOException {
		metaDao.remove(list);
	}

	public void batchDelChild(List<Form> list) throws DAOException {
		SQLParameter sqlparam = new SQLParameter();
		String deleteSQL = SQLHelper.createDeleteIn("sys_form_b",
				"fk_id_formb", list.size());
		for (Form pro : list) {
			sqlparam.addParam(pro.getFormid());
		}
		metaDao.update(deleteSQL, sqlparam);
	}

	public List<Form> getList() throws DAOException {
		String sql = "select * from sys_form";
		return metaDao.queryByClause(Form.class, sql);
	}

	public void delChildByPId(List<Formb> formbs) throws DAOException {
		if (formbs != null && formbs.size() > 0) {
			SQLParameter sqlparam = new SQLParameter();
			for (Formb formb : formbs) {
				sqlparam.addParam(formb.getFormbid());
			}
			String delsql = SQLHelper.createDeleteIn("sys_form_b", "formbid",
					formbs.size());
			StringBuilder delsql_=new StringBuilder(delsql.replace("in", "NOT IN"));
			delsql_.append(" and formid= "+"'"+formbs.get(0).getFormid()+"'");
			metaDao.update(delsql_.toString(), sqlparam);
		}
	}
	/**
     * 根据编码查询
     * @param code
     * @return
     */
    public List<Form> findByFormcode(String code) throws DAOException {

        String sql = "SELECT * FROM sys_form where formcode=?";
        SQLParameter sqlparam = new SQLParameter();
        sqlparam.addParam(code);
        return  metaDao.queryByClause(Form.class, sql, sqlparam);
//        return sys == null || sys.isEmpty() ? null : sys.get(0);
    }
	

}
