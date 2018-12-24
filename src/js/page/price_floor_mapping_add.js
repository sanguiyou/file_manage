var vue_instance = new Vue({
    el: '#app',
    data: {
        form_data: {"id":null,"priceFloorItemId":0},        
        current_page:1,        
        title_name:"",        
    },
    methods: {
        submit_form:function () {                   ;                                                                                   
            jquery_ajax(ACTION_URL.price_floor_mapping_modify,"post",this.form_data,true,(json_result)=>{                
                console.log(json_result);
                alert("操作成功");
                if(this.form_data.id > 0){
                    location.href="/production/product/price_floor_mapping.html?current_page="+this.current_page+"&price_floor_item_id="+this.form_data.priceFloorItemId;
                }else{
                    location.href="/production/product/price_floor_mapping.html"+"?price_floor_item_id="+this.form_data.priceFloorItemId;;
                }
            });                    
        },        
        load_edit_data(){ //拉取修改页的数据            
            jquery_ajax(ACTION_URL.price_floor_mapping_detail,"post",this.form_data.id,false,(json_result)=>{
                this.form_data = json_result.data; //赋值                             
            });                    
        }
    },
    created: function () {              
        //解析URL参数
        var page_param = parseURL(window.location.href);        
        this.title_name = "新增限价项"
        if(page_param["id"] != undefined){
            this.form_data.id = page_param["id"];            
            this.load_edit_data(); 
            this.title_name = "修改限价项"
        }
        if(page_param["current_page"] != undefined){
            this.current_page = page_param["current_page"];            
        }                                                
        this.form_data.priceFloorItemId = page_param["price_floor_item_id"];      
    },
    mounted() {             
        $("#cancelBtn").click(function() {
            location.href = history.go(-1);
        });        
    },
})