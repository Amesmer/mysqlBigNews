//新增文章类别
//给表单注册一个表单提交事件
$('#slugForm').on('submit', function () {
    var formData = $(this).serialize();
    //console.log(formData);
    $.ajax({
        url: 'http://localhost:8080/api/v1/admin/category/add',
        type: 'post',
        data: formData,
        success: function (response) {
            alert('增加成功')
            location.reload();
        }
    })
    return false;
})

//分类列表展示

$.ajax({
    url: 'http://localhost:8080/api/v1/admin/category/list',
    type: 'get',
    success: function (response) {
        //准备模板
        //字符串拼接
        var html = template('slugTpl', response)
        $('#slugBox').html(html);
    }

})




//分类删除
//给删除按钮注册点击事件--事件委托
$('#slugBox').on('click', '.delete', function () {
    //获取当前点击按钮的id
    var id = $(this).attr('data-id');
    if (confirm('您确定要删除吗?')) {

        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/category/delete',
            data: {
                id: id
            },
            success: function (response) {

                location.reload();
                alert('删除成功')
            }
        })
    }
})


//编辑分类
//给编辑按钮注册点击事件--事件委托
$('#slugBox').on('click', '.edit', function () {
    //获取对应的id
    var id = $(this).attr('data-id');
    //发送请求根据id获取文章数据
    $.ajax({
        url: 'http://localhost:8080/api/v1/admin/category/search',
        type: 'get',
        data: {
            id: id
        },
        success: function (response) {
            // console.log(response);
            //准备模板引擎
            //拼接字符串
            var html = template('changeTpl', { data: response.data[0] })

            //渲染页面
            $('#changeBox').html(html);

        }
    })

})


//给修改好的表单注册一个提交事件--事件委托
$('#changeBox').on('submit', '#slugForm', function () {
    //alert(1);
    //一键收集表单内容
    var recipient_name = $('#recipient-name').val();
    var recipient_slug = $('#recipient-slug').val();
    var id = $(this).attr('data-id')
    //console.log(id);

    $.ajax({
        url: 'http://localhost:8080/api/v1/admin/category/search',
        type: 'get',
        data: {
            id: id,
            name: recipient_name,
            slug: recipient_slug
        },
        success: function (response) {
            $.ajax({
                url: 'http://localhost:8080/api/v1/admin/category/edit',
                type: 'post',
                data: {
                    id: id,
                    name: recipient_name,
                    slug: recipient_slug
                },
                success: function (response) {
                    location.reload();
                }
            })
        }
    })
    return false;
})






