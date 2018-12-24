$("#backBtn").click(function () {
    location.href = "./followList.html";
});

$('#pageLimit2').bootstrapPaginator({
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

$('#pageLimit3').bootstrapPaginator({
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

$("#projectListPanel").on("click", "a", function() {
    console.log(this);
    var type = this.getAttribute("data-type");
    var $this = $(this);
    switch(type){
        case "start":
            $(this).parent().prepend('<a class="btn" data-type="edit" href="javascript:void(0)">编辑</a><a class="btn" data-type="cancelPendding" href="javascript:void(0)">取消</a>');
            $this.closest("tr").find(".state").removeClass("state_ready").addClass("state_pendding").text("确认中");
            $(this).remove();
            break;
        case "edit":
            location.href = "./designerProjectEdit.html"
            break;
        case "detail":
            location.href = "./designerProjectDetail.html"
            break;
        case "cancelPendding":
            $this.parent().prepend('<a class="btn" data-type="start" href="javascript:void(0)">开始</a>');
            $this.closest("tr").find(".state").removeClass("state_pendding").addClass("state_ready").text("待确认");
            $this.prev().remove();
            $this.remove();
            break;
    }
});
$("#projectInfoPanel").on("click", "a", function() {
    var type = this.getAttribute("data-type");
    var $this = $(this);
    switch(type) {
        case "start":
            $this.parent().prepend('<a class="btn" data-type="enter" href="javascript:void(0)">确认</a><a class="btn" data-type="cancelPendding"  href="javascript:void(0)">取消</a>');
            $this.closest("tr").find(".state").removeClass("state_ready").addClass("state_pendding").text("确认中");
            $this.remove();
            break;
        case "cancelPendding":
            $this.parent().prepend('<a class="btn" data-type="start" href="javascript:void(0)">开始</a>');
            $this.closest("tr").find(".state").removeClass("state_pendding").addClass("state_ready").text("待确认");
            $this.prev().remove();
            $this.remove();
            break;

    }
});