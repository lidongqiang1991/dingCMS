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
import com.yonyou.iuap.system.entity.Message;
import com.yonyou.iuap.system.service.MessageService;
/**
 * 系统消息模块
 * @author xyb
 *
 */
@Controller
@RequestMapping(value="/message")
public class MessageController  extends BaseController{
	@Autowired
	private MessageService messageService;
	
	/**
	 * 根据查询条件进行分页查询
	 * @param pageRequest
	 * @param searchParams
	 * @return
	 */
	 @RequestMapping(value = "/list", method = RequestMethod.GET)
	   public @ResponseBody Object page(PageRequest pageRequest, SearchParams searchParams) {
	       Page<Message> tmpdata = messageService.selectAllByPage( searchParams.getSearchMap(),pageRequest);
	       return buildSuccess(tmpdata);
	   }
	 
	 /**
	  * 查询所有的
	  * @return
	  */
	 @RequestMapping(value="/all",method=RequestMethod.GET)
	 public @ResponseBody Object get(PageRequest pageRequest, SearchParams searchParams){
		  //List<Message> list=messageService.selectAll();
		  return messageService.selectAll();
	 }
	   /**
	    * 标记为已读
	    * @param request
	    * @param response
	    * @return
	    */
	   @RequestMapping(value = "/updateread",method = RequestMethod.POST)
	   public @ResponseBody Object updateRead(HttpServletRequest request,HttpServletResponse response){
		   String messageids = request.getParameter("messageids");
		   messageService.updateRead(messageids);
		   return buildSuccess();
	   }
	   /**
	    * 标记为未读
	    * @param request
	    * @param response
	    * @return
	    */
	   @RequestMapping(value="/updateunread",method=RequestMethod.POST)
	   public @ResponseBody Object updateUnRead(HttpServletRequest request,HttpServletResponse response){
	      String messageids = request.getParameter("messageids");
          messageService.updateUnRead(messageids);
          return buildSuccess();
	   }
	   /**
	    * 发送系统消息
	    * @param request
	    * @param response
	    * @return
	    */
	   @RequestMapping(value="/sendmessage",method=RequestMethod.POST)
	   public @ResponseBody Object sendMessage(HttpServletRequest request,HttpServletResponse response){
		   String title=request.getParameter("title");
		   String content=request.getParameter("content");
		   String url=request.getParameter("url");
		   String receiverid=request.getParameter("receiverid");
		   //String receiverid="cb25e7e7-2c78-400c-954b-9a8815ca0da5";
		   messageService.sendMessage(title, receiverid, content, url);
		   return buildSuccess();
	   }
	 
}
