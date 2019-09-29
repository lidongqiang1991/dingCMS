define(['text!pages/payment/paymentDetail.html', 'css!pages/payment/paymentDetail', 'pages/payment/paymentmeta', 'uuigrid'], function(template) {

	//初始化方法,页面加载后被 调用
	var init = function(element) {

		var viewModel = {
			app : {},
			/* 数据模型 */
			draw : 1,
			totlePage : 0,
			pageSize : 15,
			totleCount : 0,


			objListUrl : ctx + '/payment/page.do',
			objAddUrl : ctx + '/payment/save.do',

			objdata : new u.DataTable(_paymentmeta),
			objdatanew : new u.DataTable(_paymentmeta),
			//删除未审核流水
			delSerialUrl : ctx+'/payment/del.do',
			//撤回
			recallSerialUrl : ctx+'/payment/changestate.do',
			// 筛选 数据
			searchdatanew : new u.DataTable(searchmeta),
			typeList : [{
				name : "全部类型",
				value : "-1"
			}, {
				name : "支付",
				value : "0"
			}, {
				name : "优惠",
				value : "1"
			}, {
				name : "退款",
				value : "2"
			}, {
				name : "支付转移",
				value : "3"
			}],
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
				name : "近7天",
				value : "0"
			}, {
				name : "近30天",
				value : "1"
			}, {
				name : "上个月",
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
					//回车搜索
					$('.input_enter').keydown(function(e) {
						if (e.keyCode == 13) {
							viewModel.event.searchClick();
							u.stopEvent(e);
						}
					});
					//默认每页显示5条数据
					this.loadList();
					viewModel.event.pageChange();
					viewModel.event.sizeChange();

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
				//删除未审核流水
				deleteClick :function(){
					var row = viewModel.objdata.getSelectedRows()[0];
					if(row){
						var data = viewModel.objdata.getSelectedRows()[0].getSimpleData()
						var state=data.auditstate;
						if(state==0||state ==8){
							var msgTitle = "删除确认";
							var msgContent = "是否删除"+data.serialnum+"流水?";
							$vue.$confirm(msgContent, msgTitle, {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
							}).then(() => {
									viewModel.event.delSerial(data);
									viewModel.objdata.removeRow(viewModel.objdata.getSelectedIndexs());
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
								message: '审核过的流水无法进行删除！',
								type: 'warning',
								offset: '60'
							});
						}

					}else{
						$vue.$message({
							showClose: true,
							message: '请选择要删除的数据！',
							type: 'warning',
							offset: '60'
						});
					}
				},
				delSerial :function(data){
					var list=viewModel.event.genDataList(data);
					$.ajax({
						type : 'post',
						url : viewModel.delSerialUrl,
						dataType : 'json',
						contentType : "application/json",
						data : JSON.stringify(list),
						success : function(res) {
							if( res.success =='success'){
								$vue.$message({
									showClose: true,
									message: '删除成功!',
									type: 'success',
									offset: '60'
								});

								viewModel.totleCount=viewModel.totleCount -1;
                                if(viewModel.totleCount<1){
                                    viewModel.totlePage=viewModel.totlePage -1;
                                }
                                viewModel.event.comps.update({totalPages:viewModel.totlePage,totalCount:viewModel.totleCount});
									//md.close();
							}else{
								$vue.$message({
    showClose: true,
    message: '无返回数据！',
    type: 'warning',
    offset: '60'
});
							}
						},
						error:function(er){
                            $vue.$message({
								showClose: true,
								message: '请求失败，请稍后重试！',
								type: 'error',
								offset: '60'
							});
                        }

					})

				},
				//返回初始化点击
				returnClick : function  () {
					$(element).find('#returnBtn').hide();
					$("#search").val('');
					sessionStorage['searchObj'] = '';
					viewModel.event.loadList();
				},
				//撤回未审核
				recallClick:function(){
					var row = viewModel.objdata.getSelectedRows()[0];
					if(row){
						var data = viewModel.objdata.getSelectedRows()[0].getSimpleData();
						var state=data.auditstate;
						if(state==0){
							var msgTitle = '删除确认';
							var msgContent = "是否撤回"+data.serialnum+"?";
							$vue.$confirm(msgContent, msgTitle, {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
							}).then(() => {
								viewModel.event.recallSerial(data);
								viewModel.objdata.removeRow(viewModel.objdata.getSelectedIndexs());
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
								message: '非提交态的流水无法进行撤回！',
								type: 'warning',
								offset: '60'
							});
						}

					}else{
						$vue.$message({
							showClose: true,
							message: '请选择要撤回的数据！',
							type: 'warning',
							offset: '60'
						});
					}
				},
				recallSerial :function(data){
					var list=viewModel.event.genDataList(data);
					var paymentid = list[0].paymentid;
					$.ajax({
						type : 'post',
						url : viewModel.recallSerialUrl,
						dataType : 'json',
						// contentType : "application/json",
						data : {
							paymentid:paymentid,
							auditstate:8,
						},
						success : function(res) {
							if( res.success =='success'){
								$vue.$message({
									showClose: true,
									message: '撤回成功!',
									type: 'success',
									offset: '60'
								});
								viewModel.event.loadList();
							}
						},
						error:function(er){
							$vue.$message({
								showClose: true,
								message: '请求失败，请稍后重试！',
								type: 'error',
								offset: '60'
							});
						}
					})
				},
				//提交
				confirmClick:function(){
					var row = viewModel.objdata.getSelectedRows()[0];
					if(row){
						var data = viewModel.objdata.getSelectedRows()[0].getSimpleData();
						var state=data.auditstate;
						if(state==8 || state==2){
							var msgTitle = '提示';
							var msgContent = "是否提交"+data.serialnum+"?";
							$vue.$confirm(msgContent, msgTitle	, {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
							}).then(() => {
									viewModel.event.confirmSerial(data);
									viewModel.objdata.removeRow(viewModel.objdata.getSelectedIndexs());
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
								message: '该流水已提交！',
								type: 'warning',
								offset: '60'
							});
						}

					}else{
						$vue.$message({
							showClose: true,
							message: '请选择要提交的数据！',
							type: 'warning',
							offset: '60'
						});
					}
				},
				confirmSerial :function(data){
					var list=viewModel.event.genDataList(data);
					var paymentid = list[0].paymentid;
					$.ajax({
						type : 'post',
						url : viewModel.recallSerialUrl,
						dataType : 'json',
						// contentType : "application/json",
						data : {
							paymentid:paymentid,
							auditstate:0,
						},
						success : function(res) {
							if( res.success =='success'){
								$vue.$message({
									showClose: true,
									message: '提交成功!',
									type: 'success',
									offset: '60'
								});
								viewModel.event.loadList();
							}else{
								$vue.$message({
    showClose: true,
    message: '无返回数据！',
    type: 'warning',
    offset: '60'
});
							}
						},
						error:function(er){
							$vue.$message({
    showClose: true,
    message: '请求失败，请稍后重试！',
    type: 'error',
    offset: '60'
});
						}

					})

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
					$(element).find("#searchType").each(function() {

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
					$(element).find("#searchStatus").each(function() {

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
					$(element).find("#searchTime").each(function() {

						if (this.value == undefined || this.value == '' || this.value.length == 0) {
							//不执行操作
						} else {
							if (this.value == "近7天") {
								jsonData['search_time'] = 0;
							} else if (this.value == "近30天") {
								jsonData['search_time'] = 1;
							} else if (this.value == "上个月") {
								jsonData['search_time'] = 2;
							}
						}
					});
					// 根据id获取
					if (obj) {
						if (obj != '' || obj.length != 0) {
							jsonData['search_id'] = obj.join();
						}
					}
					if (this.getUrlParams('id')) {

						var id = this.getUrlParams('id');
						jsonData['search_billid'] = id;
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
				// 渲染类型
				renderStatus : function(obj) {
					if (obj.value == 0) {
						var val = '提交态';
					} else if (obj.value == 1) {
						var val = '审核已通过';
					} else if (obj.value == 2) {
						var val = '审核未通过';
					} else if(obj.value == 8){
						var val = '自由态';
					}else{
						val = "";
					}
					obj.element.innerHTML = val;
				},
				renderType : function(obj) {
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
				 renderPayMethod : function(obj) {
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
				renderPayType : function(obj) {
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
				//编辑
				editClick : function(obj) {
					var row = viewModel.objdata.getSelectedRows()[0];
					if (row) {
						var projectdata = row.getSimpleData();
						var state=projectdata.auditstate;
						if(state==8 || state==2){
							viewModel.event.clearDt(viewModel.objdatanew);
							var newr = viewModel.objdatanew.createEmptyRow();
							projectdata.auditstate=0;
							newr.setSimpleData(projectdata);
							viewModel.objdatanew.setRowSelect(newr);
							window.md = u.dialog({
								id : 'add_payment',
								content : "#dialog_content_payment",
								hasCloseMenu : true
							});
						}else{
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
				saveClick : function() {
					var data = viewModel.objdatanew.getSelectedRows()[0].getSimpleData();
					if (!viewModel.app.compsValidate($('#add-form')[0])) {
						return;
					}
					viewModel.event.cancelClick();
					viewModel.event.save(data);
				},
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
									viewModel.event.loadList();
									$vue.$message({
										showClose: true,
										message: '修改成功!',
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
