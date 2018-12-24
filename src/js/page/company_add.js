var vue_instance = new Vue({
    el: '#app',
    data: {
        form_data: {"id":null},        
        current_page:1,
        city_list:[],
        province_list:[],
        area_list:[],
        title_name:"",
    },
    methods: {
        submit_form:function () {                        
            console.log(this.form_data);                         
            this.form_data.createAt = $("#createAt").val();
            this.form_data.updateAt = '2018-08-12';
            jquery_ajax_obj({"url":ACTION_URL.companies_modify,"request_type":"post","post_data":this.form_data,"is_json_param":true,
                "callback_func":(json_result)=>{                
                    console.log(json_result);
                    alert("操作成功");
                    if(this.form_data.id > 0){
                         location.href="/production/company/index.html?current_page="+this.current_page;
                    }else{
                        location.href="/production/company/index.html";
                    }
                },
            });                               
        },        
        load_edit_data(){ //拉取修改页的数据   
            jquery_ajax_obj({"url":ACTION_URL.companies_get_companies,"request_type":"post","post_data":this.form_data.id,"is_json_param":false,
                "callback_func":(json_result)=>{
                    this.form_data = json_result.data; //赋值            
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
                },
            });                                          
        },
        province_change(){
            this.form_data.cityId = 0;
            this.form_data.areaId = 0;            
            jquery_ajax_obj({"url":ACTION_URL.city_list,"request_type":"post","post_data":this.form_data.provinceId,"is_json_param":true,
                "callback_func":(e)=>{
                    this.city_list = e.data;            
                },
            });
        },
        city_change(){
            this.form_data.areaId = 0;
            jquery_ajax_obj({"url":ACTION_URL.area_list,"request_type":"post","post_data":this.form_data.cityId,"is_json_param":true,
                "callback_func":(e)=>{
                    this.area_list = e.data;            
                },
            });            
        }
    },
    created: function () {        
        //拉取省列表
        jquery_ajax_obj({"url":ACTION_URL.province_list,"request_type":"post","post_data":undefined,"is_json_param":true,
            "callback_func":(e)=>{
                this.province_list = e.data;            
            },
        });            
        //解析URL参数
        var page_param = parseURL(window.location.href);        
        this.title_name = "新增公司信息"
        if(page_param["id"] != undefined){
            this.form_data.id = page_param["id"];            
            this.load_edit_data(); 
            this.title_name = "修改公司信息"
        }
        if(page_param["current_page"] != undefined){
            this.current_page = page_param["current_page"];            
        }                                    
    },
    mounted() {
        $("#createAt").datetimepicker({format: 'yyyy-mm-dd', minView: "month"});
        $("#cancelBtn").click(function() {
            location.href = history.go(-1);
        });        
    },
})