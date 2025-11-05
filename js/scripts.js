/*
* Start Bootstrap - Modern Business v5.0.7 (https://startbootstrap.com/template-overviews/modern-business)
* Refactored to IIFE modules + safety checks
*/
/* ===== Auto number (counter) ===== */
(() => {
  try {
    const valueDisplays = document.querySelectorAll(".num");
    if (!valueDisplays || valueDisplays.length === 0) return;
    const interval = 2500;
    function startCounting() {
      valueDisplays.forEach((valueDisplay) => {
        if (valueDisplay.dataset.counted === "true") return;

        let startValue = 0;
        let endValue = parseInt(valueDisplay.getAttribute("data-val")) || 0;
        if (endValue <= 0) {
          valueDisplay.textContent = "0";
          valueDisplay.dataset.counted = "true";
          return;
        }
        let stepTime = Math.max(Math.floor(interval / endValue), 10);
        let increment = Math.ceil(endValue / (interval / stepTime));

        valueDisplay.dataset.counted = "true";
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
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounting();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    const section = document.querySelector(".counter-section") || valueDisplays[0].parentElement;
    if (section) observer.observe(section);
  } catch (err) {
    console.warn("Counter module error:", err);
  }
})();
/* ===== Scroll smoother (slider auto scroll) ===== */
(() => {
  try {
    document.addEventListener("DOMContentLoaded", function () {
      const slider = document.querySelector(".slider");
      const slides = slider ? slider.querySelectorAll("img") : [];
      if (!slider || slides.length === 0) return;
      let index = 0;
      const slideCount = slides.length;
      setInterval(() => {
        index = (index + 1) % slideCount;
        slider.scrollTo({
          left: index * slider.clientWidth,
          behavior: "smooth"
        });
      }, 4000);
    });
  } catch (err) {
    console.warn("Slider auto-scroll module error:", err);
  }
})();
/* ===== Section plan observe ===== */
(() => {
  try {
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
  } catch (err) {
    console.warn("Section plan module error:", err);
  }
})();
/* ===== HR Animation observe ===== */
(() => {
  try {
    document.addEventListener("DOMContentLoaded", function () {
      const hrs = document.querySelectorAll(".hr-animate");
      if (!hrs || hrs.length === 0) return;
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
  } catch (err) {
    console.warn("HR animation module error:", err);
  }
})();
/* ===== Plan desc scroll up (paragraphs sequential reveal) ===== */
(() => {
  try {
    document.addEventListener("DOMContentLoaded", function () {
      const paragraphs = document.querySelectorAll(".plan-desc");
      if (!paragraphs || paragraphs.length === 0) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Use dataset index if present, fallback to nodeIndex
            const idx = Array.from(paragraphs).indexOf(entry.target) || 0;
            entry.target.style.transitionDelay = `${idx * 0.15}s`;
            entry.target.classList.add("visible");
          }
        });
      }, { threshold: 0.2 });
      paragraphs.forEach(p => observer.observe(p));
    });
  } catch (err) {
    console.warn("Plan desc module error:", err);
  }
})();
/* ===== Navbar hide/show on scroll ===== */
(() => {
  try {
    document.addEventListener('DOMContentLoaded', function () {
      const navbar = document.getElementById('mainNav');
      if (!navbar) return;
      const toggler = document.querySelector('.navbar-toggler');
      const collapse = document.getElementById('navbarSupportedContent');
      navbar.classList.add('show');
      navbar.classList.remove('hide');
      let lastScrollY = window.scrollY || 0;
      let ticking = false;
      function onScroll() {
        const current = window.scrollY || 0;
        if (Math.abs(current - lastScrollY) < 5) return;
        if (collapse && collapse.classList.contains('show')) {
          lastScrollY = current;
          return;
        }
        if (current > lastScrollY && current > 80) {
          navbar.classList.remove('show');
          navbar.classList.add('hide');
        } else {
          navbar.classList.remove('hide');
          navbar.classList.add('show');
        }
        lastScrollY = current;
      }
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            onScroll();
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
      if (toggler) {
        toggler.addEventListener('click', function () {
          navbar.classList.remove('hide');
          navbar.classList.add('show');
        });
      }
      if (collapse) {
        collapse.addEventListener('shown.bs.collapse', () => {
          navbar.classList.add('show');
          navbar.classList.remove('hide');
        });
        collapse.addEventListener('hidden.bs.collapse', () => {
          lastScrollY = window.scrollY || 0;
        });
      }
    });
  } catch (err) {
    console.warn("Navbar module error:", err);
  }
})();
/* ===== Timeline click to activate ===== */
(() => {
  try {
    document.addEventListener("DOMContentLoaded", function () {
      const items = document.querySelectorAll(".timeline-item");
      const panels = document.querySelectorAll(".timeline-panel");
      if (!items || items.length === 0) return;

      items.forEach((item) => {
        item.addEventListener("click", () => {
          items.forEach((i) => i.classList.remove("active"));
          panels.forEach((p) => p.classList.remove("active"));

          item.classList.add("active");
          const year = item.getAttribute("data-year");
          if (year) {
            const target = document.getElementById(`year-${year}`);
            if (target) target.classList.add("active");
          }
        });
      });
    });
  } catch (err) {
    console.warn("Timeline module error:", err);
  }
})();
/* ===== Terminal toggle sections ===== */
(() => {
  try {
    document.addEventListener("DOMContentLoaded", function () {
      const sections = document.querySelectorAll(".terminal-section");
      if (!sections || sections.length === 0) return;

      sections.forEach(section => {
        const toggleBtn = section.querySelector(".toggle-btn");
        const featureContent = section.querySelector(".terminal-feature");
        const hr = section.querySelector("hr");
        if (!toggleBtn || !featureContent) return;
        toggleBtn.addEventListener("click", () => {
          featureContent.classList.toggle("open");
          const isOpen = featureContent.classList.contains("open");
          toggleBtn.innerHTML = isOpen ? "Ẩn bớt ▴" : "Xem chi tiết ▾";
          if (hr) hr.style.display = isOpen ? "none" : "block";
        });
      });
    });
  } catch (err) {
    console.warn("Terminal module error:", err);
  }
})();
/* ===== Blog slider (dots + prev/next) ===== */
(() => {
  try {
    document.addEventListener('DOMContentLoaded', function () {
      const slides = document.querySelectorAll('.blog-slide');
      const dotsContainer = document.querySelector('.slider-dots');
      if (!slides || slides.length === 0 || !dotsContainer) {
        // If no slides or no dots container, simply return
        return;
      }

      const prevBtn = document.querySelector('.btn-slide.prev');
      const nextBtn = document.querySelector('.btn-slide.next');

      let current = 0;
      const slideCount = slides.length;

      // create dots safely
      slides.forEach((slide, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
          current = i;
          showSlide(current);
        });
        dotsContainer.appendChild(dot);
      });

      function showSlide(index) {
        slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
        const dots = dotsContainer.querySelectorAll('button');
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
      }

      if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
          current = (current === 0) ? slideCount - 1 : current - 1;
          showSlide(current);
        });

        nextBtn.addEventListener('click', () => {
          current = (current === slideCount - 1) ? 0 : current + 1;
          showSlide(current);
        });
      }

      showSlide(current);
    });
  } catch (err) {
    console.warn("Blog slider module error:", err);
  }
})();
/* ===== Active nav highlighting ===== */
(() => {
  try {
    document.addEventListener("DOMContentLoaded", function () {
      const currentPage = window.location.pathname.split("/").pop();
      const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
      if (!navLinks || navLinks.length === 0) return;
      navLinks.forEach(link => {
        try {
          const href = link.getAttribute("href");
          if (href === currentPage) link.classList.add("active");
        } catch (e) {
        }
      });
    });
  } catch (err) {
    console.warn("Active nav module error:", err);
  }
})();
/* ===== Scroll down button ===== */
(() => {
  try {
    const scrollBtn = document.getElementById("scrollDownBtn");
    if (!scrollBtn) return;

    scrollBtn.addEventListener("click", function () {
      const hero = document.querySelector(".hero-section");
      const nextSection = hero ? hero.nextElementSibling : null;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  } catch (err) {
    console.warn("Scroll down module error:", err);
  }
})();
/* ===== Pop up email button (contactBtn) ===== */
(() => {
  try {
    const contactBtn = document.getElementById("contactBtn");
    const emailPopup = document.getElementById("emailPopup");
    if (contactBtn && emailPopup) {
      // prevent click from bubbling to document when toggling
      contactBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        emailPopup.style.display = emailPopup.style.display === "block" ? "none" : "block";
      });
      document.addEventListener("click", function (e) {
        // re-get elements in case DOM changes
        const popup = document.getElementById("emailPopup");
        const btn = document.getElementById("contactBtn");
        if (!popup || !btn) return;
        if (!popup.contains(e.target) && !btn.contains(e.target)) {
          popup.style.display = "none";
        }
      });
    }
  } catch (err) {
    console.warn("Contact popup module error:", err);
  }
})();
/* ===== Invest logo auto-scroll + hover pause ===== */
(() => {
  try {
    const slider = document.querySelector(".logo-slider");
    const track = document.querySelector(".logo-track");
    if (!slider || !track) return;

    const logos = Array.from(track.children);
    logos.forEach((logo) => {
      try {
        const clone = logo.cloneNode(true);
        track.appendChild(clone);
      } catch (e) { }
    });
    slider.addEventListener("mouseover", function () {
      const t = document.querySelector(".logo-track");
      if (t) t.style.animationPlayState = "paused";
    });
    slider.addEventListener("mouseout", function () {
      const t = document.querySelector(".logo-track");
      if (t) t.style.animationPlayState = "running";
    });
  } catch (err) {
    console.warn("Invest logo module error:", err);
  }
})();
