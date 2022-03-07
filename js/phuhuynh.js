$(document).ready(function () {
  $(".xemTT").click(function (e) {
    $(".thongtinphuhuynh").show();
    $(".dangkidd").hide();
    $(".donghocphi").hide();
  });
  $(".thongtincon").click(function (e) {
    var tencon = $(this).children(".tencon").text();
    var lop = $(this).children(".lop").text();
    $(".tencondk").text(tencon);
    $(".lophoc").text(lop);
    $(".dangkidd").show();
    $(".thongtinphuhuynh").hide();
    $(".donghocphi").hide();
  });
  $(".dongHP").click(function (e) {
    $(".thongtinphuhuynh").hide();
    $(".dangkidd").hide();
    $(".donghocphi").show();
  });
});
