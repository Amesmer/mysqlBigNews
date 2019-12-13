//获取总文章数  日增数量
$.ajax({
   type: 'get',
   url: 'http://localhost:8000/admin/article_count',
   success: function (response) {
      // console.log(response);
      if (response.code == 200) {
         $('#articles-total').html(response.data.all_count);
         $('#articles-daily').html(response.data.day_count)
      }
   }
})


//评论数量
$.ajax({
   type: 'get',
   url: 'http://localhost:8000/admin/comment_count',
   success: function (response) {
      // console.log(response);
      if (response.code == 200) {
         $('#comments-total').html(response.data.all_count);
         $('#comments-daily').html(response.data.day_count)
      }
   }
})

// 16进制随机颜色
function getRandomColor() {
   var color = Math.floor(Math.random() * (0xffffff - 0 + 1)) + 0;
   var str= "#" + color.toString(16);
   return str;
}

//月新增文件数量
$.ajax({
   type: 'get',
   url: 'http://localhost:8000/admin/month_article_count',
   //成功后请求文章类型数量统计
   success: function (response) {
      $.ajax({
         type: 'get',
         url: 'http://localhost:8000/admin/article_category_count',
         success: function (rep_category) {
            //成功后请求月文章访问量
            $.ajax({
               type: 'get',
               url: 'http://localhost:8000/admin/article_category_visit',
               success: function (rep_visit) {
                  //月新增文件数  渲染数组修改
                  if (response.code == 200) {
                     var mylist = [];
                     for (var i = 0; i < response.data.length; i++) {
                        var temp = {};
                        temp.count = response.data[i].day_count;
                        temp.date = response.data[i].day;
                        mylist.push(temp)
                     }
                     //文章类型数据处理   分类name value 数据
                     var category_data = [];
                     //分类名称
                     var category_type = [];
                     //分类颜色
                     var category_color = [];
                     // console.log(rep_category);


                     for (var j = 0; j < rep_category.data.length; j++) {
                        //  文章类型数组
                        category_type.push(rep_category.data[j].type);
                        //文章数据
                        var temp = {};
                        temp.name = rep_category.data[j].type;
                        temp.value = rep_category.data[j].all_count;
                        category_data.push(temp);
                        //类型颜色获取  自执行函数利用闭包返回固定的数值
                        category_color.push((getRandomColor)())
                     }

                     // console.log(category_color);
                     // console.log(category_data);
                     // console.log(category_type);




                     //-------------------------------月新增文章数
                     var oChart = echarts.init($('#curve_show')[0]);
                     var aList_all = mylist;
                     let aCount = [];
                     let aDate = [];

                     for (var i = 0; i < aList_all.length; i++) {
                        aCount.push(aList_all[i].count);
                        aDate.push(aList_all[i].date);
                     }

                     var chartopt = {
                        title: {
                           text: '月新增文章数',
                           left: 'center',
                           top: '10'
                        },
                        tooltip: {
                           trigger: 'axis'
                        },
                        legend: {
                           data: ['新增文章'],
                           top: '40'
                        },
                        toolbox: {
                           show: true,
                           feature: {
                              mark: { show: true },
                              dataView: { show: true, readOnly: false },
                              magicType: { show: true, type: ['line', 'bar'] },
                              restore: { show: true },
                              saveAsImage: { show: true }
                           }
                        },
                        calculable: true,
                        xAxis: [
                           {
                              name: '日',
                              type: 'category',
                              boundaryGap: false,
                              data: aDate
                           }
                        ],
                        yAxis: [
                           {
                              name: '月新增文章数',
                              type: 'value'
                           }
                        ],
                        series: [
                           {
                              name: '新增文章',
                              type: 'line',
                              smooth: true,
                              itemStyle: { normal: { areaStyle: { type: 'default' }, color: '#f80' }, lineStyle: { color: '#f80' } },
                              data: aCount
                           }],
                        areaStyle: {
                           normal: {
                              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                 offset: 0,
                                 color: 'rgba(255,136,0,0.39)'
                              }, {
                                 offset: .34,
                                 color: 'rgba(255,180,0,0.25)'
                              }, {
                                 offset: 1,
                                 color: 'rgba(255,222,0,0.00)'
                              }])

                           }
                        },
                        grid: {
                           show: true,
                           x: 50,
                           x2: 50,
                           y: 80,
                           height: 220
                        }
                     };

                     oChart.setOption(chartopt);

                     //-----------------------文章分类数量比
                     var oPie = echarts.init($('#pie_show')[0]);
                     var oPieopt =
                     {
                        title: {
                           top: 10,
                           text: '分类文章数量比',
                           x: 'center'
                        },
                        tooltip: {
                           trigger: 'item',
                           formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        //   color  和 名称是对应的
                        color: category_color,
                        legend: {
                           x: 'center',
                           top: 65,
                           // 修改为type
                           data: category_type
                        },
                        toolbox: {
                           show: true,
                           x: 'center',
                           top: 35,
                           feature: {
                              mark: { show: true },
                              dataView: { show: true, readOnly: false },
                              magicType: {
                                 show: true,
                                 type: ['pie', 'funnel'],
                                 option: {
                                    funnel: {
                                       x: '25%',
                                       width: '50%',
                                       funnelAlign: 'left',
                                       max: 1548
                                    }
                                 }
                              },
                              restore: { show: true },
                              saveAsImage: { show: true }
                           }
                        },
                        calculable: true,
                        series: [
                           {
                              name: '访问来源',
                              type: 'pie',
                              radius: ['45%', '60%'],
                              center: ['50%', '65%'],
                              // 修改为data
                              data: category_data
                           }
                        ]
                     };
                     oPie.setOption(oPieopt);


                     //--------------------------------文章访问量
                     //月份数组
                     var month = [];
                     var arr_series = [];
                     //获取月份
                     for (var m = 0; m < rep_visit.data.length; m++) {
                        month.push(rep_visit.data[m].month);
                     }
                     // console.log(month);
                     // console.log(category_type);
                     
                  
                     //循环类型
                     for (var k = 0; k < category_type.length; k++) {
                        var obj_series = {};
                        var ser_data = []
                        obj_series.name = category_type[k];
                        obj_series.type = 'bar';
                        obj_series.barWidth = 50;
                        obj_series.itemStyle = { normal: { areaStyle: { type: 'default' }, color:category_color[k] } };
                        //获取这个类型下的数量
                        for (var n = 0; n < rep_visit.data.length; n++) {
                           for (var o = 0; o < category_type.length; o++) {
                              if (rep_visit.data[n].all_count[o].type == category_type[k]) {

                                 ser_data.push(rep_visit.data[n].all_count[o].count);
                              }
                           }

                        }
                        obj_series.data = ser_data;
                        arr_series.push(obj_series)
                     }
//-----------------------------------------------------------
                     // console.log(arr_series);

                     var oColumn = echarts.init($('#column_show')[0]);
                     var oColumnopt =
                     {
                        title: {
                           text: '文章访问量',
                           left: 'center',
                           top: '10'
                        },
                        tooltip: {
                           trigger: 'axis'
                        },
                        legend: {
                           data: category_type,
                           top: '40'
                        },
                        toolbox: {
                           show: true,
                           feature: {
                              mark: { show: true },
                              dataView: { show: true, readOnly: false },
                              magicType: { show: true, type: ['line', 'bar'] },
                              restore: { show: true },
                              saveAsImage: { show: true }
                           }
                        },
                        calculable: true,
                      
                        xAxis: [
                           {
                              type: 'category',
                              data: month
                           }
                        ],
                        yAxis : [
                           {
                               name : '访问量',
                               type : 'value'
                           }
                       ],
                       series: arr_series,
                        grid: {
                           show: true,
                           x: 50,
                           x2: 30,
                           y: 80,
                           height: 260
                        },
                        dataZoom: [//给x轴设置滚动条
                           {
                              start: 0,//默认为0
                              end: 100 - 1000 / 31,//默认为100
                              type: 'slider',
                              show: true,
                              xAxisIndex: [0],
                              handleSize: 0,//滑动条的 左右2个滑动条的大小
                              height: 8,//组件高度
                              left: 45, //左边的距离
                              right: 50,//右边的距离
                              bottom: 26,//右边的距离
                              handleColor: '#ddd',//h滑动图标的颜色
                              handleStyle: {
                                 borderColor: "#cacaca",
                                 borderWidth: "1",
                                 shadowBlur: 2,
                                 background: "#ddd",
                                 shadowColor: "#ddd",
                              }
                           }]
                     };
                     oColumn.setOption(oColumnopt);


                  }
               }
            })

         }
      })


   }
})
