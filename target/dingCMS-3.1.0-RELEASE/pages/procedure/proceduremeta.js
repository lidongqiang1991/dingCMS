/**
 * @author WZW
 */
var proceduremeta = {
    meta:{
        procedureid:{},
        procedurecode:{
            type:'string',
            required:true,
            notipFlag: true,
            hasSuccess: true,
            nullMsg:'编码不能为空!'
        },
        procedurename:{
            type:'string',
            required:true,
            notipFlag: true,
            hasSuccess: true,
            nullMsg:'名称不能为空!'
        },
        version:{
            type:'string',
            required:true,
            notipFlag: true,
            hasSuccess: true,
            nullMsg:'版本不能为空!'
        },
        memo:{}
        
    }
};
var procedureitemmeta ={
    meta:{
        procedurebid:{},
        procedureid:{},
        itemorder:{
            type:'string',
            required:true,
            notipFlag: true,
            hasSuccess: true,
            nullMsg:'序号不能为空!'
        },
        type:{
            type:'string',
            required:true,
            notipFlag: true,
            hasSuccess: true,
            nullMsg:'类型不能为空!'
        },
        itemname:{
            type:'string',
            required:true,
            notipFlag: true,
            hasSuccess: true,
            nullMsg:'名称不能为空!'
        },
        memo:{},
        formid:{
            type:'string',
            required:true,
            notipFlag: true,
            hasSuccess: true,
            nullMsg:'表单不能为空!'
        },
        vdef1:{
           type:'string',
           required:true,
           notipFlag: true,
           hasSuccess: true,
           nullMsg:'操作用户类型不能为空!'
        },
        vdef2:{
           type:'string',
           required:true,
           notipFlag: true,
           hasSuccess: true,
           nullMsg:'依赖不能为空!'
        },
        formname:{}
    }
};