package com.yonyou.iuap.system.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yonyou.iuap.persistence.bs.dao.DAOException;
import com.yonyou.iuap.system.entity.Form;
import com.yonyou.iuap.system.entity.SysUser;
import com.yonyou.iuap.system.repository.FormDao;
import com.yonyou.iuap.system.validator.FormValidator;

@Service
public class FormService {

	@Autowired
	private FormDao dao;
	
	public Form queryByPk(String formid){
		Form form=dao.findById(formid);
		form.setId_formb(dao.findChildById(formid));
		return form;
	}
	 @Transactional
	public Form save(Form form){
		return dao.save(form);
	}
	
	
	 public void delById(String formid){
		 Form form=dao.findById(formid);
		 List<Form> list=new ArrayList<Form>();
		 list.add(form);
		 batchDeleteEntity(list);
	 }
	 
    /**
     * 批量删除数据
     * @param list
     */
    @Transactional
    public void batchDeleteEntity(List<Form> list) {
        this.batchDelChild(list);
        dao.batchDelete(list);
    }

    /**
     * 删除主表下面的子表数据
     * 
     * @param list
     * @throws DAOException
     */
    private void batchDelChild(List<Form> list) throws DAOException {
        dao.batchDelChild(list);
    }	 
	
    /**
     * 根据传递的参数，进行分页查询
     */
    public Page<Form> selectAllByPage(Map<String, Object> searchParams, PageRequest pageRequest) {
    	Page<Form> pageResult = dao.selectAllByPage(pageRequest, searchParams) ;
        return pageResult;
    }
    
    /**
     * 根据传递的参数，进行分页查询
     */
    public List<Form> selectAllByPage() {
    	List<Form> pageResult = dao.getList() ;
        return pageResult;
    }
    /**
     * 根据编码查询
     * @param code
     * @return
     */
    public List<Form> findByFormcode(String code) {
    	 return dao.findByFormcode(code ) ;
    }
}
