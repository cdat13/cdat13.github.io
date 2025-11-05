document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.getAttribute("data-tab");
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content2").forEach(c => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));
  const imgs = $$('.media-item img');
  const lightbox = $('#lightbox');
  const lightboxImg = $('#lightbox-img');
  const closeBtn = lightbox ? lightbox.querySelector('.close') : null;

  if (imgs.length && lightbox && lightboxImg && closeBtn) {
    imgs.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.currentSrc || img.src || img.dataset.src || '';
        lightbox.style.display = 'block';
      });
    });
    closeBtn.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.style.display = 'none';
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.style.display === 'block') {
        lightbox.style.display = 'none';
      }
    });
  } else {
    console.warn('Lightbox skipped - missing elements:', {
      images: imgs.length,
      lightbox: !!lightbox,
      lightboxImg: !!lightboxImg,
      closeBtn: !!closeBtn
    });
  }
  const pagination = $('#pagination');
  const itemsPerPage = 3;
  let currentPage = 1;
  function setupPagination() {
    const activeTab = document.querySelector('.tab-content2.active');
    if (!activeTab) return;
    const items = Array.from(activeTab.querySelectorAll('.media-item'));
    const pageCount = Math.ceil(items.length / itemsPerPage) || 1;
    if (pageCount <= 1) {
      pagination.style.display = 'none';
      items.forEach(it => (it.style.display = 'block'));
      return;
    }
    pagination.innerHTML = '';
    pagination.style.display = 'flex';
    for (let i = 1; i <= pageCount; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.innerText = i;
      btn.dataset.page = i;
      btn.addEventListener('click', () => {
        currentPage = i;
        showPage(currentPage);
      });
      pagination.appendChild(btn);
    }
    showPage(1);
    function showPage(page) {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      items.forEach((it, i) => {
        it.style.display = (i >= start && i < end) ? 'block' : 'none';
      });
      $$('.pagination button').forEach(b => b.classList.remove('active'));
      const activeBtn = document.querySelector(`.pagination button[data-page="${page}"]`);
      if (activeBtn) activeBtn.classList.add('active');
    }
  }
  setupPagination();
  $$('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab;
      $$('.tab, .tab-content2').forEach(el => el.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(targetId).classList.add('active');
      setupPagination();
    });
  });
});
