package com.ding.cms.repository;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ding.cms.entity.Material;
import com.ding.cms.entity.Productitem;
import com.ding.cms.service.ProductItemService;
import com.ding.cms.service.ProductService;
import com.ding.cms.util.DateUtils;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.iweb.exception.ValidException;
import com.yonyou.iuap.persistence.bs.dao.DAOException;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;
import com.yonyou.iuap.system.entity.SysroleVo;
/**
 * 材料操作dao层
 * @author WZW
 *
 */
@Repository
public class MaterialDao {
    @Autowired
    private MetadataDAO metadataDAO;
    @Autowired
    private ProductItemService productItemService;
    
    /**
     * 分页查询方法
     * @param pageRequest
     * @param searchParams
     * @return
     * @throws DAOException
     */
    public Page<Material> selectAllByPage(PageRequest pageRequest, Map<String, Object> searchParams) throws DAOException {
   	 String sql = " select * from bd_material "; // left join org on sys_user.org_id=org.org_id 
   	 StringBuilder sb = new StringBuilder();
   	 sb.append( sql );
   	 SQLParameter sqlparam = new SQLParameter();
   	 if (null != searchParams && !searchParams.isEmpty()) { 
   		 sb.append(" where ");
   		 
   		 for(Map.Entry<String, Object> entry : searchParams.entrySet() ){
   			 if(entry.getKey().equalsIgnoreCase("searchParam")){
   				 sb.append(" ( name like ? OR code like ? ) AND ");
   		        	for (int i = 0; i < 2; i++) {
   		            sqlparam.addParam("%" + entry.getValue() + "%");
   		          }
   			 }
   		 }
   		 sb.delete(sb.length()-4, sb.length());
   		 sql=sb.toString();
   	 }
   	 return metadataDAO.queryPage(sql, sqlparam, pageRequest, Material.class);
   }
    
    /**
     * 保存和编辑
     * @param entity
     * @return
     */
    @Transactional
    public Material save(Material entity) {
    	if(entity.getId() ==null ){
    		 entity.setStatus(VOStatus.NEW);
    		 entity.setId(UUID.randomUUID().toString());
             entity.setCreatorid(InvocationInfoProxy.getUserid());
             entity.setCreator(InvocationInfoProxy.getUsername());
             entity.setCreatetime(DateUtils.currentTimestampToString());
             entity.setDr(0);// 未删除标识
    	}else{
    		entity.setStatus(VOStatus.UPDATED);
    		//当材料修改时更改细项信息
    		//productItemService.setItemByPrice(entity);
    	}
    	metadataDAO.save(entity);
    	return entity ;
    }
    
    /**
     * 批量删除
     * @param list
     * @throws DAOException
     */
    public void batchDelete(List<Material> list) throws DAOException {
    	//判断物料是否被引用
        String  sql ="select  *  from  bd_productitem  where  materialid = '"+list.get(0).getId()+"'";
        List<Productitem>  li=metadataDAO.queryByClause(Productitem.class, sql);
        if(li.isEmpty()){
        	metadataDAO.remove(list);
        }else{
        	throw new ValidException("物料已被引用，无法删除。");
        }
    }
    
    /**
     * 
     * @param id
     * @return
     * @throws DAOException
     */
    public Material findById(String id) throws DAOException {

        String sql = "SELECT * FROM bd_material where id=?";
        SQLParameter sqlparam = new SQLParameter();
        sqlparam.addParam(id);
        return  metadataDAO.queryByPK(Material.class, id);
    }
    public List<Material> findByCode(String code) throws DAOException {

        String sql = "SELECT * FROM bd_material where code=?";
        SQLParameter sqlparam = new SQLParameter();
        sqlparam.addParam(code);
        return  metadataDAO.queryByClause(Material.class, sql, sqlparam);
    }
    
    /**
     * 获取全部Material
     * @return
     */
    public List<Material> getAll(){
		return metadataDAO.queryAll(Material.class);
	}
    
}
