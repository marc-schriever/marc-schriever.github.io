import { ThemeManager } from './theme.js?v=navfix1';
import { Navigation } from './navigation.js?v=navfix1';
import { HomeView } from './views/home.js?v=herotop5';
import { AboutView } from './views/about.js?v=navfix1';
import { ExpertiseView } from './views/expertise.js?v=navfix1';
import { FaqView } from './views/faq.js?v=navfix1';
import { ReferencesView } from './views/references.js?v=navfix1';
import { ContactView } from './views/ContactView.js?v=form3';
import { DocumentsView } from './views/DocumentsView.js?v=navfix1';
import { ImpressumView } from './views/ImpressumView.js?v=email1';
import { DatenschutzView } from './views/DatenschutzView.js?v=email1';
import { CONTENT } from './content.js?v=form3';
import { Ticker } from './ticker.js?v=ticker3';
import {
    mountWarehouseActivity,
    unmountWarehouseActivity,
} from './warehouse-activity.js?v=navfix1';




class Application {

    constructor() {

        this.root =
            document.querySelector('#application');

        this.views = new Map();

        this.themeManager =
            new ThemeManager();

        this.navigation =
            new Navigation(CONTENT);

        this.ticker =
            new Ticker(CONTENT);

        this.registerViews();
        this.navigation.render();
        this.ticker.render();
        this.renderFooter();
        this.bindEvents();

        this.show(
            this.navigation.getRoute(window.location.hash),
            { focus: false }
        );
    }


    registerViews() {

        const viewObjects = [
            new HomeView(this),
            new AboutView(this),
            new ExpertiseView(this),
            new FaqView(this),
            new ReferencesView(this),
            new ContactView(this),
            new DocumentsView(this),
            new ImpressumView(this),
            new DatenschutzView(this)
        ];

        viewObjects.forEach(
            view => {
                this.views.set(
                    view.getRoute(),
                    view
                );
            }
        );
    }


    renderFooter() {

        document.querySelector('#footer-copy').textContent =
            CONTENT.footer.copy;

        document.querySelector('#footer-location').textContent =
            CONTENT.footer.location;

        document.querySelector('#footer-impressum').textContent =
            CONTENT.footer.impressum;

        document.querySelector('#footer-datenschutz').textContent =
            CONTENT.footer.datenschutz;
    }


    show(route, { focus = true } = {}) {

        const activeRoute =
            this.views.has(route) ? route : 'home';

        const view = this.views.get(activeRoute);
        const previous = this.activeView;

        this.activeView = view;

        this.root.replaceChildren(
            view.render()
        );

        if (previous && previous !== view) {
            Promise.resolve(previous.unmount?.())
                .catch(error => {
                    console.warn(
                        'Vorherige Ansicht konnte nicht sauber beendet werden.',
                        error
                    );
                });
        }

        document.body.dataset.route = activeRoute;
        this.ticker.update(activeRoute);
        this.updateHomeAnimation(activeRoute);

        const heading = this.root.querySelector('h1');

        if (heading) {
            heading.id = 'view-heading';
            this.root.setAttribute(
                'aria-labelledby',
                heading.id
            );

            document.title =
                `${heading.textContent.trim()} | Marc Schriever`;
        }

        this.updateActiveNavigation(activeRoute);

        if (focus) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'auto'
            });

            this.root.focus({
                preventScroll: true
            });
        }
    }


    updateHomeAnimation(route) {

        if (route !== 'home') {
            unmountWarehouseActivity();
            return;
        }

        if (document.querySelector('.c-home-activity')) {
            return;
        }

        mountWarehouseActivity();
    }


    navigate(route) {

        const hash = this.navigation.getHash(route);

        if (window.location.hash === `#${hash}`) {
            this.show(route);
            return;
        }

        window.location.hash = hash;
    }


    updateActiveNavigation(route) {

        document
            .querySelectorAll('a[data-route], button[data-route]')
            .forEach(element => {

                const isActive =
                    element.dataset.route === route;

                element.classList.toggle(
                    'is-active',
                    isActive
                );

                if (
                    element.matches('a') &&
                    isActive
                ) {
                    element.setAttribute(
                        'aria-current',
                        'page'
                    );
                } else {
                    element.removeAttribute('aria-current');
                }
            });
    }


    updateHeaderState() {

        document
            .querySelector('#site-header')
            .classList.toggle(
                'is-scrolled',
                window.scrollY > 0
            );
    }


    bindEvents() {

        document.addEventListener(
            'click',
            event => {

                const skipLink =
                    event.target.closest('.c-skip-link');

                if (skipLink) {
                    event.preventDefault();

                    this.root.focus({
                        preventScroll: true
                    });

                    this.root.scrollIntoView({
                        block: 'start'
                    });

                    return;
                }

                const navigationTarget =
                    event.target.closest(
                        'a[data-route], button[data-route]'
                    );

                if (!navigationTarget) {
                    return;
                }

                event.preventDefault();

                this.navigate(
                    navigationTarget.dataset.route
                );
            }
        );


        window.addEventListener(
            'hashchange',
            () => {
                this.show(
                    this.navigation.getRoute(window.location.hash)
                );
            }
        );


        window.addEventListener(
            'scroll',
            () => this.updateHeaderState(),
            { passive: true }
        );

        this.updateHeaderState();


        document
            .querySelector('#theme-switcher')
            .addEventListener(
                'click',
                () => {
                    this.themeManager.toggle();
                }
            );
    }
}


/**
 * --------------------------------------------------------------------------
 * Start
 * --------------------------------------------------------------------------
 */

new Application();













