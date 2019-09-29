var  _paymentmeta = {
	meta:{
		//主键
		paymentid :'',
		billid:{},
        vbillcode:{},
		//类型
		type : {
			required : true,
			type : 'integer',
			nullMsg : '类型不能为空!',
			default:0
		},
		//审核状态
		auditstate : {
			type : 'integer',
			default:0
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
		//付款人
		paymenter :{
			type : 'string',
			required : true,
			nullMsg:'付款人姓名不能为空!'
		},
		//付款时间
		paymenttime  : {
			type : 'string',
			required : true,
			nullMsg:'付款时间不能为空!'
		},
		//付款方式
		paymentmethod : {
			type : 'string',
			required : true,
			nullMsg:'付款方式不能为空!'
		},
		//款项类型
		paymenttype :{
			type : 'string',
			required : true,
			nullMsg:'款项类型不能为空!'
		},
		/*
		//退款人
				refunder :{
					type : 'string',
					required : true,
					nullMsg:'退款人不能为空!'
				},
				//退款账号
				refundnumber :{
					type : 'string',
					required : true,
					nullMsg:'退款账号不能为空!'
				},
				//退款方式
				refundmethod :{
					type : 'string',
					required : true,
					nullMsg:'退款方式不能为空!'
				}, */

	}
};
var searchmeta = {
	meta:{
        state:{},
        type:{}
	}
};
var _productmeta = {
	meta : {
		name : {},
		phone : {},
		billid : '',
		// 工程编号
		vbillcode : {},
		// 已支付金额
		paidamount : {},
        // 总金额
        totalamount : {},
		// 工程服务状态
		servicestate : {},
		// 组织
		orgname : {},
		orgid : {},
		// 运营商
		agentname : {},
		agentid : {},
		// 交易
		dealid : {},
		// 客户
		customerid : {},
		// 房屋
		houseid : {},
		// 物料调配菜状态
		materialstate : {},
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
		//材料费
		materialcosts:{},
		//服务费
		servicecharge:{},
	}
};
var financialAuditmeta = {
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
			type : 'integer',
			required:true,
			nullMsg:'请勾选审核结果'
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
		startTime :{
			type : 'string',
		},
		endTime:{
			type : 'string'
		}
	}
};
