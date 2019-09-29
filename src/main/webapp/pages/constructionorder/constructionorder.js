define(['text!pages/constructionorder/constructionorder.html', 'css!pages/constructionorder/constructionorder', 'pages/payment/paymentmeta', 'uuigrid'], function(template) {

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

			objdata : new u.DataTable(_productmeta),
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
					var html = "<a style='text-decoration: underline;' class='c_green' href='#/constructionorder/constructionorderDetail?id=" + id + "'>" + text || ' ' + "</a>";
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
