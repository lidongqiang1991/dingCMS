package com.yonyou.iuap.system.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.persistence.bs.dao.DAOException;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.system.entity.Message;
import com.yonyou.iuap.system.entity.SysUser;
import com.yonyou.iuap.system.repository.MessageDao;
/**
 * 系统消息模块
 * @author 
 *
 */
@Service
public class MessageService {
	
	@Autowired
	private MetadataDAO metadataDAO;
	
	@Autowired
	private MessageDao messageDao;
	
	@Autowired  
	private SysUserService  sysUserService;
	
	/**
	 * 根据查询的条件进行分页查询
	 * @param searchParams
	 * @param pageRequest
	 * @return
	 */
	public Page<Message> selectAllByPage(Map<String, Object> searchParams, PageRequest pageRequest) {
		return messageDao.selectAllByPage(pageRequest, searchParams);
	}
	/**
	 * 查询所有
	 * @return
	 */
	public List<Message> selectAll(){
		return messageDao.selectAll();
	}
	/**
	 * 根据id查询系统消息
	 * @param id
	 * @return
	 */
	public Message selectById(String id){
		return messageDao.findById(id);
	}
	
	/**
     * 标记为已读
     * @param messageids
     * @return
     */
    public void updateRead(String messageids){
        messageDao.updateRead(messageids);
    }
    /**
     * 标记为未读
     * @param messageids
     * @return
     */
     public void updateUnRead(String messageids){
	    messageDao.updateUnRead(messageids);
     }

     /**
      * 发送系统消息
      * @param title 标题
      * @param receiverid 接受者id
      * @param content 内容
      * @param url 详情url
      */
     public void sendMessage(String title,String receiverid,String content,String url) throws DAOException{
    	 Message message=new Message();
    	 message.setTitle(title);
    	 message.setContent(content);
    	 message.setReceiverid(receiverid);
    	 message.setSendtime(new Date());
    	 //当前用户的id和名称
    	 message.setSenderid(InvocationInfoProxy.getUserid());
    	 message.setSender(InvocationInfoProxy.getUsername());
    	 //默认消息初始状态为未读
    	 message.setState(Message.READ_STATE_1);
    	 //根据id查找接受者
    	 SysUser  sysuser=sysUserService.findById(receiverid);
    	 message.setReceiver(sysuser.getUsername());
    	 metadataDAO.insert(message);
     }
     
     /**
      * 发送系统消息
      * @param title 标题
      * @param receiverid 接受者id
      * @param content 内容
      * @param url 详情url
      */
     public void sendMessageWithName(String title,String receiverid,String receiverName,String content,String url) throws DAOException{
    	 Message message=new Message();
    	 message.setTitle(title);
    	 message.setContent(content);
    	 message.setReceiverid(receiverid);
    	 message.setSendtime(new Date());
    	 //当前用户的id和名称
    	 message.setSenderid(InvocationInfoProxy.getUserid());
    	 message.setSender(InvocationInfoProxy.getUsername());
    	 //默认消息初始状态为未读
    	 message.setState(Message.READ_STATE_1);
    	 //根据id查找接受者
    	 message.setReceiver(receiverName);
    	 metadataDAO.insert(message);
     }    
     
     
 }
