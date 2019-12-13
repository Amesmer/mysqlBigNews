

$('#loginForm').on('submit',function(){
 var data=$(this).serialize();
 $.ajax({
     type:'post',
     url:'http://localhost:8080/api/v1/admin/user/login',
     data:data,
     success:function(result){
        //  console.log(result);
        if (result.msg==='登录成功'){
            window.localStorage.setItem('token',result.token);
            location.href='/admin/index.html';
        } else{
        alert(result.msg)
     }
     }
 })
 return false;
})