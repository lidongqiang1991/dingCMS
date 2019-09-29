define(['text!pages/customer/followup.html','css!pages/customer/followup','pages/customer/followupmeta','uuitree','uuigrid'],function(html) {

    var init = function(element){

        var viewModel = {
            app:{},
            /* 数据模型 */
            draw:1,
            totlePage:0,
            pageSize:10,
            totleCount:0,
            _Data:{
                search_id_name:'',  // 父子级联动，联动字段
            },

            listUrl:ctx + '/user/list.do',
            saveUrl:ctx + '/user/list.do',
            treeListUrl:ctx + '/org/list.do',


            // 渲染列表 数据
            objdata:new u.DataTable(workermeta),
            // 添加 新数据，编辑，新增
            objdatanew:new u.DataTable(workermeta),

            // 树 列表
            treeobjdata:new u.DataTable({meta:{}}),

            // 筛选 数据
            testselect:[{name: "男", value: "1"}, {name: "女", value: "2"}],

            /* 树设置 */
            treeSetting : {
                view : {
                    showLine : false,
                    selectedMulti : false
                },
                callback : {
                    onClick : function(e, id, node) {
                        // treeid = [];
                        // viewModel.event.getAllChildren(node,treeid);
                        // var pid = node.id;
                        // viewModel.event.loadTelbook(treeid);
                    },
                    onCheck:function(event, treeId, treeNode){
                        // var treeObj = $.fn.zTree.getZTreeObj("tree"),
                        //     nodes=treeObj.getCheckedNodes(true),
                        //     v=[];
                        // for(var i=0;i<nodes.length;i++){
                        //     v.push(nodes[i]);
                        // }
                        // viewModel.selectTreeNew.funs = v;
                        //
                    },
                },

            },

            event:{
                //页面初始化
                pageInit : function() {
                    treeid = [];
                    viewModel.app = u.createApp({
                        el :element, /* Document.body */
                        model : viewModel
                    });

                    //分页初始化
                    var paginationDiv = $(element).find('#pagination')[0];
                    this.comps = new u.pagination({el:paginationDiv,jumppage:true});
                    this.comps.update({pageSize: 5 });  //默认每页显示5条数据
                    this.loadList();
                    viewModel.event.pageChange();
                    viewModel.event.sizeChange();

                    //回车搜索
                    $('.input_enter').keydown(function(e){
                        if(e.keyCode==13){
                            viewModel.event.searchClick();
                            u.stopEvent(e);
                        }
                    });

                },
                // 搜索
                searchClick:function(){
                    viewModel.draw = 1;
                    viewModel.event.loadList(treeid);
                },
                //返回初始化点击
				returnClick : function  () {
				  $("#search").val('');
				  viewModel.event.loadList();
				},
                //分页相关
                pageChange:function(){
                    viewModel.event.comps.on('pageChange', function (pageIndex) {
                        viewModel.draw = pageIndex + 1;
                        viewModel.event.loadList(treeid);
                    });
                },
                sizeChange:function(){
                    viewModel.event.comps.on('sizeChange', function (arg) {
                        viewModel.pageSize = parseInt(arg);
                        viewModel.draw = 1;
                        viewModel.event.loadList(treeid);
                    });
                },
                // 加载 客户列表
                loadList:function(obj){
                    var jsonData={
                        pageIndex:viewModel.draw-1,
                        pageSize:viewModel.pageSize,
                        sortField:"",
                        sortDirection:"asc"
                    };
                    // 搜索
                    $(element).find("#search").each(function(){
                        if(this.value == undefined || this.value =='' || this.value.length ==0 ){
                            //不执行操作
                        }else{
                            jsonData['search_searchParam'] =  this.value.replace(/(^\s*)|(\s*$)/g, "");  //去掉空格
                        }
                    });
                    if(obj){
                        if(obj!=''||obj.length!=0){
                            var search_id_name = viewModel._Data.search_id_name;
                            jsonData[search_id_name] = obj.join();
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
                    });
                },
                // 分配功能
                powerClick:function () {
                    var row = viewModel.objdata.getSelectedRows()[0];

                    if(row||true) {
                        // var _data = viewModel.objdata.getSelectedRows()[0].getSimpleData({type:'select'});
                        // viewModel.event.clearDt(viewModel.objdatanew);
                        // viewModel.objdatanew.setSimpleData(_data);
                        $.ajax({
                            type : 'get',
                            url : viewModel.treeListUrl,
                            dataType : 'json',
                            success:function (res) {
                                if(res){
                                    var data = res.detailMsg.data;
                                    viewModel.treeobjdata.removeAllRows();
                                    viewModel.treeobjdata.clear();
                                    viewModel.treeobjdata.setSimpleData(data,
                                        {unSelect:true});
                                    // $("#tree")[0]['u-meta'].tree.expandAll(true);  //全部展开
                                    //选中已选
                                    var newr = viewModel.objdatanew.getSimpleData();
                                    if(newr){
                                        var nodes = newr.getValue('id');  //取出已选的选项
                                        var treeObj = $.fn.zTree.getZTreeObj("tree");
                                        var nodes = treeObj.getNodes();
                                        if (nodes.length>0) {
                                            treeObj.selectNode(nodes[0]);
                                        }
                                    }

                                    window.md = u.dialog({id:'power_click',content:'#dialog_content_power',hasCloseMenu:true});

                                }else{
                                    $vue.$message({
                                        showClose: true,
                                        message: '后台返回数据格式有误，请联系管理员！',
                                        type: 'error',
                                        offset: '60'
                                    });
                                }
                            },error:function (res) {
                                $vue.$message({
                                    showClose: true,
                                    message: '请求超时，请稍后重试！',
                                    type: 'error',
                                    offset: '60'
                                });
                            }
                        });

                    }else{
                        $vue.$message({
                            showClose: true,
                            message: '请选择要编辑的数据！',
                            type: 'warning',
                            offset: '60'
                        });
                    }
                },
                // 保存分配
                savepowerClick:function () {
                    var treeObj = $.fn.zTree.getZTreeObj("#tree"),
                        nodes=treeObj.getCheckedNodes(true),
                        v=[];
                    v.push(nodes[0]);


                    var data = viewModel.objdatanew.getSelectedRows()[0].getSimpleData();
                    if(!viewModel.app.compsValidate($('#add-form')[0])){
                        return;
                    }

                    var list = [];
                    list.push(data);
                    $.ajax({
                        type:'post',
                        url:viewModel.saveUrl,
                        dataType:'json',
                        contentType : "application/json",
                        data : JSON.stringify(list),
                        success:function (res) {
                            if(res){
                                if( res.success =='success'){
                                    $vue.$message({
    showClose: true,
    message: '保存成功!',
    type: 'success',
    offset: '60'
});
                                    viewModel.event.loadList(treeid);
                                    md.close();
                                }else{
                                    var msg = "";
                                    if(res.success == 'fail_global'){
                                        msg = res.message;
                                    }else{
                                        for (var key in res.detailMsg) {
                                            msg += res.detailMsg[key] + "<br/>";
                                        }
                                    }
                                    $vue.$alert(msg, '操作提示', {
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
    message: '没有返回数据',
    type: 'warning',
    offset: '60'
});
                            }
                        }
                    })

                },
                // 取消分配
                cancelpowerClick:function () {
                    md.close();
                },

            },

        };

        $(element).html(html) ;
        viewModel.event.pageInit();

    }

    return {
        'template': html,
        init: init
    }

});
