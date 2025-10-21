document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const newsId = params.get("id");

  const titleEl = document.getElementById("news-title");
  const dateEl = document.getElementById("news-date");
  const imageEl = document.getElementById("news-image");
  const bodyEl = document.getElementById("news-body");

  if (!newsId) {
    titleEl.textContent = "Không tìm thấy bài viết.";
    return;
  }

  try {
    const response = await fetch("./data/news-data.json");
    if (!response.ok) throw new Error("Không tải được dữ liệu JSON.");

    const data = await response.json();
    const article = data.find(item => item.id === newsId);

    if (!article) {
      titleEl.textContent = "Bài viết không tồn tại.";
      return;
    }

    // Gán dữ liệu vào HTML
    titleEl.textContent = article.title;
    dateEl.textContent = `Ngày đăng: ${article.date}`;
    if (article.image) {
      imageEl.src = article.image;
      imageEl.classList.remove("d-none");
    }
    bodyEl.innerHTML = article.content;

  } catch (error) {
    console.error("Lỗi:", error);
    titleEl.textContent = "Lỗi khi tải nội dung bài viết.";
  }
});
