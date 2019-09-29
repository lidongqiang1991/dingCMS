define(['text!pages/rewardrules/rewardrules.html', 'css!pages/rewardrules/rewardrules', 'pages/rewardrules/rewardrulesmeta', 'uuigrid'], function(template) {

	//初始化方法,页面加载后被 调用
	var init = function(element) {

		var viewModel = {
			app : {},
			/* 数据模型 */
			draw : 1,
			totlePage : 0,
			pageSize : 20,
			totleCount : 0,
			/* API */
			objListUrl : ctx + '/rules/page.do',
			objAddUrl : ctx + '/rules/save.do',
			objDelUrl : ctx + '/rules/del.do',
			/* 数据 */
			objdata : new u.DataTable(productitemmeta),
			objdatanew : new u.DataTable(productitemmeta),
            searchdatanew:new u.DataTable(productitemmeta),
			/* 事件 */
			event : {
				//页面初始化
				pageInit : function() {
					id = [];
					viewModel.app = u.createApp({
						el : element/* Document.body */,
						model : viewModel,
					});
					//隐藏
					$(element).find('#returnBtn').hide();
					//分页初始化
					var paginationDiv = $(element).find('#pagination')[0];
					this.comps = new u.pagination({
						el : paginationDiv,
						jumppage : true
					});
					this.comps.update({
						pageSize : 10
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

                    // 初始化筛选
                    viewModel.event.clearDt(viewModel.searchdatanew);
                    viewModel.searchdatanew.clear();
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
				// 搜索
                searchClick:function(){
                	$(element).find('#returnBtn').show();
                    //viewModel.event.resetfilterclick(true);
                    viewModel.draw = 1;
                    viewModel.event.loadList(id);
                },
                //返回初始化点击
				returnClick : function  () {
					  $(element).find('#returnBtn').hide();
					  $("#search").val('');
				 	 viewModel.event.loadList();
				},
                // 筛选
                /*filterClick:function(){
                    $("#search").val('');
                    var obj = viewModel.event.resetfilterclick(false);
                    viewModel.event.loadList('',obj);
                },*/
                // 重置 筛选条件
                /*resetfilterclick:function(bool){
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
                },*/
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
				// 加载 客户列表
				loadList : function(obj, filter) {
					var jsonData = {
						pageIndex : viewModel.draw - 1,
						pageSize : viewModel.pageSize,
						sortField : "",
						sortDirection : "asc"
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

					// 根据id获取
					if (obj) {
						if (obj != '' || obj.length != 0) {
							jsonData['search_id'] = obj.join();
						}
					}
					// 根据条件筛选
					/*if (filter) {
						if (filter != '' || filter.length != 0) {
							// jsonData['search_'+ filter.key ] = filter[key];
							u.extend(jsonData, filter);
						}
					}else{
                        var filterobj = viewModel.event.resetfilterclick(false);
                        u.extend(jsonData,filterobj);
					}*/
					$.ajax({
						type : 'get',
						url : viewModel.objListUrl,
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
						error : function() {
							$vue.$message({
								showClose: true,
								message: '请求超时，请稍后重试！',
								type: 'error',
								offset: '60'
							});
						}
					})
				},

				// 添加点击查看详情
				renderTypeAjax : function(obj) {
					var id = obj.row.value.rewardid;
					var text = obj.value;
					var html = "<a style='text-decoration: underline;' class='c_green' href='#/rewardrules/rewardrulesDetail?id=" + id + "'>" + text || ' ' + "</a>";
					obj.element.innerHTML = html;
				},
				// 渲染奖励比例
				renderRewardratio:function(obj){
					var rewardtype = obj.row.value.rewardtype;
					var rewardratio = obj.row.value.rewardratio;
					if(rewardtype == '1'){
						rewardratio = '订单金额的'+ rewardratio + '%';
					}else if(rewardtype == '0'){
						rewardratio = rewardratio + '元';
					}
					obj.element.innerHTML = rewardratio;
				},
				// 渲染是否启用
				renderEnable:function(obj){
					var enable = obj.row.value.enable;
					if(enable == '1'){
						enable = '是';
					}else if(enable == '0'){
						enable = '否';
					}
					obj.element.innerHTML = enable;
				},
				//渲染时间
				renderDatetime:function(obj){
					var ts = parseInt(obj.value);
					if(ts){
						ts = new Date(ts).toLocaleString('chinese',{hour12:false});
						obj.element.innerHTML = ts;
					}
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

				// 新建
				addClick : function() {
					window.location.href = ctx + "/#/rewardrules/rewardrulesDetail";
				},
				// 删除
				delClick : function() {
					var row = viewModel.objdata.getSelectedRows()[0];
					if (row) {
						var data = viewModel.objdata.getSelectedRows()[0].getSimpleData();
						var msgTitle = '删除确认';
						var msgContent = "是否删除规则：" + data.name + "?";
						$vue.$confirm(msgContent, msgTitle, '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							viewModel.event.delagent(data);
						}).catch(() => {
							$vue.$message({
								type: 'info',
								message: '已取消删除',
								offset: '60'
							});
						});
					} else {
						$vue.$message({
							showClose: true,
							message: '请选择要删除的数据！',
							type: 'warning',
							offset: '60'
						});
					}
				},
				delagent : function(data) {
					var datalist = viewModel.event.genDataList(data);
					var json = JSON.stringify(datalist);
					$.ajax({
						url : viewModel.objDelUrl,
						data : json,
						dataType : 'json',
						type : 'post',
						contentType : 'application/json',
						success : function(res) {
							if (res) {
								if (res.success == 'success') {
									viewModel.objdata.removeRow(viewModel.objdata.getSelectedIndexs());
									// u.messageDialog({msg:'删除成功',title:'操作提示',btnText:'确定'});
                                    viewModel.totleCount=viewModel.totleCount -1;
                                    if(viewModel.totleCount<1){
                                        viewModel.totlePage=viewModel.totlePage -1;
                                    }
                                    viewModel.event.comps.update({totalPages:viewModel.totlePage,totalCount:viewModel.totleCount});
								}else {
									$vue.$message({
										showClose: true,
										message: '细项已被引用，无法删除，请检查！',
										type: 'warning',
										offset: '60'
									});
								}
							} else {
								$vue.$message({
									showClose: true,
									message: '无返回数据！',
									type: 'error',
									offset: '60'
								});
							}

						},
						error : function(er) {
							$vue.$alert('操作请求失败，' + er, '操作提示', {
								confirmButtonText: '确定',
								callback: action => {
									$vue.$message({
										type: 'info',
										message: `action: ${ action }`
									});
								}
							});
						}
					});
				},
			}

		};

		$(element).html(template);
		viewModel.event.pageInit();

	};

	return {
		'template' : template,
		'init' : init
	};
});
