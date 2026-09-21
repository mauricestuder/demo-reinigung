import { Icon } from "./Icon";
import { telHref } from "@/lib/format";
import type { OfferteContent, SiteConfig } from "@/lib/types";

interface OfferteProps {
  content: OfferteContent;
  site: SiteConfig;
}

/**
 * Aufforderung zur Offerte: ein blaues Band mit Telefonnummer und den vier
 * Angaben, die der Anruf braucht.
 *
 * Bewusst kein Formular. Ein Formular bräuchte einen Server, der die
 * Anfrage entgegennimmt, und damit Datenschutz-Text, Spam-Schutz und
 * Wartung — für einen Betrieb, bei dem ohnehin die Inhaberin ans Telefon
 * geht, ist der Anruf der kürzere Weg. Die Liste sorgt dafür, dass der
 * Anruf kurz bleibt.
 *
 * Die Farben sind hier umgekehrt (weisse Schrift auf Blau), damit der Block
 * sich vom Rest der hellen Seite abhebt. Weiss auf #1e40af erreicht 8.7:1.
 * Der Knopf ist orange — die einzige Stelle, an der das Orange auf Blau
 * steht; Weiss auf #c2410c erreicht 5.1:1.
 */
export function Offerte({ content, site }: OfferteProps) {
  return (
    <section id="offerte" className="section relative scroll-mt-24">
      <div className="container-page">
        <div
          data-reveal
          className="overflow-hidden rounded-sm bg-primary text-on-primary"
        >
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
            <div className="lg:col-span-6">
              <span className="eyebrow !text-accent-on-dark">{content.eyebrow}</span>
              <h2 className="section-title !text-on-primary">{content.title}</h2>
              <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed text-on-primary/85">
                {content.text}
              </p>

              <a
                href={telHref(site.contact.phoneHref)}
                className="btn btn-primary mt-7"
              >
                <Icon name="phone" size={20} />
                <span className="tnum">{site.contact.phone}</span>
              </a>

              {content.note && (
                <p className="mt-4 text-sm text-on-primary/75">{content.note}</p>
              )}
            </div>

            <div className="lg:col-span-6">
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-accent-on-dark">
                Was wir wissen müssen
              </p>
              <ol className="mt-4 flex flex-col gap-3">
                {content.items.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-sm border border-on-primary/25 px-4 py-3"
                  >
                    <span className="tnum grid h-7 w-7 shrink-0 place-items-center rounded-sm bg-on-primary font-display text-sm font-semibold text-primary-text">
                      {index + 1}
                    </span>
                    <span className="pt-0.5 font-medium">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
