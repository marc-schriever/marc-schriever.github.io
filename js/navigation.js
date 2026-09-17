export class Navigation {
    constructor(content) {
        this.content = content;

        this.desktopElement =
            document.querySelector('#desktop-navigation');

        this.mobileElement =
            document.querySelector(
                '#mobile-navigation .c-mobile-navigation__items'
            );
    }

    render() {
        this.desktopElement.innerHTML =
            this.renderLinks('c-navigation__link');

        this.mobileElement.innerHTML =
            this.renderLinks('c-mobile-navigation__link');
    }

    renderLinks(className) {
        return this.content.nav.links
            .map(link => {
                const route = this.getRoute(link.href);

                return `<a class="${className}" href="#${this.getHash(route)}" data-route="${route}">${link.label}</a>`;
            })
            .join('');
    }

    getRoute(href) {
        const hash = String(href || '').replace(/^#/, '');

        return HASH_TO_ROUTE[hash] || 'home';
    }

    getHash(route) {
        return ROUTE_TO_HASH[route] || 'home';
    }
}

const ROUTE_TO_HASH = {
    home: 'home',
    about: 'ueber-mich',
    expertise: 'expertise',
    faq: 'faq',
    referenzen: 'referenzen',
    dokumente: 'dokumente',
    kontakt: 'kontakt',
    impressum: 'impressum',
    datenschutz: 'datenschutz',
};

const HASH_TO_ROUTE = {
    home: 'home',
    'ueber-mich': 'about',
    about: 'about',
    expertise: 'expertise',
    faq: 'faq',
    referenzen: 'referenzen',
    dokumente: 'dokumente',
    kontakt: 'kontakt',
    impressum: 'impressum',
    datenschutz: 'datenschutz',
};
