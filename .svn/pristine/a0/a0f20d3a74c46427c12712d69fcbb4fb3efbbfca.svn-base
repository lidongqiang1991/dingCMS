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
import com.yonyou.iuap.system.entity.Procedure;
import com.yonyou.iuap.system.entity.Procedurebody;
import com.yonyou.iuap.system.service.ProcedureService;

@Controller
@RequestMapping(value= "/procedure")
public class ProcedureController extends BaseController{

	@Autowired
	private ProcedureService service;
	
    /**
    *
    * @param pageRequest
    * @param searchParams
    * @return
    */
   @RequestMapping(value = "/list", method = RequestMethod.GET)
   public @ResponseBody Object page(PageRequest pageRequest, SearchParams searchParams) {
	   Page<Procedure> tmpdata = service.selectAllByPage( searchParams.getSearchMap(),pageRequest);
       return buildSuccess(tmpdata);
   }

   @RequestMapping(value = "/save", method = RequestMethod.POST)
   public @ResponseBody Object save(@RequestBody List<Procedure> list) {
	   Procedure procedure=list.get(0);
	   service.save(procedure);
       return buildSuccess(procedure);
   }

   @RequestMapping(value = "/batchDel", method = RequestMethod.POST)
   public @ResponseBody Object del(@RequestBody List<Procedure> list) {
	    service.batchDeleteEntity(list);
   	    return buildSuccess();
   }
   
	@RequestMapping(value = "/del", method = RequestMethod.GET)
	public @ResponseBody Object addAllot(HttpServletRequest request, HttpServletResponse reponse){
		String procedureid=request.getParameter("procedureid");
		service.delById(procedureid);
		return buildSuccess();
	}
	
	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	public @ResponseBody Object detail(HttpServletRequest request, HttpServletResponse reponse){
		String procedureid=request.getParameter("procedureid");
		return buildSuccess(service.queryByPk(procedureid));
	}

    @RequestMapping(value = "/listall", method = RequestMethod.GET)
    public @ResponseBody Object list() {
        List<Procedure> tmpdata = service.selectList();
        return tmpdata;
    }
}
