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
        var total_pages = response.data.totalPage;

        changePage(1);
        $(".pagination").twbsPagination({
            totalPages: total_pages,
            visiblePages: 5,
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
        url: 'http://localhost:8080/api/v1/admin/article/query',
        data: {
            page: page
        },
        success: function (response) {
            // console.log(response);
            response.data.data.pages = response.data.totalPage;
            // console.log(page);
            var html = template('listTpl', {
                data: response.data.data
            });
            $('#listBox').html(html);

        }
    })
}



// 通过事件委托，给删除按钮注册点击事件
$('#listBox').on('click', '.delete', function () {
    var id = $(this).attr('data-id');
    // console.log(id);

    if (confirm("您确定要进行删除操作吗？")) {
        // 发送请求
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/article/delete',
            data: {
                id: id
            },
            success: function () {
                location.reload();
            }
        })
    }
});


// 发送请求，获取类别
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/category/list',
    success: function (response) {
        // console.log(response.data );
        var html = template('classifyTpl', {
            data: response.data
        });
        // console.log(html);
        $('#selCategory').html(html);


    }
});


// 给筛选表单注册提交事件
$('#selectForm').on('submit', function () {
    //判断val值
    var arr = [];
    if ($('#selCategory').val() != -1) {
        arr.push('type=' + $('#selCategory').val());
    }
    if ($('#selStatus').val() != -1) {
        arr.push('state=' + $('#selStatus').val());
    }
    // console.log(arr.join('&'));
  // 发送请求
  $.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/article/query',
    data: arr.join('&'),
    success: function (response) {
        // console.log(response);
      
        // 拼接文章列表字符串
        var html = template('listTpl', {
            data: response.data.data
        });
        $('#listBox').html(html);

        //总页数
        var total_pages = response.data.totalPage;
        
        $("#pageBox").remove();
        $("#page_container").append('<ul class="pagination pagination-sm" id="pageBox"></ul>');
        // changePage(1);
        $(".pagination").twbsPagination({
            totalPages: total_pages,
            visiblePages: 5,
            startPage: 1,
            first: "首页",
            last: "页尾",
            prev: "上一页",
            next: "下一页",
            onPageClick: function (e, page) {
                changeselect(page,arr.join('&'));
            }
        })
    }
})
    // 阻止表单跳转
    return false;
})


// 搜索内容改变页数
function changeselect(page,data) {
    // 发送请求
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/article/query',
        data: data+"&page="+page,
        success: function (response) {
            console.log(response);
            // 拼接文章列表字符串
            var html = template('listTpl', {
                data: response.data.data
            });
            $('#listBox').html(html);
        }
    })
    // 阻止表单跳转
}