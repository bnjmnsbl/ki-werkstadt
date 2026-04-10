-- Szenario-Karten
INSERT INTO scenarios (id, title, description) VALUES
('S1', 'Bürgerservice', 'Entwickle eine KI-Anwendung, die Bürger:innen den Kontakt mit der Verwaltung erleichtert — z.B. bei Anträgen, Terminvergabe oder Informationssuche.'),
('S2', 'Stadtplanung', 'Entwickle eine KI-Anwendung, die bei der Planung und Entwicklung von Stadtquartieren, Infrastruktur oder öffentlichem Raum unterstützt.'),
('S3', 'Innere Verwaltung', 'Entwickle eine KI-Anwendung, die interne Verwaltungsprozesse effizienter macht — z.B. Personalplanung, Beschaffung, Aktenführung oder Haushaltsplanung.'),
('S4', 'Öffentliche Sicherheit', 'Entwickle eine KI-Anwendung, die zur Sicherheit in der Stadt beiträgt — z.B. Katastrophenschutz, Verkehrssicherheit oder Krisenmanagement.'),
('S5', 'Bildung & Kultur', 'Entwickle eine KI-Anwendung für Schulen, Bibliotheken, Museen oder kulturelle Einrichtungen in Berlin.'),
('S6', 'Klima & Umwelt', 'Entwickle eine KI-Anwendung, die Berlin beim Klimaschutz, der Klimaanpassung oder beim Umweltmonitoring unterstützt.');

-- Daten-Karten
INSERT INTO data_cards (id, title, description, examples) VALUES
('D1',  'Mobilität',                'Bewegungsdaten im städtischen Raum — vom Autoverkehr über den ÖPNV bis zum Radverkehr und Sharing-Angeboten.',               'Verkehrszählung, BVG-Echtzeitdaten, Radverkehrsdaten, E-Scooter-Nutzung, Parkraumsensoren'),
('D2',  'Geodaten & Karten',        'Räumliche Informationen über Berlin — von amtlichen Karten bis zum 3D-Stadtmodell.',                                         'Katasteramt, Flächennutzungspläne, 3D-Stadtmodell, OpenStreetMap, Baumkataster'),
('D3',  'Personenbezogene Daten',   'Informationen, die sich direkt auf einzelne Personen beziehen — besonders schützenswert.',                                    'Meldedaten, Ausweisinformationen, Sozialleistungsbezug, Aufenthaltsstatus'),
('D4',  'Gesundheitsdaten',         'Daten zu Gesundheitsversorgung, Krankheitsgeschehen und gesundheitlicher Infrastruktur.',                                    'Krankenhausbelegung, Infektionsberichte, Rettungsdienst-Einsätze, Luftqualitätsindex'),
('D5',  'Energie & Versorgung',     'Daten zu Energieerzeugung, -verbrauch und Versorgungsinfrastruktur.',                                                        'Stromverbrauch, Fernwärme-Netz, Solarkataster, Wasserverbrauch, Netzauslastung'),
('D6',  'Finanzen & Haushalt',      'Finanz- und Haushaltsdaten des Landes Berlin und seiner Bezirke.',                                                           'Berliner Haushaltsdaten, Vergabestatistiken, Fördermittel, Steuereinnahmen'),
('D7',  'Wetter & Klima',           'Meteorologische Daten und Klimainformationen — von der Echtzeit-Vorhersage bis zur Langzeitanalyse.',                        'DWD-Wetterdaten, Temperaturkarten, Niederschlagsprognosen, Hitzewarnungen'),
('D8',  'Sensordaten (IoT)',         'Messwerte von Sensoren im Stadtraum — in Echtzeit oder als Zeitreihen.',                                                     'Luftqualität, Lärmpegel, Mülleimer-Füllstände, Bodenfeuchte, Pegelstände'),
('D9',  'Amtliche Statistik',       'Offizielle statistische Erhebungen und Auswertungen über Berlin.',                                                           'Amt für Statistik, Mikrozensus, Einwohnerstatistik, Kriminalitätsstatistik'),
('D10', 'Textdaten & Dokumente',    'Unstrukturierte oder semi-strukturierte Textdaten aus Verwaltung und Politik.',                                               'Parlamentsprotokolle, Gesetze, Verwaltungsvorschriften, Bescheide, Bürgeranfragen'),
('D11', 'Social Media & Feedback',  'Öffentliche Meinungsäußerungen und Bürger:innen-Feedback mit Stadtbezug.',                                                   'Social-Media-Posts, Beschwerdemanagement, Beteiligungsplattformen, Umfragen'),
('D12', 'Satelliten & Fernerkundung','Erdbeobachtungsdaten aus Satelliten und Luftbildern.',                                                                      'Copernicus-Daten, Luftbilder, Vegetationsindex, Versiegelungsgrad, Wärmebilder');

-- Reflexions-Karten
INSERT INTO reflection_cards (id, title, condition) VALUES
('R1',  'Sparfuchs',             'Deine Anwendung darf maximal 500 € pro Monat im Betrieb kosten — inklusive Cloud, Lizenzen und Wartung.'),
('R2',  'Autonomie-Modus',       'Deine Anwendung trifft eigenständig Entscheidungen — ohne menschliche Freigabe im Einzelfall.'),
('R3',  'Open Source',           'Deine Anwendung muss vollständig Open Source sein — Code, Modell und Trainingsdaten.'),
('R4',  'Kein Internet',         'Deine Anwendung muss komplett offline funktionieren — als Edge-KI oder lokale Installation.'),
('R5',  'Hardware-KI',           'Deine Anwendung läuft auf einem physischen Gerät — z.B. Roboter, Kiosk, Drohne oder Sensor.'),
('R6',  'Barrierefreiheit first','Deine Anwendung muss für Menschen mit Seh-, Hör- oder Mobilitätseinschränkung vollständig nutzbar sein.'),
('R7',  'Echtzeitpflicht',       'Deine Anwendung muss Ergebnisse innerhalb von 5 Sekunden liefern — egal wie komplex die Anfrage.'),
('R8',  'Erklärbar',             'Jede Empfehlung deiner Anwendung muss für Laien nachvollziehbar begründet werden können.'),
('R9',  'Datensparsamkeit',      'Deine Anwendung darf nur anonymisierte oder aggregierte Daten verwenden — keine Einzelpersonen-Daten.'),
('R10', 'Multilingual',          'Deine Anwendung muss in mindestens 5 Sprachen funktionieren — von der Eingabe bis zur Ausgabe.'),
('R11', 'Schon morgen',          'Deine Anwendung muss mit heute verfügbarer Technik umsetzbar sein — kein Forschungsprojekt, sondern marktreife Technologie.'),
('R12', 'Gamification',          'Deine Anwendung muss spielerische Elemente enthalten, die zur Nutzung motivieren — Punkte, Badges, Challenges.'),
('R13', 'Bezirks-Hoheit',        'Deine Anwendung wird von einem einzelnen Berliner Bezirk betrieben — nicht vom Land, nicht zentral.'),
('R14', 'Bürger-Audit',          'Bürger:innen können jederzeit einsehen, welche Daten die KI nutzt und welche Entscheidungen sie trifft.'),
('R15', 'Kooperation',           'Deine Anwendung muss mit einer bestehenden Berliner Anwendung zusammenarbeiten — z.B. BärGPT, Gieß den Kiez, mein.berlin.de.'),
('R16', 'Zeitreise',             'Deine Anwendung nutzt historische Daten (mind. 10 Jahre zurück), um Zukunftsprognosen zu erstellen.');

-- Seed-Ideen (5 Stück)
INSERT INTO ideas (session_id, scenario_id, data_card_1_id, data_card_2_id, reflection_id, app_name, description, opportunity, risk, is_seed) VALUES
(
  'seed-session-1', 'S1', 'D10', 'D3', 'R8',
  'BerlinAssist',
  'Ein KI-Chatbot für berlin.de, der Bürger:innen bei Behördengängen hilft. Er erkennt anhand natürlicher Sprache, welches Formular oder welcher Antrag benötigt wird, und führt Schritt für Schritt durch den Prozess. Jede Empfehlung wird mit dem Verweis auf die zugrunde liegende Verwaltungsvorschrift begründet.',
  'Millionen Bürger:innen könnten Behördengänge ohne Wartezeit und Frustration erledigen.',
  'Falsche Auskünfte könnten zu verpassten Fristen oder abgelehnten Anträgen führen.',
  true
),
(
  'seed-session-2', 'S6', 'D12', 'D7', 'R16',
  'HitzeRadar Berlin',
  'Eine KI-Anwendung, die auf Basis von Satellitenbildern und historischen Wetterdaten der letzten 20 Jahre Hitzeinseln in Berlin identifiziert und vorhersagt, welche Stadtteile bei Hitzewellen besonders betroffen sein werden. Stadtplaner:innen können damit gezielt Begrünungs- und Beschattungsmaßnahmen priorisieren.',
  'Gezielte Klimaanpassung statt Gießkannenprinzip — Leben retten durch Prävention.',
  'Historische Daten spiegeln vergangene Bebauung wider — neue Bauprojekte könnten Prognosen verfälschen.',
  true
),
(
  'seed-session-3', 'S3', 'D6', 'D10', 'R3',
  'HaushaltsPilot',
  'Ein Open-Source-KI-Tool, das Berliner Verwaltungsmitarbeitende bei der Haushaltsplanung unterstützt. Es analysiert vergangene Haushaltstitel, erkennt Muster bei Über- und Unterschreitungen und schlägt realistische Ansätze für neue Haushaltsjahre vor. Der gesamte Code und die Modelle sind öffentlich einsehbar.',
  'Bessere Haushaltsplanung spart Millionen und macht öffentliche Finanzen transparenter.',
  'Automatisierte Vorschläge könnten politische Prioritätensetzung aushebeln oder vereinfachen.',
  true
),
(
  'seed-session-4', 'S4', 'D8', 'D1', 'R7',
  'FlowGuard',
  'Ein Echtzeit-KI-System für Großveranstaltungen in Berlin (Karneval der Kulturen, Silvester, Marathon), das Sensordaten und Verkehrsströme analysiert und innerhalb von 5 Sekunden Warnungen bei kritischen Personendichten ausgibt. Einsatzkräfte bekommen Handlungsempfehlungen direkt aufs Tablet.',
  'Paniksituationen und Massengedränge frühzeitig erkennen und verhindern.',
  'Falschalarme könnten Veranstaltungen unnötig stören und das Vertrauen in das System untergraben.',
  true
),
(
  'seed-session-5', 'S5', 'D11', 'D9', 'R12',
  'KulturMatch Berlin',
  'Eine spielerische App, die Berliner:innen kulturelle Angebote empfiehlt, die sie noch nicht kennen. Auf Basis von Social-Media-Trends und Besuchsstatistiken lernt die KI, welche Ausstellungen, Konzerte und Theateraufführungen zu den Interessen passen. Nutzer:innen sammeln Punkte für besuchte Veranstaltungen und entdecken neue Stadtteile.',
  'Demokratisierung von Kultur — auch kleinere Einrichtungen und Off-Spaces bekommen Sichtbarkeit.',
  'Filterblasen könnten entstehen, wenn die KI immer Ähnliches empfiehlt statt echte Entdeckungen zu fördern.',
  true
);
