package com.ding.cms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ding.cms.entity.BillMaterialAllot;
import com.ding.cms.repository.BillMaterialAllotDao;

@Service
public class BillMaterialAllotService {
	
	@Autowired
	private BillMaterialAllotDao dao;
	
	@Transactional
	public BillMaterialAllot createMaterialAllot(BillMaterialAllot allot){
		return dao.createAllot(allot);
	}
}
