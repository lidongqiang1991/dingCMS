require(['knockout', 'director','uuigrid'], function(ko) {
	$.ajaxSetup({
		cache:false
	});


    window.addRouter = function(path, func) {
        var pos = path.indexOf('/:');
        var truePath = path;
        if (pos != -1)
            truePath = path.substring(0, pos);
        func = func || function() {
            var params = arguments;
            initPage('pages/' + truePath, params);
        };
        var tmparray = truePath.split("/");
        if (tmparray[1] in router.routes && tmparray[2] in router.routes[tmparray[1]] && tmparray[3] in router.routes[tmparray[1]][tmparray[2]]) {
            return;
        } else {
            router.on(path, func);
        }
    };

    window.router = Router();
    window.ko=ko;
    // ctx="http://10.100.28.232:8080/dingCMS";
    ctx="/dingCMS";
    c_href="";

    $(function() {
    	// 绑定跳转事件
        //// $('#menu,#nav-zone,.js_href').find("a[href*='#']").each(function(e) {
        // $('#menu,.js_href').find("a[href*='#']").each(function(e) {
            // var path = this.hash.replace('#', '');
            // addRouter(path);
            // var location=window.location.hash;
            // if(location==$(this).attr('href')){
            	// $(this).parents('li').addClass('on').siblings().removeClass('on');
            // }
        // });

        // $('#nav-zone').find("a[href*='#']").each(function(e) {
            // var location=window.location.hash;
            // if(location==$(this).attr('href')){
            	// // $(this).parents('li').addClass('specli').siblings().removeClass('specli')
            // }
        // });

        // 展开菜单  -- 点击
        $('#menu').on('click','li.nav-li',function(e){
        	$(this).addClass("on").siblings().removeClass('on').find('li').removeClass('on');
        	// /*收缩菜单同步改变*/
        	var index=$(this).index();
        	$('#nav-zone  li').eq(index).addClass('specli').siblings().removeClass('specli').find('li').removeClass('specli');
        });
        	$('#menu').on('click','li.subnav-li',function(e){
        	$(this).addClass("on").siblings().removeClass('on').find('li').removeClass('on');
        });


       	// 左侧菜单  -- ，  点击选中状态
        $('#nav-zone').on('click','li.nav-li',function(e){
        	var index=$(this).index();
        	$(this).addClass('specli').siblings().removeClass('specli');

        	/*展开菜单同步改变*/
        	$('#menu li.nav-li').eq(index).addClass('on').siblings().removeClass('on');
        	var href = $(this).children('a').attr('href');
        	// if(href.replace("#",'')){
	        	var aa = "a[href*='" + href + "']";
    	    	$($('#menu').find(aa)).parent().addClass('on');
        	// }
        });
        //收起状态 点击
        $('#nav-zone').on('click','.subnav-li',function(){
        	$(this).addClass('on').siblings().removeClass('on');
        	$(this).parents('li').siblings().find('li').removeClass('on');
	        var href = "a[href*='" + $(this).children('a').attr('href') + "']";
	        c_href = href;
        });

        $("#nav-zone").on('mouseenter','.nav-li',function(){
        	$(this).addClass('on');
        }).on('mouseleave','.nav-li',function(){
        	$(this).removeClass('on');
        });

        // 点击展开  -- 子菜单
        $("#menu,#nav-zone").on("click","a.js_sub",function(e){
			e.stopPropagation();
			if($(this).find('i').last().hasClass('uf-arrow-down')) { //向下
				$(this).find('i:last').removeClass('uf-arrow-down').addClass('uf-arrow-up');
				$(this).parents('li').siblings().find('a').find('i.uf-arrow-up').removeClass('uf-arrow-up').addClass('uf-arrow-down')
				$(this).parents('li').addClass("on").siblings().removeClass('on').find('li').removeClass('on');
				e.preventDefault();
			}else{
				$(this).find('i:last').removeClass('uf-arrow-up').addClass('uf-arrow-down');
				$(this).parents('li').removeClass('on').find('li').removeClass('on');
				// e.target.parentNode.parentNode.classList.remove("on");
				e.preventDefault();
			}
        });

       // 左侧菜单 -- 收起，展开
	    $('.foldingpad').click(function() {
		    if($(this).hasClass('rotate')){
		      _unfold();//展开
		    }else{
		      _shrink();
		    }
		    $($('#menu,#nav-zone').find(c_href)).parent().addClass('on').siblings().removeClass('on');
		 });

		// left nav shrink 收缩
		  function _shrink(){
		    $('.nav-li').addClass('live-hover');
		    $('.foldingpad').addClass('rotate');
		    // $('.nav-item-list').css('left','-180px');
		    $('.page-container').css('margin-left','55px');
		    $('.foldingpad').css('left','65px')
		    $('.page-sidebar').css('margin-left','-168px');
		    $('.page-small-sidebar').css('margin-left','0px');
		    $('.global-notice').css('left','90px')
		    // setCookie('menu','2');
		    $("#nav-zone").removeClass('c_hide');
		  }
		  // left nav unfold 展开
		  function _unfold(){
		    $('.nav-li').removeClass('live-hover');
		    $('.foldingpad').removeClass('rotate');
		    // $('.nav-item-list').css('left','75px');
		    $('.page-container').css('margin-left','168px');
		    $('.page-sidebar').css('margin-left','0px');
		    $('.page-small-sidebar').css('margin-left','-55px');
		    $('.global-notice').css('left','235px')
		    $('.foldingpad').css('left','180px');
		    $("#nav-zone").addClass('c_hide');
		  }

		//页面加载时确认消息数量
		getMsgList();
		//消息提醒
		$('.msgMenu').click(function(){
			if($('#msgList').css('display')=='none'){
				if($('.msgMenu').find('span').text()==''){
					var msgListHtml=`<ul id='msgUl'>
						<li><p style='text-align:center;line-height:40px;'>暂无未读消息</p></li>
						<li class='listLine'></li>
						<li style='text-align:center;height:25px;line-height:25px;border:none;font-weight:bold;'>查看全部消息 》</li></ul>`;
					$('#msgList').html(msgListHtml);
					$('#msgList').click(function(e){
						e.stopPropagation();
						e.preventDefault();
						location.href= ctx + '/index.html#/message/message';
						$('#msgList').css('display','none');
					});
					$('#msgList').css('display','block');
				}else{
					getMsgList();
					$('#msgList').click(function(e){
						e.stopPropagation();
						e.preventDefault();
						location.href= ctx + '/index.html#/message/message?search_messageType=0';
						$('#msgList').css('display','none');
					});
					$('#msgList').css('display','block');
				}

				//点击空白处 消息栏关闭
				$(document).mouseup(function(e) {
					var _con = $('#msgList'); // 获取目标区域
					if (!_con.is(e.target) && _con.has(e.target).length === 0) {
						$('#msgList').css('display','none');
					}
				})

			}else{
				$('#msgList').css('display','none');
			}
		});

		//请求未读消息列表
		function getMsgList(){
			$.ajax({
				type : 'get',
				url : ctx + '/message/list.do?sortField=ts&sortDirection=desc&search_messageType=0',
				dataType : 'json',
				contentType : 'application/json;charset=utf-8',
				success : function(res) {
					if (res) {
						if (res.success == 'success') {
							var content=res.detailMsg.data.content;//获取消息列表
							var msgNum=content.length;
							if(msgNum==0){
								$('.msgMenu').find('i').css('color','rgb(3, 162, 228)');
								$('.msgMenu').find('span').text('');
								$('.msgMenu').find('span').css('padding','0');
							}else{
								var el = $('.msgMenu').find('i').css('color');
								$('.msgMenu').find('i').css('color','rgb(232,17,25)');
								$('.msgMenu').find('span').text(msgNum); //设置消息数量
								$('.msgMenu').find('span').css('padding','0 3px');
								var msgListHtml='';
								for(var item of content){
									msgListHtml+=`
									<li>
										<p>${item.content}</p> 
										<p>${new Date(item.sendtime).toLocaleString()}</p>
									</li>
									<li class="listLine"></li>`
								}
								msgListHtml = '<ul>' + msgListHtml + "<li style='text-align:center;height:25px;line-height:25px;border:none;font-weight:bold;'>查看更多未读消息 》</li></ul>";
								$('#msgList').html(msgListHtml);
							}
						}else{

						}
					}
				},
				error:function(error){
					console.log(error)
				}
			})
		};

		// 注销
		$('#logout').on('click',function(){
		try{
			var msgTitel = '注销确认';
			var msgContent = '是否确认注销登录？';
			$vue.$confirm(msgContent, msgTitel, {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
		  	}).then(() => {
				$.ajax({
					type:'POST',
					url:ctx + "/login/loginout",
					success:function(){
						// window.location.href = ctx +'/login';
						// return;
					},
					error:function(){
					}
				});
				$vue.$message({
					type: 'success',
					message: '注销成功，请重新登录!',
					offset: '60'
				});
				window.location.href = ctx +'/login';
				return;
			}).catch(() => {
				$vue.$message({
				type: 'info',
				message: '已取消',
				offset: '60'
				});
			});
			/*  u.confirmDialog({
					msg: "确认注销?",
					title: "注销确认",
					onOk: function () {
						$.ajax({
							type:'POST',
							url:ctx + "/login/loginout",
							success:function(){
								// window.location.href = ctx +'/login';
								// return;
							},
							error:function(){

							}
						});
						window.location.href = ctx +'/login';
						return;
					},
					onCancel: function () {
					}
				});*/
			}catch(err){
				window.location.href = ctx +'/login';
				return;
			}
		});
		//鼠标悬停,显示下拉菜单
		$('.welcome').hover(
			function(){
				$('#dropdownMenu').css('display','block');
			},
		    function(){
			    $('#dropdownMenu').css('display','none');
			}
		);
		//修改密码弹窗开始
		u.compMgr.apply({
			el: 'body'
		})
		/*第一种模态框*/
		var msgBtn3 = document.body.querySelector("#cpwd");
		u.on(msgBtn3, 'click', function () {
			window.md = u.dialog({id: 'testDialg', content: "#dialog_content", hasCloseMenu: true, width: "500px;"});
			$('.u-msg-dialog').css('width', '500px');
			$('#currentPwd').val("");
			$('#newPwd').val("");
			$('#newCpwd').val("");
			$('.eye').children().attr('class','far fa-eye-slash');
		});
		var okButton = document.body.querySelector(".u-msg-ok");
		u.on(okButton, 'click', function () {
			var info="<i class='uf uf-correct margin-r-5'></i>密码修改成功";
			var currentPwd=$('#currentPwd').val();
			var newPwd=$('#newPwd').val();
			var newCpwd=$('#newCpwd').val();
			if(currentPwd==''){
				var msgContent = '当前密码不能为空！';
				$vue.$message({
					showClose: true,
					message: msgContent,
					type: 'error',
					customClass: 'el-zindex'
				});
				return
			};
			if(newPwd==''){
				var msgContent = '新密码不能为空！';
				$vue.$message({
					showClose: true,
					message: msgContent,
					type: 'error',
					customClass: 'el-zindex'
				});
				return
			};
			if(newCpwd==''){
				var msgContent = '请再次输入新密码！';
				$vue.$message({
					showClose: true,
					message: msgContent,
					type: 'error',
					customClass: 'el-zindex'
				});
				return
			}
			if(newPwd!=newCpwd){
				var msgContent = '两次输入密码不一致！';
				$vue.$message({
					showClose: true,
					message: msgContent,
					type: 'error',
					customClass: 'el-zindex'
				});
				return
			}
			if(newPwd==currentPwd){
				var msgContent = '新密码与原密码相同！';
				$vue.$message({
					showClose: true,
					message: msgContent,
					type: 'error',
					customClass: 'el-zindex'
				});
				return
			}
			$.ajax({
				type : 'post',
				url:ctx + '/user/password.do',
				data : {
					oldPassword:currentPwd,
					newPassword:newPwd
				},
				success : function(res) {
					if(res.success=='success'){
						if(res.detailMsg.data.state[0]==1){
							var msgContent = '当前密码输入错误！';
							$vue.$message({
								showClose: true,
								message: msgContent,
								type: 'error',
								customClass: 'el-zindex'
							});
						}else if(res.detailMsg.data.state[0]==0){
							var msgContent = '密码修改成功！';
							$vue.$message({
								showClose: true,
								message: msgContent,
								type: 'success',
								customClass: 'el-zindex'
							});
							md.close();
						}
					}
				},
				error:function(error){
					console.log(error)
				}
			});
		});
		var cancelButton = document.body.querySelector(".u-msg-cancel");
		u.on(cancelButton, 'click', function () {
			md.close();
		});
		//点击眼睛图标显示隐藏密码
		$('.eye').on('click',function(){
			 var eyeClass= $(this).children().attr('class');
			 if(eyeClass=='far fa-eye'){
				$(this).children().attr('class','far fa-eye-slash');
				$(this).prev().attr('type','password');
			 }else{
				$(this).children().attr('class','far fa-eye');
				$(this).prev().attr('type','type');
			 }
		});
		//修改密码弹框结束

		// window.router.init();
        // if (window.location.href.indexOf("#") < 0) {
            // window.router.setRoute($('#menu').find("a[href*='#']")[0].hash.replace('#', ''));
        // };

        /**统一设置ajax的参数信息，发送信息前加载 loading 图标，请求完成后去掉 loading进度条图片 */
        var reset = 0;
        $.ajaxSetup({
            beforeSend: function (xhr) {
                var centerContent='<i class="uf uf-fluffycloudsilhouette u-loader-centerContent"></i>';
                var opt1={
                    hasback:true,
                    hasDesc:true,//是否含有加载内容描述
                    centerContent:centerContent
                };
                try{
                	u.showLoader(opt1);
                }catch(err){

				}
            },
            complete: function (xhr, status,thrown) {
                setTimeout("u.hideLoader({hasback:true});",200 );
                return
                if((!xhr.responseText) || xhr.responseText == "reset"){
                	if(reset==0){
                		reset++;
                        console.log("reset");
	                    $.ajax({
    	                    type: 'POST',
        	                url: ctx + "/login/loginout",
            	        });
					}
                    window.location.href = ctx + '/login';
                    return;
				}else{
                	try {
						var r = JSON.parse(xhr.responseText);
						if(r.msg == 'auth check error!'){
							window.location.href = ctx + '/login';
							return;
						}
					}catch (e) {
						window.location.href = ctx + '/login';
						return;
					}
				}
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {//对错误进行统一处理
                var info='' ;
                if(XMLHttpRequest.readyState == 0 ){
                    info = '请求超时'+ XMLHttpRequest.responseText  ;
                }else if(false){
                    window.location.href = ctx + "/login";
                }else{
                    info = '请求异常，请检查。' + XMLHttpRequest.responseText ;
				}
				var msgTitle = '操作提示';
				var msgContent = info;
				$vue.$alert(msgContent, msgTitle, {
					confirmButtonText: '确定',
					callback: action => {
						this.$message({
							type: 'info',
							message: `action: ${ action }`
						});
					}
				});
            }
        }) ;

		//请求 用户的信息
		$.ajax({
			method:'GET',
			async:false,
			url:ctx + '/user/info.do',
			data:{},
			dataType : 'json',
			contentType: 'application/json;charset=utf-8',
			success:function(data){
				sessionStorage['userobj'] = JSON.stringify(data);
				if(data.username){
					$("#cusername").text(data.username);
				}
			},
			error:function(data){
				console.log(data);
			}
		});

		//请求 用户的 权限
		$.ajax({
			method:'GET',
			async:false,
			url:ctx + '/funreg/funs.do',
			data:{},
			dataType : 'json',
			contentType: 'application/json;charset=utf-8',
			success:function(data){
				//渲染数据  二级菜单
				var list = data.detailMsg.data||[];
				var html = "";
				var html_zone = "";
				for(var i=0,j=list.length;i<j;i++){
					html += `<li class="nav-li">
						<a onclick="javascript:void(0);" class="js_sub">
							<i class="uf ${list[i].funicon}"></i>
							<span class="nav-title">${list[i].funname}</span>
							<i class="uf uf-arrow-down icon-arrow"></i>
	                    </a>
	                	<ul class="subnav-menu">`;
	                html_zone += `<li class="nav-li"><a onclick="javascript:void(0);" class="js_sub">
	                    <i class="uf ${list[i].funicon}"></i></a><ul class="subnav-menu">`;
					for(var si=0,sj=list[i].funChild.length;si<sj;si++){
						html += `<li class="subnav-li"><a href="${list[i].funChild[si].furl}">
	           			<i class="uf uf-bullseye"></i><span class="nav-title">${list[i].funChild[si].funname}</span></a></li>`;
	           			html_zone += `<li class="subnav-li"><a href="${list[i].funChild[si].furl}">
	           			<i class="uf uf-bullseye"></i><span class="nav-title">${list[i].funChild[si].funname}</span></a></li>`;
					}
	                html += "</ul></li>";
	                html_zone += "</ul></li>";
				}
				$("#menu").html(html);
				$("#nav-zone").html(html_zone);

			 	$('#menu,.js_href').find("a[href*='#']").each(function(e) {
		            var path = this.hash.replace('#', '');
		            addRouter(path);
		            var location=window.location.hash;
		            if(location==$(this).attr('href')){
		            	$(this).parents('li').addClass('on').siblings().removeClass('on');
		            }
		        });
		        window.router.init();
		        if (window.location.href.indexOf("#") < 0) {
		        	if ($('#menu').find("a[href*='#']")[0]){
						window.router.setRoute($('#menu').find("a[href*='#']")[0].hash.replace('#', ''));
					}
		        }
			}
		});

    });

    function initPage(p, id) {
        var module = p;
        var truePath = p.substring(6);
        var aa = "a[href='#" + truePath+ "']";
        c_href = aa;
        $($('#menu,#nav-zone').find(aa)).parent().addClass('on');
        var content = document.getElementById("content");
        require([module], function(module) {
            ko.cleanNode(content);
            content.innerHTML = "";
            module.init(content);
            //选中菜单栏
			var hash = window.location.hash;
			if(hash){
				if(hash.indexOf('=') != -1){
					sessionStorage['hash'] = hash;
				}
				var c_href = `a[href="${hash}"]`
			}
			var dom = $($('#menu,#nav-zone').find(c_href));
			dom.parents('li').addClass('on').siblings().removeClass('on');
        })
    }

    window.$vue = new Vue();
});
