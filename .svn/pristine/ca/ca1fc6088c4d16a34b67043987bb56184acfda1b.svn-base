package com.yonyou.iuap.system.repository;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.processor.MapListProcessor;

@Repository
public class PhoneCheckDao {
	
	@Autowired
    private MetadataDAO metadataDAO;
	
	public Map<String, String> checkPhone(String telphone){
		String sql = "select * from v_phone where phone = '"+telphone+"'";
		List<Object> list= metadataDAO.queryForList(sql, new MapListProcessor());
		if(list!=null&&list.size()>0){
			return (Map<String, String>)list.get(0);
		}else{
			return null;
		}
		
	}
	public Map<String, String> checkPhone(String telphone,String id){
		String sql = "select * from v_phone where phone = '"+telphone+"' and id <> '"+id+"'";
		List<Object> list= metadataDAO.queryForList(sql, new MapListProcessor());
		if(list!=null&&list.size()>0){
			return (Map<String, String>)list.get(0);
		}else{
			return null;
		}
		
	}
	
	public Map<String, String> checkPhone(String telphone,String id,String type){
		String sql=null;
		if(id==null)sql = "select * from v_phone where phone = '"+telphone+"' and type <> '"+type+"'";
		else sql = "select * from v_phone where phone = '"+telphone+"' and id <> '"+id+"' and type <> '"+type+"'";
		List<Object> list= metadataDAO.queryForList(sql, new MapListProcessor());
		if(list!=null&&list.size()>0){
			return (Map<String, String>)list.get(0);
		}else{
			return null;
		}
		
	}
}








