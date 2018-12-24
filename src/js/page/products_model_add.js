var vue_instance = new Vue({
    el: '#app',
    data: {
        form_data: {"id":null},        
        current_page:1,        
        title_name:"",
        product_sub_category_list:[],      
        unit_performance_rate:"",
        unit_capacity:"",
    },
    methods: {
        submit_form:function () {                    
            this.form_data.productId = $("#product_category_id").val();                                                                            
            jquery_ajax(ACTION_URL.product_model_modify,"post",this.form_data,true,(json_result)=>{                
                console.log(json_result);
                alert("操作成功");
                if(this.form_data.id > 0){
                    location.href="/production/product/products_model.html?current_page="+this.current_page;
                }else{
                    location.href="/production/product/products_model.html";
                }
            });                    
        },        
        load_edit_data(){ //拉取修改页的数据            
            jquery_ajax(ACTION_URL.product_model_detail,"post",this.form_data.id,false,(json_result)=>{
                this.form_data = json_result.data; //赋值                   
                setTimeout(function(){                    
                    $("#product_category_id").val(json_result.data.productId);
                    $("#product_category_id").change();                    
                },200);                                        
            });                    
        },
        load_product_detail(product_id){            
            jquery_ajax(ACTION_URL.product_category_detail,"post",product_id,false,(e)=>{
                this.unit_capacity = e.data.unitCapacity;
                this.unit_performance_rate = e.data.unitPerformanceRate;
            });  
        }
    },
    created: function () {          
        //解析URL参数
        var page_param = parseURL(window.location.href);        
        this.title_name = "新增主型号";
        jquery_ajax(ACTION_URL.product_category_list,"post",{"page":1,"rows":5000},true,(e)=>{
            this.product_sub_category_list = e.data.records;
        });        
        
        
        if(page_param["id"] != undefined){
            this.form_data.id = page_param["id"];            
            this.load_edit_data(); 
            this.title_name = "修改主型号"
        }
        if(page_param["current_page"] != undefined){
            this.current_page = page_param["current_page"];            
        }                                    
    },
    mounted() {        
        $("#cancelBtn").click(function() {
            location.href = history.go(-1);
        });               
        $("#product_category_id").on('change', (e)=> {
            this.load_product_detail($("#product_category_id").val());
         });
         $('select').select2(); 
    },
})