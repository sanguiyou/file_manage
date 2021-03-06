var vue_instance = new Vue({
    el: '#app',
    data: {
        list: [],
        search_param:{page:1,"rows":per_page_cnt,"name":""},        
        totalPages: 0,    
        form_data:{},    
        departments_list:[],
        title:"",
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
                    jquery_ajax(ACTION_URL.positions_list,"post",this.search_param,true,this.list_callback);  
                }
            }); 
                              
        },
        // add_job_layer:function(){                 
        //     $(".layer").show();  
        //     $("#add_job_layer").show();              

        // },
        load_list:function(){                 
            console.log(this.search_param);            
            jquery_ajax(ACTION_URL.positions_list,"post",this.search_param,true,this.list_callback);      
        },        
        order_array:function(key){            
            this.orderBy = !this.orderBy;
            console.log(this.orderBy);
            this.list.sort((a,b)=>{                
                var x = a[key];
                var y = b[key];                                
                if(this.orderBy){
                    return((x<y)?-1:((x>y)?1:0));
                }else{
                    return((x<y)?1:((x>y)?-1:0));
                }                
            });            
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
            jquery_ajax(ACTION_URL.positions_modify,"post",this.form_data,true,(json_result)=>{                
                console.log(json_result);
                alert("操作成功");
                if(this.form_data.id > 0){
                    location.href="/production/department/job.html?current_page="+this.search_param.page;
                }else{
                    location.href="/production/department/job.html";
                }
            });                    
        },        
        load_edit_data(){ //拉取修改页的数据            
            jquery_ajax(ACTION_URL.positions_detail,"post",this.form_data.id,false,(json_result)=>{
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
        jquery_ajax_obj({"url":ACTION_URL.departments_list,"post_data":{page:1,"rows":per_page_cnt,"name":""},
            "callback_func":(e)=>{
                this.departments_list = e.data.records;            
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
                this.title="修改职位";
            }else{
                this.form_data = {"id":null};
                this.title="新增职位";
            }                           
        });
    },
})

