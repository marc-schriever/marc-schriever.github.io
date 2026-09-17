function tokenFromScan(text) {
    const value = String(text || '').trim();

    if (!value) {
        return '';
    }

    const queryMatch = value.match(/[?&]token=([^&#]+)/i);

    if (queryMatch) {
        return decodeURIComponent(queryMatch[1]).trim();
    }

    return value;
}

export class QrTokenScanner {

    constructor() {
        this.scanner = null;
        this.modal = null;
        this.reader = null;
        this.status = null;
        this.onToken = null;
    }

    bind(section, onToken) {
        this.modal = section.querySelector('[data-scanner-modal]');
        this.reader = section.querySelector('[data-scanner-reader]');
        this.status = section.querySelector('[data-scanner-status]');
        this.onToken = onToken;

        section.querySelector('[data-document-scan]')
            ?.addEventListener('click', () => this.open());

        this.modal?.querySelector('[data-scanner-close]')
            ?.addEventListener('click', () => this.close());

        this.modal?.querySelector('[data-scanner-backdrop]')
            ?.addEventListener('click', () => this.close());

        this.onKeydown = event => {
            if (event.key === 'Escape' && this.isOpen()) {
                event.preventDefault();
                this.close();
            }
        };

        document.addEventListener('keydown', this.onKeydown);
    }

    isOpen() {
        return this.modal?.hidden === false;
    }

    async open() {
        if (!this.modal || !this.reader) {
            return;
        }

        if (typeof window.Html5Qrcode === 'undefined') {
            this.setStatus(
                'Der QR-Scanner konnte nicht geladen werden.'
            );
            return;
        }

        this.modal.hidden = false;
        this.modal.querySelector('[data-scanner-close]')?.focus();
        this.setStatus('');

        await new Promise(resolve => requestAnimationFrame(resolve));

        this.scanner = new window.Html5Qrcode(this.reader.id);

        try {
            await this.scanner.start(
                { facingMode: 'environment' },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                },
                decodedText => {
                    const token = tokenFromScan(decodedText);

                    if (!token) {
                        return;
                    }

                    this.onToken?.(token);
                    this.close();
                },
                () => {}
            );
        } catch (error) {
            console.error('Kamera konnte nicht geöffnet werden.', error);
            this.setStatus(
                'Kamera konnte nicht geöffnet werden. Bitte Token manuell eingeben.'
            );
            await this.stopCamera();
        }
    }

    async close() {
        await this.stopCamera();

        if (this.modal) {
            this.modal.hidden = true;
        }
    }

    async stopCamera() {
        if (!this.scanner) {
            return;
        }

        try {
            const state = this.scanner.getState?.();
            const scanning =
                window.Html5QrcodeScannerState?.SCANNING;
            const paused =
                window.Html5QrcodeScannerState?.PAUSED;

            if (!state || state === scanning || state === paused) {
                await this.scanner.stop();
            }

            this.scanner.clear();
        } catch (error) {
            console.warn('Kamera-Stopp abgefangen:', error);
        } finally {
            this.scanner = null;
        }
    }

    setStatus(message) {
        if (this.status) {
            this.status.textContent = message;
        }
    }

    unmount() {
        document.removeEventListener('keydown', this.onKeydown);
        return this.close();
    }
}
