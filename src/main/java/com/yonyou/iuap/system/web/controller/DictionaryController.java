package com.yonyou.iuap.system.web.controller;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.collections4.sequence.KeepCommand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yonyou.iuap.mvc.type.SearchParams;
import com.yonyou.iuap.system.entity.Dictionary;
import com.yonyou.iuap.system.entity.Dictionarys;
import com.yonyou.iuap.system.service.DictionaryService;

@RestController
@RequestMapping("dictionary")
public class DictionaryController extends BaseController{
	@Autowired
	private DictionaryService dictionaryService;
	@RequestMapping("save")
	public Object save(@RequestBody Dictionarys dictionarys){
		return buildSuccess(dictionaryService.save(dictionarys));
	}
	@RequestMapping("page")
	public Object selectAllByPage(PageRequest pageRequest,SearchParams searchParams){
		return buildSuccess(dictionaryService.selectAllByPage(pageRequest, searchParams.getSearchMap()));
	}
	@RequestMapping("detail")
	public Object selectById(PageRequest pageRequest,SearchParams searchParams){
		return buildSuccess(dictionaryService.selectById(pageRequest, searchParams.getSearchMap()));
	}
	@RequestMapping("del")
	public Object delete(@RequestBody Dictionary dictionary){
		dictionaryService.delete(dictionary);
		return buildSuccess();
	}
}
