/**
 * Statisches Kartenbild für den Bereich «Einsatzgebiet» erzeugen.
 *
 * Warum nicht einfach eine eingebettete Karte? Eine Google-Maps-Einbettung
 * (oder Leaflet mit Live-Tiles) lädt bei jedem Seitenaufruf von fremden
 * Servern nach, setzt Cookies und kostet Ladezeit. Die ganze Seite kommt
 * bewusst ohne solche Requests aus — deshalb wird das Bild hier
 * **einmalig beim Entwickeln** erzeugt und in public/images/ abgelegt.
 * Zur Laufzeit passiert nichts mehr.
 *
 * Warum selbst gezeichnet statt fertige Kacheln? Kachel-Anbieter ohne
 * Beschriftung (CARTO, Stadia, Thunderforest) verlangen inzwischen einen
 * API-Schlüssel und liefern sonst ein Wasserzeichen; die OpenStreetMap-
 * Standardkacheln haben Ortsnamen fest eingebrannt. Dieses Skript holt
 * stattdessen die rohen Daten (Hauptstrassen, Bahn, Flüsse, Wald,
 * Siedlungsflächen) über die Overpass-API und zeichnet sie als SVG in den
 * Farben der Seite: heller Grund, Strassen als graue Linien, kein einziges
 * Wort. Dazu ein blauer Kreis: das Einsatzgebiet ohne Anfahrtszuschlag,
 * rund zwölf Kilometer um das Büro in Liestal.
 *
 * Zoom 11, weil hier nicht eine Gasse gezeigt wird, sondern das halbe
 * Baselbiet. Auf dieser Stufe lohnen sich einzelne Gebäude nicht — die
 * Abfrage holt Wohn- und Gewerbeflächen (landuse) statt Gebäude, sonst
 * wären es Zehntausende Polygone.
 *
 * Aufruf:  node scripts/build-map.mjs
 */
import sharp from "sharp";
import { writeFileSync } from "node:fs";

// Liestal — ein erfundener Betrieb hat keine echte Adresse.
const LAT = 47.4842;
const LON = 7.7345;
const ZOOM = 11;
// Radius des Einsatzgebiets in Metern.
const RADIUS_M = 12000;
// Angezeigt wird die Karte höchstens ~640 CSS-Pixel breit. 1200 px reichen
// damit auch für Retina-Displays.
const WIDTH = 1200;
const HEIGHT = 525; // 16:7 — schmalere Zuschnitte übernimmt CSS per object-cover
const TILE = 256;

const UA = "Klarblick-Beispielseite/1.0 (statisches Kartenbild, einmaliger Build)";

// Farben entsprechen den Tokens in src/app/globals.css.
const FARBEN = {
  grund: "#f4f7fb",
  gruen: "#e4ede2",
  wasser: "#c9dcf4",
  siedlung: "#e7ebf1",
  strasseKlein: "#d3dae4",
  strasseMittel: "#bfc9d6",
  strasseGross: "#a9b5c6",
  bahn: "#b3bcc9",
  bahnStrich: "#ffffff",
  kreis: "#1d4ed8",
  marker: "#1d4ed8",
  markerRand: "#ffffff",
};

/** Weltpixel-Koordinaten nach Web-Mercator. */
function project(lat, lon) {
  const scale = TILE * 2 ** ZOOM;
  const x = ((lon + 180) / 360) * scale;
  const sin = Math.sin((lat * Math.PI) / 180);
  const y = (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * scale;
  return { x, y };
}

const center = project(LAT, LON);
const left = center.x - WIDTH / 2;
const top = center.y - HEIGHT / 2;

/** Bildkoordinate eines Punkts. */
function toPx({ lat, lon }) {
  const p = project(lat, lon);
  return [(p.x - left).toFixed(1), (p.y - top).toFixed(1)];
}

// Umgekehrt: Bildecken zurück in Breiten- und Längengrad für die Abfrage,
// mit einem Rand von 15 %, damit Linien am Bildrand nicht abgeschnitten
// wirken.
function unproject(x, y) {
  const scale = TILE * 2 ** ZOOM;
  const lon = (x / scale) * 360 - 180;
  const n = Math.PI - (2 * Math.PI * y) / scale;
  const lat = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  return { lat, lon };
}
const rand = 0.15;
const sw = unproject(left - WIDTH * rand, top + HEIGHT * (1 + rand));
const ne = unproject(left + WIDTH * (1 + rand), top - HEIGHT * rand);
const bbox = `${sw.lat},${sw.lon},${ne.lat},${ne.lon}`;

const query = `
[out:json][timeout:90];
(
  way["highway"~"^(motorway|trunk|primary|secondary|tertiary)$"](${bbox});
  way["railway"="rail"](${bbox});
  way["waterway"="river"](${bbox});
  way["natural"="water"](${bbox});
  way["landuse"~"^(forest|wood)$"](${bbox});
  way["natural"="wood"](${bbox});
  way["landuse"~"^(residential|industrial|commercial|retail)$"](${bbox});
);
out geom;
`;

console.log("Lade Kartendaten von der Overpass-API …");
const res = await fetch("https://overpass-api.de/api/interpreter", {
  method: "POST",
  headers: { "User-Agent": UA, "Content-Type": "application/x-www-form-urlencoded" },
  body: "data=" + encodeURIComponent(query),
});
if (!res.ok) throw new Error(`Overpass: HTTP ${res.status}`);
const { elements } = await res.json();
console.log(`${elements.length} Objekte erhalten.`);

const pathOf = (way) => way.geometry.map((p, i) => (i ? "L" : "M") + toPx(p).join(" ")).join("");
const polyOf = (way) => pathOf(way) + "Z";

// Zeichenreihenfolge: Siedlung, Wald, Wasser, dann Strassen nach Bedeutung,
// zuletzt Bahn, Kreis und Marker.
const siedlung = [];
const gruen = [];
const wasser = [];
const bahn = [];
const strassen = { klein: [], mittel: [], gross: [] };

const BREITE = { motorway: 5, trunk: 5, primary: 4, secondary: 3, tertiary: 2 };

for (const w of elements) {
  if (w.type !== "way" || !w.geometry) continue;
  const t = w.tags ?? {};
  if (t.natural === "water") {
    wasser.push(`<path d="${polyOf(w)}" fill="${FARBEN.wasser}"/>`);
  } else if (t.waterway) {
    wasser.push(`<path d="${pathOf(w)}" fill="none" stroke="${FARBEN.wasser}" stroke-width="3"/>`);
  } else if (t.landuse === "forest" || t.landuse === "wood" || t.natural === "wood") {
    gruen.push(polyOf(w));
  } else if (t.landuse) {
    siedlung.push(polyOf(w));
  } else if (t.railway) {
    bahn.push(pathOf(w));
  } else if (t.highway in BREITE) {
    const b = BREITE[t.highway];
    const gruppe = b >= 4 ? "gross" : b >= 3 ? "mittel" : "klein";
    strassen[gruppe].push(`<path d="${pathOf(w)}" stroke-width="${b}"/>`);
  }
}

// Radius in Bildpixel: Meter pro Pixel auf dieser Zoomstufe und Breite.
const mProPx = (40075016.686 * Math.cos((LAT * Math.PI) / 180)) / (TILE * 2 ** ZOOM);
const radiusPx = (RADIUS_M / mProPx).toFixed(1);

const markerR = 13;
const cx = WIDTH / 2;
const cy = HEIGHT / 2;
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${FARBEN.grund}"/>
  <g fill="${FARBEN.siedlung}">${siedlung.map((d) => `<path d="${d}"/>`).join("")}</g>
  <g fill="${FARBEN.gruen}">${gruen.map((d) => `<path d="${d}"/>`).join("")}</g>
  ${wasser.join("\n  ")}
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <g stroke="${FARBEN.strasseKlein}">${strassen.klein.join("")}</g>
    <g stroke="${FARBEN.strasseMittel}">${strassen.mittel.join("")}</g>
    <g stroke="${FARBEN.strasseGross}">${strassen.gross.join("")}</g>
  </g>
  <g fill="none" stroke-linecap="butt">
    <g stroke="${FARBEN.bahn}" stroke-width="3">${bahn.map((d) => `<path d="${d}"/>`).join("")}</g>
    <g stroke="${FARBEN.bahnStrich}" stroke-width="1.2" stroke-dasharray="6 6">${bahn.map((d) => `<path d="${d}"/>`).join("")}</g>
  </g>
  <!-- Einsatzgebiet: blauer Kreis, leicht gefuellt, gestrichelter Rand. -->
  <circle cx="${cx}" cy="${cy}" r="${radiusPx}" fill="${FARBEN.kreis}" opacity="0.07"/>
  <circle cx="${cx}" cy="${cy}" r="${radiusPx}" fill="none" stroke="${FARBEN.kreis}" stroke-width="2.5" stroke-dasharray="10 7" opacity="0.7"/>
  <!-- Bueromarkierung in Blau (color-primary). -->
  <circle cx="${cx}" cy="${cy}" r="${markerR * 2.2}" fill="${FARBEN.marker}" opacity="0.2"/>
  <circle cx="${cx}" cy="${cy}" r="${markerR}" fill="${FARBEN.marker}" stroke="${FARBEN.markerRand}" stroke-width="4"/>
</svg>`;

await sharp(Buffer.from(svg)).webp({ quality: 80 }).toFile("public/images/karte.webp");

writeFileSync(
  "public/images/karte.txt",
  `Kartenausschnitt Baselbiet mit Liestal in der Mitte\n` +
    `Koordinaten: ${LAT}, ${LON} (Zoom ${ZOOM}), Kreis ${RADIUS_M / 1000} km\n` +
    `Erzeugt mit scripts/build-map.mjs: Rohdaten von der Overpass-API,\n` +
    `selbst gezeichnet, ohne Beschriftung\n` +
    `Kartendaten (c) OpenStreetMap-Mitwirkende, ODbL\n`,
);

console.log(`Fertig: ${WIDTH}x${HEIGHT} -> public/images/karte.webp`);
