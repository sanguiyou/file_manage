var vue_instance = new Vue({
    el: '#app',
    data: {
        list:[] ,    
        quotation_id:0,  
        quotation_detail:{}, 
        
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
        this.quotation_id = page_param["quotation_id"];        
        //拉项目详情
        jquery_ajax_obj({"url":ACTION_URL.project_quotation_detail,"post_data":this.quotation_id,"is_json_param":false,
            "callback_func":(e)=>{                    
                this.quotation_detail = e.data;            
            },
        });                               
        this.load_list();            
    },
    mounted() {    
		             
    },    
})


