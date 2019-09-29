package com.yonyou.iuap.system.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yonyou.iuap.persistence.bs.jdbc.meta.access.DASFacade;
import com.yonyou.iuap.system.entity.SysUserJob;
import com.yonyou.iuap.system.repository.SysUserJobDao;

@Service
public class SysUserJobService {

    @Autowired
    private SysUserJobDao userjobDao;


    public Page<SysUserJob> selectAllByPage(Map<String, Object> searchParams, PageRequest pageRequest) {
        Page<SysUserJob> pageResult = userjobDao.selectAllByPage(pageRequest, searchParams);
        this.setRefName(pageResult);
        return pageResult;
    }

    /** 用户任职表里面 需要显示参照 名字 字段， 这里进行转换 */
    private Page<SysUserJob> setRefName(Page<SysUserJob> pageResult) {
        if (pageResult != null && pageResult.getContent() != null && pageResult.getContent().size() > 0) {

			/**
			 * 上面的 orgid.orgname orgid表示参照对应的外键属性名， orgname是参照实体对应的属性名，
			 * */
			Map<String, Map<String, Object>> refMap =
                    DASFacade.getAttributeValueAsPKMap(new String[] {"orgid.orgname", "deptid.deptname"}, pageResult
                            .getContent().toArray(new SysUserJob[] {}));
            for (SysUserJob job : pageResult.getContent()) {
                String jobId = job.getId();
                Map<String, Object> jobRefMap = refMap.get(jobId);
                if (jobRefMap != null) {
                    job.setOrgid((String) jobRefMap.get("orgid.orgname"));
                    job.setDeptid((String) jobRefMap.get("deptid.deptname"));
                }
            }
        }


        return pageResult;
    }

    @Transactional
    public void deleteEntity(SysUserJob entity) {
        userjobDao.delete(entity);
    }

    
//    public List<Dept> findAllDept() {
//        return userjobDao.findAllDept();
//    }


}
