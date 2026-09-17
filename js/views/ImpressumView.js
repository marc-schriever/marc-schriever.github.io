import { PageView } from './page-view.js?v=navfix1';
import { CONTENT, publishedEmail } from '../content.js?v=email1';

export class ImpressumView extends PageView {

    getRoute() {
        return 'impressum';
    }

    render() {
        const impressum = CONTENT.impressum;
        const email = publishedEmail();
        const emailMarkup = email
            ? `<a href="mailto:${email}">${email}</a>`
            : '';

        return this.createPage({
            eyebrow: impressum.eyebrow,
            title: impressum.title,
            className: 'c-legal-page',
            body: `
                <address class="c-legal-address">
                    <strong>${impressum.name}</strong>
                    <span>${impressum.role}</span>
                    ${impressum.address
                        .split('\n')
                        .map(line => `<span>${line}</span>`)
                        .join('')}
                    ${emailMarkup}
                </address>
            `,
        });
    }
}
