package com.yonyou.iuap.system.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.system.entity.Org;

@Repository
public class SysOrgDao {
	
	@Autowired
	private MetadataDAO metadataDAO;
	
	/**
	 * 查询得到运营中心，
	 * @return
	 */
	public List<Org> getAll (){
		String sql = "SELECT * FROM `org` where parent_id='4958dae8-72a9-4136-9db0-b82099707ac7'";
		return metadataDAO.queryByClause(Org.class, sql);
	}
}
