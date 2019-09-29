define(['text!pages/rewardrules/rewardrulesDetail.html', 'css!pages/rewardrules/rewardrulesDetail', 'pages/rewardrules/rewardrulesmeta', 'uuigrid'], function(template) {

	//初始化方法,页面加载后被 调用
	var init = function(element) {

		var viewModel = {
			app : {},
			/* 数据模型 */
			draw : 1,
			totlePage : 0,
			pageSize : 10,
			totleCount : 0,

			objListUrl : ctx + '/rules/page.do',
			objAddUrl : ctx + '/rules/save.do',
			agentUrl : ctx + '/agent/page.do',

			objdata : new u.DataTable(productitemmeta),
			objdatanew : new u.DataTable(productitemmeta),
			typeList : [{name : "全部",value : 0},{name : "基础",value : 1}, {name : "附加",value : 2}],
			materialList :[],
			//业绩类型
			performancetypeList:[
				{name:'屋面勘察',value:'581dd2f4-932e-4f64-996e-d033b673b9e8'},
				{name:'窗户勘察',value:'223c9a41-2807-4b4d-9a62-bad09e68835a'},
				{name:'卫生间勘察',value:'71354a9c-ba4a-4fd8-a30e-ef0f6a4ec474'},
				{name:'签单',value:'29735f82-7963-4c17-8f43-b2d68d34d449'},
				//{name:'工程完工',value:'竣工验收'}
			],
			//奖励类型
			rewardtypeList:[
				{name:'固定金额',value:0},
				{name:'订单金额百分比',value:1}
			],
			//适用运营商
			agentList:[
				{name:'全部运营商',value:'-1'}
			],
			//规则是否启用
			enabledList:[{name:"是", value:1},{name:"否",value:0}],

			event : {
				//页面初始化
				pageInit : function() {
					ids = [];
					viewModel.app = u.createApp({
						el : element/* Document.body */,
						model : viewModel
					});

					// 编辑产品细项
					viewModel.event.clearDt(viewModel.objdatanew);
					// $("#memo").val("");
					var newr = viewModel.objdatanew.createEmptyRow();
					viewModel.objdatanew.setRowSelect(newr);
					//$('#itemcode').removeProp("readonly");

					//获取所有运营商
					this.getAgentList();

					if (this.getUrlParams('id')) {
						var id = this.getUrlParams('id');
						viewModel.id = id;
						ids.push(id);
						this.loadList(ids);
						//$('#itemcode').attr("readonly","readonly");
					}

					//奖励类型改变,奖励金额单位改为"元"或"%"
					viewModel.objdatanew.on('valueChange', function(event){
						let filename = event.field;  // 改变的字段
						var oldValue = event.oldValue;
						var newValue = event.newValue;
						if(filename == 'rewardtype'){
							if(newValue == '1'){ //百分比
								$('#rewardRatio').val('%');
							}else if(newValue == '0'){ //具体金额
								$('#rewardRatio').val('元');
							}
						}
					});
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
				//获取所有运营商
				getAgentList : function(){
					var jsonData = {
						pageIndex: 0,
						pageSize: 100
					}
					$.ajax({
						type : 'get',
						url : viewModel.agentUrl,
						dataType : 'json',
						data : jsonData,
						async: false,
						contentType : 'application/json;charset=utf-8',
						success : function(res) {
							if (res) {
								if (res.success == 'success') {
									var array = res.detailMsg.data.content;
									for(var arr of array){
										var obj = {};
										obj['name'] = arr.agentname;
										obj['value'] = arr.agentid;
										viewModel.agentList.push(obj);
                                    }
									document.getElementById('combobox_agentname')['u.Combo'].setComboData(viewModel.agentList);
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
				// 加载 产品细项
				loadList : function(obj, filter) {
					var jsonData = {
						pageIndex : viewModel.draw-1,
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
									//
                                    // $("#memo").val("");
                                    //
									var newrow = viewModel.objdatanew.getSelectedRows()[0];
									var data = res.detailMsg.data.content[0];
									// var val = data.memo;
									// $("#memo").val(val);
									newrow.setSimpleData(data);
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
				// 保存
				saveClick : function() {
				    // var memo = $("#memo").val();
					var data = viewModel.objdatanew.getSelectedRows()[0];
					var str = data.data.orgid.value;
					if(str){
						if(str.substr(str.length-1,1) == ','){
							data.data.orgid.value = str.slice(0,str.length-1);
						}
					};
                    // data.setValue("memo",memo);
					if (!viewModel.app.compsValidate($('#productitemDetail')[0])) {
						return;
					}

					var mater=data.getSimpleData().materialid;
					//var amount=data.getSimpleData().materialamount;
					var amount=$("#materialamount").val();
					if(mater != null){
						//没有现在材料没有消耗量
						if(mater.length==0){
						//材料消耗量
							data.setValue('materialamount','');
							viewModel.event.save(data.getSimpleData());
						}else  if(!mater.length==0&&amount==''){
							$vue.$message({
								showClose: true,
								message: '请填写材料消耗量！',
								type: 'warning',
								offset: '60'
							});
						}else {
						viewModel.event.save(data.getSimpleData());
						}
					}else {
						viewModel.event.save(data.getSimpleData());
					}
				},
				save : function(data) {
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
									var id = res.detailMsg.data.id;
									if (id) {
										var newrow = viewModel.objdatanew.getSelectedRows()[0];
										newrow.setValue('id', id);
									}
									// u.messageDialog({
										// msg : '保存成功！',
										// btnText : '确定'
									// });
									//u.showMessage({msg: '保存成功', position: "top",darkType:"dark",width:"300px",height:'25px'})
									$('.alert').css('display','block');
									setTimeout(function(){
										$('.alert').css('display','none');
									},2000)
									window.history.back(-1);
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
				}
			}

		};

		$(element).html(template);
		viewModel.event.pageInit();

	};

	return {
		// 'model': viewModel,
		'template' : template,
		'init' : init
	};
});
