var productmeta = {
    meta:{
        productid:{},
        productname:{},
        productcode:{},
        type:{},
        warranty:{},
        price:{
            type:'float',
            required:true,
        },

        memo:{},
        procedureid:{
            required:true,
        },
        procedurename:{},
        id_productbody:{},
    }
};
var productitemmeta ={
    meta:{
        editable:{
            type:'int',
            default:1
        }
    }
};
