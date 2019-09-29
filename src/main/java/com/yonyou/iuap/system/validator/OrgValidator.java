package com.yonyou.iuap.system.validator;

import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.yonyou.iuap.iweb.exception.ValidException;
import com.yonyou.iuap.system.entity.Org;
import com.yonyou.iuap.system.service.OrgService;

@Component
public class OrgValidator {
    @Autowired
    private OrgService service;
    

    public void valid(List<Org> orgList) {
        if (CollectionUtils.isEmpty(orgList)) {
            throw new ValidException("提交的数据集为空!");
        }
        StringBuilder builder = new StringBuilder();
        for (Org org : orgList) {
            if (StringUtils.isEmpty(org.getOrgid())) {
                if (!service.findByCode(org.getOrgcode()).isEmpty()) {
                    builder.append(org.getOrgcode()).append(",");
                }
            }
        }
        if (builder.toString().length() > 0) {
            String codeStr = builder.deleteCharAt(builder.length() - 1).toString();
            StringBuilder msgBuilder = new StringBuilder("编码为");
            msgBuilder.append(codeStr).append("的记录已经存在!");
            throw new ValidException(msgBuilder.toString());
        }
    }
}
