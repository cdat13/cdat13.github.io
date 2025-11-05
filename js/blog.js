document.addEventListener("DOMContentLoaded", () => {
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));
  const pagination = $('#blogPagination');
  const itemsPerPage = 6; //Chinh so bai o day!!!
  let currentPage = 1;
  const blogContainer = $('#blogContainer');
  if (!blogContainer || !pagination) return;
  const blogItems = $$('#blogContainer .blog-item');
  const totalPages = Math.ceil(blogItems.length / itemsPerPage) || 1;
  function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    blogItems.forEach((item, i) => {
      item.style.display = (i >= start && i < end) ? 'block' : 'none';
    });
    $$('#blogPagination button').forEach(btn => btn.classList.remove('active'));
    const activeBtn = pagination.querySelector(`button[data-page="${page}"]`);
    if (activeBtn) activeBtn.classList.add('active');
  }
  function setupPagination() {
    if (totalPages <= 1) {
      pagination.style.display = 'none';
      blogItems.forEach(it => (it.style.display = 'block'));
      return;
    }
    pagination.innerHTML = '';
    pagination.style.display = 'flex';
    pagination.classList.add('pagination');
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.innerText = i;
      btn.dataset.page = i;
      btn.classList.add( 'mx-1', 'button'); 
      btn.addEventListener('click', () => {
        currentPage = i;
        showPage(currentPage);
      });
      pagination.appendChild(btn);
    }
    showPage(1);
  }
  setupPagination();
});
document.querySelectorAll(".blog-slide, .blog-item").forEach((el) => {
  el.style.cursor = "pointer";
  el.addEventListener("mouseenter", () => {
    el.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    el.style.transform = "translateY(-4px)";
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
  });
  el.addEventListener("click", () => {
    const link = el.querySelector("a")?.getAttribute("href") || "#";
    if (link && link !== "#") {
      window.location.href = link;
    }
  });
});
