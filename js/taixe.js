$(document).ready(function () {
  setTimeout(layIdRoute, 1000);
  setTimeout(layDanhSachHocSinhDeDiemDanh, 1500);
  $(".taiXeClick").click(function () {
    $(".menux").slideToggle("slow");
  });
  $("#tenTaiXe").text(localStorage.getItem("tentaixe"));
  $("#accountt").val(localStorage.getItem("account"));

  danhSachLichLamTaiXe();
});
$(".lichLamViec").click(function (e) {
  $("#lichlamviec").show();
  $("#thongTinCaNhan").hide();
  $("#doiMatKhau").hide();
  $("#diemDanh").hide();
});
$(".diemDanh").click(function (e) {
  $("#lichlamviec").hide();
  $("#thongTinCaNhan").hide();
  $("#doiMatKhau").hide();
  $("#diemDanh").show();
});
$(".thongTinCaNhan").click(function (e) {
  loadThongTinTaiXe();
  $("#lichlamviec").hide();
  $("#thongTinCaNhan").show();
  $("#doiMatKhau").hide();
  $("#diemDanh").hide();
});
$(".doiMatKhau").click(function (e) {
  $("#lichlamviec").hide();
  $("#thongTinCaNhan").hide();
  $("#doiMatKhau").show();
  $("#diemDanh").hide();
  $("#diemDanh").hide();
});
const doiMatKhauNv = async () => {
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
    alert("M???t kh???u m???i kh??ng tr??ng nhau");
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
      if (res.result == true) {
        alert("?????i th??ng tin th??nh c??ng!!");
      } else {
        alert("?????i th??ng tin th???t b???i!!");
      }
    },
  });
};
$("#btnTxCapNhatThongTin").click(capNhatThongTinTaiXe);

const danhSachLichLamTaiXe = () => {
  var id_staff = localStorage.getItem("id_staff");
  var tmp = { id_staff: id_staff };
  var data = JSON.stringify(tmp);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/get_list_work_date_by_driver",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      $(".LLV").empty();
      $.each(res, function (index, item) {
        id_schedule = item.id_schedule;

        let tr = '<tr id_schedule="' + item.id_schedule + '">';

        tr += "<td>" + item.date_work + "</td>";
        tr += "<td>" + item.bus_plate + "</td>";
        tr += "<td>" + item.shift + "</td>";

        tr += "<td>";
        tr +=
          '<i name="baoVang" class="hoverTx fa-solid fa-plus" data-bs-toggle="modal" data-bs-target="#modalBaoVang"></i>';

        tr += "</tr>";
        $(".LLV").append(tr);
      });
    },
  });
};
const loadlyDovang = () => {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:5000/get-list-reason-absence",
    success: function (res) {
      var html = res.map((value, index) => {
        return `
     <option value=${value.id_absent}>${value.reason}</option>
     `;
      });
      document.getElementById("id_absent").innerHTML = html.join("");
    },
  });
};
var idVang;
$(document).on("click", "i[name='baoVang']", function () {
  loadlyDovang();
  idVang = $(this).closest("tr").attr("id_schedule");
});
const baoVang = () => {
  var id_absent = $("#id_absent").find(":selected").val();
  var tmp = { id_absent: id_absent, id_schedule: idVang };
  var data = JSON.stringify(tmp);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/update_absent_schedule",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      alert(res.info);
    },
  });
};
$("#btnBaoVang").click(baoVang);

const layIdRoute = () => {
  var date = new Date();
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  var today = yyyy + "-" + mm + "-" + dd;

  var id_semester = localStorage.getItem("idHKAd");
  var idStaff = localStorage.getItem("id_staff");
  var tmp = { id_semester: id_semester, id_staff: idStaff, date: today };
  var data = JSON.stringify(tmp);
  console.log(data);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/get-info-bus-route-by-driver-in-date",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      localStorage.setItem("idRt", res[0].id_route);
      localStorage.setItem("idBuss", res[0].id_bus);
    },
  });
};
const layDanhSachHocSinhDeDiemDanh = () => {
  var id_route = localStorage.getItem("idRt");
  var id_semester = localStorage.getItem("idHKAd");
  var date = new Date();
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  var today = yyyy + "-" + mm + "-" + dd;
  var tmp = { id_route: id_route, id_semester: id_semester, date: today };
  var data = JSON.stringify(tmp);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/get-list-attendance-student-by-route-in-date",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      console.log(res);
      $(".DSHSDD").empty();
      $.each(res, function (index, item) {
        id_schedule = item.id_schedule;

        let tr = '<tr idRegister="' + item.id_register + '">';

        tr += "<td>" + item.id_student + "</td>";
        tr += "<td>" + item.first_name + "</td>";
        tr += "<td>" + item.last_name + "</td>";

        tr += "<td>";
        tr += '<i name="diemDanh" class="hoverTx fa-solid fa-check"></i>';

        tr += "</tr>";
        $(".DSHSDD").append(tr);
      });
    },
  });
};
$(document).on("click", "i[name='diemDanh']", function () {
  var id_register = $(this).closest("tr").attr("idRegister");
  var id_bus = localStorage.getItem("idBuss");
  var tmp = { id_register: id_register, id_bus: id_bus };
  var data=JSON.stringify(tmp)
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/insert-attendance-student",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
     alert(res.info)
    },
  });
});
