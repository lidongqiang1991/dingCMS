package com.yonyou.iuap.system.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springside.modules.security.utils.Digests;
import org.springside.modules.utils.Encodes;

import com.ding.cms.entity.LogUser;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.persistence.bs.dao.DAOException;
import com.yonyou.iuap.persistence.bs.jdbc.meta.access.DASFacade;
import com.yonyou.iuap.system.entity.Org;
import com.yonyou.iuap.system.entity.SysUser;
import com.yonyou.iuap.system.repository.LogUserDao;
import com.yonyou.iuap.system.repository.SysUserDao;

@Service
public class SysUserService {
    private Logger logger = LoggerFactory.getLogger(SysUserService.class);
    public static final String HASH_ALGORITHM = "SHA-1";
	public static final int HASH_INTERATIONS = 1024;
	private static final int SALT_SIZE = 8;
    @Autowired
    private SysUserDao userDao;

    @Autowired
    private LogUserDao logUserDao;
 
    public SysUser findById(String id){
    	return userDao.findByUserId(id);
    }
    
    public SysUser findByLoginCode(String loginCode){
    	return userDao.findByLoginCode(loginCode);
    }
    
    @Transactional
    public SysUser save(SysUser entity) {
    	logger.debug("execute  SysUser save .");
    	entryptPassword(entity);
        SysUser sysuer = userDao.save(entity) ;
        if(!StringUtils.isEmpty(entity.getStatusname())){
			LogUser log=new LogUser();
			log.setMemo(entity.getStatusname());
			log.setRole("sysuser");
			log.setMemotype("1".equals(entity.getStatusid())?"移出黑名单":"加入黑名单");
			log.setUserid(sysuer.getId());
			log.setUsername(sysuer.getUsername());
			logUserDao.save(log);
		}
        return sysuer;
    }

    
    /**
     * 批量删除数据
     * @param list
     */
    @Transactional
    public void batchDeleteEntity(List<SysUser> list) {
        this.batchDelChild(list);
        userDao.batchDelete(list);
    }

    /**
     * 删除主表下面的子表数据
     * 
     * @param list
     * @throws DAOException
     */
    private void batchDelChild(List<SysUser> list) throws DAOException {
        userDao.batchDelChild(list);
    }

    /**
     * 根据传递的参数，进行分页查询
     */
    public Page<SysUser> selectAllByPage(Map<String, Object> searchParams, PageRequest pageRequest) {
    	Page<SysUser> pageResult = userDao.selectAllByPage(pageRequest, searchParams) ;
    	this.setRefName(pageResult) ;
        return pageResult;
    }
    
    /** 用户任职表里面 需要显示参照 名字 字段， 这里进行转换 */
    private Page<SysUser> setRefName(Page<SysUser> pageResult) {
        if (pageResult != null && pageResult.getContent() != null && pageResult.getContent().size() > 0) {
			/**
			 * 上面的 orgid.orgname orgid表示参照对应的外键属性名， orgname是参照实体对应的属性名，
			 * */
			Map<String, Map<String, Object>> refMap =
                    DASFacade.getAttributeValueAsPKMap(new String[] {"orgid.orgname"}, pageResult
                            .getContent().toArray(new SysUser[] {}));
            for (SysUser user : pageResult.getContent()) {
                String userId = user.getId();
                Map<String, Object> userRefMap = refMap.get(userId);
                if (userRefMap != null) {
                    user.setOrgname((String) userRefMap.get("orgid.orgname"));
                }
            }
        }
        return pageResult;
    }

    /**
     * 根据编码查询
     * @param code
     * @return
     */
    public List<SysUser> findByUserCode(String code) {
    	 return userDao.findByUserCode(code ) ;
    }
    
    public List<SysUser> findUserForAdd(String code,String mobile,String email) {
    	return userDao.findUserForAdd(code,mobile,email ) ;
    }

    /**
     * 查询除某个id外，是否存在相同编码的 实体 ，用于更新实体时验证重复
     * @param code
     * @param id
     * @return
     */
    public List<SysUser> findByUserCode(String code, String id) {
    	 return userDao.findByUserCode(code, id) ;
    }
    
    public List<SysUser> findUserForEdit(String code,String mobile,String email, String id) {
    	return userDao.findUserForEdit(code,mobile,email, id) ;
    }

    
    /**
     * 查询用户参照的   所有组织，以树形展示
     * @return
     */
    public List<Org> findAllOrg() {
    	logger.debug("execute findAll when data is less");
        return userDao.findAllOrg() ;
    }
	/**
	 * 设定安全的密码，生成随机的salt并经过1024次 sha-1 hash
	 */
	private void entryptPassword(SysUser user) {
		if(user.getUserpassword().equals("●●●●●●●●")){
			user.setUserpassword(findById(user.getId()).getUserpassword());
		}else{
			byte[] salt = Digests.generateSalt(SALT_SIZE);
			user.setRemark(Encodes.encodeHex(salt));
			byte[] hashPassword = Digests.sha1(user.getUserpassword().getBytes(), salt, HASH_INTERATIONS);
			user.setUserpassword(Encodes.encodeHex(hashPassword));
		}
	}
	
	/**
     * 根据传递的参数，进行分页查询
     */
    public Page<SysUser> selectAllByPageForAllot(Map<String, Object> searchParams, PageRequest pageRequest) {
    	SysUser user=(SysUser)InvocationInfoProxy.getExtendAttribute("currentUser");
    	if("总部-平台管理员".equals(user.getLevelname())){
        	Page<SysUser> pageResult = userDao.selectAllByPage(pageRequest, searchParams) ;
        	this.setRefName(pageResult) ;
            return pageResult;
    	}else{    		
    		searchParams.put("org", user.getOrgid());
    		Page<SysUser> pageResult = userDao.selectAllByPage(pageRequest, searchParams) ;
    		this.setRefName(pageResult) ;
    		return pageResult;
    	}
    }
	/**
	 * 修改密码
	 */
	public Map savePassword(SysUser user,String oldPassword,String newPassword) {
		Map<String, Object> map=new HashMap<String, Object>();
		String[] list=new String[2];
		if (oldPassword!=null && user != null && newPassword !=null) {
			byte[] hashPassword = Digests.sha1(oldPassword.getBytes(), Encodes.decodeHex(user.getRemark()), 1024);
			String checkPwd = Encodes.encodeHex(hashPassword);
			if(checkPwd.equals(user.getUserpassword())){
				user.setUserpassword(newPassword);
				entryptPassword(user);
				userDao.save(user);
				list[0]="0";
				list[1]="OK,密码保存成功!";
			}else{
				list[0]="1";
				list[1]="原密码输入错误!";
			}
		}else {
			list[0]="2";
			list[1]="传入数据有误!";
		}
		map.put("state",list);
		return map;
	}
	
	public List<SysUser> findUserByAgent(String agentid){
		return userDao.findUserByAgent(agentid);
	}
	
	public SysUser getUserInfo(){
		return userDao.getUserInfo();
	}
	
}
