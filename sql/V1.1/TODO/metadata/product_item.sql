﻿
 delete from md_db_relation where startattrid in ( select id from md_property where classid in ( '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', '@@@@' ) and ( versiontype = 0 or versiontype is null ) ) and starttableid in ( 'bd_productitem', '@@@@' );
 delete from md_ormap where ATTRIBUTEID in ( select id from md_property where classid in ( '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', '@@@@' ) and ( versiontype = 0 or versiontype is null ) ) and tableid in ( 'bd_productitem', '@@@@' );
 delete from md_table where id not in ( select distinct tableid from md_ormap ) and ( versiontype = 0 or versiontype is null );
 delete from md_column where tableid in ( 'bd_productitem', '@@@@' ) and id not in ( select distinct columnid from md_ormap ) and ( ifnull( groupid, '~' ) = '~' or groupid = id ) and name <> 'extend_bean_tag';
 delete from md_column where tableid in ( 'bd_productitem', '@@@@' ) and groupid is not null and groupid not in ( select distinct t.id from ( select * from md_column ) t where tableid in ( 'bd_productitem', '@@@@' ) );
 delete from md_db_relation where starttableid not in ( select id from md_table );
 delete from md_association where componentID = 'e7f3dec3-f970-478f-952d-57ac9e847199' and ( versiontype = 0 or versiontype is null );
 delete from md_property where classID in ( select distinct id from md_class where componentID = 'e7f3dec3-f970-478f-952d-57ac9e847199' ) and ( versiontype = 0 or versiontype is null );
 delete from md_bizitfmap where classID in ( select distinct id from md_class where componentID = 'e7f3dec3-f970-478f-952d-57ac9e847199' );
 delete from md_bizitfmap where classID in ( select id from md_opinterface where componentID = 'e7f3dec3-f970-478f-952d-57ac9e847199' and ( versiontype = 0 or versiontype is null ) );
 delete from md_accessorpara where id in ( select distinct id from md_class where componentID = 'e7f3dec3-f970-478f-952d-57ac9e847199' );
 delete from md_enumvalue where id in ( select distinct id from md_class where componentID = 'e7f3dec3-f970-478f-952d-57ac9e847199' ) and ( versiontype = 0 or versiontype is null );
 delete from md_class where componentID = 'e7f3dec3-f970-478f-952d-57ac9e847199' and ( versiontype = 0 or versiontype is null );
 delete from md_component where id = 'e7f3dec3-f970-478f-952d-57ac9e847199' and ( versiontype = 0 or versiontype is null );
 delete from md_table where ( id = 'bd_productitem' );
 delete from md_column where ( id = 'bd_productitem@@PK@@' );
 delete from md_column where ( id = 'bd_productitem@@@itemcode' );
 delete from md_column where ( id = 'bd_productitem@@@itemname' );
 delete from md_column where ( id = 'bd_productitem@@@type' );
 delete from md_column where ( id = 'bd_productitem@@@price' );
 delete from md_column where ( id = 'bd_productitem@@@materialid' );
 delete from md_column where ( id = 'bd_productitem@@@materialname' );
 delete from md_column where ( id = 'bd_productitem@@@materialcost' );
 delete from md_column where ( id = 'bd_productitem@@@servicecost' );
 delete from md_column where ( id = 'bd_productitem@@@materialamount' );
 delete from md_column where ( id = 'bd_productitem@@@memo' );
 delete from md_column where ( id = 'bd_productitem@@@orgid' );
 delete from md_column where ( id = 'bd_productitem@@@orgname' );
 delete from md_column where ( id = 'bd_productitem@@@creator' );
 delete from md_column where ( id = 'bd_productitem@@@creatorid' );
 delete from md_column where ( id = 'bd_productitem@@@createtime' );
 delete from md_column where ( id = 'bd_productitem@@@modifier' );
 delete from md_column where ( id = 'bd_productitem@@@modifierid' );
 delete from md_column where ( id = 'bd_productitem@@@modifytime' );



 insert into md_component ( createtime, tenantid, resid, ts, resmodule, version, namespace, creator, fromsourcebmf, modifier, id, help, description, preload, name, ownmodule, versiontype, displayname, industry, modifytime, isbizmodel, dr ) values ( '2018-10-11 09:44:31', null, null, '2018-12-24 10:17:22', 'product_item', '6', 'dingCMS', null, 'Y', null, 'e7f3dec3-f970-478f-952d-57ac9e847199', null, null, null, 'product_item', 'dingCMS', 0, '产品细项', '0', '2018-12-18 10:58:56', 'N', 0 );
 insert into md_class ( modinfoclassname, createtime, parentclassid, ts, userdefclassname, iscreatesql, creator, id, help, bizitfimpclassname, description, name, refmodelname, industry, modifytime, dr, accessorclassname, tenantid, isprimary, resid, isauthen, keyattribute, fullclassname, classtype, returntype, componentid, isactive, modifier, stereotype, isextendbean, defaulttablename, versiontype, displayname, precise, fixedlength ) values ( null, '2018-10-11 09:44:34', null, '2018-12-24 10:17:22', null, 'Y', null, '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', null, null, null, 'Productitem', null, '0', '2018-12-18 10:59:22', 0, 'nc.md.model.access.javamap.POJOStyle', null, 'Y', null, 'Y', '1442f484-2f64-4bd9-9feb-37e2d3d3bdb3', 'com.ding.cms.entity.Productitem', 201, null, 'e7f3dec3-f970-478f-952d-57ac9e847199', null, null, null, null, 'bd_productitem', 0, '产品细项', null, null );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2018-12-24 10:17:22', 0, null, '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'N', null, 'N', null, 'N', '1442f484-2f64-4bd9-9feb-37e2d3d3bdb3', null, 300, null, 'itemid', null, '0', null, null, 0, null, null, 'N', null, 'Y', 0, 'N', null, 'Y', 36, null, 'BS000010000100001051', 'N', null, 'N', 0, '主键', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2018-12-24 10:17:22', 0, null, '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'N', null, 'N', null, 'N', 'ba5de2f5-9c7c-4531-a00c-97f8a7e16f0c', null, 300, null, 'itemcode', null, '0', null, null, 0, null, null, 'N', null, 'Y', 1, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '细项编码', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2018-12-24 10:17:22', 0, null, '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'N', null, 'N', null, 'N', '2fca44b1-df01-4775-925f-c6d59cbc4607', null, 300, null, 'itemname', null, '0', null, null, 0, null, null, 'N', null, 'Y', 2, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '细项名称', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2018-12-24 10:17:22', 0, null, '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'N', null, 'N', null, 'N', '262afaaf-ef2a-46ec-ba71-b9d6469d8df7', null, 300, null, 'type', null, '0', null, null, 0, null, null, 'N', null, 'Y', 3, 'Y', null, 'Y', null, null, 'BS000010000100001004', 'N', null, 'N', 0, '类型', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2018-12-24 10:17:22', 0, null, '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'N', null, 'N', null, 'N', 'bad3092f-ebb4-467b-a421-56946f0b59ec', null, 300, '细项的单价', 'price', null, '0', null, null, 0, null, null, 'N', null, 'Y', 4, 'Y', null, 'Y', 28, null, 'BS000010000100001031', 'N', null, 'N', 0, '单价', 8, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2018-12-24 10:17:22', 0, null, '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'N', null, 'N', null, 'N', 'bc9bd643-6712-487a-84d8-3b9f14cb7bc7', null, 300, null, 'materialid', null, '0', null, null, 0, null, null, 'N', null, 'Y', 5, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '材料id', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2018-12-24 10:17:22', 0, null, '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'N', null, 'N', null, 'N', '082d5ac3-3c57-4ff9-b97d-4625932841e8', null, 300, null, 'materialname', null, '0', null, null, 0, null, null, 'N', null, 'Y', 6, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '材料名称', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2018-12-24 10:17:22', 0, null, '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'N', null, 'N', null, 'N', '9866d2f1-6610-44f8-81f2-cde7b50cf746', null, 300, '材料定价', 'materialcost', null, '0', null, null, 0, null, null, 'N', null, 'Y', 7, 'Y', null, 'Y', 28, null, 'BS000010000100001031', 'N', null, 'N', 0, '材料成本', 8, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2018-12-24 10:17:22', 0, null, '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'N', null, 'N', null, 'N', '24064047-e071-4942-b4ee-9b7ad5afbb0f', null, 300, '服务费', 'servicecost', null, '0', null, null, 0, null, null, 'N', null, 'Y', 8, 'Y', null, 'Y', 28, null, 'BS000010000100001031', 'N', null, 'N', 0, '服务费', 8, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2018-12-24 10:17:22', 0, null, '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'N', null, 'N', null, 'N', '9e6a2443-45e2-4481-b53f-da2bf9251a9e', null, 300, null, 'materialamount', null, '0', null, null, 0, null, null, 'N', null, 'Y', 9, 'Y', null, 'Y', 28, null, 'BS000010000100001031', 'N', null, 'N', 0, '材料消耗量', 8, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2018-12-24 10:17:22', 0, null, '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'N', null, 'N', null, 'N', '5761a77b-a632-4e34-bd2e-915d6f0399c6', null, 300, null, 'memo', null, '0', null, null, 0, null, null, 'N', null, 'Y', 10, 'Y', null, 'Y', 500, null, 'BS000010000100001001', 'N', null, 'N', 0, '备注', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2018-12-24 10:17:22', 0, null, '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'N', null, 'N', null, 'N', '0fdf5ebf-4f28-448b-88a2-67d0ab16117b', null, 300, null, 'orgid', null, '0', null, null, 0, null, null, 'N', null, 'Y', 11, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '运营中心id', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2018-12-24 10:17:22', 0, null, '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'N', null, 'N', null, 'N', '5b72e146-5db2-4e78-aee4-abfb779fba7e', null, 300, null, 'orgname', null, '0', null, null, 0, null, null, 'N', null, 'Y', 12, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '运营中心', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2018-12-24 10:17:22', 0, null, '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'N', null, 'N', null, 'N', 'cfa2b34f-7a07-4716-8d46-3aa199d1d733', null, 300, null, 'creator', null, '0', null, null, 0, null, null, 'N', null, 'Y', 13, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '创建人', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2018-12-24 10:17:22', 0, null, '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'N', null, 'N', null, 'N', '2c011e76-73ab-4ec1-91ed-895a62584c70', null, 300, null, 'creatorid', null, '0', null, null, 0, null, null, 'N', null, 'Y', 14, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '创建人id', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2018-12-24 10:17:22', 0, null, '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'N', null, 'N', null, 'N', '4118d67e-e40e-4735-9260-389e49744b79', null, 300, null, 'createtime', null, '0', null, null, 0, null, null, 'N', null, 'Y', 15, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '创建时间', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2018-12-24 10:17:22', 0, null, '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'N', null, 'N', null, 'N', 'd902bc1e-ce92-49c7-b7b7-322e409ff38e', null, 300, null, 'modifier', null, '0', null, null, 0, null, null, 'N', null, 'Y', 16, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '修改人', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2018-12-24 10:17:22', 0, null, '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'N', null, 'N', null, 'N', '62654afb-abd0-469f-9388-8c61f2c9a0d7', null, 300, null, 'modifierid', null, '0', null, null, 0, null, null, 'N', null, 'Y', 17, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '修改人id', null, 'N' );
 insert into md_property ( dynamicattr, createtime, ts, visibility, dynamictable, classid, accesspower, attrmaxvalue, notserialize, creator, calculation, id, help, datatypestyle, description, name, refmodelname, industry, defaultvalue, modifytime, dr, accessorclassname, tenantid, hided, resid, isauthen, attrsequence, nullable, attrminvalue, isactive, attrlength, modifier, datatype, readonly, accesspowergroup, customattr, versiontype, displayname, precise, fixedlength ) values ( 'N', null, '2018-12-24 10:17:22', 0, null, '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'N', null, 'N', null, 'N', 'e810a34f-9817-4911-a67b-b3f3c72b10c3', null, 300, null, 'modifytime', null, '0', null, null, 0, null, null, 'N', null, 'Y', 18, 'Y', null, 'Y', 50, null, 'BS000010000100001001', 'N', null, 'N', 0, '修改时间', null, 'N' );
 insert into md_table ( createtime, tenantid, resid, ts, isextendtable, resmodule, creator, fromsourcebmf, modifier, id, isactive, help, databaseid, description, name, versiontype, industry, displayname, modifytime, parenttable, dr ) values ( '2018-10-11 09:44:34', null, null, '2018-12-24 10:17:22', 'N', 'product_item', null, 'Y', null, 'bd_productitem', null, null, null, null, 'bd_productitem', 0, '0', '产品细项', '2018-12-18 10:59:22', null, 0 );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2018-12-24 10:17:22', null, 'bd_productitem@@PK@@', null, 'char', null, null, 'itemid', null, null, null, null, 0, null, 36, null, 'Y', 'N', 'Y', null, 0, null, 0, 'bd_productitem', '主键', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2018-12-24 10:17:22', null, 'bd_productitem@@@itemcode', null, 'varchar', null, null, 'itemcode', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 1, null, 0, 'bd_productitem', '细项编码', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2018-12-24 10:17:22', null, 'bd_productitem@@@itemname', null, 'varchar', null, null, 'itemname', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 2, null, 0, 'bd_productitem', '细项名称', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2018-12-24 10:17:22', null, 'bd_productitem@@@type', null, 'int', null, null, 'type', null, null, null, null, 0, null, null, null, 'N', 'Y', 'Y', null, 3, null, 0, 'bd_productitem', '类型', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2018-12-24 10:17:22', null, 'bd_productitem@@@price', null, 'decimal', null, '细项的单价', 'price', null, null, null, null, 0, null, 28, null, 'N', 'Y', 'Y', null, 4, null, 0, 'bd_productitem', '单价', 8 );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2018-12-24 10:17:22', null, 'bd_productitem@@@materialid', null, 'varchar', null, null, 'materialid', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 5, null, 0, 'bd_productitem', '材料id', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2018-12-24 10:17:22', null, 'bd_productitem@@@materialname', null, 'varchar', null, null, 'materialname', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 6, null, 0, 'bd_productitem', '材料名称', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2018-12-24 10:17:22', null, 'bd_productitem@@@materialcost', null, 'decimal', null, '材料定价', 'materialcost', null, null, null, null, 0, null, 28, null, 'N', 'Y', 'Y', null, 7, null, 0, 'bd_productitem', '材料成本', 8 );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2018-12-24 10:17:22', null, 'bd_productitem@@@servicecost', null, 'decimal', null, '服务费', 'servicecost', null, null, null, null, 0, null, 28, null, 'N', 'Y', 'Y', null, 8, null, 0, 'bd_productitem', '服务费', 8 );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2018-12-24 10:17:22', null, 'bd_productitem@@@materialamount', null, 'decimal', null, null, 'materialamount', null, null, null, null, 0, null, 28, null, 'N', 'Y', 'Y', null, 9, null, 0, 'bd_productitem', '材料消耗量', 8 );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2018-12-24 10:17:22', null, 'bd_productitem@@@memo', null, 'varchar', null, null, 'memo', null, null, null, null, 0, null, 500, null, 'N', 'Y', 'Y', null, 10, null, 0, 'bd_productitem', '备注', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2018-12-24 10:17:22', null, 'bd_productitem@@@orgid', null, 'varchar', null, null, 'orgid', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 11, null, 0, 'bd_productitem', '运营中心id', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2018-12-24 10:17:22', null, 'bd_productitem@@@orgname', null, 'varchar', null, null, 'orgname', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 12, null, 0, 'bd_productitem', '运营中心', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2018-12-24 10:17:22', null, 'bd_productitem@@@creator', null, 'varchar', null, null, 'creator', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 13, null, 0, 'bd_productitem', '创建人', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2018-12-24 10:17:22', null, 'bd_productitem@@@creatorid', null, 'varchar', null, null, 'creatorid', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 14, null, 0, 'bd_productitem', '创建人id', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2018-12-24 10:17:22', null, 'bd_productitem@@@createtime', null, 'varchar', null, null, 'createtime', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 15, null, 0, 'bd_productitem', '创建时间', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2018-12-24 10:17:22', null, 'bd_productitem@@@modifier', null, 'varchar', null, null, 'modifier', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 16, null, 0, 'bd_productitem', '修改人', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2018-12-24 10:17:22', null, 'bd_productitem@@@modifierid', null, 'varchar', null, null, 'modifierid', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 17, null, 0, 'bd_productitem', '修改人id', null );
 insert into md_column ( createtime, forlocale, columntype, ts, creator, id, help, sqldatetype, groupid, description, name, incrementseed, incrementstep, defaultvalue, modifytime, dr, tenantid, columnlength, resid, pkey, nullable, isactive, modifier, columnsequence, identitied, versiontype, tableid, displayname, precise ) values ( null, 'N', 0, '2018-12-24 10:17:22', null, 'bd_productitem@@@modifytime', null, 'varchar', null, null, 'modifytime', null, null, null, null, 0, null, 50, null, 'N', 'Y', 'Y', null, 18, null, 0, 'bd_productitem', '修改时间', null );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2018-12-24 10:17:22', 'bd_productitem@@@materialcost', '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'bd_productitem', '9866d2f1-6610-44f8-81f2-cde7b50cf746', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2018-12-24 10:17:22', 'bd_productitem@@@materialname', '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'bd_productitem', '082d5ac3-3c57-4ff9-b97d-4625932841e8', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2018-12-24 10:17:22', 'bd_productitem@@@orgname', '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'bd_productitem', '5b72e146-5db2-4e78-aee4-abfb779fba7e', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2018-12-24 10:17:22', 'bd_productitem@@@itemcode', '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'bd_productitem', 'ba5de2f5-9c7c-4531-a00c-97f8a7e16f0c', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2018-12-24 10:17:22', 'bd_productitem@@@modifierid', '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'bd_productitem', '62654afb-abd0-469f-9388-8c61f2c9a0d7', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2018-12-24 10:17:22', 'bd_productitem@@PK@@', '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'bd_productitem', '1442f484-2f64-4bd9-9feb-37e2d3d3bdb3', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2018-12-24 10:17:22', 'bd_productitem@@@servicecost', '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'bd_productitem', '24064047-e071-4942-b4ee-9b7ad5afbb0f', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2018-12-24 10:17:22', 'bd_productitem@@@materialid', '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'bd_productitem', 'bc9bd643-6712-487a-84d8-3b9f14cb7bc7', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2018-12-24 10:17:22', 'bd_productitem@@@modifier', '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'bd_productitem', 'd902bc1e-ce92-49c7-b7b7-322e409ff38e', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2018-12-24 10:17:22', 'bd_productitem@@@type', '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'bd_productitem', '262afaaf-ef2a-46ec-ba71-b9d6469d8df7', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2018-12-24 10:17:22', 'bd_productitem@@@creator', '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'bd_productitem', 'cfa2b34f-7a07-4716-8d46-3aa199d1d733', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2018-12-24 10:17:22', 'bd_productitem@@@materialamount', '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'bd_productitem', '9e6a2443-45e2-4481-b53f-da2bf9251a9e', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2018-12-24 10:17:22', 'bd_productitem@@@memo', '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'bd_productitem', '5761a77b-a632-4e34-bd2e-915d6f0399c6', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2018-12-24 10:17:22', 'bd_productitem@@@modifytime', '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'bd_productitem', 'e810a34f-9817-4911-a67b-b3f3c72b10c3', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2018-12-24 10:17:22', 'bd_productitem@@@orgid', '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'bd_productitem', '0fdf5ebf-4f28-448b-88a2-67d0ab16117b', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2018-12-24 10:17:22', 'bd_productitem@@@creatorid', '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'bd_productitem', '2c011e76-73ab-4ec1-91ed-895a62584c70', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2018-12-24 10:17:22', 'bd_productitem@@@price', '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'bd_productitem', 'bad3092f-ebb4-467b-a421-56946f0b59ec', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2018-12-24 10:17:22', 'bd_productitem@@@createtime', '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'bd_productitem', '4118d67e-e40e-4735-9260-389e49744b79', 0 );
 insert into md_ormap ( tenantid, ts, columnid, classid, tableid, attributeid, dr ) values ( null, '2018-12-24 10:17:22', 'bd_productitem@@@itemname', '9b8cfc83-fdc4-4dfd-8776-cd6ebc782d31', 'bd_productitem', '2fca44b1-df01-4775-925f-c6d59cbc4607', 0 );
