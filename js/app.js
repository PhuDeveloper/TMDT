$(document).ready(function () {
  //Xử lý click thanh navBar
});

let number;
var email;
const laymaXn = async (e) => {
  email = $(".emailxacnhan").val().trim();
  var mail = JSON.stringify({ email: email });

  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5009/check-email",
    data: mail,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      console.log(res);
      if (res.result == true) {
        $(".dangki2").show();
        $(".dangki1").hide();
        $(".dangki3").hide();
        alert("Vui lòng nhập mã xác nhận được gửi về mail của bạn");
        number = res.data.verify_number;
      } else {
        alert("Email của bạn ko có trong cơ sở dữ liệu vui lòng nhập lại!!");
      }
    },
  });
};
const loadInfoParen = async () => {
  var mail = JSON.stringify({ email: email });
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5009/get-info-parent",
    data: mail,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      console.log(res[0]);
      $("#emailPH").val(res[0].email);
      $("#hoPH").val(res[0].last_name);
      $("#tenPH").val(res[0].first_name);
      $("#diachiPH").val(res[0].address);
      $("#sdtPH").val(res[0].phone_num);
    },
  });
};
const xacnhanma = async (e) => {
  var manhapvao = $("#phuhuynhnhap").val().trim();
  var magoc = number;
  console.log(manhapvao);
  console.log(magoc);
  var tmp = {
    verify_number_input: manhapvao,
    verify_number_session: String(magoc),
  };
  var xacnhan = JSON.stringify(tmp);
  console.log(xacnhan);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5009/check-verify-number",
    data: xacnhan,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      if (res.result == true) {
        loadInfoParen();
        $(".dangki2").hide();
        $(".dangki1").hide();
        $(".dangki3").show();
      } else {
        alert("Mã xác nhận sai");
      }
    },
  });
};
const layDanhSachCon = () => {};
const taoMoiTaikhoan = () => {
  var emailTmp = $(".emailxacnhan").val();
  var data = JSON.stringify({ email: emailTmp });
  console.log(data);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5009/get-list-student",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      var email = $("#emailPH").val();
      var phone_num = $("#sdtPH").val();
      var first_name = $("#hoPH").val();
      var last_name = $("#tenPH").val();
      var address = $("#diachiPH").val();
      var password = $("#mk1PH").val();
      var listStudent = res;
      console.log(listStudent);
      var tmp = {
        email: email,
        phone_num: phone_num,
        first_name: first_name,
        last_name: last_name,
        address: address,
        password: password,
        list_student: listStudent,
      };
      var data = JSON.stringify(tmp);
      console.log(data);
      setTimeout(() => {
        $.ajax({
          type: "POST",
          url: "http://127.0.0.1:5000/register-parent",
          data: data,
          dataType: "json",
          contentType: "application/json",
          success: function async(res) {
            if (res.result == true) {
              alert("Tạo tài khoản thành công");
              window.location = "dangNhap.html";
            } else {
              alert("Tạo tài khoản thất bại");
            }
          },
        });
      }, 2000);
    },
  });

  console.log(layDanhSachCon());
};
$("#laymaxacnhan").click(laymaXn);
$(".btnXacnhan").click(xacnhanma);
// $("#taomoi").click();
$("#taomoi").click(taoMoiTaikhoan);
