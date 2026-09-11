// ============================================================================
// DOCUMENTS-MODAL.JS — Token-geschützter Dokumenten-Download über Supabase
// ============================================================================

import { byId, qs } from './dom-utils.js';

const SUPABASE_URL = 'https://hepceceszvkblanffoju.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_FaQ7I0SgAHgj_E7aDGNx0Q_B7Ldw-WJ';
const PROTECTED_BUCKET = 'geschuetzte-dokumente';
const PROTECTED_FILE = 'Dokumente_MSchriever.pdf';
const SIGNED_URL_TTL_SECONDS = 60;

let supabaseClient = null;

function createSupabaseClient() {
  if (typeof supabase === 'undefined') {
    console.error('Supabase SDK wurde nicht geladen.');
    return null;
  }
  return supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}

function openOverlay(overlay) {
  if (overlay) overlay.classList.add('is-open');
}

function closeOverlay(overlay) {
  if (overlay) overlay.classList.remove('is-open');
}

function isDokumenteTrigger(target) {
  const link = target.closest('a');
  if (!link) return false;
  return (
    link.textContent.trim().toUpperCase() === 'DOKUMENTE' ||
    link.classList.contains('dropdown-dokumente') ||
    link.getAttribute('href') === '#dokumente' ||
    link.id === 'nav-dokumente'
  );
}

async function verifyAndRedeemToken(tokenValue, elements) {
  const { errorMsg, submitBtn, tokenStep, documentStep, downloadBtn } = elements;
  if (!errorMsg || !submitBtn) return;

  errorMsg.textContent = '';
  submitBtn.textContent = 'Prüfe...';
  submitBtn.disabled = true;

  const { data: isValid, error: redeemError } = await supabaseClient.rpc('redeem_token', {
    user_token: tokenValue,
  });

  if (redeemError || !isValid) {
    errorMsg.textContent = 'Dieser Token ist ungültig oder wurde bereits verwendet!';
    submitBtn.textContent = 'Freischalten';
    submitBtn.disabled = false;
    return;
  }

  const { data: fileData, error: fileError } = await supabaseClient.storage
    .from(PROTECTED_BUCKET)
    .createSignedUrl(PROTECTED_FILE, SIGNED_URL_TTL_SECONDS);

  if (fileError) {
    console.error('Storage-Fehler:', fileError);
    errorMsg.textContent = 'Fehler beim Laden des Dokuments.';
    submitBtn.textContent = 'Freischalten';
    submitBtn.disabled = false;
    return;
  }

  if (tokenStep) tokenStep.style.display = 'none';
  if (documentStep) documentStep.style.display = 'block';
  if (downloadBtn) downloadBtn.href = fileData.signedUrl;
}

export function initDocumentsModal() {
  supabaseClient = createSupabaseClient();
  if (!supabaseClient) return;

  const overlay = qs('.dokumente-overlay') ?? byId('dokumente-overlay');
  const closeBtn = byId('dokumente-close') ?? qs('.dokumente-overlay__close');
  const submitBtn = byId('dokumente-submit');
  const tokenInput = byId('dokumente-token') ?? qs('.dokumente-overlay__input');
  const errorMsg = byId('dokumente-error') ?? qs('.dokumente-overlay__error');
  const tokenStep = byId('token-step');
  const documentStep = byId('document-step');
  const downloadBtn = byId('download-btn');

  const elements = { errorMsg, submitBtn, tokenStep, documentStep, downloadBtn };

  document.addEventListener('click', (event) => {
    if (!isDokumenteTrigger(event.target)) return;
    event.preventDefault();

    const dropdown = byId('navbar-dropdown');
    dropdown?.classList.remove('is-open');

    if (overlay) {
      openOverlay(overlay);
    } else {
      console.error('Element .dokumente-overlay wurde im HTML nicht gefunden!');
    }
  });

  closeBtn?.addEventListener('click', () => closeOverlay(overlay));

  overlay?.addEventListener('click', (event) => {
    if (event.target === overlay) closeOverlay(overlay);
  });

  submitBtn?.addEventListener('click', () => {
    const tokenValue = tokenInput ? tokenInput.value.trim() : '';
    if (!tokenValue) {
      if (errorMsg) errorMsg.textContent = 'Bitte geben Sie einen Token ein.';
      return;
    }
    verifyAndRedeemToken(tokenValue, elements);
  });

  const urlToken = new URLSearchParams(window.location.search).get('token');
  if (urlToken && overlay) {
    openOverlay(overlay);
    if (tokenInput) tokenInput.value = urlToken;
    verifyAndRedeemToken(urlToken, elements);
  }
}