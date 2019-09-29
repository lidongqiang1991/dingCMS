define(['text!pages/customer/customer.html','css!pages/customer/customer','pages/customer/customermeta','uuigrid'],function(html) {
	var init = function(element){

		var viewModel = {
				app:{},
				/* 数据模型 */
				draw:1,
				totlePage:0,
				pageSize:15,
				totleCount:0,

                // 获取 客户列表
            	customerListUrl:ctx + '/custlist/page.do',
                // 客户详情页参数
                customerDetailUrl : '/#/customer/customerDetail',
                //保存选中客户信息
                customerAddUrl:ctx + '/custlist/save.do',
                //保存 -- 分配
            	customerSaveUrl:ctx + '/custlist/addallot.do',


            // 获取所有的场景
            getFilterUrl:ctx + '/advanfilter/queryall.do',
            getFilterDetailUrl:ctx + '/advanfilter/queryfilter.do',
            saveFilterUrl:ctx + '/advanfilter/savefilter.do',
            delFilterUrl:ctx + '/advanfilter/deluser.do',
            //获取筛选条件
            getTypeFilterUrl: ctx + '/advanfilter/pagesys.do',
            //场景所属页面
            sceneType:'customer',
            search_filterid:'',
            search_filter:'',


                //分配运营商的数据
                allotObj:{},

            	importFileUrl:ctx + '',

                // 跟进分配  列表
                agentlisturl:ctx + "/agent/page.do",

                // 运营中心，运营商列表
                orgOrAgentListUrl:ctx + "/org/agent.do",

				/* 列表 */
				customerdata : new u.DataTable(metacustomer),

				/* 编辑框 数据 */
				customerdatanew : new u.DataTable(metacustomer),

				// 筛选 数据
                searchdatanew:new u.DataTable(metacustomer),

                // 分配列表
                agentData: new u.DataTable(metaagent),

                orgnameList:[
                    {name: "全部运营中心", value: "-1"},
                    {name: "无运营中心", value: "none"}
                ],
                lifestagesList:[
                    {name: "全部", value: "-1"},
                    {name: "线索", value: "0"},
                    {name: "客户", value: "1"}
                ],
                agentnameList:[{
                    name: "全部运营商",
                    value: "-1"
                }],
                agentnameList_temp:[
                    {name: "全部运营商", value: "-1"},
                ],
                sourceList:[
                    {name: "全部来源", value: "-1"},
                    {name: "400", value: "400"},
                    {name: "电商", value: "电商"},
                    {name: "网络搜索", value: "网络搜索"},
                    {name: "媒体广告", value: "媒体广告"},
                    {name: "推广活动", value: "推广活动"},
                    {name: "社群营销", value: "社群营销"},
                    {name: "转介绍", value: "转介绍"},
                    {name: "运营商", value: "运营商"},
                    {name: "今日头条", value: "今日头条"},
                    {name: "U会员", value: "U会员"},
                    {name: "齐家网", value: "齐家网"},
                ],
                sourceList1:[],
                sourceList1_temp:{
                    "400":[
                        {name: "8966",value:"8966"},
                        {name: "5756",value:"5756"},
                    ],
                    "电商":[
                        {name: "天猫",value:"天猫"},
                        {name: "京东",value:"京东"},
                        {name: "拼多多",value:"拼多多"},
                    ],
                    "网络搜索":[
                        {name: "百度",value:"百度"},
                        {name: "官网",value:"官网"},
                        {name: "其他",value:"其他"},
                    ],
                    "媒体广告":[
                        {name: "今日头条",value:"今日头条"},
                        {name: "齐家网",value:"齐家网"},
                        {name: "腾讯-朋友圈",value:"朋友圈"},
                        {name: "抖音",value:"抖音"},
                        {name: "微博",value:"微博"},
                        {name: "电台",value:"电台"},
                        {name: "微信",value:"微信"},
                        {name: "其他",value:"其他"},
                        {name: "百度",value:"百度"},
                        {name: "腾讯",value:"腾讯"},
                        {name: "抖音",value:"抖音"},
                    ],
                    "推广活动":[
                        {name: "U会员",value:"U会员"},
                        {name: "微信公众号",value:"微信公众号"},
                        {name: "短信",value:"短信"},
                        {name: "小区推广",value:"小区推广"},
                        {name: "其他",value:"其他"},
                        {name: "社区推广",value:"社区推广"},
                    ],
                    "社群营销":[
                        {name: "装修情报",value:"装修情报"},
                    ],
                    "转介绍":[
                        {name: "家人朋友介绍",value:"家人朋友介绍"},
                        {name: "雨虹公司介绍",value:"雨虹公司介绍"},
                        {name: "工队长介绍",value:"工队长介绍"},
                        {name: "家装公司介绍",value:"家装公司介绍"},
                        {name: "老客户介绍",value:"老客户介绍"},
                    ],
                    "运营商":[
                        {name: "自引单",value:"自引单"},
                        {name: "自建单",value:"自建单"},
                        {name: "工长介绍",value:"工长介绍"},
                        {name: "其他",value:"其他"},
                        {name: "网络搜索",value:"网络搜索"},
                        {name: "媒体广告",value:"媒体广告"},
                        {name: "微信",value:"微信"},
                        {name: "电商",value:"电商"},
                        {name: "雨虹公司内推",value:"雨虹公司内推"},
                        {name: "其他",value:"其他"},
                    ],
                    "今日头条":[
                        {name: "今日头条",value:"今日头条"},
                    ],
                    "腾讯":[
                        {name: "腾讯",value:"腾讯"},
                    ],
                    "百度":[
                        {name: "百度",value:"百度"},
                    ],
                    "短信":[
                        {name: "短信",value:"短信"},
                    ],

                },
                channelList:[   //推广平台
                    {name: "U会员", value: "U会员"},
                    {name: "今日头条", value: "今日头条"},
                    {name: "天猫", value: "天猫"},
                    {name: "京东", value: "京东"},
                    {name: "百度", value: "百度"},
                    {name: "朋友圈", value: "朋友圈"}
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

				event:{
                    //页面初始化
                    pageInit : function() {
                        id=[];
                        viewModel.app = u.createApp({
                            el :element /* Document.body */,
                            model : viewModel
                        });
                        //隐藏
                        $(element).find('#returnBtn').hide();
                        var params = window.location.hash.split('?')[1];
                        if(params){
                            $(".lifestagesShow").removeClass('c_hide');
                            $(".createShow").removeClass('c_hide');
                            $(".orderShow").addClass('c_hide');
                        }else{
                            $(".lifestagesShow").addClass('c_hide');
                            $(".createShow").addClass('c_hide');
                            $(".orderShow").removeClass('c_hide');
                        }

                        //分页初始化
                        var paginationDiv = $(element).find('#pagination')[0];
                        this.comps=new u.pagination({el:paginationDiv,jumppage:true});
                        var paginationDiv = $(element).find('#pagination_allot')[0];
                        this.comps1=new u.pagination({el:paginationDiv,jumppage:true});
                        // this.comps.update({pageSize: 10 });  //默认每页显示5条数据
                        viewModel.event.pageChange();
                        viewModel.event.sizeChange();

                        //回车搜索
                        $('.input_enter').keydown(function(e){
                            if(e.keyCode==13){
                                viewModel.event.searchClick();
                                u.stopEvent(e);
                            }
                        });

                        // 初始化筛选
                        viewModel.event.clearDt(viewModel.searchdatanew);
                        viewModel.searchdatanew.clear();
                        var newr = viewModel.searchdatanew.createEmptyRow();
                        viewModel.searchdatanew.setRowSelect(newr);


                    },
                    //反显筛选条件
                    setSearchValue:function(){
                        var obj = sessionStorage['searchObj'];
                        if(obj){
                            var searchObj = JSON.parse(obj);
                            if(searchObj.type =='customer'){
                                var obj_new = viewModel.searchdatanew.getSelectedRows()[0];
                                for(var key in searchObj){
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
                                var params = window.location.hash.split('?')[1];
                                if(params){
                                    obj_new.setValue('startTime3',"");
                                    obj_new.setValue('endTime3',"");
                                }else{
                                    obj_new.setValue('startTime1',"");
                                    obj_new.setValue('endTime1',"");
                                    obj_new.setValue('lifestages',"");
                                }
                            }else{
                                sessionStorage['searchObj'] = "";
                            }
                        }
                        if(searchObj&&searchObj["searchParam"]){
                            this.loadList('',{
                                'search_searchParam':searchObj.searchParam
                            });
                        }else{
                            var obj = viewModel.event.resetfilterclick(false);
                            this.loadList('',obj);
                        }
                    },
                    //清除datatable数据
                    clearDt: function (dt) {
                        dt.removeAllRows();
                        dt.clear();
                    },

                    // 搜索
                    searchClick:function(){
                    	$(element).find('#returnBtn').show();
                        viewModel.event.resetfilterclick(true);
                        viewModel.draw = 1;
                        viewModel.event.loadList(id);
                    },
                    //返回初始化点击
					returnClick : function  () {
					  $(element).find('#returnBtn').hide();
					  $("#search").val('');
					  sessionStorage['searchObj'] = '';
					  viewModel.event.loadList();
					},
                    // 筛选
                    filterClick:function(){
                        $("#search").val('');
                        viewModel.event.saveSearchObj('searchParam','');
                        var obj = viewModel.event.resetfilterclick(false);
                        viewModel.event.loadList('',obj);
                    },
                    resetClick:function(){
                    	viewModel.event.resetfilterclick(true);
                    	viewModel.event.loadList(id);
                    },
                    // 重置 筛选条件
                    resetfilterclick:function(bool){
                        var data = viewModel.searchdatanew.getSelectedRows()[0];
                        if(!data)return;
                        if(bool){
                            data.setValue('orgname','');
                            data.setValue('agentname','');
                            data.setValue('sourcetype','');
                            data.setValue('sourcetype1','');
                            data.setValue('state','');
                            data.setValue('lifestages','');
                            data.setValue('startTime1','');
                            data.setValue('endTime1','');
                            data.setValue('startTime2','');
                            data.setValue('endTime2','');
                            data.setValue('startTime3','');
                            data.setValue('endTime3','');
                            viewModel.event.saveSearchObj("searchParam",$("#search").val());
                        }else{
                            var orgname = data.getValue('orgname');
                            var agentname = data.getValue('agentname');
                            if(agentname&&agentname!="-1") orgname = "-1";
                            var sourcetype = data.getValue('sourcetype');
                            var sourcetype1 = data.getValue('sourcetype1');
                            var state = data.getValue('state');
                            var lifestages = data.getValue('lifestages');
                            var startTime1 = data.getValue('startTime1');
                            var endTime1 = data.getValue('endTime1');
                            var startTime2 = data.getValue('startTime2');
                            var endTime2 = data.getValue('endTime2');
                            var startTime3 = data.getValue('startTime3');
                            var endTime3 = data.getValue('endTime3');
                            var obj = {};
                            obj.search_orgname = orgname;
                            obj.search_agentname = agentname;
                            obj.search_sourcetype = sourcetype;
                            obj.search_sourcetype1 = sourcetype1;
                            obj.search_state = state;
                            obj.search_lifestages = lifestages;
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
                    pageChange:function(){
                        viewModel.event.comps.on('pageChange', function (pageIndex) {
                            viewModel.draw = pageIndex + 1;
                            viewModel.event.saveSearchObj("pageIndex",viewModel.draw);
                            viewModel.event.loadList();
                        });
                        viewModel.event.comps1.on('pageChange', function (pageIndex) {
                            viewModel.draw = pageIndex + 1;
                            viewModel.event.loadagentlist();
                        });
                    },
                    sizeChange:function(){
                        viewModel.event.comps.on('sizeChange', function (arg) {
                            viewModel.pageSize = parseInt(arg);
                            viewModel.draw = 1;
                            viewModel.event.saveSearchObj("pageIndex",viewModel.draw);
                            viewModel.event.saveSearchObj("pageSize",viewModel.pageSize);
                            viewModel.event.loadList();
                        });
                        viewModel.event.comps1.on('sizeChange', function (arg) {
                            viewModel.pageSize = parseInt(arg);
                            viewModel.draw = 1;
                            viewModel.event.loadagentlist();
                        });
                    },
					// 加载 客户列表
					loadList:function(obj,filter){
                        var jsonData={
                            pageIndex:viewModel.draw-1,
                            pageSize:viewModel.pageSize,
                            sortField:"d.createtime",
                            sortDirection:"desc",
                            search_filterid:viewModel.search_filterid,
                            search_filter:viewModel.search_filter,
                        };
                        // 搜索
                        $(element).find("#search").each(function(){
                            if(this.value == undefined || this.value =='' || this.value.length ==0 ){
                                //不执行操作
                            }else{
                                jsonData['search_searchParam'] =  this.value.replace(/(^\s*)|(\s*$)/g, "");  //去掉空格
                            }
                        });
                        // 根据id获取
                        if(obj){
                            if(obj!=''||obj.length!=0){
                                jsonData['search_customerid'] = obj.join();
                            }
                        }
                        // 根据条件筛选
                        if(filter){
                            if(filter!=''||filter.length!=0){
                                // jsonData['search_'+ filter.key ] = filter[key];
                                u.extend(jsonData,filter);
                            }
                        }else{
                            var filterobj = viewModel.event.resetfilterclick(false);
                            u.extend(jsonData,filterobj);
                        }

                        //url参数
                        var params = window.location.hash.split('?')[1];
                        if(params){
                            if(params.indexOf('lifestages') != -1){
                                var lifestages = params.split('=')[1];  //var soucetype = 'uhuiyuan';
                                if(lifestages == '0'){
                                    // jsonData['search_lifestages'] = '0';
                                    /*$('#sourcetype').hide();
                                    $('#channel').show();*/
                                    $('#reAllot').hide();
                                    $('#become').show();
                                    $('#title').html('线索列表');
                                    viewModel.customerDetailUrl = '/#/customer/customerDetail?lifestages=0';
                                }
                            }
                        }else{
                            $('#title').html('客户列表');
                            jsonData['search_lifestages'] = '1';
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
                                        if(!res.detailMsg.data){
                                            viewModel.totleCount=0;
                                            viewModel.totlePage=1;
                                            viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
                                            viewModel.customerdata.removeAllRows();
                                            //viewModel.customerdata.clear();
                                        }else{
                                            viewModel.totleCount=res.detailMsg.data.totalElements;
                                            viewModel.totlePage=res.detailMsg.data.totalPages;
                                            viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
                                            viewModel.customerdata.removeAllRows();
                                            //viewModel.customerdata.clear();
                                            viewModel.customerdata.setSimpleData(res.detailMsg.data.content,{unSelect:true});
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
                                    viewModel.agentnameList = agent_arr;

                                    viewModel.event.setSearchValue();

                                    // var row = viewModel.searchdatanew.getSelectedRows()[0];
                                    // row.setValue('orgname','-1');
                                }
                            }
                        })
                    },

					// 新建
                    addClick:function(){
                        window.location.href = ctx + viewModel.customerDetailUrl;

                    },

					// 批量导入
                    importClick:function(e){
                        window.md = u.dialog({id:'import_file',content:"#dialog_content_file",hasCloseMenu:true});
					},
                    saveFileClick:function(e){
                        var form = new FormData(); // FormData 对象
                    	var fileObj = document.getElementById("addfile").files[0];
                        form.file = fileObj;

                        xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
                        xhr.open("post", viewModel.importFileUrl, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
                        xhr.onload = uploadComplete; //请求完成
                        xhr.send(form); //开始上传，发送form数据
                        //上传成功响应
                        function uploadComplete(evt) {
                            //服务断接收完文件返回的结果

                            var data = JSON.parse(evt.target.responseText);
                            if(data.success) {
                                $('#addfile').val('');
                                md.close();
                            }else{
                                $vue.$message({
                                    showClose: true,
                                    message: '上传失败！',
                                    type: 'error',
                                    offset: '60'
                                });
                            }

                        }

					},
                    cancelFileClick:function () {
                        md.close();
                    },


					// 查看详情
                    selectClick:function(e){
                        // var data = viewModel.customerdata.getSelectedRows()[0];
                        // var billid = data.getValue('billid');
                        // var billid = e.rowObj.value.billid;
                        // if(billid){
                    	 //    window.location.href = ctx + "#/customer/customerDetail?id="+billid;
                        // }
                        //双击选中
                        // var index = e.rowIndex;
                        // viewModel.customerdata.setRowSelect(index);
					},
					 // 渲染状态
                    renderTypeState:function (obj) {
                    	var val;
                    	if (obj.value == '0') {
                            //val='<font  color="red">待确认</font>';
                            val='<font class="u-badge u-badge-primary" data-badge="待确认"></font>';
                    	} else if(obj.value == '1'){
                            //val='<font  color="red">待分配</font>';
                            val='<font class="u-badge u-badge-primarys" data-badge="待分配"></font>';
                    	} else if(obj.value == '2'){
                            //val='<font  color="green">已分配</font>';
                            val='<font class="u-badge u-badge-info" data-badge="已分配"></font>';
                    	} else if(obj.value == '3'){
                            //val='<font  color="">已结束</font>';
                            val='<font class="u-badge u-badge-danger" data-badge="已结束"></font>';
                    	} else if(obj.value == '4'){
                            //val='<font  color="">待回访</font>';
                    		val='<font class="u-badge u-badge-warning" data-badge="待回访"></font>';
                    	} else if(obj.value == '5'){
                            //val='<font  color="red">已回访</font>';
                            val='<font class="u-badge u-badge-success" data-badge="已回访"></font>';
                    	} else if(obj.value == '6'){
                            //val='<font  color="red">已关闭</font>';
                            val='<font class="u-badge u-badge-dark" data-badge="已关闭"></font>';
                    	} else if(obj.value == '10'){
                            //val='<font  color="red">已关闭</font>';
                            val='<font class="u-badge u-badge-danger" data-badge="已删除"></font>';
                        } else{
                    		val='未知';
                    	};
                        obj.element.innerHTML = val;
                    },
                    // 渲染男女
                    renderTypeSex:function (obj) {
                    	var val;
                    	if (obj.value == '1') {
                    		val='男';
                    	} else if(obj.value == '2'){
                    		val='女';
                    	}else{
                    		val='未知';
                    	};
                        obj.element.innerHTML = val;
                    },
                    // 渲染线索状态
                    renderLifestages:function (obj) {
                    	var val;
                    	if (obj.value == '0') {
                            val='<font class="u-badge u-badge-primary" data-badge="线索"></font>';
                    	} else if(obj.value == '1'){
                            val='<font class="u-badge u-badge-success" data-badge="客户"></font>';
                    	}else{
                    		val='未知';
                    	};
                        obj.element.innerHTML = val;
                    },
                    // 添加点击查看详情
                    renderTypeAjax:function (obj) {
                        var id = obj.row.value.billid;
                        var text = obj.value;
                        var params = window.location.hash.split('?')[1];
                        if(params) {
                            var html = "<a title='"+text+"' class='c_green' style='text-decoration: underline;' href='#/customer/customerDetail?lifestages=0&id="+ id +"'>" + text||id + "</a>";
                        }else{
                            var html = "<a title='" + text + "' class='c_green' style='text-decoration: underline;' href='#/customer/customerDetail?id=" + id + "'>" + text || id + "</a>";
                        }
                        obj.element.innerHTML = html;
                    },
                    // 跟进分配列表
                    loadagentlist:function(){
                        var jsonData={
                            pageIndex:viewModel.draw-1,
                            pageSize:viewModel.pageSize,
                            sortField:"",
                            sortDirection:"",
                        };
                        $.ajax({
                            type : 'get',
                            url : viewModel.agentlisturl,
                            dataType : 'json',
                            data:jsonData,
                            contentType: 'application/json;charset=utf-8',
                            success : function(res) {
                                if(res){
                                    if( res.success =='success'){
                                        if(!res.detailMsg.data){
                                            viewModel.totleCount=0;
                                            viewModel.totlePage=1;
                                            viewModel.event.comps1.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
                                            viewModel.agentData.removeAllRows();
                                            viewModel.agentData.clear();
                                        }else{
                                            viewModel.totleCount=res.detailMsg.data.totalElements;
                                            viewModel.totlePage=res.detailMsg.data.totalPages;
                                            viewModel.event.comps1.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
                                            viewModel.agentData.removeAllRows();
                                            viewModel.agentData.clear();
                                            viewModel.agentData.setSimpleData(res.detailMsg.data.content,{unSelect:true});
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
                    // 跟进分配
                    allotClick:function () {
                        var row = viewModel.customerdata.getSelectedRows()[0];
                        var row2 = viewModel.agentData.getSimpleData();
                        if(row && row2){
                        	// var state = Number(row.getValue('state'));
	                        // if(state > 1){
	                        //     u.messageDialog({msg:"该客户已分配",title:'提示',btnText:'确定'});
	                        //     return;
	                        // }
                            viewModel.customerdatanew.setSimpleData(viewModel.customerdata.getSimpleData({type: 'select'}));
                            window.md = u.dialog({id:'allot_man',content:"#dialog_allot",hasCloseMenu:true});
                        }else{
                            $vue.$message({
                                showClose: true,
                                message: '请选择要重新分配的数据',
                                type: 'warning',
                                offset: '60'
                            });
                            $vue.$message({
                                showClose: true,
                                message: '请选择要分配的数据！',
                                type: 'warning',
                                offset: '60'
                            });
                        }
                    },
                    // 分配确认
                    confirmallot:function () {
                        var row = viewModel.agentData.getSelectedRows()[0];
                        var newrow = viewModel.customerdata.getSelectedRows()[0];
                        if(row){
                            var state  = newrow.getValue('state');
                            var obj = {
                                agentid:row.getValue('agentid'),
                                dealid:newrow.getValue('billid')
                            };
                            if(state>1){
                                viewModel.allotObj = obj;
                                viewModel.event.cancelallot();
                                $("#allot_reason").val('');
                                window.md = u.dialog({id:'confirm_select_material',content:"#dialog_reason",hasCloseMenu:false});
                            }else{
                                viewModel.event.allotFunction(obj);
                            }
                        }else{
                            $vue.$message({
                                showClose: true,
                                message: '请至少选择一个',
                                type: 'warning',
                                offset: '60'
                            });
                        }
                    },
                    allotFunction:function(obj){
                        $.ajax({
                            type : 'post',
                            url : viewModel.customerSaveUrl,
                            // dataType : 'json',
                            data : obj,
                            success : function(res) {
                                if(res){
                                    if( res.success =='success'){
                                        $vue.$message({
                                            showClose: true,
                                            message: '保存成功!',
                                            type: 'success',
                                            offset: '60'
                                        });
                                        viewModel.event.loadList();
                                        viewModel.event.cancelallot();
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
                    cancelallot:function () {
                        md.close();
                    },
                    //转化客户确认
                    becomeClick:function(){
                        //var row = viewModel.customerdata.getSelectedRows()[0].getSimpleData();
                        var row = viewModel.customerdata.getSelectedRows()[0];
                        if(row){
                            var name = row.data.name.value;
                            var data = viewModel.customerdata.getSelectedRows()[0].getSimpleData();
                            data['lifestages'] = '1';
                            var datalist = [];
                            datalist.push(data);
                            data = datalist;
                            $vue.$confirm("是否将线索\""+ name +"\"转为客户？", '转为客户', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                $.ajax({
                                    type : 'post',
                                    url : viewModel.customerAddUrl,
                                    dataType : 'json',
                                    contentType : "application/json",
                                    data : JSON.stringify(data),
                                    success : function(res) {
                                        if(res){
                                            if( res.success =='success' && res.detailMsg){
                                                //window.location.href='#/customer/customer';
                                                viewModel.event.loadList();
                                                $vue.$message({
                                                    type: 'success',
                                                    message: '转化成功!',
                                                    offset: '60'
                                                });
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
                            }).catch(() => {
                                $vue.$message({
                                    type: 'info',
                                    message: '已取消',
                                    offset: '60'
                                });
                            });
                        }else{
                            $vue.$message({
                                showClose: true,
                                message: '请选择要转为客户的线索',
                                type: 'warning',
                                offset: '60'
                            });
                            // u.messageDialog({msg:'请选择要转为客户的线索',title:'操作提示',btnText:'确定'});
                        }
                    },
                    //删除线索
                    delClick:function(){
                        var row = viewModel.customerdata.getSelectedRows()[0];
                        if(row){
                            var name = row.data.name.value;
                            var data = viewModel.customerdata.getSelectedRows()[0].getSimpleData();
                            data['state'] = '10';
                            var datalist = [];
                            datalist.push(data);
                            data = datalist;
                            var msgTitle = '删除线索确认';
                            var msgContent = "是否确认删除\""+ name +"\"这条线索？";

                            $vue.$confirm(msgContent, msgTitle, {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                              }).then(() => {
                                $.ajax({
                                    type : 'post',
                                    url : viewModel.customerAddUrl,
                                    dataType : 'json',
                                    contentType : "application/json",
                                    data : JSON.stringify(data),
                                    success : function(res) {
                                        if(res){
                                            if( res.success =='success' && res.detailMsg){
                                                viewModel.event.loadList();
                                                $vue.$message({
                                                    showClose: true,
                                                    message: '线索删除成功！',
                                                    type: 'success',
                                                    offset: '60'
                                                });
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
                                message: '请选择要删除的线索',
                                type: 'warning',
                                offset: '60'
                            });
                            // u.messageDialog({msg:'请选择要删除的线索',title:'操作提示',btnText:'确定'});
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
                        obj.type = 'customer';
                        sessionStorage['searchObj'] = JSON.stringify(obj);
                    },

                    //重新分配原因 -- 确定
                    confirm_reason:function () {
                        var obj = viewModel.allotObj;
                        obj.reason = $("#allot_reason").val()||'';
                        if(!obj.reason){
                            $("#allot_reason").focus();
                            return;
                        }else{
                            md.close();
                        }
                        viewModel.event.allotFunction(obj);
                    },
                    cancel_reason:function () {
                        md.close();
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

				},

		};

		$(element).html(html);
		viewModel.event.pageInit();
		viewModel.event.loadagentlist();
        viewModel.event.orgOrAgentList();

		// 筛选条件
        viewModel.searchdatanew.on('valueChange', function(event){
            let filename = event.field;  // 改变的字段
            var oldValue = event.oldValue;
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
                            if(org[i].orgs && org[i].orgs.length>0) {
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
            }else if(filename == 'sourcetype') {
                var sourcetype1 = viewModel.sourceList1_temp ? viewModel.sourceList1_temp[newValue] || '' : '';
                var row = viewModel.searchdatanew.getSelectedRows()[0];
                if (newValue != oldValue) {
                    row.setValue('sourcetype1', '')
                }
                if (sourcetype1) {
                    sourcetype1 = sourcetype1.concat();
                    sourcetype1.unshift({name:'全部二级来源',value:'-1'});
                    var combo1Obj = document.getElementById('combobox_sourcetype1')['u.Combo'];
                    combo1Obj.setComboData(sourcetype1);
                } else {
                    var combo1Obj = document.getElementById('combobox_sourcetype1')['u.Combo'];
                    combo1Obj.setComboData([{name:'无二级来源',value:'-1'}]);
                }
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
                                a.push(arr[i].start,arr[i].end);
                                arr[i].value = a;
                            }else if(arr[i].formtype == 'org'){
                                arr[i].setting = viewModel.orgnameList;
                            }else if(arr[i].formtype == 'agent'){
                                arr[i].setting = viewModel.agentnameList;
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
                        that.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        that.checkError();
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
                        item.setting = this.copyArr(viewModel.orgnameList);
                    }else if(item.formtype == 'agent'){
                        item.setting = this.copyArr(viewModel.agentnameList);
                    }else{
                        item.setting = this.copyArr(obj.setting);
                    }
                    console.log(item);
                    this.checkError();
                },
                dateChange(item){
                    item.start  = item.value[0];
                    item.end  = item.value[1];
                    item.valueName = item.value;
                    if(item.formtype=='org'){
                        let obj = viewModel.orgnameList.find(oi=>{
                            return oi.value == item.value;
                        });
                        item.valueName = obj.name;
                    }else if(item.formtype=='agent'){
                        let obj = viewModel.agentnameList.find(oi=>{
                            return oi.value == item.value;
                        });
                        item.valueName = obj.name;
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
                    this.filters = this.copyObj(this.filters_temp);
                    var data = this.filters_temp;
                    let that = this;
                    let data_temp = this.copyObj(data);
                    for(let i=0,j=data_temp.id_filterfactor.length;i<j;i++){
                        data_temp.id_filterfactor[i].starttime = data_temp.id_filterfactor[i].start;
                        data_temp.id_filterfactor[i].endtime = data_temp.id_filterfactor[i].end;
                        data_temp.id_filterfactor[i] = this.removeKey(data_temp.id_filterfactor[i]);
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
                            viewModel.event.loadSceneList(function (res) {
                                let data = res.detailMsg.data||[];
                                that.scenelist = that.copyArr(data);
                            });
                        });
                    }else{
                        viewModel.search_filterid = '';
                        viewModel.search_filter = JSON.stringify(data_temp.id_filterfactor);
                        viewModel.event.loadList();
                    }
                    this.filters_temp.visible = false;
                    // console.log(JSON.stringify(this.filters_temp))
                },
                removeKey(obj){
                    let arr = ['type','field','id','filterid',"conditionlist","setting",'filtername','showname','formtype','conditions','value','starttime','endtime'];
                    for(var key in obj){
                        if(obj.formtype=='org'||obj.formtype=='agent'){
                            obj.setting = '';
                        }
                        for(let i=0,j=arr.length;i<j;i++){
                            if(arr.indexOf(key)==-1){
                                delete obj[key];
                            }
                        }
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
                    item.conditionName = obj.name;
                },
            },watch:{
                scene(val){
                    viewModel.search_filterid = val;
                    viewModel.search_filter = "";
                    viewModel.event.loadList();
                }
            },
            computed:{

            },
        })

	};

	return {
		'template': html,
        init: init
	};

});
