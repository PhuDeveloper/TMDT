$(document).ready(function () {
  //Xử lý click thanh navBar
  $(".themTx").click(function (e) {
    $(".themTaiXe").show();
    $(".phancalamviec").hide();
    $(".phanTuyen").hide();
  });
  $(".phanT").click(function (e) {
    $(".themTaiXe").hide();
    $(".phancalamviec").hide();
    $(".phanTuyen").show();
  });
  $(".phanCaLV").click(function (e) {
    $(".themTaiXe").hide();
    $(".phancalamviec").show();
    $(".phanTuyen").hide();
  });
});

let number;
var email;
const laymaXn = (e) => {
  email = $(".emailxacnhan").val().trim();
  var mail = JSON.stringify({ email: email });

  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5009/check-email",
    data: mail,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      if (res.result === true) {
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
const loadinfoparen = () => {
  var mail = JSON.stringify({ email: email });
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5009/get-info-parent",
    data: mail,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      $("#emailPH").val(res.email)
    },
  });
};
const xacnhanma = (e) => {
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
      
      if (res.result === true) {
        $(".dangki2").hide();
        $(".dangki1").hide();
        $(".dangki3").show();
      } else {
        alert("Mã xác nhận sai");
      }
    },
  });
};
$("#laymaxacnhan").click(laymaXn);
$(".btnXacnhan").click(xacnhanma,loadinfoparen);
// $("#taomoi").click();
