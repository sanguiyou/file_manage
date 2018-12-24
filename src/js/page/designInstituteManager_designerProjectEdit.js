function resetProductNum() {
    $("#productListUL li .product_num").each(function(index, ele) {
        ele.innerHTML = index+1;
    });
}

$("#addProductBtn").click(function() {
    $("#productListUL").append(template("productTemplate"));
    resetProductNum();
});

$("#cancelBtn").click(function(){
    location.href = "./designer.html";
});

$("#productListUL").on("click", ".delete_btn", function() {
    console.log("delete-btn");
    $(this).closest("li").remove();
    resetProductNum();
});

$("#productListUL").on("input", ".product_money,.product_count", function() {
    var $parent = $(this).closest("li");
    var $money = $parent.find(".product_money");
    var $count = $parent.find(".product_count");

    var money = +$money.val();
    var count = +$count.val();
    if(isNaN(money)) {
        money = 0;
        $money.val(0);
    }
    if(isNaN(count)) {
        count = 0;
        $count.val(0);
    }

    console.log(money, count);
    $parent.find(".product_total_price").val(money*count);
});