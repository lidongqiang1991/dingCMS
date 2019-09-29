package com.ding.cms.service;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ding.cms.entity.CustomerListEntity;
import com.ding.cms.entity.JobLog;
import com.ding.cms.repository.JobLogDao;
import com.ding.cms.task.UdeskTask;
import com.ding.cms.util.Base64Util;
import com.ding.cms.util.DateUtils;
import com.ding.cms.util.HMACSHA256Util;
import com.ding.cms.util.HttpUtils;
import com.ding.cms.util.TokenUtil;
import com.google.gson.JsonObject;
import com.yonyou.iuap.iweb.exception.ValidException;

@Service
public class CRMJobService {
	@Autowired
	private CustomerListService listService;
	private final Logger logger = LoggerFactory.getLogger(CRMJobService.class);
	private final String crmServer = "https://feiyu.oceanengine.com";
	private final String pullCluesApi = "/crm/v2/openapi/pull-clues/";
	public final String signatureKey = "Nkw2NzhUQ0JJTTNL";
	public final String token = "a173eefc9c87e7e9bcc8e29918f648abbab60166";
	public final Integer size = 100;

	@Transactional
	public JSONObject pull(Date startdate, Date enddate, String jobId)
			throws RuntimeException {
		int totalsize = 0;
		int i=1;//条数
		Integer page = 1;
		String msg = "";
		JSONArray datas = new JSONArray();
		try {
			do {
				//拉取数据从开始时间到结束时间之内的数据,每次最多只能拉取100条,现在是拉取当前时间之前一天内的数据
				String responseStr = getData(startdate,enddate, page, this.size);
				JSONObject responseJosn = JSONObject.fromObject(responseStr);
				if (!responseJosn.get("status").equals("success")) {
					//如果没有成功,得到错误信息
					msg = responseJosn.get("msg").toString();
					throw new Exception();
				}
				// 数据处理
				JSONArray data = JSONArray.fromObject(responseJosn.get("data"));
				if (data != null && !data.isEmpty()) {
					for (Object object : data) {
						JSONObject itemJson = JSONObject.fromObject(object);
						CustomerListEntity cusEntity = new CustomerListEntity();
						System.out.println(itemJson.getString("location"));
						String[] location = itemJson.getString("location").split("[+]");
						String[] district = itemJson.getJSONObject("remark_dict").getString("您所在区域").split(",");
						cusEntity.setName(itemJson.getString("name"));
						cusEntity.setPhone(itemJson.getString("telphone"));
						//建单渠道
						cusEntity.setSourcetype0("广告投放");
						//了解途径
						cusEntity.setSourcetype("今日头条");
						//途径细分
						cusEntity.setSourcetype1("今日头条");
						cusEntity.setProvince(location[0]);
						if(location.length>=2)
							cusEntity.setCity(location[1]);
						cusEntity.setDistrict(district[district.length-1]);
						cusEntity.setCreatetime(DateUtils.format(new Date(itemJson.getLong("create_time")*1000),DateUtils.YMDHMS_PATTERN));
						cusEntity.setLifestages(0);
						cusEntity.setJobid(jobId+(enddate.getTime()/1000));
						logger.info("当前客户信息>>>>>>"+itemJson.toString());
						Map<String, Object> searchParams=new HashMap<String, Object>();
						searchParams.put("phone",cusEntity.getPhone());
						//参数里放的开始时间是当前时间前两天,对应bill_deal里的createtime
						searchParams.put("starttime1", DateUtils.format(DateUtils.addDate(new Date(),-2)));
						searchParams.put("endtime1",DateUtils.format(new Date()));
						searchParams.put("jobid","");
						//根据传入的参数查询
						Page<CustomerListEntity> custs = listService.selectAllByPage(searchParams, new PageRequest(0, 1));
						if(custs!=null&&custs.getContent().size()>0){
							logger.info("客户重复，名称为"+cusEntity.getName()+"电话为"+cusEntity.getPhone());
							continue;
						}
						try {
							listService.saveAll(cusEntity);
							logger.info("保存成功，当前为第"+(i++)+"条数据");
						} catch (ValidException e) {
							e.printStackTrace();
							logger.error("保存失败，当前为第"+(i++)+"条数据");
							logger.error("数据为"+itemJson.toString()+"原因：手机号重复");
						}
						datas.add(itemJson);
					}
					
				}
				//总的数量
				int count = Integer.parseInt(responseJosn.get("count")
						.toString());
				//已有页的容量
				totalsize += size;
				if (count >= totalsize)
					page += 1;
				else {
					totalsize += count % size;
					totalsize-=100;
					break;
				}
			} while (true);
			JSONObject response = new JSONObject();
			response.put("status", "success");
			response.put("count", totalsize);
			response.put("data", datas);
			return response;
		} catch (RuntimeException e) {
			e.printStackTrace();
			throw new RuntimeException();
		} catch (Exception e) {
			JSONObject response = new JSONObject();
			response.put("status", "error");
			response.put("msg", msg);
			return response;
		}
	}
	/*
	 * 今日头条获取分页数据
	 */
	private String getData(Date startdate, Date enddate, Integer page,
			Integer size) throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		String timestamp = new Long(System.currentTimeMillis() / 1000)
				.toString();
		params.put("start_time", new SimpleDateFormat(
				DateUtils.YEAR_MONTH_DAY_PATTERN).format(startdate));
		params.put("end_time", new SimpleDateFormat(
				DateUtils.YEAR_MONTH_DAY_PATTERN).format(enddate));
		String data = pullCluesApi + "?start_time=" + params.get("start_time")
				+ "&end_time=" + params.get("end_time") + " " + timestamp;
		System.out.println(data);
		params.put("page", page);
		params.put("page_size", size);
		Map<String, String> header = new HashMap<String, String>();
		header.put("Signature", generateSignature(data, signatureKey));
		header.put("Timestamp", timestamp);
		header.put("Access-Token", token);
		return HttpUtils.requestGet(crmServer + pullCluesApi, params, header);
	}

	private String generateSignature(String data, String key) {
		return Base64Util.encode(HMACSHA256Util.sha256_HMAC(data, key)
				.getBytes());
	}
}
