var vue_instance = new Vue({
    el: '#app',
    data: {
        list: [],
        search_param:{page:1,"rows":per_page_cnt,"type":"1"},        
        totalPages: 0,
        level_list:[],    
        form_data:{"name":"",size:0},    
        title:"",
        jquery_validate_obj:{},
        order_by:true,
        left_list:[], 
        zNodes:[],
        left_tree_obj:{},
    },
    methods: {
        list_callback: function (ajax_json) {              
            this.list = ajax_json.data.records;
            this.totalPages = ajax_json.data.pages;      
                        
            $('#pageLimit1').bootstrapPaginator({
                currentPage: this.search_param.page,
                totalPages: this.totalPages,
                size:"normal",
                bootstrapMajorVersion: 3,
                alignment:"right",
                numberOfPages:10,
                itemTexts: function (type, page, current) {
                    switch (type) {
                        case "first": return "首页";
                        case "prev": return "上一页";
                        case "next": return "下一页";
                        case "last": return "末页";
                        case "page": return page;
                    }
                },
                onPageClicked: (event, originalEvent, type, page)=> {
                    this.search_param.page = page;
                    console.log("clicked page", page);
                    jquery_ajax(ACTION_URL.files_list,"post",this.search_param,true,this.list_callback);  
                }
            }); 
                              
        },       
        order_array:function(key){            
            this.order_by = !this.order_by;
            console.log(this.order_by);
            this.list.sort((a,b)=>{                
                var x = a[key];
                var y = b[key];                                
                if(this.order_by){
                    return((x<y)?-1:((x>y)?1:0));
                }else{
                    return((x<y)?1:((x>y)?-1:0));
                }                
            });            
        },
        load_list:function(){                 
            console.log(this.search_param);            
            jquery_ajax(ACTION_URL.files_list,"post",this.search_param,true,this.list_callback);      
        }, 
        del_record(id){            
            if(confirm("确定要删除此记录吗？")){
                jquery_ajax(ACTION_URL.files_delete,"post",id,true,()=>{
                    alert("操作成功");
                    location.href = location.href;
                }); 
            }                 
        },
        submit_form:function () {                                    
            this.form_data.location = $("#location").val();  
            this.form_data.name = $("#file_name").val();
            this.form_data.size = $("#file_size").val();         
            if(this.form_data.location == ""){
                alert("文件不能为空！");
                return;
            }         
            jquery_ajax(ACTION_URL.file_upload_submit,"post",this.form_data,true,(json_result)=>{
                alert("成功");
                location.href=location.href;
                //this.form_data = json_result.data; //赋值                               
            });                              
        },        
        load_edit_data(){ //拉取修改页的数据            
            jquery_ajax(ACTION_URL.files_detail,"post",this.form_data.id,false,(json_result)=>{
                this.form_data = json_result.data; //赋值      
                $("#location").val(json_result.data.location);  
                $("#file_name").val(json_result.data.name);
                $("#file_size").val(json_result.data.size); 
                this.form_data.parent_id = json_result.data.parent_id;                        
                this.form_data.file_level_id = json_result.data.file_level_id;                
            });                    
        },
        left_tree_on_check(e, treeId, treeNode){            
            var id = treeNode.id;
            $("#folderId").val(id);
            this.form_data.parent_id = treeNode.id;
            if( treeNode.checked ){                 
                console.log("checked:"+id);                
            }else{
                console.log("unchecked:"+id);
            }
        },          
    },
    created: function () {
        var page_param = parseURL(window.location.href);
        console.log(page_param["current_page"]);
        if(page_param["current_page"] != undefined){
            this.search_param.page = page_param["current_page"];
        }        
        jquery_ajax_obj({"url":ACTION_URL.file_levels_list,"post_data":{page:1,"rows":3000},
            "callback_func":(e)=>{
                this.level_list = e.data.records;            
            },
        });  
        this.load_list();            
    },
    mounted() {   
        $("#form_lable").attr("action",ACTION_URL.file_upload);           
        $('#myModal').on('show.bs.modal',(e)=> {                        
            var target = e.relatedTarget;
            this.form_data.id = target.getAttribute("data-id");  
            if(this.form_data.id > 0){
                this.load_edit_data();       
                this.title = "修改文件";
            }else{
                this.form_data = {"id":null};
                this.title = "新增文件";
            }               
        });
        this.jquery_validate_obj = $("#form_lable").validate({
			rules: {
                name: "required",		                
			},
			messages: {
                name: "*文件名必须填写!",				                
			}
        }); 

        var setting = {
            // check: {
            //     enable: true
            // },
            data: {
                simpleData: {
                    enable: true
                }
            }
        };   
        this.zNodes =[
            { id:1, pId:0, name:"徐海涛部门", open:true},
            { id:11, pId:1, name:"杨锴", open:true},
            { id:12, pId:1, name:"陈子栋部门1", open:true},
            { id:2, pId:1, name:"陈子栋部门2", open:true},
            { id:22, pId:2, name:"赵海洋部门3", open:true},
            { id:221, pId:22, name:"李松"},
            { id:222, pId:22, name:"胡江"},
            { id:23, pId:2, name:"李文东"}
        ];      
                                                 
        //拉目录列表
        jquery_ajax_obj({"url":ACTION_URL.folder_structures,"post_data":undefined,"is_json_param":false,
            "callback_func":(e)=>{    
                console.log(e.data);                
                this.zNodes = e.data;   
                this.left_tree_obj = $.fn.zTree.init($("#left_tree"), setting, this.zNodes);                                                              
                //left_tree_obj.setting.callback.onCheck = this.left_tree_on_check;  
                this.left_tree_obj.setting.callback.onClick = this.left_tree_on_check;                                      
            },
        });     
        
        	//初始化fileinput
	var FileInput = function () {
        var oFile = new Object();

        //初始化fileinput控件（第一次初始化）
        oFile.Init = function(ctrlName, uploadUrl) {
        var control = $('#' + ctrlName);

        //初始化上传控件的样式
        control.fileinput({
                language: 'zh', //设置语言
                uploadUrl: uploadUrl, //上传的地址
                //uploadAsync:false,
                showPreview:false,
                //allowedFileExtensions: ['jpg', 'gif', 'png'],//接收的文件后缀
                showUpload: true, //是否显示上传按钮
                showCaption: true,//是否显示标题
                browseClass: "btn btn-primary", //按钮样式     
              dropZoneEnabled: false,//是否显示拖拽区域
                //minImageWidth: 50, //图片的最小宽度
                //minImageHeight: 50,//图片的最小高度
                //maxImageWidth: 1000,//图片的最大宽度
                //maxImageHeight: 1000,//图片的最大高度
                //maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
                //minFileCount: 0,
                allowedPreviewType:true,//预览框的内容是否显示
                maxFileCount: 1, //表示允许同时上传的最大文件个数
                enctype: 'multipart/form-data',
                validateInitialCount:true,
                //previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
                msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
        });

        //导入文件上传完成之后的事件
        $("#input_file").on("fileuploaded", (event, data, previewId, index)=> {
                var data = data.response;                                
                $("#location").val(data.location);
                $("#file_name").val(data.name);
                $("#file_size").val(data.size);
                if (data == undefined) {
                        toastr.error('文件格式类型不正确');
                        return;
                }
                });
        }
                return oFile;
        };


        //0.初始化fileinput
            var oFileInput = new FileInput();
            oFileInput.Init("input_file",ACTION_URL.upload_file_url);
    },
    filters: {
        format_date: function (value,formatStr) {              
            if(!isNaN(parseInt(value) && value != "" && value != undefined)){
                //return tools.formatDate(parseInt(value));          
                //YYYY-MM-DD HH:mm:ss  
                return moment(parseInt(value)).format(formatStr);    
            }else{
                return value;
            }                                
        }
    }
})

