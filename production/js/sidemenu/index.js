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
        {
            text: "授权人员",
            href: "/production/department/grant.html"
        },        
        {
            text: "级别管理",
            href: "/production/department/level.html"
        },
        {
            text: "部门管理",
            href: '/production/department/department_new.html'
        },
        {
            text: "职位设置",
            href: '/production/department/job.html'
        },
        {
            text: "账户管理",
            href: '/production/department/account.html'
        },
        {
            text: "目录管理",
            href: '/production/department/file_category.html'
        },
        {
            text: "文件管理",
            href: '/production/department/file.html'
        } ,
        {
            text: "密钥管理",
            href: '/production/department/secret.html'
        }        
    ];
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
})();