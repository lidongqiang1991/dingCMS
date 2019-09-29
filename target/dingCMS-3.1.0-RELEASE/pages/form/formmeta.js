var formmeta = {
	meta : {
		formid : '',
		formcode : {},
		formname : {},
		version : {},
		memo : {},
		id_formb : {},
	}
};
var formbmeta = {
	meta : {
		formbid :'',
		formid : {},
		displayname : {
			type : 'string',
			required : true,
			nullMsg : '显示名称不能为空!'
		},
		attribute : {
			type : 'string',
			required : true,
			nullMsg : '字段属性不能为空!'
		},
		type : {
			type : 'string',
			required : true,
			nullMsg : '类型不能为空!'
		},
		memo : {},
		fk_id_formb:{}
	}
}; 