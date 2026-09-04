// ── HELPERS ──────────────────────────────────────────────────
const el  = id  => document.getElementById(id);
const qs  = sel => document.querySelector(sel);
const qsa = sel => document.querySelectorAll(sel);

const setText = (sel, val) => { const e = qs(sel); if (e) e.textContent = val; };
const setHTML = (sel, val) => { const e = qs(sel); if (e) e.innerHTML   = val; };
const setAttr = (sel, attr, val) => { const e = qs(sel); if (e) e.setAttribute(attr, val); };

// ── TEMPLATES ────────────────────────────────────────────────

const navTemplate = link =>
  `<li><a href="${link.href}"${link.active ? ' class="is-active"' : ''}>${link.label}</a></li>`;

const statTemplate = s => `
  <div class="stat-item">
    <i class="ti ${s.icon}" aria-hidden="true"></i>
    <div class="stat-title">${s.title}</div>
    <div class="stat-text">${s.text}</div>
  </div>`;

const expertiseTemplate = b => `
  <div class="card card--orange-top">
    <div class="card-head">
      <i class="ti ${b.icon}" aria-hidden="true"></i>
      <h3>${b.title}</h3>
    </div>
    <ul class="list">${b.items.map(item => `<li>${item}</li>`).join('')}</ul>
  </div>`;

const faqTemplate = (item, i) => `
  <div class="card card--orange-top faq-item" id="faq-${i}">
    <button class="faq-q" aria-expanded="false" aria-controls="faq-a-${i}">
      <span>${item.q}</span>
      <i class="ti ti-chevron-down" aria-hidden="true"></i>
    </button>
    <div class="faq-a" id="faq-a-${i}">
      <p>${item.a}</p>
    </div>
  </div>`;

const refTemplate = l =>
  `<div class="card card--hover ref-logo">${l.html}</div>`;

// ── RENDER FUNCTIONS ──────────────────────────────────────────

function renderNav() {
  setText('.navbar__name',  CONTENT.nav.name);
  setText('.navbar__title', CONTENT.nav.title);
  setHTML('.navbar__links', CONTENT.nav.links.map(navTemplate).join(''));
  setHTML('.navbar__dropdown-links', CONTENT.nav.links.map(navTemplate).join(''));
}

function renderHero() {
  const hEyebrow = el('hero-eyebrow');
  const hTitle   = el('hero-title');
  const hSub     = el('hero-sub');
  const hText    = el('hero-text');
  const hBtnP    = el('hero-btn-primary');
  const hBtnS    = el('hero-btn-secondary');
  const hPhoto   = el('hero-photo-label');

  if (hEyebrow) hEyebrow.textContent = CONTENT.hero.eyebrow;
  if (hTitle)   hTitle.innerHTML     = CONTENT.hero.headline; 
  if (hSub)     hSub.textContent     = CONTENT.hero.subline;
  if (hText)    hText.textContent    = CONTENT.hero.text;
  if (hBtnP)    hBtnP.textContent    = CONTENT.hero.btn_primary;
  if (hBtnS)    hBtnS.textContent    = CONTENT.hero.btn_secondary;
  if (hPhoto)   hPhoto.textContent   = CONTENT.photo.placeholder;
}

function renderStats() {
  setHTML('.grid--stats', CONTENT.stats.map(statTemplate).join(''));
}

function renderAbout() {
  setText('.section--about .section-eyebrow', CONTENT.about.eyebrow);
  setHTML('.section--about .section-title',   CONTENT.about.headline);
  
  const fBorn = el('fact-born');
  const fExp  = el('fact-exp');
  const fCert = el('fact-cert');
  const fIt   = el('fact-it');
  const fKfm  = el('fact-kfm');
  const tPhil = el('about-text-philosophy');
  const tCred = el('about-text-credo');

  if (tPhil) tPhil.textContent = CONTENT.about.philosophy;
  if (tCred) tCred.textContent = CONTENT.about.credo;
  if (fBorn) fBorn.textContent = CONTENT.about.fact_born;
  if (fExp)  fExp.textContent  = CONTENT.about.fact_exp;
  if (fCert) fCert.textContent = CONTENT.about.fact_cert;
  if (fIt)   fIt.textContent   = CONTENT.about.fact_it;
  if (fKfm)  fKfm.textContent  = CONTENT.about.fact_kfm;
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
  setAttr('.form-input--name',    'placeholder', CONTENT.form.placeholder_name);
  setAttr('.form-input--email',   'placeholder', CONTENT.form.placeholder_email);
  setAttr('.form-input--message', 'placeholder', CONTENT.form.placeholder_message);
  setText('.form-submit',                       CONTENT.form.submit);
}

function renderFooter() {
  setText('.footer-copy',              CONTENT.footer.copy);
  setText('.footer-location',          CONTENT.footer.location);
  setText('.footer-link--impressum',   CONTENT.footer.impressum);
  setText('.footer-link--datenschutz', CONTENT.footer.datenschutz);
}

// ── INIT FUNCTIONS ────────────────────────────────────────────

function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  qsa('.reveal').forEach(el => observer.observe(el));
}

function initExpand() {
  const expandContent = el('about-expand');
  if (!expandContent) return;
  expandContent.removeAttribute('hidden');
  expandContent.classList.add('is-open');
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
      b.nextElementSibling.classList.remove('is-open');
    });
    
    if (!isExpanded) {
      btn.setAttribute('aria-expanded', 'true');
      btn.nextElementSibling.classList.add('is-open');
    }
  });
}

function initHamburger() {
  const btn      = qs('.navbar__hamburger');
  const dropdown = el('navbar-dropdown');
  if (!btn || !dropdown) return;

  btn.addEventListener('click', () => {
    const isOpen = dropdown.classList.toggle('is-open');
    dropdown.setAttribute('aria-hidden', String(!isOpen));
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  dropdown.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      dropdown.classList.remove('is-open');
      dropdown.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
    })
  );
}

// ── SUPABASE & DOKUMENTE MODAL LOGIK ──────────────────────────

const SUPABASE_URL = 'https://hepceceszvkblanffoju.supabase.co';
// HIER DEINEN VOLLSTÄNDIGEN PUBLISHABLE KEY EINFÜGEN:
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_FaQ7I0SgAHgj_E7aDGNx0Q_B7Ldw-WJ'; 

let supabaseClient = null;

function initDokumente() {
  if (typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  } else {
    console.error('Supabase SDK wurde nicht geladen.');
    return;
  }

  // Greift auf die Klasse aus deiner style.css zu
  const overlay = qs('.dokumente-overlay'); 
  const closeBtn = el('dokumente-close') || qs('.dokumente-overlay__close');
  const submitBtn = el('dokumente-submit');
  const tokenInput = el('dokumente-token') || qs('.dokumente-overlay__input');
  const errorMsg = el('dokumente-error') || qs('.dokumente-overlay__error');
  const tokenStep = el('token-step');
  const documentStep = el('document-step');
  const downloadBtn = el('download-btn');

  // Universal Klick-Handler für "DOKUMENTE"
  document.addEventListener('click', (e) => {
    const targetLink = e.target.closest('a');
    
    // Prüft Text, Klasse oder Ziel des Links
    const isDokumenteClick = 
      (targetLink && targetLink.textContent.trim().toUpperCase() === 'DOKUMENTE') ||
      (targetLink && targetLink.classList.contains('dropdown-dokumente')) ||
      (targetLink && targetLink.getAttribute('href') === '#dokumente');

    if (isDokumenteClick) {
      e.preventDefault();
      
      // Mobile Navbar schließen
      const dropdown = el('navbar-dropdown');
      if (dropdown) dropdown.classList.remove('is-open');

      // Overlay über die CSS-Klasse .is-open einblenden
      if (overlay) {
        overlay.classList.add('is-open');
      } else {
        console.error('Element .dokumente-overlay wurde im HTML nicht gefunden!');
      }
    }
  });

  // Schließen-Button
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (overlay) overlay.classList.remove('is-open');
    });
  }

  // Schließen beim Klick auf den dunklen Hintergrund
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('is-open');
      }
    });
  }

  // Absenden via Button
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const tokenVal = tokenInput ? tokenInput.value.trim() : '';
      if (!tokenVal) {
        if (errorMsg) errorMsg.innerText = 'Bitte geben Sie einen Token ein.';
        return;
      }
      verifyAndRedeemToken(tokenVal);
    });
  }

  // Automatischer Aufruf bei ?token=MESSE-XXX in der URL
  const urlParams = new URLSearchParams(window.location.search);
  const urlToken = urlParams.get('token');
  if (urlToken && overlay) {
    overlay.classList.add('is-open');
    if (tokenInput) tokenInput.value = urlToken;
    verifyAndRedeemToken(urlToken);
  }

  async function verifyAndRedeemToken(tokenVal) {
    if (!errorMsg || !submitBtn) return;

    errorMsg.innerText = '';
    submitBtn.innerText = 'Prüfe...';
    submitBtn.disabled = true;

    const { data: isValid, error } = await supabaseClient.rpc('redeem_token', { user_token: tokenVal });

    if (error || !isValid) {
      errorMsg.innerText = 'Dieser Token ist ungültig oder wurde bereits verwendet!';
      submitBtn.innerText = 'Freischalten';
      submitBtn.disabled = false;
      return;
    }

    /*const { data: fileData, error: fileError } = await supabaseClient
      .storage
      .from('geschuetzte-dokumente')
      .createSignedUrl('Dokumente_MSchriever.pdf', 60);

    if (fileError) {
      errorMsg.innerText = 'Fehler beim Laden des Dokuments.';
      submitBtn.innerText = 'Freischalten';
      submitBtn.disabled = false;
      return;
    }*/

    //Temporär zu Testzwecken, danach wieder löschen//
// Ändere 'messeseite_dokument.pdf' zu 'Dokumente_MSchriever.pdf'
const { data: fileData, error: fileError } = await supabaseClient
  .storage
  .from('geschuetzte-dokumente')
  .createSignedUrl('Dokumente_MSchriever.pdf', 60);

if (fileError) {
  console.error('Storage-Fehler:', fileError);
  errorMsg.innerText = 'Fehler beim Laden des Dokuments.';
  submitBtn.innerText = 'Freischalten';
  submitBtn.disabled = false;
  return;
}


    if (tokenStep) tokenStep.style.display = 'none';
    if (documentStep) documentStep.style.display = 'block';
    if (downloadBtn) downloadBtn.href = fileData.signedUrl;
  }
}

// ── QR-SCANNER LOGIK ─────────────────────────────────────────

// ── QR-SCANNER LOGIK ─────────────────────────────────────────

let html5QrCode = null;

function stopScanner() {
  const scannerModal = el('scanner-modal');
  if (html5QrCode && html5QrCode.isScanning) {
    html5QrCode.stop().then(() => {
      html5QrCode.clear();
      if (scannerModal) scannerModal.style.display = 'none';
    }).catch((err) => {
      console.error('Fehler beim Stoppen der Kamera:', err);
      if (scannerModal) scannerModal.style.display = 'none';
    });
  } else {
    if (scannerModal) scannerModal.style.display = 'none';
  }
}

function initQrScanner() {
  const scanBtn = el('scan-btn');
  const closeBtn = el('close-scanner');
  const scannerModal = el('scanner-modal');
  const tokenInput = el('dokumente-token');

  if (!scanBtn || !closeBtn || !scannerModal || !tokenInput) return;

  scanBtn.addEventListener('click', async () => {
    if (typeof Html5Qrcode === 'undefined') {
      alert('Scanner-Bibliothek wurde nicht geladen.');
      return;
    }

    scannerModal.style.display = 'flex';
    html5QrCode = new Html5Qrcode("reader");

    try {
      await html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          tokenInput.value = decodedText.trim();
          stopScanner();
          
          const submitBtn = el('dokumente-submit');
          if (submitBtn) submitBtn.click();
        },
        (errorMessage) => { /* Sucht noch nach QR-Code... */ }
      );
    } catch (err) {
      alert("Kamera konnte nicht geöffnet werden: " + err);
      stopScanner();
    }
  });

  // Event-Listener direkt an den Abbrechen-Button binden
  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    stopScanner();
  });


  closeBtn.addEventListener('click', stopScanner);

  function stopScanner() {
    if (html5QrCode) {
      html5QrCode.stop().then(() => {
        html5QrCode.clear();
        scannerModal.style.display = 'none';
      }).catch(() => {
        scannerModal.style.display = 'none';
      });
    } else {
      scannerModal.style.display = 'none';
    }
  }
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
  initExpand();
  initFaq();
  initHamburger();
  initDokumente();
  initQrScanner(); // <-- Neu hinzugefügt
}

boot();