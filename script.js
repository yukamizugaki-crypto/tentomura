// ==============================
//  居酒屋テント村 - script.js
// ==============================

// ---- ハンバーガーメニュー ----
const hamburger = document.getElementById('hamburger');
const siteNav   = document.getElementById('site-nav');

hamburger.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
});

// ナビリンクをクリックしたらメニューを閉じる
siteNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-label', 'メニューを開く');
  });
});

// ---- スクロールイベント ----
const backToTop  = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  // ページトップボタン表示
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // ヘッダーにスクロールクラス
  const header = document.querySelector('.site-header');
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ---- フェードインアニメーション ----
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// アニメーションターゲットを設定
const animTargets = document.querySelectorAll(
  '.about-card, .event-card, .gallery-item, .info-table-wrap, .map-wrap, .bigmsg-inner, .reserve-text, .instagram-placeholder-item'
);

animTargets.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(32px)';
  el.style.transition = `opacity 0.6s ${i * 0.07}s ease, transform 0.6s ${i * 0.07}s ease`;
  observer.observe(el);
});

// in-view スタイル適用
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .in-view {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  </style>
`);

// ---- スムーズスクロール補完（header分オフセット） ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#' || href === '#top') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const headerH = document.querySelector('.site-header').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
