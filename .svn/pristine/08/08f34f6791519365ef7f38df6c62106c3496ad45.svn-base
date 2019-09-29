define(['text!pages/worker/worker.html','css!pages/worker/worker','pages/worker/workermeta','uuigrid'], function(template) {

	//初始化方法,页面加载后被 调用
	var init = function  (element) {

        var viewModel = {
            app:{},
            /* 数据模型 */
            draw:1,
            totlePage:0,
            pageSize:20,
            totleCount:0,
            /*黑名单*/
            blstatus:'', //1:加入 0:移出
            search_blstatus: 0, //0:白名单列表 1:黑名单列表

            objListUrl:ctx + '/construction/page.do',
            objAddUrl:ctx + '/construction/save.do',
            objDelUrl:ctx + '/construction/del.do',
            changeblUrl:ctx + '/construction/save.do', //加入/移出黑名单
            queryblUrl:ctx + '/loguser/page.do', //查询黑名单

            objdata : new u.DataTable(workermeta),
            objdatanew : new u.DataTable(workermeta),

            //黑名单记录数据
            blacklist_data: new u.DataTable(blacklistmeta),

			event:{
				//页面初始化
                pageInit : function() {
                	$(element).find('#returnBtn').hide();
                    id = [];
                    viewModel.app = u.createApp({
                        el :element /* Document.body */,
                        model : viewModel
                    });

                    //分页初始化
                    var paginationDiv = $(element).find('#pagination')[0];
                    this.comps=new u.pagination({el:paginationDiv,jumppage:true});
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
                //组装list
                genDataList:function(data){
                    var datalist = [];
                    datalist.push(data);
                    return datalist ;
                },
                //清除datatable数据
                clearDt: function (dt) {
                    dt.removeAllRows();
                    dt.clear();
                },
                // 搜索
                searchClick:function(){
                	$(element).find('#returnBtn').show();
                    viewModel.draw = 1;
                    viewModel.event.loadList();
                },
                //返回初始化点击
				returnClick : function  () {
				  $(element).find('#returnBtn').hide();
				  $("#searchInp").val('');
				  viewModel.event.loadList();
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
                // 加载 客户列表
                loadList:function(obj,filter){
                    var jsonData={
                        pageIndex:viewModel.draw-1,
                        pageSize:viewModel.pageSize,
                        sortField:"createtime",
                        sortDirection:"desc",
                        search_blstatus:viewModel.search_blstatus
                    };
                    // 搜索
                    $(element).find("#searchInp").each(function(){
                        if(this.value == undefined || this.value =='' || this.value.length ==0 ){
                            //不执行操作
                        }else{
                            jsonData['search_searchParam'] = this.value.replace(/(^\s*)|(\s*$)/g, "");  //去掉空格
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
                        url : viewModel.objListUrl,
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

                                        //绑定每行的操作事件
                                        $('.icons').on('click','.editIcon',function(){ //编辑
                                            $(this).parent().click();
                                            var row = viewModel.objdata.getSelectedRows()[0];
                                            var id = row.data.id.value;
                                            var href = window.location.href;
                                            window.location.href = href + 'Detail?id=' + id ;
                                        });
                                        $('.icons').on('click','.delIcon',function(){ //删除
                                            $(this).parent().click();
                                            viewModel.event.delClick();
                                        });
                                        $('.icons').on('click','.listIcon',function(){ //黑名单记录
                                            $(this).parent().click();
                                            viewModel.event.queryBlacklist();
                                        });
                                        $('.icons').on('click','.addblIcon',function(){ //加入黑名单
                                            $(this).parent().click();
                                            viewModel.event.dialogBl(1);
                                        });
                                        $('.icons').on('click','.cancelIcon',function(){ //移出黑名单
                                            $(this).parent().click();
                                            viewModel.event.dialogBl(0);
                                        });

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
                    })
                },

                //添加点击查看详情
                renderTypeAjax:function (obj) {
                    var id = obj.row.value.id;
                    var text = obj.value;
                    var html = "<a title='"+text+"' class='c_green' style='text-decoration: underline;' href='#/worker/workerDetail?id="+ id +"'>" + text||id + "</a>";
                    obj.element.innerHTML = html;
                },
                //转化ts
                renderDatetime:function(obj){
                    var ts = obj.row.value.ts;
                    var datetime = new Date(ts).toLocaleString('chinese',{hour12:false});
                    obj.element.innerHTML = datetime;
                },
                //定义操作列的内容
                optFun: function(obj) {
                    var id = obj.row.value.id;
                    obj.element.innerHTML = `<div data-id=${id} style="line-height:43px;">
                                                <i class="op uf uf-pencil editIcon" title="修改"></i>
                                                <i class="op uf uf-del delIcon" title="删除"></i>
                                                <i class="op uf uf-listsearch listIcon" title="黑名单记录"></i>
                                                <i class="op fas fa-user-times addblIcon" title="加入黑名单"></i>
                                                <i class="op fas fa-user-check cancelIcon" title="移出黑名单"></i>
                                             </div>`;

                    if(viewModel.search_blstatus == 1){ //黑名单
                        $('.icons .addblIcon').hide(); //隐藏加入黑名单
                    }else{
                        $('.icons .cancelIcon').hide();
                    }
                },

                //黑名单列表
                blList:function(){
                    $('.blacklist').css('background','#d8d8d8');
                    $('.whitelist').css('background','#fff');
                    viewModel.search_blstatus = 1;
                    viewModel.draw = 1;
                    viewModel.event.loadList();
                },
                //白名单列表
                wlList:function(){
                    $('.whitelist').css('background','#d8d8d8');
                    $('.blacklist').css('background','#fff');
                    viewModel.draw = 1;
                    viewModel.search_blstatus = 0;
                    viewModel.event.loadList();
                },


                //黑名单原因弹出框
                dialogBl:function(status){
                    viewModel.blstatus = status;
                    var title = '';
                    if(status == 1){
                        title = '加入';
                    }else if(status == 0){
                        title = '移出';
                    }
                    var h4 = title + '黑名单';
                    $('#dialog_bl h4').html(h4);
                    var row = viewModel.objdata.getSelectedRows()[0];
                    var name = row.data.teamname.value;
                    var remind = '是否确认将' + name + h4 + '?';
                    $('#dialog_bl .remind').html(remind);

                    window.md = u.dialog({id: 'testDialg', content: "#dialog_bl", hasCloseMenu: true, width: "500px;"});
                },
                //保存原因
                saveClick(){
                    var blmemo = $('#blInp').val();
                    if(!blmemo){
                        $('#blInp').focus();
                        return
                    }

                    var data = viewModel.objdata.getSelectedRows()[0].getSimpleData();
                    data.blmemo = blmemo;
                    data.blstatus = viewModel.blstatus;
                    var datalist = viewModel.event.genDataList(data);
                    var json = JSON.stringify(datalist);

                    $.ajax({
                        url: viewModel.changeblUrl,
                        type: 'post',
                        dataType: 'json',
                        data: json,
                        contentType: 'application/json;charset=utf-8;',
                        success:function(res){
                            if(res){
                                viewModel.event.cancelClick();
                                if(res.success == 'success'){
                                    viewModel.event.loadList();
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
                            }else {
                                $vue.$message({
                                    showClose: true,
                                    message: '后台返回数据格式有误，请联系管理员！',
                                    type: 'error',
                                    offset: '60'
                                });                            }
                        },
                        error:function(err){
                            viewModel.event.cancelClick();
                            $vue.$message({
    showClose: true,
    message: '请求超时，请稍后重试！',
    type: 'error',
    offset: '60'
});
                        }
                    });
                },
                //取消原因保存
                cancelClick : function() {
                    window.md.close();
                    $('#blInp').val('');
                    $('.u-msg-dialog-top').css('display','none');
                    $('.u-overlay').css('display','none');
                },
                //查询黑名单
                queryBlacklist:function(){
                    var row = viewModel.objdata.getSelectedRows()[0];
                    var jsonData = {
                        search_userid: row.data.id.value,
                        search_role: 'construction',
                        sortField: 'ts',
                        sortDirection: 'desc'
                    };
                    $.ajax({
                        url:viewModel.queryblUrl,
                        type:'get',
                        dataType:'json',
                        data:jsonData,
                        contentType:'application/json;charset=utf-8;',
                        success:function(res){
                            if(res){
                               if(res.success == 'success'){
                                   if (res.detailMsg.data)
                                       viewModel.blacklist_data.removeAllRows();
                                       viewModel.blacklist_data.clear();
                                       viewModel.blacklist_data.setSimpleData(res.detailMsg.data.content, {
                                           unSelect: true
                                       });
                                   //window.md = u.dialog({id: 'dialog-record', content: "#dialog_record", hasCloseMenu: true, width: "500px;"});
                                   window.md = u.dialog({
                                       id: 'dialo_record',
                                       content: "#dialog_record",
                                       hasCloseMenu: false,
                                       width:"700px"
                                   });
                                   $('.u-overlay').css('opacity',0.1);
                               }else{
                                   viewModel.event.cancelClick();
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
                    window.location.href = ctx + "/#/worker/workerDetail";
                },
                // 删除
                delClick:function () {
                    var row = viewModel.objdata.getSelectedRows()[0];
                    if(row){
                        var data = viewModel.objdata.getSelectedRows()[0].getSimpleData();
                        var msgTitle = '删除确认';
                        var msgContent = "是否删除"+data.teamname+"?";
                        $vue.$confirm(msgContent, msgTitle, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            viewModel.event.delagent(data);
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
                delagent:function (data) {
                    var datalist = viewModel.event.genDataList(data);
                    var json = JSON.stringify(datalist);
                    $.ajax({
                        url: viewModel.objDelUrl,
                        data: json,
                        dataType: 'json',
                        type: 'post',
                        contentType: 'application/json',
                        success: function (res) {
                            if(res){
                                if (res.success == 'success') {
                                    viewModel.objdata.removeRow(viewModel.objdata.getSelectedIndexs());
                                    // u.messageDialog({msg:'删除成功',title:'操作提示',btnText:'确定'});
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
		viewModel.event.pageInit();

	};

	return {
        // 'model': viewModel,
        'template': template,
        'init': init
    };
});
