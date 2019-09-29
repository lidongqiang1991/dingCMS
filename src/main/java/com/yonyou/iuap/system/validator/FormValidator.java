package com.yonyou.iuap.system.validator;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.yonyou.iuap.iweb.exception.ValidException;
import com.yonyou.iuap.system.entity.Form;
import com.yonyou.iuap.system.entity.Formb;
import com.yonyou.iuap.system.service.FormService;

/**
 * 校验器
 */
@Component
public class FormValidator {

	@Autowired
	private FormService formService;

	/** 保存时候校验 */
	public void validAdd(Form form) {
		StringBuilder builder = new StringBuilder();
		List<Form> res = formService.findByFormcode(form.getFormcode());
		boolean flag=false;
		if (res != null && res.size() > 0) {
			builder.append("编码为").append(form.getFormcode()).append("的记录已经存在!");
			flag=true;
		}/* else */
		{
			List<Formb> formbs = form.getId_formb();
			Formb[] temp = new Formb[formbs.size()];
			for (int i = 0; i < formbs.size(); i++) {
				temp[i] = formbs.get(i);
			}
			for (int i = 0; i < temp.length; i++) {
				if(temp[i].getDr()==0)for (int j = 0; j < temp.length; j++) {
					if (i!=j&&temp[i].getAttribute().equals(temp[j].getAttribute())) {
						builder.append("\n").append("表体字段属性中").append(temp[i].getAttribute()).append("存在重复!");
						temp[i].setDr(1);
						temp[j].setDr(1);
						flag=true;
						break;
					}
				}
			}
		}
		if (flag)throw new ValidException(builder.toString());

	}

	/** 更新时候校验 */
	public void validUpdate(Form form) {
		StringBuilder builder = new StringBuilder();
		List<Form> res = formService.findByFormcode(form.getFormcode());
		boolean flag=false;
		if (res != null && res.size() > 0&&!form.getFormid().equals(res.get(0).getFormid())) {
			builder.append("编码为").append(form.getFormcode()).append("的记录已经存在!");
			flag=true;
		}/* else */
		{
			List<Formb> formbs = form.getId_formb();
			Formb[] temp = new Formb[formbs.size()];
			for (int i = 0; i < formbs.size(); i++) {
				temp[i] = formbs.get(i);
			}
			for (int i = 0; i < temp.length; i++) {
				if(temp[i].getDr()==0)for (int j = 0; j < temp.length; j++) {
					if (i!=j&&temp[i].getAttribute().equals(temp[j].getAttribute())) {
						builder.append("\n").append("表体字段属性中").append(temp[i].getAttribute()).append("存在重复!");
						temp[i].setDr(1);
						temp[j].setDr(1);
						flag=true;
						break;
					}
				}
			}
		}
		if (flag)throw new ValidException(builder.toString());

	}
}
