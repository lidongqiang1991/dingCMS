package com.yonyou.iuap.system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yonyou.iuap.system.repository.BillCodeManageDao;

@Service
public class BillCodeManageService {
	

	@Autowired
	private BillCodeManageDao billCodeManageDao;
	
	public String getBillCode(String orgid,String billType,int serial){
		return billCodeManageDao.getBillCode(orgid, billType, serial);
	}
	
	public String getBillCodeWithPart(String orgid,String billType,int serial,String pre,String suf){
		return billCodeManageDao.getBillCodeWithPart(orgid, billType, serial, pre, suf);
	}
}
