var vue_instance = new Vue({
    el: '#app',
    data: {
        list: [],
        component_skus_id:0,        
        totalPages: 0,        
        component_skus_detail_obj:{},        
    },
    methods: {
        list_callback: function (ajax_json) {              
            this.list = ajax_json.data;                                                 
                              
        },
        load_list:function(){                 
            console.log(this.search_param);            
            jquery_ajax(ACTION_URL.component_skus_rela_list,"post",this.component_skus_id,false,this.list_callback);      
        },
        del_record(id){            
            if(confirm("确定要删除此记录吗？")){    
                jquery_ajax(ACTION_URL.component_skus_rela_delete,"post",id,true,()=>{
                    alert("操作成功");
                    location.href = location.href;
                }); 
            }                 
        }
        
    },
    created: function () {
        var page_param = parseURL(window.location.href);               
        this.component_skus_id =page_param["component_skus_id"];        
        jquery_ajax(ACTION_URL.component_skus_detail,"post",this.component_skus_id,false,(e)=>{
            this.component_skus_detail_obj = e.data;            
        });         
        this.load_list();            
    },
    mounted() {        
    },
})

