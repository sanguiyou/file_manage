var vue_instance = new Vue({
    el: '#app',
    data: {
        form_data: {"id":null,"avatar":"../images/missing_avatar.png"},        
        current_page:1,
        city_list:[],
        province_list:[],
        area_list:[],
        title_name:"",
        company_list:[],
        depart_list:[],
        position_list:[],
        validate_obj:{},
    },
    methods: {
        submit_form:function () {                        
            console.log(this.form_data);                  
            if(!$("#signupForm").valid()){
                alert("标‘*’字段必须填写");
                return; 
            }                        
            this.form_data.entryDate = $("#entryDate").val();
            this.form_data.leaveDate = $("#leaveDate").val();
            this.form_data.trialDate = $("#trialDate").val();
            this.form_data.avatar = $("#opening_license_url").val();                 
            jquery_ajax_obj({"url":ACTION_URL.user_modify,"request_type":"post","post_data":this.form_data,"is_json_param":true,
                "callback_func":(json_result)=>{                
                    console.log(json_result);
                    alert("操作成功");
                    if(this.form_data.id > 0){
                         location.href="/production/department/clerk.html?current_page="+this.current_page;
                    }else{
                        location.href="/production/department/clerk.html";
                    }
                },
            });                               
        },        
        load_edit_data(){ //拉取修改页的数据   
            jquery_ajax_obj({"url":ACTION_URL.user_detail,"post_data":this.form_data.id,"is_json_param":false,
                "callback_func":(json_result)=>{
                    this.form_data = json_result.data; //赋值                                  
                    $("#entryDate").val(tools.formatDate(json_result.data.entryDate));
                    $("#leaveDate").val(tools.formatDate(json_result.data.leaveDate));
                    $("#trialDate").val(json_result.data.trialDate);                    
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
        },
        setImage(e){
            const file = e.target.files[0];
            if (!file.type.includes('image/')) {
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {                                
                jquery_ajax_obj({"url":ACTION_URL.resource,"request_type":"post","post_data":event.target.result,"is_json_param":false,
                    "callback_func":(e)=>{
                        this.form_data.avatar = e.data;            
                    },
                });   
                //console.log(event.target.result);
                //this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
            };
            reader.readAsDataURL(file);
        },
    },
    created: function () {        
        //拉取省列表
        jquery_ajax_obj({"url":ACTION_URL.province_list,"request_type":"post","post_data":undefined,"is_json_param":true,
            "callback_func":(e)=>{
                this.province_list = e.data;            
            },
        });   
        //拉公司列表
        jquery_ajax_obj({"url":ACTION_URL.companies_list,"request_type":"post","post_data":{page:0,"rows":3000},"is_json_param":true,
            "callback_func":(e)=>{
                this.company_list = e.data.records;            
            },
        }); 
        //拉部门列表
        jquery_ajax_obj({"url":ACTION_URL.departments_list,"request_type":"post","post_data":{page:0,"rows":3000},"is_json_param":true,
            "callback_func":(e)=>{
                this.depart_list = e.data.records;            
            },
        });  
        //拉职位列表
        jquery_ajax_obj({"url":ACTION_URL.positions_list,"request_type":"post","post_data":{page:0,"rows":3000},"is_json_param":true,
            "callback_func":(e)=>{
                this.position_list = e.data;            
            },
        });       
        //解析URL参数
        var page_param = parseURL(window.location.href);        
        this.title_name = "新增业务员"
        if(page_param["id"] != undefined){
            this.form_data.id = page_param["id"];            
            this.load_edit_data(); 
            this.title_name = "修改业务员"
        }
        if(page_param["current_page"] != undefined){
            this.current_page = page_param["current_page"];            
        }                                    
    },
    mounted() {
        $("#leaveDate").datetimepicker({format: 'yyyy-mm-dd', minView: "month"});
        $("#entryDate").datetimepicker({format: 'yyyy-mm-dd', minView: "month"});
        $("#trialDate").datetimepicker({format: 'yyyy-mm-dd', minView: "month"});
        
        $("#cancelBtn").click(function() {
            location.href = history.go(-1);
        });        
        $('#opening_license').ssi_uploader({
            url: ACTION_URL.resource,
            maxNumberOfFiles: 1,
            maxFileSize: 10,
            allowed: ['jpg', 'gif', 'png', 'jpeg'],
            inProgress:1,
            responseValidation:{
              validationKey: {
                success: 'success',
                error: 'error'
              },
              resultKey: 'msg'
            },
            onUpload:function(){
                console.log('文件上传完毕！');                                  
            }
         });    
         this.validate_obj = $("#signupForm").validate({
			rules: {
                phone: "required",		
                nickname: "required",		
			},
			messages: {
                phone: "*电话必须填写!",				
                nickname: "*真实姓名必须填写!",
			}
        });             
    },
})