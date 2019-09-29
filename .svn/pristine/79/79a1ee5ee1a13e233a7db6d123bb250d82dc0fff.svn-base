package com.ding.cms.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ding.cms.entity.Material;
import com.ding.cms.service.MaterialService;
import com.yonyou.iuap.mvc.type.SearchParams;
import com.yonyou.iuap.system.web.controller.BaseController;

@Controller
@RequestMapping(value = "/material")
public class MaterialController  extends BaseController {
	
	@Autowired
    private MaterialService materialService;
	
    /**
    * 分页查询 ，list
    * @param pageRequest
    * @param searchParams
    * @return
    */
   @RequestMapping(value = "/list", method = RequestMethod.GET)
   public @ResponseBody Object page(PageRequest pageRequest, SearchParams searchParams) {
       Page<Material> tmpdata = materialService.selectAllByPage( searchParams.getSearchMap(),pageRequest);
       return buildSuccess(tmpdata);
   }

   /**
    * 保存 编辑
    * @param list
    * @return
    */
   @RequestMapping(value = "/save", method = RequestMethod.POST)
   public @ResponseBody Object save(@RequestBody List<Material> list) {
   	Material material=list.get(0);
   	materialService.save(material);
       return buildSuccess();
   }

   /**
    * 删除
    * @param list
    * @return
    */
   @RequestMapping(value = "/del", method = RequestMethod.POST)
   public @ResponseBody Object del(@RequestBody List<Material> list) {
	   materialService.batchDeleteEntity(list);
   	return buildSuccess();
   }
   
   /**
    * 获取全部的材料，返回list<Material>
    * @param pageRequest
    * @param searchParams
    * @return
    */
   @RequestMapping(value = "/all", method = RequestMethod.GET)
   public @ResponseBody Object getAll(PageRequest pageRequest, SearchParams searchParams) {
       return materialService.getAll();
   }
}
