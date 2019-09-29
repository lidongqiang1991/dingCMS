define(['text!pages/material/material.html', 'pages/material/materialmeta', 'css!pages/material/material', 'uuitree', 'uuigrid','config/sys_const'], function (html) {

	//初始化方法,页面加载后被 调用
	var init=function  (element,params) {
		var materiallistUrl = ctx+'/material/list.do';
		var materialdelUrl = ctx+'/material/del.do';
		var materialsaveUrl = ctx+'/material/save.do';
		var materialgetUrl = ctx+'material/get.do';

		var viewModel = {
			app:{},
			/* 数据模型 */
			draw:1,
			totlePage:0,
			pageSize:20,
			totleCount:0,
			unitList:[{value:'卷',name:'卷'},{value:'桶',name:'桶'},{value:'米',name:'米'}],
			//展示数据
			materialDa: new u.DataTable(metaMaterial),
			//编辑数据
			materialDaNew: new u.DataTable(metaMaterial),

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
					//元素修改
					$(element).find('#returnBtn').hide();
					$(element).find('#unit label:last-child input:disabled').css('width','40%');
					debugger

					//分页初始化
					var paginationDiv = $(element).find('#pagination')[0];
					this.comps=new u.pagination({el:paginationDiv,jumppage:true});
					this.comps.update({pageSize: 5 });  //默认每页显示5条数据

					viewModel.event.pageChange();
					viewModel.event.sizeChange();

					viewModel.event.loadRoleList();

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
						sortField:"code",
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
							url : materiallistUrl,
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
											viewModel.materialDa.removeAllRows();
											viewModel.materialDa.clear();
										}else{
											viewModel.totleCount=res.detailMsg.data.totalElements;
											viewModel.totlePage=res.detailMsg.data.totalPages;
											viewModel.event.comps.update({totalPages:viewModel.totlePage,pageSize:viewModel.pageSize,currentPage:viewModel.draw,totalCount:viewModel.totleCount});
											viewModel.materialDa.removeAllRows();
											viewModel.materialDa.clear();
											viewModel.materialDa.setSimpleData(res.detailMsg.data.content,{unSelect:true});
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
						url : materialsaveUrl,
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

	            //删除材料
			    delMaterial:function(data){
					var list=viewModel.event.genDataList(data);
					$.ajax({
						type : 'post',
						url : materialdelUrl,
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
							}else {
								$vue.$message({
									showClose: true,
									message: '物料已被引用，无法删除，请检查！',
									type: 'warning',
									offset: '60'
								});
								viewModel.event.loadRoleList();
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
					$(element).find('#savematerial').show();
					$('#add_name').removeProp("readonly");
                    $('#add_code').removeProp("readonly");
                    $('#add_spec').removeProp("readonly");
                    $('#add_model').removeProp("readonly");
                    $('#add_price').removeProp("readonly");
                    $('#add_cost').removeProp("readonly");
                    $('#add_note').removeProp("readonly");
					$('#dialog_content_material').find('.u-msg-title').html("<h4>新增材料</h4>");
					viewModel.event.clearDt(viewModel.materialDaNew);
					// $('#add_note_area').val("");
					//材料编码可修改
					//$('#add_code').removeProp("readonly");
					var newr = viewModel.materialDaNew.createEmptyRow();
					viewModel.materialDaNew.setRowSelect(newr);
					window.md = u.dialog({id:'add_material',content:"#dialog_content_material",hasCloseMenu:true});
				},

				//保存材料  点击
				saveMaterialClick:function(){

				    //var val = $("#add_note_area").val();
					var data = viewModel.materialDaNew.getSelectedRows()[0];

                    //data.setValue("note",val);

                    if (!viewModel.app.compsValidate($('#add-form')[0])) {
                        return;
                    }
                    viewModel.event.saveMaterial(data.getSimpleData());
				},

				//返回搜索点击
				returnClick : function  () {
				  $(element).find('#returnBtn').hide();
				  $("#search").val('');
				  viewModel.event.loadRoleList();
				},
				//取消点击
				cancelManClick:function(){
					md.close();
				},

				//编辑点击
				editClick:function(){
					$('#dialog_content_material').find('.u-msg-title').html("<h4>编辑材料</h4>");
						$(element).find('#savematerial').show();
						$('#add_name').removeProp("readonly");
	                    $('#add_code').removeProp("readonly");
	                    $('#add_spec').removeProp("readonly");
	                    $('#add_model').removeProp("readonly");
	                    $('#add_price').removeProp("readonly");
	                    $('#add_cost').removeProp("readonly");
	                    $('#add_note').removeProp("readonly");
						viewModel.event.clearDt(viewModel.materialDaNew);
						// $('#add_note_area').val();
						var row = viewModel.materialDa.getSelectedRows()[0];
						if(row){
							viewModel.materialDaNew.setSimpleData(viewModel.materialDa.getSimpleData({type: 'select'}));
							// var val = row.getValue("note");
							// $('#add_note_area').val(val);
							//材料编码可修改
                            //$('#add_code').attr("readonly","readonly");
							window.md = u.dialog({id:'add_material',content:"#dialog_content_material",hasCloseMenu:true});
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
					var row = viewModel.materialDa.getSelectedRows()[0];
						if(row){
							var data = viewModel.materialDa.getSelectedRows()[0].getSimpleData();
							var msgTitle = '删除确认';
							var msgContent = '是否确认删除材料？';
							$vue.$confirm(msgContent, msgTitle, {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
							  }).then(() => {
									viewModel.event.delMaterial(data);
									viewModel.materialDa.removeRow(viewModel.materialDa.getSelectedIndexs());
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

				//搜索点击
				searchClick:function(){
					$(element).find('#returnBtn').show();
					viewModel.draw = 1;
					viewModel.event.loadRoleList();
				},

				//双击，触发行数据  编辑
				dblClick:function(e){

					var data = e.rowObj.value;
					$('#dialog_content_material').find('.u-msg-title').html("<h4>展示材料</h4>");
					viewModel.event.clearDt(viewModel.materialDaNew);
					// $('#add_note_area').val();

					// var note = data.note;
					viewModel.materialDaNew.setSimpleData(data);
                    $('#add_name').attr("readonly","readonly");
                    $('#add_code').attr("readonly","readonly");
                    $('#add_spec').attr("readonly","readonly");
                    $('#add_model').attr("readonly","readonly");
                    $('#add_price').attr("readonly","readonly");
                    $('#add_cost').attr("readonly","readonly");
                    $('#add_note').attr("readonly","readonly");
                    // $('#add_note_area').val(note);
                    //保存隐藏
					$(element).find('#savematerial').hide();
					window.md = u.dialog({id:'add_material',content:"#dialog_content_material",hasCloseMenu:true});
				},

			    // //点击进入详情页
			    // renderTypeAjax:function(obj){
			        // var id = obj.row.value.id;
                    // var text = obj.value;
                    // var html = "<a style='text-decoration: underline;' href='#/material/materialDetail?id="+ id +"'>" + text||'' + "</a>";
                    // obj.element.innerHTML = html;
			    // }
			}

		};

		$(element).html(html) ;
		viewModel.event.pageInit();

		if(u.isIE8){
			$('.ie8-bg').css('display','block');
		}

	}

	return {
		'template': html,
        init:init
	}
});
