package com.ding.cms.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ding.cms.entity.BillOrderMaterialBody;
import com.ding.cms.entity.BillService;
import com.ding.cms.entity.CustomerListEntity;
import com.ding.cms.entity.LogService;
import com.ding.cms.entity.ServiceListEntity;
import com.ding.cms.service.ServiceService;
import com.yonyou.iuap.mvc.type.SearchParams;
import com.yonyou.iuap.system.web.controller.BaseController;

@Controller
@RequestMapping(value = "/servicelist")
public class ServiceController extends BaseController{
	
	@Autowired
	private ServiceService serviceService;
	
	@RequestMapping(value = "/page", method = RequestMethod.GET)
	public @ResponseBody Object page(PageRequest pageRequest, SearchParams searchParams) {
		Page<ServiceListEntity> tmpdata = serviceService.selectAllByPage(searchParams.getSearchMap(),pageRequest);
		return buildSuccess(tmpdata);
	}
	
	@RequestMapping(value = "/allot", method = RequestMethod.POST)
	public @ResponseBody Object setAllot(HttpServletRequest request, HttpServletResponse response){
		String userid = request.getParameter("userid");
		String type = request.getParameter("type");
		String id = request.getParameter("billid");
		String reason = request.getParameter("reason");
		BillService service = serviceService.setAllot(userid, type, id, reason);
		return buildSuccess(service);
	}
	
	@RequestMapping(value = "/plan", method = RequestMethod.POST)
	public @ResponseBody Object setPlannedDate(HttpServletRequest request, HttpServletResponse response){
		String serviceid = request.getParameter("billid");
		String startDate = request.getParameter("startDate");
		String plannedDate = request.getParameter("plannedDate");
		BillService service = serviceService.setPlannedDate(serviceid, startDate, plannedDate);
		return buildSuccess(service);
	}
	/**
	 * 工程日志
	 * @param pageRequest
	 * @param searchParams
	 * @return
	 */
	@RequestMapping(value = "/log", method = RequestMethod.GET)
	public @ResponseBody Object selectLogByPage(PageRequest pageRequest, SearchParams searchParams) {
		Page<LogService> tmpdata = serviceService.selectLogByPage(pageRequest,searchParams.getSearchMap());
		return buildSuccess(tmpdata);
	}
	/**
	 * 根据工程id查询顾客、房屋
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/custom",method=RequestMethod.GET)
	public  @ResponseBody  Object selectByBillId(HttpServletRequest request,HttpServletResponse  response){
		String billid=request.getParameter("billid");
	    CustomerListEntity  custom=serviceService.selectByBillId(billid);
	    return buildSuccess(custom);
	}
	/**
	 * 查询工程的物料明细
	 * @param pageRequest
	 * @param searchParams
	 * @return
	 */
	@RequestMapping(value = "/material", method = RequestMethod.GET)
	public @ResponseBody Object selectServiceMaterial(PageRequest pageRequest, SearchParams searchParams){
		Page<BillOrderMaterialBody> page=serviceService.selectServiceMaterial(pageRequest, searchParams.getSearchMap());
		return buildSuccess(page);
	}
	/**
	 * 根据工程id查询工程状态
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/states",method=RequestMethod.GET)
	public  @ResponseBody  Object selectStates(HttpServletRequest request,HttpServletResponse  response){
		String billid=request.getParameter("billid");
	    return buildSuccess(serviceService.selectStates(billid));
	}
	
	/**
	 * 
	 * @param request
	 * @param reponse
	 * @return
	 */
	@RequestMapping(value = "/procedure", method = RequestMethod.GET)
	public @ResponseBody Object queryBodyByFK(HttpServletRequest request, HttpServletResponse reponse){		
		String billid=request.getParameter("billid");
		return buildSuccess(serviceService.queryBodyByFK(billid));
	}
	
}
