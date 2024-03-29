define(['text!pages/contract/contract.html', 'pages/contract/contractmeta', 'pages/contract/upFile', 'css!pages/contract/contract', 'uuitree', 'uuigrid', 'config/sys_const'], function (html) {

    //初始化方法,页面加载后被 调用
    var init = function (element, params) {
        var contractlistUrl = ctx + '/contract/list.do';
        //更新合同状态
        var contractupdateUrl = ctx + '/contract/update.do';
        var contractsaveUrl = ctx + '/contract/updateContract.do';
        var photosaveUrl = ctx + '/contract/photo.do';
        var batchsaveUrl = ctx + '/contract/batchUp.do';
        var tokenUrl = ctx + "/file/simpleuptoken.do";
        var photos = [];
        var phototype = '';
        var viewModel = {
            app: {},
            /* 数据模型 */
            draw: 1,
            totlePage: 0,
            pageSize: 15,
            totleCount: 0,
            contract_contractid:'',
            //展示数据
            contractDa: new u.DataTable(metaContract),
            //编辑数据  合同
            contractDaNew: new u.DataTable(metaContract),
            //发票
            invoiceDaNew: new u.DataTable(metaContract),
            //保单
            policyDaNew: new u.DataTable(metaContract),
            //编辑数据
            contractSaveDaNew: new u.DataTable(metaContract),
            // 筛选 数据
            searchdatanew: new u.DataTable(metasearchcontract),

            // 运营中心，运营商列表
            orgOrAgentListUrl:ctx + "/org/agent.do",

            //加载页面
            getViewUrl:ctx + "/templet/find.do",
            saveViewUrl:ctx + "/templet/save.do",
            viewList:[],
            viewFormname:'contract',
            viewContainer:'#table_contract',


            // 获取所有的场景
            getFilterUrl:ctx + '/advanfilter/queryall.do',
            //获取场景详情
            getFilterDetailUrl:ctx + '/advanfilter/queryfilter.do',
            saveFilterUrl:ctx + '/advanfilter/savefilter.do',
            delFilterUrl:ctx + '/advanfilter/deluser.do',
            //获取筛选条件
            getTypeFilterUrl: ctx + '/advanfilter/pagesys.do',
            //场景所属页面
            sceneType:'contract',
            search_filterid:'',
            search_filter:'',
            orgidlist:[],
            agentidlist:[],
            agentidalllist:[],

            //区分当前操作
            type: "",
            //运营中心
            orgnameList: [
                {
                    name: "运营中心",
                    value: "-1"
                }

            ],
            //区域经销商
            agentnameList: [
                {
                    name: "运营商",
                    value: "-1"
                }
                /*
                {name: "北京区域经销商", value: "北京区域经销商"},
                {name: "上海区域经销商", value: "上海区域经销商"},
                {name: "广州区域经销商", value: "广州区域经销商"}*/
            ],
            agentnameList_temp:[
                {name: "全部运营商", value: "-1"}
            ],
            //contractstateList\invoicestateList\policystateList
            //合同状态
            contractstateList: [
                {name: "全部合同", value: "-1"},
                {name: "已上传", value: "已上传"},
                {name: "未上传", value: "未上传"},
                {name: "未寄出", value: "未寄出"},
                {name: "已寄出", value: "已寄出"},
            ],
            //发票状态
            invoicestateList: [
                {name: "全部发票", value: "-1"},
                {name: "已上传", value: "已上传"},
                {name: "未上传", value: "未上传"},
                {name: "未寄出", value: "未寄出"},
                {name: "已寄出", value: "已寄出"},
            ],
            //保单状态
            policystateList: [
                {name: "全部保单", value: "-1"},
                {name: "已上传", value: "已上传"},
                {name: "未上传", value: "未上传"},
                {name: "未寄出", value: "未寄出"},
                {name: "已寄出", value: "已寄出"},
            ],
            //竣工单状态
            completionformstateList: [
                {name: "全部竣工单", value: "-1"},
                {name: "已上传", value: "已上传"},
                {name: "未上传", value: "未上传"},
            ],
            //施工状态
            projectList: [{
                name: '全部施工',
                value: '-1'
            }, {
                name: '未开工',
                value: '0'
            }, {
                name: '施工中',
                value: '1'
            }, {
                name: '已完工',
                value: '2'
            }],
            //付款状态
            payList: [{
                name: '全部付款',
                value: '-1'
            }, {
                name: '未支付',
                value: '0'
            }, {
                name: '定金已支付',
                value: '1'
            }, {
                name: '全额已支付',
                value: '2'
            }],
            event: {
                //清除datatable数据
                clearDt: function (dt) {
                    dt.removeAllRows();
                    dt.clear();
                },

                //组装list
                genDataList: function (data) {

                    var datalist = [];
                    datalist.push(data);
                    return datalist;
                },

                // 搜索
                searchClick: function () {
                    $(element).find('#returnBtn').show();
                    viewModel.event.resetfilterclick(true);
                    viewModel.draw = 1;
                    viewModel.event.loadMessageList();
                },
                //返回初始化点击
                returnClick: function () {
                    $(element).find('#returnBtn').hide();
                    $("#search").val('');
                    viewModel.event.loadMessageList();
                },
                // 筛选    按钮事件
                filterClick: function () {
                    $("#search").val('');
                    viewModel.event.saveSearchObj('searchParam','');
                    var obj = viewModel.event.resetfilterclick(false);
                    viewModel.event.loadMessageList('', obj);
                },
                resetClick: function () {
                    viewModel.event.resetfilterclick(true);
                    viewModel.event.loadMessageList();
                },
                // 重置 筛选条件
                resetfilterclick: function (bool) {
                    var data = viewModel.searchdatanew.getSelectedRows()[0];
                    if (!data) return;
                    if (bool) {
                        data.setValue('orgname', '');
                        data.setValue('agentname', '');
                        data.setValue('contractstate', '');
                        data.setValue('invoicestate', '');

                        data.setValue('startTime', '');
                        data.setValue('endTime', '');

                        data.setValue('policystate', '');
                        data.setValue('completionformstate', '');
                        data.setValue('servicestate', '');
                        data.setValue('paystate', '');
                        viewModel.event.saveSearchObj('searchParam',$("#search").val());
                    } else {
                        var orgname = data.getValue('orgname');
                        var agentname = data.getValue('agentname');
                        if(agentname&&agentname!="-1") orgname = "-1";
                        var contractstate = data.getValue('contractstate');
                        var invoicestate = data.getValue('invoicestate');
                        var policystate = data.getValue('policystate');
                        var completionformstate = data.getValue('completionformstate');
                        var servicestate = data.getValue('servicestate');
                        var paystate = data.getValue('paystate');
                        var obj = {};
                        obj.search_orgname = orgname;
                        obj.search_agentname = agentname;
                        obj.search_contractstate = contractstate;
                        obj.search_invoicestate = invoicestate;
                        obj.search_policystate = policystate;
                        obj.search_completionformstate = completionformstate;
                        obj.search_servicestate = servicestate;
                        obj.search_paystate = paystate;
                        return obj;
                    }
                },

                //分页相关
                pageChange: function () {
                    viewModel.event.comps.on('pageChange', function (pageIndex) {
                        viewModel.draw = pageIndex + 1;
                        viewModel.event.saveSearchObj('pageIndex',viewModel.draw);
                        viewModel.event.loadMessageList();
                    });
                },
                sizeChange: function () {
                    viewModel.event.comps.on('sizeChange', function (arg) {
                        viewModel.pageSize = parseInt(arg);
                        viewModel.draw = 1;
                        viewModel.event.saveSearchObj('pageIndex',viewModel.draw);
                        viewModel.event.saveSearchObj('pageSize',viewModel.pageSize);
                        viewModel.event.loadMessageList();
                    });
                },
                //页面初始化
                pageInit: function () {
                    viewModel.app = u.createApp({
                        el: element/* Document.body */,
                        model: viewModel
                    });
                    $(element).find('#returnBtn').hide();
                    //分页初始化
                    var paginationDiv = $(element).find('#pagination')[0];
                    this.comps = new u.pagination({
                        el: paginationDiv,
                        jumppage: true
                    });
                    this.comps.update({
                        pageSize: 5
                    });
                    //默认每页显示5条数据
                    viewModel.event.pageChange();
                    viewModel.event.sizeChange();

                    //回车搜索
                    $('.input_enter').keydown(function (e) {
                        if (e.keyCode == 13) {
                            viewModel.event.searchClick()
                            u.stopEvent(e);
                        }
                    });
                    // 搜索初始化
                    viewModel.event.clearDt(viewModel.searchdatanew);
                    var newr = viewModel.searchdatanew.createEmptyRow();
                    viewModel.searchdatanew.setRowsSelect(newr);

                    // viewModel.event.loadMessageList();
                    viewModel.event.orgOrAgentList();
                },
                //反显筛选条件
                setSearchValue:function(){
                    var obj = sessionStorage['searchObj'];
                    if (obj) {
                        var searchObj = JSON.parse(obj);
                        if (searchObj.type == 'contract') {
                            var obj_new = viewModel.searchdatanew.getSelectedRows()[0];
                            for (var key in searchObj) {
                                if(key == 'pageIndex'){
                                    if(searchObj[key])viewModel.draw = searchObj[key];
                                }else if(key == 'pageSize'){
                                    if(searchObj[key])viewModel.pageSize = searchObj[key];
                                }else if(key == 'searchParam'){
                                    if(searchObj[key])$("#search").val(searchObj[key]);
                                }else if(key != 'type'){
                                    obj_new.setValue(key,searchObj[key]);
                                }
                            }
                        } else {
                            sessionStorage['searchObj'] = "";
                        }
                    }
                    if(searchObj&&searchObj["searchParam"]){
                        this.loadMessageList('',{
                            'search_searchParam':searchObj.searchParam
                        });
                    }else{
                        var obj = viewModel.event.resetfilterclick(false);
                        this.loadMessageList('',obj);
                    }
                },
                //获取全部系统消息列表
                loadMessageList: function (obj, filter) {
                    var jsonData = {
                        pageIndex: viewModel.draw - 1,
                        pageSize: viewModel.pageSize,
                        sortField: "ts",
                        sortDirection: "desc",
                        search_startTime: viewModel.searchdatanew.getValue("startTime"),
                        search_endTime: viewModel.searchdatanew.getValue("endTime"),
                        search_filterid:viewModel.search_filterid,
                        search_filter:viewModel.search_filter,
                    };

                    //搜索框
                    $(element).find("#search").each(function () {
                        if (this.value == undefined || this.value == '' || this.value.length == 0) {
                            //不执行操作
                        } else {
                            jsonData['search_searchParam'] = this.value.replace(/(^\s*)|(\s*$)/g, "");
                            //去掉空格
                        }
                    });

                    // 根据条件筛选
                    if (filter) {
                        if (filter != '' || filter.length != 0) {
                            // jsonData['search_'+ filter.key ] = filter[key];
                            u.extend(jsonData, filter);
                        }
                    } else {
                        var filterobj = viewModel.event.resetfilterclick(false);
                        u.extend(jsonData, filterobj);
                    }

                    //发送请求
                    $.ajax({
                        type: 'get',
                        url: contractlistUrl,
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
                                        viewModel.contractDa.removeAllRows();
                                        viewModel.contractDa.clear();
                                    } else {
                                        viewModel.totleCount = res.detailMsg.data.totalElements;
                                        viewModel.totlePage = res.detailMsg.data.totalPages;
                                        viewModel.event.comps.update({
                                            totalPages: viewModel.totlePage,
                                            pageSize: viewModel.pageSize,
                                            currentPage: viewModel.draw,
                                            totalCount: viewModel.totleCount
                                        });
                                        viewModel.contractDa.removeAllRows();
                                        viewModel.contractDa.clear();
                                        viewModel.contractDa.setSimpleData(res.detailMsg.data.content, {
                                            unSelect: true
                                        });
                                    }
                                    let arr = [];
                                    for(let i=0,j=res.detailMsg.data.content.length;i<j;i++){
                                        if(res.detailMsg.data.content[i].contractid == viewModel.contract_contractid){
                                            arr.push(i);
                                            break;
                                        }
                                    }
                                    viewModel.contractDa.setRowsSelect(arr);
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
            message: `action: ${ action }`
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
                //加载 运营中心/运营商 列表
                orgOrAgentList:function(){
                    var jsonData={
                        sortField:"d.createtime",
                        sortDirection:"desc",
                    };
                    $.ajax({
                        type : 'get',
                        url : viewModel.orgOrAgentListUrl,
                        dataType : 'json',
                        data:jsonData,
                        contentType: 'application/json;charset=utf-8',
                        success : function(res) {
                            if(res){
                                var arr = viewModel.orgnameList||[];
                                var arr_ids = [];
                                for(let i=0,j=res.length;i<j;i++){
                                    let { orgname : name,orgid:orgid, orgs :orgs } = res[i];
                                    let obj = { name:name,value:orgid,orgs:orgs };
                                    arr.push(obj);
                                    arr_ids.push(obj);
                                }
                                viewModel.orgnameList = arr;
                                viewModel.orgidlist = arr_ids;
                                var combo1Obj = document.getElementById('combobox_orgname')['u.Combo'];
                                combo1Obj.setComboData(arr);

                                let agent_arr = [];
                                for(let ai=0,aj=arr.length;ai<aj;ai++){
                                    if(arr[ai].orgs && arr[ai].orgs.length>0) {
                                        for (let ii = 0, jj = arr[ai].orgs.length; ii < jj; ii++) {
                                            let {orgname: name,orgid:orgid} = arr[ai].orgs[ii];
                                            let obj = {name: name, value: orgid};
                                            agent_arr.push(obj);
                                        }
                                    }
                                }
                                viewModel.agentidlist = agent_arr.concat();
                                viewModel.agentidalllist = agent_arr.concat();

                                viewModel.event.setSearchValue();

                                // var row = viewModel.searchdatanew.getSelectedRows()[0];
                                // row.setValue('orgname','-1');
                            }
                        }
                    })
                },

                //更新合同
                saveContract: function (data) {

                    // var list=viewModel.event.genDataList(data);
                    var contractType = viewModel.type;
                    var editrow;
                    var docunum;
                    if (contractType == 'contract') {
                        //var editrow = viewModel.contractDaNew.getSimpleData()[0];
                        editrow = viewModel.contractDaNew.getSimpleData()[0];
                        docunum = editrow.contractdocunum;
                    } else if (contractType == 'invoice') {
                        //var editrow = viewModel.invoiceDaNew.getSimpleData()[0];
                        editrow = viewModel.invoiceDaNew.getSimpleData()[0];
                        docunum = editrow.invoicedocunum;
                    } else if (contractType == 'policy') {
                        //var editrow = viewModel.policyDaNew.getSimpleData()[0];
                        editrow = viewModel.policyDaNew.getSimpleData()[0];
                        docunum = editrow.policydocunum;
                    } else if (contractType == 'picc') {
                        editrow = viewModel.policyDaNew.getSimpleData()[0];
                        docunum = editrow.picc;
                    }
                    var id = data.contractid;

                    $.ajax({
                        type: 'post',
                        url: contractupdateUrl,
                        //dataType : 'json',
                        //contentType : "application/json",
                        // data : JSON.stringify(list),
                        data: {
                            contractid: id,
                            contractType: contractType,
                            docunum: docunum
                        },
                        success: function (res) {

                            if (res) {
                                if (res.success == 'success') {
                                    $vue.$message({
                                        showClose: true,
                                        message: '保存成功!',
                                        type: 'success',
                                        offset: '60'
                                    });
                                    viewModel.event.loadMessageList();
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
                                                message: `action: ${ action }`
                                            });
                                        }
                                    });
                                }
                            } else {
                                $vue.$message({
                                    showClose: true,
                                    message: '没有返回数据！',
                                    type: 'error',
                                    offset: '60'
                                });
                            }
                        }
                    });
                },

                //保存合同 生成合同
                saveContractPoint: function (data) {
                    var list = viewModel.event.genDataList(data);
                    // if (clientname == "undefined" || clientname == null || clientname == ""
                    // ||postaladdress== "undefined" || postaladdress == null || postaladdress == "") {
                    	// u.showMessage({msg: '委托方和通讯地址不能为空！', position: "top",darkType:"dark",width:"300px",height:'250px'})
                    	// $('.alert').css('display','block');
						// setTimeout(function(){
							// $('.alert').css('display','none');
						// },2000)
                    // }
                    $.ajax({
                        type: 'post',
                        url: contractsaveUrl,
                        // dataType: 'json',
                        // contentType: "application/json",
                        // data: JSON.stringify(list),
                        data: {
                            contractid: data.contractid,
                            clientname: data.clientname,
                            postaladdress: data.postaladdress,
                            idnumber:data.idnumber
                        },
                        success: function (res) {

                            if (res) {
                                if (res.success == 'success') {
                                    $vue.$message({
                                        showClose: true,
                                        message: '保存成功!',
                                        type: 'success',
                                        offset: '60'
                                    });
                                    viewModel.event.loadMessageList();
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
                                            this.$message({
                                                type: 'info',
                                                message: `action: ${ action }`
                                            });
                                        }
                                    });
                                }
                            } else {
                                $vue.$message({
                                    showClose: true,
                                    message: '没有返回数据！',
                                    type: 'error',
                                    offset: '60'
                                });
                            }
                        }
                    });
                },

                /*//搜索点击
                searchClick : function() {
                    $(element).find('#returnBtn').show();
                    viewModel.event.resetfilterclick(true);
                    viewModel.draw = 1;
                    viewModel.event.loadMessageList();
                },*/

                //邮寄合同点击
                contracteditClick: function () {
                    $('#dialog_content_contract').find('.u-msg-title').html("<h4>邮寄合同</h4>");
                    viewModel.event.clearDt(viewModel.contractDaNew);
                    var row = viewModel.contractDa.getSelectedRows()[0];
                    if (row) {
                        viewModel.contractDaNew.setSimpleData(viewModel.contractDa.getSimpleData({type: 'select'}));
                        //得到选中的一行，并设置value
                        //var row_new = viewModel.contractDaNew.getSelectedRows()[0];
                        //row_new.setValue('contractType','contractdocunum');
                        //在邮寄合同点击事件中 给全局变量type设置   contract 合同类型
                        viewModel.type = 'contract';

                        var tt = row.data.contractdocunum;
                        $("#send_contract").attr("disabled", "true");
                        if (tt.value) {
                            //是否邮寄
                            var dd = $("#send_contract");
                            dd.prop("checked", "checked");
                        } else {
                            var dd = $("#send_contract");
                            dd.removeAttr('checked');
                            //dd.attr("disabled","true");
                        }
                        window.md = u.dialog({
                            id: 'add_contract',
                            content: "#dialog_content_contract",
                            hasCloseMenu: true
                        });
                    } else {
                        $vue.$message({
                            showClose: true,
                            message: '请选择要操作的合同！',
                            type: 'warning',
                            offset: '60'
                        });
                    }
                },

                //邮寄发票点击
                invoiceeditClick: function () {

                    $('#dialog_content_invoice').find('.u-msg-title').html("<h4>邮寄发票</h4>");
                    viewModel.event.clearDt(viewModel.invoiceDaNew);
                    var row = viewModel.contractDa.getSelectedRows()[0];
                    if (row) {
                        viewModel.invoiceDaNew.setSimpleData(viewModel.contractDa.getSimpleData({type: 'select'}));
                        //var row_new = viewModel.invoiceDaNew.getSelectedRows()[0];
                        //row_new.setValue('contractType','invoicedocunum');
                        viewModel.type = 'invoice';
                        var tt = row.data.invoicedocunum;
                        $("#send_invoice").attr("disabled", "true");
                        if (tt.value) {
                            //是否邮寄
                            var dd = $("#send_invoice");
                            dd.prop("checked", "checked");
                        } else {
                            var dd = $("#send_invoice");
                            dd.removeAttr('checked');
                            //dd.attr("disabled","true");
                        }
                        window.md = u.dialog({
                            id: 'add_invoice',
                            content: "#dialog_content_invoice",
                            hasCloseMenu: true
                        });
                    } else {
                        $vue.$message({
                            showClose: true,
                            message: '请选择要操作的合同！',
                            type: 'warning',
                            offset: '60'
                        });
                    }
                },

                //邮寄保单点击
                policyeditClick: function () {

                    $('#dialog_content_policy').find('.u-msg-title').html("<h4>邮寄保单</h4>");
                    viewModel.event.clearDt(viewModel.policyDaNew);
                    var row = viewModel.contractDa.getSelectedRows()[0];
                    if (row) {
                        viewModel.policyDaNew.setSimpleData(viewModel.contractDa.getSimpleData({type: 'select'}));
                        //var row_new = viewModel.policyDaNew.getSelectedRows()[0];
                        //row_new.setValue('contractType','policydocunum');
                        viewModel.type = 'policy';
                        var tt = row.data.policydocunum;
                        $("#send_policy").attr("disabled", "true");
                        if (tt.value) {
                            //是否邮寄
                            var dd = $("#send_policy");
                            dd.prop("checked", "checked");
                        } else {
                            var dd = $("#send_policy");
                            dd.removeAttr('checked');
                            //dd.attr("disabled","true");
                        }
                        window.md = u.dialog({
                            id: 'add_policy',
                            content: "#dialog_content_policy",
                            hasCloseMenu: true
                        });
                    } else {
                        $vue.$message({
                            showClose: true,
                            message: '请选择要操作的合同！',
                            type: 'warning',
                            offset: '60'
                        });
                    }
                },
                //填写保单点击
                policyAddClick: function () {

                    $('#dialog_content_picc').find('.u-msg-title').html("<h4>保单号录入</h4>");
                    viewModel.event.clearDt(viewModel.policyDaNew);
                    var row = viewModel.contractDa.getSelectedRows()[0];
                    if (row) {
                        viewModel.policyDaNew.setSimpleData(viewModel.contractDa.getSimpleData({type: 'select'}));
                        viewModel.type = 'picc';
                        window.md = u.dialog({
                            id: 'add_picc',
                            content: "#dialog_content_picc",
                            hasCloseMenu: true
                        });
                    } else {
                        $vue.$message({
                            showClose: true,
                            message: '请选择要操作的合同！',
                            type: 'warning',
                            offset: '60'
                        });
                    }
                },
                //添加合同点击
                contractsaveClick: function () {
                    //1. 创建空数据
                    //1.1 先清空
                    //1.2再创建
                    //2.填写数据
                    //3.更新数据

                    $('#dialog_content_contractsave').find('.u-msg-title').html("<h4>生成合同</h4>");
                    viewModel.event.clearDt(viewModel.contractSaveDaNew);
                    var newr = viewModel.contractSaveDaNew.createEmptyRow();
                    viewModel.contractSaveDaNew.setRowSelect(newr);
                    window.md = u.dialog({
                        id: 'add_material',
                        content: "#dialog_content_contractsave",
                        hasCloseMenu: true
                    });
                },

                //合同保存点击
                saveClick: function () {
                    var data = viewModel.contractDaNew.getSelectedRows()[0];
                    if (!viewModel.app.compsValidate($('#add-form-contract')[0])) {
                        return;
                    }
                    //var data_da=data.getSimpleData();
                    viewModel.event.saveContractPoint(data.getSimpleData());
                },

                //保存点击
                saveContractClick: function () {

                    var type = viewModel.type;
                    var data;
                    if (type == 'contract') {
                        data = viewModel.contractDaNew.getSelectedRows()[0];
                    } else if (type == 'invoice') {
                        data = viewModel.invoiceDaNew.getSelectedRows()[0];
                    } else if (type == 'policy' || type == 'picc') {
                        data = viewModel.policyDaNew.getSelectedRows()[0];
                    }
                    //var data = viewModel.contractDaNew.getSelectedRows()[0];
                    if (!viewModel.app.compsValidate($('#add-form')[0])) {
                        return;
                    }
                    //调用点击的请求事件
                    viewModel.event.saveContract(data.getSimpleData());
                },

                //取消点击
                cancelManClick: function () {
                    md.close();
                },
                //上传发票
                SendInvoiceClick: function () {
                    photos = [];
                    $('#dialog_content_photo').find('.u-msg-title').html("<h4>发票文件</h4>");
                    //重置
                    $("#contract-file").val('');
                    $("#putphoto .item").remove();
                    phototype = 'invoicephoto';
                    var row = viewModel.contractDa.getSelectedRows()[0];
                    if (row) {
                        if (row.data.invoicephoto.value) {
                            var temp = row.data.invoicephoto.value;
                            if (temp) photos = temp.split(",");
                            //上传提示
                            for (var i = 0; i < photos.length; i++) {
                                var key = photos[i];
                                if (key.indexOf(".") != -1) {//
                                    var temp = key.split(".");
                                    var id = temp[0];
                                    var filetype = temp[1];
                                    var img = '<div class="item" data-id="' + key + '"> <a href="' + url + key + '" target="_blank"><img id="' + id + '"  style="width: 60px; height: 60px;" /><div class="item_model">' + filetype + '</div></a><span class="delete" data-id="' + key + '">×</span></div>';
                                    $("#item_").before(img);
                                } else {
                                    var img = '<div class="item" data-id="' + key + '"> <a href="' + url + key + '" target="_blank"><img id="' + key + '" src="' + url + key + '?imageView2/1/w/60/h/60' + '" style="width: 60px; height: 60px;" /></a><span class="delete" data-id="' + key + '">×</span></div>';
                                    //$("#putphoto").append(img);
                                    $("#item_").before(img);
                                }
                                ;
                            }
                            ;
                        }
                        viewModel.contractDaNew.setSimpleData(viewModel.contractDa.getSimpleData({
                            type: 'select'
                        }));
                        window.md = u.dialog({
                            id: 'add_photo',
                            content: "#dialog_content_photo",
                            hasCloseMenu: true
                        });
                    } else {
                        $vue.$message({
                            showClose: true,
                            message: '请选择要操作的合同！',
                            type: 'warning',
                            offset: '60'
                        });
                    }
                },
                //上传竣工单
                contractelecverseditClick: function () {
                    photos = [];
                    $('#dialog_content_photo').find('.u-msg-title').html("<h4>竣工单文件</h4>");
                    $("#contract-file").val('');
                    $("#putphoto .item").remove();
                    phototype = 'contractelecvers';
                    var row = viewModel.contractDa.getSelectedRows()[0];
                    if (row) {
                        if (row.data.contractelecvers.value) {
                            var temp = row.data.contractelecvers.value;
                            if (temp) photos = temp.split(",");
                            //上传提示
                            for (var i = 0; i < photos.length; i++) {
                                var key = photos[i];
                                if (key.indexOf(".") != -1) {//
                                    var temp = key.split(".");
                                    var id = temp[0];
                                    var filetype = temp[1];
                                    var img = '<div class="item" data-id="' + key + '"> <a href="' + url + key + '" target="_blank"><img id="' + id + '"  style="width: 60px; height: 60px;" /><div class="item_model">' + filetype + '</div></a><span class="delete" data-id="' + key + '">×</span></div>';
                                    $("#item_").before(img);
                                } else {
                                    var img = '<div class="item" data-id="' + key + '"> <a href="' + url + key + '" target="_blank"><img id="' + key + '" src="' + url + key + '?imageView2/1/w/60/h/60' + '" style="width: 60px; height: 60px;" /></a><span class="delete" data-id="' + key + '">×</span></div>';
                                    //$("#putphoto").append(img);
                                    $("#item_").before(img);
                                }
                                ;
                            }
                            ;
                        }
                        viewModel.contractDaNew.setSimpleData(viewModel.contractDa.getSimpleData({
                            type: 'select'
                        }));
                        window.md = u.dialog({
                            id: 'add_photo',
                            content: "#dialog_content_photo",
                            hasCloseMenu: true
                        });
                    } else {
                        $vue.$message({
                            showClose: true,
                            message: '请选择要操作的合同！',
                            type: 'warning',
                            offset: '60'
                        });
                    }
                },
                //上传保单
                SendPolicyClick: function () {
                    photos = [];
                    $('#dialog_content_photo').find('.u-msg-title').html("<h4>保单文件</h4>");
                    $("#contract-file").val('');
                    $("#putphoto .item").remove();
                    phototype = 'policyphoto';
                    var row = viewModel.contractDa.getSelectedRows()[0];
                    if (row) {
                        if (row.data.policyphoto.value) {
                            var temp = row.data.policyphoto.value;
                            if (temp) photos = temp.split(",");
                            //上传提示
                            for (var i = 0; i < photos.length; i++) {
                                var key = photos[i];
                                if (key.indexOf(".") != -1) {//
                                    var temp = key.split(".");
                                    var id = temp[0];
                                    var filetype = temp[1];
                                    var img = '<div class="item" data-id="' + key + '"> <a href="' + url + key + '" target="_blank"><img id="' + id + '"  style="width: 60px; height: 60px;" /><div class="item_model">' + filetype + '</div></a><span class="delete" data-id="' + key + '">×</span></div>';
                                    $("#item_").before(img);
                                } else {
                                    var img = '<div class="item" data-id="' + key + '"> <a href="' + url + key + '" target="_blank"><img id="' + key + '" src="' + url + key + '?imageView2/1/w/60/h/60' + '" style="width: 60px; height: 60px;" /></a><span class="delete" data-id="' + key + '">×</span></div>';
                                    //$("#putphoto").append(img);
                                    $("#item_").before(img);
                                }
                                ;
                            }
                            ;
                        }
                        viewModel.contractDaNew.setSimpleData(viewModel.contractDa.getSimpleData({
                            type: 'select'
                        }));
                        window.md = u.dialog({
                            id: 'add_photo',
                            content: "#dialog_content_photo",
                            hasCloseMenu: true
                        });
                    } else {
                        $vue.$message({
                            showClose: true,
                            message: '请选择要操作的合同！',
                            type: 'warning',
                            offset: '60'
                        });
                    }
                },
                //批量上传合同
                BatchUploadClick: function () {
                    $('.upload_area').on({
                        dragleave:function(e){    //拖离
                            //e.preventDefault();
                            $('.upload_area').css('border','1px dashed #d9d9d9')
                        },
                        drop:function(e){  //拖后放
                            //e.preventDefault();
                            $('.upload_area').css('border','1px dashed #d9d9d9')
                        },
                        dragenter:function(e){    //拖进
                            //e.preventDefault();
                            $('.upload_area').css('border','2px dashed blue')
                        },
                        dragover:function(e){    //拖来拖去
                            //e.preventDefault();
                        }
                    });
                    photos = [];
                    $("#contract-file-batch").val('');
                    $("#putphoto-batch .item").remove();
                    phototype = 'contractphoto';

                    //var row = viewModel.contractDa.getSelectedRows()[0];
                    //     if (row.data.contractphoto.value) {
                    //         var temp = row.data.contractphoto.value; //该合同所有文件
                    //         photos = temp.split(",");
                    //         //上传提示
                    //         for (var i = 0; i < photos.length; i++) {
                    //             var key = photos[i];
                    //             if (key.indexOf(".") != -1) {//
                    //                 var temp = key.split(".");
                    //                 var id = temp[0];
                    //                 var filetype = temp[1];
                    //                 var img = '<div class="item" data-id="' + key + '"> <a href="' + url + key + '" target="_blank"><img id="' + id + '"  style="width: 60px; height: 60px;" /><div class="item_model">' + filetype + '</div></a><span class="delete" data-id="' + key + '">×</span></div>';
                    //                 $("#item_").before(img);
                    //             } else {
                    //                 var img = '<div class="item" data-id="' + key + '"> <a href="' + url + key + '" target="_blank"><img id="' + key + '" src="' + url + key + '?imageView2/1/w/60/h/60' + '" style="width: 60px; height: 60px;" /></a><span class="delete" data-id="' + key + '">×</span></div>';
                    //                 //$("#putphoto").append(img);
                    //                 $("#item_").before(img);
                    //             }
                    //             ;
                    //         }
                    //         ;
                    //     }
                    //     viewModel.contractDaNew.setSimpleData(viewModel.contractDa.getSimpleData({
                    //         type: 'select'
                    //     }));

                        window.md = u.dialog({
                            id: 'add_photo_batch',
                            content: "#dialog_content_photo_batch",
                            hasCloseMenu: true
                        });

                },
                //点击保存批量上传
                saveBatchClick: function () {
                    //var data_ = viewModel.contractDaNew.getSelectedRows()[0].data;
                    var jsonData = JSON.stringify(photos);
                    $.ajax({
                        type: 'post',
                        url: batchsaveUrl,
                        data:{
                            object:jsonData
                        },
                        //dataType:'json',
                        //contentType:'application/json;charset=utf-8',
                        success: function (res) {
                            if (res.success == 'success') {
                                viewModel.event.loadMessageList();
                                //res.detailMsg.data
                                $vue.$alert(res.detailMsg.data, '操作提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        $vue.$message({
                                            type: 'info',
                                            message: `action: ${ action }`
                                        });
                                    }
                                });
                                md.close();
                            } else {
                                $vue.$message({
                                    showClose: true,
                                    message: '异常！',
                                    type: 'error',
                                    offset: '60'
                                });
                            }
                        },
                    })
                },
                //上传合同点击
                SendContractClick: function () {
                    photos = [];
                    $('#dialog_content_photo').find('.u-msg-title').html("<h4>合同文件</h4>");
                    $("#contract-file").val('');
                    $("#putphoto .item").remove();
                    phototype = 'contractphoto';
                    var row = viewModel.contractDa.getSelectedRows()[0];
                    if (row) {
                        if (row.data.contractphoto.value) {
                            var temp = row.data.contractphoto.value;
                            photos = temp.split(",");
                            //上传提示
                            for (var i = 0; i < photos.length; i++) {
                                var key = photos[i];
                                if (key.indexOf(".") != -1) {//
                                    var temp = key.split(".");
                                    var id = temp[0];
                                    var filetype = temp[1];
                                    var img = '<div class="item" data-id="' + key + '"> <a href="' + url + key + '" target="_blank"><img id="' + id + '"  style="width: 60px; height: 60px;" /><div class="item_model">' + filetype + '</div></a><span class="delete" data-id="' + key + '">×</span></div>';
                                    $("#item_").before(img);
                                } else {
                                    var img = '<div class="item" data-id="' + key + '"> <a href="' + url + key + '" target="_blank"><img id="' + key + '" src="' + url + key + '?imageView2/1/w/60/h/60' + '" style="width: 60px; height: 60px;" /></a><span class="delete" data-id="' + key + '">×</span></div>';
                                    //$("#putphoto").append(img);
                                    $("#item_").before(img);
                                }
                                ;
                            }
                            ;
                        }
                        viewModel.contractDaNew.setSimpleData(viewModel.contractDa.getSimpleData({
                            type: 'select'
                        }));
                        window.md = u.dialog({
                            id: 'add_photo',
                            content: "#dialog_content_photo",
                            hasCloseMenu: true
                        });
                    } else {
                        $vue.$message({
                            showClose: true,
                            message: '请选择要操作的合同！',
                            type: 'warning',
                            offset: '60'
                        });
                    }
                },
                //上传图片
                saveUploadClick: function () {
                    var files = $("#contract-file")[0].files;
                    //var id="#putphoto";
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        var filename = file.name;
                        photos.push(upFile(file, tokenUrl,'',filename));
                    }
                    ;
                },
                //批量上传图片
                saveBatchUploadClick: function () {
                    var files = $("#contract-file-batch")[0].files;
                    //var id="#putphoto";
                    var name_temp = "";
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        var obj = {};
                        obj.filename = file.name;
                        var temp = obj.filename;
                        var temps = temp.split('.');
                        var filetype=temps[temps.length - 1];
                        if(filetype=='jpg'||filetype=='png'||filetype=='jpeg'||filetype=='xls'||filetype=='xlsx'||filetype=='pdf'){
                            obj.value = upFile(file, tokenUrl,'batch',file.name);
                            photos.push(obj);
                        }else{
                            name_temp += name_temp?','+temp:temp;
                            continue;
                        }
                    };
                    if(name_temp){
                        var msgContent = '<div>';
                        if(name_temp && name_temp.indexOf(',') != -1){
                            var nameArr  = name_temp.split(',');
                            for(var item of nameArr){
                                msgContent += `<p>${item}</p>`;
                            }
                        }else{
                            msgContent += `<p>${name_temp}</p>`;
                        }
                        msgContent += '<p>以上文件上传失败，文件格式不正确！</p></div>';
                        $vue.$message({
                            dangerouslyUseHTMLString: true,
                            showClose: true,
                            message: msgContent,
                            type: 'error',
                            customClass: 'el-zindex',
                            duration: '10000'
                        });
                    }
                },
                //点击保存图片
                savePhotoClick: function () {

                    var photo = photos.join(",");
                    var data_ = viewModel.contractDaNew.getSelectedRows()[0].data;
                    $.ajax({
                        type: 'post',
                        url: photosaveUrl,
                        data: {
                            contractid: data_.contractid.value,
                            key: phototype,
                            value: photo
                        },
                        success: function (res) {
                            if (res.success == 'success') {
                                viewModel.event.loadMessageList();
                                $vue.$message({
                                    showClose: true,
                                    message: '保存成功!',
                                    type: 'success',
                                    offset: '60'
                                });
                                md.close();
                            } else {
                                $vue.$message({
                                    showClose: true,
                                    message: '异常！',
                                    type: 'error',
                                    offset: '60'
                                });
                            }
                        },
                    })
                },

                //修改合同点击
				modifyClick:function(){
					$('#dialog_content_contract_m').find('.u-msg-title').html("<h4>修改合同</h4>");
						var row = viewModel.contractDa.getSelectedRows()[0];
						if(row){
							viewModel.event.clearDt(viewModel.contractDaNew);
							viewModel.contractDaNew.setSimpleData(viewModel.contractDa.getSimpleData({type: 'select'}));
							window.md = u.dialog({id:'add_contract',content:"#dialog_content_contract_m",hasCloseMenu:true});
						}else{
							$vue.$message({
                                showClose: true,
                                message: '请选择要编辑的数据！',
                                type: 'warning',
                                offset: '60'
                            });
						}

				},
                //跳转到合同详情页
                toContractDetail: function (obj) {
                    var id = obj.row.value.contractid;
                    var text = obj.value;
                    var servicecode = obj.row.value.servicecode;
                    var html = `<a title=${text} class='c_green' style='text-decoration: underline;' href='#/contract/contractDetail?id=${id}&servicecode=${servicecode}'>${text}</a>`;
                    obj.element.innerHTML = html;
                },
                UPType: function (obj) {
                    var text = '';
                    if (obj.value) {
                        text = '已上传';
                    } else {
                        text = '未上传';
                    }
                    obj.element.innerHTML = text;
                },
                toWaybill: function (obj) {
                    var text = obj.value;
                    var ids = text.split(/[: ：]/g);
                    var id = ids[ids.length - 1];
                    var html = '';

                    if (ids.length > 1) {
                        /*html = "<a title='" + text + "' target='_blank' class='c_green' style='text-decoration: underline;' href='http://www.sf-express.com/cn/sc/dynamic_function/waybill/#search/bill-number/" + id + "'>" + id + "</a>";*/
                        html = `<span class="expressId" style="color:rgb(3,162,228);cursor:pointer;" data-id="${id}">${id}</span>`;
                        obj.element.innerHTML = text.replace(id, "") + html;
                    }
                },
                //缓存筛选，分页数据
                saveSearchObj:function (filename,newValue) {
                    var obj = sessionStorage['searchObj'];
                    if (obj) {
                        obj = JSON.parse(obj);
                    } else {
                        obj = {};
                    }
                    obj[filename] = newValue;
                    obj.type = 'contract';
                    sessionStorage['searchObj'] = JSON.stringify(obj);
                },
                //单击缓存选中行
                funClick:function (row) {
                    if(row.rowObj.value.contractid){
                        viewModel.contract_contractid = row.rowObj.value.contractid;
                    }
                },
                // 加载页面
                loadView:function(){
                    $.ajax({
                        type : 'get',
                        url : viewModel.getViewUrl,
                        // dataType : 'json',
                        data:{
                            templatename:viewModel.viewFormname
                        },
                        contentType: 'application/json;charset=utf-8',
                        success : function(res) {
                            if(res.detailMsg.data){
                                viewModel.viewList = res.detailMsg.data||[];
                                viewModel.event.viewRender(res.detailMsg.data);
                            }else{
                                viewModel.event.viewRender();
                            }
                        },error:function () {
                            viewModel.event.viewRender();
                        }
                    })
                },
                viewRender:function(res){
                    var list = res||[];
                    function getvalue(filed,key) {
                        let value = '';
                        if(key=='visible')value = true;
                        if(key=='visibleindex')value =  1;
                        for(let i = 0,j=list.length;i<j;i++){
                            let obj = list[i];
                            if(obj.attribute == filed){
                                value = obj[key];
                                break;
                            }
                        }
                        return value;
                    }
                    var obj = [
                        {index:`${getvalue('name','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('name','visibleindex')},"visible":${getvalue('name','visible')},"field":"name","title":"客户姓名","dataType":"String","editType":"string","renderType":"event.toContractDetail"}'></div>`},
                        {index:`${getvalue('phone','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('phone','visibleindex')},"visible":${getvalue('phone','visible')},"field":"phone","title":"客户手机号","dataType":"String","editType":"string"}'></div>`},
                        {index:`${getvalue('servicecode','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('servicecode','visibleindex')},"visible":${getvalue('servicecode','visible')},"field":"servicecode","title":"工程编号","dataType":"String","editType":"string"}'></div>`},
                        {index:`${getvalue('contractcode','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('contractcode','visibleindex')},"visible":${getvalue('contractcode','visible')},"field":"contractcode","title":"合同编号","dataType":"String","editType":"string"}'></div>`},
                        {index:`${getvalue('invoicestate','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('invoicestate','visibleindex')},"visible":${getvalue('invoicestate','visible')},"field":"invoicestate","title":"发票","dataType":"String","editType":"string"}'></div>`},
                        {index:`${getvalue('picc','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('picc','visibleindex')},"visible":${getvalue('picc','visible')},"field":"picc","title":"保单号","dataType":"String","editType":"string"}'></div>`},
                        {index:`${getvalue('discount','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('discount','visibleindex')},"visible":${getvalue('discount','visible')},"field":"discount","title":"优惠金额","dataType":"String","editType":"string"}'></div>`},
                        {index:`${getvalue('refund','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('refund','visibleindex')},"visible":${getvalue('refund','visible')},"field":"refund","title":"退款金额","dataType":"String","editType":"string"}'></div>`},
                        // {index:`${getvalue('transfer','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('transfer','visibleindex')},"visible":${getvalue('transfer','visible')},"field":"transfer","title":"支付转移金额","dataType":"String","editType":"string"}'></div>`},
                        {index:`${getvalue('afterdiscount','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('afterdiscount','visibleindex')},"visible":${getvalue('afterdiscount','visible')},"field":"afterdiscount","title":"优惠后金额","dataType":"String","editType":"string"}'></div>`},
                        {index:`${getvalue('totalamount','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('totalamount','visibleindex')},"visible":${getvalue('totalamount','visible')},"field":"totalamount","title":"合同总金额","dataType":"String","editType":"string"}'></div>`},
                        {index:`${getvalue('paidamount','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('paidamount','visibleindex')},"visible":${getvalue('paidamount','visible')},"field":"paidamount","title":"已支付金额","dataType":"String","editType":"string"}'></div>`},
                        {index:`${getvalue('constructionname','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('constructionname','visibleindex')},"visible":${getvalue('constructionname','visible')},"field":"constructionname","title":"施工工队","dataType":"String","editType":"string"}'></div>`},
                        {index:`${getvalue('agentname','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('agentname','visibleindex')},"visible":${getvalue('agentname','visible')},"field":"agentname","title":"所属区域运营商","dataType":"String","editType":"string"}'></div>`},
                        {index:`${getvalue('contractdocunum','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('contractdocunum','visibleindex')},"visible":${getvalue('contractdocunum','visible')},"field":"contractdocunum","title":"合同邮寄单据号","dataType":"String","editType":"string","renderType":"event.toWaybill"}'></div>`},
                        {index:`${getvalue('invoicedocunum','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('invoicedocunum','visibleindex')},"visible":${getvalue('invoicedocunum','visible')},"field":"invoicedocunum","title":"发票邮寄单据号","dataType":"String","editType":"string","renderType":"event.toWaybill"}'></div>`},
                        {index:`${getvalue('policydocunum','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('policydocunum','visibleindex')},"visible":${getvalue('policydocunum','visible')},"field":"policydocunum","title":"保单邮寄单据号","dataType":"String","editType":"string","renderType":"event.toWaybill"}'></div>`},
                        {index:`${getvalue('contractphoto','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('contractphoto','visibleindex')},"visible":${getvalue('contractphoto','visible')},"field":"contractphoto","title":"合同文件","dataType":"String","editType":"string","renderType":"event.UPType"}'></div>`},
                        {index:`${getvalue('contractmailstate','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('contractmailstate','visibleindex')},"visible":${getvalue('contractmailstate','visible')},"field":"contractmailstate","title":"合同邮寄","dataType":"String","editType":"string"}'></div>`},
                        {index:`${getvalue('invoicephoto','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('invoicephoto','visibleindex')},"visible":${getvalue('invoicephoto','visible')},"field":"invoicephoto","title":"发票文件","dataType":"String","editType":"string","renderType":"event.UPType"}'></div>`},
                        {index:`${getvalue('invoicemailstate','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('invoicemailstate','visibleindex')},"visible":${getvalue('invoicemailstate','visible')},"field":"invoicemailstate","title":"发票邮寄","dataType":"String","editType":"string"}'></div>`},
                        {index:`${getvalue('policyphoto','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('policyphoto','visibleindex')},"visible":${getvalue('policyphoto','visible')},"field":"policyphoto","title":"保单文件","dataType":"String","editType":"string","renderType":"event.UPType"}'></div>`},
                        {index:`${getvalue('policymailstate','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('policymailstate','visibleindex')},"visible":${getvalue('policymailstate','visible')},"field":"policymailstate","title":"保单邮寄","dataType":"String","editType":"string"}'></div>`},
                        {index:`${getvalue('contractelecvers','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('contractelecvers','visibleindex')},"visible":${getvalue('contractelecvers','visible')},"field":"contractelecvers","title":"竣工单文件","dataType":"String","editType":"string","renderType":"event.UPType"}'></div>`},
                        {index:`${getvalue('createtime','visibleindex')}`,html:`<div options='{"visibleindex":${getvalue('createtime','visibleindex')},"visible":${getvalue('createtime','visible')},"field":"createtime","title":"创建时间","dataType":"date","editType":"date"}'></div>`},
                    ];
                    function objvalueSort(obj) {//排序的函数
                        var newkey = Object.keys(obj).sort(function(key1,key2){
                            var a = obj[key1]['index'];
                            var b = obj[key2]['index'];
                            return a-b;
                        })
                        let html = '';
                        for (let i = 0; i < newkey.length; i++) {//遍历newkey数组
                            let val = obj[newkey[i]].html;
                            html+=val;
                        }
                        return html;
                    }
                    $(viewModel.viewContainer).append(objvalueSort(obj));
                    viewModel.event.pageInit();
                },
                //保存配置
                onSaveSetFun:function(){
                    var list = viewModel.viewList||[];
                    var list_pro = [];
                    var arr = $("#contractdata_header_thead th");
                    for(let i=0,j=arr.length;i<j;i++){
                        let visibleindex = $(arr[i]).attr('visibleindex');
                        let visible = $(arr[i]).is(":visible");
                        let filed = $(arr[i]).attr("data-filed");
                        if(list.length>0){
                            for(let ii = 0,jj=list.length;ii<jj;ii++){
                                if(list[ii].attribute == filed){
                                    list[ii].visibleindex = Number(visibleindex);
                                    list[ii].visible = visible;
                                    list[ii].templatename = viewModel.viewFormname;
                                    break;
                                }
                            }
                        }else{
                            let obj = {};
                            obj.visibleindex = visibleindex;
                            obj.visible = visible;
                            obj.templatename = viewModel.viewFormname;
                            obj.attribute = filed;
                            list_pro.push(obj);
                        }
                    }
                    if(list.length<1)list=list_pro;
                    console.log(list);
                    viewModel.event.saveView(list);
                },
                saveView:function(list){
                    $.ajax({
                        type : 'post',
                        url : viewModel.saveViewUrl,
                        dataType : 'json',
                        data:JSON.stringify(list),
                        contentType: 'application/json;charset=utf-8',
                        success : function(res) {
                            var msgContent = '保存成功！';
                            $vue.$message({
                                showClose: true,
                                message: msgContent,
                                type: 'success',
                                offset: '60'
                            });
                        },error:function () {
                            viewModel.event.viewRender();
                        }
                    })
                },


                // 获取场景
                loadSceneList:function (fun) {
                    $.ajax({
                        url:viewModel.getFilterUrl,
                        type:'get',
                        data:{
                            "all":"all",
                            type:viewModel.sceneType
                        },
                        dataType : 'json',
                        contentType : "application/json",
                        success:function(res){
                            if(res.detailMsg.data&&res.detailMsg.data.length>0){
                                res.detailMsg.data.push({
                                    filtername:'全部',
                                    id:'',
                                });
                            }
                            if(fun)fun(res);
                        }
                    });
                },
                // 场景详情
                loadSceneDetailList:function (id,fun) {
                    $.ajax({
                        url:viewModel.getFilterDetailUrl,
                        type:'get',
                        data:{
                            filterid:id,
                        },
                        dataType : 'json',
                        contentType : "application/json",
                        success:function(res){
                            if(fun)fun(res);
                        }
                    });
                },
                // 场景删除
                delScene:function (id,fun) {
                    $.ajax({
                        url:viewModel.delFilterUrl,
                        type:'get',
                        data:{
                            filterid:id,
                        },
                        dataType : 'json',
                        contentType : "application/json",
                        success:function(res){
                            if(fun)fun(res);
                        }
                    });
                },
                // 获取筛选条件
                loadSceneTypeList:function (fun) {
                    $.ajax({
                        url:viewModel.getTypeFilterUrl,
                        type:'get',
                        data:{
                            search_type:viewModel.sceneType,
                            // pageSize:50
                        },
                        dataType : 'json',
                        contentType : "application/json",
                        success:function(res){
                            fun(res);
                        }
                    });
                },
                // 保存场景
                saveScene:function (data,fun) {
                    if(data){
                        $.ajax({
                            url:viewModel.saveFilterUrl,
                            type:'post',
                            data:{
                                filter:JSON.stringify(data)
                            },
                            dataType : 'json',
                            // contentType : "application/json",
                            success:function(res){
                                fun();
                            }
                        });
                    }else{
                    }
                },

            }

        };
        $(element).html(html);
        viewModel.event.loadView();
        // viewModel.event.pageInit();
        // viewModel.event.orgOrAgentList();

        if (u.isIE8) {
            $('.ie8-bg').css('display', 'block');
        };
        //删除图片监听
        $("#putphoto").on('click', '.delete', function () {
            var id = $(this).attr('data-id');
            var j = 0;
            for (var i = 0; i < photos.length; i++) {
                if (photos[i]== id) {
                    photos.splice(i, 1);
                    break;
                }
            }
            ;
            $("#putphoto .item[data-id='" + id + "']").remove();
        });
        //删除图片监听
        $("#putphoto-batch").on('click', '.delete', function () {
            var id = $(this).attr('data-id');
            var j = 0;
            for (var i = 0; i < photos.length; i++) {
                if (photos[i]['value']  == id) {
                    photos.splice(i, 1);
                    break;
                }
            }
            ;
            $("#putphoto-batch .item[data-id='" + id + "']").remove();
        });
        //图片上传监听
        $("#contract-file").on('change', function () {
            var id = $(this).val();
            if (id) viewModel.event.saveUploadClick();
        });

        $("#contract-file-batch").on('change', function () {
            var id = $(this).val();
            if (id) viewModel.event.saveBatchUploadClick();
        });

        $('.expressDiv').on('click','.expressId',function(){
            var id = $(this).attr('data-id');
            var input = document.createElement('input');
            $(input).attr('id','expressInp');
            $(input).attr('type','text');
            $(input).attr('value',id);
            document.body.append(input);
            $('#expressInp').select();
            document.execCommand("copy");
            $('#expressInp').remove();
            $('#expressMsg').css('display','block');//显示
            var timer = setTimeout(function () {
                $('#expressMsg').css('display','none');//隐藏
                window.open("http://www.kuaidi100.com","_blank");
                clearTimeout(timer);
            },2500);
        })

        // 筛选条件
        viewModel.searchdatanew.on('valueChange', function (event) {
            let filename = event.field;  // 改变的字段
            // var oldValue = event.oldValue;
            var newValue = event.newValue;

            viewModel.event.saveSearchObj(filename,newValue);

            if(filename == 'orgname'){ //选择运营中心，联动 运营商
                let org = viewModel.orgnameList.concat();
                let agent = viewModel.agentnameList_temp.concat();
                var row = viewModel.searchdatanew.getSelectedRows()[0];
                row.setValue('agentname','');
                if(newValue=="-1"){
                    for(let i=0,j=org.length;i<j;i++){
                        let item = org[i].orgs||[];
                        if(item.length>0){
                            for (let ii = 0, jj = item.length; ii < jj; ii++) {
                                let {orgname: name,orgid:orgid} = org[i].orgs[ii];
                                let obj = {name: name, value: orgid};
                                agent.push(obj);
                            }
                        }
                    }
                }else{
                    for(let i=0,j=org.length;i<j;i++){
                        if(org[i].value == newValue){
                            if(org[i].orgs.length>0) {
                                for (let ii = 0, jj = org[i].orgs.length; ii < jj; ii++) {
                                    let {orgname: name,orgid:orgid} = org[i].orgs[ii];
                                    let obj = {name: name, value: orgid};
                                    agent.push(obj);
                                }
                            }
                            break;
                        }
                    }
                }
                viewModel.agentnameList = agent;
                var combo1Obj = document.getElementById('combobox_agentname')['u.Combo'];
                combo1Obj.setComboData(agent);
            }
        });


        var vm = new Vue({
            el:'#appFilter',
            data: function(){
                return {
                    scene:'',
                    scenelist:[],
                    list:[
                        // {name: '手机', id: 'phone'},
                        // {name: '行业', id: 22},
                        // {name: '线索', id: 33},
                        // {name: '级别', id: 44},
                        // {name: '日期', id: 55},
                    ],
                    conditionlist:[
                        {name: '包含', id: 'contain'},
                        {name: '不包含', id: 'no_contain'},
                        {name: '等于', id: 'equal'},
                        {name: '不等于', id: 'no_equal'},
                        {name: '开始于', id: 'start'},
                        {name: '结束于', id: 'end'},
                        {name: '为空', id: 'is_null'},
                        {name: '不为空', id: 'not_null'},
                        {name: '大于', id: 'gt'},
                        {name: '大于等于', id: 'ge'},
                        {name: '小于', id: 'lt'},
                        {name: '小于等于', id: 'le'},
                    ],
                    filters_temp: {
                        isError: false,  //是否出错
                        checked: false,  //是否保存为场景
                        visible: false,  //弹出框是否显示
                        isEdit: false,  //是否编辑模式
                        filtername: '',  //场景名称
                        type:viewModel.sceneType,
                        id_filterfactor: [],
                    },
                    filters:{
                        isError:false,  //是否出错
                        checked:false,  //是否保存为场景
                        visible:false,  //弹出框是否显示
                        isEdit:false,  //是否编辑模式
                        filtername:'',  //场景名称
                        type:viewModel.sceneType,
                        id_filterfactor:[
                            {
                                field:'',
                                showname:'',
                                formtype:'text',  //select  checkbox
                                setting:[],
                                value:'',
                                start:' ',
                                end:'',
                                id:'',
                                conditions:''
                            }
                        ],
                    }
                }
            },
            mounted(){
                let that = this;
                this.setSessionFilter();
                // 获取当前页面的场景
                viewModel.event.loadSceneList(function (res) {
                    let data = res.detailMsg.data||[];
                    that.scenelist = that.copyArr(data);
                });

                // 获取当前页面的可选条件
                viewModel.event.loadSceneTypeList(function (res) {
                    let data = res.detailMsg.data?res.detailMsg.data.content:[];
                    for(let i=0,j=data.length;i<j;i++) {
                        let data_ = data[i];
                        for (var key in data_) {
                            if (key == 'conditionlist' || key == 'setting') {
                                data_[key] = JSON.parse(data_[key]);
                            }
                        }
                    }
                    console.log(data);
                    that.list = that.copyArr(data);
                });
            },
            methods:{
                onFilterClick(){
                    this.filters_temp = this.copyObj(this.filters);
                    this.filters_temp.visible = true;
                    this.filters_temp.checked = false;
                    this.filters_temp.isEdit = false;
                    this.filters_temp.filtername = '';
                    this.filters_temp.id = '';
                },
                editSceneClick(item){
                    let that = this;
                    viewModel.event.loadSceneDetailList(item.id,function (res) {
                        let data = res.detailMsg.data;
                        let obj = that.copyObj(data);
                        var arr = obj.id_filterfactor;
                        for(let i=0,j=arr.length;i<j;i++){
                            arr[i].conditionlist = JSON.parse(arr[i].conditionlist);
                            arr[i].setting = arr[i].setting?JSON.parse(arr[i].setting):arr[i].setting;
                            if(arr[i].formtype == 'date'){
                                let a = [];
                                a.push(arr[i].starttime,arr[i].endtime);
                                arr[i].value = a;
                                arr[i].start = arr[i].starttime;
                                arr[i].end = arr[i].endtime;
                            }else if(arr[i].formtype == 'org'){
                                arr[i].setting = viewModel.orgidlist;
                            }else if(arr[i].formtype == 'agent'){
                                arr[i].setting = viewModel.agentidlist;
                            }
                            if(arr[i].conditions=='contain'||arr[i].conditions=='no_contain'){
                                arr[i].value = arr[i].value.indexOf(',')>-1?arr[i].value.split(','):[arr[i].value];
                            }
                        }
                        that.filters_temp = obj;
                        that.filters_temp.visible = true;
                        that.filters_temp.checked = false;
                        that.filters_temp.isEdit = true;
                    });
                },
                delSceneClick(item){
                    let that = this;
                    this.$confirm('您确定要删除这条场景吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        viewModel.event.delScene(item.id,function (res) {
                            viewModel.event.loadSceneList(function (res) {
                                let data = res.detailMsg.data||[];
                                that.scenelist = that.copyArr(data);
                            });
                            that.scene='';
                            viewModel.event.loadMessageList();
                            that.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        });
                    });
                },
                closeFilterClick(res){
                    console.log('%c'+res,'color:red',"close");
                    this.filters_temp.visible = false
                    this.filters_temp = Object.assign({},this.filters_temp)
                },
                cancelSceneClick(){
                    viewModel.search_filterid = "";
                    this.scene = "";
                    viewModel.event.loadMessageList();
                },
                // 添加筛选条件
                addFilterClick(){
                    this.filters_temp.id_filterfactor.push({
                        type:viewModel.sceneType,
                        field:'',
                        showname:'',
                        formtype:'text',  //select  checkbox
                        setting:'',
                        value:'',
                        start:'',
                        end:'',
                        id:'',
                        conditions:''
                    });
                },
                delFilterClick(item,i){
                    let that = this;
                    this.$confirm('您确定要删除这条数据吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        that.filters_temp.id_filterfactor.splice(i,1);
                        that.filters.id_filterfactor.splice(i,1);
                        var tt = this.copyArr(that.filters.id_filterfactor);
                        for(let i=0,j=tt.length;i<j;i++){
                            delete tt[i].setting;
                            delete tt[i].conditionlist;
                            delete tt[i].valueName;
                            delete tt[i].conditionName;
                            if(tt[i].value && tt[i].value instanceof Array){
                                tt[i].value = tt[i].value.join(',');
                            }
                        }
                        viewModel.search_filter = JSON.stringify(tt);
                        sessionStorage['filter'] = JSON.stringify(that.filters);
                        that.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        that.checkError();
                        if(item.formtype=='org'){
                            viewModel.agentidlist = viewModel.agentidalllist.concat();
                        }
                        if(!that.filters_temp.visible){
                            viewModel.event.loadMessageList();
                        }
                    });
                },
                fieldChange(item,i){
                    let obj = this.list.find((res)=>{//这里的userList就是上面遍历的数据源
                        return item.field === res.field;//筛选出匹配数据
                    });
                    item.showname = obj.showname;
                    item.formtype = obj.formtype;
                    item.conditionlist = this.copyArr(obj.conditionlist);
                    if(item.formtype == 'org'){
                        item.setting = this.copyArr(viewModel.orgidlist);
                    }else if(item.formtype == 'agent'){
                        item.setting = this.copyArr(viewModel.agentidlist);
                    }else{
                        item.setting = this.copyArr(obj.setting);
                    }
                    console.log(item);
                    this.checkError();
                    item.conditions = '';
                },
                dateChange(item){
                    debugger
                    if(item.formtype=='org'){
                        let obj = viewModel.orgidlist.find(oi=>{
                            return oi.value == item.value;
                        });
                        item.valueName = obj.name;

                        var org = this.copyArr(obj.orgs||[]);
                        let agent=[];
                        for (let ii = 0, jj = org.length; ii < jj; ii++) {
                            let {orgname: name,orgid:orgid} = org[ii];
                            let obj = {name: name, value: orgid};
                            agent.push(obj);
                        }
                        viewModel.agentidlist = agent;
                        this.$message({
                            message: '修改片区可能导致运营商出现变化!',
                            type: 'warning',
                        });
                        for(let fi=0,fj=this.filters_temp.id_filterfactor.length;fi<fj;fi++){
                            if(this.filters_temp.id_filterfactor[fi].formtype=='agent'){
                                this.filters_temp.id_filterfactor[fi].setting = viewModel.agentidlist;
                                this.filters_temp.id_filterfactor[fi].value = '';
                            }
                        }

                    }else if(item.formtype=='agent'){
                        if(item.conditions == 'contain'||item.conditions == 'no_contain'){
                            let arr = viewModel.agentidlist.filter(oi => {
                                for(let ai of item.value){
                                    if(oi.value == ai){
                                        return oi
                                    }
                                }
                            });
                            let name = [];
                            for(var i in arr){
                                name.push(arr[i].name);
                            }
                            item.valueName = name.join(',');
                        }else{
                            let obj = viewModel.agentidlist.find(oi=>{
                                return oi.value == item.value;
                            });
                            item.valueName = obj.name;
                        }

                    }else if(item.formtype=='selects'){
                        debugger
                        if(item.conditions == 'contain'||item.conditions == 'no_contain') {
                            let arr = item.setting.filter(oi => {
                                for (let ai of item.value) {
                                    if (oi.value == ai) {
                                        return oi
                                    }
                                }
                            });
                            let name = [];
                            for (var i in arr) {
                                name.push(arr[i].name);
                            }
                            item.valueName = name.join(',');
                        }else{
                            let obj = item.setting.find(oi=>{
                                return oi.value == item.value;
                            });
                            item.valueName = obj.name;
                        }

                    }else if(item.formtype=='select'){
                        let obj = item.setting.find(oi=>{
                            return oi.value == item.value;
                        });
                        item.valueName = obj.name;
                    }else if(item.formtype=='date') {
                        item.start = item.value[0];
                        item.end = item.value[1];
                        item.valueName = item.value;
                    }
                },
                checkError(){
                    //判断是否有重复项
                    let arr = [];
                    for(let i=0,j=this.filters_temp.id_filterfactor.length;i<j;i++){
                        if(this.filters_temp.id_filterfactor[i].field){
                            arr.push(this.filters_temp.id_filterfactor[i].field);
                        }
                    }
                    if(new Set(arr).size !== arr.length){
                        this.filters_temp.isError = true;
                    }else{
                        this.filters_temp.isError = false;
                    }
                },
                saveFilterClick(){
                    // 判断
                    if((this.filters_temp.isEdit&&(!this.filters_temp.filtername))||(this.filters_temp.checked&&(!this.filters_temp.filtername))){
                        $vue.$message({
                            showClose: true,
                            message: '场景名称不能为空',
                            type: 'error'
                        });
                        return;
                    }

                    if(this.filters_temp.isError){
                        $vue.$message({
                            showClose: true,
                            message: '筛选条件中有重复项',
                            type: 'error'
                        });
                        return;
                    }
                    if(this.filters_temp.id_filterfactor.length<1){
                        $vue.$message({
                            showClose: true,
                            message: '筛选条件不能为空',
                            type: 'error'
                        });
                        return;
                    }
                    let errorTip = false;
                    for(let i=0,j=this.filters_temp.id_filterfactor.length;i<j;i++){
                        if(!this.filters_temp.id_filterfactor[i].field){
                            errorTip = 1;
                            break;
                        }else if(!this.filters_temp.id_filterfactor[i].conditions && (this.filters_temp.id_filterfactor[i].formtype!='date')){
                            errorTip = 2;
                            break;
                        }else if(!this.filters_temp.id_filterfactor[i].value){
                            errorTip = 3;
                            break;
                        }
                    }
                    if(errorTip){
                        let msg = '';
                        if(errorTip==1){
                            msg = '筛选的字段名不能为空'
                        }else if(errorTip==2){
                            msg = '判断条件不能为空';
                        }else if (errorTip ==3 ){
                            msg = '筛选条件不能为空';
                        }
                        $vue.$message({
                            showClose: true,
                            message: msg,
                            type: 'error'
                        });
                        return;
                    }
                    // 保存 、  筛选
                    var data = this.filters_temp;
                    let that = this;
                    let data_temp = this.copyObj(data);
                    for(let i=0,j=data_temp.id_filterfactor.length;i<j;i++){
                        data_temp.id_filterfactor[i].starttime = data_temp.id_filterfactor[i].start;
                        data_temp.id_filterfactor[i].endtime = data_temp.id_filterfactor[i].end;
                        data_temp.id_filterfactor[i] = this.removeKey(data_temp.id_filterfactor[i]);
                        if(data_temp.id_filterfactor[i].value && data_temp.id_filterfactor[i].value instanceof Array){
                            data_temp.id_filterfactor[i].value = data_temp.id_filterfactor[i].value.join(',');
                        }
                    }
                    if(data.checked||data.isEdit) {
                        // data_temp.id_filterfactor = this.copyArr(data_temp.id_filterfactor);
                        delete data_temp.isEdit;
                        delete data_temp.isError;
                        delete data_temp.checked;
                        delete data_temp.visible;
                        console.log(data_temp);
                        //ajax  ---  保存场景
                        viewModel.event.saveScene(data_temp,function () {
                            that.filters_temp.visible = false;
                            that.$message({
                                type: 'success',
                                message: '成功!'
                            });
                            if(data.isEdit){
                                viewModel.search_filterid = data_temp.id;
                                that.scene = data_temp.filtername;
                                viewModel.event.loadMessageList();
                            }
                            viewModel.event.loadSceneList(function (res) {
                                let data = res.detailMsg.data||[];
                                that.scenelist = that.copyArr(data);
                            });
                        });
                    }else{
                        viewModel.search_filterid = '';
                        sessionStorage['filterid'] = '';
                        var filter_temp = this.copyArr(data_temp.id_filterfactor);
                        for(let i=0,j=filter_temp.length;i<j;i++){
                            delete filter_temp[i].setting;
                            delete filter_temp[i].conditionlist;
                            delete filter_temp[i].valueName;
                            delete filter_temp[i].conditionName;
                            if(filter_temp[i].value && filter_temp[i].value instanceof Array){
                                filter_temp.value = filter_temp[i].value.join(',');
                            }
                        }
                        viewModel.search_filter = JSON.stringify(filter_temp);
                        sessionStorage['filter'] = JSON.stringify(this.filters_temp);
                        this.filters = this.copyObj(this.filters_temp);
                        viewModel.draw = 1;
                        viewModel.event.loadMessageList();
                    }
                    this.filters_temp.visible = false;

                    // console.log(JSON.stringify(this.filters_temp))
                },
                removeKey(obj){
                    let arr = ['type','field','id','filterid',"conditionlist","setting",'filtername','showname','formtype','conditions','value','starttime','endtime'];
                    for(var key in obj){
                        for(let i=0,j=arr.length;i<j;i++){
                            if(arr.indexOf(key)==-1){
                                delete obj[key];
                            }
                        }
                    }
                    if(obj.formtype=='org'){
                        obj.setting = '';
                    }
                    return obj;
                },
                // 深拷贝
                copyArr:function (arr) {
                    var arr_temp = [];
                    if(arr){
                        for(let i=0,j=arr.length;i<j;i++){
                            if (arr[i] instanceof Array) {
                                arr_temp[i] = this.copyArr(arr[i]);
                            }else if(arr[i] instanceof Object){
                                arr_temp[i] = this.copyObj(arr[i]);
                            } else arr_temp[i] = arr[i];
                        }
                    }
                    return arr_temp;
                },
                copyObj:function (obj) {
                    let obj_temp = {};
                    for(let key in obj){
                        if(obj[key] instanceof Array){
                            obj_temp[key] = this.copyArr(obj[key]);
                        }else if(obj[key] instanceof Object){
                            obj_temp[key] = this.copyObj(obj[key])
                        }else obj_temp[key] = obj[key];
                    }
                    return obj_temp;
                },
                conditionsChange(item){
                    let obj = this.conditionlist.find(cditem=>{
                        return cditem.id == item.conditions;
                    });
                    if(item.conditions=='is_null'||item.conditions=='not_null'){
                        item.value = '--';
                    }
                    item.conditionName = obj.name;
                    if(item.formtype!='text')item.value = '';
                },
                sceneChange(bool){
                    if(!bool){
                        viewModel.search_filterid = this.scene;
                        viewModel.search_filter = "";
                        viewModel.draw = 1;
                        sessionStorage['filterid'] = this.scene;
                        viewModel.event.loadMessageList();
                    }
                },
                setSessionFilter(){
                    var filter = sessionStorage['filter']?JSON.parse(sessionStorage['filter']):{};
                    if(filter.type== viewModel.sceneType){
                        filter.visible = false;
                        this.filters = Object.assign({},filter);
                        this.filters_temp = Object.assign({},filter);
                        var tt = this.copyArr(filter.id_filterfactor);
                        for(let i=0,j=tt.length;i<j;i++){
                            delete tt[i].setting;
                            delete tt[i].conditionlist;
                            delete tt[i].valueName;
                            delete tt[i].conditionName;
                            if(tt[i].value && tt[i].value instanceof Array){
                                tt[i].value = tt[i].value.join(',');
                            }
                        }
                        if(sessionStorage['filterid']){
                            viewModel.search_filterid = sessionStorage['filterid'];
                        }else{
                            viewModel.search_filter = JSON.stringify(tt);
                        }
                    }
                },
            },watch:{
                // scene(val){
                //     viewModel.search_filterid = val;
                //     viewModel.search_filter = "";
                //     viewModel.event.loadMessageList();
                // }
            },
            computed:{

            },
        })

    };
    return {
        'template': html,
        init: init
    }
});
