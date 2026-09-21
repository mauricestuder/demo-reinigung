/**
 * Bildmarke: blaue Tafel mit abgerundeten Ecken, darauf ein weisser
 * Glanzpunkt (vierzackiger Stern) — das Zeichen für „sauber", das jeder
 * aus Comics und Putzmittelwerbung kennt.
 *
 * Dieselbe Zeichnung liegt als `public/icon.svg` im Browser-Tab.
 *
 * Die Farben sind fest eingetragen statt über Tokens gezogen — eine Marke
 * wechselt die Farbe nicht mit dem Umfeld. Sie entsprechen
 * `--color-primary` und `--color-on-primary`.
 * Wer sie ändert, ändert sie auch in `public/icon.svg`.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" className={className}>
      <rect x="0" y="0" width="100" height="100" rx="8" fill="#1e40af" />
      <path d="M50 14 C54 40 60 46 86 50 C60 54 54 60 50 86 C46 60 40 54 14 50 C40 46 46 40 50 14 Z" fill="#ffffff" />
      <path d="M76 66 C77.5 74 79.5 76 88 78 C79.5 80 77.5 82 76 90 C74.5 82 72.5 80 64 78 C72.5 76 74.5 74 76 66 Z" fill="#ffffff" opacity="0.85" />
    </svg>
  );
}
