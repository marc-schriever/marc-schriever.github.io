// ============================================================================
// UI-INTERACTIONS.JS — Interaktive UI-Komponenten
// ============================================================================

import { byId, qs, qsa } from './dom-utils.js';

export function initReveal() {
  const revealEls = qsa('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

export function initFaq() {
  const list = qs('.faq-list');
  if (!list) return;

  list.addEventListener('click', (event) => {
    const button = event.target.closest('.faq-q');
    if (!button) return;

    const accordionItem = button.closest('.c-accordion__item');
    const wasExpanded = button.getAttribute('aria-expanded') === 'true';

    qsa('.faq-q').forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
      btn.nextElementSibling?.classList.remove('is-open');
      btn.closest('.c-accordion__item')?.classList.remove('is-open');
    });

    if (!wasExpanded) {
      button.setAttribute('aria-expanded', 'true');
      button.nextElementSibling?.classList.add('is-open');
      accordionItem?.classList.add('is-open');
    }
  });
}

export function initHamburger() {
  const button = qs('.navbar__hamburger');
  const dropdown = byId('navbar-dropdown');
  if (!button || !dropdown) return;

  const closeMenu = () => {
    dropdown.classList.remove('is-open');
    dropdown.setAttribute('aria-hidden', 'true');
    button.setAttribute('aria-expanded', 'false');
  };

  button.addEventListener('click', () => {
    const isOpen = dropdown.classList.toggle('is-open');
    dropdown.setAttribute('aria-hidden', String(!isOpen));
    button.setAttribute('aria-expanded', String(isOpen));
  });

  dropdown.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
}