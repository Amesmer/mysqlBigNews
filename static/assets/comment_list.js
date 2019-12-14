$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/comment/search',
    success: function (response) {
        // console.log(response)
        var html = template("commentTpl", response);
        // console.log(html)
        $("#commentBox").html(html);
        var pages=template("pageTpl",response);
        $("#pageBox").html(pages)
    }
});


$("#commentBox").on("click", ".anniu", function () {
    var comfirm = confirm("您真的要执行修改操作吗");
    var id = $(this).attr("data-id");
    console.log(id)
    var DT = $(this).text();
    console.log(DT)
    DT = DT === "批准" ? "false" : "true";
    console.log(DT)
    if (comfirm) {
        if (DT) {
            $.ajax({
                type: 'post',
                data: {
                    id: id,
                },
             url: 'http://localhost:8080/api/v1/admin/comment/reject',
                success: function (response) {
                    // console.log(response)
                    if(response.code==200){
                        // location.reload();
                    }  
                }
            })
        } else {
            $.ajax({
                type: 'post',
                data: {
                    id: id
                },
               url: 'http://localhost:8080/api/v1/admin/comment/pass',
                success: function (response) {
                    if(response.code==200){
                        // location.reload();
                    }  
                }
            })
        }
    }
});

//删除操作
$("#commentBox").on("click", ".delete", function () {
    if (confirm("您真的要执行删除操作吗")) {
        var id = $(this).attr("data-id");
        $.ajax({
            type: 'post',
            data:{
                id:id
            },
            url: 'http://localhost:8080/api/v1/admin/comment/delete',
            success: function () {
                location.reload();
            }
        })
    }
});
