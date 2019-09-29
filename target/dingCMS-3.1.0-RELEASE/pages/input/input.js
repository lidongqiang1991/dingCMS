define(['text!pages/input/input.html', 'pages/input/inputmeta', 'css!pages/input/input', 'uuitree','uuigrid'], function (html) {

    var init = function(element,params){
        var rolelistUrl = ctx+'/sysrole/page.do';
        var roleaddUrl = ctx+'/sysrole/createRow.do';
        var roledelUrl = ctx+'/sysrole/del.do';
        var rolesaveUrl = ctx+'/sysrole/save.do';

        //过滤器接口
        var saveFieldUrl = ctx + '/dictionary/save.do';
        var getFieldDetailUrl = ctx + '/dictionary/detail.do';
        var getFieldPageUrl = ctx + '/dictionary/page.do';
        var delFieldUrl = ctx + '/dictionary/del.do';


        //权限分配
        var addmenu = ctx + '/sysrole/power.do';

        var menuList = ctx +'/funreg/all.do';

        // 分配功能
        // 1. 给角色 分配 权限
        // 权限 -- 目录/功能 列表  -- 数据来自 功能注册。menuList
        // 获取选中的权限，添加到 角色 的 表中   addmenu



        var viewModel = {
            app:{},
            /* 数据模型 */
            draw:1,
            totlePage:0,
            pageSize:20,
            totleCount:0,
            parentid:'',

            typeList:[
                {name:'下拉',value:'下拉'}
            ],

            /* 角色数据  -- 列表 */
            roleData : new u.DataTable(inputmeta),

            /* 角色编辑数据 -- 信息录入 */
            roleDatanew : new u.DataTable(inputmeta),

            // yesOrNo: [{name: "是", value: "Y"}, {name: "否", value: "N"}],
            // 权限列表  -- 树
            powerDa:new u.DataTable(
                {
                    meta:{
                        //名称
                        funname: {
                            type: 'string',
                            required: true
                        },
                        funcode: {
                            type: 'string',
                            required: true
                        },

                    }
                }
            ),

            //权限 编辑 对象
            selectTreeNew:{
                funs:[],
                roleid:'',
            },
            treeSetting:{
                view:{
                    showLine: false,
                    selectedMulti:false
                },
                callback:{
                    onClick: function (e, id, node) {
                        // var rightInfo = node.name + '被选中';
                        // u.showMessage({msg:rightInfo,position:"top"})
                    },
                    onCheck:function(event, treeId, treeNode){
                        var treeObj = $.fn.zTree.getZTreeObj("commonTree"),
                            nodes=treeObj.getCheckedNodes(true),
                            v=[];
                        for(var i=0;i<nodes.length;i++){
                            v.push(nodes[i].id);
                        }
                        viewModel.selectTreeNew.funs = v;

                    },
                },

                check:{
                    enable: true,
                    nocheck:false,
                    chkStyle: "checkbox",
                    chkboxType: { "Y": "ps", "N": "ps" }

                }
            },
            event:{
                //添加选择器
                addroleClick:function(){
                    //1. 创建空数据
                    //1.1 先清空
                    //1.2再创建
                    //2.填写数据
                    //3.更新数据
                    viewModel.parentid = '';
                    $('#dialog_content_man').find('.u-msg-title').html("<h4>新增</h4>");
                    viewModel.event.clearDt(viewModel.roleDatanew);
                    var newr = viewModel.roleDatanew.createEmptyRow();
                    viewModel.roleDatanew.setRowSelect(newr);
                    window.md = u.dialog({id:'add_man',content:"#dialog_content_man",hasCloseMenu:true});
                },
                //编辑选择器
                editroleClick:function(){
                    //1. 清空
                    //2. 反显  --  要编辑的数据
                    //3. 保存
                    $('#dialog_content_man').find('.u-msg-title').html("<h4>编辑</h4>");
                    //$('#inputtype').val('下拉');
                    viewModel.event.clearDt(viewModel.roleDatanew);
                    var row = viewModel.roleData.getSelectedRows()[0]
                    if(row){
                        viewModel.roleDatanew.setSimpleData(viewModel.roleData.getSimpleData({type: 'select'}));
                        //$('#type').attr("readonly","readonly");
                        window.md = u.dialog({id:'edit_man',content:"#dialog_content_man",hasCloseMenu:true});
                        var id = row.data.id.value;

                        viewModel.parentid = id ;
                        var jsonData = {
                            pageIndex:viewModel.draw-1,
                            pageSize:30,
                            search_id:id
                        };
                        $.ajax({
                            url:getFieldDetailUrl,
                            type:'get',
                            dataType:'json',
                            data:jsonData,
                            contentType:'application/json;charset=utf-8',
                            success:function(res){
                                if(res){
                                    if( res.success =='success'){
                                        if(!res.detailMsg.data){
                                            viewModel.totleCount=0;
                                            viewModel.totlePage=1;
                                            viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
                                            viewModel.roleData.removeAllRows();
                                            viewModel.roleData.clear();

                                        }else{
                                            //*********拆分选项
                                            $('#values').html('');
                                            var childDictionaries = res.detailMsg.data.childDictionaries;
                                            for(var item of childDictionaries){
                                                var value = `<div class="u-col-md-12 form-group margin-bottom-20 value">
                                                <div class="u-col-md-3 control-label">
                                                    <label style="color: red;">*</label>
                                                    <label>选项</label>
                                                </div>
                                                <div class="u-col-md-8"></div>
                                                <input class="u-col-md-8 u-form-control" type="text" value="${item.value}">
                                                <span class="u-col-md-1 uf uf-reduce-c-o font-size-24 delValue"></span>
                                            </div>`;
                                                $('#values').append(value);
                                            }
                                            //选择器类型
                                            $('#type').val(res.detailMsg.data.parentDictionary.type);
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
                            error:function(err){}
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
                //删除选择器
                delroleClick:function(){
                    var row = viewModel.roleData.getSelectedRows()[0];
                    if(row){
                        var data = viewModel.roleData.getSelectedRows()[0].getSimpleData();
                        var msgTitle = '删除确认';
                        var msgContent = "是否删除"+data.rolename+"?";
                        $vue.$confirm(msgContent, msgTitle, {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                          }).then(() => {
                                viewModel.event.delMan(data);
                                viewModel.roleData.removeRow(viewModel.roleData.getSelectedIndexs())
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
                //删除人员
                delMan:function(data){
                    $.ajax({
                        type : 'post',
                        url : delFieldUrl,
                        dataType : 'json',
                        contentType : "application/json",
                        data : JSON.stringify(data),
                        success : function(res) {
                            if( res.success =='success'){
                                // u.messageDialog({msg: '删除成功！', btnText: '确定'});
                                viewModel.totleCount=viewModel.totleCount -1;
                                if(viewModel.totleCount<1){
                                    viewModel.totlePage=viewModel.totlePage -1;
                                }
                                viewModel.event.comps.update({totalPages:viewModel.totlePage,totalCount:viewModel.totleCount});
                                //md.close();
                            }else{
                                $vue.$message({
                                    showClose: true,
                                    message: '删除失败！',
                                    type: 'error',
                                    offset: '60'
                                });
                            }
                        }
                    })
                },

                //添加选项
                addValueClick:function(){
                    //var lendth = $('#values').find('.value').length;
                    var value = `<div class="u-col-md-12 form-group margin-bottom-20 value">
                                    <div class="u-col-md-3 control-label">
                                        <label style="color: red;">*</label>
                                        <label>选项</label>
                                    </div>
                                    <div class="u-col-md-8"></div>
                                    <input class="u-col-md-8 u-form-control" type="text"
                                           u-meta='{"type":"string","data":"roleDatanew","field":"rolecode"}'
                                           placeholder=""/>
                                    <span class="u-col-md-1 uf uf-reduce-c-o font-size-24 delValue"></span>
                                </div>`;
                    $('#values').append(value);
                },
                //保存选项
                saveFieldClick:function(){
                    var type = $('#type').val(); //过滤器名称
                    var childDictionaries = [];
                    var values = $('#values').find('.value>input');
                    if(values.length == 0){
                        $vue.$message({
                            showClose: true,
                            message: '请至少添加一个选项！',
                            type: 'warning',
                            offset: '60'
                        });
                        return
                    }
                    //提交选项不能为空
                    for(var i = 0;i<values.length;i++){
                        var obj = {};
                        obj.type = type;
                        obj.value = $(values[i]).val().trim();
                        if(obj.value == ''){
                            $(values[i]).focus();
                            return
                        }
                        childDictionaries.push(obj); //拼选项
                    }

                    viewModel.event.clearDt(viewModel.roleDatanew);
                    var row = viewModel.roleData.getSelectedRows()[0]
                    if(row && viewModel.parentid){
                        viewModel.roleDatanew.setSimpleData(viewModel.roleData.getSimpleData({type: 'select'}));
                        //$('#type').attr("readonly","readonly");
                        window.md = u.dialog({id:'add_man',content:"#dialog_content_man",hasCloseMenu:true});
                        //组装jsonData
                        var jsonData = {
                            parentDictionary:{
                                createorname:row.getValue('createorname'),
                                createorid:row.getValue('createorid'),
                                createorname:row.getValue('createorname'),
                                createtime:row.getValue('createtime'),
                                id:row.getValue('id'),
                                metaDefinedName:row.getValue('metaDefinedName'),
                                type:type
                            },
                            childDictionaries:childDictionaries
                        };
                    }else{
                        $vue.$message({
                            showClose: true,
                            message: '请选择要编辑的数据！',
                            type: 'warning',
                            offset: '60'
                        });
                        var jsonData = {
                            parentDictionary:{
                                type:type
                            },
                            childDictionaries:childDictionaries
                        };
                    }

                    jsonData = JSON.stringify(jsonData);
                    //发送请求
                    $.ajax({
                        url:saveFieldUrl,
                        type:'post',
                        dataType:'json',
                        contentType:'application/json;charset=utf-8',
                        data:jsonData,
                        success:function(res){
                            if(res){
                                if( res.success =='success'){
                                    if(!res.detailMsg.data){
                                        viewModel.totleCount=0;
                                        viewModel.totlePage=1;
                                        viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
                                        viewModel.roleData.removeAllRows();
                                        viewModel.roleData.clear();

                                    }else{
                                        viewModel.totleCount=res.detailMsg.data.totalElements;
                                        viewModel.totlePage=res.detailMsg.data.totalPages;
                                        viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
                                        viewModel.roleData.removeAllRows();
                                        viewModel.roleData.clear();
                                        viewModel.roleData.setSimpleData(res.detailMsg.data.content,{unSelect:true});
                                        md.close();
                                        $('.u-msg-dialog-top').css('display','none');
                                        $('.u-overlay').css('display','none');
                                        $vue.$message({
                                            showClose: true,
                                            message: '保存成功!',
                                            type: 'success',
                                            offset: '60'
                                        });
                                        // $('.u-msg-dialog').css('display','none');
                                        var values = `<div class="u-col-md-12 form-group margin-bottom-20 value">
                                                        <div class="u-col-md-3 control-label">
                                                            <label style="color: red;">*</label>
                                                            <label>选项</label>
                                                        </div>
                                                        <div class="u-col-md-8"></div>
                                                        <input class="u-col-md-8 u-form-control " type="text" u-meta='{"type":"string","data":"roleDatanew","field":"rolecode"}' placeholder=""/>
                                                        <span class="u-col-md-1 uf uf-reduce-c-o font-size-24 cursor-point delValue"></span>
                                                      </div>`;
                                        $('#values').html(values);
                                        $('#type').val('');
                                        viewModel.event.loadRoleList();
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

                        }
                    })

                },
                //取消选项
                cancelroleClick:function(){
                    window.md.close();
                    var values = `<div class="u-col-md-12 form-group margin-bottom-20 value">
                                                        <div class="u-col-md-3 control-label">
                                                            <label style="color: red;">*</label>
                                                            <label>选项</label>
                                                        </div>
                                                        <div class="u-col-md-8"></div>
                                                        <input class="u-col-md-8 u-form-control " type="text" u-meta='{"type":"string","data":"roleDatanew","field":"rolecode"}' placeholder=""/>
                                                        <span class="u-col-md-1 uf uf-reduce-c-o font-size-24 cursor-point delValue"></span>
                                                      </div>`;
                    $('#values').html(values);
                    $('#type').val('');
                },



                /*//编辑选择器
                getFieldPage:function(){
                    $('#dialog_content_man').find('.u-msg-title').html("<h4>编辑选择器</h4>");
                    viewModel.event.clearDt(viewModel.roleDatanew);
                    var row = viewModel.roleData.getSelectedRows()[0]
                    if(row){
                        viewModel.roleDatanew.setSimpleData(viewModel.roleData.getSimpleData({type: 'select'}));
                        $('#add_peocode').attr("readonly","readonly");
                        window.md = u.dialog({id:'edit_man',content:"#dialog_content_man",hasCloseMenu:true});
                    }else{
                        $vue.$message({
                            showClose: true,
                            message: '请选择要编辑的数据！',
                            type: 'warning',
                            offset: '60'
                        });
                    }
                },*/

                //清除datatable数据
                clearDt: function (dt) {
                    dt.removeAllRows();
                    dt.clear();
                },


                // 页面加载 获取所有选择器
                loadRoleList:function(){
                    viewModel.parentid = '';
                    var jsonData={
                        pageIndex:viewModel.draw-1,
                        pageSize:viewModel.pageSize,
                        //sortField:"rolecode",
                        //sortDirection:"asc"
                    };

                    /*$(element).find("#search").each(function(){
                        if(this.value == undefined || this.value =='' || this.value.length ==0 ){
                            //不执行操作
                        }else{
                            jsonData['search_searchParam'] =  this.value.replace(/(^\s*)|(\s*$)/g, "");  //去掉空格
                        }
                    });*/
                    /*if(org){
                        if(org!=''||org.length!=0){
                            jsonData['search_orgid'] = org.join();
                        }
                    }
*/
                    $.ajax({
                        type : 'get',
                        url : getFieldPageUrl,
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
                                        viewModel.roleData.removeAllRows();
                                        viewModel.roleData.clear();
                                    }else{
                                        debugger
                                        viewModel.totleCount=res.detailMsg.data.totalElements;
                                        viewModel.totlePage=res.detailMsg.data.totalPages;
                                        viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
                                        viewModel.roleData.removeAllRows();
                                        viewModel.roleData.clear();
                                        viewModel.roleData.setSimpleData(res.detailMsg.data.content,{unSelect:true});
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

                //组装list
                genDataList:function(data){

                    var datalist = [];
                    datalist.push(data);
                    return datalist ;
                },

                //***********************权限弹出框begin***************//
                /**
                 * 关闭弹出框
                 */
                mdClose: function () {
                    md.close();
                },
                /**  //权限
                 * 弹出组织的树形结构弹出框，并绑定 确定 ，取消  关闭 等按钮 。
                 *  sendjosn 发送的数据
                 *  ajaxurl 请求的地址
                 *  title 弹窗标题
                 *  treeset 树控件的配置obj
                 */
                powerClick: function (sendjson, ajaxurl, treetitle, treeset) {
                    var row = viewModel.roleData.getSelectedRows()[0];
                    if(row){
                        viewModel.selectTreeNew.roleid = row.data.roleid.value;
                        if(viewModel.powerDa){
                            $(element).find('#tree-title').html(treetitle);
                            if(window.md){
                                try{
                                    md.close();
                                }catch(err){}
                            }
                            $("#commonTree")[0]['u-meta'].tree.expandAll(true);
                            window.md = u.dialog({
                                id: 'user-action-allot',
                                content: '#tree-modal',
                                hasCloseMenu: true
                            });
                            viewModel.event.bindClickButton($('#confirm_select'), null, viewModel.event.confirmSelectOrg);
                            //获取选中的角色 -- 取出分配的功能
                            var funs = row.getValue('funs');
                            // funs = '[{"funname":"测试1","funcode":"0001","metaDefinedName":"FunregisterVO","namespace":"dingCMS","status":0,"changedPropertyNames":null,"id":"648cfbae-9d5d-4cae-b6ad-f4f6ac900030","furl":null,"parentid":"905c9c3d-03a7-42f9-a72b-433c68c8bd9b","funtype":null,"createdate":1538194067000,"dr":0,"ts":1538194067000,"pId":null,"name":"测试1","level":0,"tId":"commonTree_3","parentTId":null,"open":false,"isParent":false,"zAsync":true,"isFirstNode":false,"isLastNode":false,"isAjaxing":false,"checked":true,"checkedOld":false,"nocheck":false,"chkDisabled":false,"halfCheck":false,"check_Child_State":-1,"check_Focus":true,"isHover":true,"editNameFlag":false}]';
                            // funs = '[{"funname":"客户管理","funcode":"23423","metaDefinedName":"FunregisterVO","namespace":"dingCMS","status":0,"changedPropertyNames":null,"id":"c3996fa9-d271-4bf9-955a-57998a345f13","furl":"","parentid":null,"funtype":null,"createdate":1538188980000,"dr":0,"ts":1538192830000,"pId":null,"name":"客户管理","children":[{"funname":"房屋信息","funcode":"100102","metaDefinedName":"FunregisterVO","namespace":"dingCMS","status":0,"changedPropertyNames":null,"id":"135572b4-7bcb-43cf-8a41-7069045ab15d","furl":null,"parentid":"c3996fa9-d271-4bf9-955a-57998a345f13","funtype":null,"createdate":1538192899000,"dr":0,"ts":1538192899000,"pId":"c3996fa9-d271-4bf9-955a-57998a345f13","name":"房屋信息","level":1,"tId":"commonTree_5","parentTId":"commonTree_4","open":false,"isParent":false,"zAsync":true,"isFirstNode":true,"isLastNode":false,"isAjaxing":false,"checked":true,"checkedOld":false,"nocheck":false,"chkDisabled":false,"halfCheck":false,"check_Child_State":-1,"check_Focus":true,"isHover":true,"editNameFlag":false},{"funname":"客户来源","funcode":"100101","metaDefinedName":"FunregisterVO","namespace":"dingCMS","status":0,"changedPropertyNames":null,"id":"e353efb8-5bf4-41d6-82fc-a741c70f9ec7","furl":null,"parentid":"c3996fa9-d271-4bf9-955a-57998a345f13","funtype":null,"createdate":1538192868000,"dr":0,"ts":1538192868000,"pId":"c3996fa9-d271-4bf9-955a-57998a345f13","name":"客户来源","level":1,"tId":"commonTree_6","parentTId":"commonTree_4","open":false,"isParent":false,"zAsync":true,"isFirstNode":false,"isLastNode":true,"isAjaxing":false,"checked":false,"checkedOld":false,"nocheck":false,"chkDisabled":false,"halfCheck":false,"check_Child_State":-1,"check_Focus":false,"isHover":false,"editNameFlag":false}],"level":0,"tId":"commonTree_4","parentTId":null,"open":true,"isParent":true,"zAsync":true,"isFirstNode":false,"isLastNode":false,"isAjaxing":false,"checked":true,"checkedOld":false,"nocheck":false,"chkDisabled":false,"halfCheck":false,"check_Child_State":1,"check_Focus":false,"isHover":false,"editNameFlag":false},{"funname":"房屋信息","funcode":"100102","metaDefinedName":"FunregisterVO","namespace":"dingCMS","status":0,"changedPropertyNames":null,"id":"135572b4-7bcb-43cf-8a41-7069045ab15d","furl":null,"parentid":"c3996fa9-d271-4bf9-955a-57998a345f13","funtype":null,"createdate":1538192899000,"dr":0,"ts":1538192899000,"pId":"c3996fa9-d271-4bf9-955a-57998a345f13","name":"房屋信息","level":1,"tId":"commonTree_5","parentTId":"commonTree_4","open":false,"isParent":false,"zAsync":true,"isFirstNode":true,"isLastNode":false,"isAjaxing":false,"checked":true,"checkedOld":false,"nocheck":false,"chkDisabled":false,"halfCheck":false,"check_Child_State":-1,"check_Focus":true,"isHover":true,"editNameFlag":false}]';
                            var treeObj = $.fn.zTree.getZTreeObj("commonTree");
                            treeObj.checkAllNodes(false);
                            if(funs){
                                var zTree = treeObj.getCheckedNodes(false);
                                var nodes = funs.split(',');
                                for (var i=0, l=nodes.length; i < l; i++) {
                                    var pid= nodes[i];
                                    for(var pi=0,pj=zTree.length;pi<pj;pi++){
                                        if(pid.indexOf(zTree[pi].id) != -1){
                                            treeObj.expandNode(zTree[pi],true);
                                            treeObj.checkNode(zTree[pi],true);
                                        }
                                    }
                                    // for(var pi=0,pj=zTree.length;pi<pj;pi++){
                                    // if (pid.indexOf(zTree[pi].id) != -1) {
                                    // treeObj.expandNode(zTree[i], true); //展开选中的  
                                    //                     treeObj.checkNode(zTree[i], true);  
                                    // }
                                    // }
                                    // treeObj.checkNode(zTree[i], true, true,true);

                                }

                            }
                        }
                    }else{
                        $vue.$message({
                            showClose: true,
                            message: '请选择要编辑的数据！',
                            type: 'warning',
                            offset: '60'
                        });
                        return
                    }


                },

                //加载 权限列表 -- 树
                loadtree:function(){
                    //1.判断有没有被选中项
                    //2.如果有可以弹出选择框
                    //3.选择要给与的权限
                    // 1.请求权限列表
                    // 2.反显
                    //选择并提交
                    //2. 若果没有提示选择一个
                    $.ajax({
                        type: "GET",
                        url: menuList,
                        contentType: 'application/json;charset=utf-8',
                        dataType: 'json',
                        success: function (res) {
                            if (res) {
                                // $(element).find('#tree-title').html(treetitle);
                                viewModel.powerDa.setSimpleData(res);
                                // if(viewModel.roleData.getSelectedRows()[0]){
                            }
                        }
                    });
                    // if(window.md){
                    // try{
                    // md.close();
                    // }catch(err){}
                    // }
                    // $("#commonTree")[0]['u-meta'].tree.expandAll(true);
                    // window.md = u.dialog({
                    // id: 'add_power',
                    // content: '#tree-modal',
                    // hasCloseMenu: true
                    // });
                    // var treeObj = $.fn.zTree.getZTreeObj("commonTree");
                    // treeObj.checkAllNodes(false);
                    // treeObj.checkedOld(false);



                    // viewModel.event.bindClickButton($('#confirm_select'), null, viewModel.event.confirmSelectOrg);
                    // }
                    // } else {
                    // u.showMessage({
                    // msg: '<i class="fa fa-times-circle margin-r-5"></i>' + res.message,
                    // position: "bottom",
                    // msgType: "error"
                    // });
                    // }
                    // }
                    // });
                },

                /**绑定弹出层 树的按钮 */
                bindClickButton: function (ele, data, functionevent) { //对某一个按钮进行  点击事假绑定 ele:被绑定的元素，  data：需要传递的数据，functionevent：绑定的方法
                    $(ele).unbind('click'); //取消之前的绑定
                    $(ele).bind('click', data, functionevent); //重新绑定
                },

                /**选中 权限到角色 */
                confirmSelectOrg: function () {
                    //1. 获取 选中的去权限列表
                    //2. 保存 到 -- 角色

                    viewModel.event.clearDt(viewModel.roleDatanew);
                    // var newr = viewModel.roleDatanew.createEmptyRow();
                    // viewModel.roleDatanew.setRowSelect(newr);
                    // var newrow = viewModel.roleDatanew.getSelectedRows()[0];
                    // newrow.setValue('roleid',viewModel.selectTreeNew.roleid);
                    // newrow.setValue('funs',viewModel.selectTreeNew.funs);
                    //
                    // var data = viewModel.roleDatanew.getSelectedRows()[0].getSimpleData();
                    // var list = [];
                    // list.push(data);
                    var data = viewModel.roleData.getSelectedRows()[0];
                    var roleid = data.getValue("roleid");
                    var funs = viewModel.selectTreeNew.funs;
                    funs = funs.join(',');

                    $.ajax({
                        type : 'post',
                        url : addmenu,
                        dataType : 'json',
                        data:{
                            roleid:roleid,
                            funs:funs
                        },
                        // contentType: 'application/json;charset=utf-8',
                        success : function(res) {
                            var treeObj = $.fn.zTree.getZTreeObj("commonTree");
                            treeObj.checkAllNodes(false);
                            viewModel.event.mdClose();
                            viewModel.event.loadRoleList();
                        }
                    });


                },
                getRowData: function (rows) {  //rows 表示行数据对象
                    var rowsdata = [];
                    for (var i = 0; i < rows.length; i++) {
                        var d = rows[i].getSimpleData();
                        rowsdata.push(d);
                    }
                    return rowsdata;
                },
                showValue: function (obj) {
                    var showValue = '';
                    if (obj.value === 'Y') {
                        showValue = '是';
                    } else {
                        showValue = '否';
                    }
                    obj.element.innerHTML = showValue;
                },
                //***********************end*************************//
                //分页相关
                pageChange:function(){
                    viewModel.event.comps.on('pageChange', function (pageIndex) {
                        viewModel.draw = pageIndex + 1;
                        viewModel.event.loadRoleList();
                    });
                },
                sizeChange:function(){
                    viewModel.event.comps.on('sizeChange', function (arg) {
                        viewModel.pageSize = parseInt(arg);
                        viewModel.draw = 1;
                        viewModel.event.loadRoleList();
                    });
                },

                //页面初始化
                pageInit : function() {
                    treeid=[];

                    viewModel.app = u.createApp({
                        el :element /* Document.body */,
                        model : viewModel
                    })
                    //隐藏
                    $(element).find('#returnBtn').hide();
                    //分页初始化
                    var paginationDiv = $(element).find('#pagination')[0];
                    this.comps=new u.pagination({el:paginationDiv,jumppage:true});
                    this.comps.update({pageSize: 5 });  //默认每页显示5条数据
                    viewModel.event.pageChange();
                    viewModel.event.sizeChange();

                    this.loadRoleList();
                    //回车搜索
                    $('.input_enter').keydown(function(e){
                        if(e.keyCode==13){
                            viewModel.event.searchClick()
                            u.stopEvent(e);
                        }
                    });

                    //绑定添加移出事件
                    $('#values').on('click','.delValue',function(e){
                        $(e.target).parent().remove();
                    });

                },


                //更新和保存人员
                saveMan:function(data){
                    var list=viewModel.event.genDataList(data);
                    $.ajax({
                        type : 'post',
                        url : rolesaveUrl,
                        dataType : 'json',
                        contentType : "application/json",
                        data : JSON.stringify(list),
                        success : function(res) {
                            if(res){
                                if( res.success =='success'){
                                    $vue.$message({
                                        showClose: true,
                                        message: '保存成功!',
                                        type: 'success',
                                        offset: '60'
                                    });
                                    viewModel.event.loadRoleList();
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
                    });
                },


                searchClick:function(){
                    $(element).find('#returnBtn').show();
                    viewModel.draw = 1;
                    viewModel.event.loadRoleList();
                },
                //返回初始化点击
                returnClick : function  () {
                    $(element).find('#returnBtn').hide();
                    $("#search").val('');
                    viewModel.event.loadRoleList();
                },
                //时间显示 -- 修改格式
                renderTypeCreateTime:function(obj){
                    var val = obj.value;
                    if(val){
                         val = (new Date(Number(val))).toLocaleString('chinese',{hour12:false});
                    }
                    obj.element.innerHTML = val;
                },
            }
        };
        $(element).html(html) ;
        viewModel.event.pageInit();
        viewModel.event.loadtree();
        if(u.isIE8){
            $('.ie8-bg').css('display','block');
        }

    }

    return {
        'template': html,
        init:init
    }
});//end define
