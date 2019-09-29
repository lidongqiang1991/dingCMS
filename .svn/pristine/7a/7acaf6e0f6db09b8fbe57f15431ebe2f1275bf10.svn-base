create or REPLACE view v_bill_deal as 
 select SUBSTRING(createtime,1,7) as month,customerid,orgid,agentid from bill_deal;
 
 create or REPLACE view v_bill_service as 
 select SUBSTRING(createtime,1,7) as month,orgid,agentid,servicestate,totalamount,paidamount
 from bill_service ;
 
 create or REPLACE view v_bill_monthtotal as 
 SELECT month,orgid,agentid,count(DISTINCT customerid) as addcustomer,0 as allotedcustomer,0 as servicing,0 as serviced,0 as totalamount,0 as paidamount from v_bill_deal group by month,orgid,agentid
 UNION ALL
 SELECT month,orgid,agentid,0 as addcustomer,count(DISTINCT customerid) as allotedcustomer,0 as servicing,0 as serviced,0 as totalamount,0 as paidamount from v_bill_deal where  agentid is not null  group by month,orgid,agentid
	 UNION ALL
 select month,orgid,agentid,0 as addcustomer,0 as allotedcustomer,0 as servicing,count(1) as serviced,SUM(totalamount) as totalamount,SUM(paidamount) as paidamount from v_bill_service where servicestate=2 group by month,orgid,agentid
	 UNION ALL
 select month,orgid,agentid,0 as addcustomer,0 as allotedcustomer,count(1) as servicing,0 as serviced,SUM(totalamount) as totalamount,SUM(paidamount) as paidamount from v_bill_service where servicestate=1 group by month,orgid,agentid;
 
  
 