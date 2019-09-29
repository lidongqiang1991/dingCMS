define(['text!pages/financialAudit/financialAudit.html', 'css!pages/financialAudit/financialAudit', 'pages/financialAudit/financialAuditmeta', 'uuigrid'], function (template) {

    //初始化方法,页面加载后被 调用
    var init = function (element) {

        var viewModel = {
            app: {},
            /* 数据模型 */
            draw: 1,
            totlePage: 0,
            pageSize: 15,
            totleCount: 0,

            objListUrl: ctx + '/payment/page.do',
            objAddUrl: ctx + '/payment/audit.do',
            objDelUrl: ctx + '',
            resetSerialUrl: ctx + '/payment/changestate.do',

            objdata: new u.DataTable(financialAuditmeta),
            objdatanew: new u.DataTable(financialAuditmeta),
            // 筛选 数据
            searchdatanew: new u.DataTable(financialAuditmeta),
            typeList: [{
                name: "全部类型",
                value: "-1"
            }, {
                name: "支付",
                value: "0"
            }, {
                name: "优惠",
                value: "1"
            }, {
                name: "退款",
                value: "2"
            }, {
                name: "支付转移",
                value: "3"
            }],
            statusList: [{
                name: "全部状态",
                value: "-1"
            }, {
                name: "未审核",
                value: "0"
            }, {
                name: "审核已通过",
                value: "1"
            }, {
                name: "审核未通过",
                value: "2"
            }],
            timeList: [{
                name: "所有时间",
                value: "-1"
            }, {
                name: "近7天",
                value: "0"
            }, {
                name: "近30天",
                value: "1"
            }, {
                name: "上个月",
                value: "2"
            }, {
                name: "自定义",
                value: "3"
            }],
            event: {
                //页面初始化
                pageInit: function () {
                    $(element).find('#returnBtn').hide();
                    $(element).find('#time').show();
                    $(element).find('#starttime').hide();
                    $(element).find('#endtime').hide();
                    id = [];
                    viewModel.app = u.createApp({
                        el: element/* Document.body */,
                        model: viewModel,
                    });

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
                    this.loadList();
                    viewModel.event.pageChange();
                    viewModel.event.sizeChange();

                    //回车搜索
                    $('.input_enter').keydown(function (e) {
                        if (e.keyCode == 13) {
                            viewModel.event.searchClick();
                            u.stopEvent(e);
                        }
                    });

                    // 初始化搜索数据
                    viewModel.event.clearDt(viewModel.searchdatanew);
                    var newr = viewModel.searchdatanew.createEmptyRow();
                    viewModel.searchdatanew.setRowSelect(newr);
                },
                //组装list
                genDataList: function (data) {
                    var datalist = [];
                    datalist.push(data);
                    return datalist;
                },
                //清除datatable数据
                clearDt: function (dt) {
                    dt.removeAllRows();
                    dt.clear();
                },
                // 筛选
                searchClick: function () {
                    $(element).find('#returnBtn').show();
                    $(element).find('#time').show();
                    //$(element).find('#starttime').hide();
                    //$(element).find('#endtime').hide();
                    viewModel.draw = 1;
                    viewModel.event.loadList();
                },
                //返回初始化点击
                returnClick: function () {
                    $(element).find('#returnBtn').hide();
                    $("#search").val('');
                    viewModel.event.loadList();
                },
                //分页相关
                pageChange: function () {
                    viewModel.event.comps.on('pageChange', function (pageIndex) {
                        viewModel.draw = pageIndex + 1;
                        viewModel.event.loadList();
                    });
                },
                sizeChange: function () {
                    viewModel.event.comps.on('sizeChange', function (arg) {
                        viewModel.pageSize = parseInt(arg);
                        viewModel.draw = 1;
                        viewModel.event.loadList();
                    });
                },
                // 加载 客户列表
                loadList: function (obj, filter) {
                    var jsonData = {
                        pageIndex: viewModel.draw - 1,
                        pageSize: viewModel.pageSize,
                        sortField: "",
                        sortDirection: "asc",
                        search_notstate: 8,
                        search_startTime: viewModel.searchdatanew.getValue("startTime"),
                        search_endTime: viewModel.searchdatanew.getValue("endTime")
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
                    $(element).find("#searchType").each(function () {
                        if (this.value == undefined || this.value == '' || this.value.length == 0) {
                            //不执行操作
                        } else {
                            if (this.value == "支付") {
                                jsonData['search_type'] = 0;
                            } else if (this.value == "优惠") {
                                jsonData['search_type'] = 1;
                            } else if (this.value == "退款") {
                                jsonData['search_type'] = 2;
                            } else if (this.value == "支付转移") {
                                jsonData['search_type'] = 3;
                            }

                        }
                    });
                    $(element).find("#searchStatus").each(function () {
                        if (this.value == undefined || this.value == '' || this.value.length == 0) {
                            //不执行操作
                        } else {
                            if (this.value == "未审核") {
                                jsonData['search_auditstate'] = 0;
                            } else if (this.value == "审核已通过") {
                                jsonData['search_auditstate'] = 1;
                            } else if (this.value == "审核未通过") {
                                jsonData['search_auditstate'] = 2;
                            }

                        }
                    });
                    $(element).find("#searchTime").each(function () {
                        if (this.value == undefined || this.value == '' || this.value.length == 0) {
                            //不执行操作
                        } else {
                            if (this.value == "近7天") {
                                jsonData['search_time'] = 0;
                            } else if (this.value == "近30天") {
                                jsonData['search_time'] = 1;
                            } else if (this.value == "上个月") {
                                jsonData['search_time'] = 2;
                            } else if (this.value == "自定义") {
                                jsonData['search_time'] = 3;
                                if (!jsonData['search_startTime']) {
                                    jsonData['search_startTime'] = new Date(0).toLocaleDateString();
                                }
                                if (!jsonData['search_endTime']) {
                                    jsonData['search_endTime'] = new Date().toLocaleDateString();
                                }
                            }
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
                    }
                    $.ajax({
                        type: 'get',
                        url: viewModel.objListUrl,
                        dataType: 'json',
                        data: jsonData,
                        contentType: 'application/json',
                        success: function (res) {
                            if (res) {
                                // 初始化搜索数据
                                // viewModel.event.clearDt(viewModel.searchdatanew);
                                // var newr = viewModel.searchdatanew.createEmptyRow();
                                // viewModel.searchdatanew.setRowSelect(newr);
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
                // 渲染类型
                renderStatus: function (obj) {
                    if (obj.value == 0) {
                        var val = '提交态';
                    } else if (obj.value == 1) {
                        var val = '审核已通过';
                    } else if (obj.value == 2) {
                        var val = '审核未通过';
                    } else if (obj.value == 8) {
                        var val = '自由态';
                    } else {
                        val = "";
                    }
                    obj.element.innerHTML = val;
                },
                renderType: function (obj) {
                    if (obj.value == 0) {
                        var val = '支付';
                    } else if (obj.value == 1) {
                        var val = '优惠';
                    } else if (obj.value == 2) {
                        var val = '退款';
                    } else if (obj.value == 3) {
                        var val = '支付转移';
                    } else {
                        var val = '格式有误';
                    }
                    ;
                    obj.element.innerHTML = val;
                },
                // 渲染付款方式
                renderPayMethod: function (obj) {
                    if (obj.value == 1) {
                        var val = '微信支付';
                    } else if (obj.value == 2) {
                        var val = '支付宝支付';
                    } else if (obj.value == 3) {
                        var val = '银行转账';
                    } else if (obj.value == 4) {
                        var val = '现金支付';
                    } else {
                        var val = '';
                    }
                    ;
                    obj.element.innerHTML = val;
                },
                // 渲染款项类型
                renderPayType: function (obj) {
                    if (obj.value == 1) {
                        var val = '首付款';
                    } else if (obj.value == 2) {
                        var val = '尾款';
                    } else if (obj.value == 3) {
                        var val = '抵扣';
                    } else {
                        var val = '';
                    }
                    ;
                    obj.element.innerHTML = val;
                },
                //支付款项差额
                MoneyValue :function(obj){
                    var text;
                    var mon=obj.row.value;
                    var paidamount=mon.paidamount;
                    var total=mon.totalamount;
                    text = ((total*100)-(paidamount*100))/100;
                    // text=total-paidamount;
                    //保留两位小数点
                    obj.element.innerHTML = text.toFixed(2);
                },
                // 渲染类型
                renderPayStatus : function(obj) {
                    var text;
                    var mon=obj.row.value;
                    var paidamount=mon.paidamount;
                    var total=mon.totalamount;
                    text = ((total*100)-(paidamount*100))/100;
                    if(text==0){
                        text = '支付已完成';
                    }else{
                        text = '支付未完成';
                    }
                    obj.element.innerHTML = text;
                },

                // 审核
                addClick: function (obj) {
                    //1. 创建空数据
                    //1.1 先清空
                    //1.2再创建
                    //2.填写数据
                    //3.更新数据
                    $('#dialog_content_audit').find('.u-msg-title').html("<h4>审核</h4>");
                    $('input[name="auditstate"]').parent().removeClass('is-checked');
                    // $('input[name="auditstate"][value="1"]').parent().addClass('is-checked');
                    $('input[name="auditstate"]').prop("checked",false).attr("checked",false);
                    viewModel.event.clearDt(viewModel.objdatanew);
                    var row = viewModel.objdata.getSelectedRows()[0];
                    if (row) {
                        var state = row.data.auditstate.value;
                        if (state == 0) {
                            viewModel.objdatanew.setSimpleData(viewModel.objdata.getSimpleData({
                                type: 'select'
                            }));
                            $('#paymoney').attr("readonly", "readonly");
                            window.md = u.dialog({
                                id: 'add_audit',
                                content: "#dialog_content_audit",
                                hasCloseMenu: true
                            });
                        } else {
                            $vue.$message({
    showClose: true,
    message: '该流水已审核！',
    type: 'warning',
    offset: '60'
});
                        }

                    } else {
                        $vue.$message({
    showClose: true,
    message: '请选择要编辑的数据！',
    type: 'warning',
    offset: '60'
});
                    }

                },
                //保存  点击
                saveClick: function () {
                    var data = viewModel.objdatanew.getSelectedRows()[0].getSimpleData();

                    // var radios = document.getElementsByName("auditstate");
                    // for (var i = 0; i < radios.length; i++) {
                    // if (radios[i].checked) {
                    // data.auditstate = radios[i].value;
                    // break;
                    // }
                    // }
                    data.auditstate = $('input[name="auditstate"]:checked').val();
                    if (!data.auditstate) {
                        $vue.$message({
    showClose: true,
    message: '请勾选审核结果！',
    type: 'warning',
    offset: '60'
});
                        return;
                    }
                    if (!viewModel.app.compsValidate($('#add-form')[0])) {
                        return;
                    }
                    var str = "paymentid,auditstate,auditnote";
                    for (var key in data) {
                        if (str.indexOf(key) == -1) {
                            delete data[key];
                        }
                    }

                    $.ajax({
                        type: 'post',
                        url: viewModel.objAddUrl,
                        data: {
                            paymentid: data.paymentid,
                            auditstate: data.auditstate,
                            auditnote: data.auditnote
                        },
                        success: function (res) {

                            if (res.success == 'success') {
                                viewModel.event.cancelClick();
                                viewModel.event.loadList();
                                $vue.$message({
    showClose: true,
    message: '审核成功!',
    type: 'success',
    offset: '60'
});
                            }
                        }
                    });
                },
                //取消点击
                cancelClick: function () {
                    md.close();
                },
                //反审  savedisClick
                resetClick: function () {
                    viewModel.event.clearDt(viewModel.objdatanew);
                    var row = viewModel.objdata.getSelectedRows()[0];
                    if (row) {
                        var state = row.data.auditstate.value;
                        if (state == 1 || state == 2) {
                            viewModel.objdatanew.setSimpleData(viewModel.objdata.getSimpleData({
                                type: 'select'
                            }));
                            window.md = u.dialog({
                                id: 'add_disaudit',
                                content: "#dialog_content_disaudit",
                                hasCloseMenu: true
                            });
                        } else {
                            $vue.$message({
    showClose: true,
    message: '请勾选审核结果未审核的流水无法进行反审!',
    type: 'warning',
    offset: '60'
});
                        }

                    } else {
                        $vue.$message({
    showClose: true,
    message: '请选择要反审的数据！',
    type: 'warning',
    offset: '60'
});
                    }

                },
                savedisClick:function(){
                    var memo = $("#disauditnote").val();
                    if(!memo.trim()){
                        $("#disauditnote").focus();
                        return;
                    }
                    viewModel.event.cancelClick();
                    var data = viewModel.objdata.getSelectedRows()[0].getSimpleData();
                    data.memo = memo;
                    viewModel.event.resetSerial(data);
                    viewModel.objdata.removeRow(viewModel.objdata.getSelectedIndexs());
                },
                resetSerial: function (data) {
                    var list = viewModel.event.genDataList(data);
                    var paymentid = list[0].paymentid;
                    var memo = list[0].memo;
                    $.ajax({
                        type: 'post',
                        url: viewModel.resetSerialUrl,
                        dataType: 'json',
                        // contentType : "application/json",
                        data: {
                            paymentid: paymentid,
                            memo: memo,
                            auditstate:0,
                        },
                        success: function (res) {
                            if (res.success == 'success') {
                                $vue.$message({
    showClose: true,
    message: '反审成功!',
    type: 'success',
    offset: '60'
});
                                viewModel.event.loadList();
                            } else {
                                $vue.$message({
    showClose: true,
    message: '无返回数据！',
    type: 'error',
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

                    })

                },
            }

        };

        $(element).html(template);
        viewModel.event.pageInit();

        // 绑定时间段选择触发
        viewModel.searchdatanew.on('valueChange', function (event) {

            let
                filename = event.field;
            // 改变的字段
            // var oldValue = event.oldValue;
            var newValue = event.newValue;
            if (filename == 'timeslot') {
                if (newValue == '3') {
                    //$(element).find('#time').hide();
                    $(element).find('#starttime').show();
                    $(element).find('#endtime').show();
                } else if (newValue == '-1' || newValue == '0' || newValue == '1' || newValue == '2') {
                    $(element).find('#starttime').hide();
                    $(element).find('#endtime').hide();
                }

            }
        });

    };

    return {
        //'model': viewModel,
        'template': template,
        'init': init
    };
});
