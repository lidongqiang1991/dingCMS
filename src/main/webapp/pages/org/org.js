define(['text!pages/org/org.html', 'css!pages/org/org', 'pages/org/orgmeta', 'uuitree', 'uuigrid'], function (html) {
    var init = function (element) {
        var treelistUrl = ctx + '/org/list.do';
        var treedelUrl = ctx + '/org/del.do';
        var treesaveUrl = ctx + '/org/save.do';

        var userlistUrl = ctx + '/user/list.do';
        var userdelUrl = ctx + '/user/del.do';
        var usersaveUrl = ctx + '/user/save.do';

        var roleListUrl = ctx + '/sysrole/list.do';

        var viewModel = {
            app: {},
            /* 数据模型 */
            draw: 1,
            totlePage: 0,
            pageSize: 10,
            totleCount: 0,

            queryblUrl: ctx + '/loguser/page.do', //查询黑名单
            /*黑名单*/
            blstatus: '', //1:加入 0:移出
            search_statusid: '1', //0:白名单列表 1:黑名单列表

            // cusername:'123',

            /* 树数据 */
            orgdata: new u.DataTable(metaOrg),

            /* 编辑框树数据 */
            orgdatanew: new u.DataTable(metaOrg),

            /* 电话本数据  -- 列表 */
            userdata: new u.DataTable(metaUser),

            /* 电话本数据 -- 信息录入 */
            userdatanew: new u.DataTable(metaUser),

            //黑名单记录数据
            blacklist_data: new u.DataTable(blacklistmeta),

            // 角色列表 数据
            //roledata: [{name: "男", value: "1"}, {name: "女", value: "2"}],
            roledata: [],

            /* 树设置 */
            treeSetting: {
                view: {
                    showLine: false,
                    selectedMulti: false
                },
                callback: {
                    onClick: function (e, id, node) {
                        treeid = [];
                        viewModel.draw = 1;
                        viewModel.event.getAllChildren(node, treeid);
                        var pid = node.id;
                        viewModel.event.loaduser(treeid);
                    }
                },

            },
            event: {

                //清除datatable数据
                clearDt: function (dt) {
                    dt.removeAllRows();
                    dt.clear();
                },

                /* 获得树节点的所有子节点 */
                getAllChildren: function (node, childrenlist) {
                    childrenlist.push(node.id)
                    if (node.children) {
                        var i;
                        for (i = 0; i < node.children.length; i++) {
                            viewModel.event.getAllChildren(node.children[i], childrenlist);
                        }
                    }
                },

                // 获取组织机构 人员列表
                loaduser: function (org) {
                    var jsonData = {
                        pageIndex: viewModel.draw - 1,
                        pageSize: viewModel.pageSize,
                        sortField: "user_code",
                        sortDirection: "asc"
                    };
                    /* 右表的上面详细信息显示 */
                    var infoDiv = document.getElementById('infoPanel');
                    var dtVal = viewModel.orgdata.getValue('orgname');
                    infoDiv.innerHTML = dtVal;
                    //end
                    $(element).find("#searchInp").each(function () {
                        if (this.value == undefined || this.value == '' || this.value.length == 0) {
                            //不执行操作
                        } else {
                            jsonData['search_searchParam'] = this.value.replace(/(^\s*)|(\s*$)/g, "");  //去掉空格
                        }
                    });
                    if (org) {
                        if (org != '' || org.length != 0) {
                            jsonData['search_orgid'] = org.join();
                        }
                    }
                    if (viewModel.search_statusid == '0') {
                        jsonData['search_statusid'] = '0';
                    } else {
                        jsonData['search_statusid'] = '1';
                    }
                    ;
                    $.ajax({
                        type: 'get',
                        url: userlistUrl,
                        dataType: 'json',
                        data: jsonData,
                        contentType: 'application/json;charset=utf-8',
                        success: function (res) {
                            if (res) {
                                if (res.success == 'success') {
                                    if (!res.detailMsg.data) {
                                        viewModel.totleCount = 0;
                                        viewModel.totlePage = 1;
                                        viewModel.event.comps.update({
                                            totalPages: viewModel.totlePage,
                                            pageSize: viewModel.pageSize,
                                            currentPage: viewModel.draw,
                                            totalCount: viewModel.totleCount
                                        });
                                        viewModel.userdata.removeAllRows();
                                        viewModel.userdata.clear();
                                    } else {
                                        viewModel.totleCount = res.detailMsg.data.totalElements;
                                        viewModel.totlePage = res.detailMsg.data.totalPages;
                                        viewModel.event.comps.update({
                                            totalPages: viewModel.totlePage,
                                            pageSize: viewModel.pageSize,
                                            currentPage: viewModel.draw,
                                            totalCount: viewModel.totleCount
                                        });
                                        viewModel.userdata.removeAllRows();
                                        viewModel.userdata.clear();
                                        viewModel.userdata.setSimpleData(res.detailMsg.data.content, {unSelect: true});

                                        //黑名单相关
                                        if (viewModel.search_statusid == '1') { //正常
                                            $('.icons .cancelIcon').hide(); //隐藏移出黑名单
                                        } else {
                                            $('.icons .addblIcon').hide();
                                        }

                                        //绑定每行的操作事件
                                        $('.icons').on('click', '.editIcon', function () { //编辑
                                            $(this).parent().click();
                                            viewModel.event.editManClick();
                                        });
                                        $('.icons').on('click', '.delIcon', function () { //删除
                                            $(this).parent().click();
                                            viewModel.event.delManClick();
                                        });
                                        $('.icons').on('click', '.listIcon', function () { //黑名单记录
                                            $(this).parent().click();
                                            viewModel.event.queryBlacklist();
                                        });
                                        $('.icons').on('click', '.addblIcon', function () { //加入黑名单
                                            $(this).parent().click();
                                            viewModel.event.dialogBl('0');
                                        });
                                        $('.icons').on('click', '.cancelIcon', function () { //移出黑名单
                                            $(this).parent().click();
                                            viewModel.event.dialogBl('1');
                                        });


                                    }
                                } else {
                                    var msg = "";
                                    if (res.success == 'fail_global') {
                                        msg = res.message;
                                    } else {
                                        for (var key in res.detailMsg) {
                                            msg += res.detailMsg[key] + "<br/>";
                                        }
                                    }
                                    $vue.$alert(msg, '请求错误', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            $vue.$message({
                                                type: 'info',
                                                message: `action: ${action}`
                                            });
                                        }
                                    });
                                }
                            } else {
                                $vue.$message({
                                    showClose: true,
                                    message: '后台返回数据格式有误，请联系管理员！',
                                    type: 'error',
                                    offset: '60'
                                });
                            }

                        },
                        error: function (er) {
                            $vue.$message({
                                showClose: true,
                                message: '请求超时，请稍后重试！',
                                type: 'error',
                                offset: '60'
                            });
                        }
                    })
                },

                // 获取 组织机构列表
                loadTree: function () {
                    $.ajax({
                        type: 'get',
                        url: treelistUrl,
                        dataType: 'json',
                        success: function (res) {
                            if (res) {
                                if (res.success == 'success') {
                                    if (res.detailMsg.data) {
                                        viewModel.orgdata.removeAllRows();
                                        viewModel.orgdata.clear();
                                        viewModel.orgdata.setSimpleData(res.detailMsg.data, {unSelect: true});
                                        $("#tree2")[0]['u-meta'].tree.expandAll(true);
                                        /*                                        for(var i=0;i<$("#tree2")[0]['u-meta'].tree.getNodeByTId('tree2_1').children.length;i++){
                                                                                    $("#tree2")[0]['u-meta'].tree.expandNode($("#tree2")[0]['u-meta'].tree.getNodeByTId('tree2_1').children [i],false,false,false)
                                                                                }*/
                                        // var list = [];
                                        // for(var i=0,j=res.detailMsg.data.length;i<j;i++){
                                        // 	list.push(res.detailMsg.data[i].orgid);
                                        // }
                                        // viewModel.event.loaduser(list);
                                    }
                                } else {
                                    var msg = "";
                                    if (res.success == 'fail_global') {
                                        msg = res.message;
                                    } else {
                                        for (var key in res.detailMsg) {
                                            msg += res.detailMsg[key] + "<br/>";
                                        }
                                    }
                                    $vue.$alert(msg, '请求错误', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            $vue.$message({
                                                type: 'info',
                                                message: `action: ${action}`
                                            });
                                        }
                                    });
                                }
                            } else {
                                $vue.$message({
                                    showClose: true,
                                    message: '后台返回数据格式有误，请联系管理员！',
                                    type: 'error',
                                    offset: '60'
                                });
                            }

                        },
                        error: function (er) {
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
                genDataList: function (data) {

                    var datalist = [];
                    datalist.push(data);
                    return datalist;
                },
                //新增和更新组织树
                saveTree: function (data) {
                    var list = viewModel.event.genDataList(data);
                    $.ajax({
                        type: 'post',
                        url: treesaveUrl,
                        dataType: 'json',
                        contentType: "application/json",
                        data: JSON.stringify(list),
                        success: function (res) {
                            if (res) {
                                if (res.success == 'success') {
                                    $vue.$message({
                                        showClose: true,
                                        message: '保存成功!',
                                        type: 'success',
                                        offset: '60'
                                    });
                                    viewModel.event.loadTree();
                                    md.close();
                                } else {
                                    var msg = "";
                                    if (res.success == 'fail_global') {
                                        msg = res.message;
                                    } else {
                                        for (var key in res.detailMsg) {
                                            msg += res.detailMsg[key] + "<br/>";
                                        }
                                    }
                                    $vue.$alert(msg, '操作提示', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            $vue.$message({
                                                type: 'info',
                                                message: `action: ${action}`
                                            });
                                        }
                                    });
                                }
                            } else {
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
                //删除组织树
                deleteTree: function (data) {
                    var datalist = viewModel.event.genDataList(data);
                    var json = JSON.stringify(datalist);
                    $.ajax({
                        url: treedelUrl,
                        data: json,
                        dataType: 'json',
                        type: 'post',
                        contentType: 'application/json',
                        success: function (res) {
                            if (res) {
                                if (res.success == 'success') {
                                    viewModel.orgdata.removeRow(viewModel.orgdata.getSelectedIndexs());
                                    // u.messageDialog({msg:'删除成功',title:'操作提示',btnText:'确定'});
                                } else {
                                    var msg = "";
                                    if (res.success == 'fail_global') {
                                        msg = res.message;
                                        if (msg == 'Data had been referenced,remove is forbidden!') {
                                            msg = '该部门含有成员不能删除';
                                        }
                                    } else {
                                        for (var key in res.detailMsg) {
                                            msg += res.detailMsg[key] + "<br/>";
                                        }
                                    }
                                    $vue.$alert(msg, '操作提示', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            $vue.$message({
                                                type: 'info',
                                                message: `action: ${action}`
                                            });
                                        }
                                    });
                                }
                            } else {
                                $vue.$message({
                                    showClose: true,
                                    message: '无返回数据！',
                                    type: 'warning',
                                    offset: '60'
                                });
                            }

                        },
                        error: function (er) {
                            $vue.$message({
                                showClose: true,
                                message: '请求失败，请稍后重试！',
                                type: 'error',
                                offset: '60'
                            });
                        }
                    });
                },

                //更新和保存人员
                saveMan: function (data) {
                    data.statusname = '';
                    var list = viewModel.event.genDataList(data);
                    $.ajax({
                        type: 'post',
                        url: usersaveUrl,
                        dataType: 'json',
                        contentType: "application/json",
                        data: JSON.stringify(list),
                        success: function (res) {
                            if (res) {
                                if (res.success == 'success') {
                                    $vue.$message({
                                        showClose: true,
                                        message: '保存成功!',
                                        type: 'success',
                                        offset: '60'
                                    });
                                    viewModel.event.loaduser(treeid);
                                    md.close();
                                } else {
                                    var msg = "";
                                    if (res.success == 'fail_global') {
                                        msg = res.message;
                                    } else {
                                        for (var key in res.detailMsg) {
                                            msg += res.detailMsg[key] + "<br/>";
                                        }
                                    }
                                    $vue.$message({
                                        type: 'error',
                                        customClass:'zZindex',
                                        message: `action: ${msg}`
                                    });
                                }
                            } else {
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
                //删除人员
                delMan: function (data) {
                    var list = viewModel.event.genDataList(data);
                    $.ajax({
                        type: 'post',
                        url: userdelUrl,
                        dataType: 'json',
                        contentType: "application/json",
                        data: JSON.stringify(list),
                        success: function (res) {
                            if (res.success == 'success') {
                                // u.messageDialog({msg: '删除成功！', btnText: '确定'});
                                viewModel.totleCount = viewModel.totleCount - 1;
                                if (viewModel.totleCount < 1) {
                                    viewModel.totlePage = viewModel.totlePage - 1;
                                }
                                viewModel.event.comps.update({
                                    totalPages: viewModel.totlePage,
                                    totalCount: viewModel.totleCount
                                });
                                //md.close();
                            } else {
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
                //分页相关
                pageChange: function () {
                    viewModel.event.comps.on('pageChange', function (pageIndex) {
                        viewModel.draw = pageIndex + 1;
                        viewModel.event.loaduser(treeid);
                    });
                },
                sizeChange: function () {
                    viewModel.event.comps.on('sizeChange', function (arg) {
                        viewModel.pageSize = parseInt(arg);
                        viewModel.draw = 1;
                        viewModel.event.loaduser(treeid);
                    });
                },

                //页面初始化
                pageInit: function () {
                    treeid = [];

                    viewModel.app = u.createApp({
                        el: element /* Document.body */,
                        model: viewModel
                    })
                    //隐藏
                    $(element).find('#returnBtn').hide();
                    //分页初始化
                    var paginationDiv = $(element).find('#pagination')[0];
                    this.comps = new u.pagination({el: paginationDiv, jumppage: true});
                    this.comps.update({pageSize: 5});  //默认每页显示5条数据
                    this.loadTree();
                    viewModel.event.pageChange();
                    viewModel.event.sizeChange();

                    //回车搜索
                    $('.input_enter').keydown(function (e) {
                        if (e.keyCode == 13) {
                            viewModel.event.searchClick();
                            u.stopEvent(e);
                        }
                    });

                },
                addorgClick: function () {

                    $('#orgcode').removeAttr("readonly");
                    $('#dialog_content_org').find('.u-msg-title').html("<h4>新增机构</h4>");
                    viewModel.event.clearDt(viewModel.orgdatanew);
                    var row = viewModel.orgdata.getSelectedRows()[0];
                    if (!viewModel.event.isAuth("addorg", row)) {
                        return;
                    }

                    if (row) {
                        var parentId = row.getValue('orgid');
                        var parentName = row.getValue('orgname');
                    }

                    var newr = viewModel.orgdatanew.createEmptyRow();
                    viewModel.orgdatanew.setRowSelect(newr);

                    if (row) {

                        var newrow = viewModel.orgdatanew.getSelectedRows()[0];
                        newrow.setValue('parentid', parentId);
                        newrow.setValue('parentname', parentName);
                    }

                    window.md = u.dialog({id: 'add_depart', content: "#dialog_content_org", hasCloseMenu: true});
                },
                editorgClick: function () {
                    $('#dialog_content_org').find('.u-msg-title').html("<h4>编辑机构</h4>");
                    viewModel.event.clearDt(viewModel.orgdatanew);
                    var row = viewModel.orgdata.getSelectedRows()[0];
                    if (!viewModel.event.isAuth("editorg", row)) {
                        return;
                    }
                    if (row) {
                        if (row.data.parentid.value) {
                            try {
                                row.setValue('parentname', $("#tree2")[0]['u-meta'].tree.getNodeByParam('id', row.getValue('parentid')).name);
                            } catch (err) {
                                row.setValue('parentname', row.getValue('parentname'));
                            }
                        }
                        viewModel.orgdatanew.setSimpleData(viewModel.orgdata.getSimpleData({type: 'select'}));
                        //$('#orgcode').attr("readonly","readonly");
                        window.md = u.dialog({id: 'edit_depart', content: "#dialog_content_org", hasCloseMenu: true});
                    } else {
                        $vue.$message({
                            showClose: true,
                            message: '请选择要编辑的数据！',
                            type: 'warning',
                            offset: '60'
                        });
                    }
                },
                delorgClick: function () {
                    var row = viewModel.orgdata.getSelectedRows()[0];
                    var users = viewModel.userdata.getSimpleData();
                    if (!viewModel.event.isAuth("delorg", row)) {
                        return;
                    }
                    if (users.length > 0) {
                        $vue.$message({
                            showClose: true,
                            message: '该部门含有人员不能删除！',
                            type: 'warning',
                            offset: '60'
                        });
                        return;
                    }
                    if (row) {
                        var data = viewModel.orgdata.getSelectedRows()[0].getSimpleData();
                        var msgTitle = '删除确认';
                        var msgContent = "是否删除" + data.orgname + "?";
                        $vue.$confirm(msgContent, msgTitle, {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            viewModel.event.deleteTree(data);
                        }).catch(() => {
                            $vue.$message({
                                type: 'info',
                                message: '已取消删除',
                                offset: '60'
                            });
                        });
                    } else {
                        $vue.$message({
                            showClose: true,
                            message: '请选择要删除的数据！',
                            type: 'warning',
                            offset: '60'
                        });
                    }
                },
                saveorgClick: function () {
                    var data = viewModel.orgdatanew.getSelectedRows()[0].getSimpleData();
                    if (!viewModel.app.compsValidate($('#dialog_content_org')[0])) {
                        return;
                    }
                    viewModel.event.saveTree(data);
                },
                cancelorgClick: function () {
                    md.close();
                },

                //转化ts
                renderDatetime: function (obj) {
                    var ts = obj.row.value.ts;
                    var datetime = new Date(ts).toLocaleString('chinese', {hour12: false});
                    obj.element.innerHTML = datetime;
                },
                //定义操作列的内容
                optFun: function (obj) {
                    var id = obj.row.value.id;
                    obj.element.innerHTML = `<div data-id=${id} style="line-height:43px;" class="icons">
                                                <i class="op uf uf-pencil editIcon" title="修改"></i>
                                                <i class="op uf uf-del delIcon" title="删除"></i>
                                                <i class="op uf uf-listsearch listIcon" title="黑名单记录"></i>
                                                <i class="op fas fa-user-times addblIcon" title="加入黑名单"></i>
                                                <i class="op fas fa-user-check cancelIcon" title="移出黑名单"></i>
                                             </div>`;
                },

                //黑名单列表
                blList: function () {
                    $('.blacklist').css('background', '#d8d8d8');
                    $('.whitelist').css('background', '#fff');
                    viewModel.draw = 1;
                    viewModel.search_statusid = '0';
                    viewModel.event.loaduser(treeid);
                },
                //白名单列表
                wlList: function () {
                    $('.whitelist').css('background', '#d8d8d8');
                    $('.blacklist').css('background', '#fff');
                    viewModel.draw = 1;
                    viewModel.search_statusid = '1';
                    viewModel.event.loaduser(treeid);
                },


                //黑名单原因弹出框
                dialogBl: function (status) {
                    viewModel.blstatus = status;
                    var title = '';
                    if (status == '0') {
                        title = '加入';
                    } else if (status == '1') {
                        title = '移出';
                    }
                    var h4 = title + '黑名单';
                    $('#dialog_bl h4').html(h4);
                    var row = viewModel.userdata.getSelectedRows()[0];
                    var name = row.data.username.value;
                    var remind = '是否确认将' + name + h4 + '?';
                    $('#dialog_bl .remind').html(remind);

                    window.md = u.dialog({id: 'testDialg', content: "#dialog_bl", hasCloseMenu: true, width: "500px;"});
                },
                //保存原因
                saveClick() {
                    var blmemo = $('#blInp').val();
                    if (!blmemo) {
                        $('#blInp').focus();
                        return
                    }

                    var data = viewModel.userdata.getSelectedRows()[0].getSimpleData();
                    data.statusname = blmemo;
                    data.statusid = viewModel.blstatus;
                    data.userpassword = "●●●●●●●●";
                    var datalist = viewModel.event.genDataList(data);
                    var json = JSON.stringify(datalist);

                    $.ajax({
                        url: usersaveUrl,
                        type: 'post',
                        dataType: 'json',
                        data: json,
                        contentType: 'application/json;charset=utf-8;',
                        success: function (res) {
                            if (res) {
                                viewModel.event.cancelClick();
                                if (res.success == 'success') {
                                    viewModel.event.loaduser(treeid);
                                } else {
                                    var msg = "";
                                    if (res.success == 'fail_global') {
                                        msg = res.message;
                                    } else {
                                        for (var key in res.detailMsg) {
                                            msg += res.detailMsg[key] + "<br/>";
                                        }
                                    }
                                    $vue.$alert(msg, '请求错误', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            $vue.$message({
                                                type: 'info',
                                                message: `action: ${action}`
                                            });
                                        }
                                    });
                                }
                            } else {
                                $vue.$message({
                                    showClose: true,
                                    message: '后台返回数据格式有误，请联系管理员！',
                                    type: 'error',
                                    offset: '60'
                                });
                            }
                        },
                        error: function (err) {
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
                cancelClick: function () {
                    md.close();
                    $('#blInp').val('');
                },

                //查询黑名单
                queryBlacklist: function () {
                    var row = viewModel.userdata.getSelectedRows()[0];
                    var jsonData = {
                        search_userid: row.data.id.value,
                        search_role: 'sysuser',
                        sortField: 'ts',
                        sortDirection: 'desc'
                    };
                    $.ajax({
                        url: viewModel.queryblUrl,
                        type: 'get',
                        dataType: 'json',
                        data: jsonData,
                        contentType: 'application/json;charset=utf-8;',
                        success: function (res) {
                            if (res) {
                                if (res.success == 'success') {
                                    if (res.detailMsg.data)
                                        viewModel.blacklist_data.removeAllRows();
                                    viewModel.blacklist_data.clear();
                                    viewModel.blacklist_data.setSimpleData(res.detailMsg.data.content, {
                                        unSelect: true
                                    });
                                    window.md = u.dialog({
                                        id: 'dialog_record',
                                        content: "#dialog_record",
                                        hasCloseMenu: false,
                                    });
                                } else {
                                    viewModel.event.cancelClick();
                                    var msg = "";
                                    if (res.success == 'fail_global') {
                                        msg = res.message;
                                    } else {
                                        for (var key in res.detailMsg) {
                                            msg += res.detailMsg[key] + "<br/>";
                                        }
                                    }
                                    $vue.$alert(msg, '请求错误', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            $vue.$message({
                                                type: 'info',
                                                message: `action: ${action}`
                                            });
                                        }
                                    });
                                }
                            } else {
                                $vue.$message({
                                    showClose: true,
                                    message: '后台返回数据格式有误，请联系管理员！',
                                    type: 'error',
                                    offset: '60'
                                });
                            }
                        },
                        error: function (err) {
                            $vue.$message({
                                showClose: true,
                                message: '请求超时，请稍后重试！',
                                type: 'error',
                                offset: '60'
                            });
                        }
                    });
                },
                //新建
                addManClick: function () {
                    $('#dialog_content_man').find('.u-msg-title').html("<h4>新增人员</h4>");
                    viewModel.event.clearDt(viewModel.userdatanew);
                    var row = viewModel.orgdata.getSelectedRows()[0];
                    if (!viewModel.event.isAuth("adduser", row)) {
                        return;
                    }
                    if (row) {
                        var orgId = row.getValue('orgid');
                        var org = row.getValue('orgname');
                        var newr = viewModel.userdatanew.createEmptyRow();
                        viewModel.userdatanew.setRowSelect(newr);
                        var newrow = viewModel.userdatanew.getSelectedRows()[0];
                        newrow.setValue('orgid', orgId);
                        newrow.setValue('orgname', org);
                        $('#add_peocode').removeAttr("readonly");
                        window.md = u.dialog({id: 'add_man', content: "#dialog_content_man", hasCloseMenu: true});
                    } else {
                        $vue.$message({
                            showClose: true,
                            message: '请选择组织结构！',
                            type: 'warning',
                            offset: '60'
                        });
                    }
                },
                //编辑
                editManClick: function () {
                    $('#dialog_content_man').find('.u-msg-title').html("<h4>编辑人员</h4>");
                    viewModel.event.clearDt(viewModel.userdatanew);
                    var row = viewModel.userdata.getSelectedRows()[0];
                    if (!viewModel.event.isAuth("edituser", row)) {
                        return;
                    }
                    if (row) {
                        var img = row.getValue('imageurl');
                        if (img) {
                            $(".avatarUrl img").attr('src', "http://dmzoss.iyuhong.com.cn/" + img + '?imageView2/1/w/200/h/200');
                        } else {
                            $(".avatarUrl img").attr('src', 'static/constructionphoto.jpg');
                        }
                        viewModel.userdatanew.setSimpleData(viewModel.userdata.getSimpleData({type: 'select'}));
                        $('#add_peocode').attr("readonly", "readonly");
                        window.md = u.dialog({id: 'edit_man', content: "#dialog_content_man", hasCloseMenu: true});
                        viewModel.userdatanew.setValue('userpassword', '●●●●●●●●');
                    } else {
                        $vue.$message({
                            showClose: true,
                            message: '请选择要编辑的数据！',
                            type: 'warning',
                            offset: '60'
                        });
                    }
                },
                //删除
                delManClick: function () {
                    var row = viewModel.userdata.getSelectedRows()[0];
                    if (!viewModel.event.isAuth("deluser", row)) {
                        return;
                    }
                    if (row) {
                        var data = viewModel.userdata.getSelectedRows()[0].getSimpleData();
                        var msgTitle = "删除确认";
                        var msgContent = "是否删除" + data.username + "?";
                        $vue.$confirm(msgContent, msgTitle, {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            viewModel.event.delMan(data);
                            viewModel.userdata.removeRow(viewModel.userdata.getSelectedIndexs());
                        }).catch(() => {
                            $vue.$message({
                                type: 'info',
                                message: '已取消删除',
                                offset: '60'
                            });
                        });
                    } else {
                        $vue.$message({
                            showClose: true,
                            message: '请选择要删除的数据！',
                            type: 'warning',
                            offset: '60'
                        });
                    }
                },
                //保存
                saveManClick: function () {
                    var data = viewModel.userdatanew.getSelectedRows()[0].getSimpleData();
                    if (!viewModel.app.compsValidate($('#add-form')[0])) {
                        return;
                    }
                    viewModel.event.saveMan(data);
                },
                //取消
                cancelManClick: function () {
                    md.close();
                },
                //搜索
                searchClick: function () {
                    $(element).find('#returnBtn').show();
                    var row = viewModel.orgdata.getSelectedRows()[0];
                    if (!row) {
                        $vue.$message({
                            showClose: true,
                            message: '请选择组织结构！',
                            type: 'warning',
                            offset: '60'
                        });
                        return;
                    }
                    viewModel.draw = 1;
                    viewModel.event.loaduser(treeid);
                },
                //返回初始化点击
                returnClick: function () {
                    $(element).find('#returnBtn').hide();
                    $("#searchInp").val('');
                    viewModel.event.loaduser(treeid);
                },

                // 获取角色列表
                loadrole: function () {
                    $.ajax({
                        type: "GET",
                        async: false,
                        url: roleListUrl,
                        contentType: 'application/json;charset=utf-8',
                        dataType: 'json',
                        success: function (res) {
                            if (res) {
                                var list = [{"name": "请选择", "value": ""}].concat(res || []);
                                var newlist = list.map(function (item) {
                                    if (item.roleid) {
                                        item.name = item.rolename;
                                        item.value = item.roleid;
                                    }
                                    return item;
                                });

                                viewModel.roledata = newlist;
                            } else {
                                console.error('未获取到枚举值，请检查。');
                            }
                        }
                    });
                },
                // 选择角色
                selectRole: function () {

                    alert('22222');
                },
                // /**角色渲染 */
                // changeRole: function (levelid) {
                // var v = levelid;
                // for( var i= 0 ;i< viewModel.roledata.length;i++ ){
                // if(v == viewModel.roledata[i].value ){
                // return viewModel.roledata[i].name ;
                // }
                // }
                // },

                // 判断权限
                isAuth: function () {
                    var userobj = sessionStorage['userobj'];
                    var bool = true;
                    //判断权限

                    if (false) {
                        bool = false;
                        $vue.$message({
                            showClose: true,
                            message: '请没有该权限！',
                            type: 'warning',
                            offset: '60'
                        });
                    }
                    return bool;
                },
                renderTypeTitle: function (obj) {
                    var img;
                    if (obj.row.value.imageurl) {
                        img = "http://dmzoss.iyuhong.com.cn/" + obj.row.value.imageurl + '?imageView2/1/w/200/h/200';
                    } else {
                        img = "static/constructionphoto.jpg";
                    }
                    var name = obj.value;
                    var html = "<img width='20px' height='20px' style='border-radius:50%;' src='" + img + "'> <span>" + name + "</span>";
                    obj.element.innerHTML = html;
                },

            }
        };
        $(element).html(html);
        viewModel.event.loadrole();
        viewModel.event.pageInit();

    }

    return {
        'template': html,
        init: init
    }
});
