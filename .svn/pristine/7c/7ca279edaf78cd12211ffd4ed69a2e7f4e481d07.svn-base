package com.ding.cms.web.controller;

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

import com.ding.cms.entity.Payment;
import com.ding.cms.service.PaymentService;
import com.yonyou.iuap.mvc.type.SearchParams;
import com.yonyou.iuap.system.web.controller.BaseController;

@Controller
@RequestMapping(value = "/payment")
public class PaymentController extends BaseController {
	@Autowired
	private PaymentService paymentService;
	
    /**
    * 分页查询 ，list
    * @param pageRequest
    * @param searchParams
    * @return
    */
   @RequestMapping(value = "/page", method = RequestMethod.GET)
   public @ResponseBody Object page(PageRequest pageRequest, SearchParams searchParams) {
       Page<Payment> itemdata = paymentService.selectAllByPage( searchParams.getSearchMap(),pageRequest);
       return buildSuccess(itemdata);
   }
   
   /**
    * 分页查询 ，list
    * @param pageRequest
    * @param searchParams
    * @return
    */
   @RequestMapping(value = "/flow", method = RequestMethod.GET)
   public @ResponseBody Object pageForContract(PageRequest pageRequest, SearchParams searchParams) {
       Page<Payment> itemdata = paymentService.selectAllByPageForContract( searchParams.getSearchMap(),pageRequest);
       return buildSuccess(itemdata);
   }
   
   /**
    * 审核调用的controller
    * @param request
    * @param response
    * @return
    */
   @RequestMapping(value = "/audit", method = RequestMethod.POST)
   public @ResponseBody Object audit(HttpServletRequest request,HttpServletResponse response){
	   String paymentid=request.getParameter("paymentid");
	   String auditstate=request.getParameter("auditstate");
	   String auditnote=request.getParameter("auditnote");
	   return buildSuccess(paymentService.audit(paymentid, auditstate, auditnote));
   }
   
   /**
    * 保存 编辑
    * @param list
    * @return
    */
   @RequestMapping(value = "/save", method = RequestMethod.POST)
   public @ResponseBody Object save(@RequestBody List<Payment> list) {
	   Payment payment=list.get(0);
	   Payment paymentdata = paymentService.save(payment);
       return buildSuccess(paymentdata);
   }

   /**
    * 批量删除
    * @param list
    * @return
    */
   @RequestMapping(value = "/del", method = RequestMethod.POST)
   public @ResponseBody Object del(@RequestBody List<Payment> list) {
	   paymentService.batchDeleteEntity(list);
	   return buildSuccess();
   }
   
   /**
    * 通过Id查询
    * @param id
    * @return
    */
   @RequestMapping(value = "/getByid", method = RequestMethod.POST)
   public @ResponseBody Object getByid(@RequestBody String id){
	   Payment  payment = paymentService.findById(id);
	   return buildSuccess(payment);
   }
   
   /**
    * 通过code流水号查询
    * @param code
    * @return
    */
   @RequestMapping(value = "/getBycode", method = RequestMethod.POST)
   public  @ResponseBody Object getBycode(@RequestBody String code){
	   List<Payment>  list = paymentService.findByitemCode(code);
	   return buildSuccess(list);
   }
   
   /**
    * 审核调用的controller
    * @param request
    * @param response
    * @return
    */
   @RequestMapping(value = "/changestate", method = RequestMethod.POST)
   public @ResponseBody Object paymentChangeState(HttpServletRequest request,HttpServletResponse response){
	   String paymentid=request.getParameter("paymentid");
	   int state=Integer.parseInt(request.getParameter("auditstate"));
	   String memo=request.getParameter("memo");
	   paymentService.paymentChangeState(paymentid,state,memo);
	   return buildSuccess();
   }
   
}
