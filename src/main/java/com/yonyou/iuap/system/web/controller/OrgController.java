package com.yonyou.iuap.system.web.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.yonyou.iuap.system.entity.Org;
import com.yonyou.iuap.system.service.OrgService;
import com.yonyou.iuap.system.validator.OrgValidator;

/**
 * <p>
 * Title: InstitController
 * </p>
 * <p>
 * Description:
 * </p>
 * 
 * @author zhukai
 */

@Controller
@RequestMapping(value = "/org")
public class OrgController extends BaseController {
    public static Logger logger = LoggerFactory.getLogger(OrgController.class);

    @Autowired
    private OrgService orgService;

    @Autowired
    private OrgValidator validtor;

    /**
     * 获取机构列表
     * 
     * @return
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public @ResponseBody Object loadTree() {
        List<Org> data = orgService.selectAll();
        return buildSuccess(data);
    }

    /**
     * 根据父节点获取子节点
     * 
     * @param pid
     * @return
     */
    @RequestMapping(value = "/findByFid", method = RequestMethod.GET)
    public @ResponseBody Object findByFid(@RequestBody String pid) {
        List<Org> data = orgService.findByFid(pid);
        return buildSuccess(data);
    }

    /**
     * 保存机构
     * 
     * @param list
     * @return
     */
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public @ResponseBody Object save(@RequestBody List<Org> list) {
        validtor.valid(list);
        orgService.save(list);
        return buildSuccess();
    }

    /**
     * 删除机构
     * 
     * @param list
     * @return
     */
    @RequestMapping(value = "/del", method = RequestMethod.POST)
    public @ResponseBody Object del(@RequestBody List<Org> list) {
    	orgService.batchDeleteByPrimaryKey(list);
        return buildSuccess();
    }
    
    /**
     * 获取所有的机构列表
     * 
     * @return
     */
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public @ResponseBody Object getAllorg(){
    	return orgService.getAllOrg();
    }

    /**
     *根据当前登录者，获取运营中心和运营商列表信息
     * @return
     */
    @RequestMapping(value = "/agent", method = RequestMethod.GET)
    public @ResponseBody Object getList(){
        return orgService.getList();
    }
}
