<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <title>登录</title>
    <link rel="stylesheet" href="${ctx}/style/login.css" />
    <!--[if lt IE 9]>
    <script src="${ctx}/vendor/html5shiv.min.js"></script>
    <script src="${ctx}/vendor/respond.min.js"></script>
	<![endif]-->
	<!--自定义弹窗样式
	<style>
		.alert{
			width:400px;
			height:50px;
			padding-left:20px;
			padding-right:20px;
			display:flex;
			justify-content:space-between;
			line-height:50px;
			background:#fff;
			border-radius:3px;
			position:absolute;
			top:20px;
			left:50%;
			margin-left:-200px;
			box-shadow:#aaa 0 0 5px;
		}
		.btn{
			width:60px;
			height:30px;
			margin-top:10px;
			border-radius:3px;
			border:none;
			outline:none;
			background:#03a2e4;
		}
	</style>-->
</head>
<body>
	<script>
		window.$ctx = '${ctx}';
	</script>
	<!--自定义弹窗
		<div class="alert">
			<span>用户名或密码不正确</span>
			<button class='btn'>确认</button>
		</div>-->
	<form method="post" id="formlogin" action="${ctx}/login/formLogin">
		<div id="entry" class=" w1">
			<div id="bgDiv" class="mc"  >
				<#--<div clstag="pageclick|keycount|20150112ABD|48" id="entry-bg" style="width: 511px; height: 455px; background: url(&quot;${ctx}/static/dl1.png&quot;) no-repeat scroll 0px 0px transparent; position: absolute; left: -44px; top: -44px;">-->
				<#--</div>-->
				<!--
				此登录页面简单的示意一下登录的过程，主要为验证iuap-auth组件。
				此处应该进行输入的验证和前端js的RSA加密，请参考security.js中的方法进行加密，配合后端的RsaUtils进行解密
				-->
				<div class="form"  >
					<div>
						<div class="" style="height: 120px;text-align: center;margin: auto;">
                            <img src="${ctx}/static/logo.png" alt="" style="max-height: 100%;max-width: 70%;">
						</div>
					</div>
					<div class="item fore1">
						<#--<span>邮箱/用户名/已验证手机</span>-->
						<div class="item-ifo">
							<input type="text" autocomplete="off" tabindex="1" value="" placeholder="手机/邮箱/用户名" class="text" name="username" id="username">
						</div>
					</div>
					<div class="item fore2">
						<#--<span>密码</span>-->
						<div class="item-ifo">
							<input type="password" autocomplete="off" tabindex="2" placeholder="密码" class="text" name="password" id="password">
						</div>
					</div>
					<div id='remind' style="height:15px;box-sizing:border-box;padding-top:20px;color:rgb(242,98,53);font-size:14px;"></div>
                    <!--<div class="opera" >
                        <div style="float: left;color:#63789d;">
                            <label>
                                <input name="rmbUser" id="rmbUser" type="checkbox" class="jpwd" style="margin-top: 2px;">
                                记住密码
                            </label>
                        </div>
                        <div style="float: right;">
                            <a href="#" style="color: #03a1c1;">忘记密码</a>
                        </div>
					</div>-->
					<div class="item login-btn2013">
						<!--<button type="submit" class="btn btn-danger btn-entry bg_blue">登     录</button>-->
						<button id='submit' class="btn btn-danger btn-entry bg_blue">登     录</button>
					</div>
				</div>
			</div>
		</div>
	</form>
	<script src="${ctx}/vendor/jquery/jquery-1.11.2.js" type="text/javascript"></script>
	<script src="${ctx}/vendor/security/security.js"></script>
	<script>
		var uname=$('#username')[0];
		$('#username').focus(function(){
			$('#remind').html(' ');
		});
		$('#password').focus(function(){
			$('#remind').html(' ');
		});
		$('#submit').click(function(e){
			e.preventDefault();
			var username=$('#username')[0].value;
			var password=$('#password')[0].value;
			$.ajax({
                type:"POST",
                url: "${ctx}/login/formLogin",
                data: {username,password} ,
                success: function (res) {
                	if(!res){
						$('#remind').html('该账号没有登录权限');
					}else if(res.indexOf('登录')==-1){
						window.location.href="/dingCMS/index.html";
					}else{
						$('#remind').html('用户名或密码不正确');
					}
				},
				error:function(err){
					console.log(err);
				}
			});
		});
	</script>
</body>
</html>
