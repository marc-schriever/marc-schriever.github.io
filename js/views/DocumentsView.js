import { PageView } from './page-view.js?v=navfix1';
import { CONTENT } from '../content.js?v=view6';
import { QrTokenScanner } from '../qr-scanner.js';

const SUPABASE_URL =
    'https://hepceceszvkblanffoju.supabase.co';

const SUPABASE_PUBLISHABLE_KEY =
    'sb_publishable_FaQ7I0SgAHgj_E7aDGNx0Q_B7Ldw-WJ';

const REDEEM_FUNCTION_URL =
    `${SUPABASE_URL}/functions/v1/redeem-document`;

export class DocumentsView extends PageView {

    constructor(application) {
        super(application);
        this.scanner = new QrTokenScanner();
        this.viewUrl = '';
        this.pdfBlob = null;
        this.onViewerKeydown = null;
        this.viewerSection = null;
        this.onFullscreenChange = () => this.syncFullscreenButton();
    }

    getRoute() {
        return 'dokumente';
    }

    unmount() {
        this.closeViewer();
        document.removeEventListener(
            'fullscreenchange',
            this.onFullscreenChange
        );
        document.removeEventListener(
            'webkitfullscreenchange',
            this.onFullscreenChange
        );

        if (this.viewUrl) {
            URL.revokeObjectURL(this.viewUrl);
            this.viewUrl = '';
        }

        this.pdfBlob = null;

        return this.scanner.unmount();
    }

    render() {
        const documents = CONTENT.dokumente;
        const section = this.createPage({
            eyebrow: documents.eyebrow,
            title: documents.title,
            body: `
                <div class="c-content-flow">
                    <p>${documents.intro}</p>
                </div>

                <form class="c-document-form" data-document-form>
                    <div class="c-form-field">
                        <label for="document-token">
                            ${documents.tokenLabel}
                        </label>
                        <div class="c-token-row">
                            <input
                                id="document-token"
                                name="token"
                                type="text"
                                autocomplete="off"
                                spellcheck="false"
                                placeholder="${documents.tokenPlaceholder}"
                                required
                            >
                            <button
                                class="c-button c-button--secondary"
                                type="button"
                                data-document-scan
                            >
                                ${documents.scanButton}
                            </button>
                        </div>
                    </div>

                    <button
                        class="c-button c-button--primary"
                        type="submit"
                        data-document-submit
                    >
                        ${documents.submit}
                    </button>

                    <p
                        class="c-form-status"
                        data-document-status
                        aria-live="polite"
                    ></p>
                </form>

                <div class="c-document-result" data-document-result hidden>
                    <h2>${documents.successTitle}</h2>
                    <p>${documents.successText}</p>
                    <button
                        class="c-button c-button--accent"
                        type="button"
                        data-document-reopen
                    >
                        ${documents.reopenButton}
                    </button>
                </div>

                <div
                    class="c-modal c-modal--document"
                    data-document-modal
                    hidden
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="document-viewer-title"
                >
                    <div
                        class="c-modal__backdrop"
                        data-document-backdrop
                    ></div>
                    <div class="c-modal__window c-modal__window--document">
                        <div class="c-modal__header">
                            <h2
                                class="c-modal__title"
                                id="document-viewer-title"
                            >
                                ${documents.viewerTitle}
                            </h2>
                            <div class="c-modal__actions">
                                <button
                                    class="c-button c-button--secondary"
                                    type="button"
                                    data-document-fullscreen
                                    aria-pressed="false"
                                >
                                    ${documents.fullscreenButton}
                                </button>
                                <button
                                    class="c-modal__close"
                                    type="button"
                                    data-document-close
                                    aria-label="Fenster schließen"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                        <div class="c-document-viewer">
                            <iframe
                                class="c-document-viewer__frame"
                                title="Geschützte Unterlagen"
                                data-document-viewer
                            ></iframe>
                        </div>
                    </div>
                </div>

                <div
                    class="c-modal"
                    data-scanner-modal
                    hidden
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="scanner-title"
                >
                    <div
                        class="c-modal__backdrop"
                        data-scanner-backdrop
                    ></div>
                    <div class="c-modal__window c-modal__window--scanner">
                        <div class="c-modal__header">
                            <h2
                                class="c-modal__title"
                                id="scanner-title"
                            >
                                ${CONTENT.scanner.title}
                            </h2>
                            <button
                                class="c-modal__close"
                                type="button"
                                data-scanner-close
                                aria-label="Scanner schließen"
                            >
                                ×
                            </button>
                        </div>
                        <p class="c-scanner__intro">
                            ${CONTENT.scanner.intro}
                        </p>
                        <div
                            class="c-scanner__reader"
                            id="document-qr-reader"
                            data-scanner-reader
                        ></div>
                        <p
                            class="c-form-status"
                            data-scanner-status
                            aria-live="polite"
                        ></p>
                    </div>
                </div>
            `,
        });

        this.bindForm(section);

        return section;
    }

    bindForm(section) {
        const form = section.querySelector('[data-document-form]');
        const input = form.elements.token;

        form.addEventListener(
            'submit',
            event => this.verifyToken(event, section)
        );

        section.querySelector('[data-document-reopen]')
            .addEventListener('click', () => this.openViewer(section));

        section.querySelector('[data-document-close]')
            .addEventListener('click', () => this.closeViewer(section));

        section.querySelector('[data-document-fullscreen]')
            .addEventListener('click', () => this.toggleFullscreen(section));

        document.addEventListener(
            'fullscreenchange',
            this.onFullscreenChange
        );
        document.addEventListener(
            'webkitfullscreenchange',
            this.onFullscreenChange
        );

        section.querySelector('[data-document-backdrop]')
            .addEventListener('click', () => this.closeViewer(section));

        section.querySelector('.c-document-viewer')
            .addEventListener('contextmenu', event => {
                event.preventDefault();
            });

        this.scanner.bind(section, token => {
            input.value = token;
            form.requestSubmit();
        });

        const urlToken =
            new URLSearchParams(window.location.search).get('token');

        if (urlToken) {
            input.value = urlToken;
            form.requestSubmit();
        }
    }

    async verifyToken(event, section) {
        event.preventDefault();

        const form = event.currentTarget;
        const token = form.elements.token.value.trim();
        const status = section.querySelector('[data-document-status]');
        const submit = section.querySelector('[data-document-submit]');

        if (!token) {
            status.textContent = CONTENT.dokumente.requiredError;
            return;
        }

        status.textContent = CONTENT.dokumente.checking;
        submit.disabled = true;

        try {
            const response = await fetch(REDEEM_FUNCTION_URL, {
                method: 'POST',
                headers: {
                    apikey: SUPABASE_PUBLISHABLE_KEY,
                    Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_token: token }),
            });

            const payload = await response.json().catch(() => ({}));

            if (response.status === 403) {
                status.textContent = CONTENT.dokumente.invalidError;
                return;
            }

            if (!response.ok || !payload.signedUrl) {
                status.textContent = CONTENT.dokumente.loadingError;
                return;
            }

            const result =
                section.querySelector('[data-document-result]');

            const fileResponse = await fetch(payload.signedUrl);

            if (!fileResponse.ok) {
                status.textContent = CONTENT.dokumente.loadingError;
                return;
            }

            const pdfBlob = await fileResponse.blob();
            this.pdfBlob = pdfBlob;
            form.hidden = true;
            result.hidden = false;
            this.openViewer(section);
        } catch (error) {
            console.error('Dokumentenzugriff fehlgeschlagen.', error);
            status.textContent = CONTENT.dokumente.loadingError;
        } finally {
            submit.disabled = false;
        }
    }

    openViewer(section) {
        const modal = section.querySelector('[data-document-modal]');
        const viewer = section.querySelector('[data-document-viewer]');

        if (!modal || !this.pdfBlob || !viewer) {
            return;
        }

        if (this.viewUrl) {
            URL.revokeObjectURL(this.viewUrl);
        }

        this.viewUrl = URL.createObjectURL(this.pdfBlob);
        viewer.src = `${this.viewUrl}#toolbar=0&navpanes=0`;

        this.viewerSection = section;
        modal.hidden = false;
        this.syncFullscreenButton();
        section.querySelector('[data-document-close]')?.focus();

        this.onViewerKeydown = event => {
            if (event.key !== 'Escape') {
                return;
            }

            if (this.isFullscreen()) {
                return;
            }

            event.preventDefault();
            this.closeViewer(section);
        };

        document.addEventListener('keydown', this.onViewerKeydown);
    }

    closeViewer(section) {
        this.exitFullscreen();

        const modal = section?.querySelector('[data-document-modal]')
            || document.querySelector('[data-document-modal]');

        if (modal) {
            modal.hidden = true;
            modal.classList.remove('is-fill');
        }

        this.syncFullscreenButton();

        if (this.onViewerKeydown) {
            document.removeEventListener('keydown', this.onViewerKeydown);
            this.onViewerKeydown = null;
        }
    }

    isFullscreen() {
        const modal = this.viewerSection
            ?.querySelector('[data-document-modal]');

        return Boolean(
            document.fullscreenElement
            || document.webkitFullscreenElement
            || modal?.classList.contains('is-fill')
        );
    }

    async toggleFullscreen(section) {
        const modal = section.querySelector('[data-document-modal]');

        if (!modal) {
            return;
        }

        if (this.isFullscreen()) {
            this.exitFullscreen();
            modal.classList.remove('is-fill');
            this.syncFullscreenButton();
            return;
        }

        const request = modal.requestFullscreen
            || modal.webkitRequestFullscreen;

        if (request) {
            try {
                await request.call(modal);
                return;
            } catch (error) {
                console.error('Vollbild nicht verfügbar.', error);
            }
        }

        modal.classList.add('is-fill');
        this.syncFullscreenButton();
    }

    exitFullscreen() {
        const exit = document.exitFullscreen
            || document.webkitExitFullscreen;

        if (
            exit
            && (document.fullscreenElement || document.webkitFullscreenElement)
        ) {
            exit.call(document);
        }

        this.viewerSection
            ?.querySelector('[data-document-modal]')
            ?.classList.remove('is-fill');
    }

    syncFullscreenButton() {
        const button = this.viewerSection
            ?.querySelector('[data-document-fullscreen]');

        if (!button) {
            return;
        }

        const active = this.isFullscreen();
        button.setAttribute('aria-pressed', String(active));
        button.textContent = active
            ? CONTENT.dokumente.fullscreenExitButton
            : CONTENT.dokumente.fullscreenButton;
    }
}
