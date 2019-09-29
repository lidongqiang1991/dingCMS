--此脚本作为元数据发布时参考使用,以便开发者了解元数据信息在数据库中的记录.
--严禁将此脚本直接或修改后在数据库中执行,如由上述行为引发问题,概不支持.


 delete from md_db_relation where startattrid in ( select id from md_property where classid in ( '77046f32-10bd-4b56-afb2-849e89035a7d', '@@@@' ) and ( versiontype = 0 or versiontype is null ) ) and starttableid in ( 'bd_construction', '@@@@' );
 delete from md_ormap where ATTRIBUTEID in ( select id from md_property where classid in ( '77046f32-10bd-4b56-afb2-849e89035a7d', '@@@@' ) and ( versiontype = 0 or versiontype is null ) ) and tableid in ( 'bd_construction', '@@@@' );
 delete from md_table where id not in ( select distinct tableid from md_ormap ) and ( versiontype = 0 or versiontype is null );
 delete from md_column where tableid in ( 'bd_construction', '@@@@' ) and id not in ( select distinct columnid from md_ormap ) and ( ifnull( groupid, '~' ) = '~' or groupid = id ) and name <> 'extend_bean_tag';
 delete from md_column where tableid in ( 'bd_construction', '@@@@' ) and groupid is not null and groupid not in ( select distinct t.id from ( select * from md_column ) t where tableid in ( 'bd_construction', '@@@@' ) );
 delete from md_db_relation where starttableid not in ( select id from md_table );
 delete from md_association where componentID = 'e97fc6c6-68c0-46d9-8cf7-be04092a2762' and ( versiontype = 0 or versiontype is null );
 delete from md_property where classID in ( select distinct id from md_class where componentID = 'e97fc6c6-68c0-46d9-8cf7-be04092a2762' ) and ( versiontype = 0 or versiontype is null );
 delete from md_bizitfmap where classID in ( select distinct id from md_class where componentID = 'e97fc6c6-68c0-46d9-8cf7-be04092a2762' );
 delete from md_bizitfmap where classID in ( select id from md_opinterface where componentID = 'e97fc6c6-68c0-46d9-8cf7-be04092a2762' and ( versiontype = 0 or versiontype is null ) );
 delete from md_accessorpara where id in ( select distinct id from md_class where componentID = 'e97fc6c6-68c0-46d9-8cf7-be04092a2762' );
 delete from md_enumvalue where id in ( select distinct id from md_class where componentID = 'e97fc6c6-68c0-46d9-8cf7-be04092a2762' ) and ( versiontype = 0 or versiontype is null );
 delete from md_class where componentID = 'e97fc6c6-68c0-46d9-8cf7-be04092a2762' and ( versiontype = 0 or versiontype is null );
 delete from md_component where id = 'e97fc6c6-68c0-46d9-8cf7-be04092a2762' and ( versiontype = 0 or versiontype is null );
 delete from md_table where ( id = 'bd_construction' );
 delete from md_column where ( id = 'bd_construction@@PK@@' );
 delete from md_column where ( id = 'bd_construction@@@teamname' );
 delete from md_column where ( id = 'bd_construction@@@photo' );
 delete from md_column where ( id = 'bd_construction@@@phone' );
 delete from md_column where ( id = 'bd_construction@@@rate' );
 delete from md_column where ( id = 'bd_construction@@@jobscope' );
 delete from md_column where ( id = 'bd_construction@@@owner' );
 delete from md_column where ( id = 'bd_construction@@@ownerid' );
 delete from md_column where ( id = 'bd_construction@@@agent' );
 delete from md_column where ( id = 'bd_construction@@@agentid' );
 delete from md_column where ( id = 'bd_construction@@@creator' );
 delete from md_column where ( id = 'bd_construction@@@creatorid' );
 delete from md_column where ( id = 'bd_construction@@@teammemo' );
 delete from md_column where ( id = 'bd_construction@@@createtime' );
 delete from md_column where ( id = 'bd_construction@@@blstatus' );
 delete from md_column where ( id = 'bd_construction@@@blmemo' );



 insert into md_component ( createtime, tenantid, resid, ts, resmodule, version, namespace, creator, fromsourcebmf, modifier, id, help, description, preload, name, ownmodule, versiontype, displayname, industry, modifytime, isbizmodel, dr ) values ( '2018-09-18 17:58:55', null, null, '2019-06-19 12:07:09', 'team', '11', 'dingCMS', null, 'Y', null, 'e97fc6c6-68c0-46d9-8cf7-be04092a2762', null, null, null, 'team', 'dingCMS', 0, 'construction', '0', '2019-06-19 11:18:06', 'N', 0 );
 insert into md_class ( modinfoclassname, createtime, parentclassid, ts, userdefclassname, iscreatesql, creator, id, help, bizitfimpclassname, description, name, refmodelname, industry, modifytime, dr, accessorclassname, tenantid, isprimary, resid, isauthen, keyattribute, fullclassname, classtype, returntype, componentid, isactive, modifier, stereotype, isextendbean, defaulttablename, versiontype, displayname, precise, fixedlength ) values ( null, '2018-09-18 17:58:58', null, '2019-06-19 12:07:09', null, 'Y', null, '77046f32-10bd-4b56-afb2-849e89035a7d', null, null, null, 'construction', null, '0', '2019-06-19 12:03:02', 0, 'nc.md.model.access.javamap.POJOStyle', null, 'Y', null, 'Y', 'a92d6a67-535e-4c98-a9ba-416ada57a7ce', 'com.ding.cms.entity.Construction', 201, null, 'e97fc6c6-68c0-46d9-8cf7-be04092a2762', null, null, null, null, 'bd_construction', 0, '工长团队', null, null );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2019-06-19 12:07:09', 0, null, '77046f32-10bd-4b56-afb2-849e89035a7d', 'N', null, 'N', null, 'N', 'a92d6a67-535e-4c98-a9ba-416ada57a7ce', null, 300, null, 'id', null, '0', null, null, 0, null, null, 'N', null, 'Y', 0, 'N', null, 'Y', 36, null, 'BS000010000100001051', 'N', null, 'N', 0, '主键', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2019-06-19 12:07:09', 0, null, '77046f32-10bd-4b56-afb2-849e89035a7d', 'N', null, 'N', null, 'N', '322dec17-413b-40f2-b5bd-4cfe6c91775b', null, 300, null, 'teamname', null, '0', null, null, 0, null, null, 'N', null, 'Y', 1, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '工长名称', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2019-06-19 12:07:09', 0, null, '77046f32-10bd-4b56-afb2-849e89035a7d', 'N', null, 'N', null, 'N', 'a57cb7a0-084e-4e2f-8297-fc36992ff212', null, 300, null, 'photo', null, '0', null, null, 0, null, null, 'N', null, 'Y', 2, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '工长头像', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2019-06-19 12:07:09', 0, null, '77046f32-10bd-4b56-afb2-849e89035a7d', 'N', null, 'N', null, 'N', 'e924a107-d29d-4138-b6c4-6b6af733e78b', null, 300, null, 'phone', null, '0', null, null, 0, null, null, 'N', null, 'Y', 3, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '手机号', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2019-06-19 12:07:09', 0, null, '77046f32-10bd-4b56-afb2-849e89035a7d', 'N', null, 'N', null, 'N', '1f849eda-b557-4767-a9af-ce0f88a1ba21', null, 300, null, 'rate', null, '0', null, null, 0, null, null, 'N', null, 'Y', 4, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '评分等级', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2019-06-19 12:07:09', 0, null, '77046f32-10bd-4b56-afb2-849e89035a7d', 'N', null, 'N', null, 'N', '348f1b1e-6e40-48f1-92be-4ca00fabd6fb', null, 300, null, 'jobscope', null, '0', null, null, 0, null, null, 'N', null, 'Y', 5, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '工种', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2019-06-19 12:07:09', 0, null, '77046f32-10bd-4b56-afb2-849e89035a7d', 'N', null, 'N', null, 'N', 'b9e48ea9-f901-46f7-931c-0c6c71481a9c', null, 300, null, 'owner', null, '0', null, null, 0, null, null, 'N', null, 'Y', 6, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '负责人', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2019-06-19 12:07:09', 0, null, '77046f32-10bd-4b56-afb2-849e89035a7d', 'N', null, 'N', null, 'N', '8f75ac9f-8e34-466c-a507-5dccb7eaab74', null, 300, null, 'ownerid', null, '0', null, null, 0, null, null, 'N', null, 'Y', 7, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '负责人id', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2019-06-19 12:07:09', 0, null, '77046f32-10bd-4b56-afb2-849e89035a7d', 'N', null, 'N', null, 'N', '7a75ed6b-5018-48e0-a898-4ff96a4a84ea', null, 300, null, 'agent', null, '0', null, null, 0, null, null, 'N', null, 'Y', 8, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '运营商', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2019-06-19 12:07:09', 0, null, '77046f32-10bd-4b56-afb2-849e89035a7d', 'N', null, 'N', null, 'N', '416fcbf2-534c-4168-9422-f03d18957d98', null, 300, null, 'agentid', null, '0', null, null, 0, null, null, 'N', null, 'Y', 9, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '运营商ID', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2019-06-19 12:07:09', 0, null, '77046f32-10bd-4b56-afb2-849e89035a7d', 'N', null, 'N', null, 'N', 'd4c0fd67-d70f-4fcf-9690-ff4311cbe99b', null, 300, null, 'creator', null, '0', null, null, 0, null, null, 'N', null, 'Y', 10, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '创建人', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2019-06-19 12:07:09', 0, null, '77046f32-10bd-4b56-afb2-849e89035a7d', 'N', null, 'N', null, 'N', '6f0bb502-c911-450a-9a19-c1989da43f42', null, 300, null, 'creatorid', null, '0', null, null, 0, null, null, 'N', null, 'Y', 11, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '创建人id', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2019-06-19 12:07:09', 0, null, '77046f32-10bd-4b56-afb2-849e89035a7d', 'N', null, 'N', null, 'N', '94f37094-78b6-4019-815f-d2b8a7243a1d', null, 300, null, 'teammemo', null, '0', null, null, 0, null, null, 'N', null, 'Y', 12, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '备注', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2019-06-19 12:07:09', 0, null, '77046f32-10bd-4b56-afb2-849e89035a7d', 'N', null, 'N', null, 'N', 'c7442432-3b6d-4835-a1ce-b760ab5bc882', null, 300, null, 'createtime', null, '0', null, null, 0, null, null, 'N', null, 'Y', 13, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '创建时间', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2019-06-19 12:07:09', 0, null, '77046f32-10bd-4b56-afb2-849e89035a7d', 'N', null, 'N', null, 'N', 'ea484fb8-0470-48f1-ad3b-efe5c303457b', null, 300, null, 'blstatus', null, '0', null, null, 0, null, null, 'N', null, 'Y', 14, 'Y', null, 'Y', null, null, 'BS000010000100001004', 'N', null, 'N', 0, '是否加入黑名单', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2019-06-19 12:07:09', 0, null, '77046f32-10bd-4b56-afb2-849e89035a7d', 'N', null, 'N', null, 'N', 'f94b96e7-4ee1-45b5-a9a7-d6a459f61706', null, 300, null, 'blmemo', null, '0', null, null, 0, null, null, 'N', null, 'Y', 15, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '原因', null, 'N' );
 insert into md_table ( createtime, tenantid, resid, ts, isextendtable, resmodule, creator, fromsourcebmf, modifier, id, isactive, help, databaseid, description, name, versiontype, industry, displayname, modifytime, parenttable, dr ) values ( '2018-09-18 17:58:58', null, null, '2019-06-19 12:07:09', 'N', 'team', null, 'Y', null, 'bd_construction', null, null, null, null, 'bd_construction', 0, '0', '工长团队', '2019-06-19 12:03:02', null, 0 );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2019-06-19 12:07:09', null, 'bd_construction@@PK@@', null, 'char', null, null, 'id', null, null, null, null, 0, null, 36, null, 'Y', 'N', 'Y', null, 0, null, 0, 'bd_construction', '主键', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2019-06-19 12:07:09', null, 'bd_construction@@@teamname', null, 'varchar', null, null, 'teamname', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 1, null, 0, 'bd_construction', '工长名称', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2019-06-19 12:07:09', null, 'bd_construction@@@photo', null, 'varchar', null, null, 'photo', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 2, null, 0, 'bd_construction', '工长头像', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2019-06-19 12:07:09', null, 'bd_construction@@@phone', null, 'varchar', null, null, 'phone', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 3, null, 0, 'bd_construction', '手机号', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2019-06-19 12:07:09', null, 'bd_construction@@@rate', null, 'varchar', null, null, 'rate', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 4, null, 0, 'bd_construction', '评分等级', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2019-06-19 12:07:09', null, 'bd_construction@@@jobscope', null, 'varchar', null, null, 'jobscope', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 5, null, 0, 'bd_construction', '工种', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2019-06-19 12:07:09', null, 'bd_construction@@@owner', null, 'varchar', null, null, 'owner', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 6, null, 0, 'bd_construction', '负责人', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2019-06-19 12:07:09', null, 'bd_construction@@@ownerid', null, 'varchar', null, null, 'ownerid', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 7, null, 0, 'bd_construction', '负责人id', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2019-06-19 12:07:09', null, 'bd_construction@@@agent', null, 'varchar', null, null, 'agent', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 8, null, 0, 'bd_construction', '运营商', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2019-06-19 12:07:09', null, 'bd_construction@@@agentid', null, 'varchar', null, null, 'agentid', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 9, null, 0, 'bd_construction', '运营商ID', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2019-06-19 12:07:09', null, 'bd_construction@@@creator', null, 'varchar', null, null, 'creator', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 10, null, 0, 'bd_construction', '创建人', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2019-06-19 12:07:09', null, 'bd_construction@@@creatorid', null, 'varchar', null, null, 'creatorid', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 11, null, 0, 'bd_construction', '创建人id', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2019-06-19 12:07:09', null, 'bd_construction@@@teammemo', null, 'varchar', null, null, 'teammemo', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 12, null, 0, 'bd_construction', '备注', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2019-06-19 12:07:09', null, 'bd_construction@@@createtime', null, 'varchar', null, null, 'createtime', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 13, null, 0, 'bd_construction', '创建时间', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2019-06-19 12:07:09', null, 'bd_construction@@@blstatus', null, 'int', null, null, 'blstatus', null, null, null, null, 0, null, null, null, 'N', 'Y', 'Y', null, 14, null, 0, 'bd_construction', '是否加入黑名单', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2019-06-19 12:07:09', null, 'bd_construction@@@blmemo', null, 'varchar', null, null, 'blmemo', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 15, null, 0, 'bd_construction', '原因', null );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2019-06-19 12:07:09', 'bd_construction@@@teamname', '77046f32-10bd-4b56-afb2-849e89035a7d', 'bd_construction', '322dec17-413b-40f2-b5bd-4cfe6c91775b', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2019-06-19 12:07:09', 'bd_construction@@@photo', '77046f32-10bd-4b56-afb2-849e89035a7d', 'bd_construction', 'a57cb7a0-084e-4e2f-8297-fc36992ff212', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2019-06-19 12:07:09', 'bd_construction@@@agent', '77046f32-10bd-4b56-afb2-849e89035a7d', 'bd_construction', '7a75ed6b-5018-48e0-a898-4ff96a4a84ea', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2019-06-19 12:07:09', 'bd_construction@@@phone', '77046f32-10bd-4b56-afb2-849e89035a7d', 'bd_construction', 'e924a107-d29d-4138-b6c4-6b6af733e78b', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2019-06-19 12:07:09', 'bd_construction@@@blmemo', '77046f32-10bd-4b56-afb2-849e89035a7d', 'bd_construction', 'f94b96e7-4ee1-45b5-a9a7-d6a459f61706', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2019-06-19 12:07:09', 'bd_construction@@@agentid', '77046f32-10bd-4b56-afb2-849e89035a7d', 'bd_construction', '416fcbf2-534c-4168-9422-f03d18957d98', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2019-06-19 12:07:09', 'bd_construction@@@creatorid', '77046f32-10bd-4b56-afb2-849e89035a7d', 'bd_construction', '6f0bb502-c911-450a-9a19-c1989da43f42', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2019-06-19 12:07:09', 'bd_construction@@@teammemo', '77046f32-10bd-4b56-afb2-849e89035a7d', 'bd_construction', '94f37094-78b6-4019-815f-d2b8a7243a1d', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2019-06-19 12:07:09', 'bd_construction@@PK@@', '77046f32-10bd-4b56-afb2-849e89035a7d', 'bd_construction', 'a92d6a67-535e-4c98-a9ba-416ada57a7ce', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2019-06-19 12:07:09', 'bd_construction@@@blstatus', '77046f32-10bd-4b56-afb2-849e89035a7d', 'bd_construction', 'ea484fb8-0470-48f1-ad3b-efe5c303457b', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2019-06-19 12:07:09', 'bd_construction@@@jobscope', '77046f32-10bd-4b56-afb2-849e89035a7d', 'bd_construction', '348f1b1e-6e40-48f1-92be-4ca00fabd6fb', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2019-06-19 12:07:09', 'bd_construction@@@createtime', '77046f32-10bd-4b56-afb2-849e89035a7d', 'bd_construction', 'c7442432-3b6d-4835-a1ce-b760ab5bc882', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2019-06-19 12:07:09', 'bd_construction@@@rate', '77046f32-10bd-4b56-afb2-849e89035a7d', 'bd_construction', '1f849eda-b557-4767-a9af-ce0f88a1ba21', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2019-06-19 12:07:09', 'bd_construction@@@creator', '77046f32-10bd-4b56-afb2-849e89035a7d', 'bd_construction', 'd4c0fd67-d70f-4fcf-9690-ff4311cbe99b', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2019-06-19 12:07:09', 'bd_construction@@@owner', '77046f32-10bd-4b56-afb2-849e89035a7d', 'bd_construction', 'b9e48ea9-f901-46f7-931c-0c6c71481a9c', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2019-06-19 12:07:09', 'bd_construction@@@ownerid', '77046f32-10bd-4b56-afb2-849e89035a7d', 'bd_construction', '8f75ac9f-8e34-466c-a507-5dccb7eaab74', 0 );
