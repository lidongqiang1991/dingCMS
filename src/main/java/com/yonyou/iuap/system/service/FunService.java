package com.yonyou.iuap.system.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yonyou.iuap.system.entity.FunregisterVO;
import com.yonyou.iuap.system.repository.FunRegisterDao;

@Service
public class FunService {
	
	@Autowired
	private FunRegisterDao funRegisterDao;
	
	public List<FunregisterVO> getSuper(){
		return funRegisterDao.getSuper();
	}
	public List<FunregisterVO> getAll(){
		return funRegisterDao.getAll();
	}
//	@Transactional
    public FunregisterVO save(FunregisterVO entity) {
        return funRegisterDao.save(entity) ;
    }
	
//	@Transactional
	public void delete(List<FunregisterVO> list){
		funRegisterDao.delete(list);
	}
	
	public Page<FunregisterVO> selectAllByPage(Map<String, Object> searchParams, PageRequest pageRequest) {
    	Page<FunregisterVO> pageResult = funRegisterDao.selectAllByPage(pageRequest, searchParams) ;
        return pageResult;
    }
	
	public Object getUserFuns(){
		return funRegisterDao.getUserFuns();
	}
	
}
