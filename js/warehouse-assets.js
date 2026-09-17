export const FLEET_COUNTS = {
    forklift: 2,
    'pallet-jack': 1,
    pallet: 1,
    package: 12,
};

export const WAREHOUSE_ACTIVITY_COUNT = Object.values(FLEET_COUNTS)
    .reduce((sum, count) => sum + count, 0);

export const SIZE = {
    forklift: { width: 105, height: 56 },
    'pallet-jack': { width: 98, height: 56 },
    pallet: { width: 84, height: 63 },
    package: { width: 36, height: 34 },
};

export const SVG_MARKUP = {
    forklift: `
        <svg class="c-warehouse-asset c-forklift" viewBox="0 0 140 80" focusable="false">
            <rect class="c-cargo" x="5" y="14" width="43" height="42" rx="3"/>
            <path class="c-cargo-tape" d="M26 14v42M5 28h43"/>
            <path class="c-forklift__forks" d="M2 62h57M2 67h52"/>
            <rect class="c-forklift__mast" x="50" y="9" width="6" height="58" rx="2"/>
            <path class="c-forklift__body" d="M58 39h40l18 17h15v13H55V51z"/>
            <path class="c-forklift__cabin" d="M69 15h27l13 24H64z"/>
            <path class="c-forklift__window" d="M74 20h18l9 17H69z"/>
            <circle class="c-vehicle-wheel" cx="74" cy="68" r="10"/>
            <circle class="c-vehicle-wheel" cx="118" cy="68" r="10"/>
            <circle class="c-wheel-hub" cx="74" cy="68" r="4"/>
            <circle class="c-wheel-hub" cx="118" cy="68" r="4"/>
        </svg>
    `,
    'pallet-jack': `
        <svg class="c-warehouse-asset c-pallet-jack" viewBox="0 0 150 80" focusable="false">
            <rect class="c-cargo" x="45" y="17" width="42" height="35" rx="3"/>
            <rect class="c-cargo c-cargo--second" x="88" y="25" width="35" height="27" rx="3"/>
            <path class="c-cargo-tape" d="M66 17v35M105 25v27"/>
            <path class="c-pallet" d="M36 53h98v9H36zM43 62v6M126 62v6"/>
            <path class="c-pallet-jack__frame" d="M22 64h101M29 62l9-40"/>
            <path class="c-pallet-jack__handle" d="M38 22c2-11-15-14-18-4l-8 28"/>
            <circle class="c-vehicle-wheel" cx="27" cy="68" r="6"/>
            <circle class="c-vehicle-wheel" cx="119" cy="68" r="5"/>
        </svg>
    `,
    pallet: `
        <svg class="c-warehouse-asset c-pallet-load" viewBox="0 0 125 95" focusable="false">
            <rect class="c-cargo" x="8" y="43" width="48" height="40" rx="3"/>
            <rect class="c-cargo c-cargo--second" x="58" y="50" width="58" height="33" rx="3"/>
            <rect class="c-cargo c-cargo--third" x="35" y="8" width="52" height="40" rx="3"/>
            <path class="c-cargo-tape" d="M32 43v40M87 50v33M61 8v40"/>
            <path class="c-pallet" d="M4 84h116v8H4z"/>
        </svg>
    `,
    package: `
        <svg class="c-warehouse-asset c-package" viewBox="0 0 56 52" focusable="false">
            <rect class="c-cargo" x="4" y="6" width="48" height="42" rx="3"/>
            <path class="c-package__lid" d="M4 6h48v9H4z"/>
            <path class="c-cargo-tape" d="M28 6v42M4 21h48"/>
        </svg>
    `,
};
