$(document).ready(function () {});

var tentaiXe;

const handleClickBtnDangNhap = async() => {
  var tenDangNhap = $("#tenDangNhap").val().trim();
  var matKhauNv = $("#matKhauNv").val().trim();
  var tmp = { account: tenDangNhap, password: matKhauNv };
  var dangNhapNv = JSON.stringify(tmp);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/login-staff",
    data: dangNhapNv,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      if (res.result == true) {
        if (res.data[0].id_role == 1) {
          tentaiXe = res.data[0].last_name;

          localStorage.setItem("tentaixe", tentaiXe);
          localStorage.setItem("account", res.data[0].account);
          localStorage.setItem("id_staff", res.data[0].id_staff);
          localStorage.setItem("first_name", res.data[0].first_name);
          localStorage.setItem("last_name", res.data[0].last_name);
          localStorage.setItem("address", res.data[0].address);
          localStorage.setItem("phone_num", res.data[0].phone_num);
          localStorage.setItem("driver_license", res.data[0].driver_lisence);

          alert("Đăng nhập thành công");
          window.location = "taixe.html";
        } else if (res.data[0].id_role == 3) {
          alert("Đăng nhập thành công");
          localStorage.setItem("accountx", res.data[0].account);
          localStorage.setItem("id_staff", res.data[0].id_staff);
          localStorage.setItem("first_name", res.data[0].first_name);
          localStorage.setItem("last_name", res.data[0].last_name);
          localStorage.setItem("addressx", res.data[0].address);
    
          localStorage.setItem("phone_num", res.data[0].phone_num);
          localStorage.setItem("driver_license", res.data[0].driver_lisence);
          window.location = "admin.html";
        }
      } else {
        alert("Tên đăng nhâp hoặc mật khẩu sai  ");
      }
    },
  });
};
$("#btnDangNhapNv").click(handleClickBtnDangNhap);
