CREATE or REPLACE VIEW v_rate_1 AS 
SELECT * FROM bill_service_procedure where itemname='客户评价施工结果';

CREATE or REPLACE VIEW v_rate_2 AS 
SELECT * FROM sys_form_b where attribute='rate' AND memo='客户打分';

CREATE or REPLACE VIEW v_rate AS 
SELECT bs.billid serviceid,bs.constructionid constructionid , sfv.`value` rate
FROM  bill_service  bs 
LEFT JOIN  v_rate_1 bsp on bs.billid = bsp.billid  
LEFT JOIN v_rate_2 sfb on sfb.formid=bsp.formid  
LEFT JOIN sys_form_value  sfv on (sfb.formbid=sfv.formbid and bsp.billbid =sfv.sid) 
where bs.servicestate =2;