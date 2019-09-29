define(['text!pages/project/project.html', 'css!pages/project/project', 'pages/project/projectmeta', 'pages/worker/workermeta', 'uuigrid'], function (template) {

    //初始化方法,页面加载后被 调用
    var init = function (element) {
        var viewModel = {
            app: {},
            /* 数据模型 */
            draw: 1,
            totlePage: 0,
            pageSize: 15,
            totleCount: 0,

            // 工程
            listUrl: ctx + '/servicelist/page.do',
            serviceStates: ctx + '/servicelist/states.do',
            addUrl: ctx + '',
            delUrl: ctx + '',
            objdata: new u.DataTable(projectmeta),
            objdatanew: new u.DataTable(projectmeta),

            searchdatanew: new u.DataTable(projectsearchmeta),

            // 运营中心，运营商列表
            orgOrAgentListUrl:ctx + "/org/agent.do",

            // 获取客服，勘察，管家
            allotlistUrl: ctx + '/user/queryUserForAllot.do',
            // 工人列表
            allotlistUrl_: ctx + '/construction/pagefilter.do',
            //物料明细
            MaterialDetailUrl: ctx + '/servicelist/material.do',

            //分配  -- user 客服,  survey 勘察, construction  工长,  supervisor 管家
            allotCustserviceUrl: ctx + '/servicelist/allot.do',
            //调配物料
            MaterialserviceUrl: ctx + '/mallot/save.do',
            //
            allotdata: new u.DataTable(),
            //分配construction数据
            allotdata_: new u.DataTable(workermeta),
            //material数据
            allotdata_material: new u.DataTable(metamaterial),

            //分配管家/工队的数据
            allotObj:{},

            allot: {
                // user 客服,  survey 勘察 , construction  工长,  supervisor 管家
                type: '',
                /* user数据模型 */
                draw: 1,
                totlePage: 0,
                pageSize: 5,
                totleCount: 0,
                /* construction数据模型 */
                construction: {
                    draw: 1,
                    totlePage: 0,
                    pageSize: 5,
                    totleCount: 0,
                },
                /* material数据模型 */
                material: {
                    draw: 1,
                    totlePage: 0,
                    pageSize: 5,
                    totleCount: 0,
                }
            },

            // 筛选列表
            orgnameList: [{
                name: "全部运营中心",
                value: "-1"
            }],
            agentnameList: [{
                name: "全部运营商",
                value: "-1"
            }],
            agentnameList_temp:[
                {name: "全部运营商", value: "-1"}
            ],
            //施工状态
            projectList: [{
                name: '所有待开工',
                value: '0'
            }, {
                name: '不需要上门',
                value: '-2'
            }, {
                name: '上门未成交',
                value: '-3'
            }],
            // 客服
            userstateList: [{
                name: "所有客服",
                value: "-1"
            }, {
                name: "未分配",
                value: "0"
            }, {
                name: "已分配",
                value: "1"
            }],
            // 勘察
            surveystateList: [{
                name: "所有勘察",
                value: "-1"
            }, {
                name: "未分配",
                value: "0"
            }, {
                name: "待接受",
                value: "1"
            }, {
                name: "已接受",
                value: "2"
            }, {
                name: "已拒绝",
                value: "3"
            }],
            // 工人
            constructionstateList: [{
                name: "所有工长",
                value: "-1"
            }, {
                name: "未分配",
                value: "0"
            }, {
                name: "待接受",
                value: "1"
            }, {
                name: "已接受",
                value: "2"
            }, {
                name: "已拒绝",
                value: "3"
            }],
            // 管家
            supervisorstateList: [{
                name: "所有管家",
                value: "-1"
            }, {
                name: "未分配",
                value: "0"
            }, {
                name: "待接受",
                value: "1"
            }, {
                name: "已接受",
                value: "2"
            }, {
                name: "已拒绝",
                value: "3"
            }],

            event: {
                pageInt: function () {
                    id:[];
                    viewModel.app = u.createApp({
                        el: element,
                        model: viewModel
                    });
                    //隐藏
                    $(element).find('#returnBtn').hide();
                    //分页初始化
                    // this.comps=new u.pagination({el:$('#pagination'),jumppage:true});
                    // this.comps=new u.pagination({el:$('#pagination_allot'),jumppage:true});
                    var paginationDiv = $(element).find('#pagination')[0];
                    this.comps = new u.pagination({
                        el: paginationDiv,
                        jumppage: true
                    });
                    var paginationDiv_custserver = $(element).find('#pagination_allot')[0];
                    this.comps_allot = new u.pagination({
                        el: paginationDiv_custserver,
                        jumppage: true
                    });
                    var paginationDiv_construction = $(element).find('#pagination_allot_')[0];
                    this.comps_allot_ = new u.pagination({
                        el: paginationDiv_construction,
                        jumppage: true
                    });
                    var paginationDiv_material = $(element).find('#pagination_material')[0];
                    this.comps_allot_material = new u.pagination({
                        el: paginationDiv_material,
                        jumppage: true
                    });
                    // this.comps.update({pageSize: 10 });  //默认每页显示5条数据

                    viewModel.event.pageChange();
                    viewModel.event.sizeChange();

                    //回车搜索
                    $('.input_enter').keydown(function (e) {
                        if (e.keyCode == 13) {
                            viewModel.event.searchClick();
                            u.stopEvent(e);
                        }
                    });
                    //回车搜索
                    $('.input_allot_enter').keydown(function (e) {
                        if (e.keyCode == 13) {
                            viewModel.event.loadcustserverlist();
                            u.stopEvent(e);
                        }
                    });

                    // 初始化筛选
                    viewModel.event.clearDt(viewModel.searchdatanew);
                    viewModel.searchdatanew.clear();
                    var newr = viewModel.searchdatanew.createEmptyRow();
                    viewModel.searchdatanew.setRowSelect(newr);

                    // this.loadList();

                    //是否显示重新分配
                    var hash = window.location.hash;
                    if(hash){
                        if(hash.indexOf('role=admin') != -1){ //系统/平台管理员
                            $('#reAllot_construction').show();
                            $('#reAllot_supervisor').show();
                            $('#allow_construction').hide();
                            $('#allow_supervisor').hide();
                        }
                    }
                },
                //反显筛选条件
                setSearchValue:function(){
                    var obj = sessionStorage['searchObj'];
                    if (obj) {
                        var searchObj = JSON.parse(obj);
                        if (searchObj.type == 'project') {
                            var obj_new = viewModel.searchdatanew.getSelectedRows()[0];
                            for (var key in searchObj) {
                                if(key == 'pageIndex' && searchObj[key]){
                                    viewModel.draw = searchObj[key];
                                }else if(key == 'pageSize'&& searchObj[key]){
                                    viewModel.pageSize = searchObj[key];
                                }else if (key != 'type') {
                                    obj_new.setValue(key, searchObj[key]);
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
                    viewModel.event.loadList();
                },
                resetfilterclick: function (bool) {
                    var data = viewModel.searchdatanew.getSelectedRows()[0];
                    if (!data)
                        return;
                    if (bool) {
                        data.setValue('orgname', "");
                        data.setValue('agentname', "");
                        data.setValue('servicestate', '');
                        data.setValue('userstate', "");
                        data.setValue('surveystate', "");
                        data.setValue('constructionstate', "");
                        data.setValue('supervisorstate', "");
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
                        var servicestate = data.getValue('servicestate');
                        var userstate = data.getValue('userstate');
                        var surveystate = data.getValue('surveystate');
                        var constructionstate = data.getValue('constructionstate');
                        var supervisorstate = data.getValue('supervisorstate');

                        var startTime1 = data.getValue('startTime1');
                        var endTime1 = data.getValue('endTime1');
                        var startTime2 = data.getValue('startTime2');
                        var endTime2 = data.getValue('endTime2');
                        var startTime3 = data.getValue('startTime3');
                        var endTime3 = data.getValue('endTime3');

                        var obj = {};
                        obj.search_orgname = orgname;
                        obj.search_agentname = agentname;
                        if (servicestate == '' || servicestate == null || servicestate == undefined) servicestate = 0;
                        obj.search_servicestate = servicestate;
                        obj.search_userstate = userstate;
                        obj.search_surveystate = surveystate;
                        obj.search_constructionstate = constructionstate;
                        obj.search_supervisorstate = supervisorstate;

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
                    viewModel.event.comps_allot.on('pageChange', function (pageIndex) {
                        viewModel.allot.draw = pageIndex + 1;
                        viewModel.event.loadcustserverlist();
                    });
                    viewModel.event.comps_allot_.on('pageChange', function (pageIndex) {
                        viewModel.allot.construction.draw = pageIndex + 1;
                        viewModel.event.loadcustserverlist();
                    });
                    viewModel.event.comps_allot_material.on('pageChange', function (pageIndex) {
                        viewModel.allot.material.draw = pageIndex + 1;
                        viewModel.event.loadcustserverlist();
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
                    viewModel.event.comps_allot.on('sizeChange', function (arg) {
                        viewModel.allot.pageSize = parseInt(arg);
                        viewModel.allot.draw = 1;
                        viewModel.event.loadcustserverlist();
                    });
                    viewModel.event.comps_allot_.on('sizeChange', function (arg) {
                        viewModel.allot.construction.pageSize = parseInt(arg);
                        viewModel.allot.construction.draw = 1;
                        viewModel.event.loadcustserverlist();
                    });
                    viewModel.event.comps_allot_material.on('sizeChange', function (arg) {
                        viewModel.allot.material.pageSize = parseInt(arg);
                        viewModel.allot.material.draw = 1;
                        viewModel.event.loadcustserverlist();
                    });
                },
                //加载 工程列表
                loadList: function (obj, filter) {
                    var jsonData = {
                        pageIndex: viewModel.draw - 1,
                        pageSize: viewModel.pageSize,
                        sortField: "",
                        sortDirection: "asc",
                        search_servicestate: 0
                    };
                    // 搜索
                    $(element).find("#search").each(function () {
                        if (this.value == undefined || this.value == '' || this.value.length == 0) {
                            //不执行操作
                        } else {
                            jsonData['search_searchParam'] = this.value.replace(/(^\s*)|(\s*$)/g, "");
                            //去掉空格
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
                    //重新分配页面(查询除已完工的工程)
                    var hash = window.location.hash;
                    if(hash){
                        if(hash.indexOf('role=admin') != -1){ //系统/平台管理员
                            jsonData['search_stage'] = 9 ;
                        }
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
                                        viewModel.objdata.setSimpleData(res.detailMsg.data.content, {
                                            unSelect: true
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
                //渲染工程状态
                renderConstructionStatus: function (obj) {
                    var val = '';
                    if (obj.value == 0 || obj.value == null || obj.value == '') {
                        val = '待开工';
                    } else if (obj.value == -2) {
                        val = '不需要上门';
                    } else if (obj.value == -3) {
                        val = '上门未成交';
                    } else if(obj.value==1){
                        val = '施工中'
                    } else if(obj.value==2){
                        val = '已完工';
                    }
                    obj.element.innerHTML = val;
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
                //渲染支付状态
                renderPayState: function (obj) {
                    if (obj.value == 0) {
                        var val = '未支付';
                    } else if (obj.value == 1) {
                        var val = '已支付定金';
                    } else if (obj.value == 2) {
                        var val = '全额已支付';
                    };
                    obj.element.innerHTML = val;
                },
                //渲染工队
                renderConstructionstate: function (obj) {
                    var row = obj.row.value;
                    var constructionstate = row.constructionstate;
                    if (constructionstate == 0 || constructionstate == null) { //未分配
                        obj.element.innerHTML = obj.value;
                    } else if (constructionstate == 1) { //待接单
                        obj.element.innerHTML = `<span class="u-tag u-tag-primary" title="待接单">${obj.value}</span>`;
                    } else if (constructionstate == 2) { //已接单
                        obj.element.innerHTML = `<span class="u-tag u-tag-success" title="已接单">${obj.value}</span>`;
                    } else if (constructionstate == 3) { //拒绝
                        obj.element.innerHTML = `<span class="u-tag u-tag-danger" title="拒绝">${obj.value}</span>`;
                    }
                },
                //渲染管家
                renderSupervisorstate: function (obj) {
                    var row = obj.row.value;
                    var supervisorstate = row.supervisorstate;
                    if (supervisorstate == 0 || supervisorstate == null) { //未分配
                        obj.element.innerHTML = obj.value;
                    } else if (supervisorstate == 1) { //待接单
                        obj.element.innerHTML = `<span class="u-tag u-tag-primary" title="待接单">${obj.value}</span>`;
                    } else if (supervisorstate == 2) { //已接单
                        obj.element.innerHTML = `<span class="u-tag u-tag-success" title="已接单">${obj.value}</span>`;
                    } else if (supervisorstate == 3) { //拒绝
                        obj.element.innerHTML = `<span class="u-tag u-tag-danger" title="拒绝">${obj.value}</span>`;
                    }
                },
                //渲染客服
                renderServerstate: function (obj) {
                    var row = obj.row.value;
                    var serverstate = row.serverstate;
                    if (serverstate == 3) {
                        obj.element.innerHTML = obj.value + "&nbsp;<i class='fas fa-exclamation-circle red' title='拒绝'></i>";
                    } else {
                        obj.element.innerHTML = obj.value;
                    }
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
                /*渲染勘察*/
                /*renderSurveystate : function(obj) {
                    var row=obj.row.value;
                    var surveystate=row.surveystate;
                    if (surveystate==3){
                        obj.element.innerHTML =obj.value+"&nbsp;<i class='fas fa-exclamation-circle red' title='拒绝'></i>";
                    }else{
                        obj.element.innerHTML =obj.value;
                    }
                },*/
                //渲染性别
                renderSex: function (obj) {
                    if (obj.value == 1) {
                        var val = '男';
                    } else if (obj.value == 2) {
                        var val = '女';
                    } else {
                        var val = '未知';
                    };
                    obj.element.innerHTML = val;
                },
                // 分配客服  user 客服,  survey 勘察 , construction  工长,  supervisor 管家
                userClick: function () {
                    $('#search_allot').val("");
                    var row = viewModel.objdata.getSelectedRows()[0];
                    if (row) {
                        $("#allow-title").text("分配客服");
                        viewModel.allot.type = 'user';
                        viewModel.allot.draw = 1;
                        viewModel.event.loadcustserverlist(function () {
                            viewModel.event.clearDt(viewModel.objdatanew);
                            viewModel.objdatanew.setSimpleData(viewModel.objdata.getSimpleData({
                                type: 'select'
                            }));
                            window.md = u.dialog({
                                id: 'allow_user',
                                content: "#dialog_custserver",
                                hasCloseMenu: false
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
                //分配勘察  --  surveyClick
                surveyClick: function () {
                    $('#search_allot').val("");
                    var row = viewModel.objdata.getSelectedRows()[0];
                    if (row) {
                        $("#allow-title").text("分配勘察");
                        viewModel.allot.type = 'survey';
                        viewModel.allot.draw = 1;
                        viewModel.event.loadcustserverlist(function () {

                            viewModel.event.clearDt(viewModel.objdatanew);
                            viewModel.objdatanew.setSimpleData(viewModel.objdata.getSimpleData({
                                type: 'select'
                            }));
                            window.md = u.dialog({
                                id: 'allow_survey',
                                content: "#dialog_custserver",
                                hasCloseMenu: false
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
                //分配施工  --  constructionClick
                constructionClick: function () {
                    $('#search_allot_').val("");
                    var row = viewModel.objdata.getSelectedRows()[0];
                    if (row) {
                        $("#allow-title_").text("分配施工");
                        viewModel.allot.type = 'construction';
                        viewModel.allot.construction.draw = 1;
                        viewModel.event.loadcustserverlist(function () {
                            viewModel.event.clearDt(viewModel.objdatanew);
                            viewModel.objdatanew.setSimpleData(viewModel.objdata.getSimpleData({
                                type: 'select'
                            }));
                            window.md = u.dialog({
                                id: 'allow_construction',
                                content: "#dialog_custserver_",
                                hasCloseMenu: false
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
                //分配管家  --  supervisorClick
                supervisorClick: function () {
                    $('#search_allot').val("");
                    var row = viewModel.objdata.getSelectedRows()[0];
                    if (row) {
                        $("#allow-title").text("分配管家");
                        viewModel.allot.type = 'supervisor';
                        viewModel.allot.draw = 1;
                        viewModel.event.loadcustserverlist(function () {
                            viewModel.event.clearDt(viewModel.objdatanew);
                            viewModel.objdatanew.setSimpleData(viewModel.objdata.getSimpleData({
                                type: 'select'
                            }));
                            window.md = u.dialog({
                                id: 'allow_supervisor',
                                content: "#dialog_custserver",
                                hasCloseMenu: false
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
                //调配物料  --  materialClick
                materialClick: function () {
                    var row = viewModel.objdata.getSelectedRows()[0];
                    if (row) {
                        $("#material-title").text("调配物料");
                        viewModel.allot.type = 'material';
                        viewModel.allot.draw = 1;
                        viewModel.event.loadcustserverlist(function () {
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
                // 搜索
                allotsearchClick: function () {
                    viewModel.allot.draw = 1;
                    viewModel.event.loadcustserverlist();
                },
                // 功能列表
                loadcustserverlist: function (fun) {
                    var row = viewModel.objdata.getSelectedRows()[0];
                    if (viewModel.allot.type == 'material') {
                        var jsonData = {
                            pageIndex: viewModel.allot.material.draw - 1,
                            pageSize: viewModel.allot.material.pageSize,
                            sortField: "",
                            search_serviceid: row.data.billid.value,
                            sortDirection: "asc",
                            type: viewModel.allot.type,
                            search_type: viewModel.allot.type
                        };
                    } else if (viewModel.allot.type == 'construction') {
                        var jsonData = {
                            pageIndex: viewModel.allot.construction.draw - 1,
                            pageSize: viewModel.allot.construction.pageSize,
                            sortField: "",
                            sortDirection: "asc",
                            type: viewModel.allot.type
                        };
                        // 搜索
                        $('html').find("#search_allot_").each(function () {
                            if (this.value == undefined || this.value == '' || this.value.length == 0) {
                                //不执行操作
                            } else {
                                jsonData['search_searchParam'] = this.value.replace(/(^\s*)|(\s*$)/g, "");
                                //去掉空格
                            }
                        });
                    } else {
                        var jsonData = {
                            pageIndex: viewModel.allot.draw - 1,
                            pageSize: viewModel.allot.pageSize,
                            sortField: "",
                            sortDirection: "asc",
                            type: viewModel.allot.type
                        };
                        $('html').find("#search_allot").each(function () {
                            if (this.value == undefined || this.value == '' || this.value.length == 0) {
                                //不执行操作
                            } else {
                                jsonData['search_searchParam'] = this.value.replace(/(^\s*)|(\s*$)/g, "");
                                //去掉空格
                            }
                        });
                    }
                    ;
                    if (viewModel.allot.type == 'material') {
                        $.ajax({
                            type: 'get',
                            data: jsonData,
                            url: viewModel.MaterialDetailUrl,
                            success: function (res) {
                                if (res) {
                                    if (res.success == 'success') {
                                        if (!res.detailMsg.data) {
                                            viewModel.allot.totleCount = 0;
                                            viewModel.allot.totlePage = 1;
                                            viewModel.event.comps_allot_material.update({
                                                totalPages: viewModel.allot.material.totlePage,
                                                pageSize: viewModel.allot.material.pageSize,
                                                currentPage: viewModel.allot.material.draw,
                                                totalCount: viewModel.allot.material.totleCount
                                            });
                                            viewModel.allotdata_material.removeAllRows();
                                            viewModel.allotdata_material.clear();
                                        } else {
                                            viewModel.allot.material.totleCount = res.detailMsg.data.totalElements;
                                            viewModel.allot.material.totlePage = res.detailMsg.data.totalPages;
                                            viewModel.event.comps_allot_material.update({
                                                totalPages: viewModel.allot.material.totlePage,
                                                pageSize: viewModel.allot.material.pageSize,
                                                currentPage: viewModel.allot.material.draw,
                                                totalCount: viewModel.allot.material.totleCount
                                            });
                                            viewModel.allotdata_material.removeAllRows();
                                            viewModel.allotdata_material.clear();
                                            viewModel.allotdata_material.setSimpleData(res.detailMsg.data.content, {
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
                    } else if (viewModel.allot.type == 'construction') {
                        $.ajax({
                            type: 'get',
                            data: jsonData,
                            url: viewModel.allotlistUrl_,
                            success: function (res) {
                                if (res) {
                                    if (res.success == 'success') {
                                        if (!res.detailMsg.data) {
                                            viewModel.allot.totleCount = 0;
                                            viewModel.allot.totlePage = 1;
                                            viewModel.event.comps_allot_.update({
                                                totalPages: viewModel.allot.construction.totlePage,
                                                pageSize: viewModel.allot.construction.pageSize,
                                                currentPage: viewModel.allot.construction.draw,
                                                totalCount: viewModel.allot.construction.totleCount
                                            });
                                            viewModel.allotdata_.removeAllRows();
                                            viewModel.allotdata_.clear();
                                        } else {
                                            viewModel.allot.construction.totleCount = res.detailMsg.data.totalElements;
                                            viewModel.allot.construction.totlePage = res.detailMsg.data.totalPages;
                                            viewModel.event.comps_allot_.update({
                                                totalPages: viewModel.allot.construction.totlePage,
                                                pageSize: viewModel.allot.construction.pageSize,
                                                currentPage: viewModel.allot.construction.draw,
                                                totalCount: viewModel.allot.construction.totleCount
                                            });
                                            viewModel.allotdata_.removeAllRows();
                                            viewModel.allotdata_.clear();
                                            viewModel.allotdata_.setSimpleData(res.detailMsg.data.content, {
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
                    } else {
                        $.ajax({
                            type: 'get',
                            data: jsonData,
                            url: viewModel.allotlistUrl,
                            success: function (res) {
                                if (res) {
                                    if (res.success == 'success') {
                                        if (!res.detailMsg.data) {
                                            viewModel.allot.totleCount = 0;
                                            viewModel.allot.totlePage = 1;
                                            viewModel.event.comps_allot.update({
                                                totalPages: viewModel.allot.totlePage,
                                                pageSize: viewModel.allot.pageSize,
                                                currentPage: viewModel.allot.draw,
                                                totalCount: viewModel.allot.totleCount
                                            });
                                            viewModel.allotdata.removeAllRows();
                                            viewModel.allotdata.clear();
                                        } else {
                                            viewModel.allot.totleCount = res.detailMsg.data.totalElements;
                                            viewModel.allot.totlePage = res.detailMsg.data.totalPages;
                                            viewModel.event.comps_allot.update({
                                                totalPages: viewModel.allot.totlePage,
                                                pageSize: viewModel.allot.pageSize,
                                                currentPage: viewModel.allot.draw,
                                                totalCount: viewModel.allot.totleCount
                                            });
                                            viewModel.allotdata.removeAllRows();
                                            viewModel.allotdata.clear();
                                            viewModel.allotdata.setSimpleData(res.detailMsg.data.content, {
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
                    }
                    ;

                },
                //确认分配
                confirm_allot: function () {
                    var type = viewModel.allot.type;
                    var selectedrow = viewModel.objdatanew.getSelectedRows()[0].getSimpleData();
                    var data = {
                        id_billmaterialallotb: [],
                        serviceid: '',
                        servicecode: ''
                    };
                    if (type == 'construction') {
                        data = viewModel.allotdata_.getSelectedRows()[0].getSimpleData();
                    }else if (type == 'material') {
                        var rows = viewModel.allotdata_material.getSimpleData();
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
                    } else {
                        data = viewModel.allotdata.getSelectedRows()[0].getSimpleData();
                    }
                    debugger
                    if (selectedrow) {
                        if (type == 'material') {
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
                                    viewModel.event.cancel_allot();
                                }
                            });
                        } else {
                            var obj = {
                                userid: data.id,
                                type: type,
                                billid: selectedrow.billid
                            }
                            // user 客服,  survey 勘察, construction  工长,  supervisor 管家
                            var objdataData = viewModel.objdata.getSelectedRows()[0].getSimpleData();
                            if((type=='supervisor' && objdataData.supervisorstate != 0)||(type=='construction' && objdataData.constructionstate != 0)){
                                viewModel.event.cancel_allot();
                                viewModel.allotObj = obj;
                                $("#allot_reason").val('');
                                window.md = u.dialog({id:'confirm_select_material',content:"#dialog_reason",hasCloseMenu:false});
                            }else{
                                viewModel.event.allotFunction(obj);
                            }
                        }
                    } else {
                        $vue.$message({
                            showClose: true,
                            message: '请至少选择一个',
                            type: 'warning'
                        });
                    }
                },
                allotFunction:function(obj){
                    $.ajax({
                        type: 'post',
                        url: viewModel.allotCustserviceUrl,
                        data: obj,
                        success: function () {
                            viewModel.event.loadList();
                            viewModel.event.cancel_allot();
                            var msgContent = '保存成功！';
                            $vue.$message({
                                showClose: true,
                                message: msgContent,
                                type: 'success',
                                offset: '60'
                            });
                        }
                    });
                },
                cancel_allot: function () {
                    md.close();
                },
                //权限分配
                operaClick: function (e) {
                    var data_ = viewModel.objdata.getSelectedRows()[0].getSimpleData();
                    var data = null;
                    // 分配客服
                    $.ajax({
                        type: 'get',
                        data: {billid: data_.billid},
                        async: false,
                        url: viewModel.serviceStates,
                        success: function (res) {
                            if (res.success == 'success') {
                                data = res.detailMsg.data;
                                //反显
                                var row_temp = viewModel.objdata.getSelectedRows()[0];
                                if (row_temp) {
                                    row_temp.setValue("totalamount", data.totalamount);
                                    row_temp.setValue("constructionstate", data.constructionstate);
                                    row_temp.setValue("paystate", data.paystate);
                                    row_temp.setValue("serverstate", data.serverstate);
                                    row_temp.setValue("supervisorstate", data.supervisorstate);
                                    row_temp.setValue("surveystate", data.surveystate);

                                    if (data.surveyname) {
                                        row_temp.setValue("surveyname", data.surveyname);
                                    }
                                    if (data.constructionname) {
                                        row_temp.setValue("constructionname", data.constructionname);
                                    }
                                    if (data.supervisor) {
                                        row_temp.setValue("supervisor", data.supervisor);
                                    }
                                    if (data.materialstate) {
                                        row_temp.setValue("materialstate", data.materialstate);
                                    }
                                }

                            } else {
                                data = data_;
                            }
                        },
                        error: function () {
                            data = data_;
                        }

                    });
                    if (data.serverstate == 0 || data.serverstate == null) {
                        $("#allow_user").addClass('bg_blue').removeClass('bg_gray bg_green c_nopointer').parent().removeClass('c_no_drop');
                        $("#allow_user_state").parent().attr('title', '未分配');
                    } else if (data.serverstate == 1)
                    // {
                    // $("#allow_user").addClass('bg_gray c_nopointer').removeClass('bg_blue bg_green').parent().addClass('c_no_drop');
                    // $("#allow_user_state").parent().attr('title', '待接受');
                    // } else if (data.serverstate == 2)
                    {
                        $("#allow_user").addClass('bg_green c_nopointer').removeClass('bg_blue bg_gray').parent().addClass('c_no_drop');
                        $("#allow_user_state").parent().attr('title', '已分配');
                    }
                    // 分配勘察
                    if (data.surveystate == 0 || data.surveystate == 3 || data.serverstate == null) {
                        $("#allow_survey").addClass('bg_blue').removeClass('bg_gray bg_green c_nopointer').parent().removeClass('c_no_drop');
                        $("#allow_survey_state").parent().attr('title', '待分配');
                    } else if (data.surveystate == 1) {
                        $("#allow_survey").addClass('bg_gray c_nopointer').removeClass('bg_blue bg_green').parent().addClass('c_no_drop');
                        $("#allow_survey_state").parent().attr('title', '待接受');

                    } else if (data.surveystate == 2) {
                        $("#allow_survey").addClass('bg_green c_nopointer').removeClass('bg_blue bg_gray').parent().addClass('c_no_drop');
                        $("#allow_survey_state").parent().attr('title', '已接受');
                    }
                    // 分配施工
                    if (data.totalamount) {
                        if (data.paystate == null || data.paystate == 0) {
                            $("#allow_construction").addClass('bg_gray c_nopointer').removeClass('bg_blue bg_green').parent().addClass('c_no_drop');
                            $("#allow_construction_state").parent().attr('title', '未付款');
                        } else {
                            if (data.constructionstate == 0 || data.constructionstate == 3 || data.constructionstate == null) {
                                $("#allow_construction").addClass('bg_blue').removeClass('bg_gray bg_green c_nopointer').parent().removeClass('c_no_drop');
                                $("#allow_construction_state").parent().attr('title', '待分配');
                            } else if (data.constructionstate == 1) {
                                $("#allow_construction").addClass('bg_gray c_nopointer').removeClass('bg_blue bg_green').parent().addClass('c_no_drop');
                                $("#allow_construction_state").parent().attr('title', '待接受');
                            } else if (data.constructionstate == 2) {
                                $("#allow_construction").addClass('bg_green c_nopointer').removeClass('bg_blue bg_gray').parent().addClass('c_no_drop');
                                $("#allow_construction_state").parent().attr('title', '已接受');
                            }
                        }
                    } else {
                        $("#allow_construction").addClass('bg_gray c_nopointer').removeClass('bg_blue bg_green').parent().addClass('c_no_drop');
                        $("#allow_construction_state").parent().attr('title', '未下单');
                    }
                    // 分配管家
                    if (data.supervisorstate == 0 || data.supervisorstate == 3 || data.supervisorstate == null) {
                        $("#allow_supervisor").addClass('bg_blue').removeClass('bg_gray bg_green c_nopointer').parent().removeClass('c_no_drop');
                        $("#allow_supervisor_state").parent().attr('title', '待分配');
                    } else if (data.supervisorstate == 1) {
                        $("#allow_supervisor").addClass('bg_gray c_nopointer').removeClass('bg_blue bg_green').parent().addClass('c_no_drop');
                        $("#allow_supervisor_state").parent().attr('title', '待接受');
                    } else if (data.supervisorstate == 2) {
                        $("#allow_supervisor").addClass('bg_green c_nopointer').removeClass('bg_blue bg_gray').parent().addClass('c_no_drop');
                        $("#allow_supervisor_state").parent().attr('title', '已接受');
                    }
                    // 调配物料
                    /*if (data.totalamount) {
                        if (data.materialstate == 0 || data.materialstate == 3 || data.materialstate == null || 1 == 1) {
                            $("#allow_goods").addClass('bg_blue').removeClass('bg_gray bg_green c_nopointer').parent().removeClass('c_no_drop');
                            if (data.materialstate == 1)
                                $("#allow_goods_state").parent().attr('title', '已调配');
                            else
                                $("#allow_goods_state").parent().attr('title', '待调配');
                        } else if (data.materialstate == 1) {
                            $("#allow_goods").addClass('bg_green c_nopointer').removeClass('bg_blue bg_gray').parent().addClass('c_no_drop');
                            $("#allow_goods_state").parent().attr('title', '已调配');
                        }
                    } else {
                        $("#allow_goods").addClass('bg_gray c_nopointer').removeClass('bg_blue bg_green').parent().addClass('c_no_drop');
                        $("#allow_goods_state").parent().attr('title', '未下单');
                    }*/
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
                    obj.type = 'project';
                    sessionStorage['searchObj'] = JSON.stringify(obj);
                },

                //重新分配原因 -- 确定
                confirm_reason:function () {
                    var obj = viewModel.allotObj;
                    obj.reason = $("#allot_reason").val()||'';
                    if(!obj.reason){
                        $("#allot_reason").focus();
                        return;
                    }
                    viewModel.event.allotFunction(obj);
                },
                cancel_reason:function () {
                    md.close();
                },
            }
        };

        $(element).html(template);
        viewModel.event.pageInt();
        viewModel.event.loadcustserverlist();
        viewModel.event.orgOrAgentList();

        // 筛选条件
        viewModel.searchdatanew.on('valueChange', function (event) {
            let filename = event.field;
            // 改变的字段
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
