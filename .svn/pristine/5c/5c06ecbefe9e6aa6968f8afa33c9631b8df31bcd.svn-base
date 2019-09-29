package com.yonyou.iuap.system.repository;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import com.ding.cms.util.DateUtils;
import com.yonyou.iuap.persistence.jdbc.framework.SQLParameter;
import com.yonyou.iuap.persistence.bs.dao.DAOException;
import com.yonyou.iuap.persistence.bs.dao.MetadataDAO;
import com.yonyou.iuap.system.entity.Log;

/**
 * 系统日志dao
 * @author xyb
 *
 */
@Repository
public class LogDao {
	
	@Autowired
	private MetadataDAO metadataDAO;
	
	/**
	 * 查询所有分页系统日志
	 * @param pageRequest
	 * @param searchParams
	 * @return
	 * @throws DAOException
	 */
	public Page<Log> selectAllByPage(PageRequest pageRequest,Map<String,Object> searchParams)
	throws DAOException{
		SQLParameter sqlParameter=new SQLParameter();
		StringBuilder str=new StringBuilder();
		str.append(" select * from sys_log ");
		if(null!=searchParams&&!searchParams.isEmpty()){
			str.append(" where ");
			for(Map.Entry<String,Object> entry:searchParams.entrySet()){
				//模糊查询操作人、操作对象
				if(entry.getKey().equalsIgnoreCase("searchParam")){
					str.append(" ( object like ? or username like ? ) AND ");
   				    for(int i=0;i<2;i++){
   				    	sqlParameter.addParam("%" + entry.getValue() + "%");
   				    }
				}
				//传入时间段
				if(entry.getKey().equalsIgnoreCase("logtime")){
					//转化成字符串
					String time=entry.getKey();
					//三天之内(0)
					if(entry.getValue().equals("0")){
	   					str.append("  ( ts between ? and ? ) and ");
	   					//调用方法，在当前日期增加/减去传入天数
	   					sqlParameter.addParam(getAfterTime(-3));
	   					//对应时间字符串
	   					sqlParameter.addParam(DateUtils.currentTimestampToString());
	   				}
					//一个周之内(1)
					if(entry.getValue().equals("1")){
	   					str.append("  ( ts between ? and ? ) and ");
	   					//调用方法，在当前日期增加/减去传入天数
	   					sqlParameter.addParam(getAfterTime(-7));
	   				    //对应时间字符串
	   					sqlParameter.addParam(DateUtils.currentTimestampToString());
	   				}
					//一个月之内(2)
					if(entry.getValue().equals("2")){
	   					str.append(" ( ts between ? and ? ) and ");
	   					//调用方法，在当前日期增加/减去传入天数
	   					sqlParameter.addParam(getAfterTime(-30));
	   					//对应时间字符串
	   					sqlParameter.addParam(DateUtils.currentTimestampToString());
	   				}
					//所有时间段(-1)
					if(entry.getValue().equals("-1")){
						continue;
					}
					//自定义时间段(3)
					if(entry.getValue().equals("3")){
						str.append(" ( ts between ? and ? ) and ");
						for(Map.Entry<String, Object> entryNew : searchParams.entrySet() ){
    						if(entryNew.getKey().equals("startTime")){
    							sqlParameter.addParam(entryNew.getValue()+" 00:00:00");
    						}else if(entryNew.getKey().equals("endTime")){
    							sqlParameter.addParam(entryNew.getValue()+" 23:59:59");
    						}
    					}
					}
				}			
				
			}
			str.delete(str.length()-4, str.length());
		}
		return metadataDAO.queryPage(str.toString(), sqlParameter, pageRequest,Log.class);
	}
	
	/**
     * 传入天数，返回供sql语句拼接的
     * @param day 天数（正、负）
     * @return
     */
    private String getAfterTime(int day){
    	//将某个日期增加指定天数，并返回结果。如果传入负数，则为减
    	//系统当前日期，天数
    	Date afterdate = DateUtils.addDate(new Date(System.currentTimeMillis()), day);
		String aftertime = new Timestamp(afterdate.getTime()).toString().substring(0, 11)+"00:00:00";
		return aftertime;
    }
    
    
    /**
	 * 获取全部系统日志
	 * @return
	 */
	public List<Log> getAll(){
		return metadataDAO.queryAll(Log.class);
	}
	
	/**
	 * 根据系统日志主键logid查询一条系统日志
	 * @param logid 系统日志主键
	 * @return
	 * @throws DAOException
	 */
	public Log selectById(String logid) throws DAOException{
		return metadataDAO.queryByPK(Log.class, logid);
	}
	/**
	 * 查询username操作人操作的日志
	 * @param username 操作人
	 * @return
	 * @throws DAOException
	 */
	public List<Log> selectByUsername(String username) throws DAOException{
		String sql="select * from sys_log where username=? ";
		SQLParameter sqlParameter=new SQLParameter();
		sqlParameter.addParam(username);
		return metadataDAO.queryByClause(Log.class, sql, sqlParameter);
	}
}
