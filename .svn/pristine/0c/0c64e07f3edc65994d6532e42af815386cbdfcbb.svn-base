package com.ding.cms.repository;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.ding.cms.entity.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.druid.util.StringUtils;
import com.ding.cms.service.AdvancedFilterService;
import com.ding.cms.util.DateUtils;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.persistence.bs.dao.DAOException;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.jdbc.framework.processor.MapListProcessor;
import com.yonyou.iuap.persistence.jdbc.framework.processor.MapProcessor;
import com.yonyou.iuap.persistence.vo.pub.VOStatus;
import com.yonyou.iuap.system.service.OrgService;

@Repository
public class ContractDao {
	
	@Autowired
	private MetadataDAO metadataDAO;
	@Autowired
	private  OrgService orgService;
	@Autowired
	private  com.yonyou.iuap.system.service.LogService  logService;
	@Autowired
	private AdvancedFilterService advancedFilterService;
	/**
	 * 分页查询
	 * 
	 * @param pageRequest
	 * @param searchParams
	 * @return
	 * @throws DAOException
	 */
	public Page<Contract> selectAllByPage(PageRequest pageRequest,Map<String, Object> searchParams) throws DAOException {
		//String sql = " select * from bd_contract ";
		StringBuilder sb = new StringBuilder();
		sb.append( "select bs.paidamount ,bs.totalamount, bs.constructionname, bs.servicestate,bcus.`name`,bcus.phone,bcon.*,IFNULL(bp.discount,0) discount,IFNULL(bp.refund,0) refund,"+ 
				"IFNULL(bp.transfer,0) transfer,IFNULL(bs.totalamount-bp.discount,0) afterdiscount  from bd_contract bcon LEFT JOIN" +
				" bd_customer bcus on bcon.customerid=bcus.customerid " +
				" LEFT JOIN bill_service bs ON bcon.serviceid=bs.billid "+
				" LEFT JOIN (SELECT bsp.billid,MAX(CASE bsp.type WHEN 0 THEN bsp.discount ELSE 0 END ) as alreadypay,MAX(CASE bsp.type WHEN 1 THEN bsp.discount ELSE 0 END ) as discount,"+ 
				" MAX(CASE bsp.type WHEN 2 THEN bsp.discount ELSE 0 END ) as refund,MAX(CASE bsp.type WHEN 3 THEN bsp.discount ELSE 0 END ) as transfer FROM "+
				" (select SUM(paymoney) discount,p.billid,p.type from bill_service_payment p  where p.dr=0 and p.auditstate=1  GROUP BY p.billid,p.type) bsp GROUP BY bsp.billid ) bp on bcon.serviceid = bp.billid "+
				" where bcon.dr = 0"  );
		String sqlpro="bcon.";
		SQLParameter sqlParameter = new SQLParameter();
		if(null != searchParams && !searchParams.isEmpty()) {
			sb.append(" and ");
			for(Map.Entry<String, Object> entry : searchParams.entrySet()) { 
				String key=entry.getKey();
				String value=(String)entry.getValue();
				if(value.equals("-1")){
					continue;
				}
				if(StringUtils.isEmpty(value)){
					continue;
				}
				//组织
				else if("orgname".equals(key)){
                    sb.append(orgService.getTrueDataName(Contract.class,value,"bcon."));
				}
				//运营商
				else if("agentname".equals(key)){
					sb.append(sqlpro+"agentid"+" =? and ");
					sqlParameter.addParam(value);
				}
				//工程状态
				else if("servicestate".equals(key)){
					sb.append("bs."+key+" =? and ");
					sqlParameter.addParam(value);
				}
				//付款状态
				else if("paystate".equals(key)){
					sb.append("bs."+key+" =? and ");
					sqlParameter.addParam(value);
				}
				//合同状态
				else if("contractstate".equals(key)){
					if("已上传".equals(value)){
						sb.append( sqlpro+"contractphoto is not null and ");
					}else if("未上传".equals(value)){
						sb.append(sqlpro+"contractphoto is null and ");
					}else if("已寄出".equals(value)){
						sb.append(sqlpro+"contractmailstate =? and ");
						sqlParameter.addParam(value);
					}else if("未寄出".equals(value)){
						sb.append(sqlpro+"contractmailstate =? and ");
						sqlParameter.addParam(value);
					}
				}
				//发票
				else if("invoicestate".equals(key)){
					if("已上传".equals(value)){
						sb.append(sqlpro+"invoicephoto is not null and ");
					}else if("未上传".equals(value)){
						sb.append(sqlpro+"invoicephoto is null and ");
					}else if("已寄出".equals(value)){
						sb.append(sqlpro+"invoicemailstate =? and ");
						sqlParameter.addParam(value);
					}else if("未寄出".equals(value)){
						sb.append(sqlpro+"invoicemailstate =? and ");
						sqlParameter.addParam(value);
					}
				}
				//保单
				else if("policystate".equals(key)){
					if("已上传".equals(value)){
						sb.append(sqlpro+"policyphoto is not null and ");
					}else if("未上传".equals(value)){
						sb.append(sqlpro+"policyphoto is null and ");
					}else if("已寄出".equals(value)){
						sb.append(sqlpro+"policymailstate =? and ");
						sqlParameter.addParam(value);
					}else if("未寄出".equals(value)){
						sb.append(sqlpro+"policymailstate =? and ");
						sqlParameter.addParam(value);
					}
				}
				//搜索框
				else if(entry.getKey().equalsIgnoreCase("searchParam")){
					sb.append(" ( bcon.contractcode like ? OR bcus.name like ?  or bcus.phone like ? or bs.constructionname like ?  ) AND ");
					sqlParameter.addParam("%" + entry.getValue() + "%");
					sqlParameter.addParam("%" + entry.getValue() + "%");
					sqlParameter.addParam("%" + entry.getValue() + "%");
					sqlParameter.addParam("%" + entry.getValue() + "%");
				}
				//竣工单（contractelecvers）
				else if("completionformstate".equals(key)){
					if("已上传".equals(value)){
						sb.append(sqlpro+"contractelecvers is not null and ");
					}else if("未上传".equals(value)){
						sb.append(sqlpro+"contractelecvers is null and ");
					}/*else if("已寄出".equals(value)){
						sb.append(sqlpro+"contractelecvers =? and ");
						sqlParameter.addParam(value);
					}else if("未寄出".equals(value)){
						sb.append(sqlpro+"policymailstate =? and ");
						sqlParameter.addParam(value);
					}*/
				}
				//筛选时间
				else  if(key.equals("startTime")){
					sb.append("bcon.createtime >=  ?  and ");
					sqlParameter.addParam(value+" 00:00:00");
				    }
				else if(key.equals("endTime")){
				    	sb.append("bcon.createtime <=  ? and ");
						sqlParameter.addParam(value+" 23:59:59");
					}
				else if ("filterid".equals(key)){					
					Map map = advancedFilterService.createSqlByFilterid(value, sqlParameter);
					sb.append(map.get("sql"));
					sqlParameter = (SQLParameter) map.get("parameter");
				}
				else if ("filter".equals(key)){					
					Map map = advancedFilterService.createSqlByFilter(value, sqlParameter);
					sb.append(map.get("sql"));
					sqlParameter = (SQLParameter) map.get("parameter");
				}
	
			}
			sb.delete(sb.length()-4, sb.length());
		}

        sb.append(orgService.getTrueData(Contract.class,"bcon."));
		sb.append("order by bcon.createtime  desc");
		return metadataDAO.queryPage(sb.toString(), sqlParameter, pageRequest, Contract.class);
	}
	
	/** 
	 * 更新合同状态，生成单据号
	 * @param contractid  合同id
	 * @param contractType  传入参数
	 * @param docunum  号
	 * @return
	 */
	@Transactional
    public Contract update(String contractid, String contractType, String docunum) {
    	Contract contract = metadataDAO.queryByPK(Contract.class, contractid);
    	if("contract".equals(contractType)){
    		contract.setContractdocunum(docunum);//合同单据
    		if(docunum==null||"".equals(docunum))contract.setContractmailstate("未寄出");//状态
			else contract.setContractmailstate("已寄出");
    		//contract.setContrac
    	}else if("invoice".equals(contractType)){
			if(docunum==null||"".equals(docunum))contract.setInvoicemailstate("未寄出");//状态
			else contract.setInvoicemailstate("已寄出");
    		contract.setInvoicedocunum(docunum);//发票单据号
    		//
    	}else if("policy".equals(contractType)){
			if(docunum==null||"".equals(docunum))contract.setPolicymailstate("未寄出");//状态
			else contract.setPolicymailstate("已寄出");
    		contract.setPolicydocunum(docunum);//保单单据号
    		//contract.setContractphoto(newContractphoto);
    	}else if("picc".equals(contractType)){
			contract.setPicc(docunum);//保单号
		}
    	contract.setStatus(VOStatus.UPDATED);
    	metadataDAO.update(contract);
    	return contract;
    }
    
	
	/**
	 * 存储合同模块的图片
	 * @param contractid
	 * @param key
	 * @param value
	 */
	public void changeValue(String contractid , String key , String value){
		//Contract contract = metadataDAO.queryByPK(Contract.class, contractid);
		//if(contract!=null){
		if("invoicephoto".equals(key)){
			if(!StringUtils.isEmpty(value)){				
				String sql = "UPDATE bd_contract  SET invoicestate='"+Contract.INVOICE_STATE_02+"' where contractid = '"+contractid+"'";
				metadataDAO.update(sql);
			}else{
				String sql = "UPDATE bd_contract  SET invoicestate='"+Contract.INVOICE_STATE_01+"' where contractid = '"+contractid+"'";
				metadataDAO.update(sql);
			}
		}
		String sql = "UPDATE bd_contract  SET "+key+"='"+value+"' where contractid = '"+contractid+"'";
		metadataDAO.update(sql);
		//}
	}
	
	public int updateFilePath(String contractcode , String key , String value){
		String sql = "UPDATE bd_contract SET "+key+" = IF("+key+"='','"+value+"',CONCAT(IF("+key+" IS NULL,'',CONCAT("+key+",',')),'"+value+"')) where contractcode='"+contractcode+"'";
		return metadataDAO.update(sql);
	}

	/**
     * 保存
     * @param entity
     * @return
     */
    @Transactional
    public Contract save(Contract entity) {
    	if(entity.getContractid() ==null ){
    		 entity.setStatus(VOStatus.NEW);
             entity.setCreator(InvocationInfoProxy.getUsername());
             entity.setCreatetime(DateUtils.currentTimestamp());
             entity.setContractmailstate("未寄出");
             entity.setInvoicemailstate("未寄出");
             entity.setPolicymailstate("未寄出");
             entity.setContractelecvers("查看");
             //entity.setOrgid(user.getOrgid());
             //entity.setOrgname(user.getOrgname());
             entity.setDr(0);// 未删除标识
    	}else{
    		entity.setStatus(VOStatus.UPDATED);
    	}
    	metadataDAO.save(entity);
    	return entity ;
    }
    
    /**
     * 更新合同
     * @param contractid
     * @param clientname  委托方
     * @param postaladdress  通讯地址
     * @param idnumber  身份证号 
     */
    public  void  updateCobtract(String contractid,String clientname , String postaladdress,String idnumber){
    	String sql="update  bd_contract set clientname  ='"+clientname+"' , postaladdress ='"+postaladdress+"', idnumber='"+idnumber+"' where contractid = '"+contractid+"'";
    	if(!StringUtils.isEmpty(contractid)){
        	Contract contract=metadataDAO.queryByPK(Contract.class, contractid);
        	String username=InvocationInfoProxy.getUsername();
        	//插入日志
        	logService.insertlog("合同","修改合同",username+"修改合同编号为:"+contract.getContractcode()+"中的委托方为"+clientname+",通讯地址为"+(postaladdress==null?"":postaladdress)+",身份证号为"+(idnumber==null?"":idnumber));
    	}
    	metadataDAO.update(sql);
    }
    
    //合同详情
    public ContractMain getContractInfoById(String contractid){
    	String sql1=  "select b1.itemname,b1.num,b1.price,ifnull(b1.amount,0) amount,pro.type part, ifnull(pb.type,2) type from bill_order_b1 b1"
    			+ " left join bill_order bill on b1.fk_id_billorderproductbody=bill.billid and bill.dr=0 and bill.state IS NULL "
    			+ "	left join bill_service service on service.billid=bill.serviceid"
    			+ "	left join bd_product pro on pro.productid=bill.productid"
    			+ "	left join bd_product_b pb on pb.itemid=b1.itemid and pb.productid=bill.productid"
    			+ "	left join bd_contract cont on cont.serviceid=service.billid"
    			+ "	where cont.contractid='"+contractid+"'"
    			+ "	order by pb.type"
    			+ "";
    	
    	StringBuffer sb=new StringBuffer();
    	sb.append("select cu.name,cu.phone,cont.clientname,cont.idnumber,cont.postaladdress,CONCAT(house.province,house.city,house.district,house.address) as address,service.totalamount,date_format(cont.createtime,'%Y-%m-%d') startdate,service.planneddate,");
    	sb.append(" user.user_name,user.user_mobile from bill_service service");
    	sb.append("	left join bd_customer cu on cu.customerid=service.customerid");
    	sb.append("	left join bd_house house on house.houseid=service.houseid");
    	sb.append("	left join sys_user user on user.id=service.surveyid");
    	sb.append("	left join bd_contract cont on cont.serviceid=service.billid");
    	sb.append("	where cont.contractid='"+contractid+"'");
    	
    	List list=(List)metadataDAO.queryForList(sql1, new MapListProcessor());
    	
    	Object  obj=metadataDAO.queryForObject(sb.toString(),new MapProcessor());
    	
    	 List<ContractDetailEntity> baseDetail=new ArrayList<ContractDetailEntity>();
    	 List<ContractDetailEntity> addDetail=new ArrayList<ContractDetailEntity>();
    	 String part="";
    	if(list!=null){
    		for (int i = 0; i < list.size(); i++) {
    			ContractDetailEntity con=new ContractDetailEntity();
    			Map map=(Map)list.get(i);
    			Set<String> keys=map.keySet();
    			for (Iterator iterator = keys.iterator(); iterator.hasNext();) {
					String key = (String) iterator.next();
					con.setAttribute(key, map.get(key));
				}
    			if(con.getPart()!=null&&part.indexOf(con.getPart())<0){
    				part+=(con.getPart()+",");
    			}
    			
    			if(con.getType()==1){
    				baseDetail.add(con);
    			}else{
    				addDetail.add(con);
    			}
			}
    	}
    	
    	ContractMain main=new ContractMain();
    	if(obj!=null){
    		Map map=(Map)obj;
			Set<String> keys=map.keySet();
			for (Iterator iterator = keys.iterator(); iterator.hasNext();) {
				String key = (String) iterator.next();
				main.setAttribute(key, map.get(key));
			}
    	}
    	if(!StringUtils.isEmpty(part)){    		
    		main.setPart(part.substring(0,part.length()-1));
    	}else{
    		main.setPart(part);
    	}
    	main.setBaseDetail(baseDetail);
    	main.setAddDetail(addDetail);
    	
    	return main;
    }
    
}
