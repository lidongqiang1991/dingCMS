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

import com.ding.cms.entity.Product;
import com.ding.cms.service.ProductService;
import com.yonyou.iuap.mvc.type.SearchParams;
import com.yonyou.iuap.system.web.controller.BaseController;

@Controller
@RequestMapping(value= "/product")
public class ProductController  extends BaseController{

	@Autowired
	private ProductService service;
	
    /**
    *
    * @param pageRequest
    * @param searchParams
    * @return
    */
   @RequestMapping(value = "/list", method = RequestMethod.GET)
   public @ResponseBody Object page(PageRequest pageRequest, SearchParams searchParams) {
       Page<Product> tmpdata = service.selectAllByPage( searchParams.getSearchMap(),pageRequest);
       return buildSuccess(tmpdata);
   }

   @RequestMapping(value = "/save", method = RequestMethod.POST)
   public @ResponseBody Object save(@RequestBody List<Product> list) {
	   	Product product=list.get(0);
   		service.save(product);
      return buildSuccess(product);
   }

   @RequestMapping(value = "/batchDel", method = RequestMethod.POST)
   public @ResponseBody Object del(@RequestBody List<Product> list) {
	   service.batchDeleteEntity(list);
   	return buildSuccess();
   }
   
	@RequestMapping(value = "/del", method = RequestMethod.GET)
	public @ResponseBody Object addAllot(HttpServletRequest request, HttpServletResponse reponse){
		String productid=request.getParameter("productid");
		service.delById(productid);
		return buildSuccess();
	}
	
	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	public @ResponseBody Object detail(HttpServletRequest request, HttpServletResponse reponse){
		String productid=request.getParameter("productid");
		return buildSuccess(service.queryByPk(productid));
	}
	
	@RequestMapping(value = "/unselectedproduct", method = RequestMethod.GET)
	public @ResponseBody Object selectedProduct(PageRequest pageRequest, SearchParams searchParams){
		return buildSuccess(service.unselectedProduct(searchParams.getSearchMap(),pageRequest));
	}
	
	@RequestMapping(value = "/selectedproduct", method = RequestMethod.GET)
	public @ResponseBody Object selectedProduct(HttpServletRequest request, HttpServletResponse reponse){
		String productids=request.getParameter("productids");
		return buildSuccess(service.selectedProduct(productids));
	}
	
}
