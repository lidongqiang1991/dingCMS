package com.ding.cms.util;

import java.io.File;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.alibaba.druid.util.StringUtils;
import com.qiniu.common.QiniuException;
import com.qiniu.common.Zone;
import com.qiniu.http.Response;
import com.qiniu.processing.OperationManager;
import com.qiniu.storage.BucketManager;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.UploadManager;
import com.qiniu.storage.model.FileInfo;
import com.qiniu.util.Auth;
import com.qiniu.util.StringMap;
import com.qiniu.util.UrlSafeBase64;

public class QiniuFileUtil {
	private static final Logger logger = LoggerFactory.getLogger(QiniuFileUtil.class);

	private static String accessKey = Constants.QINIU_ACCESSKEY;
	private static String secretKey = Constants.QINIU_SECRETKEY;
	public static final String bucketName = Constants.QINIU_BUCKET;
	public static final String bucketNamePriv = Constants.QINIU_BUCKET_PRIV;
	public static final long tokenExpires = Long.parseLong(Constants.QINIU_TOKEN_EXPIRES);
	public static final String downloadHostPriv = Constants.QINIU_DOWNLOAD_HOST_PRIV;
	public static UploadManager uploadManager = null;
	public static BucketManager bucketManager = null;
	public static OperationManager operater = null;
	public static Auth auth = Auth.create(accessKey, secretKey);

	static {
		logger.info("init qiniu(七牛云存储) start ...");
		logger.info("init qiniu(七牛云存储) :bucketName:{" + bucketName + "}");
		// 要上传的空间(bucket)的存储区域为华东时
		// Zone z = Zone.zone0();
		// 要上传的空间(bucket)的存储区域为华北时
		Zone z = Zone.zone1();
		// 要上传的空间(bucket)的存储区域为华南时
		// Zone z = Zone.zone2();
		// 第二种方式: 自动识别要上传的空间(bucket)的存储区域是华东、华北、华南。
		// Zone z = Zone.autoZone();
		Configuration c = new Configuration(z);
		uploadManager = new UploadManager(c);

		// 实例化一个BucketManager对象
		bucketManager = new BucketManager(auth, c);

		// 新建一个OperationManager对象
		operater = new OperationManager(auth, c);
		logger.info("init qiniu(七牛云存储) end");
	}

	// 简单上传，使用默认策略，只需要设置上传的空间名就可以了
	public static String getUpToken(String bucketName) {
		return auth.uploadToken(bucketName);
	}

	public static String getUpToken(boolean isPrivate, String key) {
		if (isPrivate)
			return auth.uploadToken(bucketNamePriv, key);
		else
			return auth.uploadToken(bucketName, key);
	}
	public static String getUpToken(String bucketName, String key) {
			return auth.uploadToken(bucketName, key);
	}
	/**
	 * 资源上传
	 * 
	 * @param content
	 * @param fileid
	 * @return
	 * @throws QiniuException
	 */
	public static String upload(byte[] content, String fileid) throws QiniuException {
		return doUpload(content, fileid, bucketName);
	}

	/**
	 * 资源上传到私有库
	 * 
	 * @param content
	 * @param fileid
	 * @return
	 * @throws QiniuException
	 */
	public static String uploadPriv(byte[] content, String fileid) throws QiniuException {
		return doUpload(content, fileid, bucketNamePriv);
	}

	private static String doUpload(byte[] content, String fileid, String bn) throws QiniuException {
		Response res = uploadManager.put(content, fileid, getUpToken(bn));
		return res.bodyString();
	}

	/**
	 * 资源上传
	 * 
	 * @param file
	 * @param fileid
	 * @return
	 * @throws QiniuException
	 */
	public static String upload(File file, String fileid) throws QiniuException {
		return doUpload(file, fileid, bucketName);
	}

	/**
	 * 资源上传到私有库
	 * 
	 * @param file
	 * @param fileid
	 * @return
	 * @throws QiniuException
	 */
	public static String uploadPriv(File file, String fileid) throws QiniuException {
		return doUpload(file, fileid, bucketNamePriv);
	}

	private static String doUpload(File file, String fileid, String bn) throws QiniuException {
		Response res = uploadManager.put(file, fileid, getUpToken(bn));
		return res.bodyString();
	}

	/**
	 * 删除资源
	 * 
	 * @param fileid
	 * @throws QiniuException
	 */
	public static void deleteFile(String fileid) throws QiniuException {
		doDeleteFile(bucketName, fileid);
	}

	public static void deleteFilePriv(String fileid) throws QiniuException {
		doDeleteFile(bucketNamePriv, fileid);
	}

	private static void doDeleteFile(String bn, String fileid) throws QiniuException {
		bucketManager.delete(bn, fileid);
	}

	/**
	 * 资源元信息查询
	 * 
	 * @param fileid
	 * @throws QiniuException
	 */
	public static FileInfo statFile(String fileid) throws QiniuException {
		return doStatFile(bucketName, fileid);
	}

	public static FileInfo statFilePriv(String fileid) throws QiniuException {
		return doStatFile(bucketNamePriv, fileid);
	}

	private static FileInfo doStatFile(String bn, String fileid) throws QiniuException {
		return bucketManager.stat(bn, fileid);
	}

	/**
	 * 根据fileid获取下载url
	 * 
	 * @param fileid
	 * @return
	 */
	public static String getDownloadUrl(String fileid) {
		if (!StringUtils.isEmpty(fileid)) {
			String url = downloadHostPriv + "/" + fileid;
			// 调用privateDownloadUrl方法生成下载链接,第二个参数可以设置Token的过期时间
			String downloadRUL = auth.privateDownloadUrl(url, tokenExpires);
			return downloadRUL;
		} else {
			return "";
		}
	}

	/**
	 * 根据fileid和style样式获取下载url
	 * 
	 * @param fileid
	 * @param style
	 * @return
	 */
	public static String getDownloadUrl(String fileid, String style) {
		if (StringUtils.isEmpty(style))
			return getDownloadUrl(fileid);
		else
			return getDownloadUrl(fileid + "!" + style);
	}



	/**
	 * 获取视频截取某一帧(单位：秒，精确到毫秒)的图片查看url地址
	 * 
	 * @param fileid
	 * @param width
	 * @param height
	 * @param offset
	 *            截取第几秒的帧，精确到毫秒
	 * @return
	 */
	public static String getVideoFrameUrl(String fileid, double offset, int width, int height) {
		// 640*480
		return getDownloadUrl(fileid + "?vframe/jpg/w/" + width + "/h/" + height + "/offset/" + offset);
	}

	/**
	 * 获取视频截取某一帧(单位：秒，精确到毫秒)的图片另存为指定fileid
	 * 
	 * @param fileid
	 * @param offset
	 *            截取第几秒的帧，精确到毫秒
	 * @param width
	 * @param height
	 * @param imgFileid
	 *            图片保存为的fileid
	 * @return
	 */
	public static String genVideoFrameImage(String fileid, double offset, int width, int height, String imgFileid) {
		return _fop(fileid, imgFileid, "vframe/jpg/w/" + width + "/h/" + height + "/offset/" + offset);
	}

	/**
	 * 音频转换MP3并另存为newFileid，非实时转换，将送入七牛云转换队列执行
	 * 
	 * @param fileid
	 * @param newFileid
	 * @return
	 */
	public static String audioToMp3(String fileid, String newFileid) {
		return _fop(fileid, newFileid, "avthumb/mp3/ab/64k");
	}

	/**
	 * 视频转换MP4并另存为newFileid，非实时转换，将送入七牛云转换队列执行
	 * 
	 * @param fileid
	 * @param newFileid
	 * @return
	 */
	public static String videoToMp4(String fileid, String newFileid) {
		return _fop(fileid, newFileid, "avthumb/mp4/vb/128k");
		// return _fop(fileid, newFileid,
		// "avthumb/mp4/s/640x480/autoscale/1/vb/128k");
	}

	private static String _fop(String fileid, String newFileid, String fops) {
		// 设置转码的队列
		// String pipeline = "yourpipelinename";
		// 可以对转码后的文件进行使用saveas参数自定义命名，当然也可以不指定文件会默认命名并保存在当前空间。
		String urlbase64 = UrlSafeBase64.encodeToString(bucketNamePriv + ":" + newFileid);
		String pfops = fops + "|saveas/" + urlbase64;
		// 设置pipeline参数
		StringMap params = new StringMap().putWhen("force", 1, true);// .putNotEmpty("pipeline",
																		// pipeline);
		try {
			String persistid = operater.pfop(bucketNamePriv, fileid, pfops, params);
			return persistid;
		} catch (QiniuException e) {
			// 捕获异常信息
			Response r = e.response;
			// 请求失败时简单状态信息
			return r.toString();
			// 响应的文本信息
			// return r.bodyString();
		}
	}

	public static void main(String[] args) {
		// System.out.println(getDownloadUrl("1.jpg", "news_banner"));

		// try {
		// FileInfo fi = statFile("video1.m4v");
		// System.out.println(fi.fsize + ":" + fi.mimeType);
		// } catch (QiniuException e) {
		// e.printStackTrace();
		// }
		//
		// try {
		// Map m = getAVInfo("video1.m4v");
		//
		// System.out.println(m);
		// } catch (Exception e) {
		// e.printStackTrace();
		// }
		// System.out.println(getDownloadUrl("test1.mp3?avinfo"));

		// 获取视频指定秒
		// System.out.println(getVideoFrameUrl("video1.m4v", 26.3, 640, 360));
		// System.out.println(genVideoFrameImage("video1.m4v", 26.3, 640, 360,
		// "thumb.jpg"));

		// 音频转码压缩
		// System.out.println(audioToMp3("test1.mp3", "test1_new.mp3"));
		// 视频转码压缩
		System.out.println(videoToMp4("4495740503330474260.m4v", "4247919746032681597.mp4"));
		// System.out.println(videoToMp4("video1.m4v", "video1_new.m4v"));

		// 资源上传
		// File file = new File("/Users/wuyumin/Music/QQ音乐/video1.m4v");
		// FileInputStream fis = null;
		// try {
		// fis = new FileInputStream(file);
		// byte[] bytes = IOUtility.toByteArray(fis);
		// System.out.println(upload(bytes, Entity.getLongUUID(), bucketName));
		// } catch (Exception e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// } finally {
		// if (fis != null)
		// try {
		// fis.close();
		// } catch (IOException e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// }
		// }

	}
}
