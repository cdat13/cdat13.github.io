function setupInfoSection() {
  const items = document.querySelectorAll(".info-item");
  const images = document.querySelectorAll(".info-image");
  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      items.forEach(i => i.classList.remove("active"));
      images.forEach(img => img.classList.remove("active"));
      item.classList.add("active");
      images[index].classList.add("active");
    });
  });
}
document.addEventListener("DOMContentLoaded", setupInfoSection);
