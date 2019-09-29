define(['text!pages/worker/workerDetail.html', 'css!pages/worker/workerDetail', 'pages/worker/workermeta', 'uuigrid'], function(template) {

	//初始化方法,页面加载后被 调用
	var init = function(element) {

		var viewModel = {
			app : {},
			/* 数据模型 */
			draw : 1,
			totlePage : 0,
			pageSize : 10,
			totleCount : 0,

			objListUrl : ctx + '/construction/page.do',
			objAddUrl : ctx + '/construction/save.do',
			QRCodeUrl : ctx + '/construction/qrcode',

			objdata : new u.DataTable(workermeta),
			objdatanew : new u.DataTable(workermeta),

			// 施工日志
			workdata : new u.DataTable(workermeta),
			ownerList : [{
				name : "请选择接口人",
				value : ""
			}, {
				name : "接口人0",
				value : "接口人0"
			}, {
				name : "接口人1",
				value : "接口人1"
			}, {
				name : "接口人2",
				value : "接口人2"
			}],
			jobscopeList : [{
				name : "请选择工种",
				value : ""
			}, {
				name : "工种0",
				value : "工种0"
			}, {
				name : "工种1",
				value : "工种1"
			}, {
				name : "工种2",
				value : "工种2"
			}],

			event : {
				//页面初始化
				pageInit : function() {
					ids = [];
					viewModel.app = u.createApp({
						el : element/* Document.body */,
						model : viewModel
					});

					// 编辑客户基本信息
					viewModel.event.clearDt(viewModel.objdatanew);
					var newr = viewModel.objdatanew.createEmptyRow();
					viewModel.objdatanew.setRowSelect(newr);

					if (this.getUrlParams('id')) {
						var id = this.getUrlParams('id');
						viewModel.id = id;
						ids.push(id);

						// //?????
						// var newrow = viewModel.objdatanew.getSelectedRows()[0];
						// newrow.setValue('id',id);

						this.loadList(ids);
						$('.logoUrl').removeClass('c_hide');
						$('.qrcode').removeClass('c_hide');
					}else{
						$('.logoUrl').addClass('c_hide');
						$('.qrcode').addClass('c_hide');
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
						viewModel.event.loadList(treeid);
					});
				},
				sizeChange : function() {
					viewModel.event.comps.on('sizeChange', function(arg) {
						viewModel.pageSize = parseInt(arg);
						viewModel.draw = 1;
						viewModel.event.loadList(treeid);
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
						contentType : 'application/json;charset=utf-8',
						success : function(res) {
							if (res) {
								if (res.success == 'success') {
									var newrow = viewModel.objdatanew.getSelectedRows()[0];
									var data = res.detailMsg.data.content[0];
									$("#erweimaimg").attr("src","http://dmzoss.iyuhong.com.cn/"+data.id);
									$("#erweimaimg").attr("data-url","http://dmzoss.iyuhong.com.cn/"+data.id);
									if(data.photo){
										$("#photo").attr("src","http://dmzoss.iyuhong.com.cn/"+data.photo +'?imageView2/1/w/200/h/200');
										$("#photo").attr("data-url","http://dmzoss.iyuhong.com.cn/"+data.photo);
									}else{
										$("#photo").attr("src","static/constructionphoto.jpg");
										$("#photo").attr("data-url","static/constructionphoto.jpg");
									}
									newrow.setSimpleData(data);
									$("#rate").attr("readonly","readonly");
									//更新二维码
									viewModel.event.updateClick();
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
					var id = obj.row.value.id;
					var text = obj.value;
					var html = "<a title='" + text + "' class='c_green' style='text-decoration: underline;' href='#/worker/workerDetail?id=" + id + "'>" + text || id + "</a>";
					obj.element.innerHTML = html;
				},
				updateClick:function(){
					var data = viewModel.objdatanew.getSelectedRows()[0].getSimpleData();
					var auto = new Date().getTime()
					$("#erweimaimg").attr("src",viewModel.QRCodeUrl+'?id='+data.id+'&'+auto);
				},
				// 保存
				saveClick : function() {
					var data = viewModel.objdatanew.getSelectedRows()[0].getSimpleData();

					if (!viewModel.app.compsValidate($('#add-form')[0])) {
						return;
					}
					viewModel.event.save(data);
				},
				save : function(data) {
					data.blmemo = '';
					var list = viewModel.event.genDataList(data);
					$.ajax({
						type : 'post',
						url : viewModel.objAddUrl,
						dataType : 'json',
						contentType : "application/json",
						data : JSON.stringify(list),
						success : function(res) {
							if (res) {

								if (res.success == 'success' && res.detailMsg) {
									// var id = res.detailMsg.data.id;
									// if (id) {
										// var newrow = viewModel.objdatanew.getSelectedRows()[0];
										// newrow.setValue('id', id);
									// }
									// u.messageDialog({
										// msg : '保存成功！',
										// btnText : '确定'
									// });
									// //返回列表
									// viewModel.event.loadList();
									window.location.href='#/worker/worker';
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
				// 查看图片
				showimgClick:function () {
					// viewModel.showimg.isshow = false;
					$(".part-imgshow").addClass("c_hide");
				},
			}

		};

		$(element).html(template);
		viewModel.event.pageInit();

		// viewModel.objdatanew.on('valueChange', function(event) {
		//
		//
		// let
		// filename = event.field;
		// // 改变的字段
		// var oldValue = event.oldValue;
		// var newValue = event.newValue;
		//
		// });

		//查看图片
		$(".showimg").on("click","img.display",function () {
			var url = $(this).attr("data-url");
			$(".part-imgshow img").attr("src",url);
			$(".part-imgshow").removeClass("c_hide");

		});

	};

	return {
		// 'model': viewModel,
		'template' : template,
		'init' : init
	};
});
