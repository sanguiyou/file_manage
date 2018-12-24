Vue.component('table_content', {
    props: ['list'],
    template: `
            <div>
                <table class="table  table-striped">
                <thead>
                <tr>
                    <th>合同编号</th>
                    <th>合同状态</th>
                    <th>价格状态</th>
                    <th>项目名称</th>
                    <th>报备人</th>
                    <th>总金额</th>
                    <th>成交额</th>
                    <th>回款状态</th>
                    <th>发票状态</th>
                    <th>签订日期</th>
                    <th>客户名称</th>
                    <th>供应商</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="obj in list">
                    <td><a  v-html="obj.no" :href="'/production/reportManager/projectDetail.html?project_id='+obj.id"></a></td>
                    <td v-html="obj.status"></td>
                    <td v-html="obj.mark"></td>
                    <td v-html="obj.projectName"></td>
                    <td v-html="obj.ownerName"></td>
                    <td v-html="obj.amount"></td>
                    <td v-html="obj.paidAmount"></td>
                    <td v-html="obj.priceStatus"></td>
                    <td v-html="obj.receiptStatus"></td>
                    <td v-html="obj.signedAt"></td>
                    <td v-html="obj.businessEntityName"></td>
                    <td v-html=""></td>                    
                </tr>                                    
                </tbody>
            </table>            
        </div>
    `
  });
var vue_instance = new Vue({
    el: '#app',
    data: {
        list:[] ,    
        search_param:{page:1,"rows":per_page_cnt,"name":"","status":""},        
        totalPages: 0,  
        agent_list:[],  
        contract_detail:{},    
        contract_id:0,      
        zujianqingdan_list:[],
        component_sku_detail:[],
        agreement_details_list:[],
        agreement_payments_list:[],
    },
    methods: {
        list_callback: function (ajax_json) {              
            console.log(this.search_param);            
            this.list = ajax_json.data.records;            
            this.totalPages = ajax_json.data.pages;                                                            
        },
        load_list:function(){       
            this.search_param.ownerId = $("#owner_id").val();
            this.search_param.signedBegin = $("#startSignedTime").val();
            this.search_param.signedEnd = $("#endSignedTime").val();
            //jquery_ajax(ACTION_URL.contract_list,"post",this.search_param,true,this.list_callback);                          
        },
        del_record(id){            
            if(confirm("确定要删除此记录吗？")){    
                jquery_ajax(ACTION_URL.project_delete_logic,"post",id,true,()=>{
                    alert("操作成功");
                    location.href = location.href;
                }); 
            }                 
        }
        
    },
    created: function () {
        var page_param = parseURL(window.location.href);
        console.log(page_param["current_page"]);
        if(page_param["current_page"] != undefined){
            this.search_param.page = page_param["current_page"];
        }    
        this.contract_id = page_param["contract_id"];
        //合同详情
        jquery_ajax_obj({"url":ACTION_URL.contract_detail,"post_data":this.contract_id,"is_json_param":false,
            "callback_func":(e)=>{                    
                this.contract_detail = e.data;            
            },
        }); 
        jquery_ajax(ACTION_URL.contract_select_list,"post",this.contract_id,false,(e)=>{
            this.zujianqingdan_list = e.data;
        }); 
        jquery_ajax(ACTION_URL.agreement_details_list,"post",this.contract_id,false,(e)=>{
            this.agreement_details_list = e.data;
        }); 
        this.load_list();            
    },    
    filters: {
        format_date_d: function (value) {              
            if(!isNaN(parseInt(value) && value != "" && value != undefined)){
                //return tools.formatDate(parseInt(value));                
                return moment(parseInt(value)).format('HH:mm:ss');    
            }else{
                return value;
            }                                
        },
        format_date_y: function (value) {              
            if(!isNaN(parseInt(value) && value != "" && value != undefined)){
                //return tools.formatDate(parseInt(value));                
                return moment(parseInt(value)).format('YYYY-MM-DD');    
            }else{
                return value;
            }                                
        }
    },
    mounted() {    
		$("#addProejctBtn").click(function() {
			location.href = "./clerkAdd.html";
		});		
		$("a[data-toggle='tab']").on("show.bs.tab", (e)=> {            
			var target = e.currentTarget;
            type = target.getAttribute("data-type");
            console.log(type);
            switch(type){
                case 'zujianqingdan':
                    jquery_ajax(ACTION_URL.contract_select_list,"post",this.contract_id,false,(e)=>{
                        this.zujianqingdan_list = e.data;
                    }); 			
                    break; 
                case 'component_sku_detail':
                    jquery_ajax(ACTION_URL.contract_detail_list,"post",this.contract_id,false,(e)=>{
                        this.component_sku_detail = e.data;
                    }); 			
                    break; 
                case 'shijianjilu':
                    jquery_ajax(ACTION_URL.agreement_details_list,"post",this.contract_id,false,(e)=>{
                        this.agreement_details_list = e.data;
                    }); 			
                 break; 
                case 'huikuanjilu':
                    jquery_ajax(ACTION_URL.agreement_payments,"post",this.contract_id,false,(e)=>{
                        this.agreement_payments_list = e.data;
                    }); 			
                    break;                
            }             
            
        });                                     
    },    
})


