var workermeta = {
    meta:{
        id:{},
        teamname:{
        	type:"string",
            required:true,
            nullMsg : '姓名不能为空!'
        },
        phone:{
            type:"string",
            required:true,
            hasSuccess: true,
            regExp : /^1\d{10}$/,
			hasSuccess : true,
			errorMsg : "手机号格式不正确!",
            nullMsg:'手机号不能为空!',
        },
        jobscope:{
        	type:"string",
            nullMsg : '工种不能为空!'
        },
        owner:{
        	type:"string",
            nullMsg : '接口人不能为空!'
        },
        teammemo:{
        	type:"string",
        },

    }
};
var blacklistmeta = {
    meta: {
    }
};

