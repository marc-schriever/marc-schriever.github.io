import { PageView } from './page-view.js?v=navfix1';
import { CONTENT } from '../content.js';

export class FaqView extends PageView {

    getRoute() {
        return 'faq';
    }

    render() {
        return this.createPage({
            eyebrow: CONTENT.faq.eyebrow,
            title: CONTENT.faq.headline,
            body: `
                <div class="c-faq-list">
                    ${CONTENT.faq.items
                        .map(
                            item => `
                                <details class="c-faq-item">
                                    <summary class="c-faq-item__question">
                                        ${item.q}
                                    </summary>
                                    <div class="c-faq-item__answer">
                                        <p>${item.a}</p>
                                    </div>
                                </details>
                            `
                        )
                        .join('')}
                </div>
            `,
        });
    }
}
