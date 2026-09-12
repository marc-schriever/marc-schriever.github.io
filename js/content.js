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
    title: 'LOGISTIKEXPERTE',
    links: [
      { href: '#home', label: 'HOME', active: true },
      { href: '#ueber-mich', label: 'ÜBER MICH' },
      { href: '#expertise', label: 'EXPERTISE' },
      { href: '#faq', label: 'FRAGEN & ANTWORTEN' },
      { href: '#referenzen', label: 'REFERENZEN' },
      { href: '#', label: 'DOKUMENTE', id: 'nav-dokumente' },
    ],
  },

  // ── HERO ─────────────────────────────────────────────────
  hero: {
    eyebrow: '🟢 VERFÜGBAR AB SOFORT',
    headline: 'LEIDENSCHAFT FÜR LOGISTIK.',
    subline: 'Effizienz durch IT-Affinität & Führungskompetenz.',
    // Absatzgrenzen entsprechen der ursprünglichen Gedankengliederung des Texts.
    textParagraphs: [
      'Mit rund 20 Jahren Erfahrung in unterschiedlichen Positionen der Lagerlogistik habe ich sowohl operative als auch führende Rollen durchlaufen und kenne im Warehousing jeden operativen Handgriff.',
      'In knapp 10 Jahre Führungserfahrung, habe ich Prozesse verantwortet, Teams geführt und entwickelt, KVP und PDCA angewendet, bevor ich die Fachbegriffe dafür kannte.',
      'Damit bringe ich nicht nur langjährige Führungserfahrung, sondern vor allem Praxisnähe mit.',
      'Während meiner Ausbildung zum Fachinformatiker Anwendungsentwicklung, welche ich leider nicht erfolgreich beendete, erlernte ich Grundlagen wie Clean Code, OOP und MVC, die ich seitdem für bedarfsgerechte, KI-gestützte digitale Werkzeuge nutze.',
      'Komplikationen im Tagesgeschäft löse ich so eigenständig, von der Idee bis zur einsatzfähigen App.',
    ],
    btn_primary: 'MEHR ERFAHREN',
    btn_secondary: 'KONTAKT AUFNEHMEN',
  },

  // ── STATS ─────────────────────────────────────────────────
  stats: [
    { icon: 'ti-users', title: 'FÜHRUNGSSTÄRKE', text: '9 Jahre Führungserfahrung in der Lagerlogistik.' },
    { icon: 'ti-chart-line', title: 'PROZESSOPTIMIERUNG', text: 'Abläufe verbessern, Effizienz nachhaltig steigern.' },
    { icon: 'ti-cpu', title: 'DIGITALISIERUNG', text: 'Prozesse analysieren und digital automatisieren.' },
    { icon: 'ti-clock', title: '20+ JAHRE LOGISTIK', text: 'Operative Erfahrung vom Wareneingang bis zur Leitung.' },
  ],

  // ── ÜBER MICH ────────────────────────────────────────────
  about: {
    eyebrow: 'ICH BIETE...',
    headline: 'ZIELORIENTIERUNG. VERANTWORTUNGSBEWUSSTSEIN. UMSETZUNGSSTÄRKE.',
    philosophyParagraphs: [
      '1973 in Bremen geboren. Hanseat, gelernter Kaufmann und leidenschaftlicher Logistiker. Mit über 30 Jahren Berufserfahrung, davon mehr als zwei Jahrzehnte in der operativen und strategischen Logistik, kenne ich jeden Handgriff von der Pike auf. Mein Fundament bildet die kaufmännische Ausbildung im Groß- und Außenhandel sowie eine tiefgehende IT-Qualifikation über 2.979 Unterrichtsstunden in der Anwendungsentwicklung.',
      'Diese seltene Kombination erlaubt es mir, Logistikketten nicht nur effizient zu leiten, sondern Engpässe sofort durch selbst entwickelte, KI-gestützte Prozesswerkzeuge digital zu automatisieren. Vom Hochregallager bis zur eigenverantwortlichen Bereichsleitung: Ich denke nicht in Problemen, sondern in skalierbaren Systemen.',
    ],
    credoParagraphs: [
      'Prozessphilosophie: Der Prozess führt, nicht die Disziplin. Fehler sind selten Zufall. Sie sind das logische Ergebnis schlechter Prozesse. Mein Ansatz: ein digitaler Arbeitsablauf führt den Mitarbeiter, nicht umgekehrt.',
      'Wo Zuordnung, Erfassung oder Nachschub bislang von manueller Sorgfalt abhingen, ersetze ich das durch Systeme, die Fehlerquellen strukturell minimieren, im Sinne kontinuierlicher Prozessverbesserung (KVP) nach dem PDCA-Zyklus. Konkret umgesetzt in einem selbst entwickelten Label-Generator, der Reklamationen messbar reduzierte, einem digitalen Mutter-Kind-Nachschubtool, das einen 30-minütigen manuellen Vorgang auf 15 Sekunden verkürzte, und einem durchgängigen Nummern- und Zuordnungssystem für Karton, Inhalt und Palette in der Versandvorbereitung, das Fehlzuordnungen bei Verladung und Versand strukturell verhindert.',
    ],
    facts: [
      { year: '1973', label: 'In Bremen geboren' },
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
    headline: '',
    logos: [
      { html: 'J.H. JAEGER & EGGERS' },
      { html: 'B.O.C.' },
      { html: 'METRO LOGISTICS' },
      { html: 'KÜHNE + NAGEL' },
    ],
  },

  photo: {
    placeholder: 'Führungskraft Logistik · Jahrgang 1973',
  },

  form: {
    label_name: 'Name',
    label_email: 'E-Mail',
    label_message: 'Nachricht',
    placeholder_name: 'Ihr Name',
    placeholder_email: 'Ihre E-Mail-Adresse',
    placeholder_message: 'Ihre Nachricht',
    submit: 'NACHRICHT SENDEN',
  },

  kontakt: {
    eyebrow: 'KONTAKT',
    headline: 'NEHMEN SIE KONTAKT AUF',
    text: 'Ich freue mich über Ihre Nachricht und melde mich persönlich bei Ihnen. Weitere Unterlagen sende ich Ihnen auf Anfrage gerne zu.',
  },

  dokumente: {
    title: 'Geschützte Dokumente',
    intro: 'Bitte geben Sie Ihren persönlichen Zugangstoken ein oder nutzen Sie den QR-Scanner, um Unterlagen freizuschalten.',
    tokenLabel: 'Zugangstoken',
    tokenPlaceholder: 'Token hier eingeben...',
    scanButton: 'Scan',
    submit: 'Freischalten',
    successTitle: 'Zugang erfolgreich verifiziert!',
    successText: 'Sie können die Unterlagen jetzt herunterladen.',
    downloadButton: 'Dokumente Herunterladen (PDF)',
  },

  scanner: {
    title: 'QR-Code Scannen',
    intro: 'Richten Sie die Kamera auf den QR-Code mit Ihrem Token.',
  },

  impressum: {
    title: 'Impressum',
    name: 'Marc Schriever',
    role: 'Logistikexperte',
    location: 'Bremen, Deutschland',
    email: 'kontakt@marc-schriever.de',
  },

  datenschutz: {
    title: 'Datenschutzerklärung',
    // Der eigentliche Rechtstext liegt in legal/datenschutz.html, nicht hier,
    // damit er ohne JS-Kenntnisse direkt bearbeitet werden kann.
    // Geladen von js/legal-content.js.
    contentUrl: 'legal/datenschutz.html',
  },

  footer: {
    copy: '© 2026 Marc Schriever · Logistikexperte',
    location: 'Bremen, Deutschland',
    impressum: 'Impressum',
    datenschutz: 'Datenschutz',
  },

};
