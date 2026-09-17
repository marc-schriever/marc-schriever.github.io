export class PageView {

    constructor(application) {
        this.application = application;
    }

    getElement() {
        const section = document.createElement('section');

        section.className = 'c-view';
        section.dataset.view = this.getRoute();

        return section;
    }

    createPage({ eyebrow, title, body, className = '' }) {
        const section = this.getElement();
        const pageClass = ['c-content-page', className]
            .filter(Boolean)
            .join(' ');

        section.innerHTML = `
            <article class="${pageClass}">
                <header class="c-section-header">
                    <p class="c-eyebrow">${eyebrow}</p>
                    <h1 class="c-section-header__headline">${title}</h1>
                </header>
                ${body}
            </article>
        `;

        return section;
    }

    toParagraphs(items = []) {
        return items
            .map(item => `<p>${item}</p>`)
            .join('');
    }

    getRoute() {
        throw new Error(
            'getRoute() muss von der View implementiert werden.'
        );
    }

    render() {
        throw new Error(
            'render() muss von der View implementiert werden.'
        );
    }
}
