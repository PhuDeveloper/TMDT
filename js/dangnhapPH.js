$(document).ready(function () {});
const handleClickBtnDangNhapPH = async() => {
  var emailPH = $("#emailPH").val().trim();
  var matkhauPH = $("#matkhauPH").val().trim();
  var tmp = { email: emailPH, password: matkhauPH };
  var dangnhapPH = JSON.stringify(tmp);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/login-parent",
    data: dangnhapPH,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      if (res.result == true) {
        localStorage.setItem("emailPhuHuynh", res.data[0].email);
        localStorage.setItem("idPhuHuynh", res.data[0].id_parent);
        
        localStorage.setItem("sdtPhuHuynh", res.data[0].phone_num);
        localStorage.setItem("hoPhuHuynh", res.data[0].first_name);
        localStorage.setItem("tenPhuHuynh", res.data[0].last_name);
        localStorage.setItem("diaChiPhuHuynh", res.data[0].address);
        alert(res.info)
        window.location = "phuhuynh.html";
      } else {
        alert("tên đăng nhập hoặc tài khoản sai");
      }
    },
  });
};
$("#btnDangNhapPH").click(handleClickBtnDangNhapPH);
