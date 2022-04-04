$(document).ready(function () {
  setTimeout(bieuDo, 600);
  $(".adminClick").click(function () {
    $(".menux").slideToggle("slow");
  });
  setTimeout(loadHocKiAd, 1000);
  setTimeout(loadDanhSachTaiXe, 2500);
  getDanhSachTuyen();
  setTimeout(getDanhSachPhanTuyenBus, 3000);
  setTimeout(getDanhSachBusHocKi, 1500);
  $("#accountt").val(localStorage.getItem("accountx"));
  $(".quanLyTaiXe").click(function async(e) {
    $("#quanLyTaiXe").show();
    $("#phanTuyenBus").hide();
    $("#quanLyCaLamViec").hide();
    $("#doiThongTinMatKhau").hide();
    $("#doiThongTinCaNhan").hide();
    $("#quanLyBaoVang").hide();
    $("#quanLyDiemDon").hide();
    $("#thongKe").hide();
  });
  $(".phanTuyenBus").click(function async(e) {
    getDanhSachTuyen();
    setTimeout(getDanhSachBusHocKi, 1000);
    $("#quanLyTaiXe").hide();
    $("#phanTuyenBus").show();
    $("#quanLyCaLamViec").hide();
    $("#doiThongTinMatKhau").hide();
    $("#doiThongTinCaNhan").hide();
    $("#quanLyDiemDon").hide();
    $("#quanLyBaoVang").hide();
    $("#thongKe").hide();
  });
  $(".quanLyCaLamViec").click(function async(e) {
    getDanhSachLichLamCacTaiXe();
    $("#quanLyTaiXe").hide();
    $("#phanTuyenBus").hide();
    $("#quanLyCaLamViec").show();
    $("#doiThongTinMatKhau").hide();
    $("#doiThongTinCaNhan").hide();
    $("#quanLyDiemDon").hide();
    $("#quanLyBaoVang").hide();
    $("#thongKe").hide();
  });
  $(".quanLyBaoVang").click(function async(e) {
    danhSachTaiXeBaoVang();
    $("#quanLyTaiXe").hide();
    $("#phanTuyenBus").hide();
    $("#quanLyBaoVang").show();
    $("#doiThongTinMatKhau").hide();
    $("#doiThongTinCaNhan").hide();
    $("#quanLyDiemDon").hide();
    $("#quanLyCaLamViec").hide();
    $("#thongKe").hide();
  });
  $(".doiThongTinMatKhau").click(function async(e) {
    $("#quanLyTaiXe").hide();
    $("#phanTuyenBus").hide();
    $("#quanLyCaLamViec").hide();
    $("#doiThongTinMatKhau").show();
    $("#doiThongTinCaNhan").hide();
    $("#quanLyDiemDon").hide();
    $("#quanLyBaoVang").hide();
    $("#thongKe").hide();
  });
  $(".doiThongTinCaNhan").click(function async(e) {
    loadThongTinAd();
    $("#quanLyTaiXe").hide();
    $("#phanTuyenBus").hide();
    $("#quanLyCaLamViec").hide();
    $("#doiThongTinMatKhau").hide();
    $("#doiThongTinCaNhan").show();
    $("#quanLyDiemDon").hide();
    $("#quanLyBaoVang").hide();
    $("#thongKe").hide();
  });
  $(".quanLyDiemDon").click(function async(e) {
    getDanhSachDiemDon();
    setTimeout(getDanhSachTuyen1, 500);
    $("#quanLyTaiXe").hide();
    $("#phanTuyenBus").hide();
    $("#quanLyCaLamViec").hide();
    $("#doiThongTinMatKhau").hide();
    $("#doiThongTinCaNhan").hide();
    $("#quanLyDiemDon").show();
    $("#quanLyBaoVang").hide();
    $("#thongKe").hide();
  });
  $(".thongKe").click(function async(e) {
    getDanhSachDiemDon();
    $("#quanLyTaiXe").hide();
    $("#phanTuyenBus").hide();
    $("#quanLyCaLamViec").hide();
    $("#doiThongTinMatKhau").hide();
    $("#doiThongTinCaNhan").hide();
    $("#quanLyDiemDon").hide();
    $("#quanLyBaoVang").hide();
    $("#thongKe").show();
  });
});
var date = new Date();

var arr = [];
const soDuongNhoNhatAd = (arr) => {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      return i;
    }
  }
};
var a;
var id_semester;
const loadHocKiAd = () => {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:5000/get-list-semester",
    success: function (res) {
      a = res.map((value, index) => {
        var toDate = new Date(value.to_date);
        var timeTmp = toDate.getTime() - date.getTime();
        return timeTmp;
      });
      id_semester = soDuongNhoNhatAd(a) + 1;
      localStorage.setItem("idHKAd", id_semester);

      $(".thongTinNamHoc").find(".hocKi").text(res[id_semester].semester);
      $(".thongTinNamHoc").find(".namHoc").text(res[id_semester].school_year);
    },
  });
};
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

          tr += "<td>" + item.account + "</td>";
          tr += "<td>" + item.first_name + "</td>";
          tr += "<td>" + item.last_name + "</td>";
          tr += "<td>" + item.phone_num + "</td>";
          tr += "<td>";
          tr +=
            '<i name="xoaTaiXe" id="font" data-bs-toggle="modal"  data-bs-target="#exampleModalx" class="fa-solid fa-trash-can"></i>';

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
const nhanDanhSachTaiXeTrongLichLam = () => {
  var date = $("#ngayLamViec").val();

  var tmp = { date: date };
  var data = JSON.stringify(tmp);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/get_list_staff_empty_work_today",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      console.log(res);
      var html = res.map((value, index) => {
        return `
       <option value=${value.id_staff}>${value.first_name} ${value.last_name}</option>
       `;
      });
      document.getElementById("id_staff").innerHTML = html.join("");
    },
  });
};
const nhanDanhSachXeBusTheoNgay = () => {
  var id_semester = localStorage.getItem("idHKAd");
  var date = $("#ngayLamViec").val();

  console.log(id_semester);
  var tmp = { id_semester: id_semester, date: date };
  var data = JSON.stringify(tmp);

  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/get-list-unassigned-bus-in-semester-by-date",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      console.log(res);
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

  setTimeout(nhanDanhSachTaiXeTrongLichLam, 2500);
  setTimeout(nhanDanhSachXeBusTheoNgay, 2000);
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
  var data = JSON.stringify(tmp);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/insert-drive-schedule",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      alert(res.info);
    },
  });
});
const getDanhSachLichLamCacTaiXe = () => {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:5000/get-list-driver-work-date",

    success: function (res) {
      console.log(res);
      $(".DSLLVCTX").empty();
      $.each(res, function (index, item) {
        let tr = '<tr idSchedule="' + item.id_schedule + '">';

        tr += "<td>" + item.date_work + "</td>";
        tr += "<td>" + item.bus_plate + "</td>";
        tr += "<td>" + item.shift + "</td>";

        tr += "<td>";

        tr += "</tr>";
        $(".DSLLVCTX").append(tr);
      });
    },
  });
};
var ngayVang;
const danhSachTaiXeBaoVang = () => {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:5000/get_list_new_absent_staff",

    success: function (res) {
      $(".DSTXBV").empty();
      $.each(res, function (index, item) {
        ngayVang = item.date_work;
        let tr = '<tr idSchedule="' + item.id_schedule + '">';

        tr += "<td>" + item.first_name + " " + item.last_name + "</td>";
        tr += "<td>" + item.bus_plate + "</td>";
        tr += "<td>" + item.date_work + "</td>";
        tr += "<td>" + item.shift + "</td>";
        tr += "<td>";
        tr +=
          '<i name="xacNhanBaoVang" data-bs-toggle="modal" data-bs-target="#xacNhanBaoVang" class=" XNBV fa-solid fa-check"></i>';

        tr += "</tr>";
        $(".DSTXBV").append(tr);
      });
    },
  });
};
const nhanDanhSachTaiXeTrongLichLam1 = (date) => {
  var date = date;

  var tmp = { date: date };
  var data = JSON.stringify(tmp);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/get_list_staff_empty_work_today",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      console.log(res);
      var html = res.map((value, index) => {
        return `
       <option value=${value.id_staff}>${value.first_name} ${value.last_name}</option>
       `;
      });
      document.getElementById("id_staffss").innerHTML = html.join("");
    },
  });
};
$(document).on("click", "i[name='xacNhanBaoVang']", function () {
  var idSchedule = $(this).closest("tr").attr("idSchedule");
  localStorage.setItem("idShhedulex", idSchedule);
  console.log(idSchedule);
  var tmp = { id_schedule: idSchedule };
  var data = JSON.stringify(tmp);

  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/get-absent-staff-by-schedule",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      console.log(res);
      localStorage.setItem("dateWork", res[0].date_work);
      localStorage.setItem("bus", res[0].id_bus);
      // localStorage.setItem("dateWork",res.id_staff)
      localStorage.setItem("shift", res[0].shift);

      // date_work: '2022-04-04', id_bus: 1, id_staff: 2, shift: 'Chiều'
    },
  });
  var date = localStorage.getItem("dateWork");
  nhanDanhSachTaiXeTrongLichLam1(date);
});
$("#chapNhanBaoVang").click(function (e) {
  var id_staff = $("#id_staffss").val();
  var id_schedule = localStorage.getItem("idShhedulex");
  var id_bus = localStorage.getItem("bus");
  var shift = localStorage.getItem("shift");
  var date_work = localStorage.getItem("dateWork");
  var tmp = {
    id_schedule: id_schedule,
    id_staff: id_staff,
    id_bus: id_bus,
    shift: shift,
    date_work: date_work,
  };
  var data = JSON.stringify(tmp);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/admin-accept-absent",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      alert(res.info);
      danhSachTaiXeBaoVang();
    },
  });
});
const getDanhSachDiemDon = () => {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:5000/get-list-station",

    success: function (res) {
      console.log(res);
      $(".DSDD").empty();
      $.each(res, function (index, item) {
        let tr = '<tr id_station="' + item.id_station + '">';

        tr += "<td>" + item.name_station + "</td>";
        tr += "<td>" + item.position + "</td>";
        tr += "<td>" + Math.floor(item.price) + "</td>";

        tr += "<td>";

        tr +=
          '<i name="suaTram" data-bs-toggle="modal" data-bs-target="#suaTramzz" id="font" class="fa-solid fa-pen"></i>';
        tr += "</tr>";
        $(".DSDD").append(tr);
      });
    },
  });
};
const getDanhSachTuyen = () => {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:5000/get-list-route",

    success: function (res) {
      console.log(res);

      var html = res.map((value, index) => {
        return `
       <option value=${value.id_route}>${value.name_route}</option>
       `;
      });
      document.getElementById("idRoute").innerHTML = html.join("");
    },
  });
};

const getDanhSachBusHocKi = () => {
  var id_semester = localStorage.getItem("idHKAd");
  var tmp = { id_semester: id_semester };
  var data = JSON.stringify(tmp);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/get-list-unassigned-bus-in-semester",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      console.log(res);
      var html = res.map((value, index) => {
        return `
       <option value=${value.id_bus}>${value.bus_plate}</option>
       `;
      });
      document.getElementById("id_busx").innerHTML = html.join("");
    },
  });
};
const themTuyen = () => {
  var id_bus = $("#id_busx").val();
  var idRoute = $("#idRoute").val();
  console.log(idRoute);
  var id_semester = localStorage.getItem("idHKAd");
  var tmp = {
    id_bus: id_bus,
    id_route: idRoute,
    id_semester: id_semester,
  };
  var data = JSON.stringify(tmp);
  console.log(data);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/insert-bus-route",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      alert(res.info);
      getDanhSachPhanTuyenBus();
    },
  });
};
$("#btnThemTuyen").click(themTuyen);
const getDanhSachTuyen1 = () => {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:5000/get-list-route",

    success: function (res) {
      console.log(res);

      var html = res.map((value, index) => {
        return `
       <option value=${value.id_route}>${value.name_route}</option>
       `;
      });
      document.getElementById("id_routets").innerHTML = html.join("");
    },
  });
};
$("#btnAdThemDiemDon").click(function (e) {
  var name_station = $("#name_station").val();
  var position = $("#position").val();
  var price = $("#price").val();
  var idRoutea = $("#id_routets").val();
  var tmp = {
    name_station: name_station,
    position: position,
    price: price,
    id_route: idRoutea,
  };
  var data = JSON.stringify(tmp);
  console.log(data);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/insert-station",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      alert(res.info);

      setTimeout(getDanhSachDiemDon, 500);
    },
  });
});
const bieuDo = () => {
  var id_semester = localStorage.getItem("idHKAd");
  var tmp = { id_semester: id_semester };
  var data = JSON.stringify(tmp);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/count-student-by-route-in-semester",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      console.log(res);
      var xValues = [];
      var yValues = [];
      var barColors = ["red", "green", "blue", "orange", "brown"];
      xValues = res.map((val) => {
        return val.name_route;
      });

      yValues = res.map((val) => {
        return val.count_student;
      });

      new Chart("myChart", {
        type: "bar",
        data: {
          labels: xValues,
          datasets: [
            {
              backgroundColor: barColors,
              data: yValues,
            },
          ],
        },
        options: {
          legend: { display: false },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    },
  });
};
const getDanhSachPhanTuyenBus = () => {
  var id_semester = localStorage.getItem("idHKAd");
  var tmp = { id_semester: id_semester };
  var data = JSON.stringify(tmp);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/get-list-bus-route-by-semester",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      console.log(res);
      $(".DSPTB").empty();
      $.each(res, function (index, item) {
        let tr = '<tr id_station="' + item.id_station + '">';

        tr += "<td>" + index + "</td>";
        tr += "<td>" + item.name_route + "</td>";
        tr += "<td>" + item.bus_plate + "</td>";

        tr += "<td>";

        tr += "</tr>";
        $(".DSPTB").append(tr);
      });
    },
  });
};
$(document).on("click", "i[name='suaTram']", function (e) {
  var id_station = $(this).closest("tr").attr("id_station");
  var position = $("#positionUp").val();
  var price = $("#priceUp").val();
  var name_station = $("#name_stationUp").val();
  var tmp = {
    id_station: id_station,
    price: price,
    name_station: name_station,
    position: position,
  };
  var data = JSON.stringify(tmp);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/update-station",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      alert(res.info);
      getDanhSachDiemDon();
    },
  });
});
