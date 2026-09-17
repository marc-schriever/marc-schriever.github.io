import { PageView } from './page-view.js?v=navfix1';
import { CONTENT } from '../content.js';
import { QrTokenScanner } from '../qr-scanner.js';

const SUPABASE_URL =
    'https://hepceceszvkblanffoju.supabase.co';

const SUPABASE_PUBLISHABLE_KEY =
    'sb_publishable_FaQ7I0SgAHgj_E7aDGNx0Q_B7Ldw-WJ';

const PROTECTED_BUCKET = 'geschuetzte-dokumente';
const PROTECTED_FILE = 'Dokumente_MSchriever.pdf';
const SIGNED_URL_TTL_SECONDS = 60;

export class DocumentsView extends PageView {

    constructor(application) {
        super(application);
        this.scanner = new QrTokenScanner();
    }

    getRoute() {
        return 'dokumente';
    }

    unmount() {
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
                                type="password"
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
                    <a
                        class="c-button c-button--primary"
                        href="#"
                        target="_blank"
                        rel="noopener"
                        data-document-download
                    >
                        ${documents.downloadButton}
                    </a>
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

        if (!window.supabase) {
            status.textContent = CONTENT.dokumente.loadingError;
            return;
        }

        status.textContent = CONTENT.dokumente.checking;
        submit.disabled = true;

        const client = window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_PUBLISHABLE_KEY
        );

        try {
            const { data: isValid, error: redeemError } =
                await client.rpc(
                    'redeem_token',
                    { user_token: token }
                );

            if (redeemError || !isValid) {
                status.textContent = CONTENT.dokumente.invalidError;
                return;
            }

            const { data: fileData, error: fileError } =
                await client.storage
                    .from(PROTECTED_BUCKET)
                    .createSignedUrl(
                        PROTECTED_FILE,
                        SIGNED_URL_TTL_SECONDS
                    );

            if (fileError || !fileData?.signedUrl) {
                status.textContent = CONTENT.dokumente.loadingError;
                return;
            }

            const result =
                section.querySelector('[data-document-result]');

            const download =
                section.querySelector('[data-document-download]');

            download.href = fileData.signedUrl;
            form.hidden = true;
            result.hidden = false;
        } catch (error) {
            console.error('Dokumentenzugriff fehlgeschlagen.', error);
            status.textContent = CONTENT.dokumente.loadingError;
        } finally {
            submit.disabled = false;
        }
    }
}
