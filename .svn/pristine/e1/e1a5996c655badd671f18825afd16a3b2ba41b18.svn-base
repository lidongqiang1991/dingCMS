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

import com.ding.cms.entity.BillOrder;
import com.ding.cms.entity.BillOrderListEntity;
import com.ding.cms.entity.BillOrderMaterialBody;
import com.ding.cms.entity.BillOrderProductBody;
import com.ding.cms.entity.Product;
import com.ding.cms.service.BillOrderService;
import com.yonyou.iuap.mvc.type.SearchParams;
import com.yonyou.iuap.system.web.controller.BaseController;

@Controller
@RequestMapping(value = "/order")
public class BillOrderController extends BaseController{
	
	@Autowired
	private BillOrderService billOrderService;
	
	/**
    *
    * @param pageRequest
    * @param searchParams
    * @return
    */
   @RequestMapping(value = "/page", method = RequestMethod.GET)
   public @ResponseBody Object page(PageRequest pageRequest, SearchParams searchParams) {
       Page<BillOrderListEntity> tmpdata = billOrderService.selectAllByPage( searchParams.getSearchMap(),pageRequest);
       return buildSuccess(tmpdata);
   }
   
   /**
    * 物料明细
    * @param pageRequest
    * @param searchParams
    * @return
    */
   @RequestMapping(value="/material",method=RequestMethod.GET)
   public @ResponseBody Object selectMaterial(PageRequest pageRequest,SearchParams  searchParams){
	   Page<BillOrderProductBody> page=billOrderService.selectMaterialPage(searchParams.getSearchMap(), pageRequest);
	   return buildSuccess(page);
   }
   
   /**
    * 套餐详情BillOrderMaterialBody
    * @param pageRequest
    * @param searchParams
    * @return
    */
   @RequestMapping(value="/product",method=RequestMethod.GET)
   public @ResponseBody Object selectProduct(PageRequest pageRequest,SearchParams  searchParams){
	   Page<BillOrderMaterialBody> page=billOrderService.selectProductPage(searchParams.getSearchMap(), pageRequest);
	   return buildSuccess(page);
   }
   
   @RequestMapping(value = "/detail", method = RequestMethod.GET)
   public @ResponseBody Object detail(HttpServletRequest request, HttpServletResponse reponse){
	   String orderid=request.getParameter("orderid");
	   return buildSuccess(billOrderService.queryByPk(orderid));
   }
   
   @RequestMapping(value = "/cancel", method = RequestMethod.POST)
   public @ResponseBody Object cancelOrder(HttpServletRequest request, HttpServletResponse reponse){
	   String orderid=request.getParameter("orderid");
	   String reason=request.getParameter("reason");
	   String serviceid=request.getParameter("serviceid");
	   billOrderService.cancelOrder(serviceid,orderid,reason);
	   return buildSuccess();
   }
   
   @RequestMapping(value = "/list", method = RequestMethod.GET)
   public @ResponseBody List<BillOrder> listOrder(HttpServletRequest request, HttpServletResponse reponse){
	   String serviceid=request.getParameter("serviceid");
	   return billOrderService.listOrder(serviceid);
   }
   
   @RequestMapping(value = "/save", method = RequestMethod.POST)
   public @ResponseBody Object save(@RequestBody List<BillOrder> list) {
	   BillOrder order=list.get(0);
	   billOrderService.createOrder(order);
	   return buildSuccess(order);
   }
	
}
