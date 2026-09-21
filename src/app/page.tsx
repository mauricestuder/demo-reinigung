import { About } from "@/components/About";
import { Ablauf } from "@/components/Ablauf";
import { DemoNotice } from "@/components/DemoNotice";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { MenuSection } from "@/components/MenuSection";
import { Offerte } from "@/components/Offerte";
import { Proof } from "@/components/Proof";
import { Visit } from "@/components/Visit";
import { getContent } from "@/lib/content";

/**
 * Reihenfolge nach dem Muster «Trust & Authority + Conversion»:
 * Hero (eine primäre Aktion: Offerte) → Vertrauensleiste (Fakten) →
 * Leistungen als Hauptinhalt → Ablauf in drei Schritten → Offerte-Block →
 * Über uns → Einsatzgebiet und Kontakt.
 */
export default async function HomePage() {
  const { site, pages, menu, hours } = await getContent();

  return (
    <>
      <JsonLd site={site} hours={hours} menu={menu} />

      <Hero hero={pages.hero} site={site} hours={hours} />

      <Proof items={pages.proof} />

      {site.demoMode && <DemoNotice text={site.demoNotice} />}

      <MenuSection content={pages.menuSection} menu={menu} />

      <Ablauf content={pages.ablauf} />

      <Offerte content={pages.offerte} site={site} />

      <About content={pages.about} />

      <Visit content={pages.visit} site={site} hours={hours} />
    </>
  );
}
