var vue_instance = new Vue({
    el: '#app',
    data: {
        list: [],
        search_param:{page:1,"rows":per_page_cnt,"type":1},        
        totalPages: 0,
        position_list:[],    
        form_data:{},   
        list_current_key:0, 
        title:"",
        jquery_validate_obj:{},
        order_by:true,
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
                    jquery_ajax(ACTION_URL.file_auths_list,"post",this.search_param,true,this.list_callback);  
                }
            }); 
                              
        },       
        order_array:function(key){            
            this.order_by = !this.order_by;
            console.log(this.order_by);
            this.list.sort((a,b)=>{                
                var x = a[key];
                var y = b[key];                                
                if(this.order_by){
                    return((x<y)?-1:((x>y)?1:0));
                }else{
                    return((x<y)?1:((x>y)?-1:0));
                }                
            });            
        },
        load_list:function(){                 
            console.log(this.search_param);            
            jquery_ajax(ACTION_URL.file_auths_list,"post",this.search_param,true,this.list_callback);      
        }, 
        del_record(id){            
            if(confirm("确定要删除此记录吗？")){
                jquery_ajax(ACTION_URL.positions_delete,"post",id,true,()=>{
                    alert("操作成功");
                    location.href = location.href;
                }); 
            }                 
        },
        submit_form:function () {                        
            console.log(this.form_data);   
            if(!$("#form_lable").valid()){
                alert("标‘*’字段必须填写");
                return; 
            }                                
            this.form_data.auth_id = 48;    
            jquery_ajax(ACTION_URL.file_auth_auth,"post",this.form_data,true,(json_result)=>{                
                console.log(json_result);
                alert("操作成功");                
            });                    
        },        
        load_edit_data(){ //拉取修改页的数据            
            jquery_ajax(ACTION_URL.positions_getPositions,"post",this.form_data.id,false,(json_result)=>{
                this.form_data = json_result.data; //赋值                               
            });                    
        },
        paste_secret_key:function(){
            var userInfo = localStorage.getItem("_USER");                            
            userInfo = JSON.parse(userInfo);     
            this.$set(this.form_data,"secret_key",userInfo.secret_key);            
            //this.form_data.secret_key = userInfo.secret_key;            
        }       
    },
    created: function () {
        var page_param = parseURL(window.location.href);
        console.log(page_param["current_page"]);
        if(page_param["current_page"] != undefined){
            this.search_param.page = page_param["current_page"];
        }        
        this.load_list();            
    },
    mounted() {              
        $('#auth_confirm').on('show.bs.modal',(e)=> {                                    
            var target = e.relatedTarget;
            this.list_current_key = target.getAttribute("data-id");          
            alert(this.list[list_current_key].id);                  
            this.$set(this.form_data,"auth_id",this.list[list_current_key].id);                
        });         
                                              
        //$("#paste_btn").click(()=>{  
                 
            //$("#secret_key_paste").val(userInfo.secret_key);
        //});  
        var time = 4000;   
        setInterval(function(){
            $("#left_time").text(parseInt($("#left_time").text())-1);            
            // var minites = (time%3600/60).toFixed(0);
            // var second = (minites%60).toFixed(0); 
            // var time_str = parseInt($("#left_time").text())/3600+":"+minites+":"+second;
            // $("#left_time").text(time_str);
            // time = time-1;
        },1000);                               
    },
    filters: {
        format_date: function (value,formatStr) {              
            if(!isNaN(parseInt(value) && value != "" && value != undefined)){
                //return tools.formatDate(parseInt(value));          
                //YYYY-MM-DD HH:mm:ss  
                return moment(parseInt(value)).format(formatStr);    
            }else{
                return value;
            }                                
        }
    }
})

