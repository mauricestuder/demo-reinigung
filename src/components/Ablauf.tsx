import { Icon } from "./Icon";
import type { AblaufContent } from "@/lib/types";

/**
 * Ablauf in drei Schritten: Anrufen → Besichtigung und Offerte → Reinigung.
 *
 * Nimmt den Platz der „Gründe" aus der Restaurant-Vorlage ein. Bei einer
 * Dienstleistung ist die wichtigste Frage nicht „warum ihr", sondern „wie
 * läuft das ab, und was kostet es mich an Aufwand" — deshalb Schritte mit
 * Nummer statt Argumente mit Symbol.
 *
 * Auf dem Handy eine Spalte, ab 640 px drei. Die Nummer steht gross und
 * blau, damit man die Reihenfolge auch beim Überfliegen sieht.
 */
export function Ablauf({ content }: { content: AblaufContent }) {
  return (
    <section id="ablauf" className="section relative bg-surface-warm scroll-mt-24">
      <div className="container-page">
        <header data-reveal className="max-w-2xl">
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 className="section-title">{content.title}</h2>
        </header>

        <ol className="mt-6 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-5">
          {content.steps.map((step, index) => (
            <li
              key={step.id}
              data-reveal
              style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
            >
              <article className="card flex h-full flex-col border p-5 sm:p-7">
                <div className="flex items-center gap-4 sm:block">
                  <span className="tnum grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary font-display text-xl font-semibold text-on-primary sm:h-14 sm:w-14 sm:text-2xl">
                    {index + 1}
                  </span>
                  <h3 className="min-w-0 font-display text-lg leading-tight sm:mt-6 sm:text-2xl">
                    {step.title}
                  </h3>
                </div>

                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base">
                  {step.text}
                </p>

                {step.fact && (
                  <div className="mt-auto pt-5">
                    <span className="inline-flex rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-on-secondary">
                      {step.fact}
                    </span>
                  </div>
                )}
              </article>
            </li>
          ))}
        </ol>

        {/* Mini-CTA am Ende des Schritts — das Trust-&-Conversion-Muster
            setzt in jeder Sektion einen kleinen Weg zur Handlung. */}
        <p data-reveal className="mt-8">
          <a href="#offerte" className="link-cta">
            Schritt 1 jetzt machen: Offerte anfragen
            <Icon name="arrowRight" size={18} />
          </a>
        </p>
      </div>
    </section>
  );
}
