define(['text!pages/board/board.html', 'css!pages/board/board', 'uui'], function (template) {
    var viewModel = {};
    // var echarts = require('echarts');

    //初始化方法,页面加载后被 调用
    var init = function (element) {

        var viewModel = {
            app: {},

            listurl: ctx + '/board/index.do',
            downloadUrl: ctx + '/excel/download.do',
            //数据
            addcustomer: '',
            allotedcustomer: 0,
            paidamount: 0,
            serviced: 0,
            servicing: 0,
            totalamount: 0,

            // 筛选条件
            searchdatanew: new DataTable(),

            rangeList: [
                {name: '全部', value: 'all'},
                {name: '今天', value: 'today'},
                {name: '昨天', value: 'yesterday'},
                {name: '本周', value: 'thisweek'},
                {name: '上周', value: 'lastweek'},
                {name: '本月', value: 'thismonth'},
                {name: '上月', value: 'lastmonth'},
                {name: '本季度', value: 'thisquarter'},
                {name: '上季度', value: 'lastquarter'},
                {name: '今年', value: 'thisyear'},
                {name: '去年', value: 'lastyear'},
                {name: '滚动数据范围', value: 'rolling'},
                {name: '自定义数据范围', value: 'custom'},
            ],
            frequencyList: [
                {name: '天', value: 'day'},
                {name: '周', value: 'week'},
                {name: '月', value: 'month'},
                {name: '年', value: 'year'},
            ],
            rollingList: [
                {name: '近7天', value: '7'},
                {name: '近15天', value: '15'},
                {name: '近30天', value: '30'},
                {name: '近60天', value: '60'},
                {name: '近90天', value: '90'},
                {name: '近365天', value: '365'},
            ],
            echarts: {},

            event: {
                //页面初始化
                pageInit: function () {
                    id = [];
                    viewModel.app = u.createApp({
                        el: element /* Document.body */,
                        model: viewModel
                    });

                    // 初始化筛选
                    viewModel.event.clearDt(viewModel.searchdatanew);
                    viewModel.searchdatanew.clear();
                    var newr = viewModel.searchdatanew.createEmptyRow();
                    viewModel.searchdatanew.setRowSelect(newr);

                    viewModel.event.loadList();

                },
                //清除datatable数据
                clearDt: function (dt) {
                    dt.removeAllRows();
                    dt.clear();
                },
                // 加载 客户列表
                loadList: function (obj) {
                    var m = (new Date()).getMonth() + 1;
                    m = m > 10 ? m : '0' + m;
                    var month = (new Date()).getFullYear() + '-' + m;
                    $.ajax({
                        type: 'get',
                        url: viewModel.listurl,
                        //dataType : 'json',
                        data: {
                            month: month,
                        },
                        contentType: 'application/json;charset=utf-8',
                        success: function (res) {
                            if (res.success == 'success') {
                                var data = res.detailMsg.data;
                                if (!data) return;
                                // viewModel.addcustomer = data.addcustomer;
                                // viewModel.allotedcustomer = data.allotedcustomer;
                                // viewModel.paidamount = data.paidamount;
                                // viewModel.serviced = data.serviced;
                                // viewModel.servicing = data.servicing;
                                // viewModel.totalamount = data.totalamount;
                                $(".board-addcustomer").text(data.addcustomer || 0);
                                $(".board-allotedcustomer").text(data.allotedcustomer || 0);
                                //金额截取两位小数
                                var paidamount = data.paidamount;
                                if (!paidamount) {
                                    paidamount = 0
                                }
                                ;
                                paidamount = paidamount.toString();
                                if (paidamount.indexOf('.') != -1) {
                                    paidamount = paidamount.split('.')[0] + '.' + paidamount.split('.')[1].slice(0, 2);
                                }
                                var totalamount = data.totalamount;
                                if (!totalamount) {
                                    totalamount = 0
                                }
                                ;
                                totalamount = totalamount.toString();
                                if (totalamount.indexOf('.') != -1) {
                                    totalamount = totalamount.split('.')[0] + '.' + totalamount.split('.')[1].slice(0, 2);
                                }
                                $(".board-paidamount").text(paidamount || 0);
                                $(".board-serviced").text(data.serviced || 0);
                                $(".board-servicing").text(data.servicing || 0);
                                $(".board-totalamount").text(totalamount || 0);
                            }
                        }
                    })
                },

                //下载报表
                downLoad: function (filename) {
                    $.ajax({
                        type: 'get',
                        url: viewModel.downloadUrl,
                        data: {
                            filename: filename
                        },
                        //dataType : 'json',
                        contentType: 'application/json;charset=utf-8',
                        success: function (res) {
                            if (res) {
                                window.location.href = "/dingCMS" + res;
                            }
                        }
                    })
                },

                //报表
                report: function (id) {
                    return;
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(document.getElementById(id));
                    var arr = [
                        {"name": "衬衫", "value": 5},
                        {"name": "羊毛衫", "value": 20},
                        {"name": "雪纺衫", "value": 36},
                        {"name": "裤子", "value": 10},
                        {"name": "高跟鞋", "value": 10},
                        {"name": "袜子", "value": 20}
                    ];
                    // 指定图表的配置项和数据
                    var option = {
                        title: {
                            text: '测试'
                        },
                        tooltip: {},
                        legend: {
                            data: ['销量']
                        },
                        xAxis: {
                            data: (function () {
                                var a = 0, list = [];
                                while (a < arr.length) {
                                    list.push(arr[a].name);
                                    a++;
                                }
                                return list;
                            })()
                        },
                        yAxis: {},
                        series: [
                            {
                                name: '销量',
                                type: 'bar',
                                data: (function () {
                                    var a = 0, list = [];
                                    while (a < arr.length) {
                                        list.push(arr[a].value);
                                        a++;
                                    }
                                    return list;
                                })()
                            }, {
                                name: '销量line',
                                type: 'line',
                                color: '#f0f',
                                label: {
                                    show: true
                                },
                                data: (function () {
                                    var a = 0, list = [];
                                    while (a < arr.length) {
                                        list.push(arr[a].value);
                                        a++;
                                    }
                                    return list;
                                })()
                            }]
                    };

                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                    myChart.resize({
                        width: 'auto'
                    });

                    viewModel.echarts.myChart = myChart;

                },
                reportData: function () {
                    var arr = [
                        {"name": 5, "value": "衬衫"},
                        {"name": 20, "value": "羊毛衫"},
                        {"name": 36, "value": "雪纺衫"},
                        {"name": 10, "value": "裤子"},
                        {"name": 10, "value": "高跟鞋"},
                        {"name": 20, "value": "袜子"}
                    ];

                },

                //获取 今天 ，昨天，本月，本季度
                sortTimeFilter: function (rangeType, time) {
                    let startTime, endTime;
                    var date = new Date();
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var day = date.getDate();
                    let weekday = date.getDay();
                    let monthday = new Date(year, month, 0).getDate();

                    endTime = this.sortFormat(year, month, day);

                    switch (rangeType) {
                        case 'today':  //今天
                            startTime = this.getYearMonthDay(date);
                            break;
                        case "yesterday":  //昨天
                            startTime = this.getYearMonthDay(date, -1);
                            endTime = this.getYearMonthDay(date, -1);
                            break;
                        case 'thisweek':  //本周
                            startTime = this.getYearMonthDay(date, -weekday);
                            endTime = this.getYearMonthDay(date, 7 - weekday);
                            break;
                        case 'lastweek':  //上周
                            startTime = this.getYearMonthDay(date, -weekday - 7);
                            endTime = this.getYearMonthDay(date, -weekday - 1);
                            break;
                        case 'thismonth':  //本月
                            startTime = this.getYearMonthDay(this.sortFormat(year, month, 1));
                            endTime = this.getYearMonthDay(this.sortFormat(year, month, monthday));
                            break;
                        case 'lastmonth':  //上月
                            var prevdate = this.getYearMonthDay(this.sortFormat(year, month, 3), -5, 'obj');
                            var prevmonthday = new Date(prevdate.year, prevdate.month, 0).getDate();
                            var prevyear = prevdate.year;
                            var prevmonth = prevdate.month;
                            startTime = this.getYearMonthDay(this.sortFormat(prevyear, prevmonth, 1));
                            endTime = this.getYearMonthDay(this.sortFormat(prevyear, prevmonth, prevmonthday));
                            break;
                        case 'thisquarter':  //本季度
                            var quarterRange = this.getQuarterRange(month);
                            var quarterendday = new Date(year, quarterRange.end, 0).getDate();
                            startTime = this.getYearMonthDay(this.sortFormat(year, quarterRange.start, 1));
                            endTime = this.getYearMonthDay(this.sortFormat(year, quarterRange.end, quarterendday));
                            break;
                        case 'lastquarter':  //上季度
                            var quarterRange = this.getQuarterRange(month, 'prev');
                            if (month - 3 < 1) {
                                year -= 1;
                            }
                            var quarterendday = new Date(year, quarterRange.end, 0).getDate();
                            startTime = this.getYearMonthDay(this.sortFormat(year, quarterRange.start, 1));
                            endTime = this.getYearMonthDay(this.sortFormat(year, quarterRange.end, quarterendday));
                            break;
                        case 'thisyear':  //今年
                            startTime = this.getYearMonthDay(this.sortFormat(year, 1, 1));
                            endTime = this.getYearMonthDay(this.sortFormat(year, 12, 31));
                            break;
                        case 'lastyear':  //去年
                            var prevyear = year - 1;
                            startTime = this.getYearMonthDay(this.sortFormat(prevyear, 1, 1));
                            endTime = this.getYearMonthDay(this.sortFormat(prevyear, 12, 31));
                            break;
                        case 'rolling':  //滚动数据范围 ， -- 近 n（time） 天
                            startTime = this.getYearMonthDay(date, -time);
                            break;
                        case 'custom':  //自定义
                            break;

                    }
                    //时间区间，不包括开始、结束的时间，前后需要加一天
                    startTime = this.getYearMonthDay(startTime, -1);
                    endTime = this.getYearMonthDay(endTime, 1);
                    console.log(startTime, endTime);
                    return {
                        starttime: startTime,
                        endtime: endTime,
                    };
                },
                getYearMonthDay: function (time, add, result) {
                    if (String(time).indexOf('-') > -1) {
                        time = time.replace(/-/g, '/');
                    }
                    var time = new Date(time || '');
                    if (Number(add)) {
                        time = (time.getTime()) + add * 24 * 60 * 60 * 1000;
                        time = new Date(time);
                    }
                    let year = time.getFullYear();
                    let month = time.getMonth() + 1;
                    let day = time.getDate();
                    if (result == 'obj') {
                        return {
                            year: year,
                            month: month,
                            day: day
                        };
                    } else {
                        let val = this.sortFormat(year, month, day);
                        return val;
                    }
                },
                sortFormat: function (year, month, day) {
                    month = ('0' + month).substr(-2, 2);
                    day = ('0' + day).substr(-2, 2);
                    return year + '-' + month + '-' + day;
                },
                getQuarterRange: function (month, type) {  //month - 当前月份
                    var quarterNum;
                    if (type == 'prev') {
                        month -= 3;
                        if (month < 1) month += 12;
                    }
                    quarterNum = parseInt((month - 1) / 3);
                    console.log({
                        start: quarterNum * 3 + 1,
                        end: quarterNum * 3 + 3
                    });
                    return {
                        start: quarterNum * 3 + 1,
                        end: (quarterNum * 3) + 3
                    }
                },

            }
        };

        $(element).html(template);
        viewModel.event.pageInit();
        viewModel.event.report('board-main-1');
        viewModel.event.report('board-main-2');

        viewModel.event.sortTimeFilter('lastyear');

        // var app = u.createApp({
        // el:element,
        // model:viewModel
        // });

        $(".download div").click(function () {
            var filename = $(this).attr("data-filename");
            viewModel.event.downLoad(filename);
        });

        // 筛选条件
        viewModel.searchdatanew.on('valueChange', function (event) {
            let filename = event.field;  // 改变的字段
            var oldValue = event.oldValue;
            var newValue = event.newValue;
            if (filename == 'timerange') {
                if (newValue == 'rolling') {
                    $(".filter-rolling").removeClass('c_hide');
                    $(".filter-custom").addClass('c_hide');
                    var row = viewModel.searchdatanew.getSelectedRows()[0];
                    var time = row.getValue("rolling");
                    viewModel.event.sortTimeFilter(newValue, time);
                } else if (newValue == 'custom') {
                    $(".filter-custom").removeClass('c_hide');
                    $(".filter-rolling").addClass('c_hide');
                } else {
                    $(".filter-custom,.filter-rolling").addClass('c_hide');
                    viewModel.event.sortTimeFilter(newValue);
                }
            } else if (filename == 'rolling') {
                viewModel.event.sortTimeFilter('rolling', newValue)
            }

        });


    };

    return {
        'model': viewModel,
        'template': template,
        'init': init
    };
});
