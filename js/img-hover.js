// Khi scroll tới vùng hotspot → thêm class 'active' để bắt đầu wiggle
// window.addEventListener("scroll", () => {
//   const hotspots = document.querySelectorAll(".hotspot");
//   const triggerBottom = window.innerHeight * 0.9;

//   hotspots.forEach(hs => {
//     const rect = hs.getBoundingClientRect();
//     if (rect.top < triggerBottom) {
//       hs.classList.add("active");
//     } else {
//       hs.classList.remove("active");
//     }
//   });
// });

// // Wiggle animation bằng JS (mượt và tự nhiên)
// setInterval(() => {
//   document.querySelectorAll(".hotspot.active i").forEach(icon => {
//     icon.animate(
//       [
//         { transform: "rotate(0deg)" },
//         { transform: "rotate(-5deg)" },
//         { transform: "rotate(5deg)" },
//         { transform: "rotate(0deg)" }
//       ],
//       {
//         duration: 1000,
//         iterations: 1,
//         easing: "ease-in-out"
//       }
//     );
//   });
// }, 2000);

// // Lightbox hiển thị khi click
// const hotspots = document.querySelectorAll(".hotspot");
// const lightbox = document.getElementById("lightbox");
// const closeBtn = document.getElementById("close-lightbox");

// hotspots.forEach(hs => {
//   hs.addEventListener("click", () => {
//     const title = hs.dataset.title;
//     const desc = hs.dataset.desc;
//     document.getElementById("lightbox-title").textContent = title;
//     document.getElementById("lightbox-desc").textContent = desc;
//     lightbox.classList.add("active");
//   });
// });

// 
function setupInfoSection() {
  const items = document.querySelectorAll(".info-item");
  const images = document.querySelectorAll(".info-image");

  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      // Gỡ active cũ
      items.forEach(i => i.classList.remove("active"));
      images.forEach(img => img.classList.remove("active"));

      // Thêm active mới
      item.classList.add("active");
      images[index].classList.add("active");
    });
  });
}

document.addEventListener("DOMContentLoaded", setupInfoSection);
