import { PageView } from './page-view.js?v=navfix1';
import { CONTENT } from '../content.js?v=form3';

export class ContactView extends PageView {

    getRoute() {
        return 'kontakt';
    }

    render() {
        const section = this.createPage({
            eyebrow: CONTENT.kontakt.eyebrow,
            title: CONTENT.kontakt.headline,
            body: `
                <div class="c-content-flow">
                    <p>${CONTENT.kontakt.text}</p>
                </div>

                <form
                    class="c-contact-form"
                    action="${CONTENT.form.endpoint}"
                    method="POST"
                    data-contact-form
                >
                    <input
                        type="hidden"
                        name="_subject"
                        value="Kontaktanfrage über marc-schriever.de"
                    >

                    <div class="c-form-field">
                        <label for="contact-name">
                            ${CONTENT.form.label_name}
                        </label>
                        <input
                            id="contact-name"
                            name="name"
                            type="text"
                            autocomplete="name"
                            placeholder="${CONTENT.form.placeholder_name}"
                            required
                        >
                    </div>

                    <div class="c-form-field">
                        <label for="contact-email">
                            ${CONTENT.form.label_email}
                        </label>
                        <input
                            id="contact-email"
                            name="email"
                            type="email"
                            autocomplete="email"
                            placeholder="${CONTENT.form.placeholder_email}"
                            required
                        >
                    </div>

                    <div class="c-form-field">
                        <label for="contact-message">
                            ${CONTENT.form.label_message}
                        </label>
                        <textarea
                            id="contact-message"
                            name="message"
                            rows="8"
                            placeholder="${CONTENT.form.placeholder_message}"
                            required
                        ></textarea>
                    </div>

                    <button
                        class="c-button c-button--primary"
                        type="submit"
                        data-form-submit
                    >
                        ${CONTENT.form.submit}
                    </button>

                    <p class="c-form-status" data-form-status aria-live="polite"></p>
                </form>
            `,
        });

        this.bindForm(section);

        return section;
    }

    bindForm(section) {
        const form = section.querySelector('[data-contact-form]');

        form.addEventListener(
            'submit',
            event => this.submitForm(event, section)
        );
    }

    async submitForm(event, section) {
        event.preventDefault();

        const form = event.currentTarget;
        const status = section.querySelector('[data-form-status]');
        const submit = section.querySelector('[data-form-submit]');

        status.dataset.state = '';
        status.textContent = CONTENT.form.status_sending;
        submit.disabled = true;

        try {
            const response = await fetch(
                form.action,
                {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        Accept: 'application/json'
                    }
                }
            );

            const payload = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    formspreeError(payload) || `HTTP ${response.status}`
                );
            }

            form.reset();
            status.dataset.state = 'success';
            status.textContent = CONTENT.form.status_success;
        } catch (error) {
            console.error('Kontaktformular fehlgeschlagen.', error);

            status.dataset.state = 'error';
            status.textContent = error.message && error.message !== CONTENT.form.status_error
                ? `${CONTENT.form.status_error} ${error.message}`
                : CONTENT.form.status_error;
        } finally {
            submit.disabled = false;
        }
    }
}

function formspreeError(payload) {
    if (!payload || typeof payload !== 'object') {
        return '';
    }

    if (Array.isArray(payload.errors) && payload.errors.length) {
        return payload.errors
            .map(item => item.message || item.error)
            .filter(Boolean)
            .join(' ');
    }

    return payload.error || '';
}