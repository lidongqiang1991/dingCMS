package com.yonyou.iuap.system.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ding.cms.util.DateUtils;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.system.entity.BillCodeManage;
import com.yonyou.iuap.system.entity.Org;

@Repository
public class BillCodeManageDao {
	
	 @Autowired
	 private MetadataDAO metadataDAO;

	/**
	 * 获取单据号，对象编码+组织编码+年月日（YYYMMDD）+流水号 
	 * CUBJ201807200067--> CU:客户   BJ：北京运营中心  日期：2018年07月20日 0067：流水号，当天第67位客户
	 * @param orgid组织id
	 * @param billType业务对象标识
	 * @param serial 流水号位数
	 * @return
	 */
	
	public String getBillCode(String orgid,String billType,int serial){
		String date=DateUtils.currentTimestampToString().substring(0, 10).replaceAll("-", "");
		
		String orgCode=metadataDAO.queryByPK(Org.class, orgid).getOrgcode();
		
		String sql="SELECT * FROM sys_billcodemanage ";
		String where= " WHERE	orgid = '"+orgid+"' AND billtype = '"+billType+"' 	AND dbilldate = '"+date+"'";
		String serialCode="";
		List<BillCodeManage> result=metadataDAO.queryByClause(BillCodeManage.class, sql+where);
		if(result==null||result.size()==0){
			BillCodeManage billCode=new BillCodeManage();
			billCode.setBilltype(billType);
			billCode.setDbilldate(date);
			billCode.setOrgcode(orgCode);
			billCode.setOrgid(orgid);
			billCode.setSerial(1);
			metadataDAO.insert(billCode);
			serialCode= generalSerial(0, serial);
		}else{
			serialCode=generalSerial(result.get(0).getSerial(), serial);
			String update="update sys_billcodemanage set serial=serial+1";
			int rows=metadataDAO.update(update+where);
		}
		return billType+orgCode+date+serialCode;
	}
	
	private String generalSerial(int code,int serial){
		String strCode=""+(code+1);
		if(strCode.length()>=serial){
			return strCode;
		}else{
			strCode="0000000000"+strCode;
			return strCode.substring(strCode.length()-serial, strCode.length());
		}
	}
	
	/**
	 * 获取单据号，前缀+组织编码+对象编码+年月日（YYYMMDD）+流水号 +后缀
	 * @param orgid
	 * @param billType
	 * @param serial
	 * @param pre前缀
	 * @param suf后缀
	 * @return
	 */
	public String getBillCodeWithPart(String orgid,String billType,int serial,String pre,String suf){
		if(pre==null)pre="";
		if(suf==null)suf="";
		return pre+getBillCode(orgid, billType, serial)+suf;
	}
}
