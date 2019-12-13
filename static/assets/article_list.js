// 发送请求，获取文章列表
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/article/query',
    success: function(response) {
        // console.log(response);
        // 拼接文章列表字符串
        var html=template('listTpl',{
            data:response.data.data
        });
        // console.log(html);
        $('#listBox').html(html);


        
    }
});

