

$('#loginForm').on('submit',function(){
 var data=$(this).serialize();
 $.ajax({
     type:'post',
     url:'http://localhost:8080/api/v1/admin/user/login',
     data:data,
     success:function(result){
         window.localStorage.setItem('token',result.token);
         location.href='index.html';
     }
 })
 return false;
})