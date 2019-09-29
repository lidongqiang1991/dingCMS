var performancemeta = {
	meta : {
		//主键
		paymentid : '',
		//流水号
		serialnum : '',
		//工程服务id
		billid : {
			type : 'string'
		},
		//工程服务编号
		vbillcode : {
			type : 'string'
		},
		//审核状态
		auditstate : {
			type : 'integer'
		},
		//类型
		type : {
			required : true,
			type : 'integer',
			nullMsg : '类型不能为空!'
		},
		//支付金额
		paymoney : {
			type : 'float',
			required : true,
			regExp : /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,
			//notipFlag : true,
			// hasSuccess : true,
			errorMsg : "金额格式不正确!",
			nullMsg : "金额不能为空!"
		},
		//业务摘要
		billnote : {
			type : 'string',
			required : true,
			nullMsg : '业务摘要不能为空!'
		},
		//备注
		memo : {
			type : 'string'
		},
		//修改人
		modifier : {
			type : 'string'
		},
		//修改人id
		modifierid : {
			type : 'string'
		},
		//修改时间
		modifytime : {
			type : 'string'
		},
		//审核人
		auditor : {
			type : 'string'
		},
		//审核人id
		auditorid : {
			type : 'string'
		},
		//审核时间
		audittime : {
			type : 'string'
		},
		//审核批语
		auditnote : {
			type : 'string'
		},
		//付款人
		paymenter :{
			type : 'string',
		},
		//付款时间
		paymenttime  : {
			type : 'string',
		},
		//付款方式
		paymenttype : {
			type : 'string',
		},
		//款项类型
		paymenttype :{
			type : 'string',
		},
		name:{
			type : 'string',
		},
		phone:{
			type : 'string',
		},
		//付款人
		paymenter :{
			type : 'string',
		},
		//付款时间
		paymenttime  : {
			type : 'string',
		},
		//付款方式
		paymentmethod : {
			type : 'string',
		},
		//款项类型
		paymenttype :{
			type : 'string',
		},


	}
};
