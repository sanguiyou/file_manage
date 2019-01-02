var vue_instance = new Vue({
    el: '#app',
    data: {
        list: [],
        search_param:{page:1,"rows":per_page_cnt,"type":0},        
        totalPages: 0,
        position_list:[],    
        form_data:{},    
        title:"",
        jquery_validate_obj:{},
        order_by:true,
        download_url:ACTION_URL.file_download,
        token:getToken()
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
            jquery_ajax(ACTION_URL.positions_modify,"post",this.form_data,true,(json_result)=>{                
                console.log(json_result);
                alert("操作成功");
                if(this.form_data.id > 0){
                    location.href="/production/department/level.html?current_page="+this.search_param.page;
                }else{
                    location.href="/production/department/level.html";
                }
            });                    
        },        
        load_edit_data(){ //拉取修改页的数据            
            jquery_ajax(ACTION_URL.positions_getPositions,"post",this.form_data.id,false,(json_result)=>{
                this.form_data = json_result.data; //赋值                               
            });                    
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
        $('#myModal').on('show.bs.modal',(e)=> {      
            //location.href=ACTION_URL.file_download+id+"/null"+"?Authorization="+getToken();                  
            //var target = e.relatedTarget;
            //this.form_data.id = target.getAttribute("data-id");                        
        });
        setInterval(function(){
            $(".left_time").each(function(){                   
                if(parseInt($(this).data('time')) > 0){
                    $(this).data('time',parseInt($(this).data('time'))-1);

                    var hour = Math.floor(parseInt($(this).data('time'))/3600);                
                    var show_hour = hour;
                    if(show_hour < 10){
                        show_hour = "0"+show_hour;
                    }
                    var minutes = Math.floor((parseInt($(this).data('time'))%3600)/60);
                    var show_minutes = minutes;
                    if(minutes < 10){
                        show_minutes = "0"+minutes;
                    }   
                    var seconds = Math.floor((parseInt($(this).data('time'))%3600)%60);
                    var show_seconds = seconds;
                    if(seconds < 10){
                        show_seconds = "0"+seconds;
                    }     
                    $(this).text(show_hour+":"+show_minutes+":"+show_seconds);
                }else{
                    $(this).text("0");
                }                           
            });                            
        },1000);      
        this.jquery_validate_obj = $("#form_lable").validate({
			rules: {
                name: "required",		                
			},
			messages: {
                name: "*文件名必须填写!",				                
			}
        }); 
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

