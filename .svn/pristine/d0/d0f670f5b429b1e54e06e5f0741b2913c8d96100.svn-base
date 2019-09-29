var productmeta = {
	meta : {
		billid : {
		},
		// 工程编号
		vbillcode : {},
		// 交易
		dealid : {},
		// 客户
		customerid : {},
		name : {},
		phone : {},
		// 房屋
		houseid : {},
		// 总金额
		totalamount : {},
		// 已支付金额
		paidamount : {},
		// 物料调配菜状态
		materialstate : {},
		// 工程服务状态
		servicestate : {},
		// 工人状态
		constructionstate : {},
		// 支付状态
		paystate : {},
		// 客服
		username : {},
		userid : {},
		// 勘察
		surveyname : {},
		surveyid : {},
		// 工人
		constructionname : {},
		constructionid : {},
		// 管家
		supervisor : {},
		supervisorid : {},
		// note  备注
		note : {},
		creator : {},
		createtime : {},
		modifier : {},
		modifytime : {},
	}
};
var paymentmeta = {
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
		oldorderid :{
		    type : 'string'
		},
		neworderid :{
		    type : 'string'
		},
		//创建人
		creator : {
			type : 'string'
		},
		//创建人id
		creatorid : {
			type : 'string'
		},
		//创建时间
		createtime : {
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
		}
	}
};
