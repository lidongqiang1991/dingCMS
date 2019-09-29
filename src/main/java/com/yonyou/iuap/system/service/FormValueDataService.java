package com.yonyou.iuap.system.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yonyou.iuap.system.entity.FormValue;
import com.yonyou.iuap.system.entity.Formb;
import com.yonyou.iuap.system.repository.FormValueDataDao;


@Service
public class FormValueDataService {

	@Autowired
	private FormValueDataDao dao;

	/**
	 * 查询完整表单信息
	 * @param sid
	 * @param formid
	 * @return
	 */
	public List<Map> formvalueall(String sid, String formid) {
//		Map<String,String> map=new HashMap<String,String>();
//		List<Formb> formbs= dao.getForm(formid);
//		List<FormValue> formvalues= dao.select(sid, formid);
//		for(FormValue fv:formvalues){
//			for(Formb fb:formbs){
//				if(fv.getFormbid()!=null&&fv.getFormbid().equals(fb.getFormbid())){
//					map.put(fb.getAttribute(), fv.getValue());
//					break;
//				}
//			}
//		}
//		return map;
		return dao.select1( sid,  formid);
	}
	
	
	
	
	/**
	 * 查询单个表单信息
	 * @param sid
	 * @param formid
	 * @param attribute
	 * @return
	 */
	public FormValue formvalueone(String sid, String formid,String attribute) {
		String formbid = dao.getFormid(formid, attribute);
		return dao.selectByPK(sid, formid, formbid);
	}

	/**
	 * 保存单个字段
	 * @param sid
	 * @param formid
	 * @param attribute
	 * @param value
	 */
	public void save(String sid, String formid, String attribute, String value) {
		String formbid = dao.getFormid(formid, attribute);
		FormValue f = dao.selectByPK(sid, formid, formbid);
		if (f != null) {
			f.setValue(value);
		} else {
			f=new FormValue();
			f.setValue(value);
			f.setFormbid(formbid);
			f.setFormid(formid);
			f.setSid(sid);
		}
		dao.save(f);
	}

}
