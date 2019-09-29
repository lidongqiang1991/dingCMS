define(['text!pages/report/report.html', 'css!pages/report/report', 'uui'], function (template) {
    var viewModel = {};

    //初始化方法,页面加载后被 调用
    var init = function (element) {
        var viewModel = {
            app: {},
            event: {
                //页面初始化
                pageInit: function () {
                    id = [];
                    viewModel.app = u.createApp({
                        el: element /* Document.body */,
                        model: viewModel
                    });
                    var frm = viewModel.event.getQueryVariable('frm') || 'lhReport.frm';
                    // var agentid = viewModel.event.getCookie('agentid');
                    var agentid = JSON.parse(sessionStorage['userobj']).orgid||'';
                    if(agentid){
                        agentid = '&agentid=' + agentid;
                    }else{
                        agentid = '&agentid=';
                    }
                    var src = 'https://crm1.yuhong.com.cn:8088/DfyhReport/ReportServer?formlet=dingzhimei%2F' + frm + agentid;
                    console.log(src);
                    $('#reportFrame').attr('src', src);

                    var timer = setTimeout(function(){
                        $('#reportFrame').css('width','100%');
                        window.clearTimeout(timer);
                    },200)
                },
                getQueryVariable: function (variable) {
                    var query = window.location.hash.split('?')[1];
                    var vars = query?query.split("&"):[];
                    for (var i = 0; i < vars.length; i++) {
                        var pair = vars[i].split("=");
                        if (pair[0] == variable) {
                            return pair[1];
                        }
                    }
                    return (false);
                },
            }
        };

        $(element).html(template);
        viewModel.event.pageInit();

    };

    return {
        'model': viewModel,
        'template': template,
        'init': init
    };
});
