package com.yonyou.iuap.system.validator;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.yonyou.iuap.iweb.exception.ValidException;
import com.yonyou.iuap.persistence.vo.pub.util.StringUtil;
import com.yonyou.iuap.system.entity.SysUser;
import com.yonyou.iuap.system.entity.SysUserJob;
import com.yonyou.iuap.system.entity.SysroleVo;
import com.yonyou.iuap.system.service.SysRoleService;

/**
 * 角色校验器 Created by jiawei
 */
@Component
public class RoleValidator {
	
	@Autowired
	private SysRoleService sysRoleService;
	
	/**保存时候校验 */
    public void validAdd( SysroleVo  sysroleVo) {
        List<SysroleVo> res = sysRoleService.findRoleForAdd(sysroleVo.getRolecode(),sysroleVo.getRolename());
        if(res!=null && res.size()>0){
        	throw new ValidException("存在重复数据");
        }
    }
    
    /**更新时候校验 */
    public void validEdit( SysroleVo  sysroleVo) {
        List<SysroleVo> res = sysRoleService.findRoleForEdit(sysroleVo.getRolecode(),sysroleVo.getRolename(),sysroleVo.getRoleid());
        if(res!=null && res.size()>0){
        	throw new ValidException("存在重复数据");
        }
    }
    
}
