package com.yonyou.iuap.system.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.persistence.vo.pub.util.StringUtil;
import com.yonyou.iuap.system.entity.SysroleVo;
import com.yonyou.iuap.system.repository.SysRoleDao;

@Service
public class SysRoleService {
	
	@Autowired
    private SysRoleDao sysRoleDao;
	
	public List<SysroleVo> getAll(){
		return sysRoleDao.getAll();
	}
	
//	public Page<SysroleVo> selectAllByPage(PageRequest pageRequest, Map<String, Object> searchParams){
//		return sysRoleDao.selectAllByPage(pageRequest, searchParams);
//	}
	
	public Page<SysroleVo> selectByPage(PageRequest pageRequest, Map<String, Object> searchParams){
		return sysRoleDao.selectByPage(pageRequest, searchParams);
	}
	
	public SysroleVo save(SysroleVo entity){
		return sysRoleDao.save(entity);
	}
	
	public void delete(List<SysroleVo> list){
		sysRoleDao.delete(list);
	}
	public void power(String roleid,String funs){
		sysRoleDao.power(roleid, funs);
	}
	
    /**
     * 批量保存，更新，删除方法
     * 
     * @param addList
     * @param updateList
     * @param removeList
     */
    @Transactional
    public void save(List<SysroleVo> addList, List<SysroleVo> updateList, List<SysroleVo> removeList) {
        if (CollectionUtils.isNotEmpty(addList)) {
            for (SysroleVo role : addList) {
//            	role.setRole_id(UUID.randomUUID().toString());
                if (role.getCreatetime() == null) {
                    role.setCreatetime(new Date());
                }
                // 从InvocationInfoProxy获取值
                if (StringUtil.isEmpty(role.getCreator())) {
                    role.setCreator(InvocationInfoProxy.getUsername());
                }
//                dictType.setCreatorid(InvocationInfoProxy.getUserid());
                role.setDr(0);
                sysRoleDao.save(role);
            }
           
        }
        if (CollectionUtils.isNotEmpty(updateList)) {
            for (SysroleVo role : updateList) {
                // 从InvocationInfoProxy获取值
            	 role.setCreator(InvocationInfoProxy.getUsername());
            }
            sysRoleDao.update(updateList);
        }
        if (CollectionUtils.isNotEmpty(removeList)) {
           sysRoleDao.delete(removeList);
        }
    }
    
    public List<SysroleVo> findRoleForAdd(String code , String name){
    	return sysRoleDao.findRoleForAdd(code, name);
    }
    
    public List<SysroleVo> findRoleForEdit(String code , String name , String roleid){
    	return sysRoleDao.findRoleForEdit(code, name , roleid);
    }
}
