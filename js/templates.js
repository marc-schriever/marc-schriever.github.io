// ============================================================================
// TEMPLATES.JS — Reine Funktionen: Daten -> HTML-String nach OOCSS
// ============================================================================

export const navLinkTemplate = (link) => {
  const btnClass = link.isButton ? ' c-navbar__link--btn' : '';
  return `<li><a href="${link.href}" class="c-navbar__link${btnClass}${link.active ? ' is-active' : ''}"${link.id ? ` id="${link.id}"` : ''}>${link.label}</a></li>`;
};

export const statTemplate = (stat) => `
  <div class="c-card reveal">
    <div class="c-card__icon">
      <i class="ti ${stat.icon}" aria-hidden="true"></i>
    </div>
    <h3 class="c-card__title">${stat.title}</h3>
    <p class="c-card__text">${stat.text}</p>
  </div>`;

export const expertiseBlockTemplate = (block) => `
  <div class="c-card reveal">
    <div class="o-flex o-flex--center o-flex--gap-sm u-mb-md">
      <div class="c-card__icon" style="margin-bottom:0;">
        <i class="ti ${block.icon}" aria-hidden="true"></i>
      </div>
      <h3 class="c-card__title" style="margin-bottom:0;">${block.title}</h3>
    </div>
    <ul class="c-expertise-list">
      ${block.items.map((item) => `<li class="c-expertise-list__item">${item}</li>`).join('')}
    </ul>
  </div>`;

export const faqItemTemplate = (item, index) => `
  <div class="c-accordion__item faq-item reveal" id="faq-${index}">
    <button class="c-accordion__trigger faq-q" aria-expanded="false" aria-controls="faq-a-${index}">
      <span class="c-accordion__question">${item.q}</span>
      <i class="ti ti-chevron-down c-accordion__icon" aria-hidden="true"></i>
    </button>
    <div class="c-accordion__panel faq-a" id="faq-a-${index}">
      <p>${item.a}</p>
    </div>
  </div>`;

export const referenzLogoTemplate = (logo) =>
  `<div class="c-reference-item">${logo.html}</div>`;

export const factRowTemplate = (fact) => `
  <div class="c-fact-badge">
    <span class="c-fact-badge__num">${fact.year}</span>
    <span class="c-fact-badge__label">${fact.label}</span>
  </div>`;

export const legalSectionTemplate = (section) => `
  <div class="c-legal-section">
    <h4 class="c-legal-section__heading">${section.heading}</h4>
    ${section.paragraphs.map((p) => `<p>${p}</p>`).join('')}
  </div>`;