// JS: mobile nav, filters, simple lightbox, year
document.addEventListener('DOMContentLoaded', () => {
  // Year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Mobile nav
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  });

  // Filters
  const filters = document.querySelectorAll('.project-filters button');
  const posts = document.querySelectorAll('.masonry .card');
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    posts.forEach(p => {
      const cat = p.dataset.category || 'all';
      p.style.display = (f === 'all' || cat === f) ? 'inline-block' : 'none';
    });
  }));

  // Lightbox
  const galleryImgs = Array.from(document.querySelectorAll('.card img'));
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox?.querySelector('.lb-content img');
  const closeBtn = lightbox?.querySelector('.lb-close');
  const prevBtn = lightbox?.querySelector('.lb-prev');
  const nextBtn = lightbox?.querySelector('.lb-next');
  let visibleImgs = [];
  let idx = 0;

  function open(i){
    visibleImgs = Array.from(document.querySelectorAll('.masonry .card img')).filter(img => img.closest('.card') && img.closest('.card').style.display !== 'none');
    idx = i;
    const src = visibleImgs[idx]?.dataset.full || visibleImgs[idx]?.src;
    if (!src) return;
    lbImg.src = src;
    lightbox.setAttribute('aria-hidden','false');
  }
  function close(){ lightbox.setAttribute('aria-hidden','true'); lbImg.src = ''; }

  document.querySelectorAll('.card img').forEach((img, i) => {
    img.addEventListener('click', (e) => { e.preventDefault(); const all = Array.from(document.querySelectorAll('.card img')); open(all.indexOf(img)); });
  });
  closeBtn?.addEventListener('click', close);
  lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  prevBtn?.addEventListener('click', () => { if (!visibleImgs.length) return; idx = (idx - 1 + visibleImgs.length) % visibleImgs.length; lbImg.src = visibleImgs[idx].dataset.full || visibleImgs[idx].src; });
  nextBtn?.addEventListener('click', () => { if (!visibleImgs.length) return; idx = (idx + 1) % visibleImgs.length; lbImg.src = visibleImgs[idx].dataset.full || visibleImgs[idx].src; });

  document.addEventListener('keydown', (e) => {
    if (lightbox?.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prevBtn?.click();
      if (e.key === 'ArrowRight') nextBtn?.click();
    }
  });
});
