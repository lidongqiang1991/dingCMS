package com.ding.cms.web.controller;

import java.util.List;
import java.util.Map;

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

import com.ding.cms.entity.Settlement;
import com.ding.cms.service.SettlementService;
import com.yonyou.iuap.mvc.type.SearchParams;
import com.yonyou.iuap.system.web.controller.BaseController;

@Controller
@RequestMapping(value = "/settlement")
public class SettlementController extends BaseController {
	@Autowired
	private SettlementService settlementService;
	
    /**
    * 分页查询 ，list
    * @param pageRequest
    * @param searchParams
    * @return
    */
   @RequestMapping(value = "/page", method = RequestMethod.GET)
   public @ResponseBody Object page(PageRequest pageRequest, SearchParams searchParams) {
       Page<Settlement> itemdata = settlementService.selectAllByPage( searchParams.getSearchMap(),pageRequest);
       return buildSuccess(itemdata);
   }
  
   
   /**
    * 保存 编辑
    * @param list
    * @return
    */
   @RequestMapping(value = "/save", method = RequestMethod.POST)
   public @ResponseBody Object save(@RequestBody List<Settlement> list) {
	   Settlement settlement=list.get(0);
	   Settlement settlementdata = settlementService.save(settlement);
       return buildSuccess(settlementdata);
   }

   /**
    * 批量删除
    * @param list
    * @return
    */
   @RequestMapping(value = "/del", method = RequestMethod.POST)
   public @ResponseBody Object del(@RequestBody List<Settlement> list) {
	   settlementService.batchDeleteEntity(list);
	   return buildSuccess();
   }
   
   /**
    * 通过Id查询
    * @param id
    * @return
    */
   @RequestMapping(value = "/getByid", method = RequestMethod.POST)
   public @ResponseBody Object getByid(@RequestBody String id){
	   Settlement  settlement = settlementService.findById(id);
	   return buildSuccess(settlement);
   }
   
   /**
    * 通过id查询总金额
    * @param billid  
    * @return
    */
   @RequestMapping(value="/findByBillid",method=RequestMethod.GET)
   public @ResponseBody  Object  findByBillid(HttpServletRequest request) {
	   return buildSuccess(settlementService.findByBillid(request.getParameter("billid"),request.getParameter("type")));
   }
   
}
