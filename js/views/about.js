import { PageView } from './page-view.js?v=navfix1';
import { CONTENT } from '../content.js?v=aboutm2';

export class AboutView extends PageView {

    getRoute() {
        return 'about';
    }

    render() {
        return this.createPage({
            eyebrow: CONTENT.about.eyebrow,
            title: CONTENT.about.headline,
            body: `
                <div class="c-content-flow">
                    ${this.toParagraphs(CONTENT.about.philosophyParagraphs)}
                </div>

                <section class="c-content-block">
                    <h2 class="c-content-block__headline">
                        ${CONTENT.about.credoHeadline}
                    </h2>

                    <div class="c-content-flow">
                        ${this.toParagraphs(CONTENT.about.credoParagraphs)}
                    </div>
                </section>

                <section class="c-content-block">
                    <h2 class="c-content-block__headline">
                        ${CONTENT.sectionHeadings.facts}
                    </h2>

                    <dl class="c-fact-grid">
                        ${CONTENT.about.facts
                            .map(
                                fact => `
                                    <div class="c-fact">
                                        <dt>${fact.label}</dt>
                                        <dd>${fact.year}</dd>
                                    </div>
                                `
                            )
                            .join('')}
                    </dl>
                </section>

                <section class="c-content-block">
                    <h2 class="c-content-block__headline">
                        ${CONTENT.sectionHeadings.achievements}
                    </h2>

                    <ul class="c-list">
                        ${CONTENT.achievements
                            .map(item => `<li>${item}</li>`)
                            .join('')}
                    </ul>
                </section>
            `,
        });
    }
}
