// ============================================================================
// CONTENT.JS — Zentrale Inhaltsquelle
// Reine Daten, keine Logik. Wortlaut identisch zur bisherigen Version.
// Textblöcke mit mehreren Sätzen sind als Absatz-Arrays modelliert, damit
// main.js sie ohne HTML-Bastelei als <p>-Elemente rendern kann.
// ============================================================================

export const CONTENT = {

  // ── NAVIGATION ───────────────────────────────────────────
  nav: {
    name: 'MARC SCHRIEVER',
    title: 'LAGERLEITER',
    links: [
      { href: '#home', label: 'HOME', shortLabel: 'HOME', active: true },
      { href: '#ueber-mich', label: 'ÜBER MICH', shortLabel: 'ÜBER' },
      { href: '#expertise', label: 'EXPERTISE', shortLabel: 'EXPERTISE' },
      { href: '#faq', label: 'FRAGEN & ANTWORTEN', shortLabel: 'FAQ' },
      { href: '#referenzen', label: 'REFERENZEN', shortLabel: 'REF.' },
    ],
  },

  // ── HERO ─────────────────────────────────────────────────
  hero: {
    eyebrow: 'VERFÜGBAR AB SOFORT',
    headline: 'LEIDENSCHAFT FÜR LOGISTIK',
    subline: 'Effizienz durch IT-Affinität & Führungskompetenz.',
    // Absatzgrenzen entsprechen der ursprünglichen Gedankengliederung des Texts.
    textParagraphs: [
      '1973 in Bremen geboren, habe ich 1994 meine Ausbildung zum Kaufmann im Groß- und Außenhandel erfolgreich abgeschlossen. Mein beruflicher Weg führte mich anschließend in die Logistik. Was zunächst eher zufällig begann, entwickelte sich schnell zu einer bewussten beruflichen Entscheidung, in deren Verlauf ich mich über verschiedene verantwortungsvolle Positionen kontinuierlich weiterentwickelt habe.',
      'Zunächst übernahm ich die fachliche Führung kleiner Teams, später die Leitung des Wareneingangs sowie temporär die Vertretung der Lagerleitung. Meine letzte Station führte mich schließlich zur dreijährigen Gesamtverantwortung für den Lagerbereich.',
      'Besonderen Fokus lege ich dabei auf die operative Steuerung, insbesondere auf die Führung und Entwicklung von Mitarbeitern, die Optimierung von Abläufen sowie auf eine wirtschaftliche und leistungsorientierte Organisation des gesamten Lagerbereichs.',
      'Zusätzlich absolvierte ich 2018 eine Umschulung zum Fachinformatiker für Anwendungsentwicklung, die ich aufgrund der Corona-Situation abbrechen musste.',
    ],
    btn_primary: 'MEHR ERFAHREN',
    btn_secondary: 'KONTAKT AUFNEHMEN',
  },

  sectionHeadings: {
    stats: 'AUF EINEN BLICK',
    facts: 'MEIN WERDEGANG IN ZAHLEN',
    achievements: 'MESSBARE ERGEBNISSE',
  },

  // ── STATS ─────────────────────────────────────────────────
  stats: [
    { title: 'FÜHRUNGSSTÄRKE', text: '9 Jahre Führungserfahrung in der Lagerlogistik.' },
    { title: 'PROZESSOPTIMIERUNG', text: 'Abläufe verbessern, Effizienz nachhaltig steigern.' },
    { title: 'DIGITALISIERUNG', text: 'Prozesse analysieren und digital automatisieren.' },
    { title: '20+ JAHRE LOGISTIK', text: 'Operative Erfahrung vom Wareneingang bis zur Leitung.' },
  ],

  // ── ÜBER MICH ────────────────────────────────────────────
  about: {
    eyebrow: 'ICH BIETE...',
    headline: 'ZIELORIENTIERUNG. VERANTWORTUNGS\u00ADBEWUSSTSEIN. UMSETZUNGS\u00ADSTÄRKE.',
    philosophyParagraphs: [
      'Ich verbinde operative Logistikerfahrung mit technischem Verständnis und entwickle daraus praxisorientierte Lösungen für wiederkehrende Abläufe und Prozessschwachstellen. Dabei geht es mir nicht darum, bestehende Prozesse lediglich zu verwalten, sondern darum, sie nachvollziehbar, prozesssicher und effizient zu gestalten.',
      'Mein Ansatz folgt dabei einem klaren Grundsatz: Nicht die Disziplin des Mitarbeiters soll Abweichungen verhindern, sondern ein sauber aufgebauter Prozess. Wo Zuordnung, Erfassung oder Nachschub bislang von manueller Sorgfalt abhängig waren, setze ich auf systemgestützte Abläufe, die mögliche Fehlerquellen bereits im Prozess minimieren. Grundlage dafür ist die kontinuierliche Prozessverbesserung nach dem PDCA-Zyklus.',
      'Diese Verbindung aus Logistikpraxis und Anwendungsentwicklung habe ich unter anderem in eigenen Lösungen umgesetzt: Ein selbst entwickelter Label-Generator reduzierte Reklamationen messbar. Ein digitales Mutter-Kind-Nachschubtool verkürzte einen zuvor rund 30-minütigen manuellen Vorgang auf etwa 20 Sekunden. Ein durchgängiges Nummern- und Zuordnungssystem für Karton, Inhalt und Palette in der Versandvorbereitung verhindert Fehlzuordnungen bei Verladung und Versand strukturell.',
      'Ich bringe damit langjährige Erfahrung in der operativen Lagerführung mit der Fähigkeit zusammen, Prozesse nicht nur zu steuern, sondern ihre Schwachstellen zu erkennen und mit geeigneten digitalen Lösungen nachhaltig zu verbessern.',
    ],
    credoHeadline: 'PRAXIS STATT THEORIE',
    credoParagraphs: [
      'Meine Stärke liegt in der kontinuierlichen Verbesserung nach dem Kaizen-Prinzip: nicht der radikale Umbruch zählt, sondern die konsequente Summe vieler kleiner Schritte im Alltag. Dabei steht für mich nicht nur das Ergebnis im Fokus, sondern der Weg dorthin, Prozesse werden fortlaufend hinterfragt und weiterentwickelt, nicht einmalig optimiert und dann liegen gelassen.',
      'Verbesserung gelingt dabei nie im Alleingang. Ich beziehe jede Ebene im Team aktiv ein, denn die besten Ideen zur Optimierung entstehen dort, wo tatsächlich gearbeitet wird, nicht am Schreibtisch darüber.',
      'Mein berufliches Fundament aus kaufmännischer Ausbildung und über 30 Jahren Berufserfahrung in der Logistik hat meinen Weg geprägt. Es verbindet kaufmännisches Verständnis mit langjähriger praktischer Erfahrung in der Lagerorganisation, Prozesssteuerung und Mitarbeiterführung. Ergänzt wird dieses Profil durch meine IT-Qualifikation in der Anwendungsentwicklung.',
    ],
    facts: [
      { year: '30', label: 'Jahre Erfahrung in Handel & Logistik' },
      { year: 'IHK', label: 'Zertifizierter Gefahrgutbeauftragter' },
      { year: '2.979h', label: 'Fachinformatiker Anwendungsentwicklung' },
      { year: '1994', label: 'IHK Abschluss zum Groß- und Außenhandelskaufmann' },
    ],
  },

  // ── EXPERTISE ─────────────────────────────────────────────
  expertise: {
    eyebrow: 'MEINE EXPERTISE',
    headline: 'KOMPETENZEN & QUALIFIKATIONEN',
    blocks: [
      {
        icon: 'ti-building-warehouse',
        title: 'FACHKOMPETENZ',
        items: [
          'Lagerlogistik und Warehouse Management',
          'Warenannahme, Kommissionierung, Verpackung und Versand',
          'Prozessoptimierung und Warenflusssteuerung',
          'Kontinuierliche Prozessverbesserung und Verschwendungsreduktion',
          'Mitarbeiterführung und Personalplanung',
          'Tourenplanung und Koordination externer Dienstleister',
          'Bestandsmanagement, Inventur und Retourenabwicklung',
          'Einarbeitung und Mitarbeiterentwicklung',
          'Arbeitssicherheit und Gesundheitsschutz im Lager',
          'Erfassung von Versand- und Begleitpapieren',
        ],
      },
      {
        icon: 'ti-cpu',
        title: 'DIGITALKOMPETENZ',
        items: [
          'Entwicklung webbasierter Prozesswerkzeuge mit KI-Unterstützung',
          'Prompt Engineering und AI-assisted Development',
          'Prozessautomatisierung',
          'Datenanalyse und Auswertung',
          'GeVis, Microsoft Dynamics NAV, Excel',
        ],
      },
      {
        icon: 'ti-certificate',
        title: 'ZERTIFIZIERUNGEN',
        items: [
          'IHK Gefahrgutbeauftragter, gültig bis 24.03.2030',
          'Ladungssicherung VDI 2700, 2022',
          'Erste Hilfe ASB, 2026',
          'Führerschein B und BE',
        ],
      },
      {
        icon: 'ti-heart',
        title: 'PERSÖNLICHE STÄRKEN',
        items: [
          'Eigeninitiative und Umsetzungsstärke',
          'Strukturierte und sorgfältige Arbeitsweise',
          'Belastbarkeit bei hohem Arbeitsaufkommen',
          'Schnelle Einarbeitung in neue Aufgabenbereiche',
          'Motivationsstärke in der Mitarbeiterführung',
          'Hohe Identifikation mit der Führungsverantwortung',
        ],
      },
    ],
  },

  // ── FAQ ───────────────────────────────────────────────────
  achievements: [
    'Auswertezeit von 30 Minuten auf unter 20 Sekunden reduziert',
    'Reklamationen durch eigenen Label-Generator messbar gesenkt',
    'Wareneingangs-Durchsatz bei B.O.C. von 10.000 auf 15.000 Einheiten gesteigert',
    'Kommissionierwege durch neue Regalzone nachhaltig verkürzt',
    'Fehlzuordnungen bei Verladung und Versand strukturell verhindert',
    'Personalverantwortung für vier Mitarbeitende',
    'Gesamtverantwortung für 2.000 m² Lagerfläche mit über 8.000 Artikeln',
  ],

  faq: {
    eyebrow: 'FRAGEN & ANTWORTEN',
    headline: 'HÄUFIG GESTELLTE FRAGEN',
    items: [
      { q: 'Welchen Führungsstil bevorzugen Sie?', a: 'Situativ und kooperativ. Am Anfang bin ich eng dabei, zeige Abläufe selbst vor und prüfe das Verständnis. Schritt für Schritt gebe ich Verantwortung ab. Operative Präsenz ist mein wichtigstes Führungsinstrument. Ich bin im Lager, nicht im Büro.' },
      { q: 'Wie gehen Sie mit Konflikten im Team um?', a: 'Direkt ansprechen, beide Seiten hören, Sach- von Beziehungsebene trennen. Wenn nötig entscheide ich. Eine Entscheidung ist besser als Stillstand. Das Ziel ist immer eine funktionierende Zusammenarbeit, keine Schuldzuweisung.' },
      { q: 'Wie arbeiten Sie neue Mitarbeitende ein?', a: 'Zunächst eng begleiten, Abläufe selbst zeigen, Zusammenhänge erklären und Feedback geben. Erst wenn das Verständnis da ist, lasse ich los. Dauerhaftes Anleiten fördert weder Selbstständigkeit noch Vertrauen.' },
      { q: 'Nennen Sie ein konkretes Beispiel für eine Prozessverbesserung.', a: 'Ich habe eine webbasierte Anwendung entwickelt, die manuelle Auswertungen von bis zu 30 Minuten auf unter 20 Sekunden reduziert hat. Zusätzlich habe ich die Lagerstruktur durch Einrichtung einer kundenspezifischen Regalzone neuorganisiert. Kommissionierwege und Durchlaufzeiten wurden dadurch nachhaltig verkürzt.' },
      { q: 'Wie steigern Sie den Durchsatz ohne zusätzliches Personal?', a: 'Durch Analyse der Warenflüsse, Optimierung der Prozessabläufe und gezielte Umstrukturierung der Lagerhaltung. Bei B.O.C. habe ich den täglichen Wareneingangs-Durchsatz von 10.000 auf 15.000 Einheiten gesteigert. Ohne Personalaufbau, allein durch optimierte Warenflusssteuerung.' },
      { q: 'Warum verlassen Sie Ihren bisherigen Arbeitgeber?', a: 'Es gab unterschiedliche Auffassungen über die Vertragsgrundlage. Ich habe meinen Standpunkt vertreten und durchgesetzt. Das Arbeitsverhältnis habe ich daraufhin auf eigenen Wunsch beendet.' },
      { q: 'Wo sehen Sie sich in fünf Jahren?', a: 'In einer Führungsposition in der Logistik mit wachsender Verantwortung, in einem Unternehmen das Digitalisierung und Prozessoptimierung als strategisches Ziel verfolgt. Verwalten reicht mir nicht. Ich möchte gestalten.' },
      { q: 'Was unterscheidet Sie von anderen Bewerbern?', a: 'Ich kombiniere operative Führungserfahrung mit der Fähigkeit, digitale Prozesslösungen selbst umzusetzen. Wenn ein Prozess sich automatisieren lässt, entwickle ich die Lösung. Ohne externes IT-Budget, ohne Agentur. Das ist in der Lagerlogistik selten.' },
    ],
  },

  // ── REFERENZEN ────────────────────────────────────────────
  referenzen: {
    eyebrow: 'REFERENZEN',
    headline: 'Referenzen',
    logos: [
      { html: 'J.H. JAEGER & EGGERS' },
      { html: 'B.O.C.' },
      { html: 'METRO LOGISTICS' },
      { html: 'KÜHNE + NAGEL' },
    ],
    photo: {
      src: './assets/images/lager-1.jpg',
      webp: './assets/images/lager-1.webp',
      alt: 'Lagerkennzeichnung mit Stellplatzcodes S 24 und SP 2',
      caption: 'Lagerkennzeichnung mit Stellplatzcodes S 24 und SP 2',
    },
  },

  // Profilbild: Datei nach src/assets/images/portrait.jpg legen.
  photo: {
    src: './assets/images/portrait.jpg',
    alt: 'Marc Schriever',
    name: 'Marc Schriever',
    placeholder: 'Führungskraft Logistik · Jahrgang 1973',
  },

  form: {
    endpoint: 'https://script.google.com/macros/s/AKfycbwArd0wj41bi0oq_WXeba6jtjuFN2e8-5IgfYlqKepQN_vkczde_YCImmpv8DPyjuYThA/exec',
    label_name: 'Name',
    label_email: 'E-Mail',
    label_message: 'Nachricht',
    placeholder_name: 'Ihr Name',
    placeholder_email: 'Ihre E-Mail-Adresse',
    placeholder_message: 'Ihre Nachricht',
    submit: 'NACHRICHT SENDEN',
    status_sending: 'Nachricht wird gesendet …',
    status_success: 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.',
    status_error: 'Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',
  },

  kontakt: {
    eyebrow: 'KONTAKT',
    headline: 'NEHMEN SIE KONTAKT AUF',
    text: 'Ich freue mich über Ihre Nachricht und melde mich persönlich bei Ihnen. Weitere Unterlagen sende ich Ihnen auf Anfrage gerne zu.',
  },

  impressum: {
    eyebrow: 'RECHTLICHES',
    title: 'Impressum',
    name: 'Marc Schriever',
    role: 'Lagerleiter',
    // Hier die ladungsfähige Anschrift eintragen, zum Beispiel:
    // 'Musterstraße 1\n28195 Bremen'
    address: 'Hemelinger Bahnhofstraße 30-32',
    location: '28309 Bremen, Deutschland',
    // Echte Adresse eintragen, sobald das Postfach existiert.
    // Solange leer, wird keine E-Mail veröffentlicht.
    email: 'marc.schriever@gmail.com',
  },

  datenschutz: {
    eyebrow: 'RECHTLICHES',
    title: 'Datenschutzerklärung',
    // Der eigentliche Rechtstext liegt in legal/datenschutz.html.
    // Name, Anschrift und E-Mail kommen aus impressum oben.
    contentUrl: 'legal/datenschutz.html',
  },

  footer: {
    copy: '© 2026 Marc Schriever · Lager & Logistik',
    location: 'Bremen, Deutschland',
    impressum: 'Impressum',
    datenschutz: 'Datenschutz',
  },

};

export function publishedEmail() {
    const email = String(CONTENT.impressum.email || '').trim();

    return email.includes('@') ? email : '';
}
