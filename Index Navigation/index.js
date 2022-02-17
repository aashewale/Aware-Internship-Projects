const nav = document.querySelector('.collapse');
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    if (lastScrollY < window.scrollY){
        nav.classList.add("hide");
    }
    else{
        nav.classList.remove("hide");
    }
    lastScrollY = window.scrollY;
});

$(document).ready(function () {
  $(window).resize(function () {
    if ($(window).width() > 1024) {
      $(".panel-heading").toggle(true);
    } else {
      $(".panel-heading").toggle(false);
    }
  });
});
