package com.ding.cms.repository;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import com.alibaba.druid.util.StringUtils;
import com.ding.cms.entity.Product;
import com.ding.cms.entity.Productbody;
import com.ding.cms.util.DateUtils;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.persistence.bs.dao.DAOException;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.jdbc.framework.util.SQLHelper;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;
import com.yonyou.iuap.system.entity.SysUser;

@Repository
public class ProductDao {

	@Autowired
	private MetadataDAO metaDao;
	
	public Product findById(String productid){
		return metaDao.queryByPK(Product.class, productid);
	}
	
	public List<Productbody> findChildById(String productid){
		return metaDao.queryByClause(Productbody.class, " select * from bd_product_b where productid='"+productid+"'");
	}
	
	public Product save(Product product){
		SysUser u=(SysUser)InvocationInfoProxy.getExtendAttribute("currentUser");
		//add
		if(StringUtils.isEmpty(product.getProductid())){
			product.setStatus(VOStatus.NEW);
			product.setProductid(UUID.randomUUID().toString());
			product.setOrgid(u.getOrgid());
			product.setOrgname(u.getOrgname());
			product.setCreator(u.getUsername());
			product.setCreatorid(u.getId());
			product.setCreatetime(DateUtils.currentTimestampToString());
		}
		//edit
		else{
			product.setStatus(VOStatus.UPDATED);
			product.setModifierid(u.getId());
			product.setModifier(u.getUsername());
			product.setModifytime(DateUtils.currentTimestampToString());
			delChildByPId(product.getId_productbody(),product.getProductid());
		}
		if(product.getId_productbody()!=null&&product.getId_productbody().size()>0){
			for (Productbody body : product.getId_productbody()) {
				if(StringUtils.isEmpty(body.getProductbid())){
					body.setStatus(VOStatus.NEW);
				}else{
					body.setStatus(VOStatus.UPDATED);
				}
				body.setFk_id_productbody(product.getProductid());
				body.setProductid(product.getProductid());
			}
			metaDao.save(product, product.getId_productbody().toArray(new Productbody[product.getId_productbody().size()]));
		}
		else{
			metaDao.save(product);
		}
		return product;
	}
	
	
	public Page<Product> selectAllByPage(PageRequest request,Map<String, Object> searchParams){
		StringBuilder sb=new StringBuilder();
		sb.append(" select * from bd_product ");
		SQLParameter params=new SQLParameter();
		if(searchParams!=null&&!searchParams.isEmpty()){
			sb.append(" where ");
			for (Map.Entry<String, Object> entry : searchParams.entrySet()) {
				String key=entry.getKey();
				String value=(String)entry.getValue();
				if(key.equals("searchParam")){
					sb.append(" (productcode like ? or productname like ?) and ");
					params.addParam("%"+value+"%");
					params.addParam("%"+value+"%");
				}
			}
			
			sb.delete(sb.length()-4, sb.length());
		}
		return metaDao.queryPage(sb.toString(), params, request, Product.class);
	}
	
	public Page<Productbody> selectAllBodyByPage(PageRequest request,Map<String, String> searchParams){
		StringBuilder sb=new StringBuilder();
		sb.append(" select * from bd_product_b ");
		SQLParameter params=new SQLParameter();
		if(searchParams!=null&&!searchParams.isEmpty()){
			sb.append(" where ");
			for (Map.Entry<String, String> entry : searchParams.entrySet()) {
				String key=entry.getKey();
				String value=entry.getValue();
				if(key.equals("searchParam")){
					sb.append(" itemname like ?  and ");
					params.addParam("%"+value+"%");
				}
				else if (key.equals("productid")){
					sb.append(" productid = ? and ");
					params.addParam(value);
				}
			}
			sb.delete(sb.length()-4, sb.length());
		}
		return metaDao.queryPage(sb.toString(), params, request, Productbody.class);
	}	
    public void batchDelete(List<Product> list) throws DAOException {
    	metaDao.remove(list);
    }
    
    public void batchDelChild(List<Product> list) throws DAOException {
        SQLParameter sqlparam = new SQLParameter();
        String deleteSQL = SQLHelper.createDeleteIn("bd_product_b", "fk_id_productbody", list.size());
        for (Product pro : list) {
            sqlparam.addParam(pro.getProductid());
        }
        metaDao.update(deleteSQL, sqlparam);
    }
    //删除表体中删除的数据
	public void delChildByPId(List<Productbody> productbodys,String productbid) throws DAOException {
		if (productbodys != null && productbodys.size() > 0) {
			SQLParameter sqlparam = new SQLParameter();
			for (Productbody productbody : productbodys) {
				sqlparam.addParam(productbody.getProductbid());
			}
			String delsql = SQLHelper.createDeleteIn("bd_product_b", "productbid",
					productbodys.size());
			StringBuilder delsql_=new StringBuilder(delsql.replace("in", "NOT IN"));
			delsql_.append(" and productid= "+"'"+productbid+"'");
			metaDao.update(delsql_.toString(), sqlparam);
		}
	}
	
	/**
	 * 返回未选择产品，分页返回
	 */
	public Object unselectedProduct(PageRequest request,Map<String, Object> searchParams){
		StringBuilder sb=new StringBuilder();
		sb.append(" select * from bd_product where dr = 0 ");
		SQLParameter sqlparam = new SQLParameter();
		if(searchParams!=null&&!searchParams.isEmpty()){
			sb.append(" and ");
			for (Map.Entry<String, Object> entry : searchParams.entrySet()) {
				String key=entry.getKey();
				String value=(String)entry.getValue();
				if (value.equals("-1")) {
                    continue;
                }
                if (StringUtils.isEmpty(value)) {
                    continue;
                }
				if(key.equals("productids")){
					String[] ids = value.split(",");
					sb.append(SQLHelper.createInPart(ids.length, "productid"));
					for(int i=0;i<ids.length;i++){       			
		       			sqlparam.addParam(ids[i]);
		       		}
					sb.append(" and ");
				}
			}
			
			sb.delete(sb.length()-4, sb.length());
			String sq = sb.toString().replace("in", "not in");
			return metaDao.queryPage(sq, sqlparam, request, Product.class);
		}
		return metaDao.queryPage(sb.toString(), sqlparam, request, Product.class);
	}
	
	/**
	 * 返回选择产品，列表返回
	 */
	public List<Product> selectedProduct(String productids){
		StringBuilder sb=new StringBuilder();
		sb.append(" select * from bd_product where dr = 0 ");
		if(!StringUtils.isEmpty(productids)){
			SQLParameter sqlparam = new SQLParameter();
			String[] ids = productids.split(",");
			sb.append(" and ");
			sb.append(SQLHelper.createInPart(ids.length, "productid"));
			for(int i=0;i<ids.length;i++){       			
       			sqlparam.addParam(ids[i]);
       		}
			return metaDao.queryByClause(Product.class, sb.toString(), sqlparam);
		}
		return metaDao.queryByClause(Product.class, sb.toString());
	}
	
	
}
