// Enhanced interactions: header on scroll, smooth anchor, back-to-top, filters, lightbox
document.addEventListener('DOMContentLoaded', () => {
  // Year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Header shadow on scroll
  const header = document.getElementById('site-header');
  function checkScroll(){
    if (window.scrollY > 40) header.classList.add('scrolled'); else header.classList.remove('scrolled');
  }
  checkScroll();
  window.addEventListener('scroll', checkScroll);

  // Mobile nav
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
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

  // Back to top
  const back = document.getElementById('back-to-top');
  function checkBack(){ if (window.scrollY > 400) back.classList.add('show'); else back.classList.remove('show'); }
  window.addEventListener('scroll', checkBack);
  back?.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

  // Lightbox
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

  document.querySelectorAll('.card img').forEach((img) => {
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

  // Smooth scroll for internal links (improve offset for sticky header)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if (href.length === 1) return; // skip # links
      const el = document.querySelector(href);
      if (el){
        e.preventDefault();
        const top = el.getBoundingClientRect().top + window.scrollY - 70; // header offset
        window.scrollTo({top,behavior:'smooth'});
      }
    });
  });
});
