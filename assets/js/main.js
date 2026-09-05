// Prosty JS: filtry galerii, lightbox, menu mobilne, year
document.addEventListener('DOMContentLoaded', () => {
  // Year in footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Mobile menu toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  navToggle?.addEventListener('click', () => {
    if (!nav) return;
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  });

  // Gallery filtering
  const filters = document.querySelectorAll('.filters button');
  const items = document.querySelectorAll('.gallery-item');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      items.forEach(i => {
        const cat = i.dataset.category || 'all';
        i.style.display = (f === 'all' || cat === f) ? '' : 'none';
      });
    });
  });

  // Lightbox
  const gallery = document.getElementById('gallery');
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox?.querySelector('.lb-content img');
  const closeBtn = lightbox?.querySelector('.lb-close');
  const prevBtn = lightbox?.querySelector('.lb-prev');
  const nextBtn = lightbox?.querySelector('.lb-next');
  let galleryImgs = [];
  let current = 0;

  function openLightbox(index){
    galleryImgs = Array.from(document.querySelectorAll('.gallery-item img'))
      .filter(i => i.closest('.gallery-item') && i.closest('.gallery-item').style.display !== 'none');
    current = index;
    const img = galleryImgs[current];
    if (!img) return;
    const full = img.dataset.full || img.src;
    lbImg.src = full;
    lightbox.setAttribute('aria-hidden','false');
  }
  function closeLightbox(){ lightbox.setAttribute('aria-hidden','true'); lbImg.src = ''; }

  gallery?.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (!img) return;
    const all = Array.from(document.querySelectorAll('.gallery-item img'))
    const idx = all.indexOf(img);
    openLightbox(idx);
  });

  closeBtn?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  prevBtn?.addEventListener('click', () => {
    if (!galleryImgs.length) return;
    current = (current - 1 + galleryImgs.length) % galleryImgs.length;
    lbImg.src = galleryImgs[current].dataset.full || galleryImgs[current].src;
  });
  nextBtn?.addEventListener('click', () => {
    if (!galleryImgs.length) return;
    current = (current + 1) % galleryImgs.length;
    lbImg.src = galleryImgs[current].dataset.full || galleryImgs[current].src;
  });

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', (e) => {
    if (lightbox?.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevBtn?.click();
      if (e.key === 'ArrowRight') nextBtn?.click();
    }
  });
});
