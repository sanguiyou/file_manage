/**
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var per_page_cnt = 14;
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

var remote_host = "http://39.106.160.14:8080";
var remote_host = "http://192.168.1.102:8080";
//var remote_host = "http://192.168.2.179:8080";
var ACTION_URL ={
    "city_list":remote_host+"/cities/getlistDic",   //市列表
    "province_list":remote_host+"/provinces/getlistDic",  //省列表
    "area_list":remote_host+"/areas/getlistDic",  //区列表
    "login":remote_host+"/login",  //登录验证    
    "file_levels_delete":remote_host+"/file_levels/delete", 
    "file_levels_detail":remote_host+"/file_levels/detail",  
    "file_levels_list":remote_host+"/file_levels/list", 
    "file_levels_modify":remote_host+"/file_levels/modify", 
    "user_list":remote_host+"/users/list",    
    "user_detail":remote_host+"/users/detail",       
    "user_modify":remote_host+"/users/modify", 
    "user_delete":remote_host+"/users/delete",  
    "user_update_pwd":remote_host+"/users/update_password",  
    "user_update_secket_key":remote_host+"/users/update_secret_key",  
    "positions_delete":remote_host+"/positions/delete",   
    "positions_list":remote_host+"/positions/list",    
    "positions_detail":remote_host+"/positions/detail",       
    "positions_modify":remote_host+"/positions/modify",   
    "departments_delete":remote_host+"/departments/delete",   
    "departments_list":remote_host+"/departments/list",    
    "departments_detail":remote_host+"/departments/detail",       
    "departments_modify":remote_host+"/departments/modify",  
    "files_delete":remote_host+"/files/delete",   
    "files_list":remote_host+"/files/list",    
    "files_detail":remote_host+"/files/detail",       
    "files_add_folder":remote_host+"/files/add_folder",
    "files_rename_folder":remote_host+"/files/rename_folder",
    "file_auths_list":remote_host+"/file_auths/list ", 
    "file_upload_submit":remote_host+"/files/modify_file", 
    "file_auth_info":remote_host+"/files/auth_info",
    "file_auth_add":remote_host+"/file_auths/add", 
    "file_auth_auth":remote_host+"/file_auths/auth", 
    "file_download":remote_host+"/files/download/", 
    "file_dowloads_list":remote_host+"/file_downloads/list", 
    "folder_structures":remote_host+"/files/folder_structure", 
    "upload_file_url":remote_host+"/files/upfile",     
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
    this.console.log(userInfo.token);    
    $("#nickname").text(userInfo.nickname);
    $("#update_pwd_layer_nick_name").text(userInfo.nickname);
    $("#update_pwd_layer_phone").text(userInfo.phone);
    if(userInfo.secret_key != undefined){
        $("#secret_text").text(userInfo.secret_key);
        $("#secret_key_span").show();
    }
    if(userInfo.token != undefined){        
        return userInfo.token;
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
            if(e.result != 00000000){//判断登录过期                
                console.log("ajax return 9000001,"+url);
                //alert(e.msg);
                return;
                //location.href ="/login.html";
            }
            callback_func(e);            
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {    
            console.log(XMLHttpRequest.status);                    
            //alert(XMLHttpRequest.readyState+url);
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
            if(e.result != 00000000){//判断登录过期                
                console.log("ajax return 9000001,"+url);
                //alert(e.msg);
                return;
                //location.href ="/login.html";
            }        
            if(obj.callback_func != undefined)   
                callback_func(e);            
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {    
            console.log(XMLHttpRequest.status);                    
            //alert(XMLHttpRequest.readyState+url);
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
