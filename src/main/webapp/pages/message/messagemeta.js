/**
 * @author xyb
 */
var metaMessage = {
	meta : {
		//消息id
		messageid:{
			type:'string'	
		},
		//标题
		title:{
			type:'string'
		},
		//内容
		coontent: {
			 type: 'string'
		},
		//发送时间
		sendtime: {
			type: 'string'
		},
		//发送者
		sender: {
			type: 'string'
		},
		//接收者id
		receiverid: {
			type: 'string'
		},
		//接受者
		receiver:{
			type: 'string'
		},
		//详情url
		detailurl:{
			type: 'string'
		},
		//状态
		state:{
			type: 'string'
		}
	}
};
var metadataMessage = {
	meta : {
		//状态
		messagetype:{
			type: 'string'
		}
	}
};