// ============================================================================
// RENDER.JS — Verbindet CONTENT-Daten mit dem DOM
// Jede Funktion ist für genau eine Sektion zuständig (Single Responsibility).
// ============================================================================

import { CONTENT } from './content.js';
import { byId, qs, setText, setHTML, setAttr, renderParagraphs } from './dom-utils.js';
import {
  navLinkTemplate,
  statTemplate,
  expertiseBlockTemplate,
  faqItemTemplate,
  referenzLogoTemplate,
  factRowTemplate,
  achievementTickerItem,
} from './templates.js';

export function renderNav() {
  setText('.navbar__name', CONTENT.nav.name);
  setText('.navbar__title', CONTENT.nav.title);
  
  const linksHTML = CONTENT.nav.links
    .map(link => {
      const isDocumentLink = 
        (link.label && link.label.toLowerCase().includes('dokument')) || 
        (link.href && link.href.toLowerCase().includes('dok'));
      
      return navLinkTemplate({
        ...link,
        isButton: isDocumentLink || link.isButton
      });
    })
    .join('');

  setHTML('.navbar__links', linksHTML);
  setHTML('.navbar__dropdown-links', linksHTML);
}

export function renderHero() {
  const eyebrow = byId('hero-eyebrow');
  const title = byId('hero-title');
  const sub = byId('hero-sub');
  const text = byId('hero-text');
  const btnPrimary = byId('hero-btn-primary');
  const btnSecondary = byId('hero-btn-secondary');
  const photoLabel = byId('hero-photo-label');

  if (eyebrow) eyebrow.textContent = CONTENT.hero.eyebrow;
  if (title) title.textContent = CONTENT.hero.headline;
  if (sub) sub.textContent = CONTENT.hero.subline;
  if (text) renderParagraphs(text, CONTENT.hero.textParagraphs);
  if (btnPrimary) btnPrimary.textContent = CONTENT.hero.btn_primary;
  if (btnSecondary) btnSecondary.textContent = CONTENT.hero.btn_secondary;
  if (photoLabel) photoLabel.textContent = CONTENT.photo.placeholder;
}

export function renderStats() {
  setHTML('.grid--stats', CONTENT.stats.map(statTemplate).join(''));
}

export function renderAbout() {
  setText('.section--about .section-eyebrow', CONTENT.about.eyebrow);
  setText('.section--about .section-title', CONTENT.about.headline);

  const philosophyEl = byId('about-text-philosophy');
  const credoEl = byId('about-text-credo');
  const factsEl = byId('about-fact-rows');

  if (philosophyEl) renderParagraphs(philosophyEl, CONTENT.about.philosophyParagraphs);
  if (credoEl) renderParagraphs(credoEl, CONTENT.about.credoParagraphs);
  if (factsEl) factsEl.innerHTML = CONTENT.about.facts.map(factRowTemplate).join('');
}

export function renderExpertise() {
  setText('.section--expertise .section-eyebrow', CONTENT.expertise.eyebrow);
  setText('.section--expertise .section-title', CONTENT.expertise.headline);
  setHTML('.grid--expertise', CONTENT.expertise.blocks.map(expertiseBlockTemplate).join(''));
}

export function renderStatHighlight() {
  const items = CONTENT.achievements.map(achievementTickerItem).join('');
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  // Nur für die animierte Endlosschleife verdoppeln (nahtloser Sprung bei
  // -50% Transform). Bei reduzierter Bewegung reicht ein einzelner Durchlauf.
  setHTML('#achievement-ticker', prefersReducedMotion ? items : items + items);
}

export function renderFaq() {
  setText('.section--faq .section-eyebrow', CONTENT.faq.eyebrow);
  setText('.section--faq .section-title', CONTENT.faq.headline);
  setHTML('.faq-list', CONTENT.faq.items.map(faqItemTemplate).join(''));
}

export function renderReferenzen() {
  setText('.section--referenzen .section-eyebrow', CONTENT.referenzen.eyebrow);
  setText('.section--referenzen .section-title', CONTENT.referenzen.headline);
  setHTML('.grid--referenzen', CONTENT.referenzen.logos.map(referenzLogoTemplate).join(''));
}

export function renderKontakt() {
  setText('.section--kontakt .section-eyebrow', CONTENT.kontakt.eyebrow);
  setText('.kontakt-title', CONTENT.kontakt.headline);
  setText('.kontakt-text', CONTENT.kontakt.text);
  setText('.form-label--name', CONTENT.form.label_name);
  setText('.form-label--email', CONTENT.form.label_email);
  setText('.form-label--message', CONTENT.form.label_message);
  setAttr('.form-input--name', 'placeholder', CONTENT.form.placeholder_name);
  setAttr('.form-input--email', 'placeholder', CONTENT.form.placeholder_email);
  setAttr('.form-input--message', 'placeholder', CONTENT.form.placeholder_message);
  setText('.form-submit', CONTENT.form.submit);
}

export function renderFooter() {
  setText('.footer-copy', CONTENT.footer.copy);
  setText('.footer-location', CONTENT.footer.location);
  setText('.footer-link--impressum', CONTENT.footer.impressum);
  setText('.footer-link--datenschutz', CONTENT.footer.datenschutz);
}

export function renderModals() {
  const d = CONTENT.dokumente;
  setText('#dokumente-title', d.title);
  setText('#dokumente-intro', d.intro);
  setText('#dokumente-token-label', d.tokenLabel);
  setAttr('#dokumente-token', 'placeholder', d.tokenPlaceholder);
  setText('#dokumente-scan-label', d.scanButton);
  setText('#dokumente-submit', d.submit);
  setText('#dokumente-success-title', d.successTitle);
  setText('#dokumente-success-text', d.successText);
  setText('#dokumente-download-label', d.downloadButton);

  setText('#scanner-title', CONTENT.scanner.title);
  setText('#scanner-intro', CONTENT.scanner.intro);

  setText('#impressum-title', CONTENT.impressum.title);
  setText('#impressum-name', CONTENT.impressum.name);
  setText('#impressum-role', CONTENT.impressum.role);
  setText('#impressum-location', CONTENT.impressum.location);
  setText('#impressum-email', `E-Mail: ${CONTENT.impressum.email}`);

  setText('#datenschutz-title', CONTENT.datenschutz.title);
}

export function renderAll() {
  renderNav();
  renderHero();
  renderStats();
  renderAbout();
  renderExpertise();
  renderStatHighlight();
  renderFaq();
  renderReferenzen();
  renderKontakt();
  renderFooter();
  renderModals();
}