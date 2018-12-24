console.log("designInsituteManager_followList");

$(".form_datetime").datetimepicker({format: 'yyyy-mm-dd', minView: "month"});

$('#pageLimit1').bootstrapPaginator({
    currentPage: 1,
    totalPages: 100,
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
    onPageClicked: function(event, originalEvent, type, page) {
        console.log("page", page);
    }
});

$("#addressContent li").click(function() {
    var $this = $(this);
    if($this.hasClass("active")) {
        return;
    }

    $this.addClass("active").siblings().removeClass("active");
});

$("#addBtn").click(function() {
    location.href = "./add.html";
});