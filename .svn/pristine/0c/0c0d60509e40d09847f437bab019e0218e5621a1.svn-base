package com.ding.cms.repository;

import java.io.File;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ding.cms.entity.Construction;
import com.ding.cms.entity.CustomerListEntity;
import com.ding.cms.entity.LogOrderNote;
import com.ding.cms.util.Constants;
import com.ding.cms.util.DateUtils;
import com.ding.cms.util.QRCodeUtil;
import com.ding.cms.util.QiniuFileUtil;
import com.ding.cms.util.SMSYuHongUtil;
import com.qiniu.common.QiniuException;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.iweb.exception.ValidException;
import com.yonyou.iuap.persistence.bs.dao.DAOException;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.jdbc.framework.processor.MapListProcessor;
import com.yonyou.iuap.persistence.jdbc.framework.processor.MapProcessor;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;
import com.yonyou.iuap.system.entity.SysUser;
import com.yonyou.iuap.system.service.OrgService;
import com.yonyou.iuap.system.service.PhoneCheckService;

@Repository
public class ConstructionDao {

	@Autowired
	private MetadataDAO metadataDAO;
	@Autowired
	private OrgService orgService;
    @Autowired
    private PhoneCheckService phoneCheckService;

	public Page<Construction> selectAllByPage(PageRequest pageRequest,
			Map<String, Object> searchParams) throws DAOException {
		String sql = " select * from bd_construction where dr =0 ";
		StringBuilder sb = new StringBuilder();
		sb.append(sql);
		SQLParameter sqlparam = new SQLParameter();
		if (searchParams.entrySet() != null
				&& !searchParams.entrySet().isEmpty()) {
			sb.append(" and ");
			for (Entry<String, Object> key : searchParams.entrySet()) {
				if ("searchParam".equals(key.getKey())) {
					sb.append(" teamname like ?  or  phone like ? and ");
					sqlparam.addParam("%" + key.getValue() + "%");
					sqlparam.addParam("%" + key.getValue() + "%");
					if ("id".equals(key.getKey()))
						sb.append(" and ");
				}
				if ("id".equals(key.getKey())) {
					sb.append(" id = ? and ");
					sqlparam.addParam(key.getValue());
				}
				if("blstatus".equals(key.getKey())){
					sb.append(" blstatus = ? and ");
					sqlparam.addParam(key.getValue());
				} 
			}
			sb.delete(sb.length()-4, sb.length());
		}
		sb.append(orgService.getTrueData(Construction.class));
		Page<Construction> tempData=metadataDAO.queryPage(sb.toString(),sqlparam, pageRequest, Construction.class);
		List<Construction> constructions= tempData.getContent();
		for (int i = 0; i < constructions.size(); i++) {
			String sql_ = "SELECT AVG(rate) rate FROM v_rate where constructionid = ?";
			SQLParameter sqlparam_ = new SQLParameter();
			sqlparam_.addParam(constructions.get(i).getId());
			List<Map> list= metadataDAO.queryForList(sql_,sqlparam_, new MapListProcessor());
			Object obj=list.get(0).get("rate");
			if(obj!=null){
				double dou =(double)obj*20;
				Double doub=(double)Math.round(dou*100)/100;//两位小数
				constructions.get(i).setRate(Double.toString(doub));
			}
		}
		return tempData;
	}

	@Transactional
	public Construction save(Construction entity) {
		SysUser user = (SysUser) InvocationInfoProxy.getExtendAttribute("currentUser");
		String id =null;
		String flag = entity.getId();
		
		if (entity.getId() == null) {
    		Map map=phoneCheckService.checkPhone(entity.getPhone());
            if(map!=null && !map.isEmpty()){
            	throw new ValidException("存在重复手机号");
            }
			id= UUID.randomUUID().toString();
			entity.setStatus(VOStatus.NEW);
			entity.setId(id);
			entity.setBlstatus(0);
			entity.setCreatetime(DateUtils.currentTimestampToString());
			entity.setCreator(user.getUsername());
			entity.setCreatorid(user.getId());
			entity.setAgent(user.getOrgname());
			entity.setAgentid(user.getOrgid());
			entity.setDr(0);// 未删除标识
		} else {
    		Map map=phoneCheckService.checkPhone(entity.getPhone(),entity.getId());
            if(map!=null && !map.isEmpty()){
            	throw new ValidException("存在重复手机号");
            }
			entity.setStatus(VOStatus.UPDATED);
		}
		metadataDAO.save(entity);
		try {
			if (flag==null) {
				//新建工队时生成二维码，发段短信
				String message =Constants.MESSAGE_ADD_CONSTRUCTION;
				String downloadHost =Constants.QINIU_DOWNLOAD_HOST; 
				String constructioninfo=Constants.MESSAGE_CONSTRUCTIONINFO;
				message = message.replace("agent", user.getOrgname());
				message = message.replace("photourl", downloadHost+"/"+entity.getId());
				//SMSYuHongUtil.sendSMS(message, entity.getPhone());//发送短信
				String tempOutPutPath = this.getClass().getResource("").getFile()+entity.getId()+".jpg";//本地临时图片
				QRCodeUtil.zxingCodeCreate(constructioninfo+ entity.getId(), 300, 300, tempOutPutPath, "jpg");
				File outPutImage = new File(tempOutPutPath);
				QiniuFileUtil.upload(outPutImage, entity.getId());
				outPutImage.delete();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return entity;
	}

	@Transactional
	public void delete(List<Construction> list) throws DAOException {
		metadataDAO.remove(list);
	}
	
	
	public Map show(String id) throws DAOException {
		String sql = " select * from bd_construction  bc  LEFT JOIN  "
				+"(SELECT AVG(rate) rate,constructionid FROM v_rate GROUP BY constructionid )"
				+" vr on bc.id =vr.constructionid  where dr =0 and id =?";
		StringBuilder sb = new StringBuilder();
		sb.append(sql);
		SQLParameter sqlparam = new SQLParameter();
		sqlparam.addParam(id);
		Map map= metadataDAO.queryForObject(sql,sqlparam, new MapProcessor());
		return map;
	}

}
