// ============================================================================
// HERO-PHOTO.JS — Schaltet zwischen echtem Profilfoto und Platzhalter um.
// Liegt eine Datei unter assets/portrait.jpg, wird sie automatisch verwendet,
// ohne dass HTML/CSS angefasst werden muss. Fehlt sie, bleibt der bestehende
// Icon-Platzhalter sichtbar (siehe .c-hero__avatar-placeholder in index.html).
// ============================================================================

import { qs } from './dom-utils.js';

export function initHeroPhoto() {
  const frame = qs('.c-hero__avatar-frame');
  const img = frame ? qs('.c-hero__avatar-img', frame) : null;
  if (!frame || !img) return;

  // Bereits aus dem Browser-Cache geladen, bevor der Listener greift?
  if (img.complete && img.naturalWidth > 0) {
    frame.classList.add('has-photo');
    return;
  }

  img.addEventListener('load', () => frame.classList.add('has-photo'));
  img.addEventListener('error', () => img.remove());
}
