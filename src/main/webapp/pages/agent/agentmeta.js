var agentmeta = {
    meta:{
        agentid:{},
        // 代理商编号
        agentcode:{
            type:"string",
            required:true,
        },
        // 代理商名称
        agentname:{
            type:"string",
            required:true,
        },
        // 代理商  负责区域
        province:{
            type:"string",
        },
        //orgid
        orgid:{
            type: 'string',
        },
        //
        city:{
            type:"string",
        },
        //
        district:{
            type:"string",
        },
        // 备注
        agentmemo:{
            type:"string",
        },
    }
}
