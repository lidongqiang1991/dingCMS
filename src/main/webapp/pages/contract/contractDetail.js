define(['text!pages/contract/contractDetail.html', 'pages/contract/contractmeta', 'pages/contract/upFile',  'css!pages/contract/contractDetail','uuitree', 'uuigrid', 'config/sys_const'], function(html) {

	//初始化方法,页面加载后被 调用
	var init=function  (element) {

		var viewModel = {
			app:{},
            /* 数据模型 */
            draw : 1,
            totlePage : 0,
            pageSize : 10,
            totleCount : 0,
			//接口
            listurl:ctx + '/contract/detail',
            contractName:'contract',//合同名称
            objListUrl : ctx + '/payment/flow.do',
			//数据
            objdata : new u.DataTable(financialAuditmeta),
            objdatanew : new u.DataTable(financialAuditmeta),

			addcustomer: '',
			event:{
				//页面初始化
                pageInit : function() {
                    id=[];
                    viewModel.app = u.createApp({
                        el :element /* Document.body */,
                        model : viewModel
                    });

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

                    //viewModel.event.loadList();
                    viewModel.event.loadFinancial();
                    viewModel.event.pageChange();
                    viewModel.event.sizeChange();



                },
                getDate:function(date){
                    var temp = new Date(date);
                    var y = temp.getFullYear();
                    var m = temp.getMonth() + 1;
                    var d = temp.getDate();
                    return y + '年' + m + '月' + d + '日';
                },
                //分页相关
                pageChange : function() {
                    viewModel.event.comps.on('pageChange', function(pageIndex) {
                        viewModel.draw = pageIndex + 1;
                        viewModel.event.loadFinancial();
                    });
                },
                sizeChange : function() {
                    viewModel.event.comps.on('sizeChange', function(arg) {
                        viewModel.pageSize = parseInt(arg);
                        viewModel.draw = 1;
                        viewModel.event.loadFinancial();
                    });
                },
                // 加载合同详情
                loadList:function(){
                    if(window.location.href.indexOf('?') != -1){
                        var contractid = window.location.href.split('?')[1].split('&')[0].split('=')[1];
                    }
                     $.ajax({
                         type : 'get',
                         // url : '/mobile/contract/detail',
                         url : viewModel.listurl,
                         data:{contractid:contractid},
                         dataType: "json",
                         success : function(res) {

                            if(res.success=='success'){
                            	var msg=res.detailMsg.data;
                            $(".d-date").text(msg.startdate); //签订日期
                            $(".d-place").text('北京市大兴区'); //签订地点
                            $(".d-a").text(msg.name); //委托方(甲方)
                            if(msg.clientname){
                            	$(".d-a").text(msg.clientname);//委托方(甲方)
                            }
                            $(".d-aId").text((msg.idnumber==null?"":msg.idnumber));//身份证
                            $(".d-aPerson").text('   '); //经办人
                            $(".d-aPhone").text(msg.phone); //电话
                            $(".d-aPlace").text(msg.address || '_____');
                            if(msg.postaladdress){
                            	$(".d-aPlace").text(msg.postaladdress);
                            } //通讯地址
                            viewModel.contractName=msg.name+" "+msg.phone;
                             var part_temp = msg.part.split(',');
                            for(let i=0,j=part_temp.length;i<j;i++){
                                $('.part input[data-value="'+part_temp[i]+'"]').prop('checked',"checked").attr('checked',"checked");
                            }
                            var tbody='';
                            var base = msg.baseDetail;//基础包
                            for(var i=0,j=base.length;i<j;i++){
                                tbody+=`<tr>`;
                                if(i==0){
                                    tbody += `<td style='border:1px solid #ccc; width:16.5%;' rowspan="${base.length}">1</td><td style='border:1px solid #ccc;
                                    width:16.5%;' rowspan="${base.length}">防水专修基础包</td>`;
                                }
                                tbody += `<td style='border:1px solid #ccc; width:16.5%;'>${base[i].itemname}</td>
                                <td style='border:1px solid #ccc; width:16.5%;'>${base[i].price}</td>
                                <td style='border:1px solid #ccc; width:16.5%;'>${base[i].num}</td>
                                <td style='border:1px solid #ccc; width:16.5%;'>${base[i].amount}</td>
                                </tr>`;
                            };
                             var add = msg.addDetail;//辅助包
                             for(var i=0,j=add.length;i<j;i++){
                                 tbody+=`<tr>`;
                                 if(i==0){
                                    tbody += `<td style='border:1px solid #ccc;
                                    width:16.5%;' rowspan="${add.length}">2</td><td style='border:1px solid #ccc; width:16.5%;' rowspan="${add.length}">防水维修辅助包</td>`
                                 }
                                 tbody += `<td style='border:1px solid #ccc; width:16.5%;'>${add[i].itemname}</td>
                                <td style='border:1px solid #ccc; width:16.5%;'>${add[i].price}</td>
                                <td style='border:1px solid #ccc; width:16.5%;'>${add[i].num}</td>
                                <td style='border:1px solid #ccc; width:16.5%;'>${add[i].amount}</td>
                                </tr>`;
                             }
                             var listNum=3;
                             if(add.length==0||base.length==0){listNum=2}

                             tbody += `
                             <tr>
                             	<td style='border:1px solid #ccc; width:16.5%;' rowspan='2'>${listNum}</td>
                                <td style='border:1px solid #ccc; width:16.5%;' rowspan='2'>优惠</td>
                                <td style='border:1px solid #ccc; width:16.5%;' colspan="2">活动项目</td>
                                <td style='border:1px solid #ccc; width:16.5%;' colspan="2">金额</td>
                              </tr>
                              <tr>
                                <td style='border:1px solid #ccc; width:16.5%;' colspan="2">&nbsp;</td>
                                <td style='border:1px solid #ccc; width:16.5%;' colspan="2">&nbsp;</td>
                              </tr>`;

                             tbody += `<tr><td style='border:1px solid #ccc; width:16.5%;'>${listNum + 1}</td>
                                <td style='border:1px solid #ccc; width:16.5%;' colspan="4">费用总计</td>
                                <td style='border:1px solid #ccc; width:16.5%;' colspan="1">${msg.totalamount}</td>
                              </tr>`;
                            $('tbody').html(tbody); //1.服务内容表格
                            $('.d-place').text(); //2.服务地点
                            //3.服务时间
                            var startdate=viewModel.event.getDate(msg.startdate);
                            $('.d-startDate').text(startdate);
                            var enddate;
                            if(msg.planneddate){ //有结束工期
                                enddate=msg.planneddate;
                            }else{ //无结束工期 - 开工时间+15天
                                enddate=viewModel.event.getDate(new Date(msg.startdate).getTime() + 15*24*60*60*1000)
                            }
                            $('.d-endDate').text(enddate);
                            $('.d-bName').text(msg.user_name);  //乙方负责人
                            $('.d-bMobile').text(msg.user_mobile); //乙方负责人电话
                            $('.d-totalamount').text(msg.totalamount);
                            }
                         }
                     });
                 },
                // 加载 财务流水
                loadFinancial: function(obj, filter) {
                    if(window.location.href.indexOf('?') != -1){
                        var servicecode = window.location.href.split('?')[1].split('&')[1].split('=')[1];
                    }
                    var jsonData = {
                        pageIndex : viewModel.draw - 1,
                        pageSize : viewModel.pageSize,
                        sortField : "",
                        sortDirection : "asc",
                        search_searchParam:servicecode,
                    };
                    /*// 搜索
                    $(element).find("#search").each(function() {
                        if (this.value == undefined || this.value == '' || this.value.length == 0) {
                            //不执行操作
                        } else {
                            jsonData['search_searchParam'] = this.value.replace(/(^\s*)|(\s*$)/g, "");
                            //去掉空格
                        }
                    });
                    $(element).find("#searchType").each(function() {
                        if (this.value == undefined || this.value == '' || this.value.length == 0) {
                            //不执行操作
                        } else {
                            if (this.value == "支付") {
                                jsonData['search_type'] = 0;
                            } else if (this.value == "优惠") {
                                jsonData['search_type'] = 1;
                            } else if (this.value == "退款") {
                                jsonData['search_type'] = 2;
                            } else if (this.value == "支付转移") {
                                jsonData['search_type'] = 3;
                            }

                        }
                    });
                    $(element).find("#searchStatus").each(function() {
                        if (this.value == undefined || this.value == '' || this.value.length == 0) {
                            //不执行操作
                        } else {
                            if (this.value == "未审核") {
                                jsonData['search_auditstate'] = 0;
                            } else if (this.value == "审核已通过") {
                                jsonData['search_auditstate'] = 1;
                            } else if (this.value == "审核未通过") {
                                jsonData['search_auditstate'] = 2;
                            }

                        }
                    });
                    $(element).find("#searchTime").each(function() {
                        if (this.value == undefined || this.value == '' || this.value.length == 0) {
                            //不执行操作
                        } else {
                            if (this.value == "近7天") {
                                jsonData['search_time'] = 0;
                            } else if (this.value == "近30天") {
                                jsonData['search_time'] = 1;
                            } else if (this.value == "上个月") {
                                jsonData['search_time'] = 2;
                            } else if (this.value == "自定义") {
                                jsonData['search_time'] = 3;
                            }
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
                    }*/
                    $.ajax({
                        type : 'get',
                        url : viewModel.objListUrl,
                        dataType : 'json',
                        data : jsonData,
                        contentType : 'application/json',
                        success : function(res) {
                            if (res) {
                                // 初始化搜索数据
                                // viewModel.event.clearDt(viewModel.searchdatanew);
                                // var newr = viewModel.searchdatanew.createEmptyRow();
                                // viewModel.searchdatanew.setRowSelect(newr);
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
                // 渲染类型
                renderStatus : function(obj) {
                    if (obj.value == 0) {
                        var val = '未审核';
                    } else if (obj.value == 1) {
                        var val = '审核已通过';
                    } else if (obj.value == 2) {
                        var val = '审核未通过';
                    } else {
                        var val = '格式有误';
                    }
                    ;
                    obj.element.innerHTML = val;
                },
                renderType : function(obj) {
                    if (obj.value == 0) {
                        var val = '支付';
                    } else if (obj.value == 1) {
                        var val = '优惠';
                    } else if (obj.value == 2) {
                        var val = '退款';
                    } else if (obj.value == 3) {
                        var val = '支付转移';
                    } else {
                        var val = '格式有误';
                    }
                    ;
                    obj.element.innerHTML = val;
                },
                // 渲染付款方式
                renderPayMethod : function(obj) {
                    if (obj.value == 1) {
                        var val = '微信支付';
                    } else if (obj.value == 2) {
                        var val = '支付宝支付';
                    } else if (obj.value == 3) {
                        var val = '银行转账';
                    } else if (obj.value == 4) {
                        var val = '现金支付';
                    } else {
                        var val = '';
                    }
                    ;
                    obj.element.innerHTML = val;
                },
                // 渲染款项类型
                renderPayType : function(obj) {
                    if (obj.value == 1) {
                        var val = '首付款';
                    } else if (obj.value == 2) {
                        var val = '尾款';
                    } else if (obj.value == 3) {
                        var val = '抵扣';
                    } else {
                        var val = '';
                    }
                    ;
                    obj.element.innerHTML = val;
                },
                //打印合同
                exportToPdf:function(){

                    var headstr = "<html><head><title></title></head><body>";
                    var footstr = "</body>";
                    var newstr = document.getElementById('exportContent').innerHTML;
                    var oldstr = document.body.innerHTML;
                    document.body.innerHTML = headstr+newstr+footstr;
                    window.print();
                    document.body.innerHTML = oldstr;
                    window.location.reload();
                }
			}
		};
		$(element).html(html);
		viewModel.event.pageInit();
	};
	return {
		'template' : html,
		init : init
	}
});
