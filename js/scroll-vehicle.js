// ============================================================================
// SCROLL-VEHICLE.JS — Stapler-Icon, das proportional zum Scroll-Fortschritt
// über eine fixe Leiste am unteren Bildschirmrand fährt.
// ============================================================================

import { byId } from './dom-utils.js';

// Maße der Fülllevel-Fläche im SVG-Koordinatenraum (siehe #scroll-fill-rect in index.html)
const FILL_TOP = 6;
const FILL_BOTTOM = 30.5;
const FILL_MAX_HEIGHT = FILL_BOTTOM - FILL_TOP;

export function initScrollVehicle() {
  const vehicle = byId('scroll-vehicle');
  const fillRect = byId('scroll-fill-rect');
  if (!vehicle) return;

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
