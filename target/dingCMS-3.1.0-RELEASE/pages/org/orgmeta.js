// 组织机构
var metaOrg = {
	meta : {
		orgid:{
			type:'string',
			required:true,
			notipFlag: true,
			hasSuccess: true,
			nullMsg:'机构编码不能为空!'
		},
		orgname:{
			type:'string',
			required:true,
			notipFlag: true,
			hasSuccess: true,
			nullMsg:'机构名称不能为空!'
		},
		orgcode: {
			 type: 'string'
		},
		parentid : {
			 type: 'string'
		},
		parentname : {
			 type: 'string'
		},
		orgtype : {
			 type: 'string'
		},
		shortname : {
			 type: 'string'
		},
		creator:{

		}
	}
};

// 用户
var metaUser = {
		meta:{
			id: {
                type: 'string'
            },
            username: {
                type: 'string',
				required:true,
				notipFlag: true,
				hasSuccess: true,
				nullMsg:'姓名不能为空!'
            },
            usercode:{
            	type: 'string',

				nullMsg:'员工编号不能为空!'
            },
            orgid:{
            	 type: 'string'
            },
            orgname:{
            	 type: 'string'
            },
            usermobile: {
                type: 'string',
                required:true,
                regExp: /^1\d{10}$/,
		        notipFlag: true,
		        hasSuccess: true,
		        errorMsg: "手机号码格式不对。"
            },
            useremail: {
                type: 'string',
                regExp: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
                notipFlag: true,
                hasSuccess: true,
                errorMsg: "邮箱格式不对。"
            },
            userpassword: {
                type: 'string',
                required:true,
                notipFlag: true,
                hasSuccess: true,
                errorMsg: "密码不能为空！"
            },
            levelid:{
            	required:true,
            	nullMsg:'角色不能为空',
            },
            levelname:{

            }


		}
};

var metaRole = {
	meta:{

	}
};

var blacklistmeta = {
	meta: {
	}
};
