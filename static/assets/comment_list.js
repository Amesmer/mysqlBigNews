$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/comment/search',
    success: function (response) {
        console.log(response)
        var html = template("commentTpl", response);
        // console.log(html)
        $("#commentBox").html(html);

        //总页数
        var total_pages = response.data.totalPage;
        changePage(1);
        $(".pagination").twbsPagination({
            totalPages: total_pages,
            visiblePages: 7,
            startPage: 1,
            first: "首页",
            last: "页尾",
            prev: "上一页",
            next: "下一页",
            onPageClick: function (e, page) {
                changePage(page);
            }
        })
    }
});

// 封装函数，实现分页
function changePage(page) {
    // 发送请求，获取文章列表数据
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/comment/search',
        data: {
            page: page
        },
        success: function (response) {
            // console.log(response);
            response.data.data.pages = response.data.totalPage;
            // console.log(page);
            var html = template("commentTpl", response);
            // console.log(html)
            $("#commentBox").html(html);
        }
    })
}



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
                    if (response.code == 200) {
                        location.reload();
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
                    if (response.code == 200) {
                        location.reload();
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
            data: {
                id: id
            },
            url: 'http://localhost:8080/api/v1/admin/comment/delete',
            success: function () {
                location.reload();
            }
        })
    }
});
