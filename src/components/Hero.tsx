import { Icon } from "./Icon";
import { OpenStatus } from "./OpenStatus";
import { SmartImage } from "./SmartImage";
import type { HeroContent, OpeningHours, SiteConfig } from "@/lib/types";

interface HeroProps {
  hero: HeroContent;
  site: SiteConfig;
  hours: OpeningHours;
}

/**
 * Kopfbereich: Text links, Foto rechts mit feinem Rahmen — auf hellem
 * Grund, kein Foto hinter der Schrift. Dadurch braucht es keinen
 * Schleier und keine Kontrastmessung: Alle Schrift steht auf Weiss.
 *
 * Die Offerte ist die primäre Aktion, die Leistungen die zweite: Wer eine
 * Reinigungsfirma aufruft, will einen Preis, nicht eine Karte studieren.
 *
 * Unter den Schaltflächen drei Vertrauensanker (Besichtigung gratis,
 * versichert, umweltschonend) — kurz, weil sie auf dem Handy direkt unter
 * dem Daumen liegen.
 */
export function Hero({ hero, site, hours }: HeroProps) {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-background"
      style={{ paddingTop: "calc(var(--header-height) + 2.5rem)" }}
    >
      <div className="container-page pb-14 sm:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Textspalte */}
          <div className="lg:col-span-6">
            <div data-reveal className="flex flex-wrap items-center gap-3">
              <span className="eyebrow">{hero.eyebrow}</span>
              <OpenStatus hours={hours} />
            </div>

            <h1
              className="mt-6 font-display font-bold"
              style={{ fontSize: "clamp(2.75rem, 8vw, 5rem)", lineHeight: 1.02 }}
            >
              {hero.titleLines.map((line, index) => (
                <span
                  key={line}
                  data-reveal
                  style={{ "--reveal-delay": `${60 + index * 70}ms` } as React.CSSProperties}
                  className="block"
                >
                  {index === hero.titleLines.length - 1 ? (
                    <span className="text-primary">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>

            <p
              data-reveal
              style={{ "--reveal-delay": "280ms" } as React.CSSProperties}
              className="lead mt-6"
            >
              {hero.subtitle}
            </p>

            <div
              data-reveal
              style={{ "--reveal-delay": "340ms" } as React.CSSProperties}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <a href={hero.primaryCta.href} className="btn btn-primary">
                <Icon name="phone" size={20} />
                {hero.primaryCta.label}
              </a>
              <a href={hero.secondaryCta.href} className="btn btn-secondary">
                {hero.secondaryCta.label}
                <Icon name="arrowRight" size={20} />
              </a>
            </div>

            <ul
              data-reveal
              style={{ "--reveal-delay": "420ms" } as React.CSSProperties}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
            >
              {hero.facts.map((fact) => (
                <li key={fact} className="flex items-center gap-2 text-[0.9375rem] font-semibold">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary text-primary-text">
                    <Icon name="check" size={15} />
                  </span>
                  {fact}
                </li>
              ))}
            </ul>

            <p
              data-reveal
              style={{ "--reveal-delay": "480ms" } as React.CSSProperties}
              className="mt-6 text-sm text-muted-foreground"
            >
              {site.address.hint}
            </p>
          </div>

          {/* Foto mit feinem Rahmen und grosser Rundung, ohne Schatten. */}
          <div
            data-reveal
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
            className="lg:col-span-6"
          >
            <div className="relative">
              <SmartImage
                image={hero.image}
                ratio={null}
                priority
                sizes="(min-width: 1024px) 50vw, 92vw"
                className="aspect-[4/3] rounded-3xl border border-border lg:aspect-[5/4]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
