// ── HELPERS ──────────────────────────────────────────────────
const el  = id  => document.getElementById(id);
const qs  = sel => document.querySelector(sel);
const qsa = sel => document.querySelectorAll(sel);

const setText  = (sel, val) => { const e = qs(sel); if (e) e.textContent = val; };
const setHTML  = (sel, val) => { const e = qs(sel); if (e) e.innerHTML   = val; };
const setAttr  = (sel, attr, val) => { const e = qs(sel); if (e) e.setAttribute(attr, val); };

// ── TEMPLATES ────────────────────────────────────────────────

const navTemplate = link =>
  `<li><a href="${link.href}"${link.active ? ' class="nav-active"' : ''}>${link.label}</a></li>`;

const statTemplate = s => `
  <div class="stat-item">
    <i class="ti ${s.icon}" aria-hidden="true"></i>
    <div class="stat-title">${s.title}</div>
    <div class="stat-text">${s.text}</div>
  </div>`;

const expertiseTemplate = b => `
  <div class="expertise-block">
    <div class="expertise-block__head">
      <i class="ti ${b.icon}" aria-hidden="true"></i>
      <h3>${b.title}</h3>
    </div>
    <ul>${b.items.map(item => `<li>${item}</li>`).join('')}</ul>
  </div>`;

const faqTemplate = (item, i) => `
  <div class="faq-item" id="faq-${i}">
    <button class="faq-q" aria-expanded="false" aria-controls="faq-a-${i}">
      <span>${item.q}</span>
      <i class="ti ti-chevron-down" aria-hidden="true"></i>
    </button>
    <div class="faq-a" id="faq-a-${i}" hidden>
      <p>${item.a}</p>
    </div>
  </div>`;

const refTemplate = l =>
  `<div class="ref-logo">${l.html}</div>`;

// ── RENDER FUNCTIONS ──────────────────────────────────────────

function renderNav() {
  const overlayLinks = qs('.nav-overlay__links');
  if (overlayLinks) {
    setHTML('.nav-overlay__links', CONTENT.nav.links.map(navTemplate).join(''));
  }

  setText('.nav-name',  CONTENT.nav.name);
  setText('.nav-title', CONTENT.nav.title);
  setHTML('.nav-links', CONTENT.nav.links.map(navTemplate).join(''));
}

function renderHero() {
  setText('.hero-eyebrow',          CONTENT.hero.eyebrow);
  setHTML('.hero-title',            CONTENT.hero.headline);
  setText('.hero-sub',              CONTENT.hero.subline);
  setText('.hero-text',             CONTENT.hero.text);
  setText('.photo-placeholder__label', CONTENT.photo.placeholder);
  const btns = qsa('.hero-btns .btn');
  btns[0].textContent = CONTENT.hero.btn_primary;
  btns[1].textContent = CONTENT.hero.btn_secondary;
}

function renderStats() {
  setHTML('.grid--stats', CONTENT.stats.map(statTemplate).join(''));
}

function renderAbout() {
  setText('.section--about .section-eyebrow', CONTENT.about.eyebrow);
  setHTML('.section--about .section-title',   CONTENT.about.headline);
  setText('#about-expand p',                  CONTENT.about.expand);
}

function renderExpertise() {
  setText('.section--expertise .section-eyebrow', CONTENT.expertise.eyebrow);
  setText('.section--expertise .section-title',   CONTENT.expertise.headline);
  setHTML('.grid--expertise', CONTENT.expertise.blocks.map(expertiseTemplate).join(''));
}

function renderFaq() {
  setText('.section--faq .section-eyebrow', CONTENT.faq.eyebrow);
  setHTML('.faq-list', CONTENT.faq.items.map(faqTemplate).join(''));
}

function renderReferenzen() {
  setText('.section--referenzen .section-eyebrow', CONTENT.referenzen.eyebrow);
  setText('.section--referenzen .section-title',   CONTENT.referenzen.headline);
  setHTML('.grid--referenzen', CONTENT.referenzen.logos.map(refTemplate).join(''));
}

function renderKontakt() {
  setText('.section--kontakt .section-eyebrow', CONTENT.kontakt.eyebrow);
  setText('.kontakt-title',                     CONTENT.kontakt.headline);
  setText('.kontakt-text',                      CONTENT.kontakt.text);
  setText('.form-label--name',                  CONTENT.form.label_name);
  setText('.form-label--email',                 CONTENT.form.label_email);
  setText('.form-label--message',               CONTENT.form.label_message);
  setAttr('.form-input--name',                  'placeholder', CONTENT.form.placeholder_name);
  setAttr('.form-input--email',                 'placeholder', CONTENT.form.placeholder_email);
  setAttr('.form-input--message',               'placeholder', CONTENT.form.placeholder_message);
  setText('.form-submit',                       CONTENT.form.submit);
}

function renderFooter() {
  setText('.footer-copy',             CONTENT.footer.copy);
  setText('.footer-location',         CONTENT.footer.location);
  setText('.footer-link--impressum',  CONTENT.footer.impressum);
  setText('.footer-link--datenschutz', CONTENT.footer.datenschutz);
}

// ── INIT FUNCTIONS ────────────────────────────────────────────

function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  qsa('.reveal').forEach(el => observer.observe(el));
}

function initExpand() {
  const expandContent = el('about-expand');
  if (!expandContent) return;
  expandContent.removeAttribute('hidden');
  expandContent.classList.add('open');
}

function initFaq() {
  const list = qs('.faq-list');
  if (!list) return;
  list.addEventListener('click', e => {
    const btn = e.target.closest('.faq-q');
    if (!btn) return;
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    qsa('.faq-q').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.setAttribute('hidden', '');
      b.nextElementSibling.classList.remove('open');
    });
    if (!isExpanded) {
      btn.setAttribute('aria-expanded', 'true');
      btn.nextElementSibling.removeAttribute('hidden');
      btn.nextElementSibling.classList.add('open');
    }
  });
}

// ── BOOT ─────────────────────────────────────────────────────

function boot() {
  renderNav();
  renderHero();
  renderStats();
  renderAbout();
  renderExpertise();
  renderFaq();
  renderReferenzen();
  renderKontakt();
  renderFooter();
  initReveal();
  initHamburger();
  initExpand();
  initFaq();
}

boot();

function initHamburger() {
  const btn     = qs('.nav-hamburger');
  const overlay = qs('.nav-overlay');
  const close   = qs('.nav-overlay__close');
  if (!btn || !overlay) return;

  btn.addEventListener('click', () => {
    const isOpen = overlay.classList.toggle('open');
    overlay.setAttribute('aria-hidden', String(!isOpen));
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  const closeOverlay = () => {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
  };

  if (close) close.addEventListener('click', closeOverlay);

  overlay.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', closeOverlay)
  );
}
