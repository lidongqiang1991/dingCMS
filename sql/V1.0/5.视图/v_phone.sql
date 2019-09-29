create or REPLACE view v_phone as
SELECT
	`u`.`user_name` AS `name`,
	`u`.`id` AS `id`,
	`u`.`user_mobile` AS `phone`,
	'user' AS `type` 
FROM
	`sys_user` `u` UNION ALL
SELECT
	`bd_construction`.`teamname` AS `name`,
	`bd_construction`.`id` AS `id`,
	`bd_construction`.`phone` AS `phone`,
	'construction' AS `type` 
FROM
	`bd_construction` UNION ALL
SELECT
	`bd_customer`.`name` AS `name`,
	`bd_customer`.`customerid` AS `id`,
	`bd_customer`.`phone` AS `phone`,
	'customer' AS `type` 
FROM
	`bd_customer`