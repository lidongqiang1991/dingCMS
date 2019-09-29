package com.ding.cms.web.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ding.cms.service.BoardService;
import com.yonyou.iuap.system.web.controller.BaseController;

@Controller
@RequestMapping(value = "/board")
public class BoardController extends BaseController{

	@Autowired
	private BoardService boardService;
	
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public @ResponseBody Object page(HttpServletRequest request, HttpServletResponse reponse) {
		String month=request.getParameter("month");
		Map result=boardService.getBoardData(month);
		if(result!=null){
			return buildSuccess(result);
		}else{
			return buildGlobalError("data is null");
		}
        
    }
}
