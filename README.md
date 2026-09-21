# Klarblick — Beispiel-Website für eine Reinigungsfirma

Zweite Beispielseite für die Projektarbeit von Maurice Studer (Sek Frenke,
Liestal): So könnte die Website eines Dienstleistungsbetriebs aussehen.
**«Klarblick» ist erfunden** — Name, Adresse (Musterstrasse 12),
Telefonnummer, Leistungen, Preise und Daniela Keller sind ausgedacht. Die Fotos
sind Platzhalter von Pexels (Nachweis in
[`public/images/BILDNACHWEIS.txt`](./public/images/BILDNACHWEIS.txt)).

Die erste Beispielseite ist das Steakhouse «Firestone»
(<https://mauricestuder.github.io/demo-takeaway/>). Diese hier zeigt das
Gegenteil: hell, sachlich, Flat Design — und einen anderen Aufbau: Leistungen
mit Richtpreisen statt Speisekarte, Vertrauensleiste mit Fakten, Ablauf in
drei Schritten, Offerte-Block, Einsatzgebiet mit Kreis auf der Karte.

Gestaltung nach der UI/UX-Pro-Max-Datenbank, Profil «Home Services»:
Flat Design (keine Schatten, keine Verläufe), dafür grosszügige Rundungen, Trust Blue als
Marke und Safety Orange nur für die eine Handlung (Offerte), Schriftpaar
«Modern Professional» (Poppins + Open Sans), Seitenaufbau nach dem Muster
«Trust & Authority + Conversion» (Hero → Fakten → Leistungen → Ablauf →
Offerte). Alle Farben liegen als Tokens in `src/app/globals.css`.

Die Seite trägt oben einen Hinweis «Beispielseite» (`demoMode` in
`content/site.json`) und ist für Suchmaschinen gesperrt.

## Live

<https://mauricestuder.github.io/demo-reinigung/>

Veröffentlichen (baut lokal und schiebt das Ergebnis in den Zweig `gh-pages`):

```bash
npm run deploy
```

## Lokal starten

```bash
npm install
npm run dev
```

Dann <http://localhost:3000> öffnen.

| Befehl | Zweck |
| --- | --- |
| `npm run dev` | Entwicklungsserver mit Auto-Reload |
| `npm run build` | Produktions-Build |
| `npm run typecheck` | TypeScript prüfen |
| `npm run check:hours` | Selbsttest der Bürozeiten-Logik |
| `npm run build:map` | Kartenbild aus OpenStreetMap-Daten zeichnen (Koordinaten und Radius im Skript) |
| `npm run build:icons` | Tab-Symbole aus `public/icon.svg` erzeugen |

## Aufbau der Startseite

Hero (Offerte anfragen) → Leistungen (Privat / Gewerbe / Spezial, Richtpreise
mit Einheit) → Ablauf in drei Schritten → Offerte-Block (Telefon plus die vier
Angaben, die der Anruf braucht — bewusst kein Formular) → Über uns →
Einsatzgebiet und Kontakt (Bürozeiten, Karte mit 12-km-Kreis).

## Inhalte ändern

Alles, was auf der Seite steht, liegt in [`content/`](./content) als JSON —
Anleitung in [`content/README.md`](./content/README.md).

```
content/
├── site.json         Name, Adresse, Kontakt, SEO, Beispiel-Hinweis
├── pages.json        Texte der Startseite (Hero, Ablauf, Offerte, Über uns, Einsatzgebiet, Footer)
├── leistungen.json   Leistungen mit Richtpreisen und Einheit
├── hours.json        Bürozeiten
└── legal.json        Impressum und Datenschutz
```

## Für einen echten Kunden

1. Ordner kopieren, `content/*.json` mit den echten Angaben füllen
2. Fotos des Betriebs nach `public/images/`, Pfade in den JSON-Dateien eintragen
3. Farben in `src/app/globals.css` (`@theme`), Logo in
   `src/components/LogoMark.tsx` und `public/icon.svg`
4. Koordinaten und Radius in `scripts/build-map.mjs`, dann `npm run build:map`
5. `demoMode` auf `false`, Impressum vervollständigen

## Technik

Next.js 15, React 19, TypeScript, Tailwind CSS 4. Statisch exportiert, keine
externen Requests zur Laufzeit: keine Font-CDN, keine Analytics, keine
eingebettete Karte, kein Kontaktformular — deshalb kein Cookie-Banner und keine
Datenerfassung. Der Status «Jetzt erreichbar» wird im Browser in
`Europe/Zurich` berechnet.
