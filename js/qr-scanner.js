// ============================================================================
// QR-SCANNER.JS — Kamera-basierte Token-Erfassung via html5-qrcode
// ============================================================================

import { byId } from './dom-utils.js';

let html5QrCode = null;

async function stopScanner(scannerModal) {
  scannerModal?.classList.remove('is-open');

  if (!html5QrCode) return;

  try {
    const state = html5QrCode.getState();
    if (state === Html5QrcodeScannerState.SCANNING || state === Html5QrcodeScannerState.PAUSED) {
      await html5QrCode.stop();
    }
    html5QrCode.clear();
  } catch (err) {
    console.warn('Kamera-Stopp abgefangen:', err);
  } finally {
    html5QrCode = null;
  }
}

export function initQrScanner() {
  const scanBtn = byId('scan-btn');
  const closeBtn = byId('close-scanner');
  const scannerModal = byId('scanner-modal');
  const tokenInput = byId('dokumente-token');
  const submitBtn = byId('dokumente-submit');

  if (!scanBtn || !closeBtn || !scannerModal || !tokenInput) return;

  scanBtn.addEventListener('click', async () => {
    if (typeof Html5Qrcode === 'undefined') {
      alert('Scanner-Bibliothek wurde nicht geladen.');
      return;
    }

    scannerModal.classList.add('is-open');
    html5QrCode = new Html5Qrcode('reader');

    try {
      await html5QrCode.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          tokenInput.value = decodedText.trim();
          stopScanner(scannerModal);
          submitBtn?.click();
        },
        () => {
          /* Sucht noch nach QR-Code... */
        }
      );
    } catch (err) {
      alert('Kamera konnte nicht geöffnet werden: ' + err);
      stopScanner(scannerModal);
    }
  });

  closeBtn.addEventListener('click', (event) => {
    event.preventDefault();
    stopScanner(scannerModal);
  });
}