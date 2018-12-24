/**
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var per_page_cnt = 4;
function parseURL(url) {
    //var url =  location.href;
    console.log(url);
    if (url.split("?")[1] == undefined) {
        return [];
    }
    var paramArr = url.split("?")[1].split("&");
    var parseResult = new Array();
    for ($i = 0; $i < paramArr.length; $i++) {
        var eachParam = paramArr[$i].split("=");
        parseResult[eachParam[0]] = eachParam[1];
    }
    return parseResult;
}

//var remote_host = "http://39.105.146.145:8081";
var remote_host = "http://192.168.1.102:8081";
var ACTION_URL ={
    "city_list":remote_host+"/cities/getlistDic",   //市列表
    "province_list":remote_host+"/provinces/getlistDic",  //省列表
    "area_list":remote_host+"/areas/getlistDic",  //区列表
    "login":remote_host+"/login",  //登录验证
    "shadow_users_modify":remote_host+"/shadowUsers/modify", //代理人修改接口
    "shadow_users_list":remote_host+"/shadowUsers/listPage", //代理人列表
    "shadow_users_delete":remote_host+"/shadowUsers/delete", //代理人删除
    "shadow_user_detail":remote_host+"/shadowUsers/getShadowUser", //代理商详情    
    "user_list":remote_host+"/user/userList", //用户列表
    "user_list_page":remote_host+"/user/listPage", //用户带翻页  
    "user_detail":remote_host+"/user/getUsers", //用户详情
    "user_modify":remote_host+"/user/modify", //用户修改
    "user_delete":remote_host+"/user/deleteLogic", //用户删除    
    "positions_list":remote_host+"/positions/listTree", //职位列表        
    "positions_modify":remote_host+"/positions/modify", //职位修改
    "positions_delete":remote_host+"/positions/delete", //职位删除
    "positions_getPositions":remote_host+"/positions/getPositions", //职位    
    "departments_list":remote_host+"/departments/listPage", //部门列表带翻页        
    "departments_list_tree":remote_host+"/departments/listTree", //部门列表        
    "departments_modify":remote_host+"/departments/modify", //部门修改
    "departments_delete":remote_host+"/departments/delete", //部门删除
    "departments_get_dep_users":remote_host+"/departments/getDeptUsers", //部门下的人    
    "companies_modify":remote_host+"/companies/modify", //公司修改接口
    "companies_list":remote_host+"/companies/listPage", //公司列表
    "companies_delete":remote_host+"/companies/delete", //公司删除
    "companies_get_companies":remote_host+"/companies/getCompanies", //公司详情  
    "business_modify":remote_host+"/businessEntities/modify", //客户修改接口
    "business_list":remote_host+"/businessEntities/listPage", //客户列表
    "business_delete":remote_host+"/businessEntities/delete", //客户删除
    "business_get_detail":remote_host+"/businessEntities/getBusinessEntities", //客户详情   
    "business_category_modify":remote_host+"/businessEntityCategories/modify", //客户分类修改接口
    "business_category_list":remote_host+"/businessEntityCategories/getlist", //客户分类列表
    "business_category_delete":remote_host+"/businessEntityCategories/delete", //客户分类删除
    "business_category_detail":remote_host+"/businessEntityCategories/getBusinessEntityCategories", //客户分类详情   
    "resource":remote_host+"/api/resource",     
    "product_capacities_delete":remote_host+"/productCapacities/delete", //计量删除
    "product_capacities_modify":remote_host+"/productCapacities/modify", //计量修改
    "product_capacities_detail":remote_host+"/productCapacities/getCapacities", 
    "product_capacities_list":remote_host+"/productCapacities/getList", 
    "product_categories_delete":remote_host+"/productCategories/delete", 
    "product_categories_modify":remote_host+"/productCategories/modify", 
    "product_categories_detail":remote_host+"/productCategories/getProductCategories", 
    "product_categories_list":remote_host+"/productCategories/getList", 
    "product_sub_categories_delete":remote_host+"/productSubCategories/delete", 
    "product_sub_categories_modify":remote_host+"/productSubCategories/modify", 
    "product_sub_categories_detail":remote_host+"/productSubCategories/getProductSubCategories", 
    "product_sub_categories_list":remote_host+"/productSubCategories/getList",
    "product_category_delete":remote_host+"/products/delete",
    "product_category_detail":remote_host+"/products/getProducts",
    "product_category_modify":remote_host+"/products/modify",
    "product_category_list":remote_host+"/products/listPage",
    "product_model_delete":remote_host+"/productModels/delete",
    "product_model_detail":remote_host+"/productModels/getProductModels",
    "product_model_modify":remote_host+"/productModels/modify",
    "product_model_list":remote_host+"/productModels/listPage",
    "price_floor_list":remote_host+"/priceFloors/getList",
    "price_floor_modify":remote_host+"/priceFloors/modify",
    "price_floor_detail":remote_host+"/priceFloors/getPriceFloors",
    "price_floor_delete":remote_host+"/priceFloors/deleteLogic",
    "price_floor_item_list":remote_host+"/priceFloorItems/listPage",
    "price_floor_item_modify":remote_host+"/priceFloorItems/modify",
    "price_floor_item_detail":remote_host+"/priceFloorItems/getPriceFloorItems",
    "price_floor_item_delete":remote_host+"/priceFloorItems/deleteLogic",
    "price_floor_mapping_list":remote_host+"/pricePerformanceMappings/getList",
    "price_floor_mapping_modify":remote_host+"/pricePerformanceMappings/modify",
    "price_floor_mapping_detail":remote_host+"/pricePerformanceMappings/getPriceMappings",
    "price_floor_mapping_delete":remote_host+"/pricePerformanceMappings/delete",
    "skus_list":remote_host+"/productSkus/listPage",
    "skus_modify":remote_host+"/productSkus/modify",
    "skus_detail":remote_host+"/productSkus/getProductSkus",
    "skus_delete":remote_host+"/productSkus/delete",
    "component_skus_list":remote_host+"/productComponentSkus/listPage",
    "component_skus_modify":remote_host+"/productComponentSkus/modify",
    "component_skus_detail":remote_host+"/productComponentSkus/getComponentSkus",
    "component_skus_delete":remote_host+"/productComponentSkus/delete",
	"component_skus_rela_list":remote_host+"/productComponentSkus/getSkuList",
    "component_skus_rela_modify":remote_host+"/productComponentSkus/productSkusModify",
    "component_skus_rela_detail":remote_host+"/productComponentSkus/getSkuInfo",
    "component_skus_rela_delete":remote_host+"/productComponentSkus/productSkusDelete",
	"project_delete":remote_host+"/projects/delete",
	"project_delete_logic":remote_host+"/projects/deleteLogic",
	"project_do_approved":remote_host+"/projects/doApproved",
	"project_do_audit":remote_host+"/projects/doAudit",
	"project_do_finished":remote_host+"/projects/doFinished",
	"project_do_reject":remote_host+"/projects/doReject",
	"project_do_report":remote_host+"/projects/doReport",
	"project_do_sumbit":remote_host+"/projects/doSumbit",
	"project_detail":remote_host+"/projects/getProjects",
	"project_list":remote_host+"/projects/listPage",
	"project_modify":remote_host+"/projects/modify",
	"project_transfer":remote_host+"/projects/transfer",
	"project_transfer_batch":remote_host+"/projects/transferBatch",
	"project_contact_list":remote_host+"/projectContacts/getList",
    "project_contact_modify":remote_host+"/projectContacts/modify",
    "project_contact_detail":remote_host+"/projectContacts/getContacts",
    "project_contact_delete":remote_host+"/projectContacts/delete",
    "project_product_list":remote_host+"/projectProducts/getList",
    "project_product_modify":remote_host+"/projectProducts/modify",
    "project_product_delete":remote_host+"/projectProducts/delete",
    "project_quotation_list":remote_host+"/projectQuotations/getList",
    "project_quotation_modify":remote_host+"/projectQuotations/modify",
    "project_quotation_detail":remote_host+"/projectQuotations/getQuotations",
    "project_quotation_delete":remote_host+"/projectQuotations/delete",
    "project_quotation_item_list":remote_host+"/projectQuotationItems/getList",
    "project_detail_list":remote_host+"/projectDetails/getList",
    "project_visit_list":remote_host+"/projectVisits/getList",
    "project_visit_modify":remote_host+"/projectVisits/modify",
    "project_visit_detail":remote_host+"/projectVisits/getVisits",
    "project_visit_delete":remote_host+"/projectVisits/delete",
    "get_industry_parent_list":remote_host+"/industries/getIndustryParentList",    
    "get_industry_list":remote_host+"/industries/getIndustryList",
    "get_industry_sub_list":remote_host+"/industries/getIndustrySubList",    
    "company_structure":remote_host+"/departments/getCompanyStructures", 
    "contract_list":remote_host+"/agreements/listPage", 
    "contract_modify":remote_host+"/agreements/modify", 
    "contract_detail":remote_host+"/agreements/getAgreements",    
    "contract_select_list":remote_host+"/agreementProductComponentItems/selectList",//组件清单
    "contract_detail_list":remote_host+"/agreementProductItems/detailList",//组件产品清单    
    "agreement_details_list":remote_host+"/agreementDetails/getList", //事件记录
    "agreement_payments":remote_host+"/agreementPayments/listPage", //回款记录    
    "brand_list":remote_host+"/brands/getList", 
};

var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
    $BODY = $('body'),
    $MENU_TOGGLE = $('#menu_toggle'),
    $SIDEBAR_MENU = $('#sidebar-menu'),
    $SIDEBAR_FOOTER = $('.sidebar-footer'),
    $LEFT_COL = $('.left_col'),
    $RIGHT_COL = $('.right_col'),
    $NAV_MENU = $('.nav_menu'),
    $FOOTER = $('footer');

// Sidebar
$(document).ready(function() {
    // TODO: This is some kind of easy fix, maybe we can improve this
    var setContentHeight = function () {
        // reset height
        $RIGHT_COL.css('min-height', $(window).height());

        var bodyHeight = $BODY.outerHeight(),
            footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
            leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
            contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

        // normalize content
        contentHeight -= $NAV_MENU.height() + footerHeight;

        $RIGHT_COL.css('min-height', contentHeight);
    };

    $SIDEBAR_MENU.find('a').on('click', function(ev) {
        var $li = $(this).parent();

        if ($li.is('.active')) {
            $li.removeClass('active active-sm');
            $('ul:first', $li).slideUp(function() {
                setContentHeight();
            });
        } else {
            // prevent closing menu if we are on child menu
            if (!$li.parent().is('.child_menu')) {
                $SIDEBAR_MENU.find('li').removeClass('active active-sm');
                $SIDEBAR_MENU.find('li ul').slideUp();
            }
            
            $li.addClass('active');

            $('ul:first', $li).slideDown(function() {
                setContentHeight();
            });
        }
    });

    // toggle small or large menu
    $MENU_TOGGLE.on('click', function() {
        if ($BODY.hasClass('nav-md')) {
            $SIDEBAR_MENU.find('li.active ul').hide();
            $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
        } else {
            $SIDEBAR_MENU.find('li.active-sm ul').show();
            $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
        }

        $BODY.toggleClass('nav-md nav-sm');

        setContentHeight();

        $('.dataTable').each ( function () { $(this).dataTable().fnDraw(); });
    });

    // check active menu
    $SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

    $SIDEBAR_MENU.find('a').filter(function () {
        return this.href == CURRENT_URL;
    }).parent('li').addClass('current-page').parents('ul').slideDown(function() {
        setContentHeight();
    }).parent().addClass('active');

    // recompute content when resizing
    // $(window).smartresize(function(){  
    //     setContentHeight();
    // });

    setContentHeight();

    // fixed sidebar
    if ($.fn.mCustomScrollbar) {
        $('.menu_fixed').mCustomScrollbar({
            autoHideScrollbar: true,
            theme: 'minimal',
            mouseWheel:{ preventDefault: true }
        });
    }
});
// /Sidebar

console.log('custome');

// Panel toolbox
$(document).ready(function() {
    $('.collapse-link').on('click', function() {
        var $BOX_PANEL = $(this).closest('.x_panel'),
            $ICON = $(this).find('i'),
            $BOX_CONTENT = $BOX_PANEL.find('.x_content');
        
        // fix for some div with hardcoded fix class
        if ($BOX_PANEL.attr('style')) {
            $BOX_CONTENT.slideToggle(200, function(){
                $BOX_PANEL.removeAttr('style');
            });
        } else {
            $BOX_CONTENT.slideToggle(200); 
            $BOX_PANEL.css('height', 'auto');  
        }

        $ICON.toggleClass('fa-chevron-up fa-chevron-down');
    });

    $('.close-link').click(function () {
        var $BOX_PANEL = $(this).closest('.x_panel');

        $BOX_PANEL.remove();
    });
});
// /Panel toolbox

// Tooltip
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip({
        container: 'body'
    });
});
// /Tooltip

// Progressbar
$(document).ready(function() {
	if ($(".progress .progress-bar")[0]) {
	    $('.progress .progress-bar').progressbar();
	}
});
// /Progressbar

// Switchery
$(document).ready(function() {
    if ($(".js-switch")[0]) {
        var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
        elems.forEach(function (html) {
            var switchery = new Switchery(html, {
                color: '#26B99A'
            });
        });
    }
});
// /Switchery

// iCheck
$(document).ready(function() {
    if ($("input.flat")[0]) {
        $(document).ready(function () {
            $('input.flat').iCheck({
                checkboxClass: 'icheckbox_flat-green',
                radioClass: 'iradio_flat-green'
            });
        });
    }
});
// /iCheck

// Table
$('table input').on('ifChecked', function () {
    checkState = '';
    $(this).parent().parent().parent().addClass('selected');
    countChecked();
});
$('table input').on('ifUnchecked', function () {
    checkState = '';
    $(this).parent().parent().parent().removeClass('selected');
    countChecked();
});

var checkState = '';

$('.bulk_action input').on('ifChecked', function () {
    checkState = '';
    $(this).parent().parent().parent().addClass('selected');
    countChecked();
});
$('.bulk_action input').on('ifUnchecked', function () {
    checkState = '';
    $(this).parent().parent().parent().removeClass('selected');
    countChecked();
});
$('.bulk_action input#check-all').on('ifChecked', function () {
    checkState = 'all';
    countChecked();
});
$('.bulk_action input#check-all').on('ifUnchecked', function () {
    checkState = 'none';
    countChecked();
});

function countChecked() {
    if (checkState === 'all') {
        $(".bulk_action input[name='table_records']").iCheck('check');
    }
    if (checkState === 'none') {
        $(".bulk_action input[name='table_records']").iCheck('uncheck');
    }

    var checkCount = $(".bulk_action input[name='table_records']:checked").length;

    if (checkCount) {
        $('.column-title').hide();
        $('.bulk-actions').show();
        $('.action-cnt').html(checkCount + ' Records Selected');
    } else {
        $('.column-title').show();
        $('.bulk-actions').hide();
    }
}

// Accordion
$(document).ready(function() {
    $(".expand").on("click", function () {
        $(this).next().slideToggle(200);
        $expand = $(this).find(">:first-child");

        if ($expand.text() == "+") {
            $expand.text("-");
        } else {
            $expand.text("+");
        }
    });
    $("#login").on("click",function(){        
        var login_param = {"userName":"13600000000","passWord":"123"};
        jquery_ajax_notoken(ACTION_URL.login,"post",login_param,(json)=>{
            if(json.result == "00000000"){                
                localStorage.setItem("_USER",JSON.stringify(json.data));   
                alert("login successfully");
            }  
        });        
    });
});

// NProgress
if (typeof NProgress != 'undefined') {
    $(document).ready(function () {
        NProgress.start();
    });

    $(window).on('load', function() {
        NProgress.done();
    });
}

window.getToken = function() {    
    var userInfo = localStorage.getItem("_USER");                            
    userInfo = JSON.parse(userInfo);    
    this.console.log(userInfo.user.token);
    if(userInfo.user.token != undefined){        
        return userInfo.user.token;
    }
    return null;
}

// set user info
var userInfo = localStorage.getItem("_USER");
if(userInfo) {
    //userInfo = JSON.parse(userInfo);
    $(".profile_info h2").text(userInfo.name);
    $(".profile_pic img").addClass("show").attr("src", userInfo.avatar || "/production/images/missing_avatar.png");
}

function jquery_ajax(url,post_or_get,post_data,is_json,callback_func){            
    var ajax_obj = {
        url: url,
        type: post_or_get,
        dataType: "json",
        headers: {
            "Authorization": ""+getToken()
        },        
        contentType: "application/json",
        success: function(e) {                        
            if(e.result == 90000001){//判断登录过期                
                alert("ajax return 9000001,"+url);
                return;
                //location.href ="/login.html";
            }
            callback_func(e);            
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {    
            console.log(XMLHttpRequest.status);                    
            alert(XMLHttpRequest.readyState+url);
            //alert(textStatus);
        },
        complete: function(XMLHttpRequest, textStatus) {
            this; // 调用本次AJAX请求时传递的options参数
        }
    }    
    if(post_data != undefined){
        if(is_json == true){
            ajax_obj.data = JSON.stringify(post_data);
        }else{
            ajax_obj.data = post_data;
        }              
    }    
    console.log(ajax_obj)
    $.ajax(ajax_obj);
}
function jquery_ajax_obj(obj){    
    url = obj.url;
    console.log(obj.request_type);
    var post_or_get = obj.request_type==undefined?"post":obj.request_type;
    var post_data = obj.post_data==undefined?undefined:obj.post_data;    
    var is_json = obj.is_json_param==undefined?true:obj.is_json_param;//不传默认json格式
    var callback_func = obj.callback_func;

    var ajax_obj = {
        url: url,
        type: post_or_get,
        dataType: "json",
        headers: {
            "Authorization": ""+getToken()
        },        
        contentType: "application/json",
        success: function(e) {                        
            if(e.result == 90000001){//判断登录过期                
                alert("ajax return 9000001,"+url);
                return;
                //location.href ="/login.html";
            }         
            if(obj.callback_func != undefined)   
                callback_func(e);            
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {    
            console.log(XMLHttpRequest.status);                    
            alert(XMLHttpRequest.readyState+url);
            //alert(textStatus);
        },
        complete: function(XMLHttpRequest, textStatus) {
            this; // 调用本次AJAX请求时传递的options参数
        }
    }    
    if(post_data != undefined){
        if(is_json == true){
            ajax_obj.data = JSON.stringify(post_data);
        }else{
            ajax_obj.data = post_data;
        }              
    }    
    $.ajax(ajax_obj);
}

function jquery_ajax_notoken(url,post_or_get,post_data,callback_func){      
    $.ajax({
        url: url,
        type: post_or_get,
        dataType: "json",        
        data: JSON.stringify(post_data),
        async:true,
        contentType: "application/json;charset=UTF-8",
        success: function(e) {                        
            if(e.result == 90000001){//判断登录过期
                console.log(e.msg);
                //location.href ="/login.html";
            }
            callback_func(e);            
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {    
            console.log(XMLHttpRequest.status);                    
            alert(XMLHttpRequest.readyState+url);
            //alert(textStatus);
        },
        complete: function(XMLHttpRequest, textStatus) {
            this; // 调用本次AJAX请求时传递的options参数
        }
    });
}


$(function(){ 
	//工具代码
	tools = {
	    cookie:{
	        set:function(name,value){
	            var exp  = new Date();
	            exp.setTime(exp.getTime() + 30*24*60*60*1000);   
	            document.cookie = name + '='+ escape (value) + ';expires=' + exp.toGMTString()+';path=/';
	        },
	        get:function(name){
	            var arr = document.cookie.match(new RegExp('(^| )'+name+'=([^;]*)(;|$)'));
	            if(arr != null) return unescape(arr[2]); return null;
	        },
	        del:function(name){
	            var exp = new Date();
	            exp.setTime(exp.getTime() - 1);
	            var cval=api.cookie.getCookie(name);
	            if(cval!=null){
	                document.cookie= name + '='+cval+';expires='+exp.toGMTString()+';path=/';
	                document.cookie= name + '='+cval+';expires='+exp.toGMTString();
	            }
	        }
	    }, 
		
		// 计算字符串的字符长度,中文算2个字符
	    countByte: function(str) {
	        var size = 0;
	        for (var i = 0, l = str.length; i < l; i++) {
	            size += str.charCodeAt(i) > 255 ? 2 : 1;
	        }
	        return size; 
	    },
		
		isInt:function(num){
			if (num == "")
				return false;
			var reg = /\D+/;
			return !reg.test(num);     
		},
		
		gotoPage:function(page){
			$("#page").val(page) ;
			$("#searchForm").submit() ;
		},
		
	    isEmail:function(email){
			if (email=="" ||  !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.(\w)+)*(\.(\w){2,3})$/.test(email))	
			{
				return false ;
			}
			else 
			{
				return true ;
			}
		},
		isLetterNum:function(str){
			if (str=="" || !/^[a-zA-Z0-9]*$/.test(str))	
			{
				return false ;
			}
			else
			{
				return true ;
			}
		},
		
		ischinese:function(str){  // 全是中文
			var reg = /^[\u4E00-\u9FA5]+$/; 
			if(!reg.test(str)){
				return false; 
			} else {
				return true; 
			}
		}, 
		
		getLocalTime:function(nS) {  // 时间戳转 Y-m-d H:i:s   
		   return new Date(nS.toString().length == 10 ? nS * 1000 : nS).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
		},
		add0:function(m){
			return m<10?'0'+m:m ;
		},
		formatDate:function(shijianchuo)
		{
			//shijianchuo是整数，否则要parseInt转换
			// 时间戳的精度不同导致，位数分为两种：10位和13位
			var shijianchuo1 = parseInt(shijianchuo.toString().length == 10 ? shijianchuo * 1000 : shijianchuo) ; 
			var time = new Date(shijianchuo1);
			var y = time.getFullYear(); 
			var m = time.getMonth()+1;
			var d = time.getDate();
			var h = time.getHours();
			var mm = time.getMinutes();
			var s = time.getSeconds(); 
			//return y+'-'+ this.add0(m)+'-'+this.add0(d)+' '+ this.add0(h)+':'+ this.add0(mm)+':'+ this.add0(s);
			return y+'-'+ this.add0(m)+'-'+this.add0(d)+' '+ this.add0(h)+':'+ this.add0(mm);
		},
		
		dealCurrent:function(tm){
			var time = new Date(),
				y = time.getFullYear(); 
				m = time.getMonth()+1;
				d = time.getDate(),
				curr = y+'-'+ this.add0(m)+'-'+this.add0(d) ;
			if (tm.indexOf(curr) !== -1) {
				return tm.substring(10) ;
			} else {
				return tm ;	
			}
		},
		
		showMsg:function(msg){ 
			$(".showMsg").html(msg) ;
			$(".showMsg").show() ;
			setTimeout("$('.showMsg').hide() ;",2000);
		},
		/** 
	     * js截取字符串，中英文都能用 
	     * @param str：需要截取的字符串 
	     * @param len: 需要截取的长度 
	     */
		cutstr:function(str, len) {
	        var str_length = 0;
	        var str_len = 0;
	        str_cut = new String();
	        str_len = str.length;
	        for (var i = 0; i < str_len; i++) {
	            a = str.charAt(i);
	            str_length++;
	            if (escape(a).length > 4) {
	                //中文字符的长度经编码之后大于4  
	                str_length++;
	            }
	            if (str_length > len) {
	                str_cut = str_cut.concat("...");
	                return str_cut;
	            }
	            str_cut = str_cut.concat(a);
	        }
	        //如果给定字符串小于指定长度，则返回源字符串；  
	        if (str_length <= len) {
	            return str;
	        }
	    }
	}
}); 