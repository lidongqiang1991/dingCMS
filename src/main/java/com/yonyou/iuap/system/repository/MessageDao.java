package com.yonyou.iuap.system.repository;

import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.bs.dao.DAOException;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.system.entity.Message;
/**
 * 系统消息模块dao
 * @author xyb
 *
 */
@Repository
public class MessageDao {
	@Autowired
	private MetadataDAO metadataDAO;
	/**
	 * 查询所有分页的系统消息
	 * @param pageRequest
	 * @param searchParams
	 * @return
	 * @throws DAOException
	 */
	public Page<Message> selectAllByPage(PageRequest pageRequest, Map<String, Object> searchParams) 
			throws DAOException{
		SQLParameter sqlParameter=new SQLParameter();
		StringBuilder str=new StringBuilder();
		str.append(" select * from sys_message ");
		str.append(" where receiverid = ? and ");
		//当前系统登录用户id
		sqlParameter.addParam(InvocationInfoProxy.getUserid());
		//传参
		if (null != searchParams && !searchParams.isEmpty()) { 
			 for(Map.Entry<String, Object> entry : searchParams.entrySet() ){
	   			 if(entry.getKey().equalsIgnoreCase("searchParam")){
	   				str.append(" ( title like ? or sender like ? ) AND ");
	   				    for(int i=0;i<2;i++){
	   				    	sqlParameter.addParam("%" + entry.getValue() + "%");
	   				    }
	   			 } 
	   			 if(entry.getKey().equalsIgnoreCase("messageType")){
	   				 if(entry.getValue().equals("-1")){
	   					continue;
	   				 }
	   				 if(entry.getValue().equals("0")||entry.getValue().equals("1")){
	   					str.append("  state = ? AND ");
   				    	sqlParameter.addParam(entry.getValue());
	   				 }
	   			 }
	   		 }
			 str.delete(str.length()-4, str.length());
		}else{
			str.delete(str.length()-4, str.length());
		}
	    return metadataDAO.queryPage(str.toString(), sqlParameter, pageRequest, Message.class);
	}
	/**
	 * 得到所有系统消息
	 * @return
	 */
	public List<Message> selectAll(){
		return metadataDAO.queryAll(Message.class);
	}
	/**
	 * 根据系统消息id查询一条系统消息
	 * @param id messageid
	 * @return
	 * @throws DAOException
	 */
	public Message findById(String id) throws DAOException {

        String sql = "select * from sys_message where messageid=?";
        SQLParameter sqlparam = new SQLParameter();
        sqlparam.addParam(id);
        return  metadataDAO.queryByPK(Message.class, id);
    }
	
	  /**
	   * 标记为已读
	   * @param messageids 传入messageid字符串
	   */
	public void updateRead(String messageids){
		if(messageids!=null&&!messageids.isEmpty()){
			List<Message> lists = new ArrayList<Message>();
		    String ids[] = messageids.split(",");
		    if(null != ids && ids.length>0){
		    	 for(int i = 0; i < ids.length; i++){
		   	        Message message = metadataDAO.queryByPK(Message.class, ids[i]);
		   	        //标记状态为已读（置1）
		   	        message.setState(Message.READ_STATE_2);
		   	        lists.add(message);
		   	    }
		    }	  
		    metadataDAO.update(lists);	
		}	    
    }
	  /**
	   * 标记为未读
	   * @param messageids  传入messageid字符串
	   * @return
	   */
    public void updateUnRead(String messageids){
    	 if(messageids!=null&&!messageids.isEmpty()){
    		 List<Message> lists = new ArrayList<Message>();
    	     //messageid
    	     String ids[] = messageids.split(",");
    	     if(null != ids && ids.length>0){
    	    	 for(int i = 0; i < ids.length; i++){
    	   	        Message message = metadataDAO.queryByPK(Message.class, ids[i]);
    	   	        //标记状态为未读（置0）
    	   	        message.setState(Message.READ_STATE_1);
    	   	        lists.add(message);
    	   	    }
    	     }		  
    	     metadataDAO.update(lists);
    	 }		      
     }
       
  }
