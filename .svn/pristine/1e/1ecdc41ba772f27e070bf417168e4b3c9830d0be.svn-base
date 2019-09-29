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
import com.yonyou.iuap.system.entity.Procedure;
import com.yonyou.iuap.system.entity.Procedurebody;
import com.yonyou.iuap.system.repository.ProcedureDao;

@Service
public class ProcedureService {

	@Autowired
	private ProcedureDao dao;
	
	/**
	 * 根据主键查询
	 * @param procedureid
	 * @return
	 */
	public Procedure queryByPk(String procedureid){
		Procedure p=dao.findById(procedureid);
		p.setId_procedurebody(dao.findChildById(procedureid));
		return p;
	}
	/**
	 * 根据流程id，查询流程细项(子表)，返回list
	 */
	public List<Procedurebody> findChildById (String procedureid) {
		return dao.findChildById(procedureid);
	}
	//保存
	@Transactional
	public Procedure save(Procedure p){
		return dao.save(p);
	}
	
	//删除，通过 procedureid
	public void delById(String procedureid){
		Procedure p=dao.findById(procedureid);
		List<Procedure> list=new ArrayList<Procedure>();
		list.add(p);
		batchDeleteEntity(list);
	}
	 
    /**
     * 批量删除数据
     * @param list
     */
    @Transactional
    public void batchDeleteEntity(List<Procedure> list) {
        this.batchDelChild(list);
        dao.batchDelete(list);
    }

    /**
     * 删除主表下面的子表数据
     * 
     * @param list
     * @throws DAOException
     */
    private void batchDelChild(List<Procedure> list) throws DAOException {
        dao.batchDelChild(list);
    }	 
	
    /**
     * 根据传递的参数，进行分页查询
     */
    public Page<Procedure> selectAllByPage(Map<String, Object> searchParams, PageRequest pageRequest) {
    	Page<Procedure> pageResult = dao.selectAllByPage(pageRequest, searchParams) ;
        return pageResult;
    }
    public List<Procedure> selectList(){
        return dao.getList();
    }
}
