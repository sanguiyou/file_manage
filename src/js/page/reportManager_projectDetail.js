var vue_instance = new Vue({
    el: '#app',
    data: {
        list:[] ,    
        project_id:0,  
        project_detail:{}, 
        project_product_list:[],  
        project_detail_list:[],   
        project_visit_list:[],
        project_quotation_list:[],
        agent_list:[],  
        owner_list:[],          
    },
    methods: {
        list_callback: function (ajax_json) {              
            console.log(this.search_param);            
            this.list = ajax_json.data.records;            
            this.totalPages = ajax_json.data.pages;                                                            
        },
        load_list:function(){                   
           // jquery_ajax(ACTION_URL.project_list,"post",this.search_param,true,this.list_callback);                         
        },        
        del_record(id){            
            if(confirm("确定要删除此记录吗？")){    
                jquery_ajax(ACTION_URL.project_delete_logic,"post",id,true,()=>{
                    alert("操作成功");
                    location.href = location.href;
                }); 
            }                 
        }
        
    },
    created: function () {
        var page_param = parseURL(window.location.href);                
        this.project_id = page_param["project_id"];        
        //拉项目详情
        jquery_ajax_obj({"url":ACTION_URL.project_detail,"post_data":this.project_id,"is_json_param":false,
            "callback_func":(e)=>{                    
                this.project_detail = e.data;            
            },
        });            
        jquery_ajax_obj({"url":ACTION_URL.project_product_list,"post_data":this.project_id,"is_json_param":false,
            "callback_func":(e)=>{                    
                this.project_product_list = e.data;            
            },
        }); 
        jquery_ajax_obj({"url":ACTION_URL.project_detail_list,"post_data":this.project_id,"is_json_param":false,
            "callback_func":(e)=>{                    
                this.project_detail_list = e.data;            
            },
        });              
        this.load_list();            
    },
    mounted() {    
		$("#backBtn").click(function() {
            location.href = "./project.html";
        });		
        $("a[data-toggle='tab']").on("show.bs.tab",(e)=> {
            var target = e.currentTarget;
            var type = target.getAttribute("data-type");
            switch (type) {
                case "1":
                case "2":
                    jquery_ajax_obj({"url":ACTION_URL.project_visit_list,"post_data":this.project_id,"is_json_param":false,
                        "callback_func":(e)=>{                    
                            this.project_visit_list = e.data;            
                        },
                    });   
                    $("#addReportPriceBtn").hide();
                    break;
                case "3":
                    jquery_ajax_obj({"url":ACTION_URL.project_quotation_list,"post_data":this.project_id,"is_json_param":false,
                        "callback_func":(e)=>{                    
                            this.project_quotation_list = e.data;            
                        },
                    }); 
                    $("#addReportPriceBtn").show();
                    break;
            }
        });                       
    },    
})


