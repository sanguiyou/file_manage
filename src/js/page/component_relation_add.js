var vue_instance = new Vue({
    el: '#app',
    data: {
        form_data: {"id":null,"componentSkuId":0},                        
        component_skus_id:0,
        skus_list:[],
        skus_detail:[],
    },
    methods: {
        submit_form:function () {               
            alert($("#skus_list_id").val());                                   
            this.form_data.skuId = this.skus_list[$("#skus_list_id").val()].id;  
            console.log()                                            
            jquery_ajax(ACTION_URL.component_skus_rela_modify,"post",this.form_data,true,(json_result)=>{                
                console.log(json_result);
                alert("操作成功");
                if(this.form_data.id > 0){
                   location.href="/production/product/component_relation.html?"+"component_skus_id="+this.component_skus_id;
                }else{
                    location.href="/production/product/component_relation.html"+"?component_skus_id="+this.component_skus_id;;
                }
            });                    
        },        
        load_edit_data(){ //拉取修改页的数据            
            jquery_ajax(ACTION_URL.component_skus_rela_detail,"post",this.form_data.id,false,(json_result)=>{
                this.form_data = json_result.data; //赋值                            
            });                    
        }
    },
    created: function () {              
        //解析URL参数
        var page_param = parseURL(window.location.href);        
        this.title_name = "新增组件单品"
        if(page_param["id"] != undefined){
            this.form_data.id = page_param["id"];            
            this.load_edit_data(); 
            this.title_name = "修改组件单品"
        }                                         
        this.component_skus_id = page_param["component_skus_id"]; 
        this.form_data.componentSkuId = page_param["component_skus_id"];            
        jquery_ajax(ACTION_URL.skus_list,"post",{"page":1,"rows":3000},true,(json_result)=>{
            this.skus_list = json_result.data.records; //赋值                                           
            $("#skus_list_id").val(0); 
        }); 
    },
    mounted() {                     
        $("#cancelBtn").click(function() {
            location.href = history.go(-1);
        });                
        $("#skus_list_id").on('change',(e)=> {                                       
            this.skus_detail = this.skus_list[$("#skus_list_id").val()];                                                                                                      
        });
    },
})