// ============================================================================
// LEGAL-CONTENT.JS — Lädt Rechtstexte (z.B. Datenschutzerklärung) zur
// Laufzeit aus separaten HTML-Dateien, statt sie in content.js zu halten.
// Vorteil: Rechtstexte lassen sich direkt als HTML bearbeiten, ohne
// JavaScript-Syntax, und sind nicht an einen Rebuild/Deploy des JS-Codes
// gekoppelt.
//
// Hinweis: fetch() von lokalen Dateien funktioniert nur über http(s)
// (z.B. GitHub Pages oder einen lokalen Dev-Server), nicht beim direkten
// Öffnen der index.html über file:// im Browser — aus demselben Grund,
// aus dem auch die ES-Module einen Server brauchen.
// ============================================================================

import { CONTENT } from './content.js';
import { byId } from './dom-utils.js';

let loaded = false;

export async function loadDatenschutzContent() {
  if (loaded) return;

  const body = byId('datenschutz-body');
  if (!body) return;

  try {
    const response = await fetch(CONTENT.datenschutz.contentUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    body.innerHTML = await response.text();
    loaded = true;
  } catch (err) {
    console.error('Datenschutzerklärung konnte nicht geladen werden:', err);
    body.innerHTML = `<p>Die Datenschutzerklärung konnte nicht geladen werden. Bitte öffnen Sie <a href="${CONTENT.datenschutz.contentUrl}" target="_blank" rel="noopener">${CONTENT.datenschutz.contentUrl}</a> direkt.</p>`;
  }
}

export function initLegalContent() {
  // Nachladen beim ersten Öffnen des Modals, nicht beim initialen Seitenaufbau,
  // spart einen Netzwerk-Request, wenn der Besucher das Modal nie öffnet.
  document.addEventListener('click', (event) => {
    if (event.target.closest('.footer-link--datenschutz')) {
      loadDatenschutzContent();
    }
  });
}
