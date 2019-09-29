define(['text!pages/agent/agentDetail.html', 'pages/agent/agentmeta', 'css!pages/agent/agentDetail','pages/json/addressList', 'uuigrid','config/sys_const'], function (html) {

    var init = function (element, params) {
        var viewModel = {
            agentid:'',

            draw:1,
            totlePage:0,
            pageSize:10,
            totleCount:0,
            //mybatis持久化方式
            listurl: ctx + '/agent/page.do',
            saveurl: ctx + '/agent/save.do',
            delurl:ctx +  '/agent/del.do',
            orgurl:ctx + '/org/all.do',
            // 接口人
            ownerlisturl:ctx + '/user/agentUser.do',

            productListUrl:ctx + '/product/selectedproduct.do',
            unproductListUrl:ctx + '/product/unselectedproduct.do',

            agentdata: new u.DataTable(agentmeta),
            agentdatanew: new u.DataTable(agentmeta),

            productdata: new u.DataTable({meta:{}}),
            productdatanew: new u.DataTable({meta:{}}),

            provinceList:[],
            cityList:[],
            districtList:[],

            ownerList:[],

            orgnameList:[],
            event: {
                // 页面初始化
                pageInit:function () {
                    id=[];
                    viewModel.app = u.createApp({
                        el :element /* Document.body */,
                        model : viewModel
                    });

                    //回车搜索
                    $('.input_enter').keydown(function(e){
                        if(e.keyCode==13){
                            viewModel.event.searchClick();
                            u.stopEvent(e);
                        }
                    });
                    //
                    // 编辑客户基本信息
                    viewModel.event.clearDt(viewModel.agentdatanew);
                    var newr = viewModel.agentdatanew.createEmptyRow();
                    viewModel.agentdatanew.setRowSelect(newr);

                    var paginationDiv = $(element).find('#pagination')[0];
                    this.comps=new u.pagination({el:paginationDiv,jumppage:true});
                    this.comps.update({pageSize: 10 });  //默认每页显示5条数据
                    viewModel.event.pageChange();
                    viewModel.event.sizeChange();

                    if(this.getUrlParams('id')){
                        var agentid = this.getUrlParams('id');
                        viewModel.event.getOwnerList(agentid);
                        id.push(agentid);
                        viewModel.agentid = agentid;
                        this.loadList(id);
                        $(".owner-group").removeClass('c_hide');
                    }else{
                        $(".owner-group").addClass('c_hide');
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

                // 搜索
                searchClick:function(){
                    viewModel.draw = 1;
                    viewModel.event.loadList();
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
                },//获取运营中心
                getorgnameList:function(){
                    $.ajax({
                        type : 'GET',
                        url : viewModel.orgurl,
                        async:false,
                        dataType : 'json',
                        contentType : "application/json",
                        success : function(res) {
                            if(res){
                                var list=[];
                                console.log(res)
                                for(var item of res){
                                    var org={};
                                    if(item.orgname){
                                        org.name=item.orgname;
                                        org.value=item.orgid;
                                        list.push(org);
                                    }
                                }
                                viewModel.orgnameList=list;
                                console.log(viewModel.orgnameList);
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
                // 加载页面数据 -- 代理商列表
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
                    // 根据id获取
                    if(obj){
                        if(obj!=''||obj.length!=0){
                            jsonData['search_agentid'] = obj.join();
                        }
                    }
                    $.ajax({
                        type : 'get',
                        url : viewModel.listurl,
                        async:false,
                        dataType : 'json',
                        data:jsonData,
                        contentType: 'application/json;charset=utf-8',
                        success : function(res) {
                            if(res){
                                if( res.success =='success'){
                                    if(res.detailMsg.data){
                                        var newrow = viewModel.agentdatanew.getSelectedRows()[0];
                                        var data = res.detailMsg.data.content[0];
                                        newrow.setSimpleData(data);
                                        if(data.productlist){
                                            viewModel.event.loadItemList('in',data.productlist);
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
                        error:function(err){
                            $vue.$message({
                                showClose: true,
                                message: '请求超时，请稍后重试！',
                                type: 'error',
                                offset: '60'
                            });
                        }
                    });
                },

                // 新建
                addClick:function(){
                    window.location.href = ctx + "/#/agent/agentDetail";
                },
                // 查看详情
                selectClick:function(e){
                    var id = e.rowObj.value.id;
                    window.location.href = ctx + "/#/agent/agentDetail.do?id="+id;
                },
                // 保存
                saveClick:function(){
                    var data = viewModel.agentdatanew.getSelectedRows()[0].getSimpleData();
                    if (!viewModel.app.compsValidate($('#add-form')[0])) {
                        return;
                    }
                    var row = viewModel.productdatanew.getSimpleData()||[];
                    var arr = [];
                    for(var i=0,j=row.length;i<j;i++){
                        if(row[i].productid){
                            arr.push(row[i].productid);
                        }
                    }
                    if(arr.length > 0) data.productlist = arr.join(',');;
                    viewModel.event.save(data);
                    console.log(data)
                },
                save:function(data){
                    var list=viewModel.event.genDataList(data);
                    $.ajax({
                        type : 'post',
                        url : viewModel.saveurl,
                        dataType : 'json',
                        contentType : "application/json",
                        data : JSON.stringify(list),
                        success : function(res) {
                            if(res){
                                if( res.success =='success' && res.detailMsg){
                                    // var agentid = res.detailMsg.data.agentid;
                                    // if(agentid){
                                        // var newrow = viewModel.agentdatanew.getSelectedRows()[0];
                                        // newrow.setValue('agentid',agentid);
                                    // }
                                    $vue.$message({
    showClose: true,
    message: '保存成功!',
    type: 'success',
    offset: '60'
});
                                    window.location.href='#/agent/agent';
                                    // md.close();
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
                // 绑定省市区列表
                loadAddress:function () {
                    var addressList = addressData;
                    var province=[],city=[],district = [];
                    for(var i=0,j = addressList.length;i<j; i++){
                        addressList[i].value = addressList[i].name;
                        province.push(addressList[i]);
                    }
                    viewModel.provinceList = province;
                },
                //获取 接口人列表
                getOwnerList:function (agentid) {
                    $.ajax({
                        type : 'get',
                        url : viewModel.ownerlisturl,
                        async:false,
                        dataType : 'json',
                        contentType : "application/json",
                        data : {
                            agentid:agentid
                        },
                        success : function(res) {
                            if(res){
                                if( res.success =='success' && res.detailMsg){
                                    var data = res.detailMsg.data;
                                    var arr = [];
                                    for(var val of data){
                                        arr.push({name:val.username,value:val.id});
                                    }
                                    viewModel.ownerList = arr;
                                    var combo1Obj = document.getElementById('combobox_owner')['u.Combo'];
                                    combo1Obj.setComboData(arr);
                                }
                            }
                        }
                    });
                },

                // 获取套餐列表
                loadItemList:function(type,productids,fun){
                    var jsonData={
                        pageIndex:viewModel.draw-1,
                        pageSize:viewModel.pageSize,
                        sortField:"",
                        sortDirection:"asc",
                        search_type:type || "not in",   //not in ，  in
                        search_productids:"",
                        productids:"",
                    };
                    var url = '';
                    if(type=='in'){
                        url = viewModel.productListUrl;
                    }else{
                        url = viewModel.unproductListUrl;
                    }
                    if(productids){
                        jsonData.search_productids = productids;
                        jsonData.productids = productids;
                    }else{
                        var row = viewModel.productdatanew.getSimpleData();
                        if(row){
                            var arr = [];
                            for(var i=0,j=row.length;i<j;i++){
                                if(row[i].productid){
                                    arr.push(row[i].productid);
                                }
                            }
                            if(arr.length > 0) {
                                jsonData.search_productids = arr.join(',');
                                jsonData.productids = arr.join(',');
                            }
                        }
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
                        url : url,
                        dataType : 'json',
                        data:jsonData,
                        contentType: 'application/json;charset=utf-8',
                        success : function(res) {
                            if(res){
                                if( res.success =='success'){
                                    var list = res.detailMsg.data;
                                    if(type=='in'){
                                        viewModel.productdatanew.addSimpleData(list);
                                    }else{
                                        if(!list){
                                            viewModel.totleCount=0;
                                            viewModel.totlePage=1;
                                            viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
                                            viewModel.productdata.removeAllRows();
                                            viewModel.productdata.clear();
                                        }else{
                                            viewModel.totleCount=list.totalElements;
                                            viewModel.totlePage=list.totalPages;
                                            viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
                                            viewModel.productdata.removeAllRows();
                                            viewModel.productdata.clear();
                                            viewModel.productdata.setSimpleData(list.content,{unSelect:true});
                                        }
                                        if(fun)fun();
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
                // 选择套餐
                add_item:function () {
                    viewModel.event.loadItemList('','',function () {
                        window.md = u.dialog({id:'add_item',content:"#dialog_item",hasCloseMenu:false});
                    });
                },
                // 添加套餐
                confirm_item:function () {
                    var row = viewModel.productdata.getSelectedRows();
                    if(row.length>0){
                        var dd = viewModel.productdata.getSimpleData({type:'select'});
                        viewModel.productdatanew.addSimpleData(dd);
                        // viewModel.productdatanew.addSimpleData(row.getSimpleData());
                        viewModel.event.cancel_item();
                        viewModel.productdatanew.setAllRowsUnSelect();
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
                // 删除套餐
                del_item:function(){
                    var row = viewModel.productdatanew.getSelectedRows()[0];
                    if(row){
                        var data = row.getSimpleData();
                        var msgTitle = '删除确认';
                        var msgContent = '是否删除'+data.productname+'?';
                        $vue.$confirm(msgContent, msgTitle, {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                          }).then(() => {
                            viewModel.productdatanew.removeRow(viewModel.productdatanew.getSelectedIndexs());
                            $vue.$message({
                              type: 'success',
                              message: '删除成功!',
                              offset: '60'
                            });
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
        };		//end viewModel

        $(element).html(html);
        viewModel.event.getorgnameList();
        viewModel.event.loadAddress();
        // 绑定地址触发
        viewModel.agentdatanew.on('valueChange', function(event){
            let filename = event.field;  // 改变的字段
            var oldValue = event.oldValue;
            var newValue = event.newValue;
            if(filename == 'province'){
                var row = viewModel.agentdatanew.getSelectedRows()[0];
                row.setValue('city','');
                row.setValue('district','');

                var province = viewModel.provinceList;
                var city = [];
                for(var i=0,j = province.length;i<j; i++){
                    if(newValue == province[i].name){
                        city = province[i].child;
                        break;
                    }
                }
                var city_new = city.map(function (item) {
                    item.value = item.name;
                    return item;
                });

                viewModel.cityList = city_new;
                viewModel.districtList = [];
                var combo1Obj = document.getElementById('combobox_city')['u.Combo'];
                combo1Obj.setComboData(city_new);

            }else if(filename == 'city'){
                var row = viewModel.agentdatanew.getSelectedRows()[0];
                row.setValue('district','');

                var city = viewModel.cityList;
                var district = [];
                for(var i=0,j = city.length;i<j; i++){
                    if(newValue == city[i].name){
                        district = city[i].child;
                        break;
                    }
                }
                var district_new = district.map(function (item) {
                    item.value = item.name;
                    return item;
                });

                viewModel.districtList = district_new;
                var combo1Obj = document.getElementById('combobox_district')['u.Combo'];
                combo1Obj.setComboData(district_new);
            }else if(filename == 'sourcetype'){
                var sourcetype1 = viewModel.sourceList1_temp[newValue]||'';
                if(newValue != oldValue){
                    var row = viewModel.agentdatanew.getSelectedRows()[0];
                    row.setValue('sourcetype1','');
                }
                var combo1Obj = document.getElementById('combobox_sourcetype1')['u.Combo'];
                combo1Obj.setComboData(sourcetype1);

            }else if(filename == 'ownerid'){
                var arr = viewModel.ownerList;
                var name;
                for(var item of arr){
                    if(item.value == newValue){
                        name = item.name;
                    }
                }
                var row = viewModel.agentdatanew.getSelectedRows()[0];
                row.setValue('owner',name);
            }

        });
        viewModel.event.pageInit();
    };

    return {
        'template': html,
        init: init
    }
});//end define
