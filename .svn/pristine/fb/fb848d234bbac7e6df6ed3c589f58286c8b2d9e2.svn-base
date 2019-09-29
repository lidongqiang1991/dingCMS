define(['text!pages/order/orderDetail.html','css!pages/order/orderDetail','pages/order/ordermeta','uuigrid'], function(template) {

    //初始化方法,页面加载后被 调用
    var init=function  (element) {
        var viewModel = {
            app:{},
            /* 数据模型 */
            draw:1,
            totlePage:0,
            pageSize:100,
            totleCount:0,
			orderid:'',
			page:{
				    url:'',
            },
            // 材料明细
            listUrl: ctx + '/order/material.do',
            materialdata:new u.DataTable(materialmeta),

            // 套餐详情
            listMaterialUrl: ctx + '/order/product.do',
            flewdata:new u.DataTable(productmeta),


            event:{
                //页面初始化
                pageInit : function() {
                    id=[];
                    viewModel.app = u.createApp({
                        el :element /* Document.body */,
                        model : viewModel
                    });
                    if(this.getUrlParams('id')){
                        var orderid = this.getUrlParams('id');
                        viewModel.orderid = orderid;
                        id.push(orderid);
                        this.loadList();
                    };


                },
                // 获取url 后缀
                getUrlParams: function(name) {
                    var url = window.location.href;
                    var search_temp = '?'+ url.split('?')[1];
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                    var r = search_temp.substr(1).match(reg);
                    if (r != null)
                        return r[2];
                    return null;
                },
                //清除datatable数据
                clearDt: function (dt) {
                    dt.removeAllRows();
                    dt.clear();
                },

                //组装list
                genDataList:function(data){
                    var datalist = [];
                    datalist.push(data);
                    return datalist ;
                },
                //渲染数量加上单位
                numUnit:function(obj){
                    var unit = obj.row.value.unit;
                    if(unit){
                        obj.element.innerHTML = obj.value + " " + unit;
                    }else{
                        obj.element.innerHTML = obj.value;
                    }
                },
                //分页相关
                pageChange:function(){
                    viewModel.event.comps.on('pageChange', function (pageIndex) {
                        viewModel.draw = pageIndex + 1;
                        if(viewModel.page.url == 'listUrl'){
                            viewModel.event.listUrl();
                        }else if(viewModel.page.url == 'listMaterialUrl'){
                            viewModel.event.listMaterialUrl();
                        }else{
                            viewModel.event.listUrl();
                        }
                    });
                },
                sizeChange:function(){
                    viewModel.event.comps.on('sizeChange', function (arg) {
                        viewModel.pageSize = parseInt(arg);
                        viewModel.draw = 1;
                        if(viewModel.page.url == 'listUrl'){
                            viewModel.event.listUrl();
                        }else if(viewModel.page.url == 'listMaterialUrl'){
                            viewModel.event.listMaterialUrl();
                        }else {
                            viewModel.event.listUrl();
                        }
                    });
                },
                //加载 套餐细项
                loadList:function(){
                	var orderid=viewModel.orderid;
                    var jsonData={
                        pageIndex:viewModel.draw-1,
                        pageSize:viewModel.pageSize,
                        sortField:"",
                        sortDirection:"asc",
                        "search_orderid": orderid,
                    };

                    $.ajax({
                        type : 'get',
                        url : viewModel.listUrl,
                        dataType : 'json',
                        data:jsonData,
                        contentType: 'application/json;charset=utf-8',
                        success : function(res) {
                            if(res){
                                if( res.success =='success'){
                                    if(!res.detailMsg.data){
                                        viewModel.totleCount=0;
                                        viewModel.totlePage=1;
                                        // viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
                                        viewModel.flewdata.removeAllRows();
                                        viewModel.flewdata.clear();
                                    }else{
                                        viewModel.totleCount=res.detailMsg.data.totalElements;
                                        viewModel.totlePage=res.detailMsg.data.totalPages;
                                        // viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
                                        viewModel.flewdata.removeAllRows();
                                        viewModel.flewdata.clear();
                                        viewModel.flewdata.setSimpleData(res.detailMsg.data.content,{unSelect:true});
                                    }
                                }else{
                                    var msg = "";
                                    if(res.success == 'fail_global'){
                                        msg = res.message;
                                    }else{
                                        for (var key in res.detailMsg) {
                                            msg += res.detailMsg[key] + "<br/>";
                                        }
                                    }
                                    $vue.$alert(msg, '请求错误', {
    confirmButtonText: '确定',
    callback: action => {
        $vue.$message({
            type: 'info',
            message: `action: ${ action }`
        });
    }
});
                                }
                            }else{
                                $vue.$message({
    showClose: true,
    message: '后台返回数据格式有误，请联系管理员！',
    type: 'error',
    offset: '60'
});
                            }

                        },
                        error:function(er){
                            $vue.$message({
    showClose: true,
    message: '请求超时，请稍后重试！',
    type: 'error',
    offset: '60'
});
                        }
                    })
                },
                //加载 材料明细
                loadMaterialList:function(){
                	var orderid=viewModel.orderid;
                    var jsonData={
                        pageIndex:viewModel.draw-1,
                        pageSize:viewModel.pageSize,
                        sortField:"",
                        sortDirection:"asc",
                        "search_orderid":orderid
                    };
                    $.ajax({
                        type : 'get',
                        url : viewModel.listMaterialUrl,
                        dataType : 'json',
                        data:jsonData,
                        contentType: 'application/json;charset=utf-8',
                        success : function(res) {
                            if(res){
                                if( res.success =='success'){
                                    if(!res.detailMsg.data){
                                        viewModel.totleCount=0;
                                        viewModel.totlePage=1;
                                        // viewModel.event.comps_material.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
                                        viewModel.materialdata.removeAllRows();
                                        viewModel.materialdata.clear();
                                    }else{
                                        viewModel.totleCount=res.detailMsg.data.totalElements;
                                        viewModel.totlePage=res.detailMsg.data.totalPages;
                                        //viewModel.event.comps_material.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
                                        viewModel.materialdata.removeAllRows();
                                        viewModel.materialdata.clear();
                                        viewModel.materialdata.setSimpleData(res.detailMsg.data.content,{unSelect:true});
                                    }
                                }else{
                                    var msg = "";
                                    if(res.success == 'fail_global'){
                                        msg = res.message;
                                    }else{
                                        for (var key in res.detailMsg) {
                                            msg += res.detailMsg[key] + "<br/>";
                                        }
                                    }
                                    $vue.$alert(msg, '请求错误', {
    confirmButtonText: '确定',
    callback: action => {
        $vue.$message({
            type: 'info',
            message: `action: ${ action }`
        });
    }
});
                                }
                            }else{
                                $vue.$message({
    showClose: true,
    message: '后台返回数据格式有误，请联系管理员！',
    type: 'error',
    offset: '60'
});
                            }

                        },
                        error:function(er){
                            $vue.$message({
    showClose: true,
    message: '请求超时，请稍后重试！',
    type: 'error',
    offset: '60'
});
                        }
                    })
                },
            }
        };

        $(element).html(template);
        viewModel.event.pageInit();


        // tab  切换
        $('.u-tabs__tab').click(function () {
            viewModel.draw = 1;
            var typer = $(this).attr('data-type');
            //套餐细项
            if(typer == 1){
        	 	// var paginationDiv = $(element).find('#pagination_allot')[0];
                // viewModel.event.comps=new u.pagination({el:paginationDiv,jumppage:true});
                // viewModel.event.comps.update({pageSize: 5 });  //默认每页显示5条数据viewModel.event.pageChange();
                // viewModel.event.sizeChange();
                // viewModel.page.url = 'loadList';
                viewModel.event.loadList();
                //物料明细
            }else if(typer == 2 ){
            	// var paginationDiv = $(element).find('#pagination_follow')[0];
                // viewModel.event.comps=new u.pagination({el:paginationDiv,jumppage:true});
                // viewModel.event.comps.update({pageSize: 5 });  //默认每页显示5条数据viewModel.event.pageChange();
                // viewModel.event.sizeChange();
                //viewModel.page.url = 'loadMaterialList';
                viewModel.event.loadMaterialList();
            }
        });
    };

    return {
        'template': template,
        'init': init
    };
});
