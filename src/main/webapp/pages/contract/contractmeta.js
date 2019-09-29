/**
 * @author hxw
 */
var metaContract = {
	meta : {
		//主键
		contractid:{
			type:'string'
		},
		//合同编码
		contractcode:{
			type:'string',
			required:true,
			nullMsg:'合同编码不能为空!'
		},
		// //交易id
		// dealid: {
			 // type: 'string'
		// },
		//交易编码
		// dealcode: {
			// type: 'string'
		// },
		// //服务id
		// serviceid: {
			// type: 'string'
		// },
		//服务编码
		servicecode: {
			type: 'string',
			required:true,
			nullMsg:'工程编码不能为空!'
		},
		// //创建人
		// creator:{
			// type: 'string'
		// },
		// //创建时间
		// createtime:{
			// type: 'date'
		// },
		// agentid:{
			// type: 'string'
		// },
		// agentname:{
			// type: 'string'
		// },
		// orgid:{
			// type: 'string'
		// },
		// orgname:{
			// type: 'string'
		// },
		// customerid:{
			// type: 'string'
		// },
		//客户姓名
		customername:{
			type: 'string',
			required:true,
	        nullMsg:'客户姓名不能为空!'
		},
		//手机号
		 telphone:{
			type:"string",
            required:true,
            hasSuccess: true,
            regExp : /^1[34578]\d{9}$/,
			errorMsg : "手机号格式不正确!",
            nullMsg:'手机号不能为空!',
		 },
		//身份证号
		idnumber:{
			type:"string",
            //required:true,
            //hasSuccess: true,
            regExp : /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
			errorMsg : "身份证格式不正确!",
            nullMsg:'身份证不能为空!',
		},
		//地址/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
		address:{
			type: 'string',
			required:true,
	        nullMsg:'地址不能为空!'
		},
		//通讯地址
		postaladdress:{
			//required:true,
			type: 'string',
			//hasSuccess: true,
	        nullMsg:'地址不能为空!'
		},
		//委托方
		clientname:{
			required:true,
			type: 'string',
			hasSuccess: true,
	        nullMsg:'委托方不能为空!'
		},
		//交易付款状态
		dealpaystate:{
			type: 'string',
			required:true,
	        nullMsg:'交易付款状态不能为空!'
		},
		//付款金额
		paymoney:{
	        type: 'string',
	        required:true,
	        nullMsg:'付款金额不能为空!'
		},
		//发票
		invoicestate:{
			type: 'string',
			required:true,
	        nullMsg:'发票不能为空!'
		},
		//合同图片
		contractphoto:{
			type: 'string',
		},
		//发票图片
		invoicephoto:{
			type: 'string',
		},
		//保单图片
		policyphoto:{
			type: 'string',
		},

		// //保单号
		// picc:{
			// type: 'string'
		// },
		//竣工单文件
		contractelecvers:{
			type: 'string'
		},
		//合同邮寄
		contractmailstate:{
			type: 'string'
		},
		// //发票电子版
		// invoiceelecvers:{
			// type: 'string'
		// },
		// //发票邮寄
		// invoicemailstate:{
			// type: 'string'
		// },
		// //保单电子版
		// policyelecvers:{
			// type: 'string'
		// },
		// //保单邮寄
		// policymailstate:{
			// type: 'string'
		// },
		// contractType:{
			// type: 'string'
		// }
		contractstate:{
			type: 'string'
		}
	}
};

var metasearchcontract = {
	meta : {
		// agentname:{
			// type: 'string'
		// },
		// orgid:{
			// type: 'string'
		// },
		// orgname:{
			// type: 'string'
		// },
		//发票
		invoicestate:{
			type: 'string',
		},
		//保单图片
		policystate:{
			type: 'string',
		},
		contractstate:{
			type: 'string'
		},
        completionformstate:{
			type:'string'
		},
		servicestate:{
            type:'string'
        },
        paystate:{
            type:'string'
        },
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
