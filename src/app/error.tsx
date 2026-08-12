"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <section className="section container legal"><p className="eyebrow">Etwas ist schiefgegangen</p><h1 className="display">Wir bringen wieder Ordnung hinein.</h1><button className="button-solid" type="button" onClick={reset}>Erneut versuchen</button></section>;
}
