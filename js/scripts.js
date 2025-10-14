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

// Scroll up
let lastScrollTop = 0;
let ticking = false;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.classList.add("hidden");
      } else {
        navbar.classList.remove("hidden");
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
      ticking = false;
    });
    ticking = true;
  }
});

// Load up
document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".section-plan");
  if (!section) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add("active");
        }
      });
    },
    { threshold: 0.3 } // kích hoạt khi 30% section xuất hiện
  );

  observer.observe(section);
});

// HR Amination
document.addEventListener("DOMContentLoaded", function () {
  const hrs = document.querySelectorAll(".hr-animate");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.5 }
  );

  hrs.forEach((hr) => observer.observe(hr));
});



