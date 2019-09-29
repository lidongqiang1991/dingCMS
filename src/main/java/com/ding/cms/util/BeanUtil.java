package com.ding.cms.util;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

public class BeanUtil {
	public static Map<String, Object> transBean2Map(Object obj,String[] attributes) {

		if (obj == null) {
			return null;
		}
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			BeanInfo beanInfo = Introspector.getBeanInfo(obj.getClass());
			PropertyDescriptor[] propertyDescriptors = beanInfo
					.getPropertyDescriptors();
			for (PropertyDescriptor property : propertyDescriptors) {
				String key = property.getName();

				// 过滤class属性
				if (!key.equals("class") && !key.equals("allAttributeNames")
						&& !key.equals("beanMap") && !key.equals("dr")
						&& !key.equals("status")
						&& !key.equals("metaDefinedName")) {
					// 得到property对应的getter方法
					Method getter = property.getReadMethod();
					Object value = getter.invoke(obj);
					if (hasAttributeName(attributes, key))
						map.put(key, value);
				}

			}
		} catch (Exception e) {
			System.out.println("transBean2Map Error " + e);
		}
		return map;
	}
	public static boolean hasAttributeName(String[] attributes,String attribute){
		if(attributes==null)return true;
		for (int i = 0; i < attributes.length; i++) {
			if(attribute.equals(attributes[i]))
				return true;
		}
		return false;
	}
}
