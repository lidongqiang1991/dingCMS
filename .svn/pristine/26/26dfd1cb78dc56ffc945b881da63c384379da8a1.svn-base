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
import com.yonyou.iuap.system.entity.FunregisterVO;
import com.yonyou.iuap.system.service.FunService;
import com.yonyou.iuap.system.web.controller.BaseController;

@Controller
@RequestMapping(value = "/funreg")
public class FunRegisterController extends BaseController{
	
	@Autowired
	private FunService funRegisterService;
	
	@RequestMapping(value = "/tlist" , method = RequestMethod.GET)
	public @ResponseBody Object getSuper(PageRequest pageRequest, SearchParams searchParams){
		return funRegisterService.getSuper();
	}
	@RequestMapping(value = "/all" , method = RequestMethod.GET)
	public @ResponseBody Object getAll(PageRequest pageRequest, SearchParams searchParams){
		return funRegisterService.getAll();
	}
	@RequestMapping(value = "/list", method = RequestMethod.GET)
    public @ResponseBody Object page(PageRequest pageRequest, SearchParams searchParams) {
        Page<FunregisterVO> tmpdata = funRegisterService.selectAllByPage( searchParams.getSearchMap(),pageRequest);
        return buildSuccess(tmpdata);
    }
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
    public @ResponseBody Object save(@RequestBody List<FunregisterVO> list) {
		FunregisterVO entity=list.get(0);
		funRegisterService.save(entity);
        return buildSuccess();
    }
	
	@RequestMapping(value = "/del", method = RequestMethod.POST)
    public @ResponseBody Object del(@RequestBody List<FunregisterVO> list) {
		funRegisterService.delete(list);
    	return buildSuccess();
    }
	
	@RequestMapping(value = "/funs", method = RequestMethod.GET)
    public @ResponseBody Object getUserFuns(HttpServletRequest request, HttpServletResponse response) {
    	return buildSuccess(funRegisterService.getUserFuns());
    }
	
}
