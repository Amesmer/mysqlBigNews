// 发送请求，获取文章列表
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/article/query',
    success: function (response) {
        // console.log(response);
        // 拼接文章列表字符串
        var html = template('listTpl', {
            data: response.data.data
        });
        $('#listBox').html(html);

//总页数
   var total_pages=response.data.totalPage;
   
    changePage(1);
    $(".pagination").twbsPagination({
        totalPages: total_pages,
        visiblePages:5,
        startPage:1,
        first:"首页",
        last:"页尾",
        prev:"上一页",
        next:"下一页",
        onPageClick: function (e,page) {
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
        url: 'http://localhost:8080/api/v1/admin/article/query',
        data: {
            page: page
        },
        success: function (response) {
            // console.log(response);
            response.data.data.pages=response.data.totalPage;
            var html = template('listTpl', {
                data: response.data.data
            });
            $('#listBox').html(html);
            
        }
    })
}

