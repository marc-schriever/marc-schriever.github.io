// ============================================================================
// PAGE-DECO.JS — Erzeugt die treibenden Hintergrund-Icons per Schleife.
// Anzahl, Icon-Auswahl und Wertebereiche sind zentrale Konstanten, statt
// wie zuvor 16 einzeln gepflegte HTML-Tags plus CSS-Regeln.
// ============================================================================

import { byId } from './dom-utils.js';

const ICON_COUNT = 16;
const ICON_NAMES = ['ti-forklift', 'ti-box', 'ti-package'];

const RANGES = {
  size:            [1.6, 4.0],   // rem
  opacity:         [0.14, 0.22],
  durationSeconds: [12, 22],
  delaySeconds:    [0, 20],      // wird negativ angewendet, damit Icons nicht synchron starten
};

function randomInRange([min, max]) {
  return min + Math.random() * (max - min);
}

/**
 * Berechnet eine Raster-Aufteilung, die möglichst nah an einem Seitenverhältnis
 * von 16:9 liegt, damit die Zellen nicht extrem schmal oder hoch werden.
 */
function computeGrid(count) {
  const aspectRatio = 16 / 9;
  const cols = Math.max(1, Math.round(Math.sqrt(count * aspectRatio)));
  const rows = Math.max(1, Math.ceil(count / cols));
  return { cols, rows };
}

function createIcon(index, cols, rows) {
  const icon = document.createElement('i');
  const iconName = ICON_NAMES[index % ICON_NAMES.length];

  const cellWidth = 100 / cols;
  const cellHeight = 100 / rows;
  const col = index % cols;
  const row = Math.floor(index / cols);

  // Jitter innerhalb von 70% der Zellgröße, damit ein Sicherheitsabstand
  // zu den Nachbarzellen bleibt und sich Icons nicht berühren.
  const jitterX = (Math.random() - 0.5) * cellWidth * 0.7;
  const jitterY = (Math.random() - 0.5) * cellHeight * 0.7;

  const top = row * cellHeight + cellHeight / 2 + jitterY;
  const left = col * cellWidth + cellWidth / 2 + jitterX;

  icon.className = `ti ${iconName} c-page-deco-icon`;
  icon.style.top = `${Math.min(97, Math.max(1, top)).toFixed(1)}%`;
  icon.style.left = `${Math.min(98, Math.max(1, left)).toFixed(1)}%`;
  icon.style.fontSize = `${randomInRange(RANGES.size).toFixed(2)}rem`;
  icon.style.opacity = randomInRange(RANGES.opacity).toFixed(3);
  icon.style.animationDuration = `${randomInRange(RANGES.durationSeconds).toFixed(1)}s`;
  icon.style.animationDelay = `-${randomInRange(RANGES.delaySeconds).toFixed(1)}s`;

  return icon;
}

export function initPageDeco() {
  const container = byId('page-deco');
  if (!container) return;

  const { cols, rows } = computeGrid(ICON_COUNT);
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < ICON_COUNT; i++) {
    fragment.appendChild(createIcon(i, cols, rows));
  }
  container.appendChild(fragment);
}
