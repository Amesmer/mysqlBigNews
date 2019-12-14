// alert('ok')
$.ajax({
    type:'get',
    url:'http://localhost:8080/api/v1/index/category',
    success:function(rep){
        // console.log(rep);
        // console.log(navTpl);
        var html = template('navTpl', {data:rep.data});
        // console.log(html);
        
        $('#navBox').html(html);
        $('#nnavBox').html(html)
        
    }
});
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
$.ajax({
  type:'get',
  url:'http://localhost:8080/api/v1/index/latest',
  success:function(rep){
       console.log(rep);
      var html = template('lastedTpl',{data:rep.data});

      // console.log(html);
      
      $('#lastedBox').html(html)
      
  }
});
// $.ajax({
//   type:'get',
//   url:'http://localhost:8080/api/v1/index/search',
//   data:type,
//   success:function(rep){
//     console.log(rep);
    
//   }
// })
$('#nnavBox').on('click','li',function(){
  alert('ok')
});
$('#navBox').on('click','li',function(){
  alert('ok')
})



