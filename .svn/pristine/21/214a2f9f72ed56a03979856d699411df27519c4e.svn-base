package com.ding.cms.web.controller;

import java.util.ArrayList;
import java.util.List;

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

import com.yonyou.iuap.system.web.controller.BaseController;
import com.ding.cms.entity.ItemMaterial;
import com.ding.cms.entity.Material;
import com.ding.cms.entity.Productitem;
import com.ding.cms.service.ProductItemService;
import com.yonyou.iuap.mvc.type.SearchParams;

@Controller
@RequestMapping(value = "/productitem")
public class ProductItemController   extends BaseController {
	@Autowired
	private ProductItemService productItemService;
	
    /**
    * 分页查询 ，list
    * @param pageRequest
    * @param searchParams
    * @return
    */
   @RequestMapping(value = "/page", method = RequestMethod.GET)
   public @ResponseBody Object page(PageRequest pageRequest, SearchParams searchParams) {
       Page<Productitem> itemdata = productItemService.selectAllByPage( searchParams.getSearchMap(),pageRequest);
       return buildSuccess(itemdata);
   }
   
   /**
    * 保存 编辑
    * @param list
    * @return
    */
   @RequestMapping(value = "/save", method = RequestMethod.POST)
   public @ResponseBody Object save(@RequestBody List<Productitem> list) {
	   Productitem productitem=list.get(0);
	   Productitem itemdata = productItemService.save(productitem);
       return buildSuccess(itemdata);
   }

   /**
    * 批量删除
    * @param list
    * @return
    */
   @RequestMapping(value = "/del", method = RequestMethod.POST)
   public @ResponseBody Object del(@RequestBody List<Productitem> list) {
	   productItemService.batchDeleteEntity(list);
	   return buildSuccess();
   }
   
   /**
    * 通过Id查询
    * @param id
    * @return
    */
   @RequestMapping(value = "/getByid", method = RequestMethod.POST)
   public @ResponseBody Object getByid(@RequestBody String id){
	   Productitem  productitem = productItemService.findById(id);
	   return buildSuccess(productitem);
   }
   
   /**
    * 通过code查询
    * @param code
    * @return
    */
   @RequestMapping(value = "/getBycode", method = RequestMethod.POST)
   public  @ResponseBody Object getBycode(@RequestBody String code){
	   List<Productitem>  list = productItemService.findByitemCode(code);
	   return buildSuccess(list);
   }
   
   /**
    * 根据细项id获取材料
    * @param request
    * @param response
    * @return
    */
   @RequestMapping(value = "/getItemMaterial", method = RequestMethod.GET)
   public @ResponseBody Object audit(HttpServletRequest request,HttpServletResponse response){
	   String itemid=request.getParameter("itemid");
	   List<ItemMaterial> list = productItemService.queryItemMaterial(itemid);
	   return buildSuccess(list);
   }
   
   /**
    * 批量保存 编辑 细项材料
    * @param list
    * @return
    */
   @RequestMapping(value = "/saveItemMaterial", method = RequestMethod.POST)
   public @ResponseBody Object setItemMaterial(HttpServletRequest request,HttpServletResponse response) {
	   String itemid = request.getParameter("itemid");
	   String list = request.getParameter("list");
	   JSONArray json = JSONArray.fromObject(list);
	   JSONObject object = null;
	   ItemMaterial itemMaterial = null;
	   List<ItemMaterial> itemMaterials = new ArrayList<ItemMaterial>();
	   for (int i = 0; i < json.size(); i++) {
		   object = JSONObject.fromObject(json.get(i));
		   itemMaterial = (ItemMaterial) JSONObject.toBean(object, ItemMaterial.class);
		   itemMaterials.add(itemMaterial);
	   }
	   productItemService.setItemMaterial(itemid,itemMaterials);
	   return buildSuccess();
   }
   
   /**
    * 批量 删除 细项材料
    * @param list
    * @return
    */
   @RequestMapping(value = "/deleteItemMaterial", method = RequestMethod.POST)
   public @ResponseBody Object deleteItemMaterial(@RequestBody List<ItemMaterial> list) {
	   productItemService.deleteItemMaterial(list);
       return buildSuccess();
   }
   
   /**
    * 分页查询 细项未选择的材料
    * @param pageRequest
    * @param searchParams
    * @return
    */
   @RequestMapping(value = "/materialforitem", method = RequestMethod.GET)
   public @ResponseBody Object queryUnselectedMaterialForItem(PageRequest pageRequest, SearchParams searchParams) {
       Page<Material> itemdata = productItemService.queryUnselectedMaterialForItem( pageRequest,searchParams.getSearchMap());
       return buildSuccess(itemdata);
   }
   
   /**
    * 将目前的细项绑定材料生成ItemMaterial
    */
   @RequestMapping(value = "/autocreateitemmaterial", method = RequestMethod.GET)
   public @ResponseBody Object autoCreateItemMaterial(HttpServletRequest request,HttpServletResponse response){
	   productItemService.autoCreateItemMaterial();
	   return buildSuccess();
   }
   
}
