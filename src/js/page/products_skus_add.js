var vue_instance = new Vue({
    el: '#app',
    data: {
        form_data: {"id":null,"subModel":"-"},        
        current_page:1,        
        title_name:"",
        model_list:[],
        price_floor_list:[],
        price_floor_item_list:[],       
        no_change_true:true,     
        is_load_detail:true,
    },
    methods: {
        submit_form:function () {                    
            this.form_data.priceFloorItemId = $("#price_floor_item_id").val();                              
            this.form_data.modelId = parseInt($("#model").val());                                         
            jquery_ajax(ACTION_URL.skus_modify,"post",this.form_data,true,(json_result)=>{                
                console.log(json_result);
                alert("操作成功");
                if(this.form_data.id > 0){
                    //location.href="/production/product/products_skus.html?current_page="+this.current_page;
                }else{
                    location.href="/production/product/products_skus.html";
                }
            });                    
        },        
        load_edit_data(){ //拉取修改页的数据            
            jquery_ajax(ACTION_URL.skus_detail,"post",this.form_data.id,false,(json_result)=>{
                this.form_data = json_result.data; //赋值                   
                setTimeout(function(){                    
                    $("#model").val(json_result.data.modelId);    
                    $("#model").change();             
                    $("#price_floor_id").val(json_result.data.priceFloorId);                     
                    this.no_change_true  = false;
                    $("#price_floor_id").change();                                               
                    $("#price_floor_item_id").val(json_result.data.priceFloorItemId);                        
                    $("#price_floor_item_id").change();    
                    
                },200);                                        
            });                    
        }
    },
    created: function () {          
        //解析URL参数
        var page_param = parseURL(window.location.href);        
        this.title_name = "新增产品";
        jquery_ajax(ACTION_URL.product_model_list,"post",{"page":1,"rows":3000},true,(e)=>{
            this.model_list = e.data.records;        
        }); 
             
        jquery_ajax(ACTION_URL.price_floor_list,"post",{"page":1,"rows":3000},true,(e)=>{
            this.price_floor_list = e.data;   
            this.no_change_true  = true;                   
            $("#price_floor_id").change();    
        });
        if(page_param["id"] != undefined){
            this.form_data.id = page_param["id"];            
            //this.load_edit_data(); 
            this.title_name = "修改产品"
        }
        if(page_param["current_page"] != undefined){
            this.current_page = page_param["current_page"];            
        }                                    
    },
    mounted() {        
        $("#cancelBtn").click(function() {
            location.href = history.go(-1);
        });               
        $('select').select2(); 
        $("#price_floor_id").on('change',(e)=> {
            setTimeout(() => { 
                if(this.no_change_true){
                    jquery_ajax(ACTION_URL.price_floor_item_list,"post",{"page":1,"rows":3000,"priceFloorId":parseInt($("#price_floor_id").val())},true,(e)=>{
                        this.price_floor_item_list = e.data.records;
                        var page_param_1 = parseURL(window.location.href);       
                        if(page_param_1["id"] != undefined && this.is_load_detail){   
                            this.is_load_detail = false;                            
                            this.load_edit_data(); 
                        }
                    }); 
                }                                                          
            }, 200);
                         
         });
    },
})