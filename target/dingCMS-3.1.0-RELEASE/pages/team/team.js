define(['text!pages/team/team.html', 'pages/team/teammeta', 'css!pages/team/team', 'uuigrid'], function(html) {

	var init = function(element, params) {
		var viewModel = {
			app : {},
			/* 数据模型 */
			draw : 1,
			totlePage : 0,
			pageSize : 10,
			totleCount : 0,

			//mybatis持久化方式
			listurl : ctx + '/systeam/page.do',
			saveurl : ctx + '/systeam/save.do',
			delurl : ctx + '/systeam/del.do',

			teamdata : new u.DataTable(teammeta),
			teamdatanew : new u.DataTable(teammeta),

			event : {
				// 页面初始化
				pageInit : function() {
					id = [];
					viewModel.app = u.createApp({
						el : element/* Document.body */,
						model : viewModel
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
				},
				//清除datatable数据
				clearDt : function(dt) {
					dt.removeAllRows();
					dt.clear();
				},

				// 搜索
				searchClick : function() {
					$(element).find('#returnBtn').show();
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

				// 加载页面数据 -- 工人列表
				loadList : function(obj) {
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
					$.ajax({
						type : 'get',
						url : viewModel.listurl,
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
										viewModel.teamdata.removeAllRows();
										viewModel.teamdata.clear();
									} else {
										viewModel.totleCount = res.detailMsg.data.totalElements;
										viewModel.totlePage = res.detailMsg.data.totalPages;
										viewModel.event.comps.update({
											totalPages : viewModel.totlePage,
											pageSize : viewModel.pageSize,
											currentPage : viewModel.draw,
											totalCount : viewModel.totleCount
										});
										viewModel.teamdata.removeAllRows();
										viewModel.teamdata.clear();
										viewModel.teamdata.setSimpleData(res.detailMsg.data.content, {
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
				// 新建
				addClick : function() {
					window.location.href = ctx + "/#/team/teamDetail";
				},
				// 查看详情
				selectClick : function(e) {

					// var data = viewModel.teamdata.getSelectedRows()[0];
					// var id = data.getValue('id');
					var id = e.rowObj.value.id;
					window.location.href = ctx + "#/team/teamDetail?id=" + id;
				},
				 // 添加点击查看详情
                renderTypeAjax:function (obj) {
                    var id = obj.row.value.id;
                    var text = obj.value;
                    var html = "<a title='"+text+"' class='c_green' style='text-decoration: underline;' href='#/team/teamDetail?id="+ id +"'>" + text||id + "</a>";
                    obj.element.innerHTML = html;
                },

				//组装list
				genDataList : function(data) {

					var datalist = [];
					datalist.push(data);
					return datalist;
				},
				delClick : function() {
					var row = viewModel.teamdata.getSelectedRows()[0];
					if (row) {
						var data = viewModel.teamdata.getSelectedRows()[0].getSimpleData();
						var msgTitle = '删除确认';
						var msgContent = "是否删除" + data.teamname + "?";
						$vue.$confirm(msgContent, msgTitle, '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							viewModel.event.deleteData(data);
							viewModel.teamdata.removeRow(viewModel.teamdata.getSelectedIndexs());
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
				//删除方法
				deleteData : function(data) {
					var datalist = viewModel.event.genDataList(data);
					var json = JSON.stringify(datalist);
					$.ajax({
						url : viewModel.delurl,
						data : json,
						dataType : 'json',
						type : 'post',
						contentType : 'application/json',
						success : function(res) {
							//md.close();
							if (res) {
								if (res.success == 'success') {
								} else {
									var msg = "";
									for (var key in res.message) {
										msg += res.message[key] + "<br/>";
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
		}//end viewModel

		$(element).html(html);
		viewModel.event.pageInit();

	}

	return {
		'template' : html,
		init : init
	}
});
//end define
