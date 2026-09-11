// ============================================================================
// MAIN.JS — Boot-Sequenz
// Einziger Ort, an dem alle Module zusammengeführt werden.
// ============================================================================

import { renderAll } from './render.js';
import { initReveal, initFaq, initHamburger } from './ui-interactions.js';
import { initDocumentsModal } from './documents-modal.js';
import { initQrScanner } from './qr-scanner.js';
import { initScrollVehicle } from './scroll-vehicle.js';

function initScrollSpy() {
  const menu = document.querySelector('.c-navbar__menu');
  const navLinks = Array.from(document.querySelectorAll('.c-navbar__link:not(.c-navbar__link--btn)'));

  // Holt exakt die echten Ziel-Elemente und ignoriert leere href="#"
  const targets = navLinks
    .map(link => {
      const href = link.getAttribute('href');
      if (!href || href.length <= 1 || !href.startsWith('#')) return null;
      return document.getElementById(href.substring(1));
    })
    .filter(Boolean);

  if (!menu || navLinks.length === 0 || targets.length === 0) return;

  // Erzeugt das Linien-Element
  let indicator = document.querySelector('.c-navbar__indicator');
  if (!indicator) {
    indicator = document.createElement('span');
    indicator.className = 'c-navbar__indicator';
    menu.appendChild(indicator);
  }

  function moveIndicator(targetLink) {
    if (targetLink && indicator) {
      indicator.style.left = `${targetLink.offsetLeft}px`;
      indicator.style.width = `${targetLink.offsetWidth}px`;
    }
  }

  function updateActiveSection() {
    const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 30);
    
    let activeTarget = targets[0];

    if (isAtBottom) {
      activeTarget = targets[targets.length - 1];
    } else {
      const triggerPoint = 140; 
      targets.forEach(target => {
        const rect = target.getBoundingClientRect();
        if (rect.top <= triggerPoint) {
          activeTarget = target;
        }
      });
    }

    if (activeTarget) {
      const activeId = activeTarget.getAttribute('id');
      navLinks.forEach(link => {
        const isTarget = link.getAttribute('href') === `#${activeId}`;
        link.classList.toggle('is-active', isTarget);
        if (isTarget) moveIndicator(link);
      });
    }
  }

  window.addEventListener('scroll', updateActiveSection, { passive: true });
  window.addEventListener('resize', updateActiveSection);

  updateActiveSection();
}

function boot() {
  renderAll();          // Zuerst HTML ins DOM rendern!
  initScrollSpy();      // Dann erst den ScrollSpy initialisieren, damit die Links da sind
  initReveal();
  initFaq();
  initHamburger();
  initDocumentsModal();
  initQrScanner();
  initScrollVehicle();
}

document.addEventListener('DOMContentLoaded', boot);