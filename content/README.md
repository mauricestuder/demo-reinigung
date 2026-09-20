# Inhalte bearbeiten

In diesem Ordner steht **alles**, was auf der Website zu sehen ist. Wer hier
etwas ändert, ändert die Seite — Programmierkenntnisse sind dafür nicht nötig.

> Die Dateien sind im Format **JSON**. Zwei Regeln genügen:
> Text steht immer zwischen `"Anführungszeichen"`, und zwischen zwei Einträgen
> steht immer ein Komma. Nach dem letzten Eintrag einer Liste **kein** Komma.

| Datei | Was darin steht |
| --- | --- |
| `site.json` | Name, Adresse, Telefon, E-Mail, Social Media, Suchmaschinen-Texte, Demo-Hinweis |
| `pages.json` | Alle Texte der Startseite: Hero, Leistungen-Einleitung, Ablauf, Offerte, Über uns, Einsatzgebiet, Footer |
| `leistungen.json` | Alle Leistungen: Kategorien, Einträge, Richtpreise mit Einheit, Kennzeichnungen |
| `hours.json` | Bürozeiten |
| `legal.json` | Impressum und Datenschutz |

Nach jeder Änderung: Datei speichern — die Seite aktualisiert sich im
Entwicklungsmodus automatisch.

---

## Das Wichtigste zuerst

Diese Seite zeigt einen **erfundenen** Betrieb. Für einen echten Kunden:

1. **`site.json`** → Name, `address`, `contact`, `seo` mit den echten Angaben
2. **`leistungen.json`** → Leistungen und Richtpreise vom Kunden bestätigen lassen
3. **`hours.json`** → Bürozeiten bestätigen, danach `note` prüfen
4. **`legal.json`** → Impressum und Datenschutz vervollständigen (rechtlich prüfen lassen)
5. **`site.json`** → `demoMode` auf `false` setzen, damit der Beispiel-Hinweis verschwindet

---

## Leistungen ändern (`leistungen.json`)

Ein Eintrag sieht so aus:

```json
{
  "id": "wohnungsreinigung",
  "name": "Wohnungsreinigung",
  "description": "Regelmässig oder einmalig: Küche, Bad, Böden, Staub.",
  "price": 45,
  "unit": "Std.",
  "from": true,
  "badges": ["beliebt"],
  "featured": true,
  "available": true,
  "image": null
}
```

| Feld | Bedeutung |
| --- | --- |
| `id` | Eindeutiges Kürzel. Einmal vergeben, nicht mehr ändern. |
| `name` | Name auf der Karte |
| `description` | Ein Satz mit den Zutaten. Darf auch leer bleiben (`""`). |
| `price` | Zahl mit Punkt, also `49.5` für 49.50. `null` zeigt „auf Anfrage“. |
| `unit` | Einheit hinter dem Preis: `"Std."`, `"Fenster"`, `"m²"`, `"Monat"` oder `"pauschal"`. Weglassen = Stückpreis. |
| `from` | `true` zeigt „ab“ vor dem Preis (Richtpreis). |
| `badges` | Kennzeichnungen. Erlaubt: `vegetarisch`, `vegan`, `scharf`, `neu`, `beliebt`, `hausgemacht` |
| `featured` | `true` = der Eintrag erscheint zusätzlich als Karte mit Foto ganz oben (maximal vier) |
| `available` | `false` blendet den Eintrag aus, ohne ihn zu löschen (z. B. saisonal) |
| `image` | Bild, siehe unten. `null` = gestalteter Platzhalter |

**Grössen und Varianten** (z. B. klein/gross):

```json
"price": 6.5,
"variants": [
  { "label": "Klein", "price": 6.5 },
  { "label": "Gross", "price": 8.5 }
]
```

Sobald `variants` vorhanden ist, erscheint der Preis automatisch als „ab“-Preis.

**Neue Kategorie** anlegen: einen Block nach dem Vorbild der bestehenden
kopieren und `id`, `name` und `description` anpassen. Die Reihenfolge in der
Datei ist auch die Reihenfolge auf der Website.

---

## Bürozeiten ändern (`hours.json`)

```json
{ "key": "mon", "label": "Montag", "shortLabel": "Mo", "closed": false,
  "slots": [{ "open": "07:30", "close": "12:00" }, { "open": "13:30", "close": "17:30" }] }
```

- **Geschlossen (Wochenende):** `"closed": true` setzen und `"slots": []` leer lassen.
- **Mittagspause:** zwei Zeitfenster eintragen —
  `[{ "open": "11:00", "close": "14:00" }, { "open": "17:00", "close": "22:00" }]`
- **Über Mitternacht:** `{ "open": "18:00", "close": "02:00" }` wird korrekt als
  Folgetag erkannt.

Der Hinweis „Jetzt erreichbar / Geschlossen“ oben auf der Seite und die
Hervorhebung des heutigen Tages berechnen sich automatisch daraus — in
Schweizer Zeit, egal wo der Besucher gerade ist.

---


## Preise

Die Preise sind erfunden. Wenn sich etwas ändert, genügt es, die Zahl im
jeweiligen Eintrag zu ersetzen.

Ein optionales Feld `priceNotice` blendet bei Bedarf einen nicht wegklickbaren
Hinweis über der Liste ein — zum Beispiel während einer Preisumstellung:

```json
"priceNotice": "Die Preise werden gerade überarbeitet."
```

Solange die Zeile fehlt, erscheint kein Hinweis.

---

## Bilder einsetzen

Solange kein Bild hinterlegt ist, zeichnet die Website einen gestalteten
Platzhalter im exakt richtigen Seitenverhältnis. Echte Fotos ersetzen ihn ohne
jede Layout-Änderung.

1. Foto in den Ordner `public/images/` legen (z. B. `filet.jpg`)
2. In der JSON-Datei eintragen:

```json
"image": {
  "src": "/images/filet.jpg",
  "alt": "Rindsfilet auf dunklem Teller"
}
```

`alt` ist die Bildbeschreibung für blinde Nutzerinnen und für Google —
bitte immer ausfüllen.

**Empfohlene Grössen** (die Website rechnet automatisch kleinere Varianten für
Mobilgeräte aus):

| Einsatzort | Seitenverhältnis | Mindestbreite |
| --- | --- | --- |
| Hero (`pages.json` → `hero.image`) | 5:4 mobil, 4:3 auf dem Desktop | 1400 px |
| Empfehlungen (`menu.json` → `image`) | 4:3 | 900 px |
| Über uns (`pages.json` → `about.image`) | 16:10 mobil, 5:4 auf dem Desktop | 1200 px |

---

## Häufige Stolpersteine

- **Die Seite zeigt einen Fehler nach dem Speichern.** Fast immer fehlt ein
  Komma oder ein Anführungszeichen. Ein JSON-Prüfer im Browser zeigt sofort die
  betroffene Zeile.
- **Umlaute und ß:** Umlaute sind problemlos. In der Schweiz üblich ist `ss`
  statt `ß` — die vorhandenen Texte halten sich daran.
- **Preise** immer mit Punkt schreiben (`12.5`), nie mit Komma und nie in
  Anführungszeichen.
