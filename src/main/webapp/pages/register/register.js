define(['text!pages/register/register.html','css!pages/register/register','pages/register/registermeta','uuitree','uuigrid'],function(html) {
	var init = function(element){
		var treelistUrl = ctx+'/funreg/tlist.do';
		var treedelUrl = ctx+'/funreg/del.do';
		var treesaveUrl = ctx+'/funreg/save.do';

		var tablelistUrl = ctx+'/funreg/list.do';
		var tabledelUrl = ctx+'/funreg/del.do';
		var tablesaveUrl = ctx+'/funreg/save.do';

		var viewModel = {
				app:{},
				/* 数据模型 */
				draw:1,
				totlePage:0,
				pageSize:10,
				totleCount:0,

				/* 左边数据 */
				leftdata : new u.DataTable(metaLeft),

				/* 左边编辑框树数据 */
			   leftdatanew : new u.DataTable(metaLeft),

				/* 右边数据 */
				rightdata : new u.DataTable(metaRight),

				/* 右边编辑表格数据 */
				rightdatanew : new u.DataTable(metaRight),

				/* 树设置 */
				treeSetting : {
					view : {
						showLine : false,
						selectedMulti : false
					},
					data:{
						key:{
							name:'showname'
						}
					},
					callback : {
						onClick : function(e, id, node) {
							treeid=[];
							viewModel.event.getAllChildren(node,treeid);
						   var pid = node.pId;
						   viewModel.event.loadTelbook(treeid);
						}
					}

				},
				event:{

	                //清除datatable数据
	                clearDt: function (dt) {
	                	dt.removeAllRows();
	                	dt.clear();
	                },

					/* 获得树节点的所有子节点 */
					getAllChildren:function(node,childrenlist){
						childrenlist.push(node.id)
						if(node.children){
							var i;
							for(i=0;i<node.children.length;i++){
								viewModel.event.getAllChildren(node.children[i],childrenlist);
							}
						}
					},

					loadTelbook:function(instit){
						var jsonData={
								pageIndex:viewModel.draw-1,
								pageSize:viewModel.pageSize,
								sortField:"funcode",
								sortDirection:"asc"
							};
						/*右表的上面详细信息显示*/
						var infoDiv = document.getElementById('infoPanel');
						var dtVal = viewModel.leftdata.getValue('funname');
						infoDiv.innerHTML = dtVal;
						//end
						$(element).find("#search").each(function(){
							if(this.value == undefined || this.value =='' || this.value.length ==0 ){
								//不执行操作
							}else{
								jsonData['search_searchParam'] =  this.value.replace(/(^\s*)|(\s*$)/g, "");  //去掉空格
							}
						});
						if(instit){
							if(instit!=''||instit.length!=0){
								jsonData['search_parentid'] = instit.join();
							}
						}
						$.ajax({
							type : 'get',
							url : tablelistUrl,
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
											viewModel.rightdata.removeAllRows();
											viewModel.rightdata.clear();
										}else{
											viewModel.totleCount=res.detailMsg.data.totalElements;
											viewModel.totlePage=res.detailMsg.data.totalPages;
											viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
											viewModel.rightdata.removeAllRows();
											viewModel.rightdata.clear();
											viewModel.rightdata.setSimpleData(res.detailMsg.data.content,{unSelect:true});
										}
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
					loadTree:function(){
						$.ajax({
							type : 'get',
							url : treelistUrl,
							dataType : 'json',
							success : function(res) {
								if(res){
									var res_temp = res.map(item=>{
										item.showname = item.funname+'('+item.funcode+')';
										return item;
									});
									viewModel.leftdata.removeAllRows();
									viewModel.leftdata.clear();
									viewModel.leftdata.setSimpleData(res_temp,{unSelect:true});
                                    $("#tree2")[0]['u-meta'].tree.expandAll(true);
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
					//组装list
					genDataList:function(data){
						var datalist = [];
						datalist.push(data);
						return datalist ;
					},
					//新增和更新组织树
					saveTree:function(data){
						var list=viewModel.event.genDataList(data);
						$.ajax({
							type : 'post',
							url : treesaveUrl,
							dataType : 'json',
							contentType : "application/json",
							data : JSON.stringify(list),
							success : function(res) {
								if(res){
									if( res.success =='success'){
										$vue.$message({
    showClose: true,
    message: '保存成功!',
    type: 'success',
    offset: '60'
});
										viewModel.event.loadTree();
										md.close();
									}else{
										var msg = "";
										if(res.success == 'fail_global'){
											msg = res.message;
										}else{
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
								}else{
									$vue.$message({
    showClose: true,
    message: '没有返回数据',
    type: 'warning',
    offset: '60'
});
								}
							}
						})

						},
						//删除组织树
						deleteTree: function(data) {

			        	var datalist = viewModel.event.genDataList(data);
			            var json = JSON.stringify(datalist);
			            $.ajax({
			                url: treedelUrl,
			                data: json,
			                dataType: 'json',
			                type: 'post',
			                contentType: 'application/json',
			                success: function (res) {
			                	if(res){
			                	       if (res.success == 'success') {
			                	    	   viewModel.leftdata.removeRow(viewModel.leftdata.getSelectedIndexs());

			                	    	  // u.messageDialog({msg:'删除成功',title:'操作提示',btnText:'确定'});

			    	                    } else {
											var msg = "";
										   if(res.success == 'fail_global'){
											   msg = res.message;
											   if(msg=='Data had been referenced,remove is forbidden!'){
												   msg='该功能含有子子菜单不能删除';
											   }
										   }else{
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
			            });
			        },

				        //更新和保存人员
				        saveMan:function(data){
							var list=viewModel.event.genDataList(data);
							$.ajax({
								type : 'post',
								url : tablesaveUrl,
								dataType : 'json',
								contentType : "application/json",
								data : JSON.stringify(list),
								success : function(res) {
									if(res){
										if( res.success =='success'){
											$vue.$message({
    showClose: true,
    message: '保存成功!',
    type: 'success',
    offset: '60'
});
											viewModel.event.loadTelbook(treeid);
											md.close();
										}else{
											var msg = "";
											if(res.success == 'fail_global'){
												msg = res.message;
											}else{
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
									}else{
										$vue.$message({
    showClose: true,
    message: '没有返回数据',
    type: 'warning',
    offset: '60'
});
									}
								}
							});
				        },
				        //删除人员
				        delMan:function(data){
							var list=viewModel.event.genDataList(data);
							$.ajax({
								type : 'post',
								url : tabledelUrl,
								dataType : 'json',
								contentType : "application/json",
								data : JSON.stringify(list),
								success : function(res) {
									if( res.success =='success'){
										//u.messageDialog({msg: '删除成功！', btnText: '确定'});
                                        viewModel.totleCount=viewModel.totleCount -1;
                                        if(viewModel.totleCount<1){
                                            viewModel.totlePage=viewModel.totlePage -1;
                                        }
                                        viewModel.event.comps.update({totalPages:viewModel.totlePage,totalCount:viewModel.totleCount});
										 //md.close();
									}else{
										$vue.$message({
    showClose: true,
    message: '删除失败！',
    type: 'error',
    offset: '60'
});
									}
								}
							})
				        },
				    //分页相关
					pageChange:function(){
						viewModel.event.comps.on('pageChange', function (pageIndex) {
							viewModel.draw = pageIndex + 1;
							viewModel.event.loadTelbook(treeid);
						});
					},
					sizeChange:function(){
						viewModel.event.comps.on('sizeChange', function (arg) {
							viewModel.pageSize = parseInt(arg);
							viewModel.draw = 1;
							viewModel.event.loadTelbook(treeid);
						});
					},

					//页面初始化
					pageInit : function() {
						treeid=[];

						viewModel.app = u.createApp({
							el :element /* Document.body */,
							model : viewModel
						})
						//隐藏
						$(element).find('#returnBtn').hide();
						//分页初始化
						var paginationDiv = $(element).find('#pagination')[0];
						this.comps=new u.pagination({el:paginationDiv,jumppage:true});
						this.comps.update({pageSize: 5 });  //默认每页显示5条数据
						this.loadTree();
						viewModel.event.pageChange();
						viewModel.event.sizeChange();

	                    //回车搜索
	                    $('.input_enter').keydown(function(e){
	                        if(e.keyCode==13){
	                        	viewModel.event.searchClick()
	                        	u.stopEvent(e);
	                        }
	                    });
					},
					addinstitClick:function(){
                        $('#institcode').removeAttr("readonly");
						$('#dialog_content_instit').find('.u-msg-title').html("<h4>新增功能</h4>");
						viewModel.event.clearDt(viewModel.leftdatanew);
						var row = viewModel.leftdata.getSelectedRows()[0];
						var newr = viewModel.leftdatanew.createEmptyRow();
			            viewModel.leftdatanew.setRowSelect(newr);
			            window.md = u.dialog({id:'add_depart',content:"#dialog_content_instit",hasCloseMenu:true});
					},
					editinstitClick:function(){
						$('#dialog_content_instit').find('.u-msg-title').html("<h4>编辑功能</h4>");
						viewModel.event.clearDt(viewModel.leftdatanew);
						var row = viewModel.leftdata.getSelectedRows()[0];
						if(row){
							viewModel.leftdatanew.setSimpleData(viewModel.leftdata.getSimpleData({type: 'select'}));
							window.md = u.dialog({id:'edit_depart',content:"#dialog_content_instit",hasCloseMenu:true});
						}else{
							$vue.$message({
								showClose: true,
								message: '请选择要编辑的数据！',
								type: 'warning',
								offset: '60'
							});
						}
					},
					delinstitClick:function(){
						var row = viewModel.rightdata.getSimpleData();
						//如果右表有数据
						if(row && row.length > 0){
							$vue.$message({
								showClose: true,
								message: '该功能含有子菜单不能删除！',
								type: 'warning',
								offset: '60'
							});
							return;
						}else{
							if(row){
							var data = viewModel.leftdata.getSelectedRows()[0].getSimpleData();
							var msgTitle = '删除确认';
							var msgContent = "是否删除"+data.funname+"?";
							$vue.$confirm(msgContent, msgTitle, '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
							}).then(() => {
								viewModel.event.deleteTree(data);
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
								message: '请选择要删除的数据！',
								type: 'warning',
								offset: '60'
							});
						}
						}

					},
					saveinstitClick:function(){
						var data = viewModel.leftdatanew.getSelectedRows()[0].getSimpleData();
						delete data.showname;
	                    if (!viewModel.app.compsValidate($('#dialog_content_instit')[0])) {
	                        return;
	                    }
                        viewModel.event.saveTree(data);
					},
					cancelinstitClick:function(){
							md.close();
					},
					addManClick:function(){
						$('#dialog_content_man').find('.u-msg-title').html("<h4>新增功能</h4>");
						viewModel.event.clearDt(viewModel.rightdatanew);
						var row = viewModel.leftdata.getSelectedRows()[0];
						if(row){
							var furl = row.getValue('furl');
							if(furl){
								$vue.$message({
									showClose: true,
									message: '请先删除该功能的地址项！',
									type: 'warning',
									offset: '60'
								});
								return;
							}
							var institId = row.getValue('id');
							var instit = row.getValue('funname');
							var newr = viewModel.rightdatanew.createEmptyRow();
							viewModel.rightdatanew.setRowSelect(newr);
							var newrow = viewModel.rightdatanew.getSelectedRows()[0];
							newrow.setValue('parentid',institId);
							// newrow.setValue('parentname',instit);
							$('#add_peocode').removeAttr("readonly");
							window.md = u.dialog({id:'add_man',content:"#dialog_content_man",hasCloseMenu:true});
						}else{
							$vue.$message({
								showClose: true,
								message: '请选择功能！',
								type: 'warning',
								offset: '60'
							});
						}
					},
					editManClick:function(){
						$('#dialog_content_man').find('.u-msg-title').html("<h4>编辑人员</h4>");
						viewModel.event.clearDt(viewModel.leftdatanew);
						var row = viewModel.rightdata.getSelectedRows()[0]
						if(row){
							viewModel.rightdatanew.setSimpleData(viewModel.rightdata.getSimpleData({type: 'select'}));
                            // $('#add_peocode').attr("readonly","readonly");
							window.md = u.dialog({id:'edit_man',content:"#dialog_content_man",hasCloseMenu:true});
						}else{
							$vue.$message({
								showClose: true,
								message: '请选择要编辑的数据！',
								type: 'warning',
								offset: '60'
							});
						}
					},
					delManClick:function(){
						var row = viewModel.rightdata.getSelectedRows()[0];
						if(row){
							var data = viewModel.rightdata.getSelectedRows()[0].getSimpleData();
							var msgTitle = '删除确认';
							var msgContent = "是否删除"+data.funname+"?";
							$vue.$confirm(msgContent, msgTitle, '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
							}).then(() => {
								viewModel.event.delMan(data);
					            viewModel.rightdata.removeRow(viewModel.rightdata.getSelectedIndexs());
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
								message: '请选择要删除的数据！',
								type: 'warning',
								offset: '60'
							});
						}
					},
					saveManClick:function(){
						var data = viewModel.rightdatanew.getSelectedRows()[0].getSimpleData();
						delete data.showname;
	                    if (!viewModel.app.compsValidate($('#add-form')[0])) {
	                        return;
	                    }
                        viewModel.event.saveMan(data);
					},
					cancelManClick:function(){
							md.close();
					},
					searchClick:function(){
						$(element).find('#returnBtn').show();
						viewModel.draw = 1;
						viewModel.event.loadTelbook(treeid);
					},
					//返回初始化点击
					returnClick : function  () {
						 $(element).find('#returnBtn').hide();
						 $("#search").val('');
						 viewModel.event.loadTelbook(treeid);
					},

				}
			};
		$(element).html(html) ;
		viewModel.event.pageInit();
		if(u.isIE8){
			$('.ie8-bg').css('display','block');
		}
	};

	return {
		'template': html,
        init:init
	};
});
