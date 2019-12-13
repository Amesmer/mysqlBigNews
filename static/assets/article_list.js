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
        // console.log(html);
        $('#listBox').html(html);

        var pageArr = [];
        for (var i = 1; i <= response.data.totalPage; i++) {
            pageArr.push(i)
        };
        // console.log(pageArr);
        var page = template('pageTpl', {
            data: pageArr
        });
        $('#pageBox').html(page);


    }
});


// 封装函数，实现分页
function changePage(page) {
    console.log(page+"---------------");
    
    // 发送请求，获取文章列表数据
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/article/query',
        data: {
            page: page
        },
        success: function (response) {
            console.log(response);
            response.data.data.pages=response.data.totalPage;
            // console.log(page);
            var html = template('listTpl', {
                data: response.data.data
            });
            $('#listBox').html(html);
            console.log(response);

        }
    })
}