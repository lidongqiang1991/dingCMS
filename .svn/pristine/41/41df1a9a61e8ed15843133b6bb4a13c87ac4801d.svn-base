package com.yonyou.iuap.system.web.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

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

import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.iweb.datatable.annotation.IWebParameter;
import com.yonyou.iuap.iweb.entity.DataTable;
import com.yonyou.iuap.iweb.entity.Row;
import com.yonyou.iuap.iweb.event.EventResponse;
import com.yonyou.iuap.mvc.type.SearchParams;
import com.yonyou.iuap.system.entity.SysroleVo;
import com.yonyou.iuap.system.service.SysRoleService;
import com.yonyou.iuap.system.validator.RoleValidator;

@Controller
@RequestMapping(value = "/sysrole")
public class SysRoleController extends BaseController{
	
	@Autowired
	private SysRoleService sysRoleService;
	
	@Autowired
	private RoleValidator validator;
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
    public @ResponseBody Object getAll(PageRequest pageRequest, SearchParams searchParams) {
        return sysRoleService.getAll();
    }
	
//	@RequestMapping(value = "/page", method = RequestMethod.POST)
//    @ResponseBody
//    public EventResponse page(@IWebParameter(id = "roleDa") DataTable<SysroleVo> dataTable,
//            @IWebParameter EventResponse response) {
//        int pageNumber = 0;
//        if (dataTable.getPageIndex() != null) {
//            pageNumber = dataTable.getPageIndex();
//        }
//        Map<String, Object> searchParamMap = createSearchParamsStartingWith(dataTable, "search_");
//        Page<SysroleVo> result =
//        		sysRoleService.selectAllByPage(new PageRequest(pageNumber, dataTable.getPageSize(),
//                        new Sort(Sort.Direction.DESC, "id")), searchParamMap);
//        dataTable.setPageData(pageNumber, result.getContent(), result.getTotalPages(),
//                result.getTotalElements());
//        return response;
//    }
	
	@RequestMapping(value = "/page", method = RequestMethod.GET)
    public @ResponseBody Object page(PageRequest pageRequest, SearchParams searchParams) {
        Page<SysroleVo> tmpdata = sysRoleService.selectByPage( pageRequest,searchParams.getSearchMap());
        return buildSuccess(tmpdata);
    }
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
    public @ResponseBody Object save(@RequestBody List<SysroleVo> list) {
		SysroleVo entity=list.get(0);
		if(entity.getRoleid()!=null&&!"".equals(entity.getRoleid())){
			validator.validEdit(entity);
    	}else{
    		validator.validAdd(entity);	
    	}
        entity.setCreator(InvocationInfoProxy.getUsername());
		sysRoleService.save(entity);
        return buildSuccess();
    }
	
	@RequestMapping(value = "/del", method = RequestMethod.POST)
	public @ResponseBody Object del(@RequestBody List<SysroleVo> list) {
		sysRoleService.delete(list);
		return buildSuccess();
	}
	
	private Map<String, Object> createSearchParamsStartingWith(DataTable dataTable, String prefix) {
        Map<String, Object> params = new HashMap<String, Object>();
        Map<String, Object> dtParam = dataTable.getParams();
        Set<Map.Entry<String, Object>> set = dtParam.entrySet();
        for (Map.Entry<String, Object> entry : set) {
            String key = entry.getKey();
            if (key.startsWith(prefix)) {
                String unprefixed = key.substring(prefix.length());
                params.put(unprefixed, entry.getValue().toString());
            }
        }
        return params;
    }
    @RequestMapping(value = "/power", method = RequestMethod.POST)
    public @ResponseBody Object power(HttpServletRequest request, HttpServletResponse response) {
    	String roleid=request.getParameter("roleid");
    	
    	String funs=request.getParameter("funs");
    	sysRoleService.power(roleid, funs);
        return buildSuccess();
    }
    /**
     * 后端创建行
     * 
     * @param sysDictTypeDataTable
     * @param response
     * @return
     */
    @RequestMapping(value = "/createRow", method = RequestMethod.POST)
    @ResponseBody
    public EventResponse createRow(@IWebParameter(id = "roleDa") DataTable<SysroleVo> sysRoleDataTable,
            @IWebParameter EventResponse response) {
    	SysroleVo role = new SysroleVo();
    	sysRoleDataTable.add(role);
        return response;
    }
    
    /**
     * 行编辑datatable 实现。增删改实现。
     * 
     * @param sysDictTypeDataTable
     * @param response
     * @return
     */
    @RequestMapping(value = "/tsave", method = RequestMethod.POST)
    @ResponseBody
    public EventResponse tableSave(@IWebParameter(id = "roleDa") DataTable<SysroleVo> roleDataTable,
            @IWebParameter EventResponse response) {
        List<SysroleVo> addList = new ArrayList<>();
        List<SysroleVo> updateList = new ArrayList<>();
        List<SysroleVo> removeList = new ArrayList<>();
        Row[] rows = roleDataTable.getAllPagesRow();
        for (int i = 0; i < rows.length; i++) {
            String status = rows[i].getStatus();

            // 此处调用asDataTransferObject，会在字段修改的时候，联动修改datatable的row的值
            
            SysroleVo item = roleDataTable.asDataTransferObject(rows[i]);
            if (Row.STATUS_NEW.equals(status)) {
                addList.add(item);
                rows[i].setStatus(Row.STATUS_UPD);
            } else if (Row.STATUS_UPD.equals(status)) {
                updateList.add(item);
            } else if (Row.STATUS_FDEL.equals(status) || Row.STATUS_DEL.equals(status)) {
                removeList.add(item);
                rows[i].setStatus(Row.STATUS_DEL);
            }
        }
        sysRoleService.save(addList, updateList, removeList);
        return response;
    }
}
