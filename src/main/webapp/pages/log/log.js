define(['text!pages/log/log.html', 'pages/log/logmeta', 'css!pages/log/log', 'uuitree', 'uuigrid','config/sys_const'], function (html) {

	//初始化方法,页面加载后被 调用
	var init = function(element, params) {
		//系统日志

		var loglistUrl = ctx + '/log/list.do';

		var viewModel = {
			app : {},
			/* 数据模型 */
			draw : 1,
			totlePage : 0,
			pageSize : 15,
			totleCount : 0,
			logtime : '',
			//展示数据
			logDa : new u.DataTable(metaLog),
			//编辑数据
			logDaNew : new u.DataTable(metaLog),
			// 筛选 数据
			searchdatanew : new u.DataTable(metadataLog),

			typeList : [{
				name : "所有时间段",
				value : "-1"
			}, {
				name : "近三天",
				value : "0"
			}, {
				name : "近一周",
				value : "1"
			}, {
				name : "近一月",
				value : "2"
			}, {
				name : "自定义时间段",
				value : "3"
			}],
			event : {
				//清除datatable数据
				clearDt : function(dt) {
					dt.removeAllRows();
					dt.clear();
				},
				//组装list
				genDataList : function(data) {

					var datalist = [];
					datalist.push(data);
					return datalist;
				},
				// 搜索
				searchClick : function() {
					viewModel.event.resetfilterclick(true);
					viewModel.draw = 1;
					viewModel.event.loadLogList(id);
				},
				//返回初始化点击
				returnClick : function  () {
					$(element).find('#returnBtn').hide();
				  	$("#search").val('');
				  	viewModel.event.loadLogList();
				},
				// 筛选    按钮事件
				filterClick:function(){
				$("#search").val('');
				var obj = viewModel.event.resetfilterclick(false);
				viewModel.event.loadLogList('',obj);
				},
				// 重置 筛选条件
                resetfilterclick:function(bool){

                    var data = viewModel.searchdatanew.getSelectedRows()[0];
                    if(!data)return;
                    if(bool){
                        data.setValue('type','');
                    }else{
                        var type = data.getValue('type');
                        var obj = {};
                        obj.search_type = type;
                        return obj;
                    }
                },
				//分页相关
				pageChange : function() {
					viewModel.event.comps.on('pageChange', function(pageIndex) {
						viewModel.draw = pageIndex + 1;
						viewModel.event.loadLogList();
						var typer = $(this).attr('data-type');
					});
				},
				sizeChange : function() {
					viewModel.event.comps.on('sizeChange', function(arg) {
						viewModel.pageSize = parseInt(arg);
						viewModel.draw = 1;
						viewModel.event.loadLogList();
						var typer = $(this).attr('data-type');
					});
				},
				//页面初始化
				pageInit : function() {
					$(element).find('#returnBtn').hide();
					$(element).find('#time').show();
				    $(element).find('#startTime').hide();
				    $(element).find('#endTime').hide();
				    $(element).find('#choose').hide();
					viewModel.app = u.createApp({
						el : element/* Document.body */,
						model : viewModel
					})
					//分页初始化
					var paginationDiv = $(element).find('#pagination')[0];
					this.comps = new u.pagination({
						el : paginationDiv,
						jumppage : true
					});
					this.comps.update({
						pageSize : 5
					});
					//默认每页显示5条数据
					viewModel.event.pageChange();
					viewModel.event.sizeChange();
					viewModel.event.loadLogList();
					//回车搜索
					$('.input_enter').keydown(function(e) {
						if (e.keyCode == 13) {
							viewModel.event.searchClick()
							u.stopEvent(e);
						}
					});

					// 搜索初始化
					viewModel.event.clearDt(viewModel.searchdatanew);
					var newr = viewModel.searchdatanew.createEmptyRow();
					viewModel.searchdatanew.setRowsSelect(newr);

					// 禁用详情页input
					$('#dialog_content_log input').attr('readonly','readonly');
				},
				//获取全部系统日志列表
				loadLogList : function() {
					var jsonData = {
						pageIndex : viewModel.draw - 1,
						pageSize : viewModel.pageSize,
						sortField : "ts",
						sortDirection : "desc",
						search_logtime : viewModel.logtime,
						search_startTime : viewModel.searchdatanew.getValue("startTime"),
						search_endTime : viewModel.searchdatanew.getValue("endTime")
					};
					//搜索框
					$(element).find("#search").each(function() {
						if (this.value == undefined || this.value == '' || this.value.length == 0) {
							//不执行操作
						} else {
							jsonData['search_searchParam'] = this.value.replace(/(^\s*)|(\s*$)/g, "");
							//去掉空格
						}
					});

					//搜索框
					$(element).find("#searchType").each(function() {
						if (this.value == undefined || this.value == '' || this.value == -1) {
							jsonData['search_logtime'] = -1;
							//不执行操作
						} else if (this.value == '近三天') {
							jsonData['search_logtime'] = 0;
							//去掉空格
						} else if (this.value == '近一周') {
							jsonData['search_logtime'] = 1;
							//去掉空格
						} else if (this.value == '近一月') {
							jsonData['search_logtime'] = 2;
							//去掉空格
						} else if (this.value == '所有时间段') {
							jsonData['search_logtime'] = -1;
							//去掉空格
						} else if (this.value == '自定义时间段') {
							jsonData['search_logtime'] = 3;
							//自定义 不选起止时间时 搜索全部
							if(!jsonData['search_startTime']){
								jsonData['search_startTime'] = new Date(0).toLocaleDateString();
							}
							if(!jsonData['search_endTime']){
								jsonData['search_endTime'] = new Date().toLocaleDateString();
							}
						}

					});

					//发送请求
					$.ajax({
						type : 'get',
						url : loglistUrl,
						dataType : 'json',
						data : jsonData,
						contentType : 'application/json;charset=utf-8',
						success : function(res) {
							if (res) {
								if (res.success == 'success') {
									if (!res.detailMsg.data) {
										viewModel.totleCount = 0;
										viewModel.totlePage = 1;
										viewModel.event.comps.update({
											totalPages : viewModel.totlePage,
											pageSize : viewModel.pageSize,
											currentPage : viewModel.draw,
											totalCount : viewModel.totleCount
										});
										viewModel.logDa.removeAllRows();
										viewModel.logDa.clear();
									} else {
										viewModel.totleCount = res.detailMsg.data.totalElements;
										viewModel.totlePage = res.detailMsg.data.totalPages;
										viewModel.event.comps.update({
											totalPages : viewModel.totlePage,
											pageSize : viewModel.pageSize,
											currentPage : viewModel.draw,
											totalCount : viewModel.totleCount
										});
										viewModel.logDa.removeAllRows();
										viewModel.logDa.clear();
										viewModel.logDa.setSimpleData(res.detailMsg.data.content, {
											unSelect : true
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
									// u.messageDialog({
									// 	msg : msg,
									// 	title : '请求错误',
									// 	btnText : '确定'
									// });
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
						error : function(er) {
							$vue.$message({
								showClose: true,
								message: '请求超时，请稍后重试！',
								type: 'error',
								offset: '60'
							});
						}
					})

				},
				//搜索点击
				searchClick : function() {
					$(element).find('#returnBtn').show();
					viewModel.draw = 1;
					viewModel.event.loadLogList();
				},
				//取消面板点击
				cancelManClick:function(){
					md.close();
				},
				//双击、触发行数据日志详情点击
				dblClick:function(e){

					var data = e.rowObj.value;
					$('#dialog_content_log').find('.u-msg-title').html("<h4>日志详情</h4>");
					viewModel.event.clearDt(viewModel.logDaNew);
					// var note = data.note;
					viewModel.logDaNew.setSimpleData(data);
					window.md = u.dialog({id:'add_material',content:"#dialog_content_log",hasCloseMenu:true});
				},
			}

		};
		$(element).html(html);
		viewModel.event.pageInit();
		// 绑定地址触发
        viewModel.searchdatanew.on('valueChange', function(event){


            var filename = event.field;  // 改变的字段
            // var oldValue = event.oldValue;
            var newValue = event.newValue;
            //全部判断
            if(newValue == 0){  // 近三天
            	viewModel.draw = 1;
			    viewModel.logtime = 0;
			    viewModel.event.loadLogList();
            }else if(newValue == 1){  // 近一周
            	viewModel.draw = 1;
			    viewModel.logtime = 1;
			    viewModel.event.loadLogList();
            }else if(newValue == 2){   //  近一月
            	viewModel.draw = 1;
			    viewModel.logtime = 2;
			    viewModel.event.loadLogList();
            }else if(newValue == -1){   //  所有时间段
            	viewModel.draw = 1;
			    viewModel.logtime = -1;
			    viewModel.event.loadLogList();
            }else if(newValue == 3){   //  自定义时间段
            	viewModel.draw = 1;
			    viewModel.logtime = 3;
			    //viewModel.event.loadLogList();
            }

			if(newValue == 3){
				$(element).find('#choose').show();
				$(element).find('#startTime').show();
				$(element).find('#endTime').show();
			}else if(newValue == '0' || newValue == 1 || newValue ==2 || newValue == -1 ){
				$(element).find('#choose').hide();
				$(element).find('#startTime').hide();
				$(element).find('#endTime').hide();
			}

		});

		if (u.isIE8) {
			$('.ie8-bg').css('display', 'block');
		};
	};
	return {
		'template' : html,
		init : init
	}
});
