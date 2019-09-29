var rolemeta = {
    params: {
        "cls": "com.yonyou.iuap.system.entity.SysroleVo"
    },
    meta: {
        // 主键
        roleid: {
        	type: 'string'
        },
        //编码
        rolecode: {
            type: 'string',
            required: true,
            nullMsg: '角色类型编码不能为空!'
        },
        //名称
        rolename: {
            type: 'string',
            required: true,
            nullMsg: '角色类型名称不能为空!'
        },
        funs:{
        	type: 'string'
        }
    },
    pageSize: 5,

    //启用前端缓存
    // pageCache: true
}

