import { PageView } from './page-view.js?v=navfix1';
import { CONTENT } from '../content.js';

export class ReferencesView extends PageView {

    getRoute() {
        return 'referenzen';
    }

    render() {
        const photo = CONTENT.referenzen.photo;

        return this.createPage({
            eyebrow: CONTENT.referenzen.eyebrow,
            title: CONTENT.referenzen.headline,
            body: `
                <div class="c-reference-grid">
                    ${CONTENT.referenzen.logos
                        .map(
                            logo => `
                                <div class="c-reference">
                                    ${logo.html}
                                </div>
                            `
                        )
                        .join('')}
                </div>

                <figure class="c-reference-photo">
                    <picture>
                        <source
                            srcset="${photo.webp}"
                            type="image/webp"
                        >
                        <img
                            src="${photo.src}"
                            alt="${photo.alt}"
                            width="1200"
                            height="1600"
                        >
                    </picture>
                    <figcaption>${photo.caption}</figcaption>
                </figure>
            `,
        });
    }
}
