package com.ding.cms.util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.codec.digest.DigestUtils;

public class TokenUtil {
	 public static Map<String,Object> toVerifyMap(Map<String, String[]> requestParams) {
	        Map<String,Object> params = new HashMap<>();
	        for (Iterator<String> iter = requestParams.keySet().iterator(); iter.hasNext();) {
	            String name = (String) iter.next();
	            String[] values = requestParams.get(name);
	            String valueStr = "";
	            for (int i = 0; i < values.length; i++) {
	                valueStr = (i == values.length - 1) ? valueStr + values[i] : valueStr + values[i] + ",";
	            }
	            params.put(name, (Object)valueStr);
	        }
	        return params;
	    }
	/**
	 * 将请求的url按参数排序转换为字符串
	 * @param map
	 * @return
	 */
	public static String createLinkString(Map<String, Object> map){
		List<String> list=new ArrayList<String>(map.keySet());
		Collections.sort(list);
		StringBuilder sb=new StringBuilder();
		for (int i = 0; i < list.size(); i++) {
			String key=list.get(i);
			Object name=map.get(key);
			sb.append(key);
			sb.append("=");
			sb.append(name);
			if(i<list.size()-1){
				sb.append("&");
			}
		}
		return sb.toString();
	}
	public static String createToken(Map<String, String[]> map){
		Map<String, Object> nmap = toVerifyMap(map);
		String prestr=createLinkString(nmap);
		return DigestUtils.md5Hex(prestr+System.currentTimeMillis());
	}
}
