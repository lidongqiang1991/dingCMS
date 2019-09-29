define(['text!pages/project/projecting.html', 'css!pages/project/projecting', 'pages/project/projectmeta', 'pages/project/projectingmeta', 'uuigrid'], function (template) {

    //初始化方法,页面加载后被 调用
    var init = function (element) {
        var viewModel = {
            app: {},
            /* 数据模型 */
            draw: 1,
            totlePage: 0,
            pageSize: 15,
            totleCount: 0,

            search_note:'',

            // 工程
            listUrl: ctx + '/servicelist/page.do',
            addUrl: ctx + '',
            delUrl: ctx + '',
            //物料明细
            MaterialDetailUrl: ctx + '/servicelist/material.do',
            //调配物料
            MaterialserviceUrl: ctx + '/mallot/save.do',
            //material数据
            material_data: new u.DataTable(metamaterial),
            /*物料数据模型*/
            material: {
                type: '',
                draw: 1,
                totlePage: 0,
                pageSize: 5,
                totleCount: 0,
            },

            // 运营中心，运营商列表
            orgOrAgentListUrl:ctx + "/org/agent.do",

            objdata: new u.DataTable(projectingmeta),
            objdatanew: new u.DataTable(projectingmeta),

            searchdatanew: new u.DataTable(projectingmeta),

            // 筛选列表
            orgnameList: [
                {name: "全部运营中心", value: "-1"}
            ],
            agentnameList: [
                {name: "全部运营商", value: "-1"}
            ],
            agentnameList_temp:[
                {name: "全部运营商", value: "-1"}
            ],

            // 分配施工
            modelist: [{"name": "劳务模式", "value": 1},
                // {"name":"工人模式","value":2}
            ],
            modedatanew: new u.DataTable(),
            planlist: [
                {"name": 0.5, "value": 0.5},
                {"name": 1, "value": 1},
                {"name": 2, "value": 2},
                {"name": 3, "value": 3},
                {"name": 4, "value": 4},
                {"name": 5, "value": 5},
            ],
            plandatanew: new u.DataTable(),
            planSaveUrl: ctx + '/servicelist/plan.do',

            event: {
                pageInt: function () {
                    id:[];
                    viewModel.app = u.createApp({
                        el: element,
                        model: viewModel
                    });
                    //隐藏
                    $(element).find('#returnBtn').hide();
                    var paginationDiv = $(element).find('#pagination')[0];
                    this.comps = new u.pagination({el: paginationDiv, jumppage: true});
                    // this.comps.update({pageSize: 10 });  //默认每页显示5条数据

                    var paginationDiv_material = $(element).find('#pagination_material')[0];
                    this.comps_material = new u.pagination({el: paginationDiv_material, jumppage: true});
                    //this.comps.update({pageSize: 10});  //默认每页显示5条数据

                    viewModel.event.pageChange();
                    viewModel.event.sizeChange();

                    //回车搜索
                    $('.input_enter').keydown(function (e) {
                        if (e.keyCode == 13) {
                            viewModel.event.searchClick();
                            u.stopEvent(e);
                        }
                    });

                    // 初始化筛选
                    viewModel.event.clearDt(viewModel.searchdatanew);
                    viewModel.searchdatanew.clear();
                    var newr = viewModel.searchdatanew.createEmptyRow();
                    viewModel.searchdatanew.setRowSelect(newr);

                    // this.loadList();

                    //截取参数
                    var hash = window.location.hash;
                    if(hash && hash.indexOf('note') != -1){
                        var paramUrl = hash.split('?')[1];
                        var params = paramUrl.split('&');
                        for(var param of params){
                            var field = param.split('=')[0];
                            var value = param.split('=')[1];
                            if(field == 'note'){
                                viewModel.search_note = value;
                            }
                        }
                        $(".opera_show").removeClass('c_hide');
                    }else{
                        viewModel.search_note = '10';
                        $(".opera_show").addClass('c_hide');
                    }

                },
                //反显筛选条件
                setSearchValue:function(){
                    var obj = sessionStorage['searchObj'];
                    if (obj) {
                        var searchObj = JSON.parse(obj);
                        if (searchObj.type == 'projecting') {
                            var obj_new = viewModel.searchdatanew.getSelectedRows()[0];
                            for (var key in searchObj) {
                                if(key == 'pageIndex' && searchObj[key]){
                                    viewModel.draw = searchObj[key];
                                }else if(key == 'pageSize' && searchObj[key]){
                                    viewModel.pageSize = searchObj[key];
                                }else if(key != 'type'){
                                    obj_new.setValue(key,searchObj[key]);
                                }
                            }
                        } else {
                            sessionStorage['searchObj'] = "";
                        }
                    }
                    this.loadList();
                },
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
                    viewModel.event.loadList();
                },
                //返回初始化点击
                returnClick: function () {
                    $(element).find('#returnBtn').hide();
                    $("#search").val('');
                    viewModel.event.loadList();
                },
                // 筛选
                filterClick: function () {
                    $("#search").val('');
                    var obj = viewModel.event.resetfilterclick(false);
                    viewModel.event.loadList('', obj);
                },
                resetClick: function () {
                    viewModel.event.resetfilterclick(true);
                    viewModel.event.loadList(id);
                },
                // 重置 筛选条件
                resetfilterclick: function (bool) {
                    var data = viewModel.searchdatanew.getSelectedRows()[0];
                    if (!data) return;
                    if (bool) {
                        data.setValue('orgname', '');
                        data.setValue('agentname', '');
                        data.setValue('startTime1', '');
                        data.setValue('endTime1', '');
                        data.setValue('startTime2', '');
                        data.setValue('endTime2', '');
                        data.setValue('startTime3', '');
                        data.setValue('endTime3', '');
                    } else {
                        var orgname = data.getValue('orgname');
                        var agentname = data.getValue('agentname');
                        if(agentname&&agentname!="-1") orgname = "-1";
                        var startTime1 = data.getValue('startTime1');
                        var endTime1 = data.getValue('endTime1');
                        var startTime2 = data.getValue('startTime2');
                        var endTime2 = data.getValue('endTime2');
                        var startTime3 = data.getValue('startTime3');
                        var endTime3 = data.getValue('endTime3');
                        var obj = {};
                        obj.search_orgname = orgname;
                        obj.search_agentname = agentname;
                        obj.search_starttime1 = startTime1;
                        obj.search_endtime1 = endTime1;
                        obj.search_starttime2 = startTime2;
                        obj.search_endtime2 = endTime2;
                        obj.search_starttime3 = startTime3;
                        obj.search_endtime3 = endTime3;
                        return obj;
                    }
                },
                //分页相关
                pageChange: function () {
                    viewModel.event.comps.on('pageChange', function (pageIndex) {
                        viewModel.draw = pageIndex + 1;
                        viewModel.event.saveSearchObj("pageIndex",viewModel.draw);
                        viewModel.event.loadList();
                    });
                    viewModel.event.comps_material.on('pageChange', function (pageIndex) {
                        viewModel.material.draw = pageIndex + 1;
                        viewModel.event.loadmateriallist();
                    });
                },
                sizeChange: function () {
                    viewModel.event.comps.on('sizeChange', function (arg) {
                        viewModel.pageSize = parseInt(arg);
                        viewModel.draw = 1;
                        viewModel.event.saveSearchObj("pageIndex",viewModel.draw);
                        viewModel.event.saveSearchObj("pageSize",viewModel.pageSize);
                        viewModel.event.loadList();
                    });
                    viewModel.event.comps_material.on('sizeChange', function (arg) {
                        viewModel.material.pageSize = parseInt(arg);
                        viewModel.material.draw = 1;
                        viewModel.event.loadmateriallist();
                    });
                },
                //加载 工程列表
                loadList: function (obj, filter) {
                    var jsonData = {
                        pageIndex: viewModel.draw - 1,
                        pageSize: viewModel.pageSize,
                        sortField: "",
                        sortDirection: "asc",
                        search_servicestate: 1,
                        search_note:viewModel.search_note
                    };
                    // 搜索
                    $(element).find("#search").each(function () {
                        if (this.value == undefined || this.value == '' || this.value.length == 0) {
                            //不执行操作
                        } else {
                            jsonData['search_searchParam'] = this.value.replace(/(^\s*)|(\s*$)/g, "");  //去掉空格
                        }
                    });
                    // 根据id获取
                    if (obj) {
                        if (obj != '' || obj.length != 0) {
                            jsonData['search_id'] = obj.join();
                        }
                    }
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
                    $.ajax({
                        type: 'get',
                        url: viewModel.listUrl,
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
                                        viewModel.objdata.removeAllRows();
                                        viewModel.objdata.clear();
                                    } else {
                                        viewModel.totleCount = res.detailMsg.data.totalElements;
                                        viewModel.totlePage = res.detailMsg.data.totalPages;
                                        viewModel.event.comps.update({
                                            totalPages: viewModel.totlePage,
                                            pageSize: viewModel.pageSize,
                                            currentPage: viewModel.draw,
                                            totalCount: viewModel.totleCount
                                        });
                                        viewModel.objdata.removeAllRows();
                                        viewModel.objdata.clear();
                                        viewModel.objdata.setSimpleData(res.detailMsg.data.content, {unSelect: true});
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
                                });                            }

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
                                for(let i=0,j=res.length;i<j;i++){
                                    let { orgname : name,orgid:orgid, orgs :orgs } = res[i];
                                    let obj = { name:name,value:orgid,orgs:orgs };
                                    arr.push(obj);
                                }
                                viewModel.orgnameList = arr;
                                var combo1Obj = document.getElementById('combobox_orgname')['u.Combo'];
                                combo1Obj.setComboData(arr);

                                viewModel.event.setSearchValue();
                                // var row = viewModel.searchdatanew.getSelectedRows()[0];
                                // row.setValue('orgname','-1');
                            }
                        }
                    })
                },
                // 渲染详情
                renderTypeAjax: function (obj) {
                    var id = obj.row.value.billid;
                    var text = obj.value;
                    var html = "<a style='text-decoration: underline;' class='c_green' href='#/project/projectDetail?type=ing&id=" + id + "'>" + text || '' + "</a>";
                    obj.element.innerHTML = html;
                },
                //渲染工程进展状态
                renderNote: function (obj) {
                    var val = '';
                    switch (Number(obj.value)){
                        case 1:
                            val = '待分配';
                            break;
                        case 2:
                            val = '已拒绝';
                            break;
                        case 3:
                            val = '已接单';
                            break;
                        case 4:
                            val = '未上门';
                            break;
                        case 5:
                            val = '已上门';
                            break;
                        case 6:
                            val = '已报价';
                            break;
                        case 7:
                            val = '已下单';
                            break;
                        case 8:
                            val = '施工中';
                            break;
                        case 9:
                            val = '在施工';
                            break;
                    }
                    obj.element.innerHTML = val;
                },
                //渲染物料调配
                renderMaterialstate: function (obj) {
                    if (obj.value == 0 || obj.value == null || obj.value == '') {
                        var val = '未调配';
                    } else if (obj.value == 1) {
                        var val = '已调配';
                    } else {
                        var val = '格式有误';
                    }
                    obj.element.innerHTML = val;
                },
                //渲染计划执行状态 去掉最后一位/
                renderTypeState:function(obj){
                    if(obj.value && obj.value.slice(obj.value.length-1) == '/'){
                        var val = obj.value.slice(0,obj.value.length-1);
                        obj.element.innerHTML = val;
                    }else{
                        obj.element.innerHTML = obj.value;
                    }
                },
                //调配物料  --  materialClick
                materialClick: function () {
                    var row = viewModel.objdata.getSelectedRows()[0];
                    if (row) {
                        $("#material-title").text("调配物料");
                        viewModel.material.type = 'material';
                        viewModel.material.draw = 1;
                        viewModel.event.loadmateriallist(function () {
                            viewModel.event.clearDt(viewModel.objdatanew);
                            viewModel.objdatanew.setSimpleData(viewModel.objdata.getSimpleData({
                                type: 'select'
                            }));
                            window.md = u.dialog({
                                id: 'dialog_material',
                                content: "#dialog_material",
                                hasCloseMenu: false,

                            });
                        });
                    } else {
                        $vue.$message({
                            showClose: true,
                            message: '请选择要分配的数据',
                            type: 'warning',
                            offset:'60'
                        });
                    }

                },
                // 功能列表
                loadmateriallist: function (fun) {
                    var row = viewModel.objdata.getSelectedRows()[0];
                    var jsonData = {
                        pageIndex: viewModel.material.draw - 1,
                        pageSize: viewModel.material.pageSize,
                        sortField: "",
                        search_serviceid: row.data.billid.value,
                        sortDirection: "asc",
                        search_type: viewModel.material.type
                    };
                    $.ajax({
                        type: 'get',
                        data: jsonData,
                        url: viewModel.MaterialDetailUrl,
                        success: function (res) {
                            if (res) {
                                if (res.success == 'success') {
                                    if (!res.detailMsg.data) {
                                        viewModel.material.totleCount = 0;
                                        viewModel.material.totlePage = 1;
                                        viewModel.event.comps_material.update({
                                            totalPages: viewModel.material.totlePage,
                                            pageSize: viewModel.material.pageSize,
                                            currentPage: viewModel.material.draw,
                                            totalCount: viewModel.material.totleCount
                                        });
                                        viewModel.material_data.removeAllRows();
                                        viewModel.material_data.clear();
                                    } else {
                                        viewModel.material.totleCount = res.detailMsg.data.totalElements;
                                        viewModel.material.totlePage = res.detailMsg.data.totalPages;
                                        viewModel.event.comps_material.update({
                                            totalPages: viewModel.material.totlePage,
                                            pageSize: viewModel.material.pageSize,
                                            currentPage: viewModel.material.draw,
                                            totalCount: viewModel.material.totleCount
                                        });
                                        viewModel.material_data.removeAllRows();
                                        viewModel.material_data.clear();
                                        viewModel.material_data.setSimpleData(res.detailMsg.data.content, {
                                            unSelect: true
                                        });
                                    }
                                    if (fun)
                                        fun();
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
                        }
                    })


                },
                // 分配施工
                modeClick: function () {
                    var row = viewModel.objdata.getSelectedRows()[0];
                    if (row) {
                        viewModel.event.clearDt(viewModel.modedatanew);
                        var newr = viewModel.modedatanew.createEmptyRow();
                        viewModel.modedatanew.setRowSelect(newr);
                        window.md = u.dialog({id: 'allow_mode', content: "#dialog_mode", hasCloseMenu: false});
                    } else {
                        $vue.$message({
                            showClose: true,
                            message: '请选择要分配的数据',
                            type: 'warning',
                            offset:'60'
                        });
                    }
                },
                confirm_mode: function () {
                    //
                    // viewModel.event.loadList();
                    viewModel.event.allow_cancle();
                },
                allow_cancle: function () {
                    md.close();
                },

                // 计划拟定  --
                planClick: function () {
                    var row = viewModel.objdata.getSelectedRows()[0];
                    if (row) {
                        viewModel.event.clearDt(viewModel.plandatanew);
                        var newr = viewModel.plandatanew.createEmptyRow();
                        newr.setValue('startDate', row.getValue('startdate'));
                        // newr.setValue('plannedDate',row.getValue('planneddate'));
                        viewModel.plandatanew.setRowSelect(newr);
                        window.md = u.dialog({id: 'allow_plan', content: "#dialog_plan", hasCloseMenu: false});
                    } else {
                        $vue.$message({
                            showClose: true,
                            message: '请选择要分配的数据',
                            type: 'warning',
                            offset:'60'
                        });
                    }
                },
                confirm_plan: function () {
                    var row = viewModel.objdata.getSelectedRows()[0];
                    var row_plan = viewModel.plandatanew.getSelectedRows()[0];
                    var billid = row.getValue('billid');
                    var startDate = row_plan.getValue('startDate');
                    var plannedDate = row_plan.getValue('plannedDate');
                    $.ajax({
                        type: "post",
                        url: viewModel.planSaveUrl,
                        data: {
                            billid: billid,
                            startDate: startDate,
                            plannedDate: plannedDate,
                        },
                        success: function (res) {
                            viewModel.event.loadList();
                            viewModel.event.allow_cancle();
                        }
                    });
                },
                confirm_allot: function () {
                    var selectedrow = viewModel.objdatanew.getSelectedRows()[0].getSimpleData();
                    var data = {
                        id_billmaterialallotb: [],
                        serviceid: '',
                        servicecode: ''
                    };
                    var rows = viewModel.material_data.getSimpleData();
                    var rows_new = rows.map(function (row) {
                        row.materialallotbid = row.billbid;
                        row.materialname = row.material;
                        row.allotnum = row.allotnum;
                        row.orderid = row.billid;
                        row.ordercode = row.vbillcode;
                        var str = "materialid,materialname,materialallotbid,allotnum,orderid,ordercode,memo";
                        for (var key in row) {
                            if (str.indexOf(key) == -1 || key == 'num' || key == 'material') {
                                delete row[key];
                            }
                        }
                        return row;
                    });
                    data.id_billmaterialallotb = rows_new;
                    data.serviceid = selectedrow.billid;
                    data.servicecode = selectedrow.vbillcode;
                    if (selectedrow) {
                        var list = viewModel.event.genDataList(data);
                        console.log(list)
                        $.ajax({
                            type: 'post',
                            url: viewModel.MaterialserviceUrl,
                            dataType: 'json',
                            contentType: "application/json",
                            data: JSON.stringify(list),
                            success: function () {
                                viewModel.event.loadList();
                                viewModel.event.allow_cancle();
                            }
                        });
                    } else {
                        $vue.$message({
                            showClose: true,
                            message: '请至少选择一个',
                            type: 'warning',
                            offset:'60'
                        });
                    }
                },
                //缓存筛选，分页数据
                saveSearchObj:function (filename,newValue) {
                    var obj = sessionStorage['searchObj'];
                    if(obj){
                        obj = JSON.parse(obj);
                    }else{
                        obj = {};
                    }
                    obj[filename] = newValue;
                    obj.type = 'projecting';
                    sessionStorage['searchObj'] = JSON.stringify(obj);
                }

            },
        };

        $(element).html(template);
        viewModel.event.pageInt();
        viewModel.event.orgOrAgentList();

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


    };

    return {
        // 'model': viewModel,
        'template': template,
        'init': init
    };
});
