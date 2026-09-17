export class Ticker {

    constructor(content) {
        this.content = content;
        this.element = document.querySelector('#site-ticker');
    }

    render() {
        const items = this.content.achievements;
        const listMarkup = this.renderList(items);

        this.element.setAttribute(
            'aria-label',
            this.content.sectionHeadings.achievements
        );

        this.element.style.setProperty(
            '--ticker-duration',
            `${Math.max(items.length * 8, 32)}s`
        );

        this.element.innerHTML = `
            <div class="c-ticker__track">
                ${listMarkup}
                ${this.renderList(items, true)}
            </div>
        `;
    }

    update(route) {
        this.element.hidden = route !== 'home';
    }

    renderList(items, duplicate = false) {
        const hidden = duplicate ? ' aria-hidden="true"' : '';

        return `
            <ul class="c-ticker__list"${hidden}>
                ${items
                    .map(item => `<li class="c-ticker__item">${item}</li>`)
                    .join('')}
            </ul>
        `;
    }
}
