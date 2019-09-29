define(['text!pages/construction/construction.html', 'pages/construction/constructionmeta', 'css!pages/construction/construction', 'uuitree', 'uuigrid','config/sys_const'], function (html) {
	
	//初始化方法,页面加载后被 调用
	var init=function  (element,params) {
		var constructionlistUrl = ctx+'/systeam/page.do';
		var constructiondelUrl = ctx+'/systeam/del.do';
		var constructionsaveUrl = ctx+'/systeam/save.do';
		
		var viewModel = {
			app:{},
			/* 数据模型 */
			draw:1,
			totlePage:0,
			pageSize:10,
			totleCount:0,
			
			//展示数据
			constructionDa: new u.DataTable(metaConstruction),
			//编辑数据
			constructionDaNew: new u.DataTable(metaConstruction),
			
			event: {
				//清除datatable数据
	            clearDt: function (dt) {
	                dt.removeAllRows();
	                dt.clear();
	            },
	            
	            //组装list
				genDataList:function(data){

					var datalist = [];
					datalist.push(data);
					return datalist ;
				},
				
				//分页相关
				pageChange:function(){
					viewModel.event.comps.on('pageChange', function (pageIndex) {
						viewModel.draw = pageIndex + 1;
						viewModel.event.loadRoleList();
					});
				},
				sizeChange:function(){
					viewModel.event.comps.on('sizeChange', function (arg) {
						viewModel.pageSize = parseInt(arg);
						viewModel.draw = 1;
						viewModel.event.loadRoleList();
					});
				},
				//页面初始化
				pageInit : function() {
					
					viewModel.app = u.createApp({
						el :element /* Document.body */,
						model : viewModel
					})
					$(element).find('#returnBtn').hide();
					//分页初始化	
					var paginationDiv = $(element).find('#pagination')[0];
					this.comps=new u.pagination({el:paginationDiv,jumppage:true});
					this.comps.update({pageSize: 5 });  //默认每页显示5条数据
					
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
				
				//获取材料列表
				loadRoleList:function(){
					var jsonData={
						pageIndex:viewModel.draw-1,
						pageSize:viewModel.pageSize,
						sortField:"teamname",
						sortDirection:"asc"
					};
					
					//搜索框
					$(element).find("#search").each(function(){
						if(this.value == undefined || this.value =='' || this.value.length ==0 ){
						//不执行操作
						}else{
							jsonData['search_searchParam'] =  this.value.replace(/(^\s*)|(\s*$)/g, "");  //去掉空格
						}
					});
					
					//发送请求
					$.ajax({
							type : 'get',
							url : constructionlistUrl,
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
											viewModel.constructionDa.removeAllRows();
											viewModel.constructionDa.clear();
										}else{
											viewModel.totleCount=res.detailMsg.data.totalElements;
											viewModel.totlePage=res.detailMsg.data.totalPages;
											viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
											viewModel.constructionDa.removeAllRows();
											viewModel.constructionDa.clear();
											viewModel.constructionDa.setSimpleData(res.detailMsg.data.content,{unSelect:true});
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
				
				//更新和保存材料
			    saveMaterial:function(data){
					var list=viewModel.event.genDataList(data);
					$.ajax({
						type : 'post',
						url : constructionsaveUrl,
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
									viewModel.event.loadRoleList();
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
	           
	            //删除
			    delMaterial:function(data){
					var list=viewModel.event.genDataList(data);
					$.ajax({
						type : 'post',
						url : constructiondelUrl,
						dataType : 'json',
						contentType : "application/json",
						data : JSON.stringify(list),
						success : function(res) {
							if( res.success =='success'){
								// u.messageDialog({msg: '删除成功！', btnText: '确定'});
								// 	md.close();
							}else{
								$vue.$message({
									showClose: true,
									message: '删除失败!',
									type: 'error',
									offset: '60'
								});
							}
						}
					})
				 },
				 
				 //添加点击
				 addClick:function(){
				 	//1. 创建空数据
						//1.1 先清空
						//1.2再创建
					//2.填写数据  
					//3.更新数据
					

					$('#dialog_content_construction').find('.u-msg-title').html("<h4>新增人员</h4>");
					viewModel.event.clearDt(viewModel.constructionDaNew);
					
					var newr = viewModel.constructionDaNew.createEmptyRow();
					viewModel.constructionDaNew.setRowSelect(newr);
					window.md = u.dialog({id:'add_construction',content:"#dialog_content_construction",hasCloseMenu:true});
				},
				
				//保存人员  点击
				saveConstructionClick:function(){
					var data = viewModel.constructionDaNew.getSelectedRows()[0].getSimpleData();
	                    if (!viewModel.app.compsValidate($('#add-form')[0])) {
	                        return;
	                    }
                    viewModel.event.saveMaterial(data);
				},
				
				//返回初始化点击
				returnClick : function  () {
				  $(element).find('#returnBtn').hide();
				  $("#search").val('');
				  viewModel.event.loadRoleList();
				},
				//取消点击
				cancelClick:function(){
					md.close();
				},
				  
				//编辑点击
				editClick:function(){
					$('#dialog_content_construction').find('.u-msg-title').html("<h4>编辑人员</h4>");
						viewModel.event.clearDt(viewModel.constructionDaNew);
						var row = viewModel.constructionDa.getSelectedRows()[0]
						if(row){
							viewModel.constructionDaNew.setSimpleData(viewModel.constructionDa.getSimpleData({type: 'select'}));
                            // $('#add_phone').attr("readonly","readonly");
							window.md = u.dialog({id:'add_construction',content:"#dialog_content_construction",hasCloseMenu:true});
						}else{
							$vue.$message({
								showClose: true,
								message: '请选择要编辑的数据！',
								type: 'warning',
								offset: '60'
							});
						}
				},
				
				//删除点击
				delClick:function(){
					var row = viewModel.constructionDa.getSelectedRows()[0];
						if(row){
							var data = viewModel.constructionDa.getSelectedRows()[0].getSimpleData();
							var msgTitle = "删除确认";
							var msgContent = "是否删除"+data.teamname+"?";
							$vue.$confirm(msgContent, msgTitle, {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
							  }).then(() => {
								viewModel.event.delMaterial(data);
					                viewModel.constructionDa.removeRow(viewModel.constructionDa.getSelectedIndexs());
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
				
				//查询
				loadSearch:function(){
					var jsonData={
						pageIndex:viewModel.draw-1,
						pageSize:viewModel.pageSize,
						sortField:"phone",
						sortDirection:"asc"
					};
					//获取输入的值
					$(element).find("#search").each(function(){
						if(this.value == undefined || this.value =='' || this.value.length ==0 ){
							//不执行操作
						}else{
							jsonData['search_searchParam'] =  this.value.replace(/(^\s*)|(\s*$)/g, "");  //去掉空格
						}
					});
					$.ajax({
						type : 'get',
						url : constructionlistUrl,
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
										viewModel.constructionDa.removeAllRows();
										viewModel.constructionDa.clear();
									}else{
										viewModel.totleCount=res.detailMsg.data.totalElements;
										viewModel.totlePage=res.detailMsg.data.totalPages;
										viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
										viewModel.constructionDa.removeAllRows();
										viewModel.constructionDa.clear();
										viewModel.constructionDa.setSimpleData(res.detailMsg.data.content,{unSelect:true});
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
				
				//搜索
				
				searchClick:function(){
					$(element).find('#returnBtn').hide();
					viewModel.draw = 1;
					viewModel.event.loadSearch();
				}
				
	           
			}
			
			
			
		};	
		
		$(element).html(html) ;
		viewModel.event.pageInit();
		viewModel.event.loadRoleList();
		if(u.isIE8){
			$('.ie8-bg').css('display','block');
		}
		
	}

	return {
		'template': html,
        init:init
	}
});