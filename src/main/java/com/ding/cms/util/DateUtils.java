package com.ding.cms.util;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;


public class DateUtils {
	/** 年月日模式字符串 */
	public static final String YEAR_MONTH_DAY_PATTERN = "yyyy-MM-dd";

	/** 时分秒模式字符串 */
	public static final String HOUR_MINUTE_SECOND_PATTERN = "HH:mm:ss";

	/** 年月日时分秒模式字符串 */
	public static final String YMDHMS_PATTERN = "yyyy-MM-dd HH:mm:ss";

	/** 年月日时分 */
	public static final String YMDHM_PATTERN = "yyyy-MM-dd HH:mm";

	public static final String YEAR_MONTH = "yyyy-MM";
	
	public static final String YEAR = "yyyy";

	public static final String MONTH_DAY = "MM-dd";

	public static final String HOUR_MIN = "HH:mm";

	public static final String YMDHMS_PATTERNS = "yyyy-MM-dd HH:mm:ss.SSS";
	public static final long PARTY_ONE_DAY = 24 * 60 * 60 * 1000;

	/** 年月日时分秒没有空格和横杠 */
	public static final String DATE_TIME_NO_SLASH = "yyyyMMddHHmmss";
	
	
	/**
	 * @param date
	 * @return
	 * @throws ParseException
	 * @throws java.text.ParseException 
	 */
	public static Date currentDate(Date date) throws ParseException {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String s = df.format(date);
		Date d = df.parse(s);
		return d;
	}

	/**
	 * 
	 * 
	 * @return 返回当前时间
	 */
	public static Date currentDate() {
		return new Date(System.currentTimeMillis());
	}

	/**
	 * 从当前时间 并返回Timestamp类型时间。
	 * 
	 * @return 返回当前时间
	 */
	public static Timestamp currentTimestamp() {
		return new Timestamp(currentDate().getTime());
	}

	/**
	 * 当前年
	 * 
	 * @return
	 */
	public static int getCurrentYear() {
		return getYear(currentDate());
	}

	/**
	 * 得到时间对应字符串
	 * 
	 * @return
	 */
	public static String currentTimestampToString() {
		return currentTimestamp().toString().substring(0, 19);
	}

	/**
	 * 获取给定日期对象的年
	 * 
	 * @param date
	 *            日期对象
	 * @return 年
	 */
	public static int getYear(final Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.YEAR);
	}

	/**
	 * 获取给定日期对象的月
	 * 
	 * @param date
	 *            日期对象
	 * @return 月
	 */
	public static int getMonth(final Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.MONTH) + 1;
	}

	/**
	 * 获取给定日期对象的天
	 * 
	 * @param date
	 *            日期对象
	 * @return 天
	 */
	public static int getDay(final Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.DATE);
	}

	/**
	 * 获取给定日期对象的时
	 * 
	 * @param date
	 *            日期对象
	 * @return 时
	 */
	public static int getHour(final Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.HOUR_OF_DAY);
	}

	/**
	 * 获取给定日期对象的分
	 * 
	 * @param date
	 *            日期对象
	 * @return 分
	 */
	public static int getMinute(final Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.MINUTE);
	}

	/**
	 * 获取给定日期对象的秒
	 * 
	 * @param date
	 *            日期对象
	 * @return 秒
	 */
	public static int getSecond(final Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.SECOND);
	}

	/**
	 * 获取传入日期的年和月的Integer形式（yyyyMM）。
	 * 
	 * @param date
	 *            要转换的日期对象
	 * @return 转换后的Integer对象
	 */
	public static Integer getYearMonth(final Date date) {
		return new Integer(format(date, "yyyyMM"));
	}

	/**
	 * 将年月的整数形式（yyyyMM）转换为日期对象返回。
	 * 
	 * @param yearMonth
	 *            年月的整数形式（yyyyMM）
	 * @return 日期类型
	 * @throws ParseException
	 */
	public static Date parseYearMonth(final Integer yearMonth) throws ParseException {
		return parse(String.valueOf(yearMonth), "yyyyMM");
	}
	/**
	 * 将年月的整数形式（yyyy）转换为日期对象返回。
	 * 
	 * @param year
	 *            年月的整数形式（yyyy）
	 * @return 日期类型
	 * @throws ParseException
	 */
	public static Date parseYear(final Integer year) throws ParseException {
		return parse(String.valueOf(year), "yyyy");
	}
	/**
	 * 将年月的整数形式（yyyyMM）转换为日期对象返回。
	 * 
	 * @param yearMonth
	 *            年月的整数形式（yyyyMMdd）
	 * @return 日期类型
	 * @throws ParseException
	 */
	public static Date parseYearMonthDay(final Integer yearMonthDay) throws ParseException {
		return parse(String.valueOf(yearMonthDay), "yyyyMMdd");
	}

	/**
	 * 将某个日期增加指定年数，并返回结果。如果传入负数，则为减。
	 * 
	 * @param date
	 *            要操作的日期对象
	 * @param ammount
	 *            要增加年的数目
	 * @return 结果日期对象
	 */
	public static Date addYear(final Date date, final int ammount) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.add(Calendar.YEAR, ammount);
		return c.getTime();
	}

	/**
	 * 将某个日期增加指定天数，并返回结果。如果传入负数，则为减。
	 * 
	 * @param date
	 *            要操作的日期对象
	 * @param ammount
	 *            要增加天数
	 * @return 结果日期对象
	 */
	public static Date addDate(final Date date, final int ammount) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.add(Calendar.DATE, ammount);
		return c.getTime();
	}
	public static String addMINUTE(String date, int ammount) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		    Calendar calendar = Calendar.getInstance();
		    Date d=null;
			try {
				d = sdf.parse(date);
			} catch (ParseException e) {
				// TODO 自动生成的 catch 块
				e.printStackTrace();
			}
		    calendar.setTime(d);
		    calendar.add(Calendar.MINUTE, ammount);
		    return sdf.format(calendar.getTime());
	}
	/**
	 * 将某个日期增加指定月数，并返回结果。如果传入负数，则为减。
	 * 
	 * @param date
	 *            要操作的日期对象
	 * @param ammount
	 *            要增加月数
	 * @return 结果日期对象
	 */
	public static Date addMonth(final Date date, final int ammount) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.add(Calendar.MONTH, ammount);
		return c.getTime();
	}

	/**
	 * 获取昨天日期
	 * 
	 * @return
	 */
	public static Date getYesterday() {
		Date today = currentDate();
		Calendar c = Calendar.getInstance();
		c.setTime(today);
		c.add(Calendar.DATE, -1);
		return c.getTime();
	}

	/**
	 * 根据传入的日期格式化pattern将传入的日期格式化成字符串。
	 * 
	 * @param date
	 *            要格式化的日期对象
	 * @param pattern
	 *            日期格式化pattern
	 * @return 格式化后的日期字符串
	 */
	public static String format(final Date date, final String pattern) {
		if (null == date) {
			return "";
		}
		DateFormat df = new SimpleDateFormat(pattern);
		return df.format(date);
	}

	/**
	 * 将传入的日期按照默认形势转换成字符串（yyyy-MM-dd）
	 * 
	 * @param date
	 *            要格式化的日期对象
	 * @return 格式化后的日期字符串
	 */
	public static String format(final Date date) {
		return format(date, YEAR_MONTH_DAY_PATTERN);
	}

	/**
	 * 根据传入的日期格式化patter将传入的字符串转换成日期对象
	 * 
	 * @param dateStr
	 *            要转换的字符串
	 * @param pattern
	 *            日期格式化pattern
	 * @return 转换后的日期对象
	 * @throws ParseException
	 *             如果传入的字符串格式不合法
	 */
	public static Date parse(final String dateStr, final String pattern) throws ParseException {
		DateFormat df = new SimpleDateFormat(pattern);
		return df.parse(dateStr);
	}

	/**
	 * 将传入的字符串按照默认格式转换为日期对象（yyyy-MM-dd）
	 * 
	 * @param dateStr
	 *            要转换的字符串
	 * @return 转换后的日期对象
	 * @throws ParseException
	 *             如果传入的字符串格式不符合默认格式（如果传入的字符串格式不合法）
	 */
	public static Date parse(final String dateStr) throws ParseException {
		// modify by liaoxl 支持两种格式的时间yyyy-MM-dd和yyyy-MM-dd HH:mm:ss
		if (dateStr.length() == YEAR_MONTH_DAY_PATTERN.length()) {
			return parse(dateStr, YEAR_MONTH_DAY_PATTERN);
		} else if (dateStr.length() == YMDHMS_PATTERN.length()) {
			return parse(dateStr, YMDHMS_PATTERN);
		} else {
			return parse(dateStr, YEAR_MONTH_DAY_PATTERN);
		}
	}

	private static Date parse2(final String dateStr) throws ParseException {
		// modify by liaoxl 支持两种格式的时间yyyy-MM-dd和yyyy-MM-dd HH:mm:ss
		if (dateStr.length() == YEAR_MONTH_DAY_PATTERN.length()) {
			return parse(dateStr, YEAR_MONTH_DAY_PATTERN);
		} else if (dateStr.length() == YMDHMS_PATTERN.length()) {
			return parse(dateStr, YMDHMS_PATTERN);
		} else if (dateStr.length() == YMDHMS_PATTERNS.length()) {
			return parse(dateStr, YMDHMS_PATTERNS);
		} else if (dateStr.length() > YMDHMS_PATTERN.length() && dateStr.length() < YMDHMS_PATTERNS.length()) {
			return parse(dateStr, YMDHMS_PATTERNS);
		} else {
			return parse(dateStr, YEAR_MONTH_DAY_PATTERN);
		}
	}

	/**
	 * 要进行合法性验证的年月数值
	 * 
	 * @param yearMonth
	 *            验证年月数值
	 * @return 年月是否合法
	 */
	public static boolean isYearMonth(final Integer yearMonth) {
		String yearMonthStr = yearMonth.toString();
		return isYearMonth(yearMonthStr);
	}

	/**
	 * 要进行合法性验证的年月字符串
	 * 
	 * @param yearMonthStr
	 *            验证年月字符串
	 * @return 年月是否合法
	 */
	public static boolean isYearMonth(final String yearMonthStr) {
		if (yearMonthStr.length() != 6)
			return false;
		else {
			String yearStr = yearMonthStr.substring(0, 4);
			String monthStr = yearMonthStr.substring(4, 6);
			try {
				int year = Integer.parseInt(yearStr);
				int month = Integer.parseInt(monthStr);
				if (year < 1800 || year > 3000) {
					return false;
				}
				if (month < 1 || month > 12) {
					return false;
				}
				return true;
			} catch (Exception e) {
				return false;
			}
		}
	}

	/**
	 * 根据传入的日期格式化patter将传入的字符串转换成Timstamp对象
	 * 
	 * @param dateStr
	 *            要转换的字符串
	 * @param pattern
	 *            日期格式化pattern
	 * @return 转换后的日期对象
	 * @throws ParseException
	 *             如果传入的字符串格式不合法
	 */
	public static Timestamp parseTimestamp(final String dateStr, final String pattern) throws ParseException {
		return new Timestamp(parse(dateStr, pattern).getTime());
	}

	/**
	 * 将传入的字符串按照默认格式转换为Timestamp对象（yyyy-MM-dd）
	 * 
	 * @param dateStr
	 *            要转换的字符串
	 * @return 转换后的日期对象
	 * @throws ParseException
	 *             如果传入的字符串格式不符合默认格式（如果传入的字符串格式不合法）
	 */
	public static Timestamp parseTimestamp(final String dateStr) throws ParseException {
		return new Timestamp(parse2(dateStr).getTime());
	}

	public static int getCurrentMonth() {
		// TODO Auto-generated method stub

		return getMonth(currentDate());
	}

	public static Date getDate(Long timeline) {
		return new Date(timeline);
	}

	public static String getDate(String month, String day) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 24小时制
		java.util.Date d = new java.util.Date();
		;
		String str = sdf.format(d);
		String nowmonth = str.substring(5, 7);
		String nowday = str.substring(8, 10);
		String result = null;

		int temp = Integer.parseInt(nowday) - Integer.parseInt(day);
		switch (temp) {
		case 0:
			result = "今天";
			break;
		case 1:
			result = "昨天";
			break;
		case 2:
			result = "前天";
			break;
		default:
			StringBuilder sb = new StringBuilder();
			sb.append(Integer.parseInt(month) + "月");
			sb.append(Integer.parseInt(day) + "日");
			result = sb.toString();
			break;
		}
		return result;
	}
	/**
	 * 根据年月获取对应月的天数
	 * 传入参数格式：yyyy-MM(2018-09)
	 * @param yearMonth
	 * @return
	 * @throws ParseException
	 */
	public static int getDaysOfMonth(String yearMonth) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date d= sdf.parse(yearMonth+"-08");
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(d);
		return calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
	}
	public static String minDateStr(Set<String> set) throws ParseException{
		Set<Long> setDate=new HashSet<Long>();
		SimpleDateFormat sdf=new SimpleDateFormat(YMDHMS_PATTERN);
		for (String string : set) {
			if(string!=null)
			setDate.add(sdf.parse(string).getTime());
		}
		Long min=minLong(setDate);
		return min!=null?sdf.format(new Date(min)):null;
	}
	public static Long minLong(Set<Long> set){
		if(set!=null&&!set.isEmpty())
		return Collections.min(set);
		return null;
	}
	public static Date minDate(Set<Date> set){
		Set<Long> setDate=new HashSet<Long>();
		for (Date date : set) {
			if(date!=null)
				setDate.add(date.getTime());
		}
		Long min=minLong(setDate);
		return min!=null?new Date(min):null;
	}
}
