import { PageView } from './page-view.js?v=navfix1';
import { CONTENT } from '../content.js';

export class HomeView extends PageView {

    getRoute() {
        return 'home';
    }

    render() {

        const section = this.getElement();

        const hero = document.createElement('article');

        hero.className = 'c-hero';

        hero.innerHTML = `
            <div class="c-hero__content">
                <div class="c-hero__stage">
                    <div class="c-hero__headline-row">
                        <p class="c-eyebrow c-eyebrow--availability">
                            ${CONTENT.hero.eyebrow}
                        </p>

                        <h1 class="c-hero__headline">
                            ${CONTENT.hero.headline}
                        </h1>
                    </div>

                    <p class="c-hero__subline">
                        ${CONTENT.hero.subline}
                    </p>
                </div>

                <div class="c-hero__flow">
                    <div class="c-content-flow">
                        ${CONTENT.hero.textParagraphs
                            .map(
                                paragraph => `<p>${paragraph}</p>`
                            )
                            .join('')}
                    </div>

                    <div class="c-hero__stack">
                        <div class="c-hero__media">
                            <figure class="c-hero__profile">
                                <div class="c-hero__avatar-frame">
                                    <img
                                        class="c-hero__avatar-img"
                                        src="${CONTENT.photo.src}"
                                        alt="${CONTENT.photo.alt}"
                                        width="190"
                                        height="250"
                                        draggable="false"
                                    >
                                    <div class="c-hero__avatar-placeholder">
                                        <span
                                            class="c-hero__avatar-initials"
                                            aria-hidden="true"
                                        >MS</span>
                                        <span class="c-hero__avatar-name">
                                            ${CONTENT.photo.name}
                                        </span>
                                        <span class="c-hero__avatar-hint">
                                            ${CONTENT.photo.placeholder}
                                        </span>
                                    </div>
                                </div>
                            </figure>
                        </div>

                        <div class="c-hero__actions">
                            <button
                                class="c-button c-button--accent"
                                type="button"
                                data-route="about"
                            >
                                ${CONTENT.hero.btn_primary}
                            </button>

                            <button
                                class="c-button c-button--secondary"
                                type="button"
                                data-route="kontakt"
                            >
                                ${CONTENT.hero.btn_secondary}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.bindHeroPhoto(hero);
        section.appendChild(hero);

        const stats = document.createElement('section');

        stats.className = 'c-home-section';

        stats.innerHTML = `
            <h2 class="c-content-block__headline">
                ${CONTENT.sectionHeadings.stats}
            </h2>

            <div class="c-card-grid">
                ${CONTENT.stats
                    .map(
                        stat => `
                            <article class="c-card">
                                <h3 class="c-card__headline">
                                    ${stat.title}
                                </h3>
                                <p class="c-card__text">${stat.text}</p>
                            </article>
                        `
                    )
                    .join('')}
            </div>
        `;

        section.appendChild(stats);

        return section;
    }


    bindHeroPhoto(hero) {
        const frame = hero.querySelector('.c-hero__avatar-frame');
        const image = hero.querySelector('.c-hero__avatar-img');

        if (!frame || !image) {
            return;
        }

        frame.addEventListener('contextmenu', event => {
            event.preventDefault();
        });

        const showPhoto = () => {
            frame.classList.add('has-photo');
        };

        if (image.complete && image.naturalWidth > 0) {
            showPhoto();
            return;
        }

        image.addEventListener('load', showPhoto);
        image.addEventListener('error', () => {
            frame.classList.remove('has-photo');
        });
    }
}

