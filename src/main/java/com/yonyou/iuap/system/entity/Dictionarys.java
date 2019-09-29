package com.yonyou.iuap.system.entity;

import java.util.List;

import org.springframework.data.domain.Page;

public class Dictionarys {
	private Dictionary parentDictionary;
	private List<Dictionary> childDictionaries;
	public Dictionary getParentDictionary() {
		return parentDictionary;
	}
	public void setParentDictionary(Dictionary parentDictionary) {
		this.parentDictionary = parentDictionary;
	}
	public List<Dictionary> getChildDictionaries() {
		return childDictionaries;
	}
	public void setChildDictionaries(List<Dictionary> childDictionaries) {
		this.childDictionaries = childDictionaries;
	}
}
