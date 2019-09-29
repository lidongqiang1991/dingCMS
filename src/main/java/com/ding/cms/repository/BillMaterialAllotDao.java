package com.ding.cms.repository;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.alibaba.druid.util.StringUtils;
import com.ding.cms.entity.BillMaterialAllot;
import com.ding.cms.entity.BillMaterialAllotB;
import com.ding.cms.entity.BillService;
import com.ding.cms.service.BillOrderService;
import com.ding.cms.service.ServiceService;
import com.ding.cms.util.DateUtils;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;
import com.yonyou.iuap.system.entity.SysUser;

@Repository
public class BillMaterialAllotDao {
	
	@Autowired
	private MetadataDAO metaDao;
	@Autowired
	private BillOrderService orderService;
	@Autowired
	private ServiceService serviceService;
	
	/**
	 * 创建或修改物料分配
	 */
	public BillMaterialAllot createAllot (BillMaterialAllot allot){
		SysUser u=(SysUser)InvocationInfoProxy.getExtendAttribute("currentUser");
		//add
		if(StringUtils.isEmpty(allot.getMaterialallotid())){
			allot.setStatus(VOStatus.NEW);
			allot.setMaterialallotid(UUID.randomUUID().toString());
			allot.setOrgid(u.getOrgid());
			allot.setOrgname(u.getOrgname());
			allot.setCreator(u.getUsername());
			allot.setCreatorid(u.getId());
			allot.setCreatetime(DateUtils.currentTimestampToString());
		}
		//edit
		else{			
			allot.setStatus(VOStatus.UPDATED);
			allot.setModifierid(u.getId());
			allot.setModifier(u.getUsername());
			allot.setModifytime(DateUtils.currentTimestampToString());
		}
		if(allot.getId_billmaterialallotb()!=null&&allot.getId_billmaterialallotb().size()>0){
			for(BillMaterialAllotB allotDetail : allot.getId_billmaterialallotb()){
				if(StringUtils.isEmpty(allotDetail.getMaterialallotbid())){
					allotDetail.setStatus(VOStatus.NEW);
				}else{
					allotDetail.setStatus(VOStatus.UPDATED);
				}
                allotDetail.setFk_id_billmaterialallotb(allot.getMaterialallotid());
                allotDetail.setMaterialallotid(allot.getMaterialallotid());
				orderService.updateOrderMaterialAllocatedNum(allotDetail.getOrderid(), allotDetail.getMaterialallotbid(), allotDetail.getAllotnum());
				serviceService.changeState(allot.getServiceid(), "materialstate", BillService.MATERIAL_STATE_01);
				//验证是否修改工程未完工
				BillService service = metaDao.queryByPK(BillService.class, allot.getServiceid());
				serviceService.serviceChangeToFinish(service);
			}
			metaDao.save(allot, allot.getId_billmaterialallotb().toArray(new BillMaterialAllotB[allot.getId_billmaterialallotb().size()]));
			
		}
		else{
			metaDao.save(allot);
		}
		return allot;
	}
}
