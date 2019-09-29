package com.ding.cms.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.ding.cms.entity.BillServiceProcedure;
import com.ding.cms.entity.Performance;
import com.ding.cms.repository.ReferredDao;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.persistence.jdbc.framework.processor.ColumnListProcessor;

@Service
public class ReferredService {
	@Autowired
	private ReferredDao referredDao;
	@Autowired
	private MetadataDAO dao;
	@Autowired
	private PerformanceService performanceService;

	public Page<Performance> getCustomerByRefId(PageRequest pageRequest,
			Map<String, Object> params) {
		Page<Performance> referreds = referredDao.getCustomerByRefId(
				pageRequest, params);
		return referreds;
	}

	public Long getCustomerNum(String refId) {
		return referredDao.getCustomerNum(refId);
	}

	public Long getTotalCustomerNum(String refId) {
		return referredDao.getTotalCustomerNum(refId);
	}

	public String getProduceName(String orderId) {
		String sq = "select * from bill_service_procedure where dr = 0 and orderid = '"
				+ orderId + "' order by type,ABS(itemorder)";
		List<BillServiceProcedure> lists = dao.queryByClause(
				BillServiceProcedure.class, sq);
		String name="尚未开工";
		for (int a = 0; a < lists.size(); a++) {
			int state = lists.get(a).getState();
			name = lists.get(a).getItemname();
			if (state == 0 || state == 1) {
				break;
			} else {
				if (a == lists.size() - 1) {
					name="工程已竣工";
				} else {
					continue;
				}
			}
		}
		return name;
	}
}
