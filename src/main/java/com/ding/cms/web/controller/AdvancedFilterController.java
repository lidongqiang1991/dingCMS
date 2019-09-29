package com.ding.cms.web.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ding.cms.entity.FilterFactor;
import com.ding.cms.entity.UserFilter;
import com.ding.cms.service.AdvancedFilterService;
import com.yonyou.iuap.mvc.type.SearchParams;
import com.yonyou.iuap.system.web.controller.BaseController;

@Controller
@RequestMapping(value= "/advanfilter")
public class AdvancedFilterController extends BaseController{
	
	@Autowired
	private AdvancedFilterService advancedFilterService;
	/**
	 * 查询系统过滤器条件
	 * @param pageRequest
	 * @param searchParams
	 * @return
	 */
	@RequestMapping(value = "/pagesys", method = RequestMethod.GET)
    public @ResponseBody Object page(PageRequest pageRequest, SearchParams searchParams) {
        Page<FilterFactor> result =
        		advancedFilterService.queryFilterAttributeForDefferentPage(pageRequest, searchParams.getSearchMap());
        return buildSuccess(result);
    }
	/**
	 * 配置系统过滤器条件
	 * @param filter
	 * @return
	 */
	@RequestMapping(value = "/savesys", method = RequestMethod.POST)
    public @ResponseBody Object save(@RequestBody FilterFactor filter) {
		advancedFilterService.saveFilterAttributeForDefferentPage(filter);
        return buildSuccess();
    }
	/**
	 * 删除系统过滤器条件
	 * @param list
	 * @return
	 */
	@RequestMapping(value = "/delsys", method = RequestMethod.POST)
    public @ResponseBody Object del(@RequestBody List<FilterFactor> list) {
		advancedFilterService.deleteFilterAttributeForDefferentPage(list);
    	return buildSuccess();
    }
	/**
	 * 查询个人过滤器条件（根据用户）
	 * @param pageRequest
	 * @param searchParams
	 * @return
	 */
	@RequestMapping(value = "/queryuser", method = RequestMethod.GET)
    public @ResponseBody Object queryFilterForUser(HttpServletRequest request,HttpServletResponse response) {
		String type = request.getParameter("type");
		String filtername = request.getParameter("filtername");
		List<FilterFactor> result =
        		advancedFilterService.queryFilterForUser(type,filtername);
        return buildSuccess(result);
    }
	/**
	 * 查询个人过滤器条件（根据页面）
	 * @param pageRequest
	 * @param searchParams
	 * @return
	 */
	@RequestMapping(value = "/querytype", method = RequestMethod.GET)
    public @ResponseBody Object queryFilterForDefferentPage(HttpServletRequest request,HttpServletResponse response) {
		String type = request.getParameter("type");
		String filtername = request.getParameter("filtername");
		List<FilterFactor> result =
        		advancedFilterService.queryFilterForDefferentPage(type,filtername);
        return buildSuccess(result);
    }
	/**
	 * 配置个人过滤器条件
	 * @param filter
	 * @return
	 */
	@RequestMapping(value = "/saveuser", method = RequestMethod.POST)
    public @ResponseBody Object saveFilterForUser(@RequestBody List<FilterFactor> filters) {
		advancedFilterService.saveFilterForUser(filters);
        return buildSuccess();
    }
	/**
	 * 删除个人过滤器条件
	 * @param list
	 * @return
	 */
	@RequestMapping(value = "/deluser", method = RequestMethod.POST)
    public @ResponseBody Object deleteFilterForUser(@RequestBody List<FilterFactor> list) {
		advancedFilterService.deleteFilterForUser(list);
    	return buildSuccess();
    }
	
	@RequestMapping(value = "/savefilter", method = RequestMethod.POST)
	public @ResponseBody Object save(HttpServletRequest request,String filter) {
		JSONObject json=JSONObject.fromObject(filter);
		JSONArray array=json.getJSONArray("id_filterfactor");
		List<FilterFactor> factors = new ArrayList<FilterFactor>();
		for (int i = 0; i < array.size(); i++) {
			JSONObject obj=(JSONObject)array.get(i);
			String setting = obj.getString("setting");
			String conditionlist = obj.getString("conditionlist");
			String value = obj.getString("value");
//			String endtime = obj.getString("endtime");
			obj.remove("ts");
			obj.remove("setting");
			obj.remove("conditionlist");
			obj.remove("value");
//			obj.remove("endtime");
			FilterFactor factor = (FilterFactor)JSONObject.toBean(obj, FilterFactor.class);
			factor.setSetting(setting);
			factor.setConditionlist(conditionlist);
			factor.setValue(value);
//			factor.setStarttime(starttime);
//			factor.setEndtime(endtime);
			factors.add(factor);
		}
		json.remove("id_filterfactor");
		Map classMap=new HashMap();
		classMap.put("id_filterfactor", FilterFactor.class);
		UserFilter userFilter=(UserFilter) JSONObject.toBean(json, UserFilter.class, classMap);
		userFilter.setId_filterfactor(factors);
		advancedFilterService.saveUserFilter(userFilter);
		return buildSuccess();
	}
	
	/**
	 * 查询场景（根据页面类型）
	 * @param pageRequest
	 * @param searchParams
	 * @return
	 */
	@RequestMapping(value = "/queryall", method = RequestMethod.GET)
    public @ResponseBody Object queryUserFilter(HttpServletRequest request,HttpServletResponse response) {
		String type = request.getParameter("type");
		String all = request.getParameter("all");
		List<UserFilter> result =
        		advancedFilterService.queryUserFilter(all,type);
        return buildSuccess(result);
    }
	
	/**
	 * 查询场景详情（根据场景id）
	 * @param pageRequest
	 * @param searchParams
	 * @return
	 */
	@RequestMapping(value = "/queryfilter", method = RequestMethod.GET)
    public @ResponseBody Object queryUserFilterById(HttpServletRequest request,HttpServletResponse response) {
		String filterid = request.getParameter("filterid");
		UserFilter result =
        		advancedFilterService.queryUserFilterById(filterid);
        return buildSuccess(result);
    }
	
	/**
	 * 删除场景
	 * @param list
	 * @return
	 */
	@RequestMapping(value = "/deluser", method = RequestMethod.GET)
    public @ResponseBody Object deleteUserFilterById(HttpServletRequest request,HttpServletResponse response) {
		String filterid = request.getParameter("filterid");
		advancedFilterService.deleteUserFilterById(filterid);
    	return buildSuccess();
    }
	
}
