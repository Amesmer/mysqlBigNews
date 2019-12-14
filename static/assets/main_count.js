//获取总文章数  日增数量  评论总数  日增评论
$.ajax({
   type: 'get',
   url: 'http://localhost:8080/api/v1/admin/data/info',
   success: function (response) {
      // console.log(response);
      $('#articles-total').html(response.totalArticle);
      $('#articles-daily').html(response.dayArticle)
      $('#comments-total').html(response.totalComment);
      $('#comments-daily').html(response.dayComment)

   }
})




// 16进制随机颜色
function getRandomColor() {
   var color = Math.floor(Math.random() * (0xffffff - 0 + 1)) + 0;
   var str = "#" + color.toString(16);
   return str;
}


//第二个图分类
$.ajax({
   type: 'get',
   url: 'http://localhost:8080/api/v1/admin/data/category',
   success: function (rep_category) {

      //第三个图访问量
      $.ajax({
         type: 'get',
         url: 'http://localhost:8080/api/v1/admin/data/visit',
         success: function (rep_visit) {
            // console.log(rep_visit);
            // console.log(rep_category);


            //文章类型数据处理   分类name value 数据
            var category_data = [];
            //分类名称
            var category_type = [];
            //分类颜色
            var category_color = [];
            // console.log(rep_category);
            for (var j = 0; j < rep_category.date.length; j++) {
               //  文章类型数组
               category_type.push(rep_category.date[j].name);
               // //文章数据
               var temp = {};
               temp.name = rep_category.date[j].name;
               temp.value = rep_category.date[j].articles;
               category_data.push(temp);
               //类型颜色获取  自执行函数利用闭包返回固定的数值
               category_color.push((getRandomColor)())
            }

            // console.log(category_color);
            // console.log(category_data);
            // console.log(category_type);

                     //--------------------------------文章访问量
                     //日期份数组
                     var datelist = [];
                     var arr_series = [];
                     //获取日期
                     for(var m in rep_visit.data){
                        datelist.push(m)
                     }
                     console.log(datelist);
                     // console.log(category_type);
      /*                {
                        name: '爱旅行',
                        type: 'bar',
                        barWidth: 20,
                        itemStyle: {
                          normal: {
                            areaStyle: {
                              type: 'default'
                            },
                            color: '#13cfd5'
                          }
                        },
                        data: [500, 668, 520, 790, 900]
                      }, */
                     //循环类型
                     for (var k = 0; k <category_type.length; k++) {
                        var obj_series = {};
                        var ser_data = []
                        obj_series.name = category_type[k];
                        obj_series.type = 'bar';
                        obj_series.barWidth = 20;
                        obj_series.itemStyle = { normal: { areaStyle: { type: 'default' }, color:category_color[k] } };
                       // 获取这个类型下的数量
                       
                           for (var o = 0; o < datelist.length; o++) {
                                 ser_data.push(rep_visit.data[datelist[o]]);
                           }
                      
                        obj_series.data = ser_data;
                        arr_series.push(obj_series)
                      }
                     
                     // console.log(arr_series);
                     
//-----------------------------------------------------------
            //----------------------------------------------------2图
            var oPie = echarts.init(document.getElementById('pie_show'));
            var oPieopt = {
               title: {
                  top: 10,
                  text: '分类文章数量比',
                  x: 'center'
               },
               tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
               },
               color: category_color,
               legend: {
                  x: 'center',
                  top: 65,
                  data: category_type
               },
               toolbox: {
                  show: true,
                  x: 'center',
                  top: 35,
                  feature: {
                     mark: {
                        show: true
                     },
                     dataView: {
                        show: true,
                        readOnly: false
                     },
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
                     restore: {
                        show: true
                     },
                     saveAsImage: {
                        show: true
                     }
                  }
               },
               calculable: true,
               series: [{
                  name: '访问来源',
                  type: 'pie',
                  radius: ['45%', '60%'],
                  center: ['50%', '65%'],
                  data: category_data
               }]
            };
            oPie.setOption(oPieopt);


            //------------------------------------------3图
            var oColumn = echarts.init($('#column_show')[0]);
            var oColumnopt = {
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
                     mark: {
                        show: true
                     },
                     dataView: {
                        show: true,
                        readOnly: false
                     },
                     magicType: {
                        show: true,
                        type: ['line', 'bar']
                     },
                     restore: {
                        show: true
                     },
                     saveAsImage: {
                        show: true
                     }
                  }
               },
               calculable: true,
               xAxis: [{
                  type: 'category',
                  data: datelist
               }],
               yAxis: [{
                  name: '访问量',
                  type: 'value'
               }],
               series: arr_series,
               grid: {
                  show: true,
                  x: 50,
                  x2: 30,
                  y: 80,
                  height: 260
               },
               dataZoom: [ //给x轴设置滚动条
                  {
                     start: 0, //默认为0
                     end: 100 - 1000 / 31, //默认为100
                     type: 'slider',
                     show: true,
                     xAxisIndex: [0],
                     handleSize: 0, //滑动条的 左右2个滑动条的大小
                     height: 8, //组件高度
                     left: 45, //左边的距离
                     right: 50, //右边的距离
                     bottom: 26, //右边的距离
                     handleColor: '#ddd', //h滑动图标的颜色
                     handleStyle: {
                        borderColor: "#cacaca",
                        borderWidth: "1",
                        shadowBlur: 2,
                        background: "#ddd",
                        shadowColor: "#ddd",
                     }
                  }
               ]
            };
            oColumn.setOption(oColumnopt)

         }
      })

   }
})

var oChart = echarts.init(document.getElementById('curve_show'));
//页面一进来就发送ajax请求,获取真实的月新增文章数
$.ajax({
   type: 'get',
   url: 'http://localhost:8080/api/v1/admin/data/article',
   success: function (backData) {
      //   console.log(backData);

      if (backData.code == 200) {
         let aCount = [];
         let aDate = [];

         for (var i = 0; i < backData.date.length; i++) {
            aCount.push(backData.date[i].count);
            aDate.push(backData.date[i].date);
         }

         //设置配置项, 调用方法
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
                  mark: {
                     show: true
                  },
                  dataView: {
                     show: true,
                     readOnly: false
                  },
                  magicType: {
                     show: true,
                     type: ['line', 'bar']
                  },
                  restore: {
                     show: true
                  },
                  saveAsImage: {
                     show: true
                  }
               }
            },
            calculable: true,
            xAxis: [{
               name: '日',
               type: 'category',
               boundaryGap: false,
               data: aDate
            }],
            yAxis: [{
               name: '月新增文章数',
               type: 'value'
            }],
            series: [{
               name: '新增文章',
               type: 'line',
               smooth: true,
               itemStyle: {
                  normal: {
                     areaStyle: {
                        type: 'default'
                     },
                     color: '#f80'
                  },
                  lineStyle: {
                     color: '#f80'
                  }
               },
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

      }
   }
});

