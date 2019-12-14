 //获取浏览器地址栏中用户输入的关键字
 var key = getUrlParams('key');
 console.log(key);
 // console.log(key);
 // 发送请求，文章搜索
 $.ajax({
     type: 'get',
     url: 'http://localhost:8080/api/v1/index/search',
     data:{
         key:key
     },
     success: function (response) {
        //  console.log(response);
         var html = template('listSearchTpl', { data: response.data.data });
         console.log(html);
         
         $('#lsitSearchBox').html(html)
 
     }
 });