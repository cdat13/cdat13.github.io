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
    { threshold: 0.3 } 
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

// Plan decs scroll up
document.addEventListener("DOMContentLoaded", function () {
  const paragraphs = document.querySelectorAll(".plan-desc");

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Thêm delay nhẹ cho từng đoạn để nhìn mượt hơn
        entry.target.style.transitionDelay = `${index * 0.15}s`;
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 }); // Khi 20% phần tử xuất hiện thì bắt đầu

  paragraphs.forEach(p => observer.observe(p));
});

// Nav bar here
document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('mainNav');
  if (!navbar) return; // nếu ko có navbar thì dừng

  const toggler = document.querySelector('.navbar-toggler');
  const collapse = document.getElementById('navbarSupportedContent');

  // đảm bảo trạng thái ban đầu visible
  navbar.classList.remove('hide');
  navbar.classList.add('show');

  let lastScrollY = window.scrollY || 0;

  // helper: chỉ ẩn navbar trên desktop (>= lg)
  function isDesktop() {
    return window.innerWidth >= 992; // tương ứng bootstrap lg
  }

  // xử lý scroll
  function onScroll() {
    // nếu mobile - giữ luôn hiện (tránh ẩn khi mở menu)
    if (!isDesktop()) {
      navbar.classList.remove('hide');
      navbar.classList.add('show');
      lastScrollY = window.scrollY;
      return;
    }

    // nếu collapse đang mở thì không ẩn
    if (collapse && collapse.classList.contains('show')) {
      lastScrollY = window.scrollY;
      return;
    }

    const current = window.scrollY || 0;

    if (current > lastScrollY && current > 80) {
      // cuộn xuống => ẩn
      navbar.classList.remove('show');
      navbar.classList.add('hide');
    } else {
      // cuộn lên => hiện
      navbar.classList.remove('hide');
      navbar.classList.add('show');
    }

    lastScrollY = current;
  }

  // attach scroll with passive option for perf
  window.addEventListener('scroll', onScroll, { passive: true });

  // khi click hamburger: ép hiện nav (an toàn nếu toggler không tồn tại)
  if (toggler) {
    toggler.addEventListener('click', function () {
      navbar.classList.remove('hide');
      navbar.classList.add('show');
    });
  }

  // Nếu dùng Bootstrap collapse, lắng nghe sự kiện để tắt bật logic khi menu mở/đóng
  if (collapse) {
    // Khi menu mobile mở -> đảm bảo navbar hiện
    collapse.addEventListener('shown.bs.collapse', function () {
      navbar.classList.remove('hide');
      navbar.classList.add('show');
    });
    // Khi đóng -> cập nhật lastScrollY để tránh nhảy
    collapse.addEventListener('hidden.bs.collapse', function () {
      lastScrollY = window.scrollY || 0;
    });
  }

  // Khi resize: nếu chuyển qua mobile thì hiện navbar; update lastScrollY
  window.addEventListener('resize', function () {
    if (!isDesktop()) {
      navbar.classList.remove('hide');
      navbar.classList.add('show');
    }
    lastScrollY = window.scrollY || 0;
  });
});

// Bang info nha
