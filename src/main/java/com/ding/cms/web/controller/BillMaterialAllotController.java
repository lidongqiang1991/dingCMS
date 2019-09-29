package com.ding.cms.web.controller;

import java.util.List;

import com.yonyou.iuap.system.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ding.cms.entity.BillMaterialAllot;
import com.ding.cms.entity.BillOrder;
import com.ding.cms.service.BillMaterialAllotService;
import com.yonyou.iuap.mvc.type.JsonResponse;

@Controller
@RequestMapping(value = "/mallot")
public class BillMaterialAllotController extends BaseController {

	@Autowired
	private BillMaterialAllotService maService;
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	 public @ResponseBody Object save(@RequestBody List<BillMaterialAllot> list) {
		BillMaterialAllot allot = list.get(0);
		return buildSuccess(maService.createMaterialAllot(allot));
	}

}
