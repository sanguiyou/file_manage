var vue_instance = new Vue({
    el: '#app',
    data: {
        list: [],        
        totalPages: 0,        
        left_list:[], 
        right_list:[],  
        zNodes:[], 
        project_userid:0
            
    },
    methods: {
        submit_transfer_data: function (ajax_json) {                         
            var id_arr = [];                    
            for (var i = 0; i < this.right_list.length; i++) {  
                id_arr.push(this.right_list[i].id);                  
            }  
            jquery_ajax_obj({"url":ACTION_URL.project_transfer_batch,"post_data":{"toUserId":this.project_userid,"projectIds":id_arr.join(",")},"is_json_param":true,
                "callback_func":(e)=>{                    
                        
                },
            });                                                                       
        },
        
        load_list:function(){  
                        
            // this.zNodes =[
            //     { id:1, pId:0, name:"徐海涛部门", open:true},
            //     { id:11, pId:1, name:"杨锴", open:true},
            //     { id:12, pId:1, name:"陈子栋部门", open:true},
            //     { id:2, pId:0, name:"陈子栋部门", open:true},
            //     { id:22, pId:2, name:"赵海洋部门", open:true},
            //     { id:221, pId:22, name:"李松"},
            //     { id:222, pId:22, name:"胡江"},
            //     { id:23, pId:2, name:"李文东"}
            // ]; 
        },    
        transfer_left_to_right:function(){                         
            var i =0;
            while(this.left_list[i] != undefined){
                if(this.left_list[i].is_checked == true){
                    this.right_list.push(this.left_list[i]);
                    this.left_list.splice(i,1);
                }else{
                    i++;
                }
            }
        }, 
        transfer_right_to_left:function(){                       
            var i =0;
            while(this.right_list[i] != undefined){
                if(this.right_list[i].is_checked == true){
                    this.left_list.push(this.right_list[i]);
                    this.right_list.splice(i,1);
                }else{
                    i++;
                }
            }        
        },
        left_tree_on_check(e, treeId, treeNode){            
            var id = treeNode.id;
            if( treeNode.checked ){
                //拉这个人下的项目
                jquery_ajax_obj({"url":ACTION_URL.project_list,"post_data":{"page":1,"rows":3000,"ownerId":id},"is_json_param":true,
                    "callback_func":(e)=>{                    
                        this.left_list = e.data.records;            
                    },
                });    
                console.log("checked:"+id);
            }else{
                console.log("unchecked:"+id);
            }
        },             
        right_tree_on_check(e, treeId, treeNode){
            var id = treeNode.id;
            if( treeNode.checked ){
                this.project_userid = id;
                console.log("right_tree checked:"+id);
            }else{
                console.log("right_tree unchecked:"+id);
            }
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
        var setting = {
            check: {
                enable: true
            },
            data: {
                simpleData: {
                    enable: true
                }
            }
        };   
        //拉部门列表
        jquery_ajax_obj({"url":ACTION_URL.company_structure,"post_data":undefined,"is_json_param":true,
            "callback_func":(e)=>{    
                console.log(e.data);                
                this.zNodes = e.data;         
                var left_tree_obj = $.fn.zTree.init($("#left_tree"), setting, this.zNodes);
                left_tree_obj.setting.callback.onCheck = this.left_tree_on_check;        
                var right_tree_obj = $.fn.zTree.init($("#right_tree"), setting, this.zNodes);              
                right_tree_obj.setting.callback.onCheck = this.right_tree_on_check;     
            },
        });                                        
        
    },
})

