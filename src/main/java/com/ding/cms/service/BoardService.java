package com.ding.cms.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ding.cms.repository.BoardDao;

@Service
public class BoardService {

	@Autowired
	private BoardDao boardDao;
	
	
	public Map getBoardData(String month){
		return boardDao.getBoardData(month);
	}
}
