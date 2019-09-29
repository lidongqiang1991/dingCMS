package com.yonyou.iuap.system.web.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ding.cms.util.QiniuFileUtil;

@Controller
@RequestMapping(value = "/file")
public class BackFileController {
	
	@RequestMapping(value = "/uptoken", method = RequestMethod.GET)
	public @ResponseBody Object uptoken(HttpServletRequest request,
			HttpServletResponse reponse)
			throws IOException {
		String fileid = getLongUUID();
		String token ="";
			token = QiniuFileUtil.getUpToken(false, fileid);
		Map<String, String> result = new HashMap<String, String>();
		result.put("token", token);
		result.put("fileid", fileid);
		return result;
	}
	
	public static String getLongUUID() {
		Long uuid;
		do {
			uuid = Math.abs(UUID.randomUUID().getMostSignificantBits());
		} while (uuid <= 0L);
		return uuid.toString();
	}
	
	@RequestMapping(value = "/simpleuptoken", method = RequestMethod.GET)
	public @ResponseBody Object simpleuptoken(HttpServletRequest request,
			HttpServletResponse reponse)
			throws IOException {
		String token ="";
			token = QiniuFileUtil.getUpToken(QiniuFileUtil.bucketName);
		Map<String, String> result = new HashMap<String, String>();
		result.put("token", token);
		return result;
	}
	
}
