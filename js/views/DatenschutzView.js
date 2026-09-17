import { PageView } from './page-view.js?v=navfix1';
import { CONTENT, publishedEmail } from '../content.js?v=email1';

export class DatenschutzView extends PageView {

    getRoute() {
        return 'datenschutz';
    }

    render() {
        const section = this.createPage({
            eyebrow: CONTENT.datenschutz.eyebrow,
            title: CONTENT.datenschutz.title,
            className: 'c-legal-page',
            body: `
                <div
                    class="c-legal-content"
                    data-legal-content
                    aria-busy="true"
                >
                    <p role="status">
                        Datenschutzerklärung wird geladen …
                    </p>
                </div>
            `,
        });

        this.loadContent(
            section.querySelector('[data-legal-content]')
        );

        return section;
    }

    async loadContent(target) {
        try {
            const response = await fetch(CONTENT.datenschutz.contentUrl);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            target.innerHTML = await response.text();
            this.fillController(target);

            target
                .querySelectorAll('.c-legal-section__heading')
                .forEach(oldHeading => {
                    const heading =
                        document.createElement('h2');

                    heading.className =
                        oldHeading.className;

                    heading.textContent =
                        oldHeading.textContent;

                    oldHeading.replaceWith(heading);
                });

            target.setAttribute('aria-busy', 'false');
        } catch (error) {
            console.error(
                'Datenschutzerklärung konnte nicht geladen werden.',
                error
            );

            target.setAttribute('aria-busy', 'false');
            target.setAttribute('role', 'alert');
            target.textContent =
                'Die Datenschutzerklärung konnte nicht geladen werden.';
        }
    }

    fillController(target) {
        const controller = target.querySelector('[data-legal-controller]');

        if (!controller) {
            return;
        }

        const impressum = CONTENT.impressum;
        const email = publishedEmail();
        const details = `${impressum.name}, ${impressum.address.replace(/\n/g, ', ')}`;

        if (!email) {
            controller.replaceChildren(
                document.createTextNode(details)
            );
            return;
        }

        const mailLink = document.createElement('a');

        mailLink.href = `mailto:${email}`;
        mailLink.textContent = email;

        controller.replaceChildren(
            document.createTextNode(`${details}, E-Mail: `),
            mailLink
        );
    }
}
