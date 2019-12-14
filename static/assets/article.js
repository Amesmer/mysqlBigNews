//从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
    //substr 从1下标截取到最后
    //split    
    //location.search获取地址栏参数 ?id=12313412
    var parmsAry = location.search.substr(1).split('&');
    for (var i = 0; i < parmsAry.length; i++) {
        temp = parmsAry[i].split('=')
        if (temp[0] == name) {
            return temp[1];
        };
    }
    return -1;
}
// 文章详情类
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/article',
    data: {
        id: getUrlParams("id")
    },
    success: function (response) {
        // console.log(response)l
        var html = template("articleTpl", response);
        // console.log(html)
        $("#mainBox").html(html)

    }
});

//评论展示
$.ajax({
    type:'get',
    url:'http://localhost:8080/api/v1/index/get_comment',
    data:{
        articleId:getUrlParams("id")
    },
    success:function(response){
        console.log(response)
        var html=template("tBox",response);
        // console.log(html)
        $("#commentBox").html(html)
    }
})


// 发表评论
$("#Formaction").on("click","#Plan" ,function () {
    var author = $(".comment_name").val();
    var content = $(".comment_input").val();
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/index/post_comment',
        data: {
            author: author,
            content: content,
            articleId:  getUrlParams("id"),
        },
        success: function (response) {
           location.reload()
        }
    });
    return false
})

