// // 发送请求，获取文章列表
// $.ajax({
//     type: 'get',
//     url: 'http://localhost:8080/api/v1/admin/article/query',
//     success: function (response) {
//         console.log(response);
        // console.log(response.data.data.page);

        // // 拼接文章列表字符串
        // var html = template('listTpl', {
        //     data: response.data.data
        // });
        // // console.log(html);
        // $('#listBox').html(html);

        // var pageArr = [];
        // for (var i = 1; i <= response.data.totalPage; i++) {
        //     pageArr.push(i)
        // };

        // var page = template('pageTpl', {
        //     data: pageArr
        // });
        // $('#pageBox').html(page);


//     }
// });
// // 封装函数，实现分页
// function changePage(page) {
//     // 发送请求，获取文章列表数据
//     $.ajax({
//         type: 'get',
//         url: 'http://localhost:8080/api/v1/admin/article/query',
//         data: {
//             page: page
//         },
//         success: function (response) {
//             // response.data.data.currentPage=page;
//             // response.data.data.pages=response.data.totalPage;
//             console.log(response);
//             var html = template('listTpl', {
//                 data: response.data.data
//             });
//             $('#listBox').html(html);
//             // console.log(response);
//             var pageArr = [];
//             for (var i = 1; i <= response.data.totalPage; i++) {
//                 pageArr.push(i)
//             };
//             // console.log(pageArr);
//             var page = template('pageTpl', {
//                 data: pageArr,
//                 page: response.data.page
//             });
//             $('#pageBox').html(page);
//         }
//     })
// }

//     function changePage(page, displayPage) {
//         var page = page || 1;
//         var current_page = page;
//         var displayPage = displayPage || 6;
//         $.ajax({
//             type: 'get',
//             url: 'http://localhost:8080/api/v1/admin/comment/search',
//             data: {
//                 page: page
//             },
//             success: function (response) {
//                 response.pages = current_page;
//                 response.allPage = response.data.totalPage
//                 // response.displayPage=response.displayPage;
//                 var displays = [];
//                 var allPage = response.data.totalPage;
//                 if (response.pages < displayPage) {
//                     // displays = [1, 2, 3, 4, 5, 6]                
//                     for (var i = 1; i <= displayPage; i++) {
//                         displays.push(i);
//                     }
//                 } else if (response.pages > allPage - (displayPage / 2 - 1)) {
//                     // displays = [allPage-5, allPage-4, allPage-3, allPage-2, allPage-1, allPage];
//                     for (var i = 0; i < displayPage; i++) {
//                         displays.unshift(allPage - i);
//                     }
//                 } else {
//                     var i = displayPage / 2;
//                     // console.log(i)          
//                     // displays = [response.pages - i, response.pages - (i - 1), response.pages - (i - 2), response.pages, response.pages + (i - 2), response.pages + (i - 1)];                             
//                     for (var j = i; j >= 0; j--) {
//                         displays.push(response.pages - j);
//                     }
//                     // console.log(displays);               
//                     for (var k = 1; k < i; k++) {
//                         displays.push(response.pages + k)
//                     }
//                     // console.log(displays);               

//                 }
//                 response.display = displays;

//                 // 拼接列表模板
//                 var html = template('commentTpl', { data: response.data.data });
//                 $('#commentBox').html(html);
//                 // 拼接分页模板
//                 var page = template('pageTpl', { data: response.data.data });
//                 $('#pageBox').html(page);
//             }
//         })
//     }


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


// 获取分类
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/category/list',
    success: function (response) {
        // console.log(response);
        var html = template('classifyTpl', {
            data: response.data
        });
        $('#selCategory').html(html);

    }
});


// 为筛选表单注册提交事件
$('#selectForm').on('submit', function () {
    // alert('ok')
    // 一键获取表单项val值
    var formData = $(this).serialize();
    console.log(formData);
    // 发送请求
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/article/query',
        data: formData,
        success: function (response) {
            console.log(response);

            // 拼接文章列表字符串
            var html = template('listTpl', {
                data: response.data
            });
            // 渲染页面
            $('#listBox').html(html);

            // var page = [];
            // for (var i = 1; i <= response.totalPage; i++) {
            //     page.push(i);
            // }
            // var html = template('pageTpl', {
            //     data: page
            // });
            // $('#pageBox').html(html);

        }
    });
    // 阻止表单提交
    return false;
});


function initUserlogData() {
    //重置分页组件否则保留上次查询的，一般来说很多问题出现与这三行代码有关如：虽然数据正确但是页码不对仍然为上一次查询出的一致
    $('#pageBox').empty();
    $('#pageBox').removeData("twbs-pagination");
    $('#pageBox').unbind("page");
    //将页面的数据容器制空
    $("#listBox").empty();
    //设置默认当前页
    var pagenow = 1;
    //设置默认总页数
    var totalPage = 1;
    //设置默认可见页数
    var visiblecount = 5;
    //加载后台数据页面
    function loaddata() {
        $.ajax({
            url: "http://localhost:8080/api/v1/admin/article/query",
            type: "get",
            data: {
                "currentpage": pagenow
            },
            dataType: "json",
            success: function (data) {
                var htmlobj = "";
                totalPage = data.data.data.totalPage;//将后台数据复制给总页数
                totalcount = data.data.data.totalCount;//总数据
                var html=template('listTpl',{
                    data:data.data.data
                });
                $('#listBox').html(html);
                // $("#listBox").empty();
                $.each(data.userlog, function (index, userlog) {
                    htmlobj = htmlobj + "<tr>"
                        + "<td><input type='checkbox'/></td>" + "<td>"
                        + userlog.toUserName + "</td>" + "<td>"
                        + userlog.fromUserName + "</td>" + "<td>"
                        + userlog.createTime + "</td>" + "<td>"
                        + userlog.eventType + "</td>";
                    if (userlog.eventType == "LOCATION") {
                        htmlobj = htmlobj + "<td><button name=" + userlog.eventType
                            + " location='" + userlog.details + "' class='btn btn-danger btn-lg  btn-sm no-radius' data-toggle='modal' data-target='#myModal' οnclick='showmodal(this)' >"
                            + "<i class='glyphicon glyphicon-map-marker'>  LOCATION</i></button></td>";
                    } else {
                        htmlobj = htmlobj + "<td>" + userlog.details + "</td>";
                    };

                    htmlobj = htmlobj + "</tr>";

                    $("#userlogbody").append(htmlobj);
                    htmlobj = "";

                });
                //后台总页数与可见页数比较如果小于可见页数则可见页数设置为总页数，
                if (totalPage < visiblecount) {
                    visiblecount = totalPage;
                }
                $('#pagination-log').twbsPagination({
                    totalPages: totalPage,
                    visiblePages: visiblecount,
                    version: '1.1',
                    //页面点击时触发事件
                    onPageClick: function (event, page) {
                        // 将当前页数重置为page
                        pagenow = page
                        //调用后台获取数据函数加载点击的页码数据
                        loaddata();

                    }
                });

            },
            error: function (e) {
                alert("s数据访问失败")
            }

        });
    }
    //函数初始化是调用内部函数
    loaddata();
};
initUserlogData();