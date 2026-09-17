export class ThemeManager {
    constructor() {
        this.storageKey = 'marc-schriever-theme';

        this.mediaQuery = window.matchMedia(
            '(prefers-color-scheme: dark)'
        );

        this.currentTheme = this.loadTheme();

        this.applyTheme();
        this.bindSystemPreference();
    }

    loadTheme() {
        const savedTheme = localStorage.getItem(this.storageKey);

        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme;
        }

        return this.mediaQuery.matches ? 'dark' : 'light';
    }

    applyTheme() {
        document.documentElement.dataset.theme = this.currentTheme;

        const switcher =
            document.querySelector('#theme-switcher');

        const isDark = this.currentTheme === 'dark';

        switcher.setAttribute(
            'aria-pressed',
            String(isDark)
        );

        switcher.title =
            isDark
                ? 'Dunkles Design ist aktiv'
                : 'Helles Design ist aktiv';
    }

    bindSystemPreference() {
        this.mediaQuery.addEventListener('change', (event) => {
            if (!localStorage.getItem(this.storageKey)) {
                this.currentTheme = event.matches ? 'dark' : 'light';
                this.applyTheme();
            }
        });
    }

    toggle() {
        this.currentTheme =
            this.currentTheme === 'dark' ? 'light' : 'dark';

        localStorage.setItem(
            this.storageKey,
            this.currentTheme
        );

        this.applyTheme();
    }
}
