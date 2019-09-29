package com.ding.cms.repository;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import com.ding.cms.entity.Agent;
import com.ding.cms.entity.Reward;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;

@Repository
public class RewardDao {
	@Autowired
	private MetadataDAO metadataDAO;

	// 增加或修改一个奖励规则
	public Reward saveOrUpdate(Reward reward) {
		String id = reward.getRewardid();
		if (id == null)
			reward.setStatus(VOStatus.NEW);
		else
			reward.setStatus(VOStatus.UPDATED);
		metadataDAO.save(reward);
		return reward;
	}
	//删除一个奖励规则
	public void delete(Reward reward){
		metadataDAO.remove(reward);
	}
	//查询奖励规则分页（可按名称，业绩类型，奖励类型查看）
	public Page<Reward> selectByPage(PageRequest pageRequest, Map<String, Object> searchParams){
		StringBuilder sb=new StringBuilder();
		sb.append("select * from bd_reward ");
		SQLParameter sqlparam = new SQLParameter();
		sb.append(" where dr=0 and ");
        if (null != searchParams && !searchParams.isEmpty()) {
            for (String key : searchParams.keySet()){
            	if("searchParam".equals(key)){
            		sb.append(" name like ? and ");
            		sqlparam.addParam("%"+(String)searchParams.get(key)+"%");
            	}else if("id".equals(key)){
            		sb.append(" rewardid = ? and ");
            		sqlparam.addParam(searchParams.get(key));
            	}else if("performancetype".equals(key)){
            		sb.append(" performancetype = ? and ");
            		sqlparam.addParam((String)searchParams.get(key));
            	}else if("rewardtype".equals(key)){
            		sb.append(" rewardtype = ? and ");
            		sqlparam.addParam(searchParams.get(key));
            	}
            }
        }
        sb.delete(sb.length()-4, sb.length());
		return metadataDAO.queryPage(sb.toString(), sqlparam, pageRequest, Reward.class);
	}
}
