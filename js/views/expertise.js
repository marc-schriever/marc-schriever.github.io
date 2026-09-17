import { PageView } from './page-view.js?v=navfix1';
import { CONTENT } from '../content.js';

export class ExpertiseView extends PageView {

    getRoute() {
        return 'expertise';
    }

    render() {
        return this.createPage({
            eyebrow: CONTENT.expertise.eyebrow,
            title: CONTENT.expertise.headline,
            body: `
                <div class="c-content-grid">
                    ${CONTENT.expertise.blocks
                        .map(
                            block => `
                                <section class="c-content-block">
                                    <div
                                        class="c-content-block__icon"
                                        aria-hidden="true"
                                    >
                                        <i class="${block.icon}"></i>
                                    </div>

                                    <h2 class="c-content-block__headline">
                                        ${block.title}
                                    </h2>

                                    <ul class="c-content-list">
                                        ${block.items
                                            .map(item => `<li>${item}</li>`)
                                            .join('')}
                                    </ul>
                                </section>
                            `
                        )
                        .join('')}
                </div>
            `,
        });
    }
}
