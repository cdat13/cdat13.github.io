/*!
* Start Bootstrap - Modern Business v5.0.7 (https://startbootstrap.com/template-overviews/modern-business)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-modern-business/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

let valueDisplays = document.querySelectorAll(".num");
let interval = 2500;

valueDisplays.forEach((valueDisplay) => {
  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute("data-val"));
  let stepTime = Math.max(Math.floor(interval / endValue), 10); 
  let increment = Math.ceil(endValue / (interval / stepTime));

  let counter = setInterval(() => {
    startValue += increment;
    if (startValue >= endValue) {
      startValue = endValue;
      clearInterval(counter);
    }
    valueDisplay.textContent = startValue.toLocaleString();
  }, stepTime);
});

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slider img");
  if (!slider || slides.length === 0) return;

  let index = 0;
  const slideCount = slides.length;

  // Tự động trượt mượt hơn
  setInterval(() => {
    index = (index + 1) % slideCount;
    slider.scrollTo({
      left: index * slider.clientWidth,
      behavior: "smooth"
    });
  }, 4000); 
});


