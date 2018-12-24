var vue_instance = new Vue({
    el: '#app',
    data: {
        form_data: {"id":null},
        baobei_list:[],
        current_page:1,
        city_list:[],
        province_list:[],
        area_list:[],
        title_name:"",
    },
    methods: {
        submit_form:function () {                        
            console.log(this.form_data);                         
            this.form_data.perceptionTime = $("#perceptionTime").val();
            jquery_ajax(ACTION_URL.shadow_users_modify,"post",this.form_data,true,(json_result)=>{                
                console.log(json_result);
                alert("操作成功");
                if(this.form_data.id > 0){
                     location.href="/production/agent/index.html?current_page="+this.current_page;
                }else{
                    location.href="/production/agent/index.html";
                }
            });                    
        },        
        load_edit_data(){ //拉取修改页的数据            
            jquery_ajax(ACTION_URL.shadow_user_detail,"post",this.form_data.id,true,(json_result)=>{
                this.form_data = json_result.data.shadowUsers; //赋值            
                if(json_result.data.provinceId != undefined){
                    jquery_ajax(ACTION_URL.city_list,"post",json_result.data.provinceId,true,(e)=>{
                        this.city_list = e.data;                
                    }); 
                }                     
                if(json_result.data.cityId != undefined){
                    jquery_ajax(ACTION_URL.area_list,"post",json_result.data.cityId,true,(e)=>{
                        this.area_list = e.data;                
                    });                         
                }     
            });                    
        },
        province_change(){
            this.form_data.cityId = 0;
            this.form_data.areaId = 0;
            jquery_ajax(ACTION_URL.city_list,"post",this.form_data.provinceId,true,(e)=>{
                this.city_list = e.data;                
            }); 
        },
        city_change(){
            this.form_data.areaId = 0;
            jquery_ajax(ACTION_URL.area_list,"post",this.form_data.cityId,true,(e)=>{
                this.area_list = e.data;                
            }); 
        }
    },
    created: function () {
        //拉取报备人列表
        jquery_ajax(ACTION_URL.user_list,"post",undefined,false,(json_result)=>{
            this.baobei_list = json_result.data;
        }); 
        //拉取省列表
        jquery_ajax(ACTION_URL.province_list,"post",undefined,true,(e)=>{
            this.province_list = e.data;            
        });    
        //解析URL参数
        var page_param = parseURL(window.location.href);        
        this.title_name = "新增代理商"
        if(page_param["id"] != undefined){
            this.form_data.id = page_param["id"];            
            this.load_edit_data(); 
            this.title_name = "修改代理商"
        }
        if(page_param["current_page"] != undefined){
            this.current_page = page_param["current_page"];            
        }                                    
    },
    mounted() {
        $("#perceptionTime").datetimepicker({format: 'yyyy-mm-dd', minView: "month"});
        $("#cancelBtn").click(function() {
            location.href = history.go(-1);
        });        
        $('#baobei_select').select2();
    },
})