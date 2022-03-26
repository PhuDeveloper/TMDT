$(document).ready(function () {
  nhanDanhSachXeBusTheoNgay();
  $(".adminClick").click(function () {
    $(".menux").slideToggle("slow");
  });
  loadDanhSachTaiXe();
  $("#accountt").val(localStorage.getItem("accountx"));
  $(".quanLyTaiXe").click(function async(e) {
    $("#quanLyTaiXe").show();
    $("#phanTuyenBus").hide();
    $("#quanLyCaLamViec").hide();
    $("#doiThongTinMatKhau").hide();
    $("#doiThongTinCaNhan").hide();
  });
  $(".phanTuyenBus").click(function async(e) {
    $("#quanLyTaiXe").hide();
    $("#phanTuyenBus").show();
    $("#quanLyCaLamViec").hide();
    $("#doiThongTinMatKhau").hide();
    $("#doiThongTinCaNhan").hide();
  });
  $(".quanLyCaLamViec").click(function async(e) {
    $("#quanLyTaiXe").hide();
    $("#phanTuyenBus").hide();
    $("#quanLyCaLamViec").show();
    $("#doiThongTinMatKhau").hide();
    $("#doiThongTinCaNhan").hide();
  });
  $(".doiThongTinMatKhau").click(function async(e) {
    $("#quanLyTaiXe").hide();
    $("#phanTuyenBus").hide();
    $("#quanLyCaLamViec").hide();
    $("#doiThongTinMatKhau").show();
    $("#doiThongTinCaNhan").hide();
  });
  $(".doiThongTinCaNhan").click(function async(e) {
    loadThongTinAd();
    $("#quanLyTaiXe").hide();
    $("#phanTuyenBus").hide();
    $("#quanLyCaLamViec").hide();
    $("#doiThongTinMatKhau").hide();
    $("#doiThongTinCaNhan").show();
  });
});
$("#btnThemTaiXe").click(function async(e) {
  var account = $("#account").val();
  var firstName = $("#first_name").val();
  var lastName = $("#last_name").val();
  var address = $("#address").val();
  var password = $("#password").val();
  var phoneNum = $("#phone_num").val();
  var email = $("#email").val();
  var dateOfBirth = $("#date_of_birth").val();
  var idRole = $("#id_role").find(":selected").val();
  var driverLicense = $("#driver_license").val();
  var tmp = {
    account: account,
    first_name: firstName,
    last_name: lastName,
    address: address,
    password: password,
    phone_num: phoneNum,
    email: email,
    date_of_birth: dateOfBirth,
    id_role: idRole,
    driver_license: idRole,
  };
  var data = JSON.stringify(tmp);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/insert-staff",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function async(res) {
      if (res.result == true) {
        alert(res.info);
        loadDanhSachTaiXe();
        $("#account").val("");
        $("#first_name").val("");
        $("#last_name").val("");
        $("#address").val("");
        $("#password").val("");
        $("#phone_num").val("");
        $("#email").val("");
        $("#date_of_birth").val("");
        $("#driver_license").val("");
      } else {
        alert(res.info);
      }
    },
  });
});
const loadDanhSachTaiXe = async () => {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:5000/get-list-staff",

    success: function (res) {
      $(".danhSachNhanVien").empty();
      $.each(res, function (index, item) {
        if (item.id_role == 1) {
          let tr = '<tr idTaiXe="' + item.id_staff + '">';
          // tr += "<td>" + item.id_staff + "</td>";
          tr += "<td>" + item.account + "</td>";
          tr += "<td>" + item.first_name + "</td>";
          tr += "<td>" + item.last_name + "</td>";
          tr += "<td>" + item.phone_num + "</td>";
          tr += "<td>";
          tr +=
            '<i name="xoaTaiXe" id="font" data-bs-toggle="modal"  data-bs-target="#exampleModalx" class="fa-solid fa-trash-can"></i>';
          tr += '<i name="suaTaiXe" id="font" class="fa-solid fa-pen"></i>';
          tr += "</tr>";
          $(".danhSachNhanVien").append(tr);
        }
      });
    },
  });
};
var IDTX;
$(document).on("click", "i[name='xoaTaiXe']", function () {
  IDTX = $(this).closest("tr").attr("idTaiXe");
  //  console.log(IDTX)
});
$(document).on("click", "button[name='dongYXoaNhanVien']", function () {
  var tmp = { staff_id: IDTX };
  var id_staff = JSON.stringify(tmp);

  $.ajax({
    url: "http://127.0.0.1:5000/delete-staff",
    type: "POST",
    data: id_staff,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      loadDanhSachTaiXe();
    },
    fail: function (data) {
      alert("Lỗi");
    },
  });
});

const doiMatKhauAd = async () => {
  if ($("#new_password").val() == $("#new_password1").val()) {
    var account = localStorage.getItem("accountx");

    var oldPassword = $("#old_password").val().trim();
    var newPassword = $("#new_password").val().trim();
    var tmp = {
      account: account,
      old_password: oldPassword,
      new_password: newPassword,
    };

    var doiMatKhauAdm = JSON.stringify(tmp);

    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5000/change-password-staff",
      data: doiMatKhauAdm,
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
$("#btnAdDoiMatkhau").click(doiMatKhauAd);
const nhanDanhSachTaiXeTrongLichLam = (date) => {
  var tmp = { date: date };
  var data = JSON.stringify(tmp);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/get_list_staff_empty_work_today",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      var html = res.map((value, index) => {
        return `
       <option value=${value.id_staff}>${value.first_name} ${value.last_name}</option>
       `;
      });
      document.getElementById("id_staff").innerHTML = html.join("");
    },
  });
};
const nhanDanhSachXeBusTheoNgay = (date) => {
  var id_semester = localStorage.getItem("idHK");
  var tmp = { id_semester: id_semester, date: date };
  var data = JSON.stringify(tmp);
  
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/get-list-unassigned-bus-in-semester-by-date",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      var html = res.map((value, index) => {
        return `
       <option value=${value.id_bus}>${value.bus_plate}</option>
       `;
      });
      document.getElementById("id_bus").innerHTML = html.join("");
    },
  });
};
$("#ngayLamViec").change(function (e) {
  var date = $("#ngayLamViec").val();
 
  setTimeout(nhanDanhSachTaiXeTrongLichLam(date), 1000);
  setTimeout(nhanDanhSachXeBusTheoNgay(date), 500);
});
const loadThongTinAd = () => {
  var idAd = localStorage.getItem("id_staff");
  var tmp = { id_staff: idAd };
  var data = JSON.stringify(tmp);
  
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/get-staff-info-by-id",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      console.log(res);
      $("#idStaff").val(res[0].account);
      $("#firstName").val(res[0].first_name);
      $("#lastName").val(res[0].last_name);
      $("#addressx").val(res[0].address);
      $("#phoneNum").val(res[0].phone_num);
      $("#driverLicense").val(res[0].driver_lisence);
    },
  });
};
const capNhatThongTinAdmin = () => {
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
      alert("Đổi thông tin thành công!!");
    },
  });
};
$("#btnAdCapNhatThongTin").click(capNhatThongTinAdmin);
$("#btnPhanCa").click(function () {
  var idStaff = $("#id_staff").find(":selected").val();
  var idBus = $("#id_bus").find(":selected").val();
  var date = $("#ngayLamViec").val();
  var tmp = { id_bus: idBus, id_staff: idStaff, date_work: date };
  var data=JSON.stringify(tmp)
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/insert-drive-schedule",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      console.log(res)
    },
  });
});
