define(['text!pages/procedure/procedureDetail.html', 'css!pages/procedure/procedureDetail', 'pages/procedure/proceduremeta', 'uuigrid'], function(template) {

	//初始化方法,页面加载后被 调用
	var init = function(element) {
		var viewModel = {
			app : {},
			/* 数据模型 */
			draw : 1,
			totlePage : 0,
			pageSize : 10,
			totleCount : 0,
			// 细项操作参数
			itemObj : {
				type : "add",  // edit ， 用来判断当前操作 是 添加还是编辑
			},
			//存放表单数据
			formList : [],
			//存放用户类型数据
			vdef1List : [{
				name : "勘察",
				value : "sysuser"
			}, {
				name : "管家",
				value : "sysuser"
			}, {
				name : "工人",
				value : "construction"
			}, {
				name : "客户",
				value : "customer"
			}],
			//存放是否依赖上级数据
			vdef2List : [{
				name : "是",
				value : "Y"
			}, {
				name : "否",
				value : "N"
			}],
			//类型list
			typeList : [{
				name : "业务",
				value : "业务"
			}, {
				name : "施工",
				value : "施工"
			}, {
				name : "验收",
				value : "验收"
			}, {
				name : "竣工验收",
				value : "竣工验收"
			}, {
				name : "客户评价",
				value : "客户评价"
			},
			],
			// 流程
			listUrl : ctx + '/procedure/list.do',
			addUrl : ctx + '/procedure/save.do',
			detailUrl : ctx + '/procedure/detail.do',
			formListUrl : ctx + '/form/listall.do',

			objdata : new u.DataTable(proceduremeta),
			objdatanew : new u.DataTable(proceduremeta),
			// 细项
			procedureitemlisturl : ctx + "/procedureitem/page.do",
			itemdata : new u.DataTable(procedureitemmeta),
			itemdatanew : new u.DataTable(procedureitemmeta),

			event : {
				pageInt : function() {
					viewModel.app = u.createApp({
						el : element,
						model : viewModel
					});
					// 编辑流程基本信息
					viewModel.event.clearDt(viewModel.objdata);
					var newr = viewModel.objdata.createEmptyRow();
					viewModel.objdata.setRowSelect(newr);
					// 编辑 细项列表
					viewModel.event.clearDt(viewModel.itemdata);

					// 细项分页
					//分页初始化
					// var paginationDiv = $(element).find('#pagination')[0];
					// this.comps=new u.pagination({el:paginationDiv,jumppage:true});
					// this.comps.update({pageSize: 10 });  //默认每页显示5条数据
					// viewModel.event.pageChange();
					// viewModel.event.sizeChange();

					var id = [];
					if (this.getUrlParams('id')) {
						var procedureid = this.getUrlParams('id');
						id.push(procedureid);
						this.loadList(id);
					}
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
				//分页相关
				pageChange : function() {
					viewModel.event.comps.on('pageChange', function(pageIndex) {
						viewModel.draw = pageIndex + 1;
						viewModel.event.loadItemList();
					});
				},
				sizeChange : function() {
					viewModel.event.comps.on('sizeChange', function(arg) {
						viewModel.pageSize = parseInt(arg);
						viewModel.draw = 1;
						viewModel.event.loadItemList();
					});
				},
				//加载 流程列表
				loadList : function(obj, filter) {

					var jsonData = {
						// pageIndex:viewModel.draw-1,
						// pageSize:viewModel.pageSize,
						// sortField:"",
						// sortDirection:"asc",
					};
					$(element).find('#objdata_code').removeProp("readonly");
					$(element).find('#objdata_version').removeProp("readonly");
					// 根据id获取
					if (obj) {
						if (obj != '' || obj.length != 0) {
							// jsonData['search_procedureid'] = obj.join();
							jsonData['procedureid'] = obj.join();
							$(element).find('#objdata_code').attr("readonly", "readonly");
							$(element).find('#objdata_version').attr("readonly", "readonly");
						}
					}
					$.ajax({
						type : 'get',
						url : viewModel.detailUrl,
						dataType : 'json',
						data : jsonData,
						contentType : 'application/json;charset=utf-8',
						success : function(res) {
							if (res) {
								if (res.success == 'success') {
									if (res.detailMsg.data) {
										var newrow = viewModel.objdata.getSelectedRows()[0];
										var data = res.detailMsg.data;
										newrow.setSimpleData(data);
										if (data.id_procedurebody) {
											viewModel.itemdata.addSimpleData(data.id_procedurebody);
										}
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
				//类型

				renderType : function(obj) {
					if (obj.value == '') {
						var val = '暂未选择';
					} else if (obj.value == 'Y') {
						var val = '是';
					} else if (obj.value == 'N') {
						var val = '否';
					} else {
						var val = '异常数据';
					}
					obj.element.innerHTML = val;
				},
				renderUserType : function(obj) {
					if (obj.value == '') {
						var val = '暂未选择';
					} else if (obj.value == 'sysuser') {
						var val = '勘察';
					} else if (obj.value == 'sysuser') {
						var val = '管家';
					} else if (obj.value == 'construction') {
						var val = '工人';
					} else if (obj.value == 'customer') {
						var val = '客户';
					} else {
						var val = '异常数据';
					}
					obj.element.innerHTML = val;
				},
				// 点击   保存流程
				saveClick : function() {
					if (!viewModel.app.compsValidate($('#add-procedure')[0])) {
						return;
					}
					var data = viewModel.objdata.getSelectedRows()[0];
					var row = viewModel.itemdata.getSimpleData();
					data = data.getSimpleData();
					if (row) {
						var row_new = row.map(function(item) {
							var str = "itemorder,procedurebid,procedureid,itemname,type,formid,vdef1,vdef2,formname,memo";
							for (var key in item) {
								if (str.indexOf(key) == -1) {
									delete item[key];
								}
							}
							return item;
						});
						data.id_procedurebody = row_new;
					} else {
						$vue.$message({
							showClose: true,
							message: '请至少添加一项！',
							type: 'warning',
							offset: '60'
						});
						return;
					}
					viewModel.event.save(data);
				},
				// 保存
				save : function(data) {

					var list = viewModel.event.genDataList(data);
					$.ajax({
						type : 'post',
						url : viewModel.addUrl,
						dataType : 'json',
						contentType : "application/json",
						data : JSON.stringify(list),
						success : function(res) {
							if (res) {
								if (res.success == 'success' && res.detailMsg) {
									// var procedureid = res.detailMsg.data.procedureid;
									// if (procedureid) {
										// var newrow = viewModel.objdata.getSelectedRows()[0];
										// newrow.setValue('procedureid', procedureid);
										//
										// viewModel.event.clearDt(viewModel.itemdata);
										// viewModel.itemdata.setSimpleData(res.detailMsg.data.id_procedurebody);
									// }
									// u.messageDialog({
										// msg : '保存成功！',
										// btnText : '确定'
									// });
									// md.close();
									window.location.href='#/procedure/procedure';
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
				// 添加  点击
				add_item : function() {
					//1. 创建空数据
					//1.1 先清空
					//1.2再创建
					//2.填写数据
					//3.更新数据

					viewModel.itemObj.type = 'add';
					$('#dialog_item').find('.u-msg-title').html("<h4>新增流程细项</h4>");
					viewModel.event.clearDt(viewModel.itemdatanew);
					var newr = viewModel.itemdatanew.createEmptyRow();
					viewModel.itemdatanew.setRowSelect(newr);
					window.md = u.dialog({
						id : 'add_procedureitem',
						content : "#dialog_item",
						hasCloseMenu : true
					});
				},
				// 确认细项点击
				confirm_item : function() {

					var row = viewModel.itemdatanew.getSelectedRows();
					var type = viewModel.itemObj.type;
					if (!viewModel.app.compsValidate($('#add-form')[0])) {
						return;
					}
					if (row) {
						var data = row[0].data;
						if (type == 'edit') {
							viewModel.itemdata.removeRows(viewModel.itemdata.getSelectedIndexs());
						}
						var formname = $('#formname-id').val();
						var newrow = viewModel.itemdatanew.getSelectedRows()[0];
						newrow.setValue('formname', formname);
						viewModel.itemdata.addSimpleData(newrow.data);
						// viewModel.itemdatanew.addSimpleData(row.getSimpleData());
						viewModel.event.cancel_item();
						viewModel.itemdata.setAllRowsUnSelect();

					} else {
						$vue.$message({
							showClose: true,
							message: '请至少添加一项！',
							type: 'warning',
							offset: '60'
						});
					}
				},
				// 编辑细项
				edit_item : function() {
					viewModel.itemObj.type = 'edit';
					$('#dialog_item').find('.u-msg-title').html("<h4>编辑流程细项</h4>");
					viewModel.event.clearDt(viewModel.itemdatanew);
					// $('#add_note_area').val();
					var row = viewModel.itemdata.getSelectedRows()[0];
					if (row) {
						viewModel.itemdatanew.setSimpleData(viewModel.itemdata.getSimpleData({
							type : 'select'
						}));
						window.md = u.dialog({
							id : 'add_procedureitem',
							content : "#dialog_item",
							hasCloseMenu : true
						});
					} else {
						$vue.$message({
    showClose: true,
    message: '请选择要编辑的数据！',
    type: 'warning',
    offset: '60'
});
					}
				},
				// 删除细项
				del_item : function() {
					var row = viewModel.itemdata.getSelectedRows()[0];
					if (row) {
						var data = row.getSimpleData();
						viewModel.itemdata.removeRow(viewModel.itemdata.getSelectedIndexs());
					} else {
						$vue.$message({
							showClose: true,
							message: '请选择要删除的数据！',
							type: 'warning',
							offset: '60'
						});
					}
				},
				// 取消点击
				cancel_item : function() {
					md.close();
				},
				//初始化，发送ajax，获得材料，用于下拉框
				loadformInit : function() {
					$.ajax({
						type : "GET",
						async : false,
						url : viewModel.formListUrl,
						contentType : 'application/json;charset=utf-8',
						dataType : 'json',
						success : function(res) {
							if (res) {

								var list = [{
									"name" : "请选择表单",
									"value" : "",
									"formid" : ""
								}].concat(res || []);
								var newlist = list.map(function(item) {
									var str = "name,value";
									if (item.formid) {
										item.name = item.formname;
										item.value = item.formid;
									}
									for (var key in item) {
										if (str.indexOf(key) == -1) {
											delete item[key];
										}
									}
									return item;
								});

								viewModel.formList = newlist;
							} else {
								console.error('未获取到枚举值，请检查。');
							}
						}
					});

				}
			}

		};

		$(element).html(template);
		viewModel.event.loadformInit();
		viewModel.event.pageInt();
	};

	return {
		// 'model': viewModel,
		'template' : template,
		'init' : init
	};
});
