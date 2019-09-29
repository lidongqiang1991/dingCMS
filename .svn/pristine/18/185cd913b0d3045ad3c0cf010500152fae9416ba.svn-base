define(['text!pages/settlement/settlement.html', 'css!pages/settlement/settlement', 'pages/settlement/settlementmeta', 'pages/payment/paymentmeta', 'uuigrid'], function(template) {

	//初始化方法,页面加载后被 调用
	var init = function(element) {

		var viewModel = {
			app : {},
			/* 数据模型 */
			draw : 1,
			totlePage : 0,
			pageSize : 15,
			totleCount : 0,

			objListUrl : ctx + '/servicelist/page.do',
			objAddUrl : ctx + '/settlement/save.do',
			objOneUrl : ctx + '/settlement/findByBillid.do',

			// 运营中心，运营商列表
			orgOrAgentListUrl:ctx + "/org/agent.do",

			objdata : new u.DataTable(_productmeta),
			objdatanew : new u.DataTable(settlementmeta),
			// 筛选 数据
			searchdatanew : new u.DataTable({
				meta : {
					"orgid" : "",
					"agentid" : "",
					"servicestate":"",
					"paystate":"",
					"orgstate":"",
					"agentstate":"",

				}
			}, this),
			//运营商
			agentList : [{
				name : "所有运营商",
				value : "-1"
			}

			// , {
				// name : "北京A运营商",
				// value : "id"
			// }, {
				// name : "北京B运营商",
				// value : "id"
			// }, {
				// name : "上海B运营商",
				// value : "id"
			// }
			],
			agentnameList_temp:[
				{name: "全部运营商", value: "-1"}
			],

			//运营中心
			orgList : [{
				name : "所有运营中心",
				value : "-1"
			}
			// , {
				// name : "北京运营中心",
				// value : "id"
			// }, {
				// name : "上海运营中心",
				// value : "id"
			// }
			],
			//施工状态
			projectList :[{
				name :'所有状态',
				value :'-1'
			},{
				name :'未开工',
				value : '0'
			},{
				name :'施工中',
				value : '1'
			},{
				name :'已完工',
				value : '2'
			}],
			//付款状态
			payList:[{
				name :'所有状态',
				value :'-1'
			},{
				name :'未支付',
				value : '0'
			},{
				name :'定金已支付',
				value : '1'
			},{
				name :'全额已支付',
				value : '2'
			}],
			//运营中心结算状态
			orgsettlementList :[{
				name :'所有状态',
				value :'-1'
			},{
				name :'未完成',
				value :'0'
			},{
				name :'结算完成',
				value : '1'
			}],
			//运营商结算状态
			agentsettlementList:[{
				name :'所有状态',
				value :'-1'
			},{
				name :'未完成',
				value :'0'
			},{
				name :'结算完成',
				value : '1'
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
					//默认每页显示5条数据
					this.loadList();
					viewModel.event.pageChange();
					viewModel.event.sizeChange();

					//回车搜索
					$('.input_enter').keydown(function(e) {
						if (e.keyCode == 13) {
							viewModel.event.searchClick();
							u.stopEvent(e);
						}
					});
					// 初始化筛选
					viewModel.event.clearDt(viewModel.searchdatanew);
					viewModel.searchdatanew.clear();
					var newr = viewModel.searchdatanew.createEmptyRow();
					viewModel.searchdatanew.setRowSelect(newr);

					this.loadList();
				},
				//反显筛选条件
				setSearchValue:function(){
					var obj = sessionStorage['searchObj'];
					if (obj) {
						var searchObj = JSON.parse(obj);
						if (searchObj.type == 'settlement') {
							var obj_new = viewModel.searchdatanew.getSelectedRows()[0];
							for (var key in searchObj) {
								if (key != 'type') {
									obj_new.setValue(key, searchObj[key]);
								}
							}
						} else {
							sessionStorage['searchObj'] = "";
						}
					}
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
				//返回初始化点击
				returnClick : function  () {
					 $(element).find('#returnBtn').hide();
				 	 $("#search").val('');
					 viewModel.event.loadList();
				},
				// 筛选
				filterClick : function() {

					$("#search").val('');
					var obj = viewModel.event.resetfilterclick(false);
					viewModel.event.loadList('', obj);
				},
				//清空筛选条件
				resetClick:function(){
                    	viewModel.event.resetfilterclick(true);
                    	viewModel.event.loadList(id);
                },
				// 重置 筛选条件
				resetfilterclick : function(bool) {
					var data = viewModel.searchdatanew.getSelectedRows()[0];
					if (!data)
						return;
					if (bool) {
						data.setValue('orgid', '');
						data.setValue('agentid', '');
						data.setValue('servicestate','');
						data.setValue('paystate','');
						data.setValue('orgstate','');
						data.setValue('agentstate','');
					} else {
						var orgid = data.getValue('orgid');
						var agentid = data.getValue('agentid');
						if(agentid&&agentid!="-1") orgid = "-1";
						var servicestate = data.getValue('servicestate');
						var paystate = data.getValue('paystate');
						var orgstate = data.getValue('orgstate');
						var agentstate = data.getValue('agentstate');
						var obj = {};
						obj.search_orgname = orgid;
						obj.search_servicestate = servicestate;
						obj.search_agentname = agentid;
						obj.search_paystate = paystate;
						obj.search_orgstate = orgstate;
						obj.search_agentstate = agentstate;
						return obj;
					}
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
				// 加载 客户列表
				loadList : function(obj, filter) {
					var jsonData = {
						pageIndex : viewModel.draw - 1,
						pageSize : viewModel.pageSize,
						sortField : "",
						sortDirection : "asc",
						search_financial:"default"					};
					// 搜索
					$(element).find("#search").each(function() {
						if (this.value == undefined || this.value == '' || this.value.length == 0) {
							//不执行操作
						} else {
							jsonData['search_searchParam'] = this.value.replace(/(^\s*)|(\s*$)/g, "");
							//去掉空格
						}
					});
					if (this.getUrlParams('buttontype')) {
						var buttontype = this.getUrlParams('buttontype');//按钮类型判断
						if (buttontype=='org') {
							$(element).find("#button_agent").hide();
						}else if(buttontype=='agent'){
							$(element).find("#button_org").hide();
						};
					};
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
					} else {
						var filterobj = viewModel.event.resetfilterclick(false);
						u.extend(jsonData, filterobj);
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
				//加载 运营中心/运营商 列表
				orgOrAgentList:function(){
					var jsonData={
						sortField:"d.createtime",
						sortDirection:"desc",
					};
					$.ajax({
						type : 'get',
						url : viewModel.orgOrAgentListUrl,
						dataType : 'json',
						data:jsonData,
						contentType: 'application/json;charset=utf-8',
						success : function(res) {
							if(res){
								var arr = viewModel.orgList||[];
								for(let i=0,j=res.length;i<j;i++){
									let { orgname : name,orgid:orgid,orgs :orgs } = res[i];
									let obj = { name:name,value:orgid,orgs:orgs };
									arr.push(obj);
								}
								viewModel.orgList = arr;
								var combo1Obj = document.getElementById('combobox_orgname')['u.Combo'];
								combo1Obj.setComboData(arr);

								viewModel.event.setSearchValue();
								/*var row = viewModel.searchdatanew.getSelectedRows()[0];
								row.setValue('orgid','-1');*/
							}
						}
					})
				},
				// 添加点击查看详情
				renderTypeAjax : function(obj) {

					var id = obj.row.value.billid;
					var text = obj.value;
					var html = "<a style='text-decoration: underline;' class='c_green' href='#/settlement/settlementDetail?id=" + id + "'>" + text || ' ' + "</a>";
					obj.element.innerHTML = html;
				},
				// 渲染类型
				renderPayStatus : function(obj) {
					if (obj.value == 0||obj.value == null||obj.value == '') {
						var val = '未支付';
					} else if (obj.value == 1) {
						var val = '定金已支付';
					} else if (obj.value == 2) {
						var val = '全额已支付';
					};
					obj.element.innerHTML = val;
				},
				renderOrgStatus : function(obj) {
					var val = obj.value == 1 ? '结算完成' : '未完成';
					obj.element.innerHTML = val;
				},
				renderAgentStatus : function(obj) {
					var val = obj.value == 1 ? '结算完成' : '未完成';
					obj.element.innerHTML = val;
				},
				renderConstructionStatus : function(obj) {
					var val = '';
					if (obj.value == 0||obj.value == null||obj.value == '') {
						val = '未开工';
					} else if (obj.value == 1) {
						val = '施工中';
					} else if (obj.value == 2) {
						val = '已完工';
					} else if (obj.value == -2) {
						val = '不需要上门';
					} else if (obj.value == -3) {
						val = '上门未成交';
					} else {
						val = '其他';
					}
					obj.element.innerHTML = val;
				},
				// 运营商结算,给工队结算
				addClick_ : function(obj) {
					var row = viewModel.objdata.getSelectedRows()[0];
					if (row) {
						if (row.data.servicestate.value==2&&row.data.paystate.value==2) {//!row.data.agentstate.value结算一次可用；已开工工程全额已支付才可结算
							var projectdata = row.data;
							var billid = projectdata.billid.value;
							viewModel.event.clearDt(viewModel.objdatanew);
							var newr = viewModel.objdatanew.createEmptyRow();
							newr.setValue("billid", projectdata.billid.value);
							newr.setValue("constructionname", projectdata.constructionname.value);
							newr.setValue("totalamount", projectdata.totalamount.value);

							newr.setValue("type", 1);
							//运营商结算
							viewModel.objdatanew.setRowSelect(newr);

							window.md = u.dialog({
								id : 'add_settlement',
								content : "#dialog_content_settlement_w",
								hasCloseMenu : true
							});

						} else {
							$vue.$message({
    showClose: true,
    message: '不需要或不可操作！',
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
				// 运营中心结算
				addClick : function(obj) {
					var row = viewModel.objdata.getSelectedRows()[0];
					if (row) {
						if (!row.data.orgstate.value&&row.data.servicestate.value==2&&row.data.paystate.value==2) {//已开工工程全额已支付才可结算
							var projectdata = row.data;
							var billid = projectdata.billid.value;
							$.ajax({
								type : 'get',
								//async : true,
								url : viewModel.objOneUrl,
								data : {
									billid : billid,
									type : 0,
								},
								success : function(res) {
									var didomoney = 0;
									var didomoney_=res.detailMsg.data.money;
									if (res.success == 'success'&&didomoney_)didomoney = didomoney_;
									viewModel.event.clearDt(viewModel.objdatanew);
									var newr = viewModel.objdatanew.createEmptyRow();
									newr.setValue("billid", projectdata.billid.value);
									newr.setValue("agentname", projectdata.agentname.value);
									newr.setValue("totalamount", projectdata.totalamount.value);
									newr.setValue("materialcosts", projectdata.materialcosts.value);
									newr.setValue("servicecharge", projectdata.servicecharge.value);
									newr.setValue("type", 0);//运营中心结算
									newr.setValue("platformpercent", "10%");
									var domoney = projectdata.servicecharge.value * (1 - 0.1);
									newr.setValue("domoney", domoney);
									var temp = domoney - didomoney;
									//获取已付金额设置已经的支付的钱
									newr.setValue("didmoney", temp);

									viewModel.objdatanew.setRowSelect(newr);
									window.md = u.dialog({
										id : 'add_settlement',
										content : "#dialog_content_settlement",
										hasCloseMenu : true
									});

								}
							});
							//ajax
						} else {
							$vue.$message({
    showClose: true,
    message: '不需要或不可操作！',
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
				//保存  点击
				saveClick : function() {
					var data = viewModel.objdatanew.getSelectedRows()[0].getSimpleData();

					if (!viewModel.app.compsValidate($('#add-form')[0])) {
						return;
					}
					var str = "billid,memo,money,settlementid,type";
					for (var key in data) {
						if (str.indexOf(key) == -1) {
							delete data[key];
						}
					}
					viewModel.event.cancelClick();
					viewModel.event.save(data);
				},
				//取消点击
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
									$vue.$message({
    showClose: true,
    message: '保存成功!',
    type: 'success',
    offset: '60'
});

									viewModel.event.loadList();
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
		viewModel.event.orgOrAgentList();

		// 筛选条件
		viewModel.searchdatanew.on('valueChange', function(event){
			let filename = event.field;  // 改变的字段
			//var oldValue = event.oldValue;
			var newValue = event.newValue;
			var obj = sessionStorage['searchObj'];
			if(obj){
				obj = JSON.parse(obj);
			}else{
				obj = {};
			}
			obj[filename] = newValue;
			obj.type = 'settlement';
			sessionStorage['searchObj'] = JSON.stringify(obj);

			if(filename == 'orgid'){ //选择运营中心，联动 运营商
				let org = viewModel.orgList.concat();
				let agent = viewModel.agentnameList_temp.concat();
				var row = viewModel.searchdatanew.getSelectedRows()[0];
				row.setValue('agentid','');
				if(newValue=="-1"){
					for(let i=0,j=org.length;i<j;i++){
						let item = org[i].orgs||[];
						if(item.length>0){
							for (let ii = 0, jj = item.length; ii < jj; ii++) {
								let {orgname: name,orgid:orgid} = org[i].orgs[ii];
								let obj = {name: name, value: orgid};
								agent.push(obj);
							}
						}
					}
				}else{
					for(let i=0,j=org.length;i<j;i++){
						if(org[i].value == newValue){
							if(org[i].orgs.length>0) {
								for (let ii = 0, jj = org[i].orgs.length; ii < jj; ii++) {
									let {orgname: name,orgid:orgid} = org[i].orgs[ii];
									let obj = {name: name, value: orgid};
									agent.push(obj);
								}
							}
							break;
						}
					}
				}
				viewModel.agentList = agent;
				var combo1Obj = document.getElementById('combobox_agentname')['u.Combo'];
				combo1Obj.setComboData(agent);
			}

		});
	};

	return {
		//'model': viewModel,
		'template' : template,
		'init' : init
	};
});
