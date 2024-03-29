// 发送请求，获取热门推荐
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/rank',
    success: function (response) {
        // console.log(response);

        var hotTpl = `
        {{each data}}
        <li><span class="{{$index==0 ? 'first' : ''}}{{$index==1?'second':''}}
        {{$index==2?'third':''}}">{{$index+1}}</span>
        <a href="/article.html?id={{$value.id}}">{{$value.title}}</a></li>
        {{/each}}
        `;
        var html = template.render(hotTpl, { data: response.data });
        $('#hotBox').html(html)

    }
});


// 发送请求，获取最新评论
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/latest_comment',
    success: function (response) {
        // console.log(response);
        var commentesTpl = `
        {{each data}}
        <li>
            <span>{{$value.author.substr(0,1)}}</span>
            <b><em>{{$value.author}}</em>4个月前({{$value.date.substr(5)}})说:</b>
            <strong>{{$value.intro}}</strong>
         </li>
        {{/each}}
        `;
        var html = template.render(commentesTpl, { data: response.data });
        $('#commentsBox').html(html)
    }
});


// 发送请求，获取焦点关注
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/attention',
    success: function (response) {
        // console.log(response);
        var focusTpl = `
        {{each data}}
        <li><a href="/article.html?id={{$value.id}}">{{$value.intro}}</a></li>
        {{/each}}
        `;
        var html = template.render(focusTpl, { data: response.data });
        $('#focusBox').html(html)
    }
});



// 给搜索按钮注册点击事件
$('.search_btn').on('click', function () {
    // 获取input框的val值
    var keys = $('.search_txt').val();
    // console.log(keys);
    location.href = '/search.html?key=' + keys;

});
// 给搜索框注册键盘事件
$('#search_txt').on('keyup', function (event) {
    if (event.keyCode == 13) {
        // 获取input框的val值
        var keys = $('.search_txt').val();
        // console.log(keys);
        location.href = '/search.html?key=' + keys;

    }

});



// 封装一个函数，用于从浏览器的地址栏中获取指定的参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    // 参数不存在，则返回-1
    return -1;
}


// 发送请求，获取分类
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/category',
    success: function (response) {
        // console.log(response);
        var level_twoTpl = `
        {{each data}}
        <li><a href="http://localhost:8080/list.html?type={{$value.id}}" data-id={{$value.id}}>{{$value.name}}</a></li>
        {{/each}}
        `;
        var html = template.render(level_twoTpl, { data: response.data });
        $('#level_two').html(html);

        var left_menuTpl = `
        {{each data}}
        <li><a href="http://localhost:8080/list.html?type={{$value.id}}" data-id={{$value.id}}>{{$value.name}}</a></li>
        {{/each}}
        `;
        var html = template.render(left_menuTpl, { data: response.data });
        $('#left_menu').html(html);

    }
})



