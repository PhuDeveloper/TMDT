$(document).ready(function () {
  $(".phuHuynhClick").click(function () {
    $(".menux").slideToggle("slow");
  });

  var hoPhuHuynh = localStorage.getItem("hoPhuHuynh");
  var tenPhuHuynh = localStorage.getItem("tenPhuHuynh");

  $(".spanTenPhuHuynh").text(hoPhuHuynh + " " + tenPhuHuynh);
  $(".dangKiDiemDon").click(function (e) {
    $("#thongtinphuhuynh").show();
    $("#dangKiDiemDon").hide();
    $("#dongHocPhi").hide();
    $("#doiMatKhau").hide();
    $("#doiThongTinCaNhan").hide();
    $("#danhSachDangKi").hide();
    $("#xemNgayVangHoc").hide();
  });
  $(".dongHocPhi").click(function async(e) {
    $("#thongtinphuhuynh").hide();
    $("#dangKiDiemDon").hide();
    $("#dongHocPhi").show();
    $("#doiMatKhau").hide();
    $("#doiThongTinCaNhan").hide();
    $("#danhSachDangKi").hide();
    $("#xemNgayVangHoc").hide();
  });
  $(".doiThongTinCaNhan").click(function async(e) {
    loadThongTinPhuHuynh();
    $("#thongtinphuhuynh").hide();
    $("#dangKiDiemDon").hide();
    $("#dongHocPhi").hide();
    $("#doiMatKhau").hide();
    $("#doiThongTinCaNhan").show();
    $("#danhSachDangKi").hide();
    $("#xemNgayVangHoc").hide();
  });
  $(".doiMatKhau").click(function async(e) {
    $("#thongtinphuhuynh").hide();
    $("#dangKiDiemDon").hide();
    $("#dongHocPhi").hide();
    $("#doiMatKhau").show();
    $("#doiThongTinCaNhan").hide();
    $("#danhSachDangKi").hide();
    $("#xemNgayVangHoc").hide();
  });
  $(".danhSachDangKi").click(function async(e) {
    loadDanhSachDangKi();
    $("#thongtinphuhuynh").hide();
    $("#dangKiDiemDon").hide();
    $("#dongHocPhi").hide();
    $("#doiMatKhau").hide();
    $("#doiThongTinCaNhan").hide();
    $("#danhSachDangKi").show();
    $("#xemNgayVangHoc").hide();
  });

  setTimeout(loadHocKi, 1000);
  setTimeout(loadDanhSachCon, 2000);
});
var idPhuHuynh = localStorage.getItem("idPhuHuynh");
var date = new Date();

var arr = [];
const soDuongNhoNhat = (arr) => {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      return i;
    }
  }
};
var a;
var id_semester;
const loadHocKi = () => {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:5000/get-list-semester",
    success: function (res) {
      a = res.map((value, index) => {
        var toDate = new Date(value.to_date);
        var timeTmp = toDate.getTime() - date.getTime();
        return timeTmp;
      });
      id_semester = soDuongNhoNhat(a) + 1;
      localStorage.setItem("idHK", id_semester);

      $(".thongTinNamHoc").find(".hocKi").text(res[id_semester].semester);
      $(".thongTinNamHoc").find(".namHoc").text(res[id_semester].school_year);
    },
  });
};

var mHSTmp;
var tHSTmp;
const loadDanhSachCon = () => {
  var tmp = { id_parent: idPhuHuynh };
  var data = JSON.stringify(tmp);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/get-list-student",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      var dsHocSinh = res.data;

      $(".DSC").empty();
      $.each(dsHocSinh, function (index, item) {
        mHSTmp = item.id_student;
        tHSTmp = item.first_name + " " + item.last_name;
        let tr = '<tr maHocSinh="' + item.id_student + '">';

        tr += "<td>" + item.id_student + "</td>";
        tr += "<td>" + item.first_name + "</td>";
        tr += "<td>" + item.last_name + "</td>";

        tr += "<td>";
        tr += '<i name="dangKi" class="fa-solid fa-plus"></i>';

        tr += "</tr>";
        $(".DSC").append(tr);
      });
    },
  });
};
$(document).on("click", "i[name='dangKi']", function () {
  $(".maHocSinhConDangKi").text(mHSTmp);
  $(".tenConDangKi").text(tHSTmp);
  $("#thongtinphuhuynh").hide();
  $("#dangKiDiemDon").show();
  $("#dongHocPhi").hide();
  $("#doiMatKhau").hide();
  $("#doiThongTinCaNhan").hide();
  danhSachTram();
});
const doiMatKhauPH = () => {
  var email = $("#emailPH").val();
  var oldPassword = $("#old_password").val();
  var newPassword = $("#new_password").val();
  var newPassword1 = $("#new_password1").val();
  var tmp = {
    email: email,
    old_password: oldPassword,
    new_password: newPassword,
  };
  var data = JSON.stringify(tmp);
  if (newPassword == newPassword1) {
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5000/change-password-parent",
      data: data,
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
    alert("Mật khẩu mới ko trùng nhau vui lòng nhập lại");
  }
};

$("#btnPhuHuynhDoiMatkhau").click(doiMatKhauPH);
const danhSachTram = () => {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:5000/get-list-station",
    success: function (res) {
      var html = res.map((value, index) => {
        return `
       <option value=${value.id_station}>${value.position}</option>
       `;
      });
      document.getElementById("id_station").innerHTML = html.join("");
    },
  });
};

var giaDangKi;

$("#submitTram").click(function async(e) {
  var idTram = $("#id_station").find(":selected").val();
  var idSemester = id_semester;

  var idStudent = $(".maHocSinhConDangKi").text();

  console.log(idStudent);
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:5000/get-list-station",
    success: function (res) {
      res.map((value, index) => {
        if (value.id_station == idTram) {
          giaDangKi = value.price;
          console.log(value);
        }
      });

      var tmp = {
        id_station: idTram,
        id_student: idStudent,
        id_semester: idSemester,
        price: Math.round(giaDangKi),
      };

      var data = JSON.stringify(tmp);
      console.log(data);
      $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/register-station",
        data: data,
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
          if (res.result == true) {
            alert(res.info);
            $("#dangKiDiemDon").hide();
          } else {
            alert("Đăng kí thất bại! Bạn đã đăng kí cho học sinh này");
            $("#dangKiDiemDon").hide();
          }
        },
      });
    },
  });
  // console.log(test);
});
const loadThongTinPhuHuynh = () => {
  var idPhuHuynh = localStorage.getItem("idPhuHuynh");
  var tmp = { id_parent: idPhuHuynh };
  var data = JSON.stringify(tmp);
  console.log(data);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/get-parent-info-by-id",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      $("#email").val(res[0].email);
      $("#firstName").val(res[0].first_name);
      $("#lastName").val(res[0].last_name);
      $("#addressx").val(res[0].address);
      $("#phoneNum").val(res[0].phone_num);
    },
  });
};
const capNhatThongTinPhuHuynh = () => {
  var id_parent = localStorage.getItem("idPhuHuynh");
  var email = $("#email").val();
  var phone_num = $("#phoneNum").val();
  var first_name = $("#firstName").val();
  var last_name = $("#lastName").val();
  var address = $("#address").val();
  var tmp = {
    id_parent: id_parent,
    email: email,
    phone_num: phone_num,
    first_name: first_name,
    last_name: last_name,
    address: address,
  };
  var data = JSON.stringify(tmp);
  console.log(data);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/update-info-parent",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function async(res) {
      if (res.result == true) {
        loadThongTinPhuHuynh();
        alert("Đổi thông tin thành công!!");
      } else {
        alert("Cập nhật thông tin thất bại");
      }
    },
  });
};

var tenHsTmp;
$("#btnPHCapNhatThongTin").click(capNhatThongTinPhuHuynh);
const loadDanhSachDangKi = () => {
  var idPhuHuynh = localStorage.getItem("idPhuHuynh");
  var idSemester = id_semester;
  var tmp = { id_parent: idPhuHuynh, id_semester: idSemester };
  var data = JSON.stringify(tmp);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/get-list-register-station-by-semester-by-parent",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      $(".DSDKTram").empty();
      $.each(res, function (index, item) {
        tenHsTmp = item.first_name + " " + item.last_name;
        let tr =
          '<tr id="hov" name="xemNgayVangHoc" idHuyDk="' +
          item.id_register +
          '">';

        tr += "<td>" + item.id_student + "</td>";
        tr += "<td>" + item.first_name + "</td>";
        tr += "<td>" + item.last_name + "</td>";
        tr += "<td>" + item.name_station + "</td>";
        tr += "<td>" + Math.floor(item.price) + "</td>";

        tr += "<td>";
        tr +=
          '<button style="border: none;" name="huyDangKiDiemDon" data-bs-toggle="modal" data-bs-target="#exampleModal11" class="fa-solid fa-trash"></button>';

        tr += "</tr>";

        $(".DSDKTram").append(tr);
      });
    },
  });
};
var idRegister11;
$(document).on("click", "button[name='huyDangKiDiemDon']", function () {
  idRegister11 = $(this).closest("tr").attr("idHuyDk");
});
$("#huyDangKiDiemDon").click(function (e) {
  var tmp = { id_register: idRegister11 };
  var data = JSON.stringify(tmp);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/cancel-register-station",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      if (res.info == "Hủy đăng kí thất bại") {
        alert(res.info);
      } else {
        alert(res.info);
        loadDanhSachDangKi();
      }
    },
  });
});
var idRegister111;
$(document).on("dblclick", "tr[name='xemNgayVangHoc']", function () {
  idRegister111 = $(this).closest("tr").attr("idHuyDk");

  console.log(tenHsTmp);
  $("#tenConVangHoc").text(tenHsTmp);
  $("#thongtinphuhuynh").hide();
  $("#dangKiDiemDon").hide();
  $("#dongHocPhi").hide();
  $("#doiMatKhau").hide();
  $("#doiThongTinCaNhan").hide();
  $("#danhSachDangKi").hide();
  $("#xemNgayVangHoc").show();
});
$("#btnXemNgayVang").click(function (e) {
  var from_date = $("#from_date").val();
  var to_date = $("#to_date").val();
  var tmp = {
    from_date: from_date,
    to_date: to_date,
    id_register: 2,
  };
  var data = JSON.stringify(tmp);
  console.log(data);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/statistic-student-go-school-bus",
    data: data,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      var resDt = res.map((val, idx) => {
        if(val.bus_plate==null){
          val.bus_plate="vắng"
          
        }
        if(val.time_pick_up==null){
          val.time_pick_up="vắng"
        }
        if(val.reason==null){
          val.reason=" "
        }
      });

     
      $(".DSV").empty();
      $.each(res, function (index, item) {
        let tr = '<tr  idHuyDk="' + item.id_bus + '">';

        tr += "<td>" + item.bus_plate + "</td>";
        tr += "<td>" + item.date + "</td>";
        tr += "<td>" + item.time_pick_up + "</td>";
        tr += "<td>" + item.reason + "</td>";

        tr += "<td>";

        tr += "</tr>";

        $(".DSV").append(tr);
      });
    },
  });
});
