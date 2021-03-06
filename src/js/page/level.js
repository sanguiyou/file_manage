var vue_instance = new Vue({
    el: '#app',
    data: {
        list: [],
        search_param:{page:1,"rows":per_page_cnt,"name":""},        
        totalPages: 0,
        user_list:[],    
        form_data:{},    
        title:"",
        jquery_validate_obj:{},
        order_by:true,
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
                    jquery_ajax(ACTION_URL.file_levels_list,"post",this.search_param,true,this.list_callback);  
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
            jquery_ajax(ACTION_URL.file_levels_list,"post",this.search_param,true,this.list_callback);      
        }, 
        del_record(id){            
            if(confirm("确定要删除此记录吗？")){
                jquery_ajax(ACTION_URL.file_levels_delete,"post",id,true,()=>{
                    alert("操作成功");
                    location.href = location.href;
                }); 
            }                 
        },
        submit_form:function () {                        
            console.log(this.form_data);               
            if(this.form_data.name == undefined){
                alert("级别不能为空");
                return;
            }              
            if(this.form_data.auth_id1 == undefined){
                alert("授权人1必须选择");
                return;
            }
            if(this.form_data.auth_id2 == undefined){
                alert("授权人2必须选择");
                return;
            }
            if(this.form_data.auth_id1 == this.form_data.auth_id2){
                alert("授权人1和授权人2不能是同一个人");
                return;
            }                
            jquery_ajax(ACTION_URL.file_levels_modify,"post",this.form_data,true,(json_result)=>{                
                console.log(json_result);
                alert("操作成功");
                if(this.form_data.id > 0){
                    location.href="/production/department/level.html?current_page="+this.search_param.page;
                }else{
                    location.href="/production/department/level.html";
                }
            });                    
        },        
        load_edit_data(){ //拉取修改页的数据                      
            jquery_ajax(ACTION_URL.file_levels_detail,"post",this.form_data.id,false,(json_result)=>{
                this.form_data = json_result.data; //赋值                               
            });                    
        }
        
    },
    created: function () {
        var page_param = parseURL(window.location.href);
        console.log(page_param["current_page"]);
        if(page_param["current_page"] != undefined){
            this.search_param.page = page_param["current_page"];
        }
             
        jquery_ajax_obj({"url":ACTION_URL.user_list,"post_data":{page:1,"rows":per_page_cnt},
            "callback_func":(e)=>{
                this.user_list = e.data.records;            
            },
        });  
        this.load_list();            
    },
    mounted() {              
        $('#myModal').on('show.bs.modal',(e)=> {                        
            var target = e.relatedTarget;
            this.form_data.id = target.getAttribute("data-id");  
            if(this.form_data.id > 0){
                this.load_edit_data();       
                this.title = "修改级别";
            }else{
                this.form_data = {"id":null};
                this.title = "新增级别";
            }               
        });
        this.jquery_validate_obj = $("#form_lable").validate({
			rules: {
                name: "required",		                
			},
			messages: {
                name: "*级别必须填写!",				                
			}
        }); 
    },
})

