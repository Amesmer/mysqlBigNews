

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
};



//获取参数id
$.ajax({
  type: 'get',
  url: 'http://localhost:8080/api/v1/index/search',
  data: { type: getUrlParams('type') },
  success: function (response) {
    console.log(response);
    $('#category_title').html(response.data.data[0].category)
    var html = template("listTpl", response.data);
    // var html = template.("listTpl", { data: response.data });
    $('#listBox').html(html)

    var total_pages = Math.ceil(response.data.totalCount / 6);

    $("#pageBox").twbsPagination({
      totalPages: total_pages,
      visiblePages: 5,
      startPage: 1,
      first: "首页",
      last: "页尾",
      prev: "上一页",
      next: "下一页",
      onPageClick: function (e, page) {
        changePage(page, getUrlParams('type'));
      }
    })

  }
})


// 搜索内容改变页数
function changePage(page, data) {
  // 发送请求
  $.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/search',
    data: {
      type: data,
      page:page
    },
    success: function (response) {
      console.log(response);
      $('#category_title').html(response.data.data[0].category)
      var html = template("listTpl", response.data);
      // var html = template.("listTpl", { data: response.data });
      $('#listBox').html(html)
    }
  })
  // 阻止表单跳转
}




