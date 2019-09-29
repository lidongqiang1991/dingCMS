define(['text!pages/payment/payment.html', 'css!pages/payment/payment', 'pages/payment/paymentmeta', 'uuigrid'], function(template) {

	//初始化方法,页面加载后被 调用
	var init = function(element) {

		var viewModel = {
			app : {},
			/* 数据模型 */
			draw : 1,
			totlePage : 0,
			pageSize : 15,
			totleCount : 0,

			//
			rows:[],
			objListUrl : ctx + '/servicelist/page.do',
			objAddUrl : ctx + '/payment/save.do',

			objListUrl2: ctx + '/payment/page.do',

			objdata : new u.DataTable(_productmeta),
			objdatanew : new u.DataTable(_paymentmeta),

			//财务审核数据
			objdata2 : new u.DataTable(financialAuditmeta),
			objdatanew2 : new u.DataTable(financialAuditmeta),


			disobjdatanew : new u.DataTable(_paymentmeta),
			// 筛选 数据
			searchdatanew : new u.DataTable(searchmeta),
			searchdatanew2: new u.DataTable(financialAuditmeta),

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
			//付款方式
			paymentmethodList:[{
				name : "微信支付",
				value : "1"
			},
			{
				name : "支付宝支付",
				value : "2"
			},{
				name : "银行转账",
				value : "3"
			},{
				name  :"现金支付",
				value : "4"
			}],
			//款项类型
			moneytypeList:[{
				name : "首付款",
				value : "1"
			},
			{
				name : "尾款",
				value : "2"
			},{
				name : "抵扣",
				value : "3"
			}],
			typeList2: [
				{
				name: "全部类型",
				value: "-1"
				}, {
				name: "支付",
				value: "0"
				}, {
				name: "优惠",
				value: "1"
				}, {
				name: "退款",
				value: "2"
				}, {
				name: "支付转移",
				value: "3"
				}
			],
			statusList2: [{
				name: "全部状态",
				value: "-1"
			}, {
				name: "未审核",
				value: "0"
			}, {
				name: "审核已通过",
				value: "1"
			}, {
				name: "审核未通过",
				value: "2"
			}],
			timeList2: [{
				name: "所有时间",
				value: "-1"
			}, {
				name: "近7天",
				value: "0"
			}, {
				name: "近30天",
				value: "1"
			}, {
				name: "上个月",
				value: "2"
			}, {
				name: "自定义",
				value: "3"
			}],
			event : {
				//页面初始化
				pageInit : function() {
					viewModel.draw = 1;
					viewModel.totlePage = 0;
					viewModel.pageSize = 15;
					viewModel.totleCount = 0;
					$('#searchBtn').unbind('click');
					$('#searchBtn').click(function(e) {
						e.preventDefault();
						$(element).find('#returnBtn').show();
						viewModel.draw = 1;
						viewModel.event.loadList();
					});
					$('#returnBtn').unbind('click');
					$('#returnBtn').click(function  (e) {
						e.preventDefault();
						$(element).find('#returnBtn').hide();
						$("#search").val('');
						viewModel.pageSize=15;
						viewModel.event.loadList();
					});

					id = [];
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
					$('.input_enter').unbind('keydown');
					$('.input_enter').keydown(function(e) {
						if (e.keyCode == 13) {
							e.preventDefault()
							$('#returnBtn').show();
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
				pageChange2 : function() {
					viewModel.event.comps.on('pageChange', function(pageIndex) {
						viewModel.draw = pageIndex + 1;
						viewModel.event.loadList2();
					});
				},
				sizeChange2 : function() {
					viewModel.event.comps.on('sizeChange', function(arg) {
						viewModel.pageSize = parseInt(arg);
						viewModel.draw = 1;
						viewModel.event.loadList2();
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

				//页面初始化
				pageInit2: function () {
					viewModel.draw = 1;
					viewModel.totlePage = 0;
					viewModel.pageSize = 15;
					viewModel.totleCount = 0;
					$('#searchBtn').unbind('click');
					$('#searchBtn').click(function(e) {
						e.preventDefault()
						$(element).find('#returnBtn').show();
						viewModel.draw = 1;
						viewModel.event.loadList2();
					});
					$('#returnBtn').unbind('click');
					$('#returnBtn').click(function  (e) {
						e.preventDefault();
						$(element).find('#returnBtn').hide();
						$("#search").val('');
						viewModel.pageSize=15;
						viewModel.event.loadList2();
					});

					$(element).find('#returnBtn').hide();
					$(element).find('#time').show();
					$(element).find('#starttime').hide();
					$(element).find('#endtime').hide();
					id = [];
					/*viewModel.app = u.createApp({
						el: element/!* Document.body *!/,
						model: viewModel,
					});*/

					//分页初始化
					var paginationDiv2 = $(element).find('#pagination2')[0];
					this.comps = new u.pagination({
						el: paginationDiv2,
						jumppage: true
					});
					this.comps.update({
						pageSize: 5
					});
					//默认每页显示5条数据
					this.loadList2();
					viewModel.event.pageChange2();
					viewModel.event.sizeChange2();

					//回车搜索
					$('.input_enter').unbind('keydown');
					$('.input_enter').keydown(function (e) {
						if (e.keyCode == 13) {
							e.preventDefault()
							$('#returnBtn').show();
							viewModel.event.searchClick2();
							u.stopEvent(e);
						}
					});

					// 初始化搜索数据
					viewModel.event.clearDt(viewModel.searchdatanew2);
					var newr = viewModel.searchdatanew2.createEmptyRow();
					viewModel.searchdatanew2.setRowSelect(newr);
				},
				loadList2 : function (obj, filter) {
					var jsonData = {
						pageIndex: viewModel.draw - 1,
						pageSize: viewModel.pageSize,
						sortField: "",
						sortDirection: "asc",
						search_notstate: 8,
						search_startTime: viewModel.searchdatanew2.getValue("startTime"),
						search_endTime: viewModel.searchdatanew2.getValue("endTime")
					};
					// 搜索
					$(element).find("#search").each(function () {
						if (this.value == undefined || this.value == '' || this.value.length == 0) {
							//不执行操作
						} else {
							jsonData['search_searchParam'] = this.value.replace(/(^\s*)|(\s*$)/g, "");
							//去掉空格
						}
					});
					$(element).find("#searchType").each(function () {
						if (this.value == undefined || this.value == '' || this.value.length == 0) {
							//不执行操作
						} else {
							if (this.value == "支付") {
								jsonData['search_type'] = 0;
							} else if (this.value == "优惠") {
								jsonData['search_type'] = 1;
							} else if (this.value == "退款") {
								jsonData['search_type'] = 2;
							} else if (this.value == "支付转移") {
								jsonData['search_type'] = 3;
							}

						}
					});
					$(element).find("#searchStatus").each(function () {
						if (this.value == undefined || this.value == '' || this.value.length == 0) {
							//不执行操作
						} else {
							if (this.value == "未审核") {
								jsonData['search_auditstate'] = 0;
							} else if (this.value == "审核已通过") {
								jsonData['search_auditstate'] = 1;
							} else if (this.value == "审核未通过") {
								jsonData['search_auditstate'] = 2;
							}

						}
					});
					$(element).find("#searchTime").each(function () {
						if (this.value == undefined || this.value == '' || this.value.length == 0) {
							//不执行操作
						} else {
							if (this.value == "近7天") {
								jsonData['search_time'] = 0;
							} else if (this.value == "近30天") {
								jsonData['search_time'] = 1;
							} else if (this.value == "上个月") {
								jsonData['search_time'] = 2;
							} else if (this.value == "自定义") {
								jsonData['search_time'] = 3;
								if (!jsonData['search_startTime']) {
									jsonData['search_startTime'] = new Date(0).toLocaleDateString();
								}
								if (!jsonData['search_endTime']) {
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
						type: 'get',
						url: viewModel.objListUrl2,
						dataType: 'json',
						data: jsonData,
						contentType: 'application/json',
						success: function (res) {
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
											totalPages: viewModel.totlePage,
											pageSize: viewModel.pageSize,
											currentPage: viewModel.draw,
											totalCount: viewModel.totleCount
										});
										viewModel.objdata.removeAllRows();
										viewModel.objdata.clear();
									} else {
										viewModel.totleCount = res.detailMsg.data.totalElements;
										viewModel.totlePage = res.detailMsg.data.totalPages;
										viewModel.event.comps.update({
											totalPages: viewModel.totlePage,
											pageSize: viewModel.pageSize,
											currentPage: viewModel.draw,
											totalCount: viewModel.totleCount
										});
										viewModel.objdata2.removeAllRows();
										viewModel.objdata2.clear();
										viewModel.objdata2.setSimpleData(res.detailMsg.data.content, {
											unSelect: true
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
						error: function (er) {
							$vue.$message({
								showClose: true,
								message: '请求超时，请稍后重试！',
								type: 'error',
								offset: '60'
							});
						}
					})
				},
				searchClick:function(e) {
					$(element).find('#returnBtn').show();
					viewModel.draw = 1;
					viewModel.event.loadList();
				},
				searchClick2:function(e) {
					$(element).find('#returnBtn').show();
					viewModel.draw = 1;
					viewModel.event.loadList2();
				},
				// 评价结果
				renderRate:function (obj) {
					if(obj.value && obj.value.slice(obj.value.length-1) == '/'){
						var val = obj.value.slice(0,obj.value.length-1);
						obj.element.innerHTML = val +"星";
					}else{
						obj.element.innerHTML = '未评价';
					}
				},
				// 添加点击查看详情
				renderTypeAjax : function(obj) {

					var id = obj.row.value.billid;
					var text = obj.value;
					var html = "<a style='text-decoration: underline;' class='c_green' href='#/payment/paymentDetail?id=" + id + "'>" + text || ' ' + "</a>";
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
				//支付款项差额
				MoneyValue :function(obj){
					var text;
					var mon=obj.row.value;
					var paidamount=mon.paidamount;
					var total=mon.totalamount;
					text=total-paidamount;
					//保留两位小数点
                    obj.element.innerHTML = text.toFixed(2);
				},

				// 渲染类型2
				renderStatus: function (obj) {
					if (obj.value == 0) {
						var val = '提交态';
					} else if (obj.value == 1) {
						var val = '审核已通过';
					} else if (obj.value == 2) {
						var val = '审核未通过';
					} else if (obj.value == 8) {
						var val = '自由态';
					} else {
						val = "";
					}
					obj.element.innerHTML = val;
				},
				renderType: function (obj) {
					if (obj.value == 0) {
						var val = '支付';
					} else if (obj.value == 1) {
						var val = '优惠';
					} else if (obj.value == 2) {
						var val = '退款';
					} else if (obj.value == 3) {
						var val = '支付转移';
					} else {
						var val = '格式有误';
					}
					;
					obj.element.innerHTML = val;
				},
				// 渲染付款方式
				renderPayMethod: function (obj) {
					if (obj.value == 1) {
						var val = '微信支付';
					} else if (obj.value == 2) {
						var val = '支付宝支付';
					} else if (obj.value == 3) {
						var val = '银行转账';
					} else if (obj.value == 4) {
						var val = '现金支付';
					} else {
						var val = '';
					}
					;
					obj.element.innerHTML = val;
				},
				// 渲染款项类型
				renderPayType: function (obj) {
					if (obj.value == 1) {
						var val = '首付款';
					} else if (obj.value == 2) {
						var val = '尾款';
					} else if (obj.value == 3) {
						var val = '抵扣';
					} else {
						var val = '';
					}
					;
					obj.element.innerHTML = val;
				},
				//渲染时间
				renderDatetime:function(obj){
					var ts = parseInt(obj.value);
					if(ts){
						ts = new Date(ts).toLocaleString('chinese',{hour12:false});
						obj.element.innerHTML = ts;
					}
				},
				//支付款项差额
				MoneyValue2 :function(obj){
					var text;
					var mon=obj.row.value;
					var paidamount=mon.paidamount;
					var total=mon.totalamount;
					text = ((total*100)-(paidamount*100))/100;
					// text=total-paidamount;
					//保留两位小数点
					obj.element.innerHTML = text.toFixed(2);
				},
				// 渲染类型
				renderPayStatus2 : function(obj) {
					var text;
					var mon=obj.row.value;
					var paidamount=mon.paidamount;
					var total=mon.totalamount;
					text = ((total*100)-(paidamount*100))/100;
					if(text==0){
						text = '支付已完成';
					}else{
						text = '支付未完成';
					}
					obj.element.innerHTML = text;
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
							newr.setValue("type", 0);
							//支付
							newr.setValue("auditstate", 0);
							//默认未审核

							viewModel.objdatanew.setRowSelect(newr);

							window.md = u.dialog({
								id : 'add_payment',
								content : "#dialog_content_payment",
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

				// 新增优惠
				addDisClick : function(obj) {
					var row = viewModel.objdata.getSelectedRows()[0];
					if (row) {
						if (row.data.paystate.value!=3&&row.data.totalamount.value) {

							viewModel.event.clearDt(viewModel.disobjdatanew);
							var newr = viewModel.disobjdatanew.createEmptyRow();
							var projectdata = row.data;
							newr.setValue("billid", projectdata.billid.value);
							newr.setValue("vbillcode", projectdata.vbillcode.value);
							newr.setValue("billid", projectdata.billid.value);
							newr.setValue("type", 1);
							//新增优惠
							newr.setValue("auditstate", 0);
							//默认未审核
							viewModel.disobjdatanew.setRowSelect(newr);
							window.md = u.dialog({
								id : 'add_dispayment',
								content : "#dialog_content_dispayment",
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
				saveDisClick : function() {
					var data = viewModel.disobjdatanew.getSelectedRows()[0].getSimpleData();

					if (!viewModel.app.compsValidate($('#add-dis-form')[0])) {
						return;
					}
					// for (var key in data) {
					// if (!data[key]) {
					// delete data[key];
					// }
					// }
					viewModel.event.cancelClick();
					viewModel.event.saveDis(data);
				},
				//取消点击
				cancelDisClick : function() {
					md.close();
				},
				saveDis : function(data) {
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
										var newrow = viewModel.disobjdatanew.getSelectedRows()[0];
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

				paymentPage:function(){
					$('#dispaymentBtn').show();
					$('#paymentBtn').show();
					viewModel.event.pageInit();
				},
				financialAuditPage:function(){
					$('#dispaymentBtn').hide();
					$('#paymentBtn').hide();
					viewModel.event.pageInit2();
					// 绑定时间段选择触发
				}
			}

		};

		$(element).html(template);
		viewModel.app = u.createApp({
			el : element/* Document.body */,
			model : viewModel,
		});
		viewModel.event.pageInit();
		viewModel.searchdatanew2.on('valueChange', function (event) {
			let filename = event.field;
			// 改变的字段
			// var oldValue = event.oldValue;
			var newValue = event.newValue;
			if (filename == 'timeslot') {
				if (newValue == '3') {
					//$(element).find('#time').hide();
					$(element).find('#starttime').show();
					$(element).find('#endtime').show();
				} else if (newValue == '-1' || newValue == '0' || newValue == '1' || newValue == '2') {
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
