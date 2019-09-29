define(['text!pages/product/productDetail.html','css!pages/product/productDetail','pages/product/productmeta','uuigrid'], function(template) {

    //初始化方法,页面加载后被 调用
    var init=function  (element) {
        var viewModel = {
            app:{},
            /* 数据模型 */
            draw:1,
            totlePage:0,
            pageSize:10,
            totleCount:0,

            // 套餐
            listUrl:ctx + '/product/list.do',
            addUrl:ctx + '/product/save.do',
            detailUrl:ctx + '/product/detail.do',
            objdata:new u.DataTable(productmeta),
            objdatanew:new u.DataTable(productmeta),
            // 细项
            priductitemlisturl:ctx + "/productitem/page.do",
            itemdata:new u.DataTable(productitemmeta),
            itemdatanew:new u.DataTable(productitemmeta),
			producttypeList:[
                    {name: "平屋面",value:"平屋面"},
                    {name: "露台",value:"露台"},
                    {name: "斜屋面",value:"斜屋面"},
                    {name: "卫生间",value:"卫生间"},
                    {name: "窗户",value:"窗户"},
                    {name: "采光顶",value:"采光顶"},
                    {name: "金属屋面",value:"金属屋面"},
            ],
            editableList:[
                {name:'是',value:1},
                {name:'否',value:2}
            ],
            //存放流程数据
            procedureListUrl : ctx + '/procedure/listall.do',
            procedureList : [],
            event:{
                //初始化，发送ajax，获得材料，用于下拉框
                loadprocedureInit : function() {
                    $.ajax({
                        type : "GET",
                        async : false,
                        url : viewModel.procedureListUrl,
                        contentType : 'application/json;charset=utf-8',
                        dataType : 'json',
                        success : function(res) {
                            if (res) {
                                var list = [{
                                    "name" : "请选择流程",
                                    "value" : "",
                                    "procedureid" : ""
                                }].concat(res || []);
                                var newlist = list.map(function(item) {
                                    var str = "name,value";
                                    if (item.procedureid) {
                                        item.name = item.procedurename;
                                        item.value = item.procedureid;
                                    }
                                    for (var key in item) {
                                        if (str.indexOf(key) == -1) {
                                            delete item[key];
                                        }
                                    }
                                    return item;
                                });

                                viewModel.procedureList = newlist;
                            } else {
                                console.error('未获取到枚举值，请检查。');
                            }
                        }
                    });
                },
                // 搜索
                searchClick:function(){
                    $('#returnBtn').show();
                    //viewModel.event.resetfilterclick(true);
                    viewModel.draw = 1;
                    viewModel.event.loadItemList();
                },
                //返回初始化点击
                returnClick : function  () {
                    $('#returnBtn').hide();
                    $("#search").val('');
                    viewModel.event.loadItemList();
                },
                pageInt:function() {
                    viewModel.app = u.createApp({
                        el:element,
                        model:viewModel
                    });
                    //隐藏
                    $('#returnBtn').hide();
                    // 编辑客户基本信息
                    viewModel.event.clearDt(viewModel.objdatanew);
                    var newr = viewModel.objdatanew.createEmptyRow();
                    viewModel.objdatanew.setRowSelect(newr);
                    // 编辑 细项列表
                    viewModel.event.clearDt(viewModel.itemdatanew);

                    // 细项分页
                    //分页初始化
                    var paginationDiv = $(element).find('#pagination')[0];
                    this.comps=new u.pagination({el:paginationDiv,jumppage:true});
                    this.comps.update({pageSize: 10 });  //默认每页显示5条数据
                    viewModel.event.pageChange();
                    viewModel.event.sizeChange();

                    var id = [];
                    if(this.getUrlParams('id')){
                        var productid = this.getUrlParams('id');
                        id.push(productid);
                        this.loadList(id);
                    }
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
                //分页相关
                pageChange:function(){
                    viewModel.event.comps.on('pageChange', function (pageIndex) {
                        viewModel.draw = pageIndex + 1;
                        viewModel.event.loadItemList();
                    });
                },
                sizeChange:function(){
                    viewModel.event.comps.on('sizeChange', function (arg) {
                        viewModel.pageSize = parseInt(arg);
                        viewModel.draw = 1;
                        viewModel.event.loadItemList();
                    });
                },

                //加载 套餐列表
                loadList:function(obj,filter){
                    var jsonData={
                        // pageIndex:viewModel.draw-1,
                        // pageSize:viewModel.pageSize,
                        // sortField:"",
                        // sortDirection:"asc",
                    };
                    // 根据id获取
                    if(obj){
                        if(obj!=''||obj.length!=0){
                            // jsonData['search_productid'] = obj.join();
                            jsonData['productid'] = obj.join();
                        }
                    }
                    $.ajax({
                        type : 'get',
                        url : viewModel.detailUrl,
                        dataType : 'json',
                        data:jsonData,
                        contentType: 'application/json;charset=utf-8',
                        success : function(res) {
                            if(res){
                                if( res.success =='success'){
                                    if(res.detailMsg.data){
                                        var newrow = viewModel.objdatanew.getSelectedRows()[0];
                                        var data = res.detailMsg.data;
                                        newrow.setSimpleData(data);
                                        if(data.id_productbody){
                                            viewModel.itemdatanew.addSimpleData(data.id_productbody);
                                        }
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

                // 加载细项列表
                loadItemList:function(fun){
                    var jsonData={
                        pageIndex:viewModel.draw-1,
                        pageSize:viewModel.pageSize,
                        sortField:"",
                        sortDirection:"asc",
                    };
                    var row = viewModel.itemdatanew.getSimpleData();
                    if(row){
                        var arr = [];
                        for(var i=0,j=row.length;i<j;i++){
                            if(row[i].itemid){
                                arr.push(row[i].itemid);
                            }
                        }
                        if(arr.length > 0) jsonData.search_itemids = arr.join(',');
                    }
                    // 搜索
                    $('#search').each(function() {
                        if (this.value == undefined || this.value == '' || this.value.length == 0) {
                            //不执行操作
                        } else {
                            jsonData['search_searchParam'] = this.value.replace(/(^\s*)|(\s*$)/g, "");
                            //去掉空格
                        }
                    });
                    $.ajax({
                        type : 'get',
                        url : viewModel.priductitemlisturl,
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
                                        viewModel.itemdata.removeAllRows();
                                        viewModel.itemdata.clear();
                                    }else{
                                        viewModel.totleCount=res.detailMsg.data.totalElements;
                                        viewModel.totlePage=res.detailMsg.data.totalPages;
                                        viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
                                        viewModel.itemdata.removeAllRows();
                                        viewModel.itemdata.clear();
                                        viewModel.itemdata.setSimpleData(res.detailMsg.data.content,{unSelect:true});
                                    }
                                    if(fun)fun();
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
                // 类型
                renderTypeAjax:function(obj){
                    var text = obj.value == 1 ?'基础':'附加';
                    obj.element.innerHTML = text;
                },
                renderEditable:function(obj){
                    var text = obj.value ==1?'是':"否";
                    obj.element.innerHTML = text;
                },

                // 保存套餐
                saveClick:function () {
                  if(!viewModel.app.compsValidate($('#add-form')[0])){
                      return;
                  }
                  var data = viewModel.objdatanew.getSelectedRows()[0].getSimpleData();
                  var row = viewModel.itemdatanew.getSimpleData();
                  if(row){
                      var row_new = row.map(function (item) {
                          // var str = "itemid,itemname,price,servicecost,materialcost,type,memo";
                          var str = "productbid,itemid,itemname,price,servicecost,materialcost,type,memo,editable";
                          for(var key in item){
                              if(str.indexOf(key) == -1){
                                  delete item[key];
                              }
                          }
                          return item;
                      });
                      data.id_productbody = row_new;
                      var str = "productid,productcode,type,warranty,price,memo,id_productbody,productname,procedureid";
						for (var key in data) {
							if (str.indexOf(key) == -1) {
								delete data[key];
							}
						}
                  }else{
                    $vue.$message({
                        showClose: true,
                        message: '请选择细项！',
                        type: 'warning',
                        offset: '60'
                    });
                      return;
                  };
				    viewModel.event.save(data);
                },
                save:function(data){
                    var list=viewModel.event.genDataList(data);
                    $.ajax({
                        type : 'post',
                        url : viewModel.addUrl,
                        dataType : 'json',
                        contentType : "application/json",
                        data : JSON.stringify(list),
                        success : function(res) {
                            if(res){
                                if( res.success =='success' && res.detailMsg){
                                    // var productid = res.detailMsg.data.productid;
                                    // if(productid){
                                        // var newrow = viewModel.objdatanew.getSelectedRows()[0];
                                        // newrow.setValue('productid',productid);
                                    // }
                                    $vue.$message({
    showClose: true,
    message: '保存成功!',
    type: 'success',
    offset: '60'
});
                                    // // md.close();
                                    window.location.href='#/product/product';
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
                    });
                },

                // 选择细项
                add_item:function () {
                    viewModel.event.loadItemList(function () {
                        window.md = u.dialog({id:'add_item',content:"#dialog_item",hasCloseMenu:false});
                    });
                },
                // 添加细项
                confirm_item:function () {
                    var row = viewModel.itemdata.getSelectedRows();
                    if(row){
                        var dd = viewModel.itemdata.getSimpleData({type:'select'});
                        viewModel.itemdatanew.addSimpleData(dd);
                        // viewModel.itemdatanew.addSimpleData(row.getSimpleData());
                        viewModel.event.cancel_item();
                        viewModel.itemdata.setAllRowsUnSelect();
                    }else{
                        $vue.$message({
                            showClose: true,
                            message: '请至少选择一个',
                            type: 'warning',
                            offset: '60'
                        });
                    }
                    $('#search').val('');
                    $('#returnBtn').hide();
                },
                // 删除细项
                del_item:function(){
                    var row = viewModel.itemdatanew.getSelectedRows()[0];
                    if(row){
                        var data = row.getSimpleData();
                        var msgTitle = '删除确认';
                        var msgContent = "是否删除"+data.itemname+"?";
                        $vue.$confirm(msgContent, msgTitle, {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            viewModel.itemdatanew.removeRow(viewModel.itemdatanew.getSelectedIndexs());
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
                            message: '请选择要删除的数据',
                            type: 'warning',
                            offset: '60'
                        });
                    }
                },

                cancel_item:function () {
                    md.close();
                    $('#search').val('');
                    $('#returnBtn').hide();
                },

            }
        };

        $(element).html(template);
        viewModel.event.loadprocedureInit();
        viewModel.event.pageInt();


    };

    return {
        // 'model': viewModel,
        'template': template,
        'init': init
    };
});
