define(['text!pages/customer/customerDetail.html','css!pages/customer/customerDetail','pages/customer/customermeta','pages/json/addressList','uuigrid'],function(html) {

	var init = function(element){

		var viewModel = {
				app:{},
				/* 数据模型 */
				draw:1,
				totlePage:0,
				pageSize:10,
				totleCount:0,

                // 全局id
                billid:'',
                // 控制分页加载 链接
                page:{
				    url:'',
                },

                // 客户信息
            	customerListUrl:ctx + '/custlist/page.do',
            	customerAddUrl:ctx + '/custlist/save.do',
                // 客户详情页参数
                customerDetailUrl:ctx + '/#/customer/customer',

                // 跟进列表
                followListUrl:ctx + '/custlist/listnote.do',
                followAddUrl:ctx + '/custlist/addnote.do',

                //修改客户状态
                eidtStateUrl:ctx + '/custlist/changeState.do',

                // 分配服务商 -- 服务商列表
                allotlistUrl:ctx + '/custlist/listallot.do',

                resumeUrl:ctx + '/custlist/resume.do',

                /*关闭客户url*/
                closeUrl:ctx + '/custlist/closeCustomer.do',

				/* 列表 */
				customerdata : new u.DataTable(metacustomer),
				/* 编辑框 数据 */
				customerdatanew : new u.DataTable(metacustomer),

				// 筛选 数据
				customerFormDa:new u.DataTable(metacustomer),

                // 跟进列表
                followupdata:new u.DataTable(metafollowup),

                // 分配日志 列表
                allotdata:new u.DataTable(metafollowup),

                sexList:[{name: "男",value:1}, {name: "女",value:2}],
                /*sourceList:[
                    {name: "400", value: "400"},
                    {name: "电商", value: "电商"},
                    {name: "网络搜索", value: "网络搜索"},
                    {name: "媒体广告", value: "媒体广告"},
                    {name: "推广活动", value: "推广活动"},
                    {name: "社群营销", value: "社群营销"},
                    {name: "转介绍", value: "转介绍"},
                    {name: "运营商", value: "运营商"}
                    // {name: "400", value: "400"},
                    // {name: "天猫", value: "天猫"},
                    // {name: "网络搜索", value: "网络搜索"},
                    // {name: "媒体广告", value: "媒体广告"},
                    // {name: "推广活动", value: "推广活动"},
                    // {name: "运营商", value: "运营商"},
                    // {name: "转介绍", value: "转介绍"},
                    // {name: "今日头条", value: "今日头条"},
                    // {name: "京东", value: "京东"},
                    // {name: "腾讯", value: "腾讯"},
                    // {name: "百度", value: "百度"},
                    // {name: "短信", value: "短信"},
                ],*/
                /*sourceList1:[],*/
                // sourceList1_temp:{
                //     "400":[
                //         {name: "8966",value:"8966"},
                //         {name: "5756",value:"5756"},
                //     ],
                //     "天猫":[
                //         {name: "天猫",value:"天猫"},
                //     ],
                //     "网络搜索":[
                //         {name: "百度",value:"百度"},
                //         {name: "官网",value:"官网"},
                //         {name: "其他",value:"其他"},
                //     ],
                //     "媒体广告":[
                //         {name: "今日头条",value:"今日头条"},
                //         {name: "百度",value:"百度"},
                //         {name: "腾讯",value:"腾讯"},
                //         {name: "微信",value:"微信"},
                //         {name: "抖音",value:"抖音"},
                //         {name: "微博",value:"微博"},
                //         {name: "电台",value:"电台"},
                //         {name: "其他",value:"其他"},
                //     ],
                //     "推广活动":[
                //         {name: "小区推广",value:"小区推广"},
                //         {name: "短信",value:"短信"},
                //         {name: "微信公众号",value:"微信公众号"},
                //         {name: "其他",value:"其他"},
                //         {name: "社区推广",value:"社区推广"},
                //     ],
                //     "运营商":[
                //         {name: "自建单",value:"自建单"},
                //         {name: "工长介绍",value:"工长介绍"},
                //         {name: "其他",value:"其他"},
                //         {name: "自引单",value:"自引单"},
                //         {name: "网络搜索",value:"网络搜索"},
                //         {name: "媒体广告",value:"媒体广告"},
                //         {name: "微信",value:"微信"},
                //         {name: "电商",value:"电商"},
                //         {name: "雨虹公司内推",value:"雨虹公司内推"},
                //         {name: "其他",value:"其他"},
                //     ],
                //     "转介绍":[
                //         {name: "家人朋友介绍",value:"家人朋友介绍"},
                //         {name: "老客户介绍",value:"老客户介绍"},
                //         {name: "雨虹公司内推",value:"雨虹公司内推"},
                //         {name: "其他",value:"其他"},
                //         {name: "雨虹内部介绍",value:"雨虹内部介绍"},
                //         {name: "工长介绍",value:"工长介绍"},
                //         {name: "家装公司介绍",value:"家装公司介绍"},
                //     ],
                //     "京东":[
                //         {name: "京东",value:"京东"},
                //     ],
                //     "今日头条":[
                //         {name: "今日头条",value:"今日头条"},
                //     ],
                //     "腾讯":[
                //         {name: "腾讯",value:"腾讯"},
                //     ],
                //     "百度":[
                //         {name: "百度",value:"百度"},
                //     ],
                //     "短信":[
                //         {name: "短信",value:"短信"},
                //     ],
                // },
                // sourceList1_temp:{
                //     "400":[
	            //     	{name: "8966",value:"8966"},
	            //         {name: "5756",value:"5756"},
                //     ],
                //     "电商":[
	            //     	{name: "天猫",value:"天猫"},
	            //     	{name: "京东",value:"京东"},
	            //     	{name: "拼多多",value:"拼多多"},
                //     ],
                //     "网络搜索":[
                //         {name: "百度",value:"百度"},
                //         {name: "官网",value:"官网"},
                //         {name: "其他",value:"其他"},
                //     ],
                //     "媒体广告":[
                //         {name: "今日头条",value:"今日头条"},
                //         {name: "齐家网",value:"齐家网"},
                //         {name: "腾讯-朋友圈",value:"朋友圈"},
                //         {name: "抖音",value:"抖音"},
                //         {name: "微博",value:"微博"},
                //         {name: "电台",value:"电台"},
                //         // {name: "微信",value:"微信"},
                //         // {name: "其他",value:"其他"},
                //     ],
                //     "推广活动":[
                //         {name: "U会员",value:"U会员"},
                //         {name: "小区推广",value:"小区推广"},
                //         {name: "微信公众号",value:"微信公众号"},
                //         {name: "短信",value:"短信"},
                //     ],
                // 	"社群营销":[
                //         {name: "装修情报",value:"装修情报"},
                //     ],
                //     "转介绍":[
                //         {name: "家人朋友介绍",value:"家人朋友介绍"},
                //         {name: "雨虹公司介绍",value:"雨虹公司介绍"},
                //         {name: "工队长介绍",value:"工队长介绍"},
                //         {name: "家装公司介绍",value:"家装公司介绍"},
                //         {name: "老客户介绍",value:"老客户介绍"},
                //     ],
                // 	"运营商":[
                //         {name: "自引单",value:"自引单"},
                //     ],
                //
                // },
                sourceList0:[
                    {name: "在线咨询", value: "在线咨询", children:[
                            {name: "官网", value: "官网", children:[
                                    {name: "顶之美", value: "顶之美"}
                            ]},
                            {name: "微信公众号", value: "微信公众号", children:[
                                    {name: "微信公众号", value: "微信公众号"}
                            ]},
                            {name: "微博", value: "微博", children:[
                                    {name: "微博", value: "微博"}
                            ]},
                    ]},
                    {name: "8966呼入", value: "8966呼入", children:[
                            {name: "今日头条", value: "今日头条", children:[
                                    {name: "今日头条", value: "今日头条"},
                                    {name: "抖音", value: "抖音"},
                                    {name: "西瓜视频", value: "西瓜视频"},
                                    {name: "火山视频", value: "火山视频"}
                            ]},
                            {name: "搜索引擎", value: "搜索引擎", children:[
                                    {name: "百度", value: "百度"}
                            ]},
                            {name: "腾讯", value: "腾讯", children:[
                                    {name: "朋友圈", value: "朋友圈"},
                                    {name: "广点通", value: "广点通"}
                            ]},
                            {name: "微信公众号", value: "微信公众号", children:[
                                    {name: "微信公众号", value: "微信公众号"}
                            ]},
                            {name: "官网", value: "官网", children:[
                                    {name: "顶之美", value: "顶之美"}
                            ]},
                            {name: "京东", value: "京东", children:[
                                    {name: "顶之美", value: "顶之美"}
                            ]},
                            {name: "天猫", value: "天猫", children:[
                                    {name: "顶之美", value: "顶之美"}
                            ]},
                            {name: "转介绍", value: "转介绍", children:[
                                    {name: "家人朋友介绍", value: "家人朋友介绍"},
                                    {name: "雨虹公司介绍", value: "雨虹公司介绍"},
                                    {name: "工队长介绍", value: "工队长介绍"},
                                    {name: "家装公司介绍", value: "家装公司介绍"},
                                    {name: "老客户介绍", value: "老客户介绍"}
                            ]},
                            {name: "媒体广告", value: "媒体广告", children:[
                                    {name: "电梯广告", value: "电梯广告"},
                                    {name: "电视广告", value: "电视广告"},
                                    {name: "小区广告", value: "小区广告"},
                                    {name: "公交广告", value: "公交广告"},
                                    {name: "广播", value: "广播"},
                                    {name: "短信", value: "短信"},
                                    {name: "齐家网", value: "齐家网"}
                            ]},
                            {name: "线下推广", value: "线下推广", children:[
                                    {name: "地推", value: "地推"}
                            ]},
                            {name: "产品包装", value: "产品包装", children:[
                                    {name: "产品包装", value: "产品包装"}
                            ]},
                            {name: "114查询", value: "114查询", children:[
                                    {name: "114查询", value: "114查询"}
                            ]},
                            {name: "其他", value: "其他", children:[
                                    {name: "其他", value: "其他"}
                            ]}
                    ]},
                    {name: "5756呼入", value: "5756呼入", children:[
                            {name: "官网", value: "官网", children:[
                                    {name: "雨虹", value: "雨虹"}
                                ]},
                            {name: "京东", value: "京东", children:[
                                    {name: "雨虹", value: "雨虹"}
                                ]},
                            {name: "天猫", value: "天猫", children:[
                                    {name: "雨虹", value: "雨虹"}
                                ]},
                            {name: "媒体广告", value: "媒体广告", children:[
                                    {name: "电梯广告", value: "电梯广告"},
                                    {name: "电视广告", value: "电视广告"},
                                    {name: "小区广告", value: "小区广告"},
                                    {name: "公交广告", value: "公交广告"},
                                    {name: "广播", value: "广播"},
                                    {name: "短信", value: "短信"}
                                ]},
                            {name: "搜索引擎", value: "搜索引擎", children:[
                                    {name: "百度", value: "百度"}
                                ]},
                            {name: "转介绍", value: "转介绍", children:[
                                    {name: "家人朋友介绍", value: "家人朋友介绍"},
                                    {name: "雨虹公司介绍", value: "雨虹公司介绍"},
                                    {name: "工队长介绍", value: "工队长介绍"},
                                    {name: "家装公司介绍", value: "家装公司介绍"},
                                    {name: "老客户介绍", value: "老客户介绍"}
                                ]},
                            {name: "微信公众号", value: "微信公众号", children:[
                                    {name: "微信公众号", value: "微信公众号"}
                                ]},
                            {name: "其他", value: "其他", children:[
                                    {name: "其他", value: "其他"}
                                ]},
                            {name: "产品包装", value: "产品包装", children:[
                                    {name: "产品包装", value: "产品包装"}
                                ]}
                    ]},
                    {name: "电商", value: "电商", children:[
                            {name: "天猫", value: "天猫", children:[
                                    {name: "顶之美", value: "顶之美"},
                                    {name: "雨虹", value: "雨虹"}
                                ]},
                            {name: "京东", value: "京东", children:[
                                    {name: "顶之美", value: "顶之美"},
                                    {name: "雨虹", value: "雨虹"}
                                ]},
                            {name: "拼多多", value: "拼多多", children:[
                                    {name: "拼多多", value: "拼多多"}
                                ]},
                    ]},
                    {name: "网络搜索", value: "网络搜索", children:[
                            {name: "搜索引擎", value: "搜索引擎", children:[
                                    {name: "百度", value: "百度"}
                                ]},
                            {name: "官网", value: "官网", children:[
                                    {name: "顶之美", value: "顶之美"},
                                    {name: "雨虹", value: "雨虹"}
                                ]}
                    ]},
                    {name: "广告投放", value: "广告投放", children:[
                            {name: "今日头条", value: "今日头条", children:[
                                    {name: "今日头条", value: "今日头条"},
                                    {name: "抖音", value: "抖音"},
                                    {name: "西瓜视频", value: "西瓜视频"},
                                    {name: "火山视频", value: "火山视频"}
                                ]},
                            {name: "腾讯", value: "腾讯", children:[
                                    {name: "朋友圈", value: "朋友圈"},
                                    {name: "广点通", value: "广点通"}
                                ]},
                            {name: "媒体广告", value: "媒体广告", children:[
                                    {name: "齐家网", value: "齐家网"}
                                ]},
                    ]},
                    {name: "推广活动", value: "推广活动", children:[
                            {name: "线上推广", value: "线上推广", children:[
                                    {name: "推广大使", value: "推广大使"}
                                ]},
                            {name: "线下推广", value: "线下推广", children:[
                                    {name: "地推", value: "地推"}
                                ]}
                    ]},
                    {name: "社群营销", value: "社群营销", children:[
                            {name: "社群营销", value: "社群营销", children:[
                                    {name: "装修情报", value: "装修情报"},
                                    {name: "京东内购群", value: "京东内购群"},
                                    {name: "拼多多内购群", value: "拼多多内购群"}
                                ]}
                    ]},
                    {name: "自引单", value: "自引单", children:[
                            {name: "自引单", value: "自引单", children:[
                                    {name: "运营商自引单", value: "运营商自引单"},
                                    {name: "工队自引单", value: "工队自引单"}
                                ]}
                    ]},
                    {name: "转介绍", value: "转介绍", children:[
                            {name: "转介绍", value: "转介绍", children:[
                                    {name: "家人朋友介绍", value: "家人朋友介绍"},
                                    {name: "雨虹公司介绍", value: "雨虹公司介绍"},
                                    {name: "工队长介绍", value: "工队长介绍"},
                                    {name: "家装公司介绍", value: "家装公司介绍"},
                                    {name: "老客户介绍", value: "老客户介绍"}
                            ]}
                    ]},
                ],
                sourceList:[],
                sourceList1:[],
                provinceList:[],
                cityList:[],
                districtList:[],
                typeList:[
                    {name: "平屋面",value:"平屋面"},
                    {name: "露台",value:"露台"},
                    {name: "斜屋面",value:"斜屋面"},
                    {name: "卫生间",value:"卫生间"},
                    {name: "窗口",value:"窗口"},
                    {name: "采光顶",value:"采光顶"},
                    {name: "金属屋面",value:"金属屋面"},
                    {name: "外墙",value:"外墙"},
                    {name: "厨房",value:"厨房"},
                    {name: "地下室",value:"地下室"},
                    {name: "水池",value:"水池"}
                ],
                partList:[
                    {name: "屋顶",value:"屋顶"},
                    {name: "露台",value:"露台"},
                    {name: "阳光房/玻璃房",value:"阳光房/玻璃房"},
                    {name: "阳台",value:"阳台"},
                    {name: "卫生间",value:"卫生间"},
                    {name: "窗户",value:"窗户"},
                    {name: "厨房",value:"厨房"},
                    {name: "外墙",value:"外墙"},
                    {name: "地下室",value:"地下室"},
                    {name: "泳池",value:"泳池"},
                    {name: "管道（明管）",value:"管道（明管）"},
                    {name: "新房装修",value:"新房装修"},
                    {name: "彩钢顶",value:"彩钢顶"},
                    {name: "楼道",value:"楼道"},
                    {name: "水池",value:"水池"},
                    {name: "空白",value:"空白"}
                ],
                stateList:[
                    {name: "全部", value: "-1"},
                    {name: "待确认", value: "0"},
                    {name: "待分配", value: "1"},
                    {name: "已分配", value: "2"},
                    {name: "已结束", value: "3"},
                    {name: "待回访", value: "4"},
                    {name: "已回访", value: "5"},
                    {name: "已删除", value: "10"},
                    {name: "已关闭", value: "6"}
                ],
                // partList:[
                    // {name: "金属屋面/阳光房",value:"金属屋面/阳光房"},
                // ],
				event:{
                    //页面初始化
                    pageInit : function() {
                        id=[];
                        viewModel.app = u.createApp({
                            el :element /* Document.body */,
                            model : viewModel
                        });

                        // 编辑客户基本信息
                        viewModel.event.clearDt(viewModel.customerdatanew);
                        var newr = viewModel.customerdatanew.createEmptyRow();
                        viewModel.customerdatanew.setRowSelect(newr);
                        //新建判断
                        if(this.getUrlParams('lifestages')){
                            var lifestages = this.getUrlParams('lifestages');
                            if(lifestages == '0'){
                                $('#backUrl').html('&lt; 线索列表');
                                $('#backUrl').prop('href','#/customer/customer?lifestages=0');
                            }
                        }else{
                            $('#backUrl').html('&lt; 客户列表');
                            $('#backUrl').prop('href','#/customer/customer');
                        }
                        if(this.getUrlParams('id')){
                            var billid = this.getUrlParams('id');
                            viewModel.billid = billid;
                            id.push(billid);

                            //?????
                            // var newrow = viewModel.customerdatanew.getSelectedRows()[0];
                            // newrow.setValue('billid',billid);

                            this.loadList(id);
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

                    //分页相关
                    pageChange:function(){
                        viewModel.event.comps.on('pageChange', function (pageIndex) {
                            viewModel.draw = pageIndex + 1;
                            if(viewModel.page.url == 'loadFollowList'){
                                viewModel.event.loadFollowList();
                            }else if(viewModel.page.url == 'loadAllotList'){
                                viewModel.event.loadAllotList();
                            }else{
                                viewModel.event.loadList();
                            }
                        });
                    },
                    sizeChange:function(){
                        viewModel.event.comps.on('sizeChange', function (arg) {
                            viewModel.pageSize = parseInt(arg);
                            viewModel.draw = 1;
                            if(viewModel.page.url == 'loadFollowList'){
                                viewModel.event.loadFollowList();
                            }else if(viewModel.page.url == 'loadAllotList'){
                                viewModel.event.loadAllotList();
                            }else{
                                viewModel.event.loadList();
                            }
                        });
                    },
					// 加载 客户列表
					loadList:function(obj){
                        var jsonData={
                            pageIndex:viewModel.draw-1,
                            pageSize:viewModel.pageSize,
                            // sortField:"createtime",
                            // sortDirection:"desc"
                        };
                        // 搜索
                        $(element).find("#search").each(function(){
                            if(this.value == undefined || this.value =='' || this.value.length ==0 ){
                                //不执行操作
                            }else{
                                jsonData['search_searchParam'] =  this.value.replace(/(^\s*)|(\s*$)/g, "");  //去掉空格
                            }
                        });
                        if(obj){ //传billid 查看交易详情
                            if(obj!=''||obj.length!=0){
                                jsonData['search_billid'] = obj.join();
                            }
                        }
                        $.ajax({
                            type : 'get',
                            url : viewModel.customerListUrl,
                            dataType : 'json',
                            data:jsonData,
                            contentType: 'application/json;charset=utf-8',
                            success : function(res) {
                                if(res){
                                    if( res.success =='success'){
                                        var newrow = viewModel.customerdatanew.getSelectedRows()[0];
                                        var data = res.detailMsg.data.content[0];
                                        if(data.nps)$('#add_nps').val(data.nps);
                                        if(data.state=='5')$('#add_visitstate').prop({'checked':true,'disabled':true});
                                        newrow.setSimpleData(data);
                                        var sourcetype0 = data.sourcetype0;
                                        var sourcetype = data.sourcetype;
                                        var sourcetype1 = data.sourcetype1;
                                        if(sourcetype0){
                                           for(var item of viewModel.sourceList0){
                                               if(item.name == sourcetype0){
                                                   viewModel.sourceList = item.children;
                                                   var combo1Obj = document.getElementById('combobox_sourcetype')['u.Combo'];
                                                   combo1Obj.setComboData(viewModel.sourceList);
                                                   break;
                                               }
                                           }
                                            newrow.setValue('sourcetype0',sourcetype0);

                                            if(sourcetype){
                                               for(var item of viewModel.sourceList){
                                                   if(item.name == sourcetype){
                                                       viewModel.sourceList1 = item.children;
                                                       var combo1Obj = document.getElementById('combobox_sourcetype1')['u.Combo'];
                                                       combo1Obj.setComboData(viewModel.sourceList1);
                                                       break;
                                                   }
                                               }
                                               newrow.setValue('sourcetype',sourcetype);

                                               if(sourcetype1){
                                                   newrow.setValue('sourcetype1',sourcetype1);
                                               }
                                           }

                                        }
                                        if(data.billbid){
                                            viewModel.billbid = data.billbid;
                                            $('#resumebtn').show();
                                        }

                                        // 重新施工是否可用
                                        // if(data.state==0){
                                            $("#resumebtn").addClass('bg_blue').removeClass('bg_gray').removeClass('c_nopointer');
                                        // }

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

                    // 保存
                    saveClick:function(){
                        var data = viewModel.customerdatanew.getSelectedRows()[0].getSimpleData();
                        if (!viewModel.app.compsValidate($('#add-form')[0])) {
                            return;
                        }
                        data.phone = $.trim(data.phone);
                        data.linkphone = $.trim(data.linkphone);
                        viewModel.event.save(data);
                    },
                    save:function(data){
                        var params = window.location.hash.split('?')[1];
                        if(params){ //新建线索  或 查看详情
                            if(params.indexOf('lifestages') != -1){
                                var lifestages = params.split('=')[1];
                                if(lifestages == '0'){
                                   data['lifestages'] = '0';
                                   viewModel.customerDetailUrl = ctx + '/#/customer/customer?lifestages=0';
                                }
                                //查看详情时不做更改
                            }else if(params.indexOf('id') != -1){
                                var lifestages = data.lifestages;
                                if(lifestages == '0'){
                                    $('#backUrl').html('&lt; 线索列表');
                                    $('#backUrl').prop('href','#/customer/customer?lifestages=0');
                                    viewModel.customerDetailUrl = ctx + '/#/customer/customer?lifestages=0';
                                }else{
                                    $('#backUrl').html('&lt; 客户列表');
                                    $('#backUrl').prop('href','#/customer/customer');
                                    viewModel.customerDetailUrl = ctx + '/#/customer/customer';
                                }
                            }
                        }else{
                            data['lifestages'] = '1';
                        }

                        var list=viewModel.event.genDataList(data);
                        $.ajax({
                            type : 'post',
                            url : viewModel.customerAddUrl,
                            dataType : 'json',
                            contentType : "application/json",
                            data : JSON.stringify(list),
                            success : function(res) {
                                if(res){
                                    if( res.success =='success' && res.detailMsg){
                                        // var customerid = res.detailMsg.data.customerid;
                                        // var houseid = res.detailMsg.data.houseid;
                                        // var billid = res.detailMsg.data.billid;
                                        // var state = res.detailMsg.data.state;
                                        // viewModel.billid = billid;
                                        // if(customerid && houseid && billid){
                                       		//
                                            // var newrow = viewModel.customerdatanew.getSelectedRows()[0];
                                            // newrow.setValue('customerid',customerid);
                                            // newrow.setValue('houseid',houseid);
                                            // newrow.setValue('billid',billid);
                                            // newrow.setValue('state',state);
                                        // }
                                        $vue.$message({
    showClose: true,
    message: '保存成功!',
    type: 'success',
    offset: '60'
});
                                        window.location.href= viewModel.customerDetailUrl;
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

                    // 获取跟进列表
                    loadFollowList:function () {
                        // var dealid = 'e8db5c53-fc97-4aeb-82d6-69b3720cb88b';
                        var billid = viewModel.billid;
                        var jsonData={
                            pageIndex:viewModel.draw-1,
                            pageSize:viewModel.pageSize,
                            sortField:"d.ts",
                            sortDirection:"desc",//时间降序
                            "search_dealid":billid
                        };
                        $.ajax({
                            type:'get',
                            url : viewModel.followListUrl,
                            dataType : 'json',
                            data:jsonData,
                            contentType: 'application/json;charset=utf-8',
                            success : function(res) {
                                // var data  = res.detailMsg.data;
                                // var arr = [];
                                // arr.push(data);
                                // viewModel.followupdata.setSimpleData(arr);

                                if(!res.detailMsg.data){
                                    viewModel.totleCount=0;
                                    viewModel.totlePage=1;
                                    viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
                                    viewModel.followupdata.removeAllRows();
                                    viewModel.followupdata.clear();
                                }else{
                                    viewModel.totleCount=res.detailMsg.data.totalElements;
                                    viewModel.totlePage=res.detailMsg.data.totalPages;
                                    viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
                                    viewModel.followupdata.removeAllRows();
                                    viewModel.followupdata.clear();
                                    viewModel.followupdata.setSimpleData(res.detailMsg.data.content,{unSelect:true});
                                }

                            }
                        });
                    },
                    // 添加跟进信息
                   addVisitClick:function () {
                        var billid = viewModel.billid;
                        var content = $('#add_visit').val();
                        if(!content||!billid){
                            if(!content){
                                $vue.$message({
                                    showClose: true,
                                    message: '请填写记录信息',
                                    type: 'warning'
                                });
                                // u.messageDialog({msg:'请先选择一个客户',title:'提示',btnText:'确定'});
                            }
                            return;
                        }
                        if($('#add_nps').val()!=''){
                            var nps=parseFloat($('#add_nps').val());
                        }else{
                            var nps=''
                        }
                        if($('#add_visitstate')[0].checked){
                            var visitstate=1;
                        }else{
                            var visitstate=0;
                        }
                        $.ajax({
                            type:'get',
                            url : viewModel.followAddUrl,
                            dataType : 'json',
                            data:{
                                dealid:billid,
                                content:content,
                                nps:nps,
                                visitstate:visitstate
                            },
                            contentType: 'application/json;charset=utf-8',
                            success : function(res) {
                                // u.messageDialog({msg:'保存成功',title:'提示',btnText:'确定'});
                                viewModel.event.loadFollowList();
                                $('#add_follow').val("");
                                $('#add_visit').val("");
                            }
                        });
                    },
					// 添加跟进信息
                    addFollowClick:function () {
                        var billid = viewModel.billid;
                        if($('#add_follow').val()!=''){
                            var content = $('#add_follow').val();
                        }else{
                            var content = $('#add_visit').val();
                        }
                        if(!content||!billid){
                            if(!billid){
                                $vue.$message({
                                    showClose: true,
                                    message: '请先选择一个客户',
                                    type: 'warning'
                                });
                                // u.messageDialog({msg:'请先选择一个客户',title:'提示',btnText:'确定'});
                            }
                            return;
                        }
                        if($('#add_nps').val()!=''){
                            var nps=parseFloat($('#add_nps').val());
                        }else{
                            var nps=''
                        }
                        if(('#add_visitstate')[0].checked){
                            var visitstate=1;
                        }else{
                            var visitstate=0;
                        }
                        $.ajax({
                            type:'get',
                            url : viewModel.followAddUrl,
                            dataType : 'json',
                            data:{
                                dealid:billid,
                                content:content,
                            },
                            contentType: 'application/json;charset=utf-8',
                            success : function(res) {
                                // u.messageDialog({msg:'保存成功',title:'提示',btnText:'确定'});
                                viewModel.event.loadFollowList();
                                $('#add_follow').val("");
                                $('#add_visit').val("");
                            }
                        });
                    },
                    // 获取 分配日志
                    loadAllotList:function () {
                        var billid = viewModel.billid;
                        var jsonData={
                            pageIndex:viewModel.draw-1,
                            pageSize:viewModel.pageSize,
                            sortField:"",
                            sortDirection:"asc",
                            "search_dealid":billid
                        };
                        $.ajax({
                            type:'get',
                            url : viewModel.allotlistUrl,
                            dataType : 'json',
                            data:jsonData,
                            contentType: 'application/json;charset=utf-8',
                            success : function(res) {
                                if(!res.detailMsg.data){
                                    viewModel.totleCount=0;
                                    viewModel.totlePage=1;
                                    viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
                                    viewModel.allotdata.removeAllRows();
                                    viewModel.allotdata.clear();
                                }else{
                                    viewModel.totleCount=res.detailMsg.data.totalElements;
                                    viewModel.totlePage=res.detailMsg.data.totalPages;
                                    viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
                                    viewModel.allotdata.removeAllRows();
                                    viewModel.allotdata.clear();
                                    viewModel.allotdata.setSimpleData(res.detailMsg.data.content,{unSelect:true});
                                }

                            }
                        });
                    },

                    //修改客户状态
                    editStateClick:function(){
                        var row = viewModel.customerdatanew.getSelectedRows()[0];
                        var state = row.getValue('state');
                        var billid = viewModel.billid;
                        var note = $('#editStateMemo').val();
                        $.ajax({
                            type:'get',
                            url : viewModel.eidtStateUrl,
                            dataType : 'json',
                            data:{
                                billid:billid,
                                note:note,
                                state:state,
                            },
                            contentType: 'application/json;charset=utf-8',
                            success : function(res) {
                                viewModel.event.loadFollowList();
                                $('#editStateMemo').val("");
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
                    resumeClick:function () {
                        var msgTitle = '提示';
                        var msgContent = '是否继续施工?';
                        $vue.$confirm(msgContent, msgTitle, {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                          }).then(() => {
                                $.ajax({
                                    type:'post',
                                    url : viewModel.resumeUrl,
                                    dataType : 'json',
                                    data:{
                                        billid:viewModel.billid
                                    },
                                    // contentType: 'application/json;charset=utf-8',
                                    success : function(res) {
                                        if(res) {
                                            $vue.$message({
                                                showClose: true,
                                                message: '修改成功!',
                                                type: 'success',
                                                offset: '60'
                                            });
                                        }
                                    }
                                });
                          }).catch(() => {
                            $vue.$message({
                              type: 'info',
                              message: '已取消删除',
                              offset: '60'
                            });
                          });
                    },
                    closeClick:function(){
                    	$vue.$confirm('确定要关闭此客户？','提示',{
                    		confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                    	}).then(()=>{
                    		$.ajax({
                    			type: "post",
                    			url: viewModel.closeUrl,
                    			dataType: 'json',
                    			data:{
                                        billid:viewModel.billid,
                                        note :$("#add_visit").val()
                                    },
                               success:function(res){
                                    if(res.success == 'success'){
                                        $vue.$message({
                                            type: 'success',
                                            message: '已成功关闭',
                                            offset: '60'
                                        });
                                    }
                               }
                    		})
                    	}).catch(()=>{
                    		//alert(viewModel.billid)
                    		// $vue.$message({
                            //  type: 'info',
                            //  message: '已取消关闭',
                            //  offset: '60'
                            // });
                    	})
                    }
				},

		};

		$(element).html(html);
        // 绑定省列表
        viewModel.event.loadAddress();
		viewModel.event.pageInit();



        // 绑定地址触发
        viewModel.customerdatanew.on('valueChange', function(event){
            let filename = event.field;  // 改变的字段
            var oldValue = event.oldValue;
            var newValue = event.newValue;
            if(filename == 'province'){
                var row = viewModel.customerdatanew.getSelectedRows()[0];
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
                var row = viewModel.customerdatanew.getSelectedRows()[0];
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
            }else if(filename == 'sourcetype0'){
                /*var sourcetype1 = viewModel.sourceList1_temp?viewModel.sourceList1_temp[newValue]||'':'';
                var row = viewModel.customerdatanew.getSelectedRows()[0];
                if(newValue != oldValue){
                    row.setValue('sourcetype1','')
                }
                if(sourcetype1){
                    var combo1Obj = document.getElementById('combobox_sourcetype1')['u.Combo'];
                    combo1Obj.setComboData(sourcetype1);
                }else{
                    // var dd = viewModel.customerdatanew.getSelectedRows()[0].getSimpleData();
                    // row.setValue('sourcetype1',dd.sourcetype1);
                }*/
                var row = viewModel.customerdatanew.getSelectedRows()[0];
                if(newValue != oldValue){
                    row.setValue('sourcetype','');
                    row.setValue('sourcetype1','');
                }
                for(var item of viewModel.sourceList0){
                    if(item.value == newValue){
                        viewModel.sourceList = item.children;
                        var combo1Obj = document.getElementById('combobox_sourcetype')['u.Combo'];
                        combo1Obj.setComboData(viewModel.sourceList);
                        break;
                    }
                }
            }else if(filename == 'sourcetype'){
                var row = viewModel.customerdatanew.getSelectedRows()[0];
                if(newValue != oldValue){
                    row.setValue('sourcetype1','');
                }
                for(var item of viewModel.sourceList){
                    if(item.value == newValue){
                        viewModel.sourceList1 = item.children;
                        var combo1Obj = document.getElementById('combobox_sourcetype1')['u.Combo'];
                        combo1Obj.setComboData(viewModel.sourceList1);
                        break;
                    }
                }
            }
        });

        // tab   切换
	    $('.u-tabs__tab').click(function () {
            var typer = $(this).attr('data-type');
            if(typer == 1){
                viewModel.page.url = 'loadList';
            }else if(typer == 2 ){
                //分页初始化
                var paginationDiv = $(element).find('#pagination_follow')[0];
                viewModel.event.comps=new u.pagination({el:paginationDiv,jumppage:true});
                viewModel.event.comps.update({pageSize: 5 });  //默认每页显示5条数据
                viewModel.event.pageChange();
                viewModel.event.sizeChange();
                viewModel.page.url = 'loadFollowList';
                viewModel.event.loadFollowList();
            }else if(typer == 3 ){
                //分页初始化
                var paginationDiv = $(element).find('#pagination_allot')[0];
                viewModel.event.comps=new u.pagination({el:paginationDiv,jumppage:true});
                viewModel.event.comps.update({pageSize: 5 });  //默认每页显示5条数据
                viewModel.event.pageChange();
                viewModel.event.sizeChange();
                viewModel.page.url = 'loadAllotList';
                viewModel.event.loadAllotList();
            }else if(typer == 4 ){
                //分页初始化
                var paginationDiv = $(element).find('#pagination_visit')[0];
                viewModel.event.comps=new u.pagination({el:paginationDiv,jumppage:true});
                viewModel.event.comps.update({pageSize: 5 });  //默认每页显示5条数据
                viewModel.event.pageChange();
                viewModel.event.sizeChange();
                viewModel.page.url = 'loadFollowList';
                viewModel.event.loadFollowList();
            }
        });

	}

	return {
		'template': html,
        init: init
	}

});
