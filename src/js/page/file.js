var vue_instance = new Vue({
    el: '#app',
    data: {
        list: [],
        search_param:{page:1,"rows":per_page_cnt,"type":"1"},        
        totalPages: 0,
        level_list:[],    
        form_data:{},    
        title:"",
        jquery_validate_obj:{},
        order_by:true,
        left_list:[], 
        zNodes:[],
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
                jquery_ajax(ACTION_URL.positions_delete,"post",id,true,()=>{
                    alert("操作成功");
                    location.href = location.href;
                }); 
            }                 
        },
        submit_form:function () {                        
            console.log(this.form_data);   
            if(!$("#form_lable").valid()){
                alert("标‘*’字段必须填写");
                return; 
            }                 
            $.ajax({
                type: 'post',
                url :ACTION_URL.file_upload,
                headers: {
                    "Authorization": ""+getToken()
                },
                data:$("#form_lable").serialize(),
                xhrFields : {
                        withCredentials : true
                },			
                success: function(data) {
                    var dd = 0;
                },
                error : function (){
                    window.location.href=longinUrl;
                }
            });
            //document.getElementById('form_lable').submit();                               
            // jquery_ajax(ACTION_URL.positions_modify,"post",this.form_data,true,(json_result)=>{                
            //     console.log(json_result);
            //     alert("操作成功");
            //     if(this.form_data.id > 0){
            //         location.href="/production/department/level.html?current_page="+this.search_param.page;
            //     }else{
            //         location.href="/production/department/level.html";
            //     }
            // });                    
        },        
        load_edit_data(){ //拉取修改页的数据            
            jquery_ajax(ACTION_URL.positions_getPositions,"post",this.form_data.id,false,(json_result)=>{
                this.form_data = json_result.data; //赋值                               
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
            check: {
                enable: true
            },
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
        var left_tree_obj = $.fn.zTree.init($("#left_tree"), setting, this.zNodes);
        left_tree_obj.setting.callback.onCheck = this.left_tree_on_check;    

        //拉目录列表
        jquery_ajax_obj({"url":ACTION_URL.company_structure,"post_data":undefined,"is_json_param":true,
            "callback_func":(e)=>{    
                console.log(e.data);                
                // this.zNodes = e.data;      
                // this.zNodes =[
                //     { id:1, pId:0, name:"徐海涛部门", open:true},
                //     { id:11, pId:1, name:"杨锴", open:true},
                //     { id:12, pId:1, name:"陈子栋部门", open:true},
                //     { id:2, pId:0, name:"陈子栋部门", open:true},
                //     { id:22, pId:2, name:"赵海洋部门", open:true},
                //     { id:221, pId:22, name:"李松"},
                //     { id:222, pId:22, name:"胡江"},
                //     { id:23, pId:2, name:"李文东"}
                // ];                                    
                // var left_tree_obj = $.fn.zTree.init($("#left_tree"), setting, this.zNodes);
                // left_tree_obj.setting.callback.onCheck = this.left_tree_on_check;                        
            },
        });   
    },
})

