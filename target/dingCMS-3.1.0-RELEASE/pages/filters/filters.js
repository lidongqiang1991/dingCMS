define(['text!pages/filters/filters.html', 'pages/filters/filtersmeta', 'css!pages/filters/filters', 'uuigrid'], function (html) {

    var init = function (element, params) {
        var viewModel = {
            app: {},
            /* 数据模型 */
            draw: 1,
            totlePage: 0,
            pageSize: 10,
            totleCount: 0,
            parentid: '',
            formInline: '',
            filtersData: new DataTable({}),

            getListUrl: ctx + '/advanfilter/pagesys.do',
            addOrEditUrl: ctx + '/advanfilter/savesys.do',
            delFiltersUrl: ctx + '/advanfilter/delsys.do',

            event: {
                //编辑选择器
                editClick: function (data, fun) {
                    if (data) {
                        $.ajax({
                            url: viewModel.addOrEditUrl,
                            type: 'post',
                            data: JSON.stringify(data),
                            dataType: 'json',
                            contentType: "application/json",
                            success: function (res) {
                                fun();
                            }
                        });
                    } else {

                    }
                },

                //删除
                del: function (data, fun) {
                    console.log(data)
                    $.ajax({
                        type: 'post',
                        url: viewModel.delFiltersUrl,
                        dataType: 'json',
                        contentType: "application/json",
                        data: JSON.stringify(data),
                        success: function (res) {
                            fun();
                        }
                    })
                },

                //清除datatable数据
                clearDt: function (dt) {
                    dt.removeAllRows();
                    dt.clear();
                },

                // 页面加载 获取所有选择器
                loadList: function () {
                    viewModel.parentid = '';
                    var jsonData = {
                        pageIndex: viewModel.draw - 1,
                        pageSize: viewModel.pageSize,
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
                    if (viewModel.formInline) {
                        u.extend(jsonData, viewModel.formInline);
                    }
                    $.ajax({
                        type: 'get',
                        url: viewModel.getListUrl,
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
                                        viewModel.filtersData.removeAllRows();
                                        viewModel.filtersData.clear();
                                    } else {
                                        viewModel.totleCount = res.detailMsg.data.totalElements;
                                        viewModel.totlePage = res.detailMsg.data.totalPages;
                                        viewModel.event.comps.update({
                                            totalPages: viewModel.totlePage,
                                            pageSize: viewModel.pageSize,
                                            currentPage: viewModel.draw,
                                            totalCount: viewModel.totleCount
                                        });
                                        viewModel.filtersData.removeAllRows();
                                        viewModel.filtersData.clear();
                                        viewModel.filtersData.setSimpleData(res.detailMsg.data.content, {unSelect: true});
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
                                    u.messageDialog({msg: msg, title: '请求错误', btnText: '确定'});
                                }
                            } else {
                                u.messageDialog({msg: '后台返回数据格式有误，请联系管理员', title: '数据错误', btnText: '确定'});
                            }

                        },
                        error: function (er) {
                            u.messageDialog({msg: '请求超时', title: '请求错误', btnText: '确定'});
                        }
                    })
                },

                //组装list
                genDataList: function (data) {
                    var datalist = [];
                    datalist.push(data);
                    return datalist;
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
                    viewModel.event.pageChange();
                    viewModel.event.sizeChange();

                    this.loadList();

                },
                searchClick: function () {
                    $(element).find('#returnBtn').show();
                    viewModel.draw = 1;
                    viewModel.event.loadList();
                },
            }
        };
        $(element).html(html);
        viewModel.event.pageInit();
        if (u.isIE8) {
            $('.ie8-bg').css('display', 'block');
        }

        var vm = new Vue({
            el: '#appFilters',
            data: function () {
                return {
                    form: {
                        type: '',
                        field: '',
                        showname: '',
                        formtype: '',
                        conditionlist: '',
                        setting: [],
                    },
                    form_temp: {
                        type: '',
                        field: '',
                        showname: '',
                        formtype: '',
                        conditionlist: '',
                        setting: [],
                    },
                    scene: '',
                    typelist: [
                        {name: '全部分组', id: ''},
                        {name: '客户', id: 'customer'},
                        {name: '工人', id: 'worker'},
                        {name: '工程', id: 'project'},
                        {name: '合同', id: 'contract'},
                    ],
                    formtypelist: [
                        {name: '文本', id: 'text'},
                        {name: '整数', id: 'int'},
                        {name: '时间', id: 'date'},
                        {name: '下拉(单选)', id: 'select'},
                        {name: '下拉(多选)', id: 'selects'},
                        {name: '运营中心', id: 'org'},
                        {name: '运营商', id: 'agent'},
                    ],
                    conditionlist: [
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
                        visible: false,  //弹出框是否显示
                    },
                    //筛选
                    formInline: {
                        search_searchParam: '',
                        search_type: '',
                    }
                }
            },
            mounted() {

            },
            methods: {
                //查询
                onSubmit() {
                    viewModel.formInline = this.formInline;
                    viewModel.draw = 1;
                    viewModel.event.loadList();
                },
                // 新增条件
                addFiltersClick() {
                    this.filters_temp.visible = true;
                    this.form = this.copyObj(this.form_temp);
                },
                editFiltersClick() {

                    // var obj = JSON.parse('{"type":"customer","field":"source","showname":"客户来源","formtype":"select","conditionlist":["equal"],"setting":[{"name":"400","id":"400"},{"name":"U会员","id":"U会员"},{"name":"今日头条","id":"今日头条"},{"name":"天猫","id":"天猫"},{"name":"京东","id":"京东"}]}');
                    // this.form=this.copyObj(obj);

                    //===
                    var row = viewModel.filtersData.getSelectedRows()[0];
                    if (row) {
                        var data = row.getSimpleData();
                        for (var key in data) {
                            if (key == 'setting') {
                                data[key] = JSON.parse(data[key]);
                            } else if (key == 'conditionlist') {
                                let arr_temp = [];
                                let arr = JSON.parse(data[key]);
                                for (let ni = 0, nj = arr.length; ni < nj; ni++) {
                                    arr_temp.push(arr[ni].id);
                                }
                                data[key] = this.copyArr(arr_temp);
                            }
                        }
                        this.form = this.copyObj(data);
                        this.filters_temp.visible = true;
                    } else {
                        $vue.$message({
                            type: 'warning',
                            message: '请选择要编辑的数据'
                        })
                    }
                },
                delFiltersClick() {
                    let that = this;
                    var row = viewModel.filtersData.getSelectedRows()[0];
                    if (row) {
                        this.$confirm('您确定要删除这条数据吗?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            var data = viewModel.filtersData.getSimpleData({type: 'select'});
                            data = that.removeKey(data[0]);
                            let a = [];
                            a.push(data);
                            viewModel.event.del(a, function () {
                                that.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                viewModel.event.loadList();
                            });
                        });
                    } else {
                        that.$message({
                            type: 'warning',
                            message: '请选择要删除的数据'
                        })
                    }
                },

                // 添加筛选条件
                addSettingClick() {
                    this.form.setting.push({
                        name: '',
                        value: '',
                    });
                },
                //数据同步
                asyncSettingClick(item) {
                    debugger
                    item.value = item.name;
                },
                delSettingClick(item, i) {
                    let that = this;
                    this.$confirm('您确定要删除这条数据吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        that.form.setting.splice(i, 1);
                        that.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    });
                },
                closeSettingClick(res) {
                    this.filters_temp.visible = false
                },
                saveSettingClick() {
                    let that = this;
                    // 判断
                    let errorTip = false;
                    let form = this.form;
                    for (var key in form) {
                        if (!form[key] instanceof Object) {
                            if (!form[key]) {
                                errorTip = key;
                                break;
                            }
                        } else if (form.formtype != 'date') {
                            if (key == 'conditionlist') {
                                if (form.formtype != 'date') {
                                    if (form[key].length < 1) {
                                        errorTip = '判断条件';
                                        break;
                                    }
                                }
                            } else {
                                if (form.formtype == 'select'||form.formtype == 'selects') {
                                    if (this.form.setting.length < 1) {
                                        errorTip = '选项';
                                        break;
                                    }
                                    for (let i = 0, j = this.form.setting.length; i < j; i++) {
                                        let tt = this.form.setting;
                                        if (!tt[i].name) {
                                            errorTip = '选项显示值';
                                            break;
                                        } else if (!tt[i].value) {
                                            errorTip = '选项实际值';
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (errorTip) {
                        let msg = errorTip + '不能为空';
                        $vue.$message({
                            showClose: true,
                            message: msg,
                            type: 'error'
                        });
                        return;
                    }
                    // 保存 、  筛选
                    // var obj = JSON.stringify(this.form);
                    // console.log(obj);
                    var obj = this.copyObj(this.form);
                    for (var key in obj) {
                        if (key == 'setting') {
                            obj[key] = JSON.stringify(obj[key]);
                        } else if (key == 'conditionlist') {
                            let all_temp = this.conditionlist;
                            let new_temp = this.copyArr(obj[key]);
                            let arr_temp = [];
                            for (let i = 0, j = all_temp.length; i < j; i++) {
                                for (let ni = 0, nj = new_temp.length; ni < nj; ni++) {
                                    if (all_temp[i].id == new_temp[ni]) {
                                        arr_temp.push(all_temp[i]);
                                    }
                                }
                            }
                            obj[key] = JSON.stringify(arr_temp);
                        }
                    }
                    obj = this.removeKey(obj);
                    //ajax
                    viewModel.event.editClick(obj, function () {
                        that.filters_temp.visible = false;
                        that.$message({
                            type: 'success',
                            message: '成功!'
                        });
                        viewModel.event.loadList();
                    });
                },
                // 深拷贝
                copyArr: function (arr) {
                    var arr_temp = [];
                    if (arr) {
                        for (let i = 0, j = arr.length; i < j; i++) {
                            if (arr[i] instanceof Array) {
                                arr_temp[i] = this.copyArr(arr[i]);
                            } else if (arr[i] instanceof Object) {
                                arr_temp[i] = this.copyObj(arr[i]);
                            } else arr_temp[i] = arr[i];
                        }
                    }
                    return arr_temp;
                },
                copyObj: function (obj) {
                    let obj_temp = {};
                    for (let key in obj) {
                        if (obj[key] instanceof Array) {
                            obj_temp[key] = this.copyArr(obj[key]);
                        } else if (obj[key] instanceof Object) {
                            obj_temp[key] = this.copyObj(obj[key])
                        } else obj_temp[key] = obj[key];
                    }
                    return obj_temp;
                },
                removeKey(obj) {
                    // let arr = ['type', 'field', 'id', 'showname', 'formtype', 'conditionlist', 'setting'];
                    // for (var key in obj) {
                    //     for (let i = 0, j = arr.length; i < j; i++) {
                    //         if (arr.indexOf(key) == -1) {
                    //             delete obj[key];
                    //         }
                    //     }
                    // }
                    return obj;
                },
            }, watch: {
                scene(val) {
                    viewModel.scene = val;
                    viewModel.event.loadList();
                }
            }
        })


    }

    return {
        'template': html,
        init: init
    }
});//end define
