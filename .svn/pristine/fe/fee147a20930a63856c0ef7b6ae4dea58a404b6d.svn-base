package com.ding.cms.util;

import java.util.List;

import net.sf.json.JSONObject;

public class SMSYuHongUtil {
	
	public static String sendSMS(String content,String phone) throws Exception{
		String result="";
		JSONObject json=new JSONObject();
		json.put("mobile", phone);
		json.put("content", content);
		if("Y".equals(Constants.YUHONG_OPENSMS))
		result=HttpUtils.requestPost(Constants.YUHONG_SMSURL, json.toString(),null);
		return result;
	}
	
	public static String sendSMS(String content,List<String> phones){
		
		return "";
	}

}
