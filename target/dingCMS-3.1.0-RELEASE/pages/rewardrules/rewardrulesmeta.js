var productitemmeta = {
	meta : {
        /*参考
        itemname:{
            type:'string',
            required:true,
            //notipFlag: true,
            hasSuccess: true,
            nullMsg:'名称不能为空!'
        },*/

        //奖励规则id rewardid
        rewardid:{type:'string'},
        //规则奖励名称
        name:{
            type:'string',
            required:true,
            nullMsg:'规则名称不能为空!'
        },
        //业绩类型(勘察、下单...)
        performancetype:{
            type:'string',
            required:true,
            nullMsg:'请选择业绩类型!'
        },
        //奖励类型(0:固定金额,1:百分比)
        rewardtype:{
            type:'string',
            required:true,
            nullMsg:'请选择奖励类型!'
        },
        //奖励比例
        rewardratio:{
            type:'string',
            required:true,
            nullMsg:'奖励比例不能为空!'
        },
        //是否启用
        enable:{
            type:'integer',
            default:'1',
        },
        //规则生效时间
        invalidtime:{
            type:'string',
            required:true,
            nullMsg:'请选择规则失效时间!'
        },
        //规则结束时间
        effecttime:{
            type:'string',
            required:true,
            nullMsg:'请选择规则生效时间!'
        },
        //适用运营商
        orgid:{
            type:'string',
            required:true,
            nullMsg:'请选择适用此规则的运营商!'
        },
        //备注
        remark:{type:'string'},
        //创建人
        creator:{type:'string'},
        //创建人id
        creator:{type:'string'},
        //创建时间
        creationtime:{type:'string'},
    }
};


