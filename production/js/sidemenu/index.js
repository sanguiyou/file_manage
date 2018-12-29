(function() {
    var menuList = [
        {
            text: "登录页",
            href: "/production/department/login.html"
        },
        {
            text: "文件中心",
            href: "/production/department/file_center.html"
        },
        {
            text: "下载列表",
            href: "/production/department/download_list.html"
        },                         
    ];
    var secret_key = "123";
    var userInfo = localStorage.getItem("_USER");                            
    userInfo = JSON.parse(userInfo);    
    userInfo.secret_key = "2dfadfdasfe3";    
    if(userInfo.secret_key != undefined && userInfo.secret_key != ""){ //管理员
        menuList.push({text: "审批列表",href: '/production/department/grant.html'});
        menuList.push({text: "授权记录",href: '/production/department/grant_record.html'});
    }    
    userInfo.type = 1;
    if(userInfo.type == 1){ //管理员
        menuList.push({text: "级别管理",href: '/production/department/level.html'});
        menuList.push({text: "部门管理",href: '/production/department/department_new.html'});
        menuList.push({text: "职位设置",href: '/production/department/job.html'});
        menuList.push({text: "账户管理",href: '/production/department/account.html'});        
        menuList.push({text: "目录管理",href: '/production/department/file_category.html'});
        menuList.push({text: "文件管理",href: '/production/department/file.html'});
        menuList.push({text: "密钥管理",href: '/production/department/secret.html'});
    }
    

    var html = "";
    html += '<div class="menu_section">'
    html += '<ul class="nav side-menu">';
    for(var i=0, len=menuList.length; i<len; i++) {
        var menu = menuList[i];
        var children = menu.children || [];
        html += '<li>';
        if(children.length) {
            html += '<a><i class="fa fa-home"></i> '+menu.text+"";
            html += '<span class="fa fa-chevron-down"></span></a>';
            html += '<ul class="nav child_menu">';
            for(var j=0, jLen=children.length; j<jLen; j++) {
                var child = children[j];
                html += '<li>';
                var subChildren = child.children || [];
                if(subChildren.length) {
                    html += '<a >'+child.text+'<span class="fa fa-chevron-down"></span></a>';
                    html += '<ul class="nav child_menu">';
                    for(var k=0, kLen=subChildren.length; k<kLen; k++) {
                        var subChild = subChildren[k];
                        html += '<li><a href="'+subChild.href+'">'+subChild.text+'</a></li>';
                    }
                    html += '</ul>';
                } else {
                    html += '<a href="'+child.href+'">'+child.text+'</a>';
                }
                html += '</li>';
            }
            html += '</ul>';
        } else {
            html += '<a href="'+menu.href+'"><i class="fa fa-home"></i> '+menu.text+"";
            html += '</a>';
        }
        html += '</li>';
    }
    html += '</ul>';
    html += '</div>'

    $("#sidebar-menu").html(html);

    $("#copy_btn").click(function(){            
        input.value = $("#secret_text").text(); 
        input.select(); // 选中文本
        document.execCommand("copy"); // 执行浏览器复制命令
        alert("复制成功");                    
    });
    $("#update_pwd").click(function(){            
        var new_password = $("#new_password").val(); 
        var old_password = $("#old_password").val(); 
        var new_password_confirm = $("#new_password_confirm").val();         
        if(new_password != new_password_confirm){
            alert("新密码两次输入不一致！");
            return;
        }        
        jquery_ajax(ACTION_URL.user_update_pwd,"post",{"new_password":new_password,"old_password":old_password,"id":userInfo.id},true,(json_result)=>{
            alert("密码更新成功，请重新登录！");                                       
        });           
    });
    
})();
