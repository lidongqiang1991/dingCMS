package com.yonyou.iuap.system.web.controller;

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
import com.yonyou.iuap.system.entity.Log;
import com.yonyou.iuap.system.service.LogService;

/**
 * 系统日志controller
 * @author xyb
 *
 */
@Controller
@RequestMapping(value="/log")
public class LogController  extends BaseController{
	
	@Autowired
	private LogService logService;
	
	/**
	 * 查询所有分页系统日志
	 * @param pageRequest
	 * @param searchParams
	 * @return
	 */
	@RequestMapping(value="/list",method=RequestMethod.GET)
	public @ResponseBody  Object page(PageRequest pageRequest,SearchParams searchParams ){
		Page<Log> page=logService.selectAllByPage(pageRequest, searchParams.getSearchMap());
		return buildSuccess(page);
	}
	/**
	 * 插入系统日志
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/insert",method=RequestMethod.POST)
    public @ResponseBody Object insertlog(HttpServletRequest request,HttpServletResponse response){
	    String object=request.getParameter("object");
	    String action=request.getParameter("action");
	    String actcontent=request.getParameter("actcontent");
	    logService.insertlog(object, action, actcontent);
	    return buildSuccess();
   }
}
