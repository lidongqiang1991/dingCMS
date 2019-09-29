package com.yonyou.iuap.system.web.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yonyou.iuap.system.service.FormValueDataService;

@Controller
@RequestMapping(value = "/formvaluedata")
public class FormValueDataController extends BaseController {

	@Autowired
	private FormValueDataService service;

	/**
	 * 查询完整表单信息
	 * 
	 * @param sid
	 * @param formid
	 * @return
	 */
	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public @ResponseBody Object formvalueall(HttpServletRequest request, HttpServletResponse response) {
		String sid = request.getParameter("sid");
        String formid = request.getParameter("formid");
		return buildSuccess(service.formvalueall(sid, formid));
	}

	/**
	 * 保存单个字段
	 * 
	 * @param sid
	 * @param formid
	 * @param key
	 * @param value
	 */
	@RequestMapping(value = "/save", method = RequestMethod.GET)
	public @ResponseBody void save(HttpServletRequest request, HttpServletResponse response) {
		String sid = request.getParameter("sid");
        String formid = request.getParameter("formid");
        String attribute = request.getParameter("attribute");
        String value = request.getParameter("value");
		
		service.save(sid, formid, attribute, value);
	}

	@RequestMapping(value = "/one", method = RequestMethod.GET)
	public  @ResponseBody Object selectone(HttpServletRequest request, HttpServletResponse response) {
		String sid = request.getParameter("sid");
        String formid = request.getParameter("formid");
        String attribute = request.getParameter("attribute");
		
		return service.formvalueone(sid, formid, attribute);
	}
}
