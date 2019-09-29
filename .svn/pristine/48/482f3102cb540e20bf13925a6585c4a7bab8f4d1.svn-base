package com.yonyou.iuap.system.web.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yonyou.iuap.mvc.type.SearchParams;
import com.yonyou.iuap.system.entity.Form;
import com.yonyou.iuap.system.service.FormService;
import com.yonyou.iuap.system.service.LogService;
import com.yonyou.iuap.system.validator.FormValidator;

@Controller
@RequestMapping(value = "/form")
public class FormController extends BaseController {

	@Autowired
	private FormService service;

	@Autowired
    private FormValidator validtor;
	
	@Autowired
    private LogService log;
	
	/**
	 * 查询表单
	 * @param pageRequest
	 * @param searchParams
	 * @return
	 */
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody Object page(PageRequest pageRequest,
			SearchParams searchParams) {
		Page<Form> tmpdata = service.selectAllByPage(
				searchParams.getSearchMap(), pageRequest);
		return buildSuccess(tmpdata);
	}

	/**
	 * 保存表单
	 * @param list
	 * @return
	 */
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public @ResponseBody Object save(@RequestBody List<Form> list) {
		Form form = list.get(0);
		if(form.getFormid()!=null&&!"".equals(form.getFormid())){
    		validtor.validUpdate(form);
    	}else{
    		validtor.validAdd(form);	
    	}
		service.save(form);
		//log.insertlog("表单", "保存或修改", "保存表单");
		return buildSuccess(form);
	}

	@RequestMapping(value = "/batchDel", method = RequestMethod.POST)
	public @ResponseBody Object del(@RequestBody List<Form> list) {
		service.batchDeleteEntity(list);
		return buildSuccess();
	}

	@RequestMapping(value = "/del", method = RequestMethod.GET)
	public @ResponseBody Object addAllot(HttpServletRequest request,
			HttpServletResponse reponse) {
		String formid = request.getParameter("formid");
		service.delById(formid);
		return buildSuccess();
	}

	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	public @ResponseBody Object detail(HttpServletRequest request,
			HttpServletResponse reponse) {
		String formid = request.getParameter("formid");
		return buildSuccess(service.queryByPk(formid));
	}

	@RequestMapping(value = "/listall", method = RequestMethod.GET)
	public @ResponseBody Object list() {
		List<Form> tmpdata = service.selectAllByPage();
		return tmpdata;
	}

}
