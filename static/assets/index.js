// 用户退出
$('#logout').on('click',function(){
    // alert('ok')
    var isConfirm = confirm('您确定要退出吗?');
    if(isConfirm){
        window.localStorage.setItem('token','');
        location.href='login.html'
    }
});
$.ajax({
    typr: 'get',
    url: 'http://localhost:8080/api/v1/admin/user/detail',
    success: function (rep) {
        // console.log(rep);
        $('.a1').html(rep.data.username);
        $('.a2').val(rep.data.nickname);
        $('.a3').val(rep.data.email);
        $('#preview').prop('src', rep.data.userPic);
        $('.a5').val(rep.data.password);
    }
})
