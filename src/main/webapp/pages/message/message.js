define(['text!pages/message/message.html', 'pages/message/messagemeta', 'css!pages/message/message', 'uuitree', 'uuigrid', 'config/sys_const'], function(html) {

	//初始化方法,页面加载后被 调用
	var init = function(element, params) {
		//全部消息/未读消息/已读消息

		var messagelistUrl = ctx + '/message/list.do';
		//标记为已读
		var signreadUrl = ctx + '/message/updateread.do';
		//标记为未读
		var signunreadUrl = ctx + '/message/updateunread.do';
		var viewModel = {
			app : {},
			/* 数据模型 */
			draw : 1,
			totlePage : 0,
			pageSize : 20,
			totleCount : 0,
			messageType : '',
			signUrl : '',
			//展示数据
			messageDa : new u.DataTable(metaMessage),
			//编辑数据
			messageDaNew : new u.DataTable(metaMessage),
			// 筛选 数据
			searchdatanew : new u.DataTable(metadataMessage),
			typeList : [{
				name : "全部",
				value : "-1"
			}, {
				name : "未读",
				value : "0"
			}, {
				name : "已读",
				value : "1"
			}],
			event : {
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
					viewModel.event.resetfilterclick(true);
					viewModel.draw = 1;
					viewModel.event.loadMessageList(id);
				},
				// 筛选    按钮事件
				filterClick:function(){
					$("#search").val('');
					var obj = viewModel.event.resetfilterclick(false);
					viewModel.event.loadMessageList('',obj);
				},
				// 重置 筛选条件
                resetfilterclick:function(bool){
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
                },

				//分页相关
				pageChange : function() {
					viewModel.event.comps.on('pageChange', function(pageIndex) {
						viewModel.draw = pageIndex + 1;
						viewModel.event.loadMessageList();
						var typer = $(this).attr('data-type');
					});
				},
				sizeChange : function() {
					viewModel.event.comps.on('sizeChange', function(arg) {
						viewModel.pageSize = parseInt(arg);
						viewModel.draw = 1;
						viewModel.event.loadMessageList();
						var typer = $(this).attr('data-type');
					});
				},
				//页面初始化
				pageInit : function() {
					viewModel.app = u.createApp({
						el : element/* Document.body */,
						model : viewModel
					})
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
					viewModel.event.pageChange();
					viewModel.event.sizeChange();

					//回车搜索
					$('.input_enter').keydown(function(e) {
						if (e.keyCode == 13) {
							viewModel.event.searchClick()
							u.stopEvent(e);
						}
					});

					// 搜索初始化
					viewModel.event.clearDt(viewModel.searchdatanew);
					var newr = viewModel.searchdatanew.createEmptyRow();
					viewModel.searchdatanew.setRowsSelect(newr);

					//url参数
					var href=location.href;
					if(href.indexOf('search_messageType') != -1){
						viewModel.messageType=0;
						var temp = viewModel.searchdatanew.getSelectedRows()[0];
						temp.setValue("messagetype",0);
					}
					viewModel.event.loadMessageList();
				},
				//获取全部系统消息列表
				loadMessageList : function() {
					var jsonData = {
						pageIndex : viewModel.draw - 1,
						pageSize : viewModel.pageSize,
						sortField : "ts",
						sortDirection : "desc",
						search_messageType : viewModel.messageType
					};
					//搜索框
					$(element).find("#search").each(function() {
						if (this.value == undefined || this.value == '' || this.value.length == 0) {
							//不执行操作
						} else {
							jsonData['search_searchParam'] = this.value.replace(/(^\s*)|(\s*$)/g, "");
							//去掉空格
						}
					});

					//搜索框
					$(element).find("#searchType").each(function() {
						if (this.value == undefined || this.value == '' || this.value == -1) {
							$(element).find('#read').show();
							//不执行操作
						} else if (this.value == '未读') {
							$(element).find('#read').show();
							jsonData['search_messageType'] = 0;
							//去掉空格
						} else if (this.value == '已读') {
							$(element).find('#read').hide();
							jsonData['search_messageType'] = 1;
							//去掉空格
						}

					});

					//发送请求
					$.ajax({
						type : 'get',
						url : messagelistUrl,
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
										viewModel.messageDa.removeAllRows();
										viewModel.messageDa.clear();
									} else {
										viewModel.totleCount = res.detailMsg.data.totalElements;
										viewModel.totlePage = res.detailMsg.data.totalPages;
										viewModel.event.comps.update({
											totalPages : viewModel.totlePage,
											pageSize : viewModel.pageSize,
											currentPage : viewModel.draw,
											totalCount : viewModel.totleCount
										});
										viewModel.messageDa.removeAllRows();
										viewModel.messageDa.clear();
										viewModel.messageDa.setSimpleData(res.detailMsg.data.content, {
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
				//标记为已读/未读
				signlist : function(data) {
					// var list=viewModel.event.genDataList(data);
					data = data.join(',');
					$.ajax({
						type : 'post',
						url : viewModel.signUrl,
						// dataType : 'json',
						// contentType : "application/json",
						data : {
							messageids : data
						},
						success : function(res) {
							if (res) {
								if (res.success == 'success') {
									$vue.$message({
    showClose: true,
    message: '保存成功!',
    type: 'success',
    offset: '60'
});
									viewModel.event.loadMessageList();
									// md.close();
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

				//已读消息点击
				// selectreadMessageClick : function() {
					// viewModel.draw = 1;
					// viewModel.messageType = 1;
					// viewModel.event.loadMessageList();
				// },
				//未读消息点击
				// selectunreadMessageClick : function() {
					// viewModel.draw = 1;
					// viewModel.messageType = 0;
					// viewModel.event.loadMessageList();
				// },
				//全部消息点击
				// selectallMessageClick : function() {
					// viewModel.draw = 1;
					// viewModel.messageType = '';
					// viewModel.event.loadMessageList();
				// },
				//返回点击
				returnClick : function  () {
				  $(element).find('#returnBtn').hide();
				  $("#search").val('');
				  viewModel.event.loadMessageList();
				},
				//搜索点击
				searchClick : function() {
					$(element).find('#returnBtn').show();
					viewModel.draw = 1;
					viewModel.event.loadMessageList();
				},
				//标记为已读点击
				singnreadClick : function() {
					var data = viewModel.messageDa.getSimpleData({
						type : 'select'
					});
					if (data[0].state == 1) {
						$vue.$message({
							showClose: true,
							message: '该消息已是已读状态！',
							type: 'warning',
							offset: '60'
						});
					} else {
						var arr = [];
						for (var i = 0, j = data.length; i < j; i++) {
							arr.push(data[i].messageid);
						}
						viewModel.signUrl = signreadUrl;
						viewModel.event.signlist(arr);
						var msgNum=$('.msgMenu').find('span').text();
						msgNum-=arr.length;
						if(msgNum>0){
							$('.msgMenu').find('i').css('color','rgb(232,17,25)');
							$('.msgMenu').find('span').text(msgNum);
							$('.msgMenu').find('span').css('padding','0 3px');
						}else{
							$('.msgMenu').find('i').css('color','rgb(3, 162, 228)');
							$('.msgMenu').find('span').text('');
							$('.msgMenu').find('span').css('padding','0');
						}
					}
				},
				//标记为未读点击
				//  singnunreadClick : function() {
				// 	var data = viewModel.messageDa.getSimpleData({
				// 		type : 'select'
				// 	});
				// 	var arr = [];
				// 	for (var i = 0, j = data.length; i < j; i++) {
				// 		arr.push(data[i].messageid);
				// 	}
				// 	viewModel.signUrl = signunreadUrl;
				// 	viewModel.event.signlist(arr);
				// },
				// //添加点击查看详情
                // renderTypeAjax:function (obj) {

                //     var id = obj.row.value.id;
                //     var text = obj.value;
                //     var html = "<a title='"+text+"' class='c_green' style='text-decoration: underline;' href='#/message/messageDetail?id="+ id +"'>" + text||id + "</a>";
                //     obj.element.innerHTML = html;
                // },
			}

		};
		$(element).html(html);
		viewModel.event.pageInit();
		// 绑定地址触发
        viewModel.searchdatanew.on('valueChange', function(event){


            var filename = event.field;  // 改变的字段
            // var oldValue = event.oldValue;
            var newValue = event.newValue;
            //全部判断
            if(newValue == 0){  //未读
            	viewModel.draw = 1;
			    viewModel.messageType = 0;
			    viewModel.event.loadMessageList();
            }else if(newValue == 1){  // 已读
            	viewModel.draw = 1;
			    viewModel.messageType = 1;
			    viewModel.event.loadMessageList();
            }else{
            	viewModel.draw = 1;
			    viewModel.messageType = -1;
			    viewModel.event.loadMessageList();
            }

		});

		if (u.isIE8) {
			$('.ie8-bg').css('display', 'block');
		};
	};
	return {
		'template' : html,
		init : init
	}
});

