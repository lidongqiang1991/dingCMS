define(['text!pages/team/teamDetail.html', 'pages/team/teammeta', 'css!pages/team/teamDetail', 'uuigrid', 'config/sys_const'], function(html) {

	var init = function(element, params) {
		var viewModel = {
			//mybatis持久化方式
			listurl : ctx + '/systeam/page.do',
			saveurl : ctx + '/systeam/save.do',
			delurl : ctx + '/systeam/del.do',

			teamdata : new u.DataTable(teammeta),
			teamdatanew : new u.DataTable(teammeta),
			jobscopeList : [{name:"技术工",value:"技术工"},{name:"检测工",value:"检测工"},{name:"修理工",value:"修理工"},{name:"业务员",value:"业务员"},{name:"材料员",value:"材料员"}],
			ownerList : [{name:"王宏干",value:"王宏干"},{name:"黄晓伟",value:"黄晓伟"},{name:"武振旺",value:"武振旺"},{name:"薛彦斌",value:"薛彦斌"}],
			event : {
				// 页面初始化
				pageInit : function() {
					id = [];
					viewModel.app = u.createApp({
						el : element/* Document.body */,
						model : viewModel
					});
					//分页初始化
					// var paginationDiv = $(element).find('#pagination')[0];
					// this.comps=new u.pagination({el:paginationDiv,jumppage:true});
					// this.comps.update({pageSize: 5 });  //默认每页显示5条数据
					// this.loadList();
					// viewModel.event.pageChange();
					// viewModel.event.sizeChange();

					//回车搜索
					$('.input_enter').keydown(function(e) {
						if (e.keyCode == 13) {
							viewModel.event.searchClick();
							u.stopEvent(e);
						}
					});

					

					if (this.getUrlParams('id')) {
						var teamid = this.getUrlParams('id');
						id.push(teamid);

						// var newrow = viewModel.teamdatanew.getSelectedRows()[0];
						// newrow.setValue('teamid',teamid);

						this.loadList(id);
						// viewModel.event.pageChange();
						// viewModel.event.sizeChange();
					}
					
					// 编辑客户基本信息
					viewModel.event.clearDt(viewModel.teamdatanew);
					var newr = viewModel.teamdatanew.createEmptyRow();
					viewModel.teamdatanew.setRowSelect(newr);

				},
				// 获取url 后缀
				getUrlParams : function(name) {
					var url = window.location.href;
					var search_temp = '?' + url.split('?')[1];
					var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
					var r = search_temp.substr(1).match(reg);
					if (r != null)
						return r[2];
					return null;
				},
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
					viewModel.draw = 1;
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

				// 加载页面数据 -- 代理商列表
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
									if (res.detailMsg.data) {
										var newrow = viewModel.teamdatanew.getSelectedRows()[0];
										var data = res.detailMsg.data.content[0];
										newrow.setSimpleData(data);
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
					var id = e.rowObj.value.id;
					window.location.href = ctx + "/#/team/teamDetail?id=" + id;
				},
				// 保存
				saveClick : function() {

					var data = viewModel.teamdatanew.getSelectedRows()[0].getSimpleData();
					if (!viewModel.app.compsValidate($('#add-form')[0])) {
						return;
					}
					viewModel.event.save(data);
				},
				save : function(data) {
					var list = viewModel.event.genDataList(data);
					$.ajax({
						type : 'post',
						url : viewModel.saveurl,
						dataType : 'json',
						contentType : "application/json",
						data : JSON.stringify(list),
						success : function(res) {

							if (res) {
								if (res.success == 'success' && res.detailMsg) {
									window.location.href = ctx + "/#/team/team";
								} else {
									var msg = "";
									if (res.success == 'fail_global') {
										msg = res.message;
									} else {
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
							} else {
								$vue.$message({
									showClose: true,
    message: '没有返回数据！',
    type: 'error',
    offset: '60'
});
							}
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
