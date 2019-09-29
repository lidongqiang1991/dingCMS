var url = "http://dmzoss.iyuhong.com.cn/";
var filenames = ''
function upFile(file,tokenUrl,batch,filename) {
	filenames = filename;
	var token;
	var key;
	//////
	///////
	$.ajax({
		type : 'get',
		async : false,
		url : tokenUrl,
		success : function(res) {
			// key = res.fileid;
			token = res.token;
		}
	});
	var timestamp = (new Date()).valueOf();
	var temp=file.name.split(".");
	var filetype=temp[temp.length-1];

	key=timestamp;
	var saveKey ='';
	if (filetype=="png"||filetype=="jpeg"||filetype=="gif"||filetype=="jpg") {
		saveKey =timestamp;
	}else{
		saveKey =timestamp+"."+filetype;;
	};
	var img='<div class="item" data-id="'+saveKey+'"> <a href="'+url+saveKey+'" target="_blank"><img id="'+key+'" src="static/loading.gif" style="width: 60px; height: 60px;" /></a><span class="delete" data-id="'+saveKey+'">×</span></div>';
	if(batch == 'batch'){
		$("#item_batch").before(img);
	}else{
		$("#item_").before(img);
	}

	var observer = {
		next(res){
		},
		error(res) {
			$("#"+key).attr("src",'static/upfail.png');
		},
		complete(res) {

			if (filetype=="png"||filetype=="jpeg"||filetype=="gif"||filetype=="jpg") {
				$("#"+key).attr({
					"src":url+saveKey+'?imageView2/1/w/60/h/60',
					"title":filename
				});
			}else{
				$("#"+key).attr("src",null);
				$("#"+key).after("<div class='item_model' title='"+ filename + "'>"+filetype+"</div>");
			};
		}
	};

	var config = {
		useCdnDomain : true,
		region : qiniu.region.z1
	};
	var putExtra = {
		mimeType : null //["image/png", "image/jpeg", "image/gif"]
	};
	var observable = qiniu.upload(file, saveKey, token, putExtra, config)
	var subscription = observable.subscribe(observer) // 上传开始
	return saveKey;
}

