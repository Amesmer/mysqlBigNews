$.ajax({
    type:'get',
    url:'http://localhost:8080/api/v1/index/latest',
    success:function(rep){
        //  console.log(rep);
        var html = template('lastedTpl',{data:rep.data});

        // console.log(html);
        
        $('#lastedBox').html(html)
        
    }
})

//热点图
$.ajax({
    type:'get',
    url:'http://localhost:8080/api/v1/index/rank',
    success:function(rep){
         console.log(rep);
        // var html = template('lastedTpl',{data:rep.data});

        // // console.log(html);
        
        // $('#lastedBox').html(html)
        
    }
})

