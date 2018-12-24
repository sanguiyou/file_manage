console.log("login.js");
$("#loginBtn").click(function(e) {
    var userName = $("#userName").val();
    var passWord = $("#passWord").val();

    if(!userName || !passWord) {
        return;
    }

    e.preventDefault();
    $.ajax({
        url: "http://106.12.154.195:8081/login",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            userName: userName,
            passWord: passWord
        }),
        success: function(e) {
            if(e.result === "00000000") {
                localStorage.setItem("_USER", JSON.stringify(e.data.user));
                location.href = "index.html";
            } else {
                var html = '<div class="alert alert-danger alert-dismissible" role="alert">';
                html += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
                html += '<span aria-hidden="true">&times;</span></button>';
                html += '<p >'+e.msg+'</p>';
                html += '</div>';

                $("#msgContainer").html(html);
            }
        }
    });
});