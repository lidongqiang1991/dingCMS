package com.yonyou.iuap.system.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yonyou.iuap.mvc.type.SearchParams;
import com.yonyou.iuap.system.service.LogUserService;

@RestController
@RequestMapping("loguser")
public class LogUserController extends BaseController {
	@Autowired
	private LogUserService logUserService;
	@RequestMapping("page")
	public Object selectAllByPage(PageRequest pageRequest, SearchParams searchParams){
		return buildSuccess(logUserService.selectAllByPage(pageRequest, searchParams.getSearchMap()));
	}
}
