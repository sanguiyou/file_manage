var vue_instance = new Vue({
    el: '#app',
    data: {
        list: [],
        province_list:[],        
        department_list:[],  
        search_param:{page:1,"rows":per_page_cnt,"provinceId":null},        
        totalPages: 0,
        orderBy:true,
    },
    methods: {
        list_callback: function (ajax_json) {  
            this.list = ajax_json.data.records;
            this.totalPages = ajax_json.data.pages;      
                        
            $('#pageLimit1').bootstrapPaginator({
                currentPage: this.search_param.page,
                totalPages: this.totalPages,
                size:"normal",
                bootstrapMajorVersion: 3,
                alignment:"right",
                numberOfPages:10,
                itemTexts: function (type, page, current) {
                    switch (type) {
                        case "first": return "首页";
                        case "prev": return "上一页";
                        case "next": return "下一页";
                        case "last": return "末页";
                        case "page": return page;
                    }
                },
                onPageClicked: (event, originalEvent, type, page)=> {
                    this.search_param.page = page;
                    console.log("clicked page", page);
                    jquery_ajax_obj({"url":ACTION_URL.user_list_page,"request_type":"post","post_data":this.search_param,"is_json_param":true,"callback_func":this.list_callback});
                }
            }); 
                              
        },
        order_array:function(key){            
            this.orderBy = !this.orderBy;
            console.log(this.orderBy);
            this.list.sort((a,b)=>{                
                var x = a[key];
                var y = b[key];                                
                if(this.orderBy){
                    return((x<y)?-1:((x>y)?1:0));
                }else{
                    return((x<y)?1:((x>y)?-1:0));
                }                
            });            
        },
        load_list:function(){                 
            console.log(this.search_param);            
            jquery_ajax_obj({"url":ACTION_URL.user_list_page,"request_type":"post","post_data":this.search_param,"is_json_param":true,"callback_func":this.list_callback});     
        },
        del_record(id){                      
            if(confirm("确定要删除此记录吗？")){                
                jquery_ajax_obj({"url":ACTION_URL.user_delete,"post_data":id,
                    "callback_func":(e)=>{
                        alert("操作成功");
                        //location.href = location.href;           
                    },
                }); 
            }                 
        },        
        
    },
    created: function () {
        var page_param = parseURL(window.location.href);
        console.log(page_param["current_page"]);
        //拉取省列表
        jquery_ajax(ACTION_URL.province_list,"post",undefined,true,(e)=>{
            this.province_list = e.data;            
        }); 
        //拉取部门列表
        jquery_ajax(ACTION_URL.departments_list_tree,"post",{"page":0,"row":5000},true,(e)=>{
            this.department_list = e.data.records;            
        });        
        if(page_param["current_page"] != undefined){
            this.search_param.page = page_param["current_page"];
        }       
        this.load_list();            
    },
    mounted() {
        $("#addBtn").click(function() {
            location.href = "./clerkAdd.html";
        });
        //拉取省列表        
        $(".form_datetime").datetimepicker({format: 'yyyy-mm-dd', minView: "month"});       
        $("#addressContent li").click(function() {
            var $this = $(this);
            if($this.hasClass("active")) {
                return;
            }

            $this.addClass("active").siblings().removeClass("active");
        });    
    },    
    filters: {
        format_date: function (value) {              
            if(!isNaN(parseInt(value) && value != "" && value != undefined)){
                //return tools.formatDate(parseInt(value));                
                return moment(parseInt(value)).format('YYYY-MM-DD HH:mm:ss');    
            }else{
                return value;
            }                                
        }
    }
})

