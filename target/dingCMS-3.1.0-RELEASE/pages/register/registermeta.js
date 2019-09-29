var metaLeft = {
				meta : {
					id:{},
					funcode:{
						type:'string',
						required:true,
						notipFlag: true,
						hasSuccess: true,
						nullMsg:'功能编码不能为空!'
					},
					funname:{
						type:'string',
						required:true,
						notipFlag: true,
						hasSuccess: true,
						nullMsg:'功能名称不能为空!'
					},
					showname:{
						type:'string'
					},
					funicon:{
						type:'string'
					},
					parentid : {
						 type: 'string'
					},
					furl:{}
				}
			};

		var metaRight = {
				meta:{
					id: {
		                type: 'string'
		            },
		            funname: {
		                type: 'string',
						required:true,
						notipFlag: true,
						hasSuccess: true,
						nullMsg:'功能不能为空!'
		            },
		            funcode: {
		                type: 'string',
						required:true,
						notipFlag: true,
						hasSuccess: true,
						nullMsg:'功能编号不能为空!'
		            },
		            furl: {
		                 type: 'string',
						 // required:true,
						 },
		            parentid:{},
		            funicon:{
						type:'string'
					},

				}
			};
