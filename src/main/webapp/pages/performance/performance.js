define(['text!pages/performance/performance.html', 'css!pages/performance/performance', 'pages/performance/performancemeta', 'uuigrid'], function(template) {

	//初始化方法,页面加载后被 调用
	var init = function(element) {

		var viewModel = {
			app : {},
			/* 数据模型 */
			draw : 1,
			totlePage : 0,
			pageSize : 10,
			totleCount : 0,

			objListUrl : ctx + '/performance/perlist.do',
			objAddUrl : ctx + '/performance/perexamine',
			objDelUrl : ctx + '',
			/* 数据 */
			objdata : new u.DataTable(performancemeta),
			objdatanew : new u.DataTable(performancemeta),
			searchdatanew : new u.DataTable(performancemeta),
			/* 数据列表 */
			statusList : [{
				name : "全部状态",
				value : "-1"
			}, {
				name : "未审核",
				value : "0"
			}, {
				name : "审核已通过",
				value : "1"
			}, {
				name : "审核未通过",
				value : "2"
			}],
			timeList : [{
				name : "所有时间",
				value : "-1"
			}, {
				name : "近三天",
				value : "0"
			}, {
				name : "近7天",
				value : "1"
			}, {
				name : "近30天",
				value : "2"
			}, {
				name : "自定义",
				value : "3"
			}],
			//业绩类型
			performancetypeList:[
				{name : "全部状态",value : "-1"},
                {name:'屋面勘察',value:'581dd2f4-932e-4f64-996e-d033b673b9e8'},
                {name:'窗户勘察',value:'223c9a41-2807-4b4d-9a62-bad09e68835a'},
                {name:'卫生间勘察',value:'71354a9c-ba4a-4fd8-a30e-ef0f6a4ec474'},
                {name:'签单',value:'29735f82-7963-4c17-8f43-b2d68d34d449'},
                //{name:'工程完工',value:'竣工验收'}
			],
			event : {
				//页面初始化
				pageInit : function() {
					$(element).find('#returnBtn').hide();
					$(element).find('#time').show();
					$(element).find('#starttime').hide();
					$(element).find('#endtime').hide();
					id = [];
					viewModel.app = u.createApp({
						el : element/* Document.body */,
						model : viewModel,
					});

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
					this.loadList();
					viewModel.event.pageChange();
					viewModel.event.sizeChange();

					//回车搜索
					$('.input_enter').keydown(function(e) {
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
				genDataList : function(data) {
					var datalist = [];
					datalist.push(data);
					return datalist;
				},
				//清除datatable数据
				clearDt : function(dt) {
					dt.removeAllRows();
					dt.clear();
				},
				// 筛选
				searchClick : function() {
					$(element).find('#returnBtn').show();
					$(element).find('#time').show();
					//$(element).find('#starttime').hide();
					//$(element).find('#endtime').hide();
					viewModel.draw = 1;
					viewModel.event.loadList();
				},
				//返回初始化点击
				returnClick : function  () {
				  $(element).find('#returnBtn').hide();
				  $("#search").val('');
				  viewModel.event.loadList();
				},
				//分页相关
				pageChange : function() {
					viewModel.event.comps.on('pageChange', function(pageIndex) {
						viewModel.draw = pageIndex + 1;
						viewModel.event.loadList();
					});
				},
				sizeChange : function() {
					viewModel.event.comps.on('sizeChange', function(arg) {
						viewModel.pageSize = parseInt(arg);
						viewModel.draw = 1;
						viewModel.event.loadList();
					});
				},
				// 加载 记录列表
				loadList : function(obj, filter) {
					var jsonData = {
						pageIndex : viewModel.draw - 1,
						pageSize : viewModel.pageSize,
						sortField : "",
						sortDirection : "asc",
						search_startTime : viewModel.searchdatanew.getValue("startTime"),
						search_endTime : viewModel.searchdatanew.getValue("endTime")
					};
					// 搜索
					$(element).find("#search").each(function() {
						if (this.value == undefined || this.value == '' || this.value.length == 0) {
							//不执行操作
						} else {
							jsonData['search_searchParam'] = this.value.replace(/(^\s*)|(\s*$)/g, "");
							//去掉空格
						}
					});
					$(element).find("#searchType").each(function() {
						if (this.value == undefined || this.value == '' || this.value.length == 0) {
							//不执行操作
						} else if(this.value == '签单'){
							jsonData['search_performancetype'] = '29735f82-7963-4c17-8f43-b2d68d34d449';
						} else if(this.value == '屋面勘察'){
							jsonData['search_performancetype'] = '581dd2f4-932e-4f64-996e-d033b673b9e8';
						} else if(this.value == '窗户勘察'){
                            jsonData['search_performancetype'] = '223c9a41-2807-4b4d-9a62-bad09e68835a';
                        } else if(this.value == '卫生间勘察'){
                            jsonData['search_performancetype'] = '71354a9c-ba4a-4fd8-a30e-ef0f6a4ec474';
                        } else if(this.value == '工程完工'){
							jsonData['search_performancetype'] = '竣工验收';
						}
					});
					$(element).find("#searchStatus").each(function() {
						if (this.value == undefined || this.value == '' || this.value.length == 0) {
							//不执行操作
						} else {
							if (this.value == "未审核") {
								jsonData['search_examine'] = 0;
							} else if (this.value == "审核已通过") {
								jsonData['search_examine'] = 1;
							} else if (this.value == "审核未通过") {
								jsonData['search_examine'] = 2;
							}

						}
					});
					$(element).find("#searchTime").each(function() {
						if (this.value == undefined || this.value == '' || this.value.length == 0) {
							//不执行操作
						} else {
							if (this.value == "近7天") {
								jsonData['search_time'] = 1;
							} else if (this.value == "近30天") {
								jsonData['search_time'] = 2;
							} else if (this.value == "近三天") {
								jsonData['search_time'] = 0;
							} else if (this.value == "自定义") {
								jsonData['search_time'] = 3;
								if(!jsonData['search_startTime']){
									jsonData['search_startTime'] = new Date(0).toLocaleDateString();
								}
								if(!jsonData['search_endTime']){
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
						type : 'get',
						url : viewModel.objListUrl,
						dataType : 'json',
						data : jsonData,
						contentType : 'application/json',
						success : function(res) {
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
											totalPages : viewModel.totlePage,
											pageSize : viewModel.pageSize,
											currentPage : viewModel.draw,
											totalCount : viewModel.totleCount
										});
										viewModel.objdata.removeAllRows();
										viewModel.objdata.clear();
									} else {
										viewModel.totleCount = res.detailMsg.data.totalElements;
										viewModel.totlePage = res.detailMsg.data.totalPages;
										viewModel.event.comps.update({
											totalPages : viewModel.totlePage,
											pageSize : viewModel.pageSize,
											currentPage : viewModel.draw,
											totalCount : viewModel.totleCount
										});
										viewModel.objdata.removeAllRows();
										viewModel.objdata.clear();
										viewModel.objdata.setSimpleData(res.detailMsg.data.content, {
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
				//渲染业绩状态
				renderPerformancetype:function(obj){
                    var performancetype = obj.row.value.performancetype;
                    if(performancetype == '581dd2f4-932e-4f64-996e-d033b673b9e8'){
                        performancetype = '屋面勘察';
                    }else if(performancetype == '223c9a41-2807-4b4d-9a62-bad09e68835a'){
                        performancetype = '窗户勘察';
                    }else if(performancetype == '71354a9c-ba4a-4fd8-a30e-ef0f6a4ec474'){
                        performancetype = '卫生间勘察';
                    }else if(performancetype == '29735f82-7963-4c17-8f43-b2d68d34d449'){
                        performancetype = '签单';
                    }else if(performancetype == '竣工验收'){
                        performancetype = '工程完工';
                    }
                    obj.element.innerHTML = performancetype;
				},
				//渲染时间
				renderDatetime:function(obj){
					var ts = parseInt(obj.value);
					if(ts){
						ts = new Date(ts).toLocaleString('chinese',{hour12:false});
						obj.element.innerHTML = ts;
					}
				},
				//渲染审核状态
				renderStatus:function(obj){
					var val = obj.value;
					if(val == '1'){
						val = '审核已通过';
					}else if(val == '2'){
						val = '审核未通过';
					}else if(val == '0'){
						val = '未审核';
					}
					obj.element.innerHTML = val;
				},
				// 审核
				addClick : function(obj) {
					//1. 创建空数据
					//1.1 先清空
					//1.2再创建
					//2.填写数据
					//3.更新数据

					$('#dialog_content_audit').find('.u-msg-title').html("<h4>业绩审核</h4>");
					viewModel.event.clearDt(viewModel.objdatanew);
					var row = viewModel.objdata.getSelectedRows()[0]
					if (row) {
						if (row.data.performancestatus.value != '1') {
							viewModel.objdatanew.setSimpleData(viewModel.objdata.getSimpleData({
								type : 'select'
							}));
							$('#paymoney').attr("readonly", "readonly");
							window.md = u.dialog({
								id : 'add_audit',
								content : "#dialog_content_audit",
								hasCloseMenu : true
							});
						} else {
							$vue.$message({
								showClose: true,
								message: '已审核，无需操作!',
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
				saveClick : function() {
					var data = viewModel.objdatanew.getSelectedRows()[0].getSimpleData();

					// var radios = document.getElementsByName("auditstate");
					// for (var i = 0; i < radios.length; i++) {
						// if (radios[i].checked) {
							// data.auditstate = radios[i].value;
							// break;
						// }
					// }
					data.performancestatus = $('input[name="auditstate"]:checked').val();
					if (!data.performancestatus) {
						$vue.$message({
							showClose: true,
							message: '请勾选审核！',
							type: 'warning',
							offset: '60'
						});
						return;
					}
					if (!viewModel.app.compsValidate($('#add-form')[0])) {
						return;
					}
					var str = "perid,performancestatus,performanceremark";
					for (var key in data) {
						if (str.indexOf(key) == -1) {
							delete data[key];
						}
					}

					$.ajax({
						type : 'post',
						url : viewModel.objAddUrl,
						data : {
							perid : data.perid,
							performancestatus : data.performancestatus,
							performanceremark : data.performanceremark
						},
						success : function(res) {

							if (res.success == 'success') {
								viewModel.event.cancelClick();
								viewModel.event.loadList();
								$vue.$message({
									showClose: true,
									message: '请至少添加一项！',
									type: 'warning',
									offset: '60'
								});
							}
						}
					});
				},
				//取消点击
				cancelClick : function() {
					md.close();
				},
			}

		};

		$(element).html(template);
		viewModel.event.pageInit();

		// 绑定时间段选择触发
		viewModel.searchdatanew.on('valueChange', function(event) {

			let filename = event.field;
			// 改变的字段
			// var oldValue = event.oldValue;
			var newValue = event.newValue;
			if (filename == 'timeslot') {
				if (newValue == '3') {
					//$(element).find('#time').hide();
					$(element).find('#starttime').show();
					$(element).find('#endtime').show();
				}else if(newValue == '-1' || newValue == '0' || newValue == '1' || newValue == '2'){
					$(element).find('#starttime').hide();
					$(element).find('#endtime').hide();
				}

			}
		});

	};

	return {
		//'model': viewModel,
		'template' : template,
		'init' : init
	};
});
