 create table log_user ( createname varchar ( 50 ) NULL , userid varchar ( 50 ) NULL , username varchar ( 50 ) NULL , memotype varchar ( 50 ) NULL , createorid varchar ( 50 ) NULL , role varchar ( 50 ) NULL , memo varchar ( 50 ) NULL , logid char ( 36 ) NOT NULL , CONSTRAINT PK_LOG_USER PRIMARY KEY ( logid ) , ts datetime NULL , dr smallint default 0 );
 create table ext_log_user ( ext_logid char ( 36 ) NOT NULL , CONSTRAINT PK_ext_log_user PRIMARY KEY ( ext_logid ) , ts datetime NULL , dr smallint default 0 );
