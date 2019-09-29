define(['text!pages/form/formDetail.html', 'css!pages/form/formDetail', 'pages/form/formmeta', 'uuigrid'], function(template) {

	//初始化方法,页面加载后被 调用
	var init = function(element) {
		var viewModel = {
			app : {},
			/* 数据模型 */
			draw : 1,
			totlePage : 0,
			pageSize : 10,
			totleCount : 0,

			// 表单
			addUrl : ctx + '/form/save.do',
			detailUrl : ctx + '/form/detail.do',
			objdatanew : new u.DataTable(formmeta),

			objbdata : new u.DataTable(formbmeta),
			objbdatanew : new u.DataTable(formbmeta),

			// 字段类型
            typeList:[
                {name: "文本", value: "text"},
                {name: "图片", value: "img"},
                {name: "复选", value: "checkbox"},
                {name: "单选", value: "radio"},
                {name: "下拉", value: "select"},
                {name: "整数", value: "int"},
                {name: "浮点", value: "double"},
                {name: "开关", value: "switch"},
                {name: "文本域", value: "textarea"},
                {name: "评分", value: "rate"}
			],
			event : {
				pageInt : function() {

					viewModel.app = u.createApp({
						el : element,
						model : viewModel
					});
					// 编辑信息
					viewModel.event.clearDt(viewModel.objdatanew);
					var newr = viewModel.objdatanew.createEmptyRow();
					viewModel.objdatanew.setRowSelect(newr);
					// 编辑列表
					viewModel.event.clearDt(viewModel.objbdatanew);

					var id = [];
					if (this.getUrlParams('id')) {
						var formid = this.getUrlParams('id');
						id.push(formid);
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

				//加载 表单列表
				loadList : function(obj, filter) {
					var jsonData = {
						// pageIndex:viewModel.draw-1,
						// pageSize:viewModel.pageSize,
						// sortField:"",
						// sortDirection:"asc",
					};
					// 根据id获取
					if (obj) {
						if (obj != '' || obj.length != 0) {
							// jsonData['search_formid'] = obj.join();
							jsonData['formid'] = obj.join();
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

										var newrow = viewModel.objdatanew.getSelectedRows()[0];
										var data = res.detailMsg.data;
										newrow.setSimpleData(data);
										if (data.id_formb) {
											viewModel.objbdata.addSimpleData(data.id_formb);
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
				// // 类型
				// renderTypeAjax : function(obj) {
				// var text = obj.value == 1 ? '基础' : '附加';
				// obj.element.innerHTML = text;
				// },

				// 保存表单
				saveClick : function() {

					if (!viewModel.app.compsValidate($('#add-form')[0])) {
						return;
					}
					var data = viewModel.objdatanew.getSelectedRows()[0];
					var row = viewModel.objbdata.getSimpleData();
					data = data.getSimpleData();
					if (row) {
						var row_new = row.map(function(formb) {
							var str = "formbid,formid,displayname,,attribute,type,memo";
							for (var key in formb) {
								if (str.indexOf(key) == -1) {
									delete formb[key];
								}
							}
							return formb;
						});
						data.id_formb = row_new;
					} else {
						$vue.$message({
    showClose: true,
    message: '请至少添加一个字段！',
    type: 'warning',
    offset: '60'
});
						return;
					}
					viewModel.event.save(data);
				},
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
									// var formid = res.detailMsg.data.formid;
									// if (formid) {
										// var newrow = viewModel.objdatanew.getSelectedRows()[0];
										// newrow.setValue('formid', formid);
									// }
									// u.messageDialog({
										// msg : '保存成功！',
										// btnText : '确定'
									// });
									// // md.close();
									window.location.href='#/form/form';
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

				// 添加字段
				add_formb : function() {

					$('#dialog_content_formb').find('.u-msg-title').html("<h4>新增字段</h4>");
					$('#dialog_content_formb').find("#meno").val(null);
					viewModel.event.clearDt(viewModel.objbdatanew);
					var newr = viewModel.objbdatanew.createEmptyRow();
					viewModel.objbdatanew.setRowSelect(newr);
					window.md = u.dialog({
						id : 'add_formb',
						content : "#dialog_content_formb",
						hasCloseMenu : true
					});
				},
				// edit字段
				edit_formb : function() {
					$('#dialog_content_formb').find('.u-msg-title').html("<h4>编辑字段</h4>");
					viewModel.event.clearDt(viewModel.objbdatanew);
					var row = viewModel.objbdata.getSelectedRows()[0]
					if (row) {

						$('#dialog_content_formb').find("#meno").val(row.data.memo.value);
						viewModel.objbdatanew.setSimpleData(viewModel.objbdata.getSimpleData({
							type : 'select'
						}));

						//$('#paymoney').attr("readonly", "readonly");
						window.md = u.dialog({
							id : 'add_formb',
							content : "#dialog_content_formb",
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
				//保存  点击
				saveFormbClick : function() {
					var data = viewModel.objbdatanew.getSelectedRows()[0].getSimpleData();

					var memo = $('#dialog_content_formb').find("#meno").val();
					data.memo = memo;
					if (!viewModel.app.compsValidate($('#add-formb')[0])) {
						return;
					}
					if($('#dialog_content_formb').find('.u-msg-title').html()=='<h4>编辑字段</h4>')viewModel.objbdata.removeRow(viewModel.objbdata.getSelectedIndexs());
					viewModel.objbdata.addSimpleData(data);
					// viewModel.bdatanew.addSimpleData(row.getSimpleData());
					viewModel.event.cancelClick();
				},
				// 删除字段
				del_formb : function() {

					var row = viewModel.objbdata.getSelectedRows()[0];
					if (row) {
						var data = row.getSimpleData();
						var msgTitle = '删除确认';
						var msgContent = "是否删除" + data.displayname + "?";
						$vue.$confirm(msgContent, msgTitle, {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						  }).then(() => {
							viewModel.objbdata.removeRow(viewModel.objbdata.getSelectedIndexs());
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
				//取消点击
				cancelClick : function() {
					md.close();
				},
				
				// 渲染类型
                renderType_type:function (obj) {
                    var arr = viewModel.typeList;
                    var str = obj.value;
                    var val;
                    for(let i=0,j=arr.length;i<j;i++){
						let temp = arr[i];
						if(temp.value==str){
							val = temp.name;
							break;
						}
					}
                    obj.element.innerHTML = val;
                },
			}
		};

		$(element).html(template);
		viewModel.event.pageInt();

	};

	return {
		//'model': viewModel,
		'template' : template,
		'init' : init
	};
});
