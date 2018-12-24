(function() {
    var menuList = [
        {
            text: "首页",
            href: "/production/index.html"
        }, {
            text: "报备管理",
            children: [
                {
                    text: "项目管理",
                    href: "/production/reportManager/project.html"
                }, {
                    text: "回收站",
                    href: "/production/reportManager/recycleBin.html"
                }, {
                    text: "批量管理",
                    href: "/production/reportManager/transfer.html"
                }
            ]
        }, {
            text: "设计院管理",
            children: [
                {
                    text: "跟踪列表",
                    href: "/production/designInstituteManager/followList.html"
                }, {
                    text: "批量转移",
                    href: "/production/designInstituteManager/transfer.html"
                }
            ]
        }, {
            text: "部门人员",
            children: [
                {
                    text: "业务员设置",
                    href: '/production/department/clerk.html'
                }, {
                    text: "部门设置",
                    href: '/production/department/department.html'
                }, {
                    text: "职位设置",
                    href: '/production/department/job.html'
                }
            ]
        }, {
            text: "代理商",
            href: '/production/agent/index.html'
        }, {
            text: "公告荣誉榜",
            children: [
                {
                    text: "公告通知",
                    href: '/production/noticeHonor/notice.html'
                }, {
                    text: "荣誉榜",
                    href: '/production/noticeHonor/honor.html'
                }, {
                    text: "礼品库",
                    href: '/production/noticeHonor/gift.html'
                }, {
                    text: "公用文章系统",
                    href: '/production/noticeHonor/article.html'
                }
            ]
        }, {
            text: "统计中心",
            children: [
                {
                    text: "团队财务",
                    href: "/production/statistic/finance.html"
                }, {
                    text: "各团队汇总统计",
                    href: "/production/statistic/collect.html"
                }, {
                    text: "团队销售详情",
                    href: "/production/statistic/sell.html"
                }, {
                    text: "团队拜访详情",
                    href: "/production/statistic/visit.html"
                }
            ]
        }, {
            text: "合同绩效",
            children: [
                {
                    text: "合同管理",
                    href: "/production/contractPerformance/contract.html"
                }, {
                    text: "回款管理",
                    href: "/production/contractPerformance/payment.html"
                }, {
                    text: "发票开票记录",
                    href: "/production/contractPerformance/invoice.html"
                }, {
                    text: "公司",
                    href: "/production/company/index.html"
                }, {
                    text: "客户",
                    href: "/production/business/index.html"
                }, {
                    text: "客户分类",
                    href: "/production/business/category.html"
                }
            ]
        }, {
            text: "产品中心",
            children: [
                {
                    text: "限价管理",
                    href: "/production/product/price_floor.html"
                },
                {
                    text: "产品管理",
                    href: "/production/product/products_skus.html"
                }, {
                    text: "组件管理",
                    href: "/production/product/products_component_skus.html"
                }, {
                    text: "主型号管理",
                    href: "/production/product/products_model.html"
                }, {
                    text: "分类管理",
                    href: "/production/product/products_category.html"
                }, {
                    text: "计量单位",
                    href: "/production/product/measurementunit.html"
                }, {
                    text: "一级分类",
                    href: "/production/product/category_level_one.html"
                }, {
                    text: "二级分类",
                    href: "/production/product/category_level_two.html"
                }
            ]
        }, {
            text: "消息中心",
            children: [
                {
                    text: "消息中心",
                    href: "/production/message/index.html"
                }
            ]
        }, {
            text: "其他管理",
            children: [
                {
                    text: "默认页"
                }
            ]
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