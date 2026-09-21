import { ImageResponse } from "next/og";
import { getSite } from "@/lib/content";

export const alt = "Klarblick – Reinigung in Liestal und Baselland";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Beim statischen Export (GitHub Pages) muss das Bild einmal beim Build
// erzeugt werden — ohne diese Angabe bricht `next build` ab.
export const dynamic = "force-static";

/**
 * Vorschaubild für WhatsApp, Instagram und Google.
 *
 * Wird beim Build automatisch erzeugt und passt sich an die Inhalte aus
 * content/site.json an — es muss also nie manuell nachgezeichnet werden.
 * Farben und Aufbau folgen denselben Tokens wie die Seite (globals.css):
 * Blau und Schiefer auf Weiss.
 *
 * Hinweis für spätere Änderungen: Satori (der Renderer hinter next/og)
 * verlangt bei mehreren Kindelementen ein explizites `display`. Textzeilen
 * werden deshalb als ein einziger String zusammengesetzt.
 */
export default async function OpengraphImage() {
  const site = await getSite();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "#ffffff",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 8,
              background: "#1e40af",
              color: "#ffffff",
              fontSize: 46,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            K
          </div>
          <div
            style={{
              color: "#0f172a",
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            Klarblick
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#1e40af",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 8,
              marginBottom: 22,
            }}
          >
            {`${site.locality.toUpperCase()} · ${site.address.region.toUpperCase()}`}
          </div>
          <div
            style={{
              color: "#0f172a",
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -2,
              maxWidth: 940,
            }}
          >
            {`${site.tagline} — Fixpreis in 24 Stunden.`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#475569",
            fontSize: 26,
          }}
        >
          <div style={{ width: 56, height: 6, background: "#c2410c" }} />
          <span>
            {`${site.address.street}, ${site.address.zip} ${site.address.city}`}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
