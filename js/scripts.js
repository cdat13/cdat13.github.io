/*
* Start Bootstrap - Modern Business v5.0.7 (https://startbootstrap.com/template-overviews/modern-business)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-modern-business/blob/master/LICENSE)
*/


// Auto number
let valueDisplays = document.querySelectorAll(".num");
let interval = 2500;

function startCounting() {
  valueDisplays.forEach((valueDisplay) => {
    // Nếu đã chạy rồi thì bỏ qua (tránh đếm lại khi scroll lên xuống)
    if (valueDisplay.dataset.counted === "true") return;

    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"));
    let stepTime = Math.max(Math.floor(interval / endValue), 10);
    let increment = Math.ceil(endValue / (interval / stepTime));

    valueDisplay.dataset.counted = "true"; // đánh dấu đã đếm
    let counter = setInterval(() => {
      startValue += increment;
      if (startValue >= endValue) {
        startValue = endValue;
        clearInterval(counter);
      }
      valueDisplay.textContent = startValue.toLocaleString();
    }, stepTime);
  });
}

// 🔹 Sử dụng Intersection Observer
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounting();
        observer.disconnect(); // Ngắt luôn sau khi chạy lần đầu
      }
    });
  },
  {
    threshold: 0.3, // chạy khi 30% phần tử hiện ra màn hình
  }
);

// Quan sát phần container cha (hoặc 1 .section cụ thể)
const section = document.querySelector(".counter-section") || valueDisplays[0]?.parentElement;
if (section) observer.observe(section);


// Scroll smoother
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
  if (!navbar) return;

  const toggler = document.querySelector('.navbar-toggler');
  const collapse = document.getElementById('navbarSupportedContent');

  // Hiển thị mặc định
  navbar.classList.add('show');
  navbar.classList.remove('hide');

  let lastScrollY = window.scrollY || 0;
  let ticking = false;

  function onScroll() {
    const current = window.scrollY || 0;

    // Không xử lý nếu đang cuộn rất ít
    if (Math.abs(current - lastScrollY) < 5) return;

    // Nếu menu đang mở (mobile) → không ẩn
    if (collapse && collapse.classList.contains('show')) {
      lastScrollY = current;
      return;
    }

    if (current > lastScrollY && current > 80) {
      // Cuộn xuống → ẩn navbar
      navbar.classList.remove('show');
      navbar.classList.add('hide');
    } else {
      // Cuộn lên → hiện navbar
      navbar.classList.remove('hide');
      navbar.classList.add('show');
    }

    lastScrollY = current;
  }

  // Dùng requestAnimationFrame để mượt
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Khi click nút hamburger → luôn hiện
  if (toggler) {
    toggler.addEventListener('click', function () {
      navbar.classList.remove('hide');
      navbar.classList.add('show');
    });
  }

  // Khi menu Bootstrap đóng / mở
  if (collapse) {
    collapse.addEventListener('shown.bs.collapse', () => {
      navbar.classList.add('show');
      navbar.classList.remove('hide');
    });
    collapse.addEventListener('hidden.bs.collapse', () => {
      lastScrollY = window.scrollY || 0;
    });
  }

  // Khi resize → không reset gì đặc biệt, vẫn giữ behavior chung
});

// Timeline js
document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".timeline-item");
  const panels = document.querySelectorAll(".timeline-panel");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      // Remove active
      items.forEach((i) => i.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));

      // Activate new
      item.classList.add("active");
      const year = item.getAttribute("data-year");
      document.getElementById(`year-${year}`).classList.add("active");
    });
  });
});

//terminal 
document.querySelectorAll(".terminal-section").forEach(section => {
  const toggleBtn = section.querySelector(".toggle-btn");
  const featureContent = section.querySelector(".terminal-feature");
  const hr = section.querySelector("hr"); //

  toggleBtn.addEventListener("click", () => {
    featureContent.classList.toggle("open");
    const isOpen = featureContent.classList.contains("open");

    toggleBtn.innerHTML = isOpen ? "Ẩn bớt ▴" : "Xem chi tiết ▾";
    if (hr) hr.style.display = isOpen ? "none" : "block";
  });
});

// slider ne
document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.blog-slide');
  const prevBtn = document.querySelector('.btn-slide.prev');
  const nextBtn = document.querySelector('.btn-slide.next');
  const dotsContainer = document.querySelector('.slider-dots');
  let current = 0;

  // Tạo dots
  slides.forEach((slide, i) => {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      current = i;
      showSlide(current);
    });
    dotsContainer.appendChild(dot);
  });

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    // update dots
    const dots = dotsContainer.querySelectorAll('button');
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  // Nút điều hướng (desktop)
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      current = (current === 0) ? slides.length - 1 : current - 1;
      showSlide(current);
    });

    nextBtn.addEventListener('click', () => {
      current = (current === slides.length - 1) ? 0 : current + 1;
      showSlide(current);
    });
  }

  showSlide(current);
});

// Active nav
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
});

// Scroll down button
document.getElementById("scrollDownBtn").addEventListener("click", function () {
  const nextSection = document.querySelector(".hero-section").nextElementSibling;
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: "smooth" });
  }
});

// Pop up email button
document.getElementById("contactBtn").addEventListener("click", function () {
  const popup = document.getElementById("emailPopup");
  popup.style.display = popup.style.display === "block" ? "none" : "block";
});

// Pop up email button: Click ra ngoài để ẩn popup
document.addEventListener("click", function (e) {
  const popup = document.getElementById("emailPopup");
  const btn = document.getElementById("contactBtn");
  if (!popup.contains(e.target) && !btn.contains(e.target)) {
    popup.style.display = "none";
  }
});


// Invest logo
const slider = document.querySelector(".logo-slider");

const track = document.querySelector(".logo-track");
const logos = Array.from(track.children);

logos.forEach((logo) => {
  const clone = logo.cloneNode(true);
  track.appendChild(clone);
});

// Pause animation on hover
slider.addEventListener("mouseover", function () {
  document.querySelector(".logo-track").style.animationPlayState =
    "paused";
});

// Resume animation when hover ends
slider.addEventListener("mouseout", function () {
  document.querySelector(".logo-track").style.animationPlayState =
    "running";
});