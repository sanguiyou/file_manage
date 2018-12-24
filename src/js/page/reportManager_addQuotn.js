var vue_instance = new Vue({
    el: '#app',
    data: {
        form_data: {"id":null,items:[{}]},                
        current_page:1,        
        title_name:"", 
        title:"",      
        editor1_obj:{},    
        project_detail:{},
    },
    methods: {
        submit_form:function () {  
            this.form_data.note = this.editor1_obj.getData();                                                  
            jquery_ajax(ACTION_URL.project_quotation_modify,"post",this.form_data,true,(json_result)=>{                
                console.log(json_result);
                alert("操作成功");
                if(this.form_data.id > 0){
                    //location.href="/production/product/products_category.html?current_page="+this.current_page;
                }else{
                    //location.href="/production/product/products_category.html";
                }
            });                    
        },        
        load_edit_data(){ //拉取修改页的数据            
            jquery_ajax(ACTION_URL.product_category_detail,"post",this.form_data.id,false,(json_result)=>{
                this.form_data = json_result.data; //赋值                                                                         
            });                    
        },
        add_product_item(){
            this.form_data.items.push({});            
        },
        del_product_item(array_key){
            this.form_data.items.splice(array_key, 1);            
        }
    },
    created: function () {          
        //解析URL参数
        var page_param = parseURL(window.location.href);        
        this.title_name = "新增产品分类";               
        if(page_param["id"] != undefined){
            this.form_data.id = page_param["id"];            
            this.load_edit_data(); 
            this.title_name = "修改产品分类"
        }        
        this.form_data.project_id = page_param["project_id"];
        jquery_ajax(ACTION_URL.project_detail,"post",this.form_data.project_id,false,(json_result)=>{
            this.project_detail = json_result.data; //赋值
            console.log(this.project_detail);   
            // this.form_data.partyAName = this.project_detail.partyAName;                                                                     
            // this.form_data.companyName = this.project_detail.companyName;
            // this.form_data.contact = this.project_detail.contact;                                                                     
            // this.form_data.ownerName = this.project_detail.ownerName;

        });     
        this.form_data.title = decodeURI(page_param["project_name"]);
                                            
    },    
    computed: {
        // 计算属性的 getter
        total_money: function () {
            // `this` 指向 vm 实例
            var total_money = 0;
            for( var i=0;i<this.form_data.items.length;i++){
                if(this.form_data.items[i].count != undefined && this.form_data.items[i].unitPrice != undefined){
                    total_money += this.form_data.items[i].count*this.form_data.items[i].unitPrice;
                }
                
            }
            return total_money;
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
        // $('select').select2(); 
        this.editor1_obj = CKEDITOR.replace( 'editor1' );
        // $("#addProductBtn").click(function() {
        //     $("#productListUL").append(template("productTemplate"));
        //     resetProductNum();
        // });

        // $("#cancelBtn").click(function(){
        //     location.href = "./projectDetail.html";
        // });

        // $("#productListUL").on("click", ".delete_btn", function() {
        //     console.log("delete-btn");
        //     //$(this).closest("li").remove();
        //     resetProductNum();
        // });
        // function resetProductNum() {
        //     $("#productListUL li .num").each(function(index, ele) {
        //         ele.innerHTML = index+1;
        //     });
        // }
        // $("#productListUL").on("input", ".product_money,.product_count", function() {
        //     var $parent = $(this).closest("li");
        //     var $money = $parent.find(".product_money");
        //     var $count = $parent.find(".product_count");

        //     var money = +$money.val();
        //     var count = +$count.val();
        //     if(isNaN(money)) {
        //         money = 0;
        //         $money.val(0);
        //     }
        //     if(isNaN(count)) {
        //         count = 0;
        //         $count.val(0);
        //     }

        //     console.log(money, count);
        //     $parent.find(".product_total_price").val(money*count);
        // });
    },
})