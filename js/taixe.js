$(document).ready(function () {
    
  $("#lichLV").click(function (e) {
    $(".lichlamviec").show();
    $(".thongtintaixe").hide();
  });
  $("#thongtinTX").click(function (e) {
    $(".lichlamviec").hide();
    $(".thongtintaixe").show();
  });
});
