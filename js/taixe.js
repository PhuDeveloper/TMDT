$(document).ready(function () {
  $(".taiXeClick").click(function(){
    $(".menux").slideToggle("slow");
  })
  $("#tenTaiXe").text(localStorage.getItem("tentaixe"));
  $("#accountt").val(localStorage.getItem("account"));
  loadLichLamCuaTaiXe();
});
$(".lichLamViec").click(function (e) {
  $("#lichlamviec").show();
  $("#thongTinCaNhan").hide();
  $("#doiMatKhau").hide();
});
$(".thongTinCaNhan").click(function (e) {
  loadThongTinTaiXe()
  $("#lichlamviec").hide();
  $("#thongTinCaNhan").show();
  $("#doiMatKhau").hide();
});
$(".doiMatKhau").click(function (e) {
  $("#lichlamviec").hide();
  $("#thongTinCaNhan").hide();
  $("#doiMatKhau").show();
});
const doiMatKhauNv = async() => {
  if ($("#new_password").val() == $("#new_password1").val()) {
    var account = localStorage.getItem("account");

    var oldPassword = $("#old_password").val().trim();
    var newPassword = $("#new_password").val().trim();
    var tmp = {
      account: account,
      old_password: oldPassword,
      new_password: newPassword,
    };

    var doiMatKhauTaiXe = JSON.stringify(tmp);

    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5000/change-password-staff",
      data: doiMatKhauTaiXe,
      dataType: "json",
      contentType: "application/json",
      success: function (res) {
        if (res.result == true) {
          
          $("#old_password").val("");
          $("#new_password").val("");
          $("#new_password1").val("");
          alert(res.info);
        } else {
          
          $("#old_password").val("");
          $("#new_password").val("");
          $("#new_password1").val("");
          alert(res.info);
        }
      },
    });
  } else {
    $("#new_password").val("");
    $("#new_password1").val("");
    alert("Mật khẩu mới không trùng nhau");
  }
};
$("#btnTaiXeDoiMatkhau").click(doiMatKhauNv);
const loadThongTinTaiXe = () => {
  var idTX = localStorage.getItem("id_staff");
  var tmp = { id_staff: idTX };
  var data = JSON.stringify(tmp);
  console.log(data);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/get-staff-info-by-id",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      console.log(res)
      $("#idStaff").val(res[0].account);
      $("#firstName").val(res[0].first_name);
      $("#lastName").val(res[0].last_name);
      $("#addressx").val(res[0].address);
      $("#phoneNum").val(res[0].phone_num);
      $("#driverLicense").val(res[0].driver_lisence);
    },
  });
};
const capNhatThongTinTaiXe = () => {
  var idStaff = localStorage.getItem("id_staff");
  var firstName = $("#firstName").val();
  var lastName = $("#lastName").val();
  var address = $("#addressx").val();
  var phoneNum = $("#phoneNum").val();
  var driverLicense = $("#driverLicense").val();
  var tmp = {
    id_staff: idStaff,
    first_name: firstName,
    last_name: lastName,
    address: address,
    phone_num: phoneNum,
    driver_license: driverLicense,
  };
  var data = JSON.stringify(tmp);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/update-staff-info",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function async(res) {
      if(res.result==true){
        alert("Đổi thông tin thành công!!");

      }
      else{
        alert("Đổi thông tin thất bại!!");

      }
    },
  });
};
$("#btnTxCapNhatThongTin").click(capNhatThongTinTaiXe)
const loadLichLamCuaTaiXe=()=>{
  var idTX = localStorage.getItem("id_staff");
  var tmp={id_staff:idTX}
  var data=JSON.stringify(tmp)
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/get_list_work_date_by_driver",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      console.log(res)
      
    },
  });
}