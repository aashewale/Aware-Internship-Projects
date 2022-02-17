//keyboard control
function moveRight() {
  const swiper = document.querySelector(".swiper").swiper;
  swiper.slidePrev();
  var node = $(document).find(".swiper-slide-active");
  console.log(node.data("name"));
  $(".card-name").text(node.data("name"));
  $(".card-description").text(node.data("description"));
  $(".card-price").text(node.data("price"));
}

function moveLeft() {
  const swiper = document.querySelector(".swiper").swiper;
  swiper.slideNext();
  var node = $(document).find(".swiper-slide-active");
  console.log(node.data("name"));
  $(".card-name").text(node.data("name"));
  $(".card-description").text(node.data("description"));
  $(".card-price").text(node.data("price"));
}

document.onkeyup = (e) => {
  switch (e.keyCode) {
    case 37: // left
      moveRight();
      break;
    case 39: // right
      moveLeft();
      break;
  }
};

//sliding and rotating the cards
var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  allowTouchMove: true,
  mousewheel: true,
  coverflowEffect: {
    rotate: 20,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  //to change footer values on scroll
  on: {
    slideChange: function () {
      setTimeout(() => {
        var node = $(document).find(".swiper-slide-active");
        //$(".card-name").text(node.data("name"));
        //$(".card-description").text(node.data("description"));
        //$(".card-price").text(node.data("price"));

        $("#card-name").text(node.data("name"));
        $("#card-content").text(node.data("description"));
        $("#card-price").text("Starting from $" + node.data("price"));

      }, 500);
    },
  },

  //display cards according to screen size
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1100: {
      slidesPerView: 5,
    },
  },
});

//for fade in and fade out getstarted
document.querySelector("#getStart").addEventListener("click", function () {
  fetchData();
  $(".swiper-button-prev, .swiper-button-next").show();
  $("#getStart").find("#getStarted").css("color", "#f2f2f0");
  $("#getStart").find(".btn").hide();
  $("#getStart").slideUp(1000);

  $("#getStarted2").css("transform", "scale(1.0)");
  setTimeout(() => {
    $("#getStarted2").fadeOut();
  }, 1500);
  setTimeout(() => {
    $("#getStarted2").remove();

    $("#swiperList").fadeIn();
  }, 2000);
});

//modal box
$('body').on('click', '.swiper-slide' ,function(){
  $('#modal-heading').text($(this).data('name'));
  $('#modal-heading-bottom').text($(this).data('name'));
  $('#modal-content').text($(this).data('description'));
  $('#modal-category').text($(this).data('category'));
  $('#modal-price').text($(this).data('price'));
  $('#modal-img').attr("src", $(this).data('image'));
  $("#myModal").modal("show");

});

function doMagic() {
  var current_slide = $(document).find(".swiper-slide-active");
  /*$(document).find(".swiper-slide-active").tilt({
    scale: 1.2,
  });*/
  $("#card-name").text(current_slide.data("name"));
  $("#card-content").text(current_slide.data("description"));
  $("#card-price").text(current_slide.data("price"));
}

//https://retool.com/api-generator/
async function fetchData() {
  document.getElementById("swiper-wrapper-cards").innerHTML = 'loading...';

  //await fetch("MOCK_DATA.json").then(response => {
  await fetch("https://api.mocki.io/v2/e61a75bf").then(response => {
    return response.json();
  })
  .then(data => {
    const output = data;
    const html = output.map(card => {
      return `
    <div class="swiper-slide" data-name="${card.heading}" data-image="${card.image_name}" data-category="${card.category}" data-description="${card.content}" data-price="${card.price}">
        <div class="card">
          <a href="#">
            <img id="card-img" src="${card.image_name}" alt="${card.heading}">
            <div class="card-body">
              <span class="card-category">Investments</span>
              <h3 class="card-heading">${card.heading}</h3>
              <p class="card-content">${card.content}</p>
              <div class="card-footer">
                <img class="link-icon" src="images/arrow right.png" alt="right arrow">
                <span class="fake-link">Read more</span>
              </div>
            </div>
          </a>
          <div class="bottom-heading">${card.bottom_heading}<br>Starting From $${card.price}</div>
        </div>
      </div>`
    }).join('');    
    document.getElementById("swiper-wrapper-cards").innerHTML = html;
    doMagic();
  });
}
$(".swiper-button-prev, .swiper-button-next").hide();