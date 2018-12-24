var vue_instance = new Vue({
    el: '#app',
    data: {
        form_data: {"id":null},        
        current_page:1,        
        title_name:"",
        unit_capacity_list:[],
        unit_count_list:[],
        product_sub_category_list:[],
    },
    methods: {
        submit_form:function () {        
            this.form_data.unitCapacity = $("#unit_capacity_id").find("option:selected").text();       
            this.form_data.unitCapacityId = $("#unit_capacity_id").val();                
            this.form_data.unitCount = $("#unit_count_id").find("option:selected").text();       
            this.form_data.unitCountId = $("#unit_count_id").val();  
            this.form_data.productSubCategoryName = $("#product_sub_category_id").find("option:selected").text();       
            this.form_data.productSubCategoryId  = $("#product_sub_category_id").val();                                       
            jquery_ajax(ACTION_URL.product_category_modify,"post",this.form_data,true,(json_result)=>{                
                console.log(json_result);
                alert("操作成功");
                if(this.form_data.id > 0){
                    location.href="/production/product/products_category.html?current_page="+this.current_page;
                }else{
                    location.href="/production/product/products_category.html";
                }
            });                    
        },        
        load_edit_data(){ //拉取修改页的数据            
            jquery_ajax(ACTION_URL.product_category_detail,"post",this.form_data.id,false,(json_result)=>{
                this.form_data = json_result.data; //赋值                   
                setTimeout(function(){                    
                    $("#unit_capacity_id").val(json_result.data.unitCapacityId);
                    $("#unit_capacity_id").change();
                    $("#unit_count_id").val(json_result.data.unitCountId);
                    $("#unit_count_id").change();
                    $("#product_sub_category_id").val(json_result.data.productSubCategoryId);
                    $("#product_sub_category_id").change();
                },200);        
                
                
            });                    
        }
    },
    created: function () {          
        //解析URL参数
        var page_param = parseURL(window.location.href);        
        this.title_name = "新增产品分类";
        jquery_ajax(ACTION_URL.product_capacities_list,"post",undefined,false,(e)=>{
            this.unit_capacity_list = e.data;
        });        
        jquery_ajax(ACTION_URL.product_sub_categories_list,"post",undefined,false,(e)=>{
            this.product_sub_category_list = e.data;
        });
        if(page_param["id"] != undefined){
            this.form_data.id = page_param["id"];            
            this.load_edit_data(); 
            this.title_name = "修改产品分类"
        }
        if(page_param["current_page"] != undefined){
            this.current_page = page_param["current_page"];            
        }                                    
    },
    mounted() {        
        $("#cancelBtn").click(function() {
            location.href = history.go(-1);
        });       
        // $("#unit_capacity_id").on('change', function (e) {
        //     console.log(e.val)
        //     this.form_data.unitCapacity = e.html;
        //     this.form_data.unitCapacityId = e.val;
        //  });
         $('select').select2(); 
    },
})