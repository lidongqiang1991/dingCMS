define(['text!pages/order/order.html','css!pages/order/order','pages/order/ordermeta','uuigrid'], function(template) {

    //初始化方法,页面加载后被 调用
    var init=function  (element) {
        var viewModel = {
            app:{},
            /* 数据模型 */
            draw:1,
            totlePage:0,
            pageSize:15,
            totleCount:0,

            // 工程
            listUrl:ctx + '/order/page.do',
            detailUrl:ctx + '/order/detail.do',
            addUrl:ctx + '',
            delUrl:ctx + '',
            cancelUrl:ctx + '/order/cancel.do',
            // 运营中心，运营商列表
            orgOrAgentListUrl:ctx + "/org/agent.do",
             // 计划执行
            operateUrl:ctx + '/servicelist/allot.do',
            objdata:new u.DataTable(ordermeta),
            objdatanew:new u.DataTable(ordermeta),
            searchdatanew:new u.DataTable({
    			meta:{
    				 orgname: {type: 'string'},
    				 agentname: {type: 'string'},
    				 dr: {type: 'string'},
    			}
			}),
            operatedata:new u.DataTable(),

            // 筛选列表
            orgnameList:[
                {name: "全部运营中心", value: "-1"}
            ],
            agentnameList:[
                {name: "全部运营商", value: "-1"}
            ],
            agentnameList_temp:[
                {name: "全部运营商", value: "-1"}
            ],
            // 订单状态
            DRList:[
                {name: "全部订单", value: "-1"},
                {name: "有效", value: "0"},
                {name: "无效", value: "1"},
                {name: "报价", value: "2"}
            ],


            event:{
                pageInt:function () {
                    viewModel.app = u.createApp({
                        el:element,
                        model:viewModel
                    });
                    //隐藏
                    $(element).find('#returnBtn').hide();
                    //分页初始化
                    var paginationDiv = $(element).find('#pagination')[0];
                    this.comps=new u.pagination({el:paginationDiv,jumppage:true});
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

					this.loadList();
                },
                //反显筛选条件
                setSearchValue:function(){
                    var obj = sessionStorage['searchObj'];
                    if(obj){
                        var searchObj = JSON.parse(obj);
                        if(searchObj.type =='order'){
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
                    viewModel.event.loadList();
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
                //重置
                resetClick:function(){
                	viewModel.event.resetfilterclick(true);
                	viewModel.event.loadList();
                },
                resetfilterclick:function(bool){
                    var data = viewModel.searchdatanew.getSelectedRows()[0];
                    if(!data)return;
                    if(bool){
                        data.setValue('orgname','');
                        data.setValue('agentname','');
                        data.setValue('dr','');
                        data.setValue('startTime','');
                        data.setValue('endTime','');
                        viewModel.event.saveSearchObj("searchParam",$("#search").val());
                    }else{
                        var orgname = data.getValue('orgname');
                        var agentname = data.getValue('agentname');
                        if(agentname&&agentname!="-1") orgname = "-1";
                        var dr = data.getValue('dr');
                        var obj = {};
                        obj.search_orgname = orgname;
                        obj.search_agentname = agentname;
                        obj.search_dr = dr;
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
                },
                sizeChange:function(){
                    viewModel.event.comps.on('sizeChange', function (arg) {
                        viewModel.pageSize = parseInt(arg);
                        viewModel.draw = 1;
                        viewModel.event.saveSearchObj("pageIndex",viewModel.draw);
                        viewModel.event.saveSearchObj("pageSize",viewModel.pageSize);
                        viewModel.event.loadList();
                    });
                },
                //加载 工程列表
                loadList:function(obj,filter){
                    var jsonData={
                        pageIndex:viewModel.draw-1,
                        pageSize:viewModel.pageSize,
                        sortField:"bo.createtime",
                        sortDirection:"desc",
                        search_startTime : viewModel.searchdatanew.getValue("startTime"),
						search_endTime : viewModel.searchdatanew.getValue("endTime")
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
                            jsonData['search_orderid'] = obj.join();
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
                    $.ajax({
                        type : 'get',
                        url : viewModel.listUrl,
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
                                        viewModel.objdata.removeAllRows();
                                        viewModel.objdata.clear();
                                    }else{
                                        viewModel.totleCount=res.detailMsg.data.totalElements;
                                        viewModel.totlePage=res.detailMsg.data.totalPages;
                                        viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
                                        viewModel.objdata.removeAllRows();
                                        viewModel.objdata.clear();
                                        viewModel.objdata.setSimpleData(res.detailMsg.data.content,{unSelect:true});
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

                                viewModel.event.setSearchValue();
                                // var row = viewModel.searchdatanew.getSelectedRows()[0];
                                // row.setValue('orgname','-1');
                            }
                        }
                    })
                },

                // 渲染类型
				renderPayStatus : function(obj) {
					if (obj.value == 0||obj.value == null||obj.value == '') {
						var val = '未支付';
					} else if (obj.value == 1) {
						var val = '定金已支付';
					} else if (obj.value == 2) {
						var val = '全额已支付';
					}
					obj.element.innerHTML = val;
				},
                // 渲染男女
                renderTypeSex:function (obj) {
                    var val = obj.value == '1' ? '男' : (obj.value == '2' ? '女':'未知');
                    obj.element.innerHTML = val;
                },
                // 渲染有无校
                renderTypeDR:function (obj) {
                    var val = obj.value == 0?'有效':'无效';
                    if(obj.row.value.state ==1){
                        val = '报价单'
                    }
                    obj.element.innerHTML = val;
                },
				// 渲染详情
                renderTypeAjax:function (obj) {
                    var id = obj.row.value.billid;
                    var text = obj.value;
                    var html = "<a style='text-decoration: underline;' class='c_green' href='#/order/orderDetail?id="+ id +"'>" + text||'' + "</a>";
                    obj.element.innerHTML = html;
                },
                selectClick:function(){
                    var obj = viewModel.objdata.getSelectedRows()[0].getSimpleData();
                    if(obj.dr==0){
                        $("#operater").addClass("bg_blue").removeClass("c_no_pointer").removeClass('bg_gray');
                    }else{
                        $("#operater").removeClass("bg_blue").addClass("c_no_pointer").addClass("bg_gray");
                    }
                    if(obj.state==1){
                        $("#operater").removeClass("bg_blue").addClass("c_no_pointer").addClass("bg_gray");
                    }
                },
                //取消订单
                operateClick:function(){
                    if($("#operater").hasClass('c_no_pointer')){
                        return;
                    }
                    var row = viewModel.objdata.getSelectedRows()[0];
                    if(row){
                        viewModel.event.clearDt(viewModel.objdatanew);
                        viewModel.objdatanew.setSimpleData(viewModel.objdata.getSimpleData({type: 'select'}));
                        window.md = u.dialog({id:'operater',content:"#dialog_custserver",hasCloseMenu:false});
                    }else{
                        $vue.$message({
    showClose: true,
    message: '请选择要分配的数据！',
    type: 'warning',
    offset: '60'
});
                    }
                },

                //确定 取消订单
                confirm_operate:function () {
                    var reason = $("#operater_reason").val();
                    var row = viewModel.objdatanew.getSelectedRows()[0].getSimpleData();
                    if(reason){
                        $.ajax({
                            type:'post',
                            url:viewModel.cancelUrl,
                            data:{
                                orderid:row.billid,
                                reason:reason,
                                serviceid:row.serviceid
                            },
                            success:function () {
                                viewModel.event.cancel_operate();
                                viewModel.event.loadList();
                            }
                        });
                    }else{
                        $vue.$message({
                            showClose: true,
                            message: '请填写原因!',
                            type: 'warning',
                            offset: '60'
                        });
                    }
                },
                cancel_operate:function () {
                    md.close();
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
                    obj.type = 'order';
                    sessionStorage['searchObj'] = JSON.stringify(obj);
                },

            }
        };

        $(element).html(template);
        viewModel.event.pageInt();
        viewModel.event.orgOrAgentList();

        // 筛选条件
        viewModel.searchdatanew.on('valueChange', function(event){

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
        'template': template,
        'init': init
    };
});
