/* 헤더 기능 */
document.querySelector("nav").classList.add("fixed-top");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 180 || document.documentElement.scrollTop > 180) {
    document.querySelector("nav").classList.add("fixed-top");
  } else {
    document.querySelector("nav").classList.remove("fixed-top");
  }
}

window.addEventListener("load", scrollFunction);

/* 슬라이드 관련 */
$(document).ready(function() {
  $('#myCarousel').carousel();
});
