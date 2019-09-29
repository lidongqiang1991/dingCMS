package com.yonyou.iuap.system.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yonyou.iuap.system.repository.PhoneCheckDao;

import java.util.regex.Pattern;

@Service
public class PhoneCheckService {
	
	@Autowired
	private PhoneCheckDao dao;
	
    /**
     * 正则表达式：验证手机号
     */
    private static final String REGEX_MOBILE = "^(1)\\d{10}$";
	
	public Map<String, String> checkPhone (String telphone){
		if(Pattern.matches(REGEX_MOBILE, telphone)){
			return dao.checkPhone(telphone);
		}
		else{
			return null;
		}
	}
	public Map<String, String> checkPhone (String telphone,String id){
		if(Pattern.matches(REGEX_MOBILE, telphone)){
			return dao.checkPhone(telphone,id);
		}
		else{
			return null;
		}
	}
	public Map<String, String> checkPhone (String telphone,String id,String type){
		if(Pattern.matches(REGEX_MOBILE, telphone)){
			return dao.checkPhone(telphone,id,type);
		}
		else{
			return null;
		}
	}
	
}
