define(['text!pages/product/product.html','css!pages/product/product','pages/product/productmeta','uuigrid'], function(template) {

    //初始化方法,页面加载后被 调用
    var init=function  (element) {
        var viewModel = {
            app:{},
            /* 数据模型 */
            draw:1,
            totlePage:0,
            pageSize:20,
            totleCount:0,

            // 套餐
            listUrl:ctx + '/product/list.do',
            addUrl:ctx + '/product/save.do',
            delUrl:ctx + '/product/del.do',
            objdata:new u.DataTable(productmeta),
            objdatanew:new u.DataTable(productmeta),

            event:{
                pageInt:function () {
                    viewModel.app = u.createApp({
                        el:element,
                        model:viewModel
                    });

                    //分页初始化
                    var paginationDiv = $(element).find('#pagination')[0];
                    this.comps=new u.pagination({el:paginationDiv,jumppage:true});
                    this.comps.update({pageSize: 10 });  //默认每页显示5条数据
                    viewModel.event.pageChange();
                    viewModel.event.sizeChange();
                    this.loadList();
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

                //分页相关
                pageChange:function(){
                    viewModel.event.comps.on('pageChange', function (pageIndex) {
                        viewModel.draw = pageIndex + 1;
                        viewModel.event.loadList();
                    });
                },
                sizeChange:function(){
                    viewModel.event.comps.on('sizeChange', function (arg) {
                        viewModel.pageSize = parseInt(arg);
                        viewModel.draw = 1;
                        viewModel.event.loadList();
                    });
                },
                //加载 套餐列表
                loadList:function(obj,filter){
                    var jsonData={
                        pageIndex:viewModel.draw-1,
                        pageSize:viewModel.pageSize,
                        sortField:"",
                        sortDirection:"asc",
                    };
                    // 搜索
                    $(element).find("#search").each(function(){
                        if(this.value == undefined || this.value =='' || this.value.length ==0 ){
                            //不执行操作
                        }else{
                            jsonData['search_searchParam'] =  this.value.replace(/(^\s*)|(\s*$)/g, "");  //去掉空格
                        }
                    });
                    // 根据id获取
                    if(obj){
                        if(obj!=''||obj.length!=0){
                            jsonData['search_id'] = obj.join();
                        }
                    }
                    // 根据条件筛选
                    if(filter){
                        if(filter!=''||filter.length!=0){
                            // jsonData['search_'+ filter.key ] = filter[key];
                            u.extend(jsonData,filter);
                        }
                    }
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
                                        viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
                                        viewModel.objdata.removeAllRows();
                                        viewModel.objdata.clear();
                                    }else{
                                        viewModel.totleCount=res.detailMsg.data.totalElements;
                                        viewModel.totlePage=res.detailMsg.data.totalPages;
                                        viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
                                        viewModel.objdata.removeAllRows();
                                        viewModel.objdata.clear();
                                        viewModel.objdata.setSimpleData(res.detailMsg.data.content,{unSelect:true});
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

                // 编号 添加链接
                renderTypeAjax:function (obj) {
                    var id = obj.row.value.productid;
                    var text = obj.value;
                    var html = "<a style='text-decoration: underline;' class='c_green' href='#/product/productDetail?id="+ id +"'>" + text||'' + "</a>";
                    obj.element.innerHTML = html;
                },

                // 新增
                addClick:function () {
                  window.location.href = ctx + "/#/product/productDetail";
                },
                // 删除套餐  -- delproduct()
                delClick:function () {
                    var row = viewModel.objdata.getSelectedRows()[0];
                    if(row){
                        var data = row.getSimpleData();
                        var msgTitle = '删除确认';
                        var msgContent = "是否删除"+data.productname +"?";
                        $vue.$confirm(msgContent, msgTitle, {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            viewModel.event.delproduct(data.productid);
                        }).catch(() => {
                            $vue.$message({
                                type: 'info',
                                message: '已取消删除',
                                offset: '60'
                            });
                        });
                    }else{
                        $vue.$message({
                            showClose: true,
                            message: '请选择要删除的数据！',
                            type: 'warning',
                            offset: '60'
                        });
                    }
                },
                // 删除套餐
                delproduct:function (data) {
                    // var datalist = viewModel.event.genDataList(data);
                    // var json = JSON.stringify(datalist);
                    $.ajax({
                        url: viewModel.delUrl,
                        data: {
                            productid:data
                        },
                        dataType: 'json',
                        // type: 'post',
                        // contentType: 'application/json',
                        success: function (res) {
                            if(res){
                                if (res.success == 'success') {
                                    viewModel.objdata.removeRow(viewModel.objdata.getSelectedIndexs());
                                    viewModel.totleCount=viewModel.totleCount -1;
                                    if(viewModel.totleCount<1){
                                        viewModel.totlePage=viewModel.totlePage -1;
                                    }
                                    viewModel.event.comps.update({totalPages:viewModel.totlePage,totalCount:viewModel.totleCount});
                                }
                            }else{
                                $vue.$message({
    showClose: true,
    message: '无返回数据！',
    type: 'warning',
    offset: '60'
});
                            }

                        },
                        error:function(er){
                            $vue.$message({
    showClose: true,
    message: '请求失败，请稍后重试！',
    type: 'error',
    offset: '60'
});
                        }
                    });
                },

            }
        };

        $(element).html(template);
        viewModel.event.pageInt();


    };

    return {
        // 'model': viewModel,
        'template': template,
        'init': init
    };
});
