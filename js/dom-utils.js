// ============================================================================
// DOM-UTILS.JS — Kleine, reine Helferfunktionen für DOM-Zugriffe
// ============================================================================

export const byId = (id) => document.getElementById(id);
export const qs = (sel, ctx = document) => ctx.querySelector(sel);
export const qsa = (sel, ctx = document) => ctx.querySelectorAll(sel);

export function setText(sel, val) {
  const node = qs(sel);
  if (node) node.textContent = val;
}

export function setHTML(sel, val) {
  const node = qs(sel);
  if (node) node.innerHTML = val;
}

export function setAttr(sel, attr, val) {
  const node = qs(sel);
  if (node) node.setAttribute(attr, val);
}

/**
 * Rendert eine Liste von Absätzen als sichere <p>-Elemente in ein Zielelement.
 * Nutzt textContent pro Absatz, kein innerHTML mit User-/Content-Text, um
 * unbeabsichtigte HTML-Injektion aus content.js zu vermeiden.
 */
export function renderParagraphs(targetEl, paragraphs) {
  if (!targetEl) return;
  targetEl.textContent = '';
  paragraphs.forEach((text) => {
    const p = document.createElement('p');
    p.textContent = text;
    targetEl.appendChild(p);
  });
}
