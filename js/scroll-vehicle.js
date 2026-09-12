// ============================================================================
// SCROLL-VEHICLE.JS — Stapler-Icon, das proportional zum Scroll-Fortschritt
// über eine fixe Leiste am unteren Bildschirmrand fährt.
// ============================================================================

import { byId, qs } from './dom-utils.js';

// Maße der Fülllevel-Fläche im SVG-Koordinatenraum (siehe #scroll-fill-rect in index.html)
const FILL_TOP = 6;
const FILL_BOTTOM = 30.5;
const FILL_MAX_HEIGHT = FILL_BOTTOM - FILL_TOP;

/**
 * Hält die fixe Scroll-Leiste oberhalb browser-eigener UI-Elemente
 * (z.B. die einblendbare Adress-/Werkzeugleiste mancher mobiler Browser
 * am unteren Rand, etwa Brave auf Android). "bottom: 0" allein reicht
 * nicht, weil solche Leisten native UI sind, kein Teil der Seite, und
 * das CSS davon nichts weiß, die visualViewport-API dagegen schon.
 */
function initViewportOffset(track) {
  if (!track || !window.visualViewport) return;

  function update() {
    const offset = window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop;
    track.style.bottom = `${Math.max(0, offset)}px`;
  }

  window.visualViewport.addEventListener('resize', update);
  window.visualViewport.addEventListener('scroll', update);
  update();
}

export function initScrollVehicle() {
  const vehicle = byId('scroll-vehicle');
  const fillRect = byId('scroll-fill-rect');
  const track = qs('.c-scroll-track');
  if (!vehicle) return;

  initViewportOffset(track);

  let ticking = false;

  function update() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    const clamped = Math.min(1, Math.max(0, progress));

    vehicle.style.left = `${clamped * 100}%`;

    if (fillRect) {
      const height = FILL_MAX_HEIGHT * clamped;
      fillRect.setAttribute('height', height.toFixed(2));
      fillRect.setAttribute('y', (FILL_BOTTOM - height).toFixed(2));
    }

    ticking = false;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update);
  update();
}
