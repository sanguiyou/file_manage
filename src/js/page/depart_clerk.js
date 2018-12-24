var vue_instance = new Vue({
    el: '#app',
    data: {
        depart_list: [],
        depart_user_list: [],
        current_depart_id:null,
    },
    methods: {
        load_depart_list(){                 
            jquery_ajax_obj({"url":ACTION_URL.departments_list_tree,"request_type":"post","post_data":{"pid":this.current_depart_id,"row":3000,"page":1},"is_json_param":true,"callback_func":(json_result)=>{
				this.depart_list = json_result.data.records;
			}});     
        },
        load_depart_user_list(){                 
            jquery_ajax_obj({"url":ACTION_URL.departments_get_dep_users,"request_type":"post","post_data":this.current_depart_id,"is_json_param":true,"callback_func":(json_result)=>{
				this.depart_user_list = json_result.data;
			}});     
        }               
    },
    created: function () {        
        var page_param = parseURL(window.location.href);                
        if(page_param["depart_id"] != undefined){
            this.current_depart_id = page_param["depart_id"];                        
        }
        this.load_depart_list();            
    },
    mounted() {
       $("a[data-toggle='tab']").on("show.bs.tab", (e)=> {
            console.log(type);
			var target = e.currentTarget;
			var type = target.getAttribute("data-type");
			if(type == 'depart_list'){
                this.load_depart_list();
			}else{
                this.load_depart_user_list();
            }			
		}); 
    },
})

