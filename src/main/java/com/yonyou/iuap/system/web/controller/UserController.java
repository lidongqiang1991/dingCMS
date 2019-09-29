package com.yonyou.iuap.system.web.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springside.modules.security.utils.Digests;
import org.springside.modules.utils.Encodes;

import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.mvc.type.SearchParams;
import com.yonyou.iuap.system.entity.SysUser;
import com.yonyou.iuap.system.service.SysUserService;
import com.yonyou.iuap.system.validator.SysUserValidator;

@Controller
@RequestMapping(value = "/user")
public class UserController extends BaseController {
    private static Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private SysUserService userService;

    @Autowired
    private SysUserValidator validtor;

    /**
     *
     * @param pageRequest
     * @param searchParams
     * @return
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public @ResponseBody Object page(PageRequest pageRequest, SearchParams searchParams) {
        Page<SysUser> tmpdata = userService.selectAllByPage( searchParams.getSearchMap(),pageRequest);
//        Page<Telbook> data = telbookservice.selectInstit(tmpdata);
        return buildSuccess(tmpdata);
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public @ResponseBody Object save(@RequestBody List<SysUser> list) {
    	SysUser user=list.get(0);
    	if(user.getId()!=null&&!"".equals(user.getId())){
    		validtor.validUpdate(user);
    	}else{
    		validtor.validAdd(user);	
    	}
        
        userService.save(user);
        return buildSuccess();
    }

    @RequestMapping(value = "/del", method = RequestMethod.POST)
    public @ResponseBody Object del(@RequestBody List<SysUser> list) {
    	userService.batchDeleteEntity(list);
    	return buildSuccess();
    }

    @RequestMapping(value = "/info", method = RequestMethod.GET)
    public @ResponseBody Object getUserInfo(HttpServletRequest request, HttpServletResponse response) {
    	SysUser user= userService.getUserInfo();
    	//增加权限数据
        return user;
    }
//    /** 查询枚举值 */
//    @RequestMapping(value = "/loadEnum", method = RequestMethod.GET)
//    @ResponseBody
//    public Object loadEnum() throws Exception {
//        Map<String, List<EnumVo>> map = EnumUtils.loadEnum(Sex.class);
//        return super.buildMapSuccess(map);
//    }
    
    /**
    *
    * @param pageRequest
    * @param searchParams
    * @return
    */
   @RequestMapping(value = "/queryUserForAllot", method = RequestMethod.GET)
   public @ResponseBody Object queryForAllot(PageRequest pageRequest, SearchParams searchParams) {
       Page<SysUser> tmpdata = userService.selectAllByPageForAllot( searchParams.getSearchMap(),pageRequest);
       return buildSuccess(tmpdata);
   }
   
   
   /**
   *修改密码
   * @param pageRequest
   * @param searchParams
   * @return
   */
  @RequestMapping(value = "/password", method = RequestMethod.POST)
  public @ResponseBody Object savePassword(HttpServletRequest request, HttpServletResponse response) {
	  String oldPassword=request.getParameter("oldPassword");
	  String newPassword=request.getParameter("newPassword");
	  SysUser user=userService.findById(InvocationInfoProxy.getUserid().toString());
      return buildSuccess(userService.savePassword(user,oldPassword,newPassword));
  }
  
  @RequestMapping(value = "/agentUser", method = RequestMethod.GET)
  public @ResponseBody Object findUserByAgent(HttpServletRequest request, HttpServletResponse response) {
	  String agentid=request.getParameter("agentid");
	  List<SysUser> users = userService.findUserByAgent(agentid);
	  return buildSuccess(users);
  }
  
}
