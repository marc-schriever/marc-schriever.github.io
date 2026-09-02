const CONTENT = {

  // ── NAVIGATION ───────────────────────────────────────────
  nav: {
    name:  'MARC SCHRIEVER',
    title: 'LOGISTIKEXPERTE',
    links: [
      { href: '#home',        label: 'HOME',               active: true },
      { href: '#ueber-mich',  label: 'ÜBER MICH' },
      { href: '#expertise',   label: 'EXPERTISE' },
      { href: '#faq',         label: 'FRAGEN & ANTWORTEN' },
      { href: '#referenzen',  label: 'REFERENZEN' },
      { href: '#',            label: 'DOKUMENTE',          id: 'nav-dokumente' },
    ],
  },

  // ── HERO ─────────────────────────────────────────────────
  hero: {
    eyebrow:    '🟢 VERFÜGBAR AB SOFORT',
    headline:   'LEIDENSCHAFT FÜR LOGISTIK.',
    subline:    'Effizienz durch IT-Affinität & Führungskompetenz.',
    text:       'Als erfahrene Führungskraft optimiere ich Ihre Supply Chain. Ich habe manuelle Auswertezeiten in der Lagerlogistik durch selbst initiierte, KI-gestützte Webanwendungen von 30 Minuten auf unter 20 Sekunden verkürzt (98% Zeitersparnis).',
    btn_primary:   'MEHR ERFAHREN',
    btn_secondary: 'KONTAKT AUFNEHMEN',
  },

  // ── STATS ─────────────────────────────────────────────────
  stats: [
    { icon: 'ti-users',      title: 'FÜHRUNGSSTÄRKE',     text: '9 Jahre Führungserfahrung in der Lagerlogistik.'        },
    { icon: 'ti-chart-line', title: 'PROZESSOPTIMIERUNG', text: 'Abläufe verbessern, Effizienz nachhaltig steigern.'     },
    { icon: 'ti-cpu',        title: 'DIGITALISIERUNG',    text: 'Prozesse analysieren und digital automatisieren.'       },
    { icon: 'ti-clock',      title: '20+ JAHRE LOGISTIK', text: 'Operative Erfahrung vom Wareneingang bis zur Leitung.'  },
  ],

  // ── ÜBER MICH (Erweiterter, aussagekräftiger Profiltext) ──
  about: {
    eyebrow:  'ÜBER MICH',
    headline: 'ZIELORIENTIERT. VERANTWORTUNGSBEWUSST. UMSETZUNGSSTARK.',
    philosophy: '1973 in Bremen geboren. Hanseat, gelernter Kaufmann und leidenschaftlicher Logistiker. Mit über 30 Jahren Berufserfahrung, davon mehr als zwei Jahrzehnte in der operativen und strategischen Logistik, kenne ich jeden Handgriff von der Pike auf. Mein Fundament bildet die kaufmännische Ausbildung im Groß- und Außenhandel sowie eine tiefgehende IT-Qualifikation über 2.979 Unterrichtsstunden in der Anwendungsentwicklung. Diese seltene Kombination erlaubt es mir, Logistikketten nicht nur effizient zu leiten, sondern Engpässe sofort durch selbst entwickelte, KI-gestützte Prozesswerkzeuge digital zu automatisieren. Vom Hochregallager bis zur eigenverantwortlichen Bereichsleitung: Ich denke nicht in Problemen, sondern in skalierbaren Systemen.',
    credo: 'Wenn ein Ablauf mich stört, analysiere ich ihn. Wenn er sich automatisieren lässt, programmiere ich die Lösung selbst. Mein Anspruch: Dinge, die nicht funktionieren, mache ich besser.',
    // Die 5 Zeilen-Bausteine für die rechte Kachel bleiben unverändert
    fact_born: 'In Bremen geboren',
    fact_exp: 'Jahre Erfahrung in Handel & Logistik',
    fact_cert: 'Zertifizierter Gefahrgutbeauftragter',
    fact_it: 'Fachinformatiker Anwendungsentwicklung',
    fact_kfm: 'IHK Abschluss zum Groß- und Außenhandelskaufmann',
  },



  // ── EXPERTISE ─────────────────────────────────────────────
  expertise: {
    eyebrow:  'MEINE EXPERTISE',
    headline: 'KOMPETENZEN & QUALIFIKATIONEN',
    blocks: [
      {
        icon:  'ti-building-warehouse',
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
        icon:  'ti-cpu',
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
        icon:  'ti-certificate',
        title: 'ZERTIFIZIERUNGEN',
        items: [
          'IHK Gefahrgutbeauftragter, gültig bis 24.03.2030',
          'Ladungssicherung VDI 2700, 2022',
          'Erste Hilfe ASB, 2026',
          'Führerschein B und BE',
        ],
      },
      {
        icon:  'ti-heart',
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
    eyebrow:  'FRAGEN & ANTWORTEN',
    items: [
      {
        q: 'Welchen Führungsstil bevorzugen Sie?',
        a: 'Situativ und kooperativ. Am Anfang bin ich eng dabei, zeige Abläufe selbst vor und prüfe das Verständnis. Schritt für Schritt gebe ich Verantwortung ab. Operative Präsenz ist mein wichtigstes Führungsinstrument. Ich bin im Lager, nicht im Büro.',
      },
      {
        q: 'Wie gehen Sie mit Konflikten im Team um?',
        a: 'Direkt ansprechen, beide Seiten hören, Sach- von Beziehungsebene trennen. Wenn nötig entscheide ich. Eine Entscheidung ist besser als Stillstand. Das Ziel ist immer eine funktionierende Zusammenarbeit, keine Schuldzuweisung.',
      },
      {
        q: 'Wie arbeiten Sie neue Mitarbeitende ein?',
        a: 'Zunächst eng begleiten, Abläufe selbst zeigen, Zusammenhänge erklären und Feedback geben. Erst wenn das Verständnis da ist, lasse ich los. Dauerhaftes Anleiten fördert weder Selbstständigkeit noch Vertrauen.',
      },
      {
        q: 'Nennen Sie ein konkretes Beispiel für eine Prozessverbesserung.',
        a: 'Ich habe eine webbasierte Anwendung entwickelt, die manuelle Auswertungen von bis zu 30 Minuten auf unter 20 Sekunden reduziert hat. Zusätzlich habe ich die Lagerstruktur durch Einrichtung einer kundenspezifischen Regalzone neuorganisiert. Kommissionierwege und Durchlaufzeiten wurden dadurch nachhaltig verkürzt.',
      },
      {
        q: 'Wie steigern Sie den Durchsatz ohne zusätzliches Personal?',
        a: 'Durch Analyse der Warenflüsse, Optimierung der Prozessabläufe und gezielte Umstrukturierung der Lagerhaltung. Bei B.O.C. habe ich den täglichen Wareneingangs-Durchsatz von 10.000 auf 15.000 Einheiten gesteigert. Ohne Personalaufbau, allein durch optimierte Warenflusssteuerung.',
      },
      {
        q: 'Warum verlassen Sie Ihren bisherigen Arbeitgeber?',
        a: 'Es gab unterschiedliche Auffassungen über die Vertragsgrundlage. Ich habe meinen Standpunkt vertreten und durchgesetzt. Das Arbeitsverhältnis habe ich daraufhin auf eigenen Wunsch beendet.',
      },
      {
        q: 'Wo sehen Sie sich in fünf Jahren?',
        a: 'In einer Führungsposition in der Logistik mit wachsender Verantwortung, in einem Unternehmen das Digitalisierung und Prozessoptimierung als strategisches Ziel verfolgt. Verwalten reicht mir nicht. Ich möchte gestalten.',
      },
      {
        q: 'Was unterscheidet Sie von anderen Bewerbern?',
        a: 'Ich kombiniere operative Führungserfahrung mit der Fähigkeit, digitale Prozesslösungen selbst umzusetzen. Wenn ein Prozess sich automatisieren lässt, entwickle ich die Lösung. Ohne externes IT-Budget, ohne Agentur. Das ist in der Lagerlogistik selten.',
      },
    ],
  },

  // ── REFERENZEN ────────────────────────────────────────────
  referenzen: {
    eyebrow:  'REFERENZEN',
    headline: '',
    logos: [
      { html: 'J.H. JAEGER & EGGERS'              },
      { html: 'B.O.C.'                             },
      { html: 'METRO<br>LOGISTICS'                 },
      { html: 'KÜHNE<br>+<br>NAGEL'               },
    ],
  },

  // ── FOTO
  photo: {
    placeholder: 'Führungskraft Logistik · Jahrgang 1973',
  },

  // ── FORMULAR
  form: {
    label_name:          'Name',
    label_email:         'E-Mail',
    label_message:       'Nachricht',
    placeholder_name:    'Ihr Name',
    placeholder_email:   'Ihre E-Mail-Adresse',
    placeholder_message: 'Ihre Nachricht',
    submit:              'NACHRICHT SENDEN',
  },

  // ── KONTAKT
  kontakt: {
    eyebrow:  'KONTAKT',
    headline: 'NEHMEN SIE KONTAKT AUF',
    text:     'Ich freue mich über Ihre Nachricht und melde mich persönlich bei Ihnen. Weitere Unterlagen sende ich Ihnen auf Anfrage gerne zu.',
  },

  // ── DOKUMENTE
  dokumente: {
    password: 'IhrPasswort',
    url:      'https://drive.google.com/IhrLink',
    title:    'Zugangscode eingeben',
    submit:   'Zugang',
    error:    'Zugangscode nicht korrekt.',
  },

  // ── FOOTER ────────────────────────────────────────────────
  footer: {
    copy:        '© 2026 Marc Schriever · Logistikexperte',
    location:    'Bremen, Deutschland',
    impressum:   'Impressum',
    datenschutz: 'Datenschutz',
  },

};
