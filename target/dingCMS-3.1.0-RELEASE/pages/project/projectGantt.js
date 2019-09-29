define(['text!pages/project/projectGantt.html', 'pages/project/projectmeta', 'pages/project/projectGantt', 'css!pages/project/projectGantt','uuigrid'], function (html) {

    //初始化方法,页面加载后被 调用
    var init = function (element, params) {
        var viewModel = {
            app: {},
            /* 数据模型 */
            draw: 1,
            totlePage: 0,
            pageSize: 10,
            totleCount: 0,

            // 获取所有的场景
            getFilterUrl:ctx + '/advanfilter/queryall.do',
            getFilterDetailUrl:ctx + '/advanfilter/queryfilter.do',
            saveFilterUrl:ctx + '/advanfilter/savefilter.do',
            delFilterUrl:ctx + '/advanfilter/deluser.do',
            //获取筛选条件
            getTypeFilterUrl: ctx + '/advanfilter/pagesys.do',
            //场景所属页面
            sceneType:'project',
            search_filterid:'',
            search_filter:'',
            orgidlist:[],
            agentidlist:[],
            agentidalllist:[],

            // 工程
            projectListUrl:ctx + '/servicelist/page.do',
            project:{
                //切换工程状态  0 待开工； 1 施工中；  2 已完工
                search_servicestate:0,
                search_startTime1:'',
                search_endTime1:'',
                search_searchParam:'',
            },

            //运营中心
            orgnameList: [
                {
                    name: "运营中心",
                    value: "-1"
                }

            ],
            //区域经销商
            agentnameList: [
                {
                    name: "运营商",
                    value: "-1"
                }
            ],
            agentnameList_temp:[
                {name: "全部运营商", value: "-1"}
            ],
            event: {
                //清除datatable数据
                clearDt: function (dt) {
                    dt.removeAllRows();
                    dt.clear();
                },
                //组装list
                genDataList: function (data) {
                    var datalist = [];
                    datalist.push(data);
                    return datalist;
                },
                //页面初始化
                pageInit: function () {
                    viewModel.app = u.createApp({
                        el: element/* Document.body */,
                        model: viewModel
                    });
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
                                var arr = viewModel.orgnameList||[];
                                var arr_ids = [];
                                for(let i=0,j=res.length;i<j;i++){
                                    let { orgname : name,orgid:orgid, orgs :orgs } = res[i];
                                    let obj = { name:name,value:orgid,orgs:orgs };
                                    arr.push(obj);
                                    arr_ids.push(obj);
                                }
                                viewModel.orgnameList = arr;
                                viewModel.orgidlist = arr_ids;
                                var combo1Obj = document.getElementById('combobox_orgname')['u.Combo'];
                                combo1Obj.setComboData(arr);

                                let agent_arr = [];
                                for(let ai=0,aj=arr.length;ai<aj;ai++){
                                    if(arr[ai].orgs && arr[ai].orgs.length>0) {
                                        for (let ii = 0, jj = arr[ai].orgs.length; ii < jj; ii++) {
                                            let {orgname: name,orgid:orgid} = arr[ai].orgs[ii];
                                            let obj = {name: name, value: orgid};
                                            agent_arr.push(obj);
                                        }
                                    }
                                }
                                viewModel.agentidlist = agent_arr.concat();
                                viewModel.agentidalllist = agent_arr.concat();
                            }
                        }
                    })
                },

                // 获取场景
                loadSceneList:function (fun) {
                    $.ajax({
                        url:viewModel.getFilterUrl,
                        type:'get',
                        data:{
                            "all":"all",
                            type:viewModel.sceneType
                        },
                        dataType : 'json',
                        contentType : "application/json",
                        success:function(res){
                            if(res.detailMsg.data&&res.detailMsg.data.length>0){
                                res.detailMsg.data.push({
                                    filtername:'全部',
                                    id:'',
                                });
                            }
                            if(fun)fun(res);
                        }
                    });
                },
                // 场景详情
                loadSceneDetailList:function (id,fun) {
                    $.ajax({
                        url:viewModel.getFilterDetailUrl,
                        type:'get',
                        data:{
                            filterid:id,
                        },
                        dataType : 'json',
                        contentType : "application/json",
                        success:function(res){
                            if(fun)fun(res);
                        }
                    });
                },
                // 场景删除
                delScene:function (id,fun) {
                    $.ajax({
                        url:viewModel.delFilterUrl,
                        type:'get',
                        data:{
                            filterid:id,
                        },
                        dataType : 'json',
                        contentType : "application/json",
                        success:function(res){
                            if(fun)fun(res);
                        }
                    });
                },
                // 获取筛选条件
                loadSceneTypeList:function (fun) {
                    $.ajax({
                        url:viewModel.getTypeFilterUrl,
                        type:'get',
                        data:{
                            search_type:viewModel.sceneType,
                            // pageSize:50
                        },
                        dataType : 'json',
                        contentType : "application/json",
                        success:function(res){
                            fun(res);
                        }
                    });
                },
                // 保存场景
                saveScene:function (data,fun) {
                    if(data){
                        $.ajax({
                            url:viewModel.saveFilterUrl,
                            type:'post',
                            data:{
                                filter:JSON.stringify(data)
                            },
                            dataType : 'json',
                            // contentType : "application/json",
                            success:function(res){
                                fun();
                            }
                        });
                    }else{
                    }
                },

                //加载 工程列表
                loadList: function (filter) {
                    var jsonData = {
                        pageIndex: viewModel.draw - 1,
                        pageSize: viewModel.pageSize,
                        sortField: "",
                        sortDirection: "asc",
                        search_servicestate: viewModel.project.search_servicestate
                    };
                    // 搜索
                    $(element).find("#search").each(function () {
                        if (this.value == undefined || this.value == '' || this.value.length == 0) {
                            //不执行操作
                        } else {
                            jsonData['search_searchParam'] = this.value.replace(/(^\s*)|(\s*$)/g, "");
                            //去掉空格
                        }
                    });
                    // 根据条件筛选
                    if (filter) {
                        if (filter != '' || filter.length != 0) {
                            // jsonData['search_'+ filter.key ] = filter[key];
                            u.extend(jsonData, filter);
                        }
                    } else {
                        var filterobj = viewModel.project;
                        u.extend(jsonData, filterobj);
                    }
                    $.ajax({
                        type: 'get',
                        url: viewModel.projectListUrl,
                        dataType: 'json',
                        data: jsonData,
                        contentType: 'application/json;charset=utf-8',
                        success: function (res) {
                            if (res) {
                                if (res.success == 'success') {
                                    if (!res.detailMsg.data) {
                                        // viewModel.totleCount = 0;
                                        // viewModel.totlePage = 1;
                                        vm.$data.project.list = res.detailMsg.data.content;
                                        vm.$data.project.totalCount = res.detailMsg.data.totalElements;
                                        vm.$data.project.totlePage = res.detailMsg.data.totalPages;
                                        // viewModel.event.comps.update({
                                        //     totalPages: viewModel.totlePage,
                                        //     pageSize: viewModel.pageSize,
                                        //     currentPage: viewModel.draw,
                                        //     totalCount: viewModel.totleCount
                                        // });
                                        // viewModel.objdata.removeAllRows();
                                        // viewModel.objdata.clear();
                                    } else {
                                        // viewModel.totleCount = res.detailMsg.data.totalElements;
                                        // viewModel.totlePage = res.detailMsg.data.totalPages;
                                        vm.$data.project.list = res.detailMsg.data.content;
                                        vm.$data.project.totalCount = res.detailMsg.data.totalElements;
                                        vm.$data.project.totlePage = res.detailMsg.data.totalPages;
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
                        error: function (er) {
                            $vue.$message({
                                showClose: true,
                                message: '请求超时，请稍后重试！',
                                type: 'error',
                                offset: '60'
                            });
                        }
                    })
                },

            }

        };
        $(element).html(html);
        viewModel.event.loadList();

        var vm = new Vue({
            el:'#projectGantt',
            data: function(){
                return {
                    scene:'',
                    scenelist:[],
                    list:[
                        // {name: '手机', id: 'phone'},
                        // {name: '行业', id: 22},
                        // {name: '线索', id: 33},
                        // {name: '级别', id: 44},
                        // {name: '日期', id: 55},
                    ],
                    conditionlist:[
                        {name: '包含', id: 'contain'},
                        {name: '不包含', id: 'no_contain'},
                        {name: '等于', id: 'equal'},
                        {name: '不等于', id: 'no_equal'},
                        {name: '开始于', id: 'start'},
                        {name: '结束于', id: 'end'},
                        {name: '为空', id: 'is_null'},
                        {name: '不为空', id: 'not_null'},
                        {name: '大于', id: 'gt'},
                        {name: '大于等于', id: 'ge'},
                        {name: '小于', id: 'lt'},
                        {name: '小于等于', id: 'le'},
                    ],
                    filters_temp: {
                        isError: false,  //是否出错
                        checked: false,  //是否保存为场景
                        visible: false,  //弹出框是否显示
                        isEdit: false,  //是否编辑模式
                        filtername: '',  //场景名称
                        type:viewModel.sceneType,
                        id_filterfactor: [],
                    },
                    filters:{
                        isError:false,  //是否出错
                        checked:false,  //是否保存为场景
                        visible:false,  //弹出框是否显示
                        isEdit:false,  //是否编辑模式
                        filtername:'',  //场景名称
                        type:viewModel.sceneType,
                        id_filterfactor:[
                            {
                                field:'',
                                showname:'',
                                formtype:'text',  //select  checkbox
                                setting:[],
                                value:'',
                                start:' ',
                                end:'',
                                id:'',
                                conditions:''
                            }
                        ],
                    },

                    //project
                    project:{
                        servicestate:-1,
                        servicestateList:[
                            {name:'全部工程',value:-1},
                            {name:'待开工工程',value:0},
                            {name:'进行中工程',value:1},
                            {name:'已完工工程',value:2},
                        ],
                        useDate:false,
                        search:'',
                        date:'',
                        list:[],
                        pageSize:10,
                        totalPage:0,
                        totalCount:0,
                    },
                    // gantt
                    gantt:{
                        tab:'',
                        search:'',
                        date:[],
                        date_default:[new Date(),new Date()],
                        pickerOptions: {
                            shortcuts: [{
                                text: '本月',
                                onClick(picker) {
                                    picker.$emit('pick', [new Date(), new Date()]);
                                }
                            },{
                                text: '今年至今',
                                onClick(picker) {
                                    const end = new Date();
                                    const start = new Date(new Date().getFullYear(), 0);
                                    picker.$emit('pick', [start, end]);
                                }
                            }, {
                                text: '最近六个月',
                                onClick(picker) {
                                    const end = new Date();
                                    const start = new Date();
                                    start.setMonth(start.getMonth() - 6);
                                    picker.$emit('pick', [start, end]);
                                }
                            }
                            ]
                        },
                    },
                    super:{
                        list:[],
                    },
                    agent:{
                        list:[],
                    },
                    worker:{
                        list:[],
                    },


                }
            },
            mounted(){
                let that = this;
                this.setSessionFilter();
                // 获取当前页面的场景
                viewModel.event.loadSceneList(function (res) {
                    let data = res.detailMsg.data||[];
                    that.scenelist = that.copyArr(data);
                });

                // 获取当前页面的可选条件
                viewModel.event.loadSceneTypeList(function (res) {
                    let data = res.detailMsg.data?res.detailMsg.data.content:[];
                    for(let i=0,j=data.length;i<j;i++) {
                        let data_ = data[i];
                        for (var key in data_) {
                            if (key == 'conditionlist' || key == 'setting') {
                                data_[key] = JSON.parse(data_[key]);
                            }
                        }
                    }
                    console.log(data);
                    that.list = that.copyArr(data);
                });
            },
            methods:{
                onFilterClick(){
                    this.filters_temp = this.copyObj(this.filters);
                    this.filters_temp.visible = true;
                    this.filters_temp.checked = false;
                    this.filters_temp.isEdit = false;
                    this.filters_temp.filtername = '';
                    this.filters_temp.id = '';
                },
                editSceneClick(item){
                    let that = this;
                    viewModel.event.loadSceneDetailList(item.id,function (res) {
                        let data = res.detailMsg.data;
                        let obj = that.copyObj(data);
                        var arr = obj.id_filterfactor;
                        for(let i=0,j=arr.length;i<j;i++){
                            arr[i].conditionlist = JSON.parse(arr[i].conditionlist);
                            arr[i].setting = arr[i].setting?JSON.parse(arr[i].setting):arr[i].setting;
                            if(arr[i].formtype == 'date'){
                                let a = [];
                                a.push(arr[i].starttime,arr[i].endtime);
                                arr[i].value = a;
                                arr[i].start = arr[i].starttime;
                                arr[i].end = arr[i].endtime;
                            }else if(arr[i].formtype == 'org'){
                                arr[i].setting = viewModel.orgidlist;
                            }else if(arr[i].formtype == 'agent'){
                                arr[i].setting = viewModel.agentidlist;
                            }
                        }
                        that.filters_temp = obj;
                        that.filters_temp.visible = true;
                        that.filters_temp.checked = false;
                        that.filters_temp.isEdit = true;
                    });
                },
                delSceneClick(item){
                    let that = this;
                    this.$confirm('您确定要删除这条场景吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        viewModel.event.delScene(item.id,function (res) {
                            viewModel.event.loadSceneList(function (res) {
                                let data = res.detailMsg.data||[];
                                that.scenelist = that.copyArr(data);
                            });
                            that.scene='';
                            viewModel.event.loadMessageList();
                            that.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        });
                    });
                },
                closeFilterClick(res){
                    console.log('%c'+res,'color:red',"close");
                    this.filters_temp.visible = false;
                    this.filters_temp = Object.assign({},this.filters_temp)
                },
                cancelSceneClick(){
                    viewModel.search_filterid = "";
                    this.scene = "";
                    viewModel.event.loadMessageList();
                },
                // 添加筛选条件
                addFilterClick(){
                    this.filters_temp.id_filterfactor.push({
                        type:viewModel.sceneType,
                        field:'',
                        showname:'',
                        formtype:'text',  //select  checkbox
                        setting:'',
                        value:'',
                        start:'',
                        end:'',
                        id:'',
                        conditions:''
                    });
                },
                delFilterClick(item,i){
                    let that = this;
                    this.$confirm('您确定要删除这条数据吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        that.filters_temp.id_filterfactor.splice(i,1);
                        that.filters.id_filterfactor.splice(i,1);
                        that.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        that.checkError();
                        if(item.formtype=='org'){
                            viewModel.agentidlist = viewModel.agentidalllist.concat();
                        }
                        viewModel.event.loadMessageList();
                    });
                },
                fieldChange(item,i){
                    let obj = this.list.find((res)=>{//这里的userList就是上面遍历的数据源
                        return item.field === res.field;//筛选出匹配数据
                    });
                    item.showname = obj.showname;
                    item.formtype = obj.formtype;
                    item.conditionlist = this.copyArr(obj.conditionlist);
                    if(item.formtype == 'org'){
                        item.setting = this.copyArr(viewModel.orgidlist);
                    }else if(item.formtype == 'agent'){
                        item.setting = this.copyArr(viewModel.agentidlist);
                    }else{
                        item.setting = this.copyArr(obj.setting);
                    }
                    console.log(item);
                    this.checkError();
                },
                dateChange(item){
                    item.start  = item.value[0];
                    item.end  = item.value[1];
                    item.valueName = item.value;
                    if(item.formtype=='org'){
                        let obj = viewModel.orgidlist.find(oi=>{
                            return oi.value == item.value;
                        });
                        item.valueName = obj.name;

                        var org = this.copyArr(obj.orgs||[]);
                        let agent=[];
                        for (let ii = 0, jj = org.length; ii < jj; ii++) {
                            let {orgname: name,orgid:orgid} = org[ii];
                            let obj = {name: name, value: orgid};
                            agent.push(obj);
                        }
                        viewModel.agentidlist = agent;
                        this.$message({
                            message: '修改片区可能导致运营商出现变化!',
                            type: 'warning',
                        });
                        for(let fi=0,fj=this.filters_temp.id_filterfactor.length;fi<fj;fi++){
                            if(this.filters_temp.id_filterfactor[fi].formtype=='agent'){
                                this.filters_temp.id_filterfactor[fi].setting = viewModel.agentidlist;
                                this.filters_temp.id_filterfactor[fi].value = '';
                            }
                        }

                    }else if(item.formtype=='agent'){
                        let obj = viewModel.agentidlist.find(oi=>{
                            return oi.value == item.value;
                        });
                        item.valueName = obj.name;
                    }
                },
                checkError(){
                    //判断是否有重复项
                    let arr = [];
                    for(let i=0,j=this.filters_temp.id_filterfactor.length;i<j;i++){
                        if(this.filters_temp.id_filterfactor[i].field){
                            arr.push(this.filters_temp.id_filterfactor[i].field);
                        }
                    }
                    if(new Set(arr).size !== arr.length){
                        this.filters_temp.isError = true;
                    }else{
                        this.filters_temp.isError = false;
                    }
                },
                saveFilterClick(){
                    // 判断
                    if((this.filters_temp.isEdit&&(!this.filters_temp.filtername))||(this.filters_temp.checked&&(!this.filters_temp.filtername))){
                        $vue.$message({
                            showClose: true,
                            message: '场景名称不能为空',
                            type: 'error'
                        });
                        return;
                    }

                    if(this.filters_temp.isError){
                        $vue.$message({
                            showClose: true,
                            message: '筛选条件中有重复项',
                            type: 'error'
                        });
                        return;
                    }
                    if(this.filters_temp.id_filterfactor.length<1){
                        $vue.$message({
                            showClose: true,
                            message: '筛选条件不能为空',
                            type: 'error'
                        });
                        return;
                    }
                    let errorTip = false;
                    for(let i=0,j=this.filters_temp.id_filterfactor.length;i<j;i++){
                        if(!this.filters_temp.id_filterfactor[i].field){
                            errorTip = 1;
                            break;
                        }else if(!this.filters_temp.id_filterfactor[i].conditions && (this.filters_temp.id_filterfactor[i].formtype!='date')){
                            errorTip = 2;
                            break;
                        }else if(!this.filters_temp.id_filterfactor[i].value){
                            errorTip = 3;
                            break;
                        }
                    }
                    if(errorTip){
                        let msg = '';
                        if(errorTip==1){
                            msg = '筛选的字段名不能为空'
                        }else if(errorTip==2){
                            msg = '判断条件不能为空';
                        }else if (errorTip ==3 ){
                            msg = '筛选条件不能为空';
                        }
                        $vue.$message({
                            showClose: true,
                            message: msg,
                            type: 'error'
                        });
                        return;
                    }
                    // 保存 、  筛选
                    this.filters = this.copyObj(this.filters_temp);
                    var data = this.filters_temp;
                    let that = this;
                    let data_temp = this.copyObj(data);
                    for(let i=0,j=data_temp.id_filterfactor.length;i<j;i++){
                        data_temp.id_filterfactor[i].starttime = data_temp.id_filterfactor[i].start;
                        data_temp.id_filterfactor[i].endtime = data_temp.id_filterfactor[i].end;
                        data_temp.id_filterfactor[i] = this.removeKey(data_temp.id_filterfactor[i]);
                    }
                    if(data.checked||data.isEdit) {
                        // data_temp.id_filterfactor = this.copyArr(data_temp.id_filterfactor);
                        delete data_temp.isEdit;
                        delete data_temp.isError;
                        delete data_temp.checked;
                        delete data_temp.visible;
                        console.log(data_temp);
                        //ajax  ---  保存场景
                        viewModel.event.saveScene(data_temp,function () {
                            that.filters_temp.visible = false;
                            that.$message({
                                type: 'success',
                                message: '成功!'
                            });
                            viewModel.event.loadSceneList(function (res) {
                                let data = res.detailMsg.data||[];
                                that.scenelist = that.copyArr(data);
                            });
                        });
                    }else{
                        viewModel.search_filterid = '';
                        viewModel.search_filter = JSON.stringify(data_temp.id_filterfactor);
                        sessionStorage['filter'] = JSON.stringify(this.filters_temp);
                        viewModel.draw = 1;
                        viewModel.event.loadMessageList();
                    }
                    this.filters_temp.visible = false;
                    // console.log(JSON.stringify(this.filters_temp))
                },
                removeKey(obj){
                    let arr = ['type','field','id','filterid',"conditionlist","setting",'filtername','showname','formtype','conditions','value','starttime','endtime'];
                    for(var key in obj){
                        for(let i=0,j=arr.length;i<j;i++){
                            if(arr.indexOf(key)==-1){
                                delete obj[key];
                            }
                        }
                    }
                    if(obj.formtype=='org'){
                        obj.setting = '';
                    }
                    return obj;
                },
                // 深拷贝
                copyArr:function (arr) {
                    var arr_temp = [];
                    if(arr){
                        for(let i=0,j=arr.length;i<j;i++){
                            if (arr[i] instanceof Array) {
                                arr_temp[i] = this.copyArr(arr[i]);
                            }else if(arr[i] instanceof Object){
                                arr_temp[i] = this.copyObj(arr[i]);
                            } else arr_temp[i] = arr[i];
                        }
                    }
                    return arr_temp;
                },
                copyObj:function (obj) {
                    let obj_temp = {};
                    for(let key in obj){
                        if(obj[key] instanceof Array){
                            obj_temp[key] = this.copyArr(obj[key]);
                        }else if(obj[key] instanceof Object){
                            obj_temp[key] = this.copyObj(obj[key])
                        }else obj_temp[key] = obj[key];
                    }
                    return obj_temp;
                },
                conditionsChange(item){
                    let obj = this.conditionlist.find(cditem=>{
                        return cditem.id == item.conditions;
                    });
                    if(item.conditions=='is_null'||item.conditions=='not_null'){
                        item.value = '--';
                    }
                    item.conditionName = obj.name;
                },
                sceneChange(bool){
                    if(!bool){
                        viewModel.search_filterid = this.scene;
                        viewModel.search_filter = "";
                        viewModel.draw = 1;
                        viewModel.event.loadMessageList();
                    }
                },
                setSessionFilter(){
                    var filter = sessionStorage['filter']?JSON.parse(sessionStorage['filter']):{};
                    if(filter.type== viewModel.sceneType){
                        filter.visible = false;
                        this.filters = Object.assign({},filter);
                    }
                },

                //state 工程列表 sate筛选
                servicestateChange(bool){
                    if(!bool){
                        viewModel.project.search_servicestate = this.project.servicestate;
                        viewModel.draw = 1;
                        viewModel.event.loadList();
                    }
                },
                projectDateChange(){
                    var val = this.project.date;
                    viewModel.project.search_startTime1 = val;
                    viewModel.project.search_endTime1 = val;
                    viewModel.draw = 1;
                    viewModel.event.loadList();
                },
                projectUseDateChange(){
                    var val = this.project.date;
                    var useDate = this.project.useDate;
                    if(useDate){
                        viewModel.project.search_startTime1 = val;
                        viewModel.project.search_endTime1 = val;
                    }else{
                        viewModel.project.search_startTime1 = '';
                        viewModel.project.search_endTime1 = '';
                    }
                    viewModel.draw = 1;
                    viewModel.event.loadList();
                },
                projectSearchChange(){
                    var val = this.project.search;
                    viewModel.project.search_searchParam = val;
                    viewModel.draw = 1;
                    viewModel.event.loadList();
                },
                projectSelectionChange(){

                },
                projectCurrentChange(size){
                    viewModel.draw = size;
                    viewModel.event.loadList();
                },

                // gantt
                ganttTabChange(tab,event){
                    // debugger
                },
                ganttDateChange(){
                    this.gantt.starttime = this.gantt.date[0];
                    this.gantt.endtime = this.gantt.date[1];
                },

            },
            watch:{

            },
            computed:{

            },
        })

    };
    return {
        'template': html,
        init: init
    }
});
