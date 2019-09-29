// 工程信息
var projectmeta = {
    meta: {
        billid: {},
        // 工程编号
        vbillcode: {},
        // 组织
        orgname: {},
        orgid: {},
        // 运营商servername
        agentname: {},
        agentid: {},
        // 交易
        dealid: {},
        // 客户
        customerid: {},
        name: {},
        phone: {},
        // 房屋
        houseid: {},
        // 总金额
        totalamount: {},
        // 已支付金额
        paidamount: {},
        // 物料调配菜状态
        materialstate: {},
        // 工程服务状态
        servicestate: {},
        // 工人状态
        constructionstate: {},
        // 支付状态
        paystate: {},
        // 客服
        servername: {},
        serverid: {},
        // 勘察
        surveyname: {},
        surveyid: {},
        // 工人
        constructionname: {},
        constructionid: {},
        // 管家
        supervisor: {},
        supervisorid: {},
        // note  备注
        note: {},
        creator: {},
        createtime: {},
        modifier: {},
        modifytime: {},
    }
};

var projectsearchmeta = {
    meta: {}
};

// 跟进列表
var metafollowup = {
    meta: {
        // 来源信息
        sourcetype:{
            type:"string",
            //required:true,
            //nullMsg:'请选择来源信息!'
        },
        sourcetype1:{
            type:"string",
            //required:true,
            //nullMsg:'请选择来源信息!'
        },
    }
};

// 客户信息
var metacustomer = {
    meta: {}

};

//物料详情
var metamaterial = {
    meta: {
        material: {},
        num: {},
        billid: {},
        billbid: {},
        price: {},
        allotnum:{},
        allocatednum:{},
        memo:{}
    }
};

