var vue_instance = new Vue({
    el: '#app',
    data: {
        form_data: {"id":null},
        department_list:[],
        current_page:1,        
        title_name:"",
        department_leader_list:[],
    },
    methods: {
        submit_form:function () {                        
            console.log(this.form_data);                                     
            jquery_ajax(ACTION_URL.departments_modify,"post",this.form_data,true,(json_result)=>{                
                console.log(json_result);
                alert("操作成功");
                if(this.form_data.id > 0){
                     location.href="/production/department/department.html?current_page="+this.current_page;
                }else{
                    location.href="/production/department/department.html";
                }
            });                    
        },        
        load_edit_data(){ //拉取修改页的数据            
            jquery_ajax(ACTION_URL.shadow_user_detail+"?id="+this.form_data.id,"get",undefined,false,(json_result)=>{
                this.form_data = json_result.data; //赋值                               
            });                    
        }
    },
    created: function () {
        //拉取部门列表
        jquery_ajax(ACTION_URL.departments_list_tree,"post",{"pid":null},true,(json_result)=>{
            this.department_list = json_result.data.records;
        });  
        //拉部门领导列表
        jquery_ajax(ACTION_URL.user_list,"post",undefined,true,(json_result)=>{
            this.department_leader_list = json_result.data;
        });            
        //解析URL参数
        var page_param = parseURL(window.location.href);        
        this.title_name = "新增部门"
        if(page_param["id"] != undefined){
            this.form_data.id = page_param["id"];            
            this.load_edit_data(); 
            this.title_name = "修改部门"
        }
        if(page_param["current_page"] != undefined){
            this.current_page = page_param["current_page"];            
        }                                    
    },
    mounted() {        
        $("#cancelBtn").click(function() {
            location.href = history.go(-1);
        });        
    },
})