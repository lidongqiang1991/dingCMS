define(['text!pages/refund/refund.html', 'css!pages/refund/refund', 'pages/payment/paymentmeta', 'uuigrid'], function(template) {

	//初始化方法,页面加载后被 调用
	var init = function(element) {

		var viewModel = {
			app : {},
			/* 数据模型 */
			draw : 1,
			totlePage : 0,
			pageSize : 15,
			totleCount : 0,

			objListUrl : ctx + '/servicelist/page.do',
			objAddUrl : ctx + '/payment/save.do',

			objdata : new u.DataTable(_productmeta),
			objdatanew : new u.DataTable(_paymentmeta),
			// 筛选 数据
			searchdatanew : new u.DataTable(searchmeta),
			typeList : [{
				name : "全部类型",
				value : "-1"
			}, {
				name : "产品",
				value : "0"
			}, {
				name : "材料",
				value : "1"
			}],
			statusList : [{
				name : "所有状态",
				value : "-1"
			}, {
				name : "未支付",
				value : "0"
			}, {
				name : "定金已支付",
				value : "1"
			}, {
				name : "全额已支付",
				value : "2"
			}],
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
				// 加载 客户列表
				loadList : function(obj, filter) {
					var jsonData = {
						pageIndex : viewModel.draw - 1,
						pageSize : viewModel.pageSize,
						sortField : "",
						sortDirection : "asc",
						search_financial:"default"
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
					$(element).find("#searchProductType").each(function() {
						if (this.value == undefined || this.value == '' || this.value.length == 0) {
							//不执行操作
						} else {
							if (this.value == "产品") {
								jsonData['search_producttype'] = 0;
							} else if (this.value == "材料") {
								jsonData['search_producttype'] = 1;
							}
						}
					});
					$(element).find("#searchPayType").each(function() {

						if (this.value == undefined || this.value == '' || this.value.length == 0) {
							//不执行操作
						} else {
							if (this.value == "未支付") {
								jsonData['search_paystate'] = 0;
							} else if (this.value == "定金已支付") {
								jsonData['search_paystate'] = 1;
							} else if (this.value == "全额已支付") {
								jsonData['search_paystate'] = 2;
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

				// 添加点击查看详情
				renderTypeAjax : function(obj) {

					var id = obj.row.value.billid;
					var text = obj.value;
					var html = "<a style='text-decoration: underline;' class='c_green' href='#/refund/refundDetail?id=" + id + "'>" + text || ' ' + "</a>";
					obj.element.innerHTML = html;
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
				renderConstructionStatus : function(obj) {
					var val = '';
					if (obj.value == 0||obj.value == null||obj.value == '') {
						val = '未开工';
					} else if (obj.value == 1) {
						val = '施工中';
					} else if (obj.value == 2) {
						val = '已完工';
					} else if (obj.value == -2) {
						val = '不需要上门';
					} else if (obj.value == -3) {
						val = '上门未成交';
					} else {
						val = '其他';
					}
					obj.element.innerHTML = val;
				},
				// 编辑 新建
				addClick : function(obj) {
					//1. 创建空数据
					//1.1 先清空
					//1.2再创建
					//2.填写数据
					//3.更新数据
					var row = viewModel.objdata.getSelectedRows()[0];
					if (row) {
						if (row.data.paystate.value != 3&&row.data.totalamount.value) {

							viewModel.event.clearDt(viewModel.objdatanew);
							var newr = viewModel.objdatanew.createEmptyRow();
							var projectdata = row.data;


							newr.setValue("billid", projectdata.billid.value);
							newr.setValue("vbillcode", projectdata.vbillcode.value);
							newr.setValue("billid", projectdata.billid.value);
							newr.setValue("type", 2);
							//新增退款
							newr.setValue("auditstate", 0);
							//默认未审核

							viewModel.objdatanew.setRowSelect(newr);

							window.md = u.dialog({
								id : 'add_refund',
								content : "#dialog_content_refund",
								hasCloseMenu : true
							});
						} else {
							$vue.$message({
    showClose: true,
    message: '不需要或不可操作！',
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

					if (!viewModel.app.compsValidate($('#add-form')[0])) {
						return;
					}
					// for (var key in data) {
					// if (!data[key]) {
					// delete data[key];
					// }
					// }
					viewModel.event.cancelClick();
					viewModel.event.save(data);
				},
				//取消点击
				cancelClick : function() {
					md.close();
				},
				save : function(data) {

					var list = viewModel.event.genDataList(data);
					$.ajax({
						type : 'post',
						url : viewModel.objAddUrl,
						dataType : 'json',
						contentType : "application/json;charset=utf-8",
						data : JSON.stringify(list),
						success : function(res) {
							if (res) {

								if (res.success == 'success' && res.detailMsg) {
									var id = res.detailMsg.data.id;
									if (id) {
										var newrow = viewModel.objdatanew.getSelectedRows()[0];
										newrow.setValue('id', id);
									}
									$vue.$message({
    showClose: true,
    message: '保存成功!',
    type: 'success',
    offset: '60'
});
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

		};

		$(element).html(template);
		viewModel.event.pageInit();

	};

	return {
		//'model': viewModel,
		'template' : template,
		'init' : init
	};
});
