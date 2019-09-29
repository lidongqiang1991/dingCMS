/**
 * @author WZW
 */
var metaMaterial = {
	meta : {
		id:{
			type:'string',
			notipFlag: true,

		},
		name:{
			type:'string',
			required:true,
			//notipFlag: true,
			hasSuccess: true,
			nullMsg:'名称不能为空!'
		},
		code: {
		    required:true,
			 type: 'string',
			 hasSuccess: true,
             nullMsg:'编码不能为空!'
		},
		//规格
		spec: {
		    required:true,
			type: 'string',
			hasSuccess: true,
            nullMsg:'规格不能为空!'
		},
		//型号
		model: {
		    required:true,
			type: 'string',
			hasSuccess: true,
            nullMsg:'型号不能为空!'
		},
		//单价
		price: {
			type: 'string'
		},
		//成本
		cost: {
			type: 'string'
		},
		//说明
		note: {
			type: 'string'
		},
		creator:{
			type: 'string'
		},
		creatorid:{
			type: 'string'
		},
		createtime:{
			type: 'string'
		},
		//单位
		unit:{
			type: 'string'
		}
	}
};
