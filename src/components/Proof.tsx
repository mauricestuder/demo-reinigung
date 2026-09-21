import { Icon } from "./Icon";
import type { ProofItem } from "@/lib/types";

/**
 * Vertrauensleiste direkt unter dem Hero — der „Proof"-Block aus dem
 * Muster «Trust & Authority + Conversion»: Zahlen und Zusagen, die man
 * nachprüfen kann, bevor die Leistungen kommen.
 *
 * Keine erfundenen Bewertungen, keine Logos: Ein kleiner Betrieb hat davon
 * nichts, was er zeigen dürfte. Was er hat, sind Fakten — seit wann, wie
 * viele Leute, versichert, wie schnell die Offerte kommt.
 *
 * Blauer, stark abgerundeter Block mit weisser Schrift, Trennlinien statt
 * Karten. Auf dem Handy zwei Spalten, ab 1024 px vier.
 */
export function Proof({ items }: { items: ProofItem[] }) {
  if (items.length === 0) return null;

  return (
    <section aria-label="Fakten zum Betrieb" className="pb-2">
      <div className="container-page">
        <ul className="grid grid-cols-2 divide-on-primary/20 rounded-[2rem] bg-primary px-5 text-on-primary sm:divide-x sm:px-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <li
              key={item.id}
              data-reveal
              style={{ "--reveal-delay": `${index * 50}ms` } as React.CSSProperties}
              className={`flex items-start gap-3 py-5 sm:px-6 sm:py-7 ${
                index % 2 === 0 ? "pr-3" : "pl-3"
              }`}
            >
              <Icon name={item.icon} size={28} className="mt-0.5 shrink-0 text-accent-on-dark" />
              <div className="min-w-0">
                <p className="font-display text-base font-semibold leading-tight sm:text-lg">
                  {item.value}
                </p>
                <p className="mt-1 text-sm leading-snug text-on-primary/80">{item.label}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
