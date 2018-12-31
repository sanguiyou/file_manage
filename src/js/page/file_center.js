var vue_instance = new Vue({
    el: '#app',
    data: {
        list: [],
        search_param:{page:1,"rows":per_page_cnt,"category_id":""},        
        totalPages: 0,
        position_list:[],    
        form_data:{},    
        title:"",
        jquery_validate_obj:{},
        order_by:true,
        grant_user_list_info:[],
        file_id:0,
        download_url:ACTION_URL.file_download,
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
            this.search_param.type = 2;                    
            jquery_ajax(ACTION_URL.files_list,"post",this.search_param,true,this.list_callback);      
        }, 
        load_list_search:function(){                             
            this.search_param.type = 1;           
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
        down_load_file:function(id){
            location.href=ACTION_URL.file_download+id+"/null"+"?Authorization="+getToken();
            // jquery_ajax_obj({"url":ACTION_URL.file_download+id+"/null","post_data":undefined,"callback_func":(json_result)=>{
                
            // }});  
        },
        submit_form:function () {                        
            console.log(this.form_data);   
            if(!$("#form_lable").valid()){
                alert("标‘*’字段必须填写");
                return; 
            }                                    
            jquery_ajax(ACTION_URL.file_auth_add,"post",this.form_data,true,(json_result)=>{                
                console.log(json_result);
                alert("操作成功");                
                //location.href="/production/department/file_center.html?current_page="+this.search_param.page;
                
            });                    
        },        
        load_edit_data(){ //拉取修改页的数据            
            jquery_ajax(ACTION_URL.positions_getPositions,"post",this.form_data.id,false,(json_result)=>{
                this.form_data = json_result.data; //赋值                               
            });                    
        },
        apply_download_file(){                        
            jquery_ajax_obj({"url":ACTION_URL.file_auth_add,"post_data":this.file_id,"callback_func":(json_result)=>{
                
            }});                
        }
        
    },
    created: function () {
        var page_param = parseURL(window.location.href);
        console.log(page_param["current_page"]);
        if(page_param["current_page"] != undefined){
            this.search_param.page = page_param["current_page"];
        }
        if(page_param["dir_id"] != undefined){
            this.search_param.dir_id = page_param["dir_id"];
        }       
        this.load_list();            
    },
    mounted() {              
        $('#myModal').on('show.bs.modal',(e)=> {                        
            var target = e.relatedTarget;
            var key = target.getAttribute("data-id");     
            this.file_id = this.list[key].id;
            jquery_ajax_obj({"url":ACTION_URL.file_auth_info,"post_data":this.list[key].id,"callback_func":(json_result)=>{
                this.grant_user_list_info = json_result.data;
            }});               
                      
        });
        this.jquery_validate_obj = $("#form_lable").validate({
			rules: {
                name: "required",		                
			},
			messages: {
                name: "*文件名必须填写!",				                
			}
        }); 
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

