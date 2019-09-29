package com.ding.cms.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ding.cms.entity.Contract;
import com.ding.cms.entity.ContractMain;
import com.ding.cms.repository.ContractDao;
import com.yonyou.iuap.persistence.vo.pub.util.StringUtil;

@Service
public class ContractService {
	
	@Autowired
	private ContractDao contractDao;
    @Autowired
    private com.yonyou.iuap.system.service.LogService logService;
	/**
	 * 分页查询
	 * @param pageRequest
	 * @param searchParams
	 * @return
	 */
	public Page<Contract> selectAllByPage(PageRequest pageRequest, Map<String, Object> searchParams){
		return contractDao.selectAllByPage(pageRequest, searchParams);
	}
	
	/**
	 * 更新合同,发票,保单  生产单据号
	 * @param contractid
	 * @param contractType
	 * @param docunum
	 * @return
	 */
	@Transactional
	public Contract update(String contractid, String contractType, String docunum){
		return contractDao.update(contractid, contractType, docunum);
	}
	
	/**
	 * 存储合同模块图片
	 * @param contractid
	 * @param key
	 * @param value
	 */
	public void changeValue(String contractid,String key,String value){
		contractDao.changeValue(contractid, key, value);
	}
	
	/**
	 * 批量上传图片、文件
	 * @param contractid
	 * @param key
	 * @param value
	 */
	@Transactional
	public String batchChangeValue(List<Map<String,String>> list){
		StringBuilder resultStr = new StringBuilder();
		int count = 0;
		for(Map<String,String> map : list){
			String fileName = String.valueOf(map.get("filename"));
			String value = String.valueOf(map.get("value"));
			String key;
			String []strs = fileName.split("-");
			if(strs[0].equals("HT")){
				key = "contractphoto";
			}else if(strs[0].equals("FP")){
				key = "invoicephoto";
			}else if(strs[0].equals("JG")){
				key = "contractelecvers";
			}else if(strs[0].equals("BD")){
				key = "policyphoto";
			}else{
				resultStr.append(++count+":"+fileName+" 上传失败,文件名格式错误"+"<br>");
				continue;
			}
			int temporary = contractDao.updateFilePath(strs[1].substring(0,strs[1].indexOf(".")), key, value);
			if(temporary<1){
				resultStr.append(++count+":"+fileName+" 上传失败,未找到对应编号合同"+"<br>");
			}else {
				resultStr.append(++count+":"+fileName+" 上传成功"+"<br>");
			}
		}
		//存系统日志
		logService.insertlog("合同", "批量上传", resultStr.toString());
		return resultStr.toString();
	}
	/**
	 * 生成合同
	 * @param entity
	 * @return
	 */
	@Transactional
	public Contract save(Contract entity){
		return contractDao.save(entity);
	}
	
	/**
	 * 修改合同
	 * @param contractid
	 * @param clientname
	 * @param postaladdress
	 * @param idnumber
	 */
	 
	public void updateCobtract(String contractid,String clientname,String postaladdress,String idnumber){
		contractDao.updateCobtract(contractid, clientname, postaladdress,idnumber);
	}
	/**
	 * 根据合同id查询合同详情
	 * @param contractid
	 * @return
	 */
	public ContractMain getContractInfoById(String contractid){
    	return contractDao.getContractInfoById(contractid);
    }

}
