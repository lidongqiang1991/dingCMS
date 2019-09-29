package com.ding.cms.util;

import java.io.IOException;
import java.net.Socket;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableKeyException;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.HttpVersion;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.conn.scheme.PlainSocketFactory;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.conn.PoolingClientConnectionManager;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.CoreProtocolPNames;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;










import com.alibaba.druid.util.StringUtils;

import net.sf.json.JSONObject;
import net.sf.json.util.JSONUtils;

public class HttpUtils {
	private static final Logger logger = LoggerFactory.getLogger(HttpUtils.class);

	private static final int timeout = 5000;// 默认连接超时时间
	private static final int socketTimeout = 5000;// 默认响应超时时间
	private static final int maxTotal = 400;
	private static final int maxPerRoute = 400;
	private static final boolean skipSSLCheck = true;

	/**
	 * http get 请求
	 * 
	 * @param url
	 * @return
	 * @throws AppException
	 */
	public static String requestGet(String url) throws Exception {
		return requestGet(url, null);
	}

	/**
	 * http get 请求
	 * 
	 * @param url
	 * @param param
	 * @return
	 * @throws AppException
	 */
	public static String requestGet(String url, Map<String, ?> param) throws Exception {
		return requestGet(url, param, null, null);
	}
	public static String requestGet(String url,Map<String, Object> params,Map<String, String> header) throws Exception{
		if (url == null) {
			return null;
		}
		StringBuilder sb = new StringBuilder(url);
		// 判定是否已有参数
		if (url.indexOf("?") != -1) {
			sb.append("&");
		} else {
			sb.append("?");
		}

		// 追加访问参数
		if (params != null && params.size() > 0) {
			for (Map.Entry<String, Object> entry : params.entrySet()) {
					sb.append(entry.getKey());
					sb.append("=");
					sb.append(entry.getValue());
					sb.append("&");
			}
		}
		sb.delete(sb.length()-1, sb.length());
		url = sb.toString();
		HttpResponse response = null;
		HttpGet get = null;
		try {
			get = new HttpGet(url.replace(" ", "%20"));
			if(header!=null)
				for (Entry<String, String> item : header.entrySet()) {
					get.setHeader(item.getKey(),item.getValue());
				}
			response = getInstance().execute(get);
			int responseCode = response.getStatusLine().getStatusCode();
			if (responseCode == HttpStatus.SC_OK || responseCode == HttpStatus.SC_CREATED) {
				return EntityUtils.toString(response.getEntity(), "UTF-8");
			} else if (responseCode == HttpStatus.SC_BAD_REQUEST) {
				throw new RuntimeException("用户名或密码错误！");
			} else
				throw new RuntimeException("Http请求失败！");

		} catch (Exception be) {
			get.abort();
			throw be;
		}finally {
			get.releaseConnection();
		}

	}
	/**
	 * http get 请求
	 * 
	 * @param url
	 * @param param
	 * @param username
	 *            https 访问用户姓名
	 * @param password
	 *            https 访问用户密码
	 * @return
	 * @throws AppException
	 */
	public static String requestGet(String url, Map<String, ?> param, String username, String password)
			throws Exception {
		if (url == null) {
			return null;
		}
		StringBuilder sb = new StringBuilder(url);
		// 判定是否已有参数
		if (url.indexOf("?") != -1) {
			sb.append("&");
		} else {
			sb.append("?");
		}

		// 追加访问参数
		if (param != null && param.size() > 0) {
			try {
				// url追加参数
				for (Map.Entry<String, ?> entry : param.entrySet()) {
					sb.append("&").append(entry.getKey()).append("=");
					if (entry.getValue() instanceof String) {
						String value = (String) entry.getValue();
						if (!StringUtils.isEmpty(value)) {
							sb.append(URLEncoder.encode((String) entry.getValue(), "UTF-8"));
						}
					} else {
						sb.append(entry.getValue());
					}
				}
			} catch (Exception e) {
				throw new Exception(e);
			}
		}
		url = sb.toString();

		HttpResponse response = null;
		HttpGet get = null;
		try {
			get = new HttpGet(url.replace(" ", "%20"));
			get.setHeader("Accept-Encoding", "gzip, deflate");
			if (!StringUtils.isEmpty(username) && !StringUtils.isEmpty(password)) {
				byte[] encodedPassword = (username + ":" + password).getBytes();
				get.addHeader("Authorization", "Basic " + Base64Util.encode(encodedPassword));
			}

			response = getInstance().execute(get);
			int responseCode = response.getStatusLine().getStatusCode();
			if (responseCode == HttpStatus.SC_OK || responseCode == HttpStatus.SC_CREATED) {
				return EntityUtils.toString(response.getEntity(), "UTF-8");
			} else if (responseCode == HttpStatus.SC_BAD_REQUEST) {
				throw new Exception("用户名或密码错误！");
			} else
				throw new Exception("Http请求失败！");

		} catch (Exception be) {
			get.abort();
			throw be;
		}finally {
			get.releaseConnection();
		}

	}

	private static HttpClient client;

	private static HttpClient getInstance() {
		if (client == null) {
			createHttpClient();
		}
		return client;
	}

	private static void createHttpClient() {
		try {
			SSLSocketFactory ssf = null;
			// 跳过SSL证书检查
			if (skipSSLCheck) {
				SSLContext ctx = SSLContext.getInstance("TLS");
				X509TrustManager tm = new X509TrustManager() {
					public java.security.cert.X509Certificate[] getAcceptedIssuers() {
						return null;
					}

					public void checkClientTrusted(java.security.cert.X509Certificate[] chain, String authType)
							throws java.security.cert.CertificateException {
						// Do nothing
					}

					public void checkServerTrusted(java.security.cert.X509Certificate[] chain, String authType)
							throws java.security.cert.CertificateException {
						// Do nothing
					}
				};
				ctx.init(null, new TrustManager[] { tm }, null);
				ssf = new SSLSocketFactory(ctx, SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
			} else {
				ssf = SSLSocketFactory.getSocketFactory();
			}

			HttpParams params = new BasicHttpParams();
			params.setParameter(CoreProtocolPNames.PROTOCOL_VERSION, HttpVersion.HTTP_1_1);
			params.setParameter(CoreProtocolPNames.HTTP_CONTENT_CHARSET, "UTF-8");
			if (timeout != 0) {
				HttpConnectionParams.setConnectionTimeout(params, timeout);
			}
			if (socketTimeout != 0) {
				HttpConnectionParams.setSoTimeout(params, socketTimeout);
			}

			SchemeRegistry schemeRegistry = new SchemeRegistry();
			schemeRegistry.register(new Scheme("http", 80, PlainSocketFactory.getSocketFactory()));
			schemeRegistry.register(new Scheme("https", 443, ssf));
			PoolingClientConnectionManager cm = new PoolingClientConnectionManager(schemeRegistry);
			if (maxTotal != 0) {
				cm.setMaxTotal(maxTotal);
			}
			if (maxPerRoute != 0) {
				cm.setDefaultMaxPerRoute(maxPerRoute);
			}
			client = new DefaultHttpClient(cm, params);
		} catch (Exception e) {
			client = new DefaultHttpClient();
		}

	}

	// 关闭HttpClent
	public static void shutdownHttpClient() {
		if (client != null && client.getConnectionManager() != null) {
			client.getConnectionManager().shutdown();
		}
	}

	private static class SSLSocketFactoryEx extends SSLSocketFactory {
		SSLContext sslContext = SSLContext.getInstance("TLS");

		public SSLSocketFactoryEx(KeyStore truststore)
				throws NoSuchAlgorithmException, KeyManagementException, KeyStoreException, UnrecoverableKeyException {
			super(truststore);

			TrustManager tm = new X509TrustManager() {

				public java.security.cert.X509Certificate[] getAcceptedIssuers() {
					return null;
				}

				public void checkClientTrusted(java.security.cert.X509Certificate[] chain, String authType)
						throws java.security.cert.CertificateException {

				}

				public void checkServerTrusted(java.security.cert.X509Certificate[] chain, String authType)
						throws java.security.cert.CertificateException {

				}
			};

			sslContext.init(null, new TrustManager[] { tm }, null);
		}

		@Override
		public Socket createSocket(Socket socket, String host, int port, boolean autoClose)
				throws IOException, UnknownHostException {
			return sslContext.getSocketFactory().createSocket(socket, host, port, autoClose);
		}

		@Override
		public Socket createSocket() throws IOException {
			return sslContext.getSocketFactory().createSocket();
		}
	}

	/**
	 * http post 请求
	 * 
	 * @param url
	 * @return
	 * @throws AppException
	 */
	public static String requestPost(String url) throws Exception {
		return requestPost(url, (Map<String, Object>) null,null);
	}

	/**
	 * http post 请求
	 * 
	 * @param url
	 * @param param
	 * @return
	 * @throws AppException
	 */
	public static String requestPost(String url, Map<String, Object> param,Map<String, String> header) throws Exception {
		if (param == null)
			param = new HashMap<String, Object>();
		JSONObject json=JSONObject.fromObject(param);
		return requestPost(url, json.toString(),header);
	}

	/**
	 * http post 请求
	 * 
	 * @param url
	 * @param jsonStr
	 *            组装好的json字符串(自身包含access_token)
	 * @return
	 * @throws AppException
	 */
	public static String requestPost(String url, String jsonStr,Map<String, String> header) throws Exception {
		Map<String, Object> logDesc = new HashMap<String, Object>();
		logger.debug("========request heade begin ========");
		logger.error("http URL:" + url + "____" + jsonStr);
		logDesc.put("url", url + "____" + jsonStr);
		HttpResponse response = null;
		StringEntity entity = null;
		HttpPost post = null;
		try {
			post = new HttpPost(url);
			post.setHeader("Accept-Encoding", "gzip, deflate");
			if(header!=null){
			for (Entry<String, String> item : header.entrySet()) {
				post.setHeader(item.getKey(),item.getValue());
			}
			}
			HttpParams params = new BasicHttpParams();
			HttpConnectionParams.setConnectionTimeout(params, timeout);
			HttpConnectionParams.setSoTimeout(params, socketTimeout);
			post.setParams(params);
			if (!StringUtils.isEmpty(jsonStr)) {
				entity = new StringEntity(jsonStr, "UTF-8");
				entity.setContentType("application/json");
				post.setEntity(entity);
			}
			for (Header item : post.getAllHeaders()) {
				logger.debug(item.getName() + " : " + item.getValue());
			}
			logDesc.put("head", post.getAllHeaders());
			logger.debug("========request heade end========");
			response = getInstance().execute(post);
			System.out.println(response.getStatusLine());
			int responseCode = response.getStatusLine().getStatusCode();
			if (responseCode == HttpStatus.SC_OK || responseCode == HttpStatus.SC_CREATED) {
				return EntityUtils.toString(response.getEntity(), "UTF-8");
			} else if (responseCode == HttpStatus.SC_BAD_REQUEST) {
				throw new Exception("用户名或密码错误！");
			} else {
				throw new Exception("Http请求失败！");
			}
		} catch (Exception be) {
			be.printStackTrace();
			post.abort();
			throw be;
		}  finally {
			post.releaseConnection();
		}
	}
	public static String requestPut(String url, String jsonStr,Map<String, String> header) throws Exception {
		logger.debug("========request heade begin ========");
		logger.error("http URL:" + url + "____" + jsonStr);
		HttpResponse response = null;
		StringEntity entity = null;
		HttpPut put = null;
		try {
			put = new HttpPut(url);
			put.setHeader("Accept-Encoding", "gzip, deflate");
			if(header!=null){
			for (Entry<String, String> item : header.entrySet()) {
				put.setHeader(item.getKey(),item.getValue());
			}
			}
			HttpParams params = new BasicHttpParams();
			HttpConnectionParams.setConnectionTimeout(params, timeout);
			HttpConnectionParams.setSoTimeout(params, socketTimeout);
			put.setParams(params);
			if (!StringUtils.isEmpty(jsonStr)) {
				entity = new StringEntity(jsonStr, "UTF-8");
				entity.setContentType("application/json");
				put.setEntity(entity);
			}
			for (Header item : put.getAllHeaders()) {
				logger.debug(item.getName() + " : " + item.getValue());
			}
			logger.debug("========request heade end========");
			response = getInstance().execute(put);
			System.out.println(response.getStatusLine());
			int responseCode = response.getStatusLine().getStatusCode();
			if (responseCode == HttpStatus.SC_OK || responseCode == HttpStatus.SC_CREATED) {
				return EntityUtils.toString(response.getEntity(), "UTF-8");
			} else if (responseCode == HttpStatus.SC_BAD_REQUEST) {
				throw new Exception("用户名或密码错误！");
			} else {
				throw new Exception("Http请求失败！");
			}
		} catch (Exception be) {
			be.printStackTrace();
			put.abort();
			throw be;
		}  finally {
			put.releaseConnection();
		}
	}
}
