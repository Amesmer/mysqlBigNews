// 发送请求，获取热门推荐
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/rank',
    success: function (response) {
        // console.log(response);

        var hotTpl = `
        {{each data}}
        <li><span class="{{$index==0 ? 'first' : ''}}{{$index==1?'second':''}}{{$index==2?'third':''}}">{{$index+1}}</span><a href="#">{{$value.title}}</a></li>
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
            <b><em>{{$value.author}}</em>9个月前({{$value.date.substr(5)}})说:</b>
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
        <li><a href="#">{{$value.intro}}</a></li>
        {{/each}}
        `;
        var html = template.render(focusTpl, { data: response.data });
        $('#focusBox').html(html)
    }
});



// 给搜索按钮注册点击事件
$('.search_btn').on('click', function () {
    // 获取input框的val值
    var key = $('.search_txt').val();
    // console.log(key);
    // 发送请求，文章搜索
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/index/search',
        data:{
            key:key
        },
        success: function (response) {
            // console.log(response.data);
            // location.href="/list.html";
            var listTpl=`
            {{each data}}
            <div class="common_news_list">
            <a href="#" class="list_pic"><img src="{{$value.cover}}" alt=""></a>
            <h4><a href="#">{{$value.title}}</a></h4>
            <p>{{$value.content}}</p>
            <div class="new_info">
              <span>标签：财经&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<i class="fa fa-eye"></i>&nbsp;阅读( {{$value.read}}
                )&nbsp;&nbsp;&nbsp;<i class="fa fa-commenting"></i>&nbsp;评论({{$value.comments}} )</span>
              <b>发布于 {{$value.date}}</b>
            </div>
          </div>    
          {{/each}}
            `;
            var html = template.render(listTpl, { data: response.data.data });
            // console.log(html);
            
            $('#lsitSearchBox').html(html)
    
        }
    });

});


// 封装函数，计算时间
function logDate(data){
    // 发送请求，获取评论时间
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/index/latest_comment',
        success:function(response){
            console.log(response.data.date);
            
        }
    })
}


