// alert('ok')
// 修改用户信息
$('#exampleInputFile').on('change', function () {
    var file = this.files[0];
    var imgURL = URL.createObjectURL(file);
    $('#preview').prop('src', imgURL);
    // $('#hiddenImg').val(imgURL);
});
$('#userForm').on('submit', function () {
    // alert('ok')  
    var formData = new FormData(this);
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/admin/user/edit',
        data: formData,
        processData: false,
        contentType: false,
        success: function (rep) {
            console.log(rep);
            
            location.reload();
        },
        error: function (error) {
            alert('修改失败')
        }
    })
    return false;

});
// 获取用户信息
$.ajax({
    typr: 'get',
    url: 'http://localhost:8080/api/v1/admin/user/detail',
    success: function (rep) {
        console.log(rep);
        $('.a1').val(rep.data.username);
        $('.a2').val(rep.data.nickname);
        $('.a3').val(rep.data.email);
        $('#preview').prop('src', rep.data.userPic);
        $('.a5').val(rep.data.password);
    }
})

