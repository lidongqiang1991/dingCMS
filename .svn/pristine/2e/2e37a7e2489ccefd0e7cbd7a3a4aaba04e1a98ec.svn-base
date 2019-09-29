package com.ding.cms.web.controller;

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

import com.ding.cms.entity.Agent;
import com.ding.cms.entity.BillService;
import com.ding.cms.entity.Construction;
import com.ding.cms.entity.Contract;
import com.ding.cms.entity.ContractMain;
import com.ding.cms.service.ContractService;
import com.yonyou.iuap.mvc.type.SearchParams;
import com.yonyou.iuap.system.web.controller.BaseController;

@Controller
@RequestMapping(value = " /contract ")
public class ContractController extends BaseController{
	
	@Autowired
	private ContractService contractService;
	/**
	 * 分页查询
	 * @param pageRequest
	 * @param searchParams
	 * @return
	 */
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody Object page(PageRequest pageRequest, SearchParams searchParams) {
		Page<Contract> tmpdata = contractService.selectAllByPage(pageRequest, searchParams.getSearchMap());
		return buildSuccess(tmpdata);
	}
	
	/**
	 * 更新合同,发票,保单  生产单据号
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public @ResponseBody Object update(HttpServletRequest request, HttpServletResponse response) {
		String contractid = request.getParameter("contractid");
		String contractType = request.getParameter("contractType");
		String docunum = request.getParameter("docunum");
		Contract contract =  contractService.update(contractid, contractType, docunum);
		return buildSuccess(contract);
	}
	
	/**
	 * 更新合同信息
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/photo", method = RequestMethod.POST)
	public @ResponseBody Object setAllot(HttpServletRequest request, HttpServletResponse response){
		String contractid = request.getParameter("contractid");
		String key = request.getParameter("key");
		String value = request.getParameter("value");
		contractService.changeValue(contractid, key, value);
		return buildSuccess();
	}

	
	/**
	 * 
	 * @param list
	 * @return
	 */
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public @ResponseBody Object save(@RequestBody List<Contract> list){
		Contract entity = list.get(0);
		contractService.save(entity);
        return buildSuccess(entity);
	}
	
	/**
	 * 修改合同（委托方、通讯地址、身份证号）
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/updateContract", method = RequestMethod.POST)
	public @ResponseBody  Object  updateContract(HttpServletRequest request, HttpServletResponse response){
		String contractid = request.getParameter("contractid");
		String clientname = request.getParameter("clientname");
		String postaladdress = request.getParameter("postaladdress");
		String idnumber = request.getParameter("idnumber");
		contractService.updateCobtract(contractid, clientname, postaladdress,idnumber);
		return buildSuccess();
	}
	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	public @ResponseBody Object detail(HttpServletRequest request, HttpServletResponse response){
		String contractid = request.getParameter("contractid");
		ContractMain main=contractService.getContractInfoById(contractid);
		
		return buildSuccess(main);
	}
	
	/**
	 * 批量上传文件
	 * @return
	 */
	@RequestMapping(value = "/batchUp", method = RequestMethod.POST)
	public @ResponseBody Object batchUpFile(HttpServletRequest request, HttpServletResponse response,String object){
		List<Map<String, String>> maps =  (List<Map<String, String>>) JSONArray.toCollection(JSONArray.fromObject(object), Map.class);
		String msg = contractService.batchChangeValue(maps);
		return buildSuccess(msg);
	}

}
