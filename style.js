const seaCont = document.getElementById("top-search");
const serHide = document.getElementById("topsercross-icon");
const serShow = document.getElementById("ser-btn-icon");

serShow.addEventListener("click", () => {
  seaCont.style.padding = "5px 5%";
  seaCont.style.height = "50px";
  seaCont.style.transition = "all 0.5s";
});
serHide.addEventListener("click", () => {
  seaCont.style.height = "0";
  seaCont.style.padding = "0 5%";
});
//----------navbar hide and show----------

const barbtn = document.getElementById("bar-icon");
const dropdown = document.getElementById("menu");
barbtn.addEventListener("click", () => {
  dropdown.classList.toggle("show");
});
//-----------submenu---------------
const droptog = document.querySelectorAll(".droptoggle");
const submenu = document.getElementsByClassName("submenu");

for (let x = 0; x < droptog.length; x++) {
  droptog[x].addEventListener("click", () => {
    submenu[x].classList.toggle("submenushow");
  });
}
//------------sub-sub-dropdown------------
const subsubtog = document.querySelectorAll("sub-sub-drop");
const subSubMenu = document.getElementsByClassName("sub-sub-menu");
for (let y = 0; y < subsubtog.length; y++) {
  subsubtog[y].addEventListener("click", () => {
    subSubMenu[y].classList.toggle("show-sub-sub-menu");
  });
}
/*------------carasoul-------------*/

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
/*------------swiper-----------*/

var swiper = new swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  contentSlide: "true",
  fade: "true",
  grabCursor: "true",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    520: { slidesPerView: 2 },
    950: { slidesPerView: 3 },
  },
});
/*-----------------carasoul--------------*/
window.onload = function () {
  const helpers = (function () {
    function getDOMElements(DOMSelectors) {
      let DOMElements = {};
      for (let selector in DOMSelectors) {
        if (DOMSelectors.hasOwnProperty(selector)) {
          DOMElements[selector] = document.querySelector(
            DOMSelectors[selector]
          );
        }
      }
      return DOMElements;
    }
    return {
      getDOMElements,
    };
  })();

  const modal = (function () {
    const state = {
      counter: 0,
      intervalID: 0,
    };
    let CONSTANTS = {
      ACTIVE_CLASS_NAME: "active",
      TIMER: 1500,
      TRANSITION: "all .3s ease-out",
    };
    function addConstant(key, value) {
      CONSTANTS[key] = value;
    }

    return {
      state,
      CONSTANTS,
      addConstant,
    };
  })();

  const view = (function (helpers) {
    const DOMSelectors = {
      carouselInnerSlider: ".content_inner_slider",
      dots: ".dots",
      slide: "#slide",
      prevButton: ".prev_button",
      nextButton: ".next_button",
      carouselImages: ".content_inner_slider > img",
      dot: ".dot",
    };
    const DOMElements = helpers.getDOMElements(DOMSelectors);
    const CAROUSEL_IMAGES = [
      ...document.querySelectorAll(DOMSelectors.carouselImages),
    ];
    const DOTS = [...document.querySelectorAll(DOMSelectors.dot)];
    function moveSliderToIndex(IMAGE_SIZE, index) {
      DOMElements.carouselInnerSlider.style.transform = `translateX(-${
        IMAGE_SIZE * index
      }px)`;
    }
    function addClassToIndex(className, index) {
      CAROUSEL_IMAGES[index].classList.add(className);
    }
    function removeClassToIndex(className, index) {
      CAROUSEL_IMAGES[index].classList.remove(className);
    }
    function addBackGroundToCurrentIndex(index) {
      DOTS[index].style.background = "#000";
    }
    function removeBackGroundToCurrentIndex(index) {
      DOTS[index].style.background = "transparent";
    }
    function setTransition(element, transition) {
      element.style.transition = `${transition}`;
    }
    return {
      DOMSelectors,
      moveSliderToIndex,
      addClassToIndex,
      removeClassToIndex,
      addBackGroundToCurrentIndex,
      removeBackGroundToCurrentIndex,
      setTransition,
    };
  })(helpers);

  const controller = (function (modal, view, helpers) {
    const DOMSelectors = view.DOMSelectors;
    const DOMElements = helpers.getDOMElements(DOMSelectors);
    function initApp() {
      const imageSize = DOMElements.carouselInnerSlider.clientWidth;
      const imagesCount =
        [...document.querySelectorAll(DOMSelectors.carouselImages)].length - 1;
      modal.addConstant("IMAGE_SIZE", imageSize);
      modal.addConstant("TOTAL_IMAGES", imagesCount);
      view.moveSliderToIndex(modal.CONSTANTS.IMAGE_SIZE, modal.state.counter);
      handleAdding();
      DOMElements.nextButton.addEventListener("click", handleNextImage);
      DOMElements.prevButton.addEventListener("click", handlePrevImage);
      DOMElements.dots.addEventListener("click", handleDotClick);
      DOMElements.slide.addEventListener("change", handleSlide);
    }
    function removeEventListeners() {
      DOMElements.nextButton.removeEventListener("click", handleNextImage);
      DOMElements.prevButton.removeEventListener("click", handlePrevImage);
      DOMElements.dots.removeEventListener("click", handleDotClick);
      DOMElements.slide.removeEventListener("change", handleSlide);
    }
    function handleNextImage() {
      handleRemove();
      if (modal.state.counter === modal.CONSTANTS.TOTAL_IMAGES) {
        modal.state.counter = -1;
      }
      modal.state.counter += 1;
      handleAdding();
      view.moveSliderToIndex(modal.CONSTANTS.IMAGE_SIZE, modal.state.counter);
    }
    function handlePrevImage() {
      handleRemove();
      if (modal.state.counter === 0) {
        modal.state.counter = modal.CONSTANTS.TOTAL_IMAGES + 1;
      }
      modal.state.counter -= 1;
      handleAdding();
      view.moveSliderToIndex(modal.CONSTANTS.IMAGE_SIZE, modal.state.counter);
    }
    function handleDotClick(event) {
      const value = Number(event.target.value);
      if (!isNaN(value)) {
        handleRemove();
        modal.state.counter = value;
        view.moveSliderToIndex(modal.CONSTANTS.IMAGE_SIZE, modal.state.counter);
        handleAdding();
      }
    }
    function handleSlide(event) {
      const isChecked = event.target.checked;
      if (isChecked) {
        modal.state.intervalID = setInterval(() => {
          handleNextImage();
        }, modal.CONSTANTS.TIMER);
      } else {
        clearInterval(modal.state.intervalID);
        modal.state.intervalID = null;
      }
    }
    function handleRemove() {
      view.removeClassToIndex(
        modal.CONSTANTS.ACTIVE_CLASS_NAME,
        modal.state.counter
      );
      view.removeBackGroundToCurrentIndex(modal.state.counter);
    }
    function handleAdding() {
      view.addClassToIndex(
        modal.CONSTANTS.ACTIVE_CLASS_NAME,
        modal.state.counter
      );
      view.addBackGroundToCurrentIndex(modal.state.counter);
    }
    DOMElements.carouselInnerSlider.addEventListener(
      "transitionstart",
      removeEventListeners
    );
    DOMElements.carouselInnerSlider.addEventListener("transitionend", initApp);
    view.setTransition(
      DOMElements.carouselInnerSlider,
      modal.CONSTANTS.TRANSITION
    );
    return {
      initApp,
      removeEventListeners,
    };
  })(modal, view, helpers);

  controller.initApp();

  window.addEventListener("resize", () => {
    controller.removeEventListeners();
    controller.initApp();
  });
};

