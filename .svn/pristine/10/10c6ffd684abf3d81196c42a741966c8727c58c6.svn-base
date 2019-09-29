package com.ding.cms.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class Constants {

	private static Map<String, Properties> propmaps = new HashMap<String, Properties>();

	public static final String USERCONTEXT = "USERCONTEXT";
	
	public static final String USER_CONTEXT_JSONOBJ_KEY = "USER_CONTEXT_JSONOBJ_KEY";
	
	public static final String THREAD_CONTEXT_SESSION_KEY = "THREAD_CONTEXT_SESSION_KEY";
	public static final String THREAD_CONTEXT_REQUEST_KEY = "THREAD_CONTEXT_REQUEST_KEY";
	public static final String THREAD_CONTEXT_RESPONSE_KEY = "THREAD_CONTEXT_RESPONSE_KEY";

	// 七牛云存储
	public static String QINIU_ACCESSKEY = getProperty("qiniu.accessKey");
	public static String QINIU_SECRETKEY = getProperty("qiniu.secretKey");
	public static String QINIU_BUCKET = getProperty("qiniu.bucketName");
	public static String QINIU_TOKEN_EXPIRES = getProperty("qiniu.tokenExpires");
	public static String QINIU_DOWNLOAD_HOST = getProperty("qiniu.downloadHost");

	public static String QINIU_BUCKET_PRIV = getProperty("qiniu.bucketNamePriv");
	
	public static String QINIU_BUCKET_VIDEO = getProperty("qiniu.bucketNameVideo");
	
	public static String QINIU_DOWNLOAD_HOST_PRIV = getProperty("qiniu.downloadHostPriv");
	// 微信服务号
	public static String WECHAT_APPID = getProperty("wechat.AppID");;
	public static String WECHAT_APPSSCRET = getProperty("wechat.AppSecret");;

	public static String WECHAT_SIGNURL = getProperty("wechat.SignUrl");
	
	public static String YUHONG_SMSURL = getProperty("yuhong.sms");
	public static String YUHONG_OPENSMS = getProperty("yuhong.opensms");
	
	//信息模板
	public static String  MESSAGE_ALLOT_USER  = getProperty("user","messageTemplate.properties");
	public static String  MESSAGE_ALLOT_SURVEY  = getProperty("survey","messageTemplate.properties");
	public static String  MESSAGE_ALLOT_CONSTRUCTION  = getProperty("construction","messageTemplate.properties");
	public static String  MESSAGE_ALLOT_SUPERVISOR  = getProperty("supervisor","messageTemplate.properties");

	public static String  MESSAGE_ADD_CONSTRUCTION  = getProperty("addconstruction","messageTemplate.properties");
	public static String  MESSAGE_CONSTRUCTIONINFO  = getProperty("constructioninfo");
	//oauth
	public static String RESOURCE_SERVER_NAME = "oauth-server";
    public static final String INVALID_CLIENT_DESCRIPTION = "客户端验证失败，如错误的client_id/client_secret。";
    //业绩日期
    public static final String PERFORMANCE="performance";
    public static final String REWARD="reward";
	public static String getProperty(String key) {
		return getProperties("application.properties").getProperty(key);
	}
	public static String getProperty(String key,String propsName) {
		return getProperties(propsName).getProperty(key);
	}
	private static Properties getProperties(String propsName) {
		Properties properties = propmaps.get(propsName);
		if (properties == null) {
			properties = new Properties();
			try {
				InputStream inputStream = Constants.class.getClassLoader().getResourceAsStream(propsName);
				properties.load(new InputStreamReader(inputStream,"UTF-8"));
				propmaps.put(propsName, properties);
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		}
		return properties;
	}
}
