import type { Scenario, DataCard, ReflectionCard } from '../lib/types'

export const SCENARIOS: Scenario[] = [
  {
    id: 'S1',
    title: 'Bürgerservice',
    description: 'Entwickle eine KI-Anwendung, die Bürger:innen den Kontakt mit der Verwaltung erleichtert — z.B. bei Anträgen, Terminvergabe oder Informationssuche.',
  },
  {
    id: 'S2',
    title: 'Stadtplanung',
    description: 'Entwickle eine KI-Anwendung, die bei der Planung und Entwicklung von Stadtquartieren, Infrastruktur oder öffentlichem Raum unterstützt.',
  },
  {
    id: 'S3',
    title: 'Innere Verwaltung',
    description: 'Entwickle eine KI-Anwendung, die interne Verwaltungsprozesse effizienter macht — z.B. Personalplanung, Beschaffung, Aktenführung oder Haushaltsplanung.',
  },
  {
    id: 'S4',
    title: 'Öffentliche Sicherheit',
    description: 'Entwickle eine KI-Anwendung, die zur Sicherheit in der Stadt beiträgt — z.B. Katastrophenschutz, Verkehrssicherheit oder Krisenmanagement.',
  },
  {
    id: 'S5',
    title: 'Bildung & Kultur',
    description: 'Entwickle eine KI-Anwendung für Schulen, Bibliotheken, Museen oder kulturelle Einrichtungen in Berlin.',
  },
  {
    id: 'S6',
    title: 'Klima & Umwelt',
    description: 'Entwickle eine KI-Anwendung, die Berlin beim Klimaschutz, der Klimaanpassung oder beim Umweltmonitoring unterstützt.',
  },
]

export const DATA_CARDS: DataCard[] = [
  {
    id: 'D1',
    title: 'Mobilität',
    description: 'Bewegungsdaten im städtischen Raum — vom Autoverkehr über den ÖPNV bis zum Radverkehr und Sharing-Angeboten.',
    examples: 'Verkehrszählung, BVG-Echtzeitdaten, Radverkehrsdaten, E-Scooter-Nutzung, Parkraumsensoren',
  },
  {
    id: 'D2',
    title: 'Geodaten & Karten',
    description: 'Räumliche Informationen über Berlin — von amtlichen Karten bis zum 3D-Stadtmodell.',
    examples: 'Katasteramt, Flächennutzungspläne, 3D-Stadtmodell, OpenStreetMap, Baumkataster',
  },
  {
    id: 'D3',
    title: 'Personenbezogene Daten',
    description: 'Informationen, die sich direkt auf einzelne Personen beziehen — besonders schützenswert.',
    examples: 'Meldedaten, Ausweisinformationen, Sozialleistungsbezug, Aufenthaltsstatus',
  },
  {
    id: 'D4',
    title: 'Gesundheitsdaten',
    description: 'Daten zu Gesundheitsversorgung, Krankheitsgeschehen und gesundheitlicher Infrastruktur.',
    examples: 'Krankenhausbelegung, Infektionsberichte, Rettungsdienst-Einsätze, Luftqualitätsindex',
  },
  {
    id: 'D5',
    title: 'Energie & Versorgung',
    description: 'Daten zu Energieerzeugung, -verbrauch und Versorgungsinfrastruktur.',
    examples: 'Stromverbrauch, Fernwärme-Netz, Solarkataster, Wasserverbrauch, Netzauslastung',
  },
  {
    id: 'D6',
    title: 'Finanzen & Haushalt',
    description: 'Finanz- und Haushaltsdaten des Landes Berlin und seiner Bezirke.',
    examples: 'Berliner Haushaltsdaten, Vergabestatistiken, Fördermittel, Steuereinnahmen',
  },
  {
    id: 'D7',
    title: 'Wetter & Klima',
    description: 'Meteorologische Daten und Klimainformationen — von der Echtzeit-Vorhersage bis zur Langzeitanalyse.',
    examples: 'DWD-Wetterdaten, Temperaturkarten, Niederschlagsprognosen, Hitzewarnungen',
  },
  {
    id: 'D8',
    title: 'Sensordaten (IoT)',
    description: 'Messwerte von Sensoren im Stadtraum — in Echtzeit oder als Zeitreihen.',
    examples: 'Luftqualität, Lärmpegel, Mülleimer-Füllstände, Bodenfeuchte, Pegelstände',
  },
  {
    id: 'D9',
    title: 'Amtliche Statistik',
    description: 'Offizielle statistische Erhebungen und Auswertungen über Berlin.',
    examples: 'Amt für Statistik, Mikrozensus, Einwohnerstatistik, Kriminalitätsstatistik',
  },
  {
    id: 'D10',
    title: 'Textdaten & Dokumente',
    description: 'Unstrukturierte oder semi-strukturierte Textdaten aus Verwaltung und Politik.',
    examples: 'Parlamentsprotokolle, Gesetze, Verwaltungsvorschriften, Bescheide, Bürgeranfragen',
  },
  {
    id: 'D11',
    title: 'Social Media & Feedback',
    description: 'Öffentliche Meinungsäußerungen und Bürger:innen-Feedback mit Stadtbezug.',
    examples: 'Social-Media-Posts, Beschwerdemanagement, Beteiligungsplattformen, Umfragen',
  },
  {
    id: 'D12',
    title: 'Satelliten & Fernerkundung',
    description: 'Erdbeobachtungsdaten aus Satelliten und Luftbildern.',
    examples: 'Copernicus-Daten, Luftbilder, Vegetationsindex, Versiegelungsgrad, Wärmebilder',
  },
]

export const REFLECTION_CARDS: ReflectionCard[] = [
  { id: 'R1',  title: 'Sparfuchs',             condition: 'Deine Anwendung darf maximal 500 € pro Monat im Betrieb kosten — inklusive Cloud, Lizenzen und Wartung.' },
  { id: 'R2',  title: 'Autonomie-Modus',        condition: 'Deine Anwendung trifft eigenständig Entscheidungen — ohne menschliche Freigabe im Einzelfall.' },
  { id: 'R3',  title: 'Open Source',            condition: 'Deine Anwendung muss vollständig Open Source sein — Code, Modell und Trainingsdaten.' },
  { id: 'R4',  title: 'Kein Internet',          condition: 'Deine Anwendung muss komplett offline funktionieren — als Edge-KI oder lokale Installation.' },
  { id: 'R5',  title: 'Hardware-KI',            condition: 'Deine Anwendung läuft auf einem physischen Gerät — z.B. Roboter, Kiosk, Drohne oder Sensor.' },
  { id: 'R6',  title: 'Barrierefreiheit first', condition: 'Deine Anwendung muss für Menschen mit Seh-, Hör- oder Mobilitätseinschränkung vollständig nutzbar sein.' },
  { id: 'R7',  title: 'Echtzeitpflicht',        condition: 'Deine Anwendung muss Ergebnisse innerhalb von 5 Sekunden liefern — egal wie komplex die Anfrage.' },
  { id: 'R8',  title: 'Erklärbar',              condition: 'Jede Empfehlung deiner Anwendung muss für Laien nachvollziehbar begründet werden können.' },
  { id: 'R9',  title: 'Datensparsamkeit',       condition: 'Deine Anwendung darf nur anonymisierte oder aggregierte Daten verwenden — keine Einzelpersonen-Daten.' },
  { id: 'R10', title: 'Multilingual',           condition: 'Deine Anwendung muss in mindestens 5 Sprachen funktionieren — von der Eingabe bis zur Ausgabe.' },
  { id: 'R11', title: 'Schon morgen',           condition: 'Deine Anwendung muss mit heute verfügbarer Technik umsetzbar sein — kein Forschungsprojekt, sondern marktreife Technologie.' },
  { id: 'R12', title: 'Gamification',           condition: 'Deine Anwendung muss spielerische Elemente enthalten, die zur Nutzung motivieren — Punkte, Badges, Challenges.' },
  { id: 'R13', title: 'Bezirks-Hoheit',         condition: 'Deine Anwendung wird von einem einzelnen Berliner Bezirk betrieben — nicht vom Land, nicht zentral.' },
  { id: 'R14', title: 'Bürger-Audit',           condition: 'Bürger:innen können jederzeit einsehen, welche Daten die KI nutzt und welche Entscheidungen sie trifft.' },
  { id: 'R15', title: 'Kooperation',            condition: 'Deine Anwendung muss mit einer bestehenden Berliner Anwendung zusammenarbeiten — z.B. BärGPT, Gieß den Kiez, mein.berlin.de.' },
  { id: 'R16', title: 'Zeitreise',              condition: 'Deine Anwendung nutzt historische Daten (mind. 10 Jahre zurück), um Zukunftsprognosen zu erstellen.' },
]
