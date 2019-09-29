define(['text!pages/productitem/productitemDetail.html', 'css!pages/productitem/productitemDetail', 'pages/productitem/productitemmeta', 'uuigrid'], function(template) {

	//初始化方法,页面加载后被 调用
	var init = function(element) {

		var viewModel = {
			app : {},
			/* 数据模型 */
			draw : 1,
			totlePage : 0,
			pageSize : 10,
			totleCount : 0,

			objListUrl : ctx + '/productitem/page.do',
			objAddUrl : ctx + '/productitem/save.do',
			//获取全部
			materialListUrl : ctx + '/productitem/materialforitem.do',
			//获取已选中
			getmaterialListUrl : ctx + '/productitem/getItemMaterial.do',
			//保存
			savematerialUrl : ctx + '/productitem/saveItemMaterial.do',
			//删除
			delmaterialUrl : ctx + '/productitem/deleteItemMaterial.do',

			objdata : new u.DataTable(productitemmeta),
			objdatanew : new u.DataTable(productitemmeta),
			//材料列表
			materialdata: new u.DataTable(materialmeta),
			//细项选中的材料列表
			materialdatanew:new u.DataTable(materialmeta),
			typeList : [{name : "全部",value : 0},{name : "基础",value : 1}, {name : "附加",value : 2}],
			materialList :[],

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
					// 材料
					viewModel.event.clearDt(viewModel.materialdata);
					viewModel.event.clearDt(viewModel.materialdatanew);
					//分页初始化
					var paginationDiv = $(element).find('#pagination')[0];
					this.comps=new u.pagination({el:paginationDiv,jumppage:true});
					this.comps.update({pageSize: 10 });  //默认每页显示5条数据
					viewModel.event.pageChange();
					viewModel.event.sizeChange();

					if (this.getUrlParams('id')) {
						var id = this.getUrlParams('id');
						viewModel.id = id;
						ids.push(id);
						this.loadList(ids);
						this.getmeterial(id);
						//$('#itemcode').attr("readonly","readonly");
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
				// 加载 产品细项
				loadList : function(obj, filter) {
					var jsonData = {
						pageIndex : 0,
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
					});
				},
				//获取选中的材料
				getmeterial:function(id){
					$.ajax({
						type : 'get',
						url : viewModel.getmaterialListUrl,
						dataType : 'json',
						data : {
							itemid:id
						},
						contentType : 'application/json;charset=utf-8',
						success : function(res) {
							if (res) {
								if (res.success == 'success') {
									var data = res.detailMsg.data;
									if(data){
										viewModel.materialdatanew.addSimpleData(data);
									}
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
				// 加载全部材料列表
				loadItemList:function(fun){
					var jsonData={
						pageIndex:viewModel.draw-1,
						pageSize:viewModel.pageSize,
						sortField:"",
						sortDirection:"asc",
					};
					var row = viewModel.materialdatanew.getSimpleData();
					if(row){
						var arr = [];
						for(var i=0,j=row.length;i<j;i++){
							if(row[i].materialid){
								arr.push(row[i].materialid);
							}
						}
						if(arr.length > 0) jsonData.search_ids = arr.join(',');
					}
					// 搜索
					$('#search').each(function() {
						if (this.value == undefined || this.value == '' || this.value.length == 0) {
							//不执行操作
						} else {
							jsonData['search_searchParam'] = this.value.replace(/(^\s*)|(\s*$)/g, "");
							//去掉空格
						}
					});
					$.ajax({
						type : 'get',
						url : viewModel.materialListUrl,
						dataType : 'json',
						data:jsonData,
						contentType: 'application/json;charset=utf-8',
						success : function(res) {
							if(res){
								if( res.success =='success'){
									if(!res.detailMsg.data){
										viewModel.totleCount=0;
										viewModel.totlePage=1;
										viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
										viewModel.materialdata.removeAllRows();
										viewModel.materialdata.clear();
									}else{
										viewModel.totleCount=res.detailMsg.data.totalElements;
										viewModel.totlePage=res.detailMsg.data.totalPages;
										viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
										viewModel.materialdata.removeAllRows();
										viewModel.materialdata.clear();
										viewModel.materialdata.setSimpleData(res.detailMsg.data.content,{unSelect:true});
									}
									if(fun)fun();
								}else{
									var msg = "";
									if(res.success == 'fail_global'){
										msg = res.message;
									}else{
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
							}else{
								$vue.$message({
    showClose: true,
    message: '后台返回数据格式有误，请联系管理员！',
    type: 'error',
    offset: '60'
});
							}

						},
						error:function(er){
							$vue.$message({
    showClose: true,
    message: '请求超时，请稍后重试！',
    type: 'error',
    offset: '60'
});
						}
					})
				},
				// 搜索
				searchClick:function(){
					$('#returnBtn').show();
					//viewModel.event.resetfilterclick(true);
					viewModel.draw = 1;
					viewModel.event.loadItemList();
				},
				// 选择细项
				add_item:function () {
					viewModel.event.loadItemList(function () {
						window.md = u.dialog({id:'add_item',content:"#dialog_item",hasCloseMenu:false});
					});
				},
				// 添加细项
				confirm_item:function () {
					var row = viewModel.materialdata.getSelectedRows();
					if(row){
						var dd = viewModel.materialdata.getSimpleData({type:'select'});
						for(let i=0,j=dd.length;i<j;i++){
							dd[i].materialname = dd[i].name;
							dd[i].materialamount = 1;
							dd[i].materialid = dd[i].id;
						}
						viewModel.materialdatanew.addSimpleData(dd);
						// viewModel.materialdatanew.addSimpleData(row.getSimpleData());
						viewModel.event.cancel_item();
						viewModel.materialdatanew.setAllRowsUnSelect();
					}else{
						$vue.$message({
							showClose: true,
							message: '请至少选择一个',
							type: 'warning',
							offset: '60'
						});
					}
					$('#search').val('');
					$('#returnBtn').hide();
				},
				// 删除细项
				del_item:function(){
					var row = viewModel.materialdatanew.getSelectedRows()[0];
					if(row){
						var data = row.getSimpleData();
						var msgTitle = '删除确认';
						var msgContent = "是否删除"+data.materialname+"?";
						$vue.$confirm(msgContent, msgTitle, {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							viewModel.materialdatanew.removeRow(viewModel.materialdatanew.getSelectedIndexs());
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
							message: '请选择要删除的数据',
							type: 'warning',
							offset: '60'
						});
					}
				},

				cancel_item:function () {
					md.close();
					$('#search').val('');
					$('#returnBtn').hide();
				},

				// 添加点击查看详情
				renderTypeAjax : function(obj) {
					var id = obj.row.value.id;
					var text = obj.value;
					var html = "<a style='text-decoration: underline;' href='#/productitem/productitemDetail?id=" + id + "'>" + text || ' ' + "</a>";
					obj.element.innerHTML = html;
				},

				// 保存
				saveClick : function() {
				    // var memo = $("#memo").val();
					var data = viewModel.objdatanew.getSelectedRows()[0];
                    // data.setValue("memo",memo);
					if (!viewModel.app.compsValidate($('#productitemDetail')[0])) {
						return;
					}
					var mater=data.getSimpleData().materialid;
					//var amount=data.getSimpleData().materialamount;
					// var amount=$("#materialamount").val();
					// if(mater != null){
					// 	//没有现在材料没有消耗量
					// 	if(mater.length==0){
					// 	//材料消耗量
					// 		data.setValue('materialamount','');
					// 		viewModel.event.save(data.getSimpleData());
					// 	}else  if(!mater.length==0&&amount==''){
					// 		u.messageDialog({
					// 			msg : '请填写材料消耗量！',
					// 			title : '操作提示',
					// 			btnText : '确定'
					// 		});
					// 	}else {
					// 	viewModel.event.save(data.getSimpleData());
					// 	}
					// }else {
						viewModel.event.save(data.getSimpleData());
					// }
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
									var id = res.detailMsg.data.itemid;
									if (id) {
										var newrow = viewModel.objdatanew.getSelectedRows()[0];
										newrow.setValue('itemid', id);
										viewModel.event.savematerial(id);
									}
									// u.messageDialog({
										// msg : '保存成功！',
										// btnText : '确定'
									// });
									//u.showMessage({msg: '保存成功', position: "top",darkType:"dark",width:"300px",height:'25px'})

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
				savematerial:function (id) {
					var list = viewModel.materialdatanew.getSimpleData();
					var list_temp = new Array();
					for(let i=0,j=list.length;i<j;i++){
						var obj = {};
						obj.materialname = list[i].materialname;
						obj.materialamount = list[i].materialamount||1;
						obj.materialid = list[i].materialid;
						list_temp.push(obj);
					}
					$.ajax({
						type : 'post',
						url : viewModel.savematerialUrl,
						dataType : 'json',
						// contentType : "application/json",
						data : {
							itemid:id,
							list:JSON.stringify(list_temp)
						},
						success : function(res) {
							if (res) {
								if (res.success == 'success' && res.detailMsg) {
									$('.alert').css('display','block');
									setTimeout(function(){
										$('.alert').css('display','none');
									},2000)
									window.history.back(-1);
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
		// 'model': viewModel,
		'template' : template,
		'init' : init
	};
});
